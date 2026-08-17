"use server";

import { Resend } from "resend";
import { z } from "zod";

// Where consultation requests land, and who they appear to come from.
// Both sit on idexi.tech, so that is the single domain that has to be
// verified in Resend (SPF + DKIM records on its DNS) before sends succeed.
const TO_EMAIL = "info@idexi.tech";

// Overridable via env purely so the form can be exercised locally before
// idexi.tech finishes verifying: Resend's shared onboarding@resend.dev
// sender works without any DNS setup, but only delivers to the address that
// owns the Resend account. Leave RESEND_FROM_EMAIL unset in production.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "idexi Website <noreply@idexi.tech>";

// Shown to the user if the send fails, so a lead that hits an outage still
// has a way to reach us instead of silently evaporating.
const FALLBACK_EMAIL = "info@idexi.tech";

const SOLUTIONS = ["idexi Face", "idexi Flow", "idexi Pass", "All Services"] as const;

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().min(1, "Please enter a phone number.").max(40, "That phone number is too long."),
  company: z.string().trim().max(120, "That company name is too long.").optional(),
  solution: z.enum(SOLUTIONS, { message: "Please choose which solution you're interested in." }),
  event: z.string().trim().max(2000, "Please keep this under 2000 characters.").optional(),
});

type LeadField = keyof z.infer<typeof leadSchema>;

// Type-only export. A "use server" module may only export async functions at
// runtime, and types are erased at compile time, so this is safe. The matching
// initial state lives in the component for the same reason: exporting a plain
// object from here is a runtime error ("can only export async functions").
export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
  /** Echoed back on failure so a rejected submit doesn't wipe what they typed. */
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
  // Honeypot: a hidden field no human ever sees. Bots fill every input they
  // find, so anything here means automation. Return the normal success shape
  // rather than an error, so the bot gets no signal that it was caught.
  if (((formData.get("website") as string) ?? "").trim() !== "") {
    return { status: "success" };
  }

  const raw = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    company: (formData.get("company") as string) ?? "",
    solution: (formData.get("solution") as string) ?? "",
    event: (formData.get("event") as string) ?? "",
  };

  // Client-side HTML5 validation is a convenience, not a guarantee: this
  // action is a public POST endpoint that can be called directly, so the
  // schema is what actually decides whether a submission is acceptable.
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
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Phone:    ${lead.phone}`,
    `Company:  ${lead.company || "(not provided)"}`,
    `Interest: ${lead.solution}`,
    "",
    "About the event:",
    lead.event || "(not provided)",
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      // Hitting reply in the inbox replies to the prospect. Their address is
      // deliberately NOT used as `from`: sending as a domain we don't control
      // fails SPF/DMARC and hurts deliverability.
      replyTo: lead.email,
      subject: `New consultation request: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: lines.join("\n"),
      html: `
        <h2 style="margin:0 0 16px;font-family:sans-serif;">New consultation request</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
          <tr><td><strong>Company</strong></td><td>${escapeHtml(lead.company || "(not provided)")}</td></tr>
          <tr><td><strong>Interest</strong></td><td>${escapeHtml(lead.solution)}</td></tr>
        </table>
        <h3 style="margin:20px 0 6px;font-family:sans-serif;">About the event</h3>
        <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;">${escapeHtml(lead.event || "(not provided)")}</p>
      `,
    });

    if (error) {
      // Log the reason, not the payload: container/function logs shouldn't
      // become an unmanaged copy of every prospect's contact details.
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
