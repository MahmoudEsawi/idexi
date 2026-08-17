"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, Mail, ShieldCheck, Workflow } from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md" (Face's own
// 3-step brief: selfie -> photographer upload & match -> email delivery)
// plus the already-vetted Privacy/Integration language this page shipped
// with previously — carried forward rather than dropped, since the new
// brief is additive framing, not a replacement of those facts. No claim
// here that isn't in one of those two sources; PRODUCT.md's ban on
// unverified retention/compliance claims still applies.
const steps = [
  {
    title: "The Selfie",
    desc: "At registration, each guest takes a quick selfie and leaves an email address. That's the only thing they do differently, and it takes a few seconds.",
  },
  {
    title: "The Match",
    desc: "Your photographers keep shooting the way they always do. The moment the photos land in our system, idexi Face scans every face in every image and works out who's in which shot.",
  },
  {
    title: "The Delivery",
    desc: "Each guest gets one email with a link to their own gallery, not the whole shared album. Nothing to download, nothing to install.",
  },
];

const targetAudiences = ["Gala Dinners & Weddings", "Corporate Summits", "Concerts & Sports"];

// Deterministic muted tones for the 9 demo grid tiles, not randomized —
// matches this project's established convention (see EventLifecycleSection)
// so the widget renders identically on every load.
const GRID_TONES = [0.55, 0.4, 0.7, 0.3, 0.85, 0.45, 0.6, 0.35, 0.5];
const MATCHED_TILE_INDEX = 4;

function MatchDemo() {
  return (
    <div className="face-demo" aria-hidden="true">
      <span className="face-demo-header">idexi Face &middot; Live Matching</span>
      <div className="face-demo-grid">
        {GRID_TONES.map((tone, i) => (
          <span
            key={i}
            className={`face-demo-tile${i === MATCHED_TILE_INDEX ? " face-demo-tile-matched" : ""}`}
            style={{ "--tile-tone": tone } as React.CSSProperties}
          >
            {i === MATCHED_TILE_INDEX && <CheckCircle2 size={16} className="face-demo-tile-check" />}
          </span>
        ))}
        <span className="face-demo-scan-line" />
      </div>
      <div className="face-demo-toast">
        <Mail size={15} />
        <span>Gallery sent to guest</span>
      </div>
    </div>
  );
}

export default function FaceService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container">
      <style>{faceCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Camera size={14} /> idexi Face
          </span>
        </div>

        {/* Hero */}
        <div className="service-hero-grid face-hero">
          <div className="service-info-col">
            <h1 className="service-title">Your Event Photos, Delivered Instantly</h1>
            <p className="service-description">
              Guests take a selfie at registration. Once your photographers upload the event photos, idexi Face
              matches every face and emails each guest a link to their own gallery, so nobody has to dig through a
              shared folder to find themselves.
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
            <MatchDemo />
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
              <span className="service-bento-feature-stat">One selfie. One email.</span>
              <p className="service-bento-feature-desc">
                That covers the guest&apos;s entire experience, from registration to the photos landing in their inbox.
              </p>
            </div>
            <div className="service-bento-card">
              <ShieldCheck size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Privacy by Design</h3>
              <p className="service-bento-card-desc">
                Matching runs on idexi&apos;s infrastructure for your event, and you stay in control of your own
                event&apos;s data.
              </p>
            </div>
            <div className="service-bento-card">
              <Workflow size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Built Around Your Event</h3>
              <p className="service-bento-card-desc">
                Share your ticketing or registration setup and our team builds the integration around what you
                already use.
              </p>
            </div>
          </div>
        </div>

        {/* Who is it for */}
        <div className="service-section service-audience-compact">
          <h2 className="service-subsection-title">Who Is It For?</h2>
          <div className="service-audience-chips">
            {targetAudiences.map((aud, idx) => (
              <span key={idx} className="service-audience-chip">{aud}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const faceCSS = `
  .face-hero {
    align-items: center;
  }

  /* ── Live matching demo: a photo grid, a scan sweep, one match, one
     delivery toast. Single 7s CSS-only loop (no JS timers), matching this
     project's established widget convention. ── */
  .face-demo {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .face-demo-header {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-on-surface-variant);
  }
  .face-demo-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding: 1.25rem;
    border-radius: var(--st-radius-lg);
    background: var(--st-surface-container-low);
    overflow: hidden;
  }
  .face-demo-tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--st-secondary) calc(var(--tile-tone) * 55%), var(--st-surface-container-high));
    opacity: 0;
    animation: face-tile-in 0.5s ease both;
    animation-delay: calc(var(--tile-tone) * 0.4s);
  }
  @keyframes face-tile-in {
    to { opacity: 1; }
  }
  .face-demo-tile-matched {
    animation: face-tile-in 0.5s ease both, face-tile-pulse 3.5s ease-in-out 1.2s infinite;
  }
  .face-demo-tile-check {
    color: #ffffff;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
    opacity: 0;
    animation: face-check-in 3.5s ease-in-out 1.2s infinite;
  }
  @keyframes face-tile-pulse {
    0%, 30% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--st-secondary) 55%, transparent); }
    45% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--st-secondary) 0%, transparent); }
    100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--st-secondary) 0%, transparent); }
  }
  @keyframes face-check-in {
    0%, 28% { opacity: 0; transform: scale(0.7); }
    38%, 85% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.7); }
  }
  .face-demo-scan-line {
    position: absolute;
    left: 0.6rem;
    right: 0.6rem;
    height: 2px;
    top: 1.25rem;
    border-radius: var(--st-radius-full);
    background: linear-gradient(90deg, transparent, var(--st-secondary), transparent);
    box-shadow: 0 0 8px 1px color-mix(in srgb, var(--st-secondary) 60%, transparent);
    animation: face-scan-sweep 3.5s ease-in-out infinite;
  }
  @keyframes face-scan-sweep {
    0% { top: 1.25rem; opacity: 0; }
    8% { opacity: 1; }
    32% { top: calc(100% - 1.5rem); opacity: 1; }
    40%, 100% { opacity: 0; }
  }
  .face-demo-toast {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: var(--st-radius-full);
    background: color-mix(in srgb, var(--status-success) 14%, transparent);
    color: var(--status-success);
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.85rem;
    opacity: 0;
    transform: translateY(6px);
    animation: face-toast-in 3.5s ease-in-out 1.2s infinite;
  }
  @keyframes face-toast-in {
    0%, 34% { opacity: 0; transform: translateY(6px); }
    46%, 85% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .face-demo-tile {
      opacity: 1;
      animation: none;
    }
    .face-demo-tile-matched {
      animation: none;
    }
    .face-demo-tile-check {
      opacity: 1;
      animation: none;
      transform: none;
    }
    .face-demo-scan-line {
      display: none;
    }
    .face-demo-toast {
      opacity: 1;
      animation: none;
      transform: none;
    }
  }

  @media (max-width: 991px) {
    .face-hero {
      align-items: stretch;
    }
  }
`;
