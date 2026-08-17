"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, FileSpreadsheet, ShieldCheck, Ticket, WifiOff, Zap } from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md"'s Pass section
// (guest list -> one-click generation -> delivery in under 5 minutes).
// The offline / fraud-protection proof points are carried forward from
// this page's already-vetted copy rather than dropped, since the new
// brief covers issuance, not verification, and both are real capabilities
// per PRODUCT.md.
const steps = [
  {
    title: "The Guest List",
    desc: "Upload an Excel sheet with your attendees' names and categories, or let them register directly through our platform.",
  },
  {
    title: "The Automation",
    desc: "One click generates a unique QR code for every guest, whether that's a dozen people or a few thousand.",
  },
  {
    title: "The Delivery",
    desc: "Within five minutes, each guest has a professional email ticket with their name, category, and personal QR code already on it.",
  },
];

const targetAudiences = [
  { title: "VIP Events & Dinners", desc: "Deliver seamless, highly personal welcomes with facial check-ins for high-profile guests." },
  { title: "Heavy Attendance Expos", desc: "Deploy offline-ready entry tunnels capable of scanning thousands of tickets per minute." },
  { title: "Multi-Day Conferences", desc: "Secure secondary session rooms and workshops with sub-gate verification rules." },
];

// Deterministic guest names for the ticket-generation demo, not randomized
// — same determinism convention used across this project's other widgets.
const DEMO_NAMES = ["Clara Henderson", "Marcus Webb", "Priya Anand", "Tomas Riel"];

const TICKET_COUNT_TARGET = 1284;
const TICKET_COUNT_DURATION_MS = 2600;

function TicketGeneratorDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [animatedCount, setAnimatedCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Counts up once on mount and settles at the target — a running total
  // that resets and recounts on a loop would read as the count going
  // backwards, which is confusing for something framed as a live tally.
  // Reduced motion skips the animation loop entirely (no setState call on
  // that path) rather than animating to the target and stopping there;
  // the target is read directly at render time below instead.
  useEffect(() => {
    if (prefersReducedMotion) return;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / TICKET_COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedCount(Math.round(eased * TICKET_COUNT_TARGET));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  const count = prefersReducedMotion ? TICKET_COUNT_TARGET : animatedCount;

  return (
    <div className="pass-demo" aria-hidden="true">
      <span className="pass-demo-header">idexi Pass &middot; Bulk Generation</span>

      <div className="pass-demo-row">
        <FileSpreadsheet size={16} className="pass-demo-row-icon" />
        <div className="pass-demo-row-cells">
          {DEMO_NAMES.map((name) => (
            <span key={name} className="pass-demo-cell">{name}</span>
          ))}
        </div>
      </div>

      <div className="pass-demo-arrow">
        <Zap size={18} />
      </div>

      <div className="pass-demo-ticket">
        <div className="pass-demo-ticket-qr" />
        <div className="pass-demo-ticket-info">
          <span className="pass-demo-ticket-name">{DEMO_NAMES[0]}</span>
          <span className="pass-demo-ticket-tag">VIP Access</span>
        </div>
      </div>

      <div className="pass-demo-counter">
        <span className="pass-demo-counter-value">{count.toLocaleString()}</span>
        <span className="pass-demo-counter-label">tickets generated</span>
      </div>
    </div>
  );
}

export default function PassService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container">
      <style>{passCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Ticket size={14} /> idexi Pass
          </span>
        </div>

        {/* Hero */}
        <div className="service-hero-grid pass-hero">
          <div className="service-info-col">
            <h1 className="service-title">Smart Digital Ticketing</h1>
            <p className="service-description">
              idexi Pass replaces manual ticket approvals and generic emails with one click: upload your guest
              list, or let attendees register directly, and every guest gets a unique, branded QR ticket in
              minutes.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book Consultation <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TicketGeneratorDemo />
          </motion.div>
        </div>

        {/* How it works */}
        <div className="service-section">
          <h2 className="service-subsection-title">How It Works</h2>
          <div className="service-process">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                className="service-process-step"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="service-process-number">0{idx + 1}</span>
                <h3 className="service-process-title">{step.title}</h3>
                <p className="service-process-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proof */}
        <div className="service-bento-section">
          <div className="service-bento">
            <div className="service-bento-feature">
              <span className="service-bento-feature-stat">Under 5 minutes</span>
              <p className="service-bento-feature-desc">
                That&apos;s how long it takes for every guest on your list to have a ticket in their inbox, however
                many there are.
              </p>
            </div>
            <div className="service-bento-card">
              <WifiOff size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Works Offline</h3>
              <p className="service-bento-card-desc">
                Venues with weak cellular service pose no risk. Our hardware works offline and syncs the moment
                connection returns.
              </p>
            </div>
            <div className="service-bento-card">
              <ShieldCheck size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Fraud Protection</h3>
              <p className="service-bento-card-desc">
                Encrypted, dynamic barcodes mean a screenshotted or forwarded ticket won&apos;t scan twice.
              </p>
            </div>
          </div>
        </div>

        {/* Who is it for */}
        <div className="service-section">
          <h2 className="service-subsection-title">Who Is It For?</h2>
          <div className="service-audience-bento">
            {targetAudiences.map((aud, idx) => (
              <div key={aud.title} className={`service-bento-card${idx === 0 ? " service-audience-feature" : ""}`}>
                <h3 className="service-bento-card-title">{aud.title}</h3>
                <p className="service-bento-card-desc">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const passCSS = `
  .pass-hero {
    align-items: center;
  }

  .pass-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .pass-demo-header {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-on-surface-variant);
  }
  .pass-demo-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1.1rem;
    border-radius: var(--st-radius-md);
    background: var(--st-surface-container-low);
  }
  .pass-demo-row-icon {
    flex-shrink: 0;
    color: var(--st-secondary);
  }
  .pass-demo-row-cells {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }
  .pass-demo-cell {
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pass-demo-arrow {
    align-self: center;
    color: var(--st-secondary);
    animation: pass-arrow-pulse 1.8s ease-in-out infinite;
  }
  @keyframes pass-arrow-pulse {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50% { transform: translateY(3px); opacity: 1; }
  }
  .pass-demo-ticket {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem;
    border-radius: var(--st-radius-lg);
    background: linear-gradient(135deg, #14224a, #0d1b3e);
    box-shadow: 0 16px 40px -12px rgba(13, 27, 62, 0.5);
  }
  .pass-demo-ticket-qr {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: var(--st-radius-sm);
    background:
      linear-gradient(#fff, #fff) 0 0 / 10px 10px,
      linear-gradient(#fff, #fff) calc(100% - 10px) 0 / 10px 10px,
      linear-gradient(#fff, #fff) 0 calc(100% - 10px) / 10px 10px,
      repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 6px);
    background-repeat: no-repeat, no-repeat, no-repeat, repeat;
    background-color: #ffffff1a;
  }
  .pass-demo-ticket-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .pass-demo-ticket-name {
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.9rem;
    color: #ffffff;
  }
  .pass-demo-ticket-tag {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: var(--accent-pass, #34d399);
  }
  .pass-demo-counter {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--st-outline-variant);
  }
  .pass-demo-counter-value {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: 1.6rem;
    color: var(--st-on-background);
    font-variant-numeric: tabular-nums;
  }
  .pass-demo-counter-label {
    font-family: var(--st-font-ui);
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
  }

  @media (prefers-reduced-motion: reduce) {
    .pass-demo-arrow {
      animation: none;
    }
  }

  @media (max-width: 991px) {
    .pass-hero {
      align-items: stretch;
    }
  }
`;
