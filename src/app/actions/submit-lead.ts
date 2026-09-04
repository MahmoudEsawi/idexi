"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";

import { EVENT_TYPES, SOLUTIONS } from "./lead-options";

// Where consultation requests land, and who they appear to come from.
const TO_EMAIL = "info@idexi.tech";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "idexi Website <noreply@idexi.tech>";
const FALLBACK_EMAIL = "info@idexi.tech";

// ── Rate Limiting & Anti-Bot Protection ──
interface RateLimitRecord {
  timestamps: number[];
}

// In-memory rate limiting map keyed by client IP
const ipSubmissions = new Map<string, RateLimitRecord>();
// Duplicate submission deduplication map
const recentLeadHashes = new Map<string, number>();

const MAX_SUBMISSIONS_PER_IP = 3; // Maximum 3 submissions per 10-minute window
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const MIN_FILL_TIME_MS = 1800; // Less than 1.8 seconds means an automated script
const DEDUPE_WINDOW_MS = 3 * 60 * 1000; // 3 minutes duplicate debounce

async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }
    const realIp = headerList.get("x-real-ip");
    if (realIp) return realIp.trim();
    const cfIp = headerList.get("cf-connecting-ip");
    if (cfIp) return cfIp.trim();
  } catch {
    // Outside request context
  }
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  if (!ip || ip === "unknown") return true;
  const now = Date.now();
  const record = ipSubmissions.get(ip) ?? { timestamps: [] };

  // Keep only timestamps within the sliding window
  const activeTimestamps = record.timestamps.filter((t) => now - t < WINDOW_DURATION_MS);

  if (activeTimestamps.length >= MAX_SUBMISSIONS_PER_IP) {
    ipSubmissions.set(ip, { timestamps: activeTimestamps });
    return false; // Rate limit triggered
  }

  activeTimestamps.push(now);
  ipSubmissions.set(ip, { timestamps: activeTimestamps });

  // Periodically clean up memory if map grows
  if (ipSubmissions.size > 1000) {
    for (const [key, rec] of ipSubmissions.entries()) {
      const valid = rec.timestamps.filter((t) => now - t < WINDOW_DURATION_MS);
      if (valid.length === 0) {
        ipSubmissions.delete(key);
      } else {
        ipSubmissions.set(key, { timestamps: valid });
      }
    }
  }

  return true;
}

function isDuplicateSubmission(lead: { name: string; email: string; phone: string }): boolean {
  const hash = `${lead.email.toLowerCase()}|${lead.phone}|${lead.name.toLowerCase()}`;
  const now = Date.now();
  const lastTime = recentLeadHashes.get(hash);

  if (lastTime && now - lastTime < DEDUPE_WINDOW_MS) {
    return true;
  }

  recentLeadHashes.set(hash, now);

  // Clean old hashes
  if (recentLeadHashes.size > 500) {
    for (const [k, time] of recentLeadHashes.entries()) {
      if (now - time > DEDUPE_WINDOW_MS) {
        recentLeadHashes.delete(k);
      }
    }
  }

  return false;
}

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().min(1, "Please enter a phone number.").max(40, "That phone number is too long."),
  eventType: z.enum(EVENT_TYPES, { message: "Please choose the kind of event you're running." }),
  solution: z.enum(SOLUTIONS, { message: "Please choose which solution you're interested in." }),
});

type LeadField = keyof z.infer<typeof leadSchema>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
  values?: Partial<Record<LeadField, string>>;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  // 1. Dual Honeypot: hidden fields no human ever sees. Bots fill every input
  // they find. If either is populated, silently shadowban (return success without sending).
  const hpWebsite = ((formData.get("website") as string) ?? "").trim();
  const hpCompany = ((formData.get("company_hp") as string) ?? "").trim();
  if (hpWebsite !== "" || hpCompany !== "") {
    return { status: "success" };
  }

  // 2. Speed Trap: bots submit forms in milliseconds. Humans take at least a few seconds.
  const renderedAtStr = formData.get("_rendered_at") as string | null;
  if (renderedAtStr) {
    const renderedAt = parseInt(renderedAtStr, 10);
    if (!isNaN(renderedAt)) {
      const elapsed = Date.now() - renderedAt;
      if (elapsed < MIN_FILL_TIME_MS) {
        // Silently shadowban ultra-fast automated submissions
        return { status: "success" };
      }
    }
  }

  const raw = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    eventType: (formData.get("eventType") as string) ?? "",
    solution: (formData.get("solution") as string) ?? "",
  };

  // 3. Sliding Window IP Rate Limiting (max 3 per 10 minutes)
  const clientIp = await getClientIp();
  const allowed = checkRateLimit(clientIp);
  if (!allowed) {
    return {
      status: "error",
      message: `Too many submissions from your network. Please wait a few minutes before trying again or email us directly at ${FALLBACK_EMAIL}.`,
      values: raw,
    };
  }

  // 4. Schema validation
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as LeadField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
      values: raw,
    };
  }

  const lead = parsed.data;

  // 5. Duplicate Submission Debounce (prevent double-click / rapid resubmit)
  if (isDuplicateSubmission(lead)) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[submitLead] RESEND_API_KEY is not set; cannot send lead notification.");
    return {
      status: "error",
      message: `Something went wrong on our end. Please email us directly at ${FALLBACK_EMAIL}.`,
      values: raw,
    };
  }

  const lines = [
    `Name:       ${lead.name}`,
    `Email:      ${lead.email}`,
    `Phone:      ${lead.phone}`,
    `Event type: ${lead.eventType}`,
    `Interest:   ${lead.solution}`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: lead.email,
      subject: `New demo request: ${lead.name} (${lead.eventType})`,
      text: lines.join("\n"),
      html: `
        <h2 style="margin:0 0 16px;font-family:sans-serif;">New demo request</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
          <tr><td><strong>Event type</strong></td><td>${escapeHtml(lead.eventType)}</td></tr>
          <tr><td><strong>Interest</strong></td><td>${escapeHtml(lead.solution)}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("[submitLead] Resend rejected the send:", error);
      return {
        status: "error",
        message: `We couldn't send that just now. Please email us directly at ${FALLBACK_EMAIL}.`,
        values: raw,
      };
    }
  } catch (err) {
    console.error("[submitLead] Unexpected error sending lead notification:", err);
    return {
      status: "error",
      message: `We couldn't send that just now. Please email us directly at ${FALLBACK_EMAIL}.`,
      values: raw,
    };
  }

  return { status: "success" };
}
