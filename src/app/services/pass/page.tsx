"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Ticket,
  WifiOff,
  QrCode,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Upload Guest List",
    desc: "Upload an Excel sheet with names and categories, or let guests register directly.",
  },
  {
    title: "1-Click Generation",
    desc: "Generate unique, encrypted QR passes for thousands of guests in seconds.",
  },
  {
    title: "Instant Delivery",
    desc: "Every guest receives their branded digital ticket in their inbox within 5 minutes.",
  },
];

const passAudiences = [
  {
    id: "vip",
    title: "VIP Events & Dinners",
    image: "/pass-private-dinner.jpg",
    desc: "Bespoke branded digital passes with VIP lounge access and personalized welcome alerts.",
  },
  {
    id: "expos",
    title: "High-Volume Expos",
    image: "/pass-arena-expo.jpg",
    desc: "Instant bulk generation of offline-ready barcodes capable of scanning thousands per minute.",
  },
  {
    id: "conferences",
    title: "Multi-Day Conferences",
    image: "/pass-multi-summit.jpg",
    desc: "Multi-track access and tiered session permissions encoded into one digital credential.",
  },
];

function PassAutoDemo() {
  return (
    <div className="pass-auto-demo" aria-hidden="true">
      <div className="pass-ticket-stub">
        <div className="pass-stub-top">
          <div className="pass-stub-brand">
            <Ticket size={16} className="pass-brand-icon" />
            <span>idexi Pass</span>
          </div>
          <span className="pass-pill-status">ALL-ACCESS VIP</span>
        </div>

        <div className="pass-stub-body">
          <div className="pass-guest-block">
            <span className="pass-label">ATTENDEE</span>
            <strong className="pass-name">Clara Henderson</strong>
            <span className="pass-sub">Apex Global &middot; Suite 4</span>
          </div>
        </div>

        <div className="pass-stub-divider">
          <span className="pass-notch-l" />
          <span className="pass-dash" />
          <span className="pass-notch-r" />
        </div>

        <div className="pass-stub-foot">
          <div className="pass-qr-wrap">
            <QrCode size={48} />
            <span className="pass-laser-sweep" />
          </div>
          <div className="pass-meta-block">
            <span className="pass-code">IDX-VIP-8821</span>
            <span className="pass-note">Encrypted Dynamic QR</span>
          </div>
        </div>
      </div>

      <div className="pass-auto-toast">
        <CheckCircle2 size={16} />
        <span>1,284 passes issued in &lt; 5m</span>
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
            <h1 className="service-title">Smart Digital Passes, Issued in Minutes</h1>
            <p className="service-description">
              Upload your guest list and deliver unique, branded digital passes to every inbox in under 5 minutes.
              No manual approvals, no generic PDFs.
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
            <PassAutoDemo />
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

        {/* Proof Bento */}
        <div className="service-bento-section">
          <div className="service-bento">
            <div className="service-bento-feature">
              <span className="service-bento-feature-stat">Under 5 minutes</span>
              <p className="service-bento-feature-desc">
                From spreadsheet upload to personalized passes in every guest inbox.
              </p>
            </div>
            <div className="service-bento-card">
              <WifiOff size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Works Offline</h3>
              <p className="service-bento-card-desc">
                Verifies instantly at venue gates even with zero cellular signal.
              </p>
            </div>
            <div className="service-bento-card">
              <ShieldCheck size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Fraud Protected</h3>
              <p className="service-bento-card-desc">
                Dynamic encrypted barcodes prevent duplicate or forwarded scans.
              </p>
            </div>
          </div>
        </div>

        {/* Clean, Visual Who Is It For */}
        <div className="service-section">
          <h2 className="service-subsection-title">Who Is It For?</h2>
          <div className="pass-audience-grid">
            {passAudiences.map((aud) => (
              <div key={aud.id} className="pass-audience-card">
                <div className="pass-aud-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="pass-aud-img"
                  />
                  <div className="pass-aud-scrim" />
                </div>
                <div className="pass-aud-content">
                  <h3 className="pass-aud-title">{aud.title}</h3>
                  <p className="pass-aud-desc">{aud.desc}</p>
                </div>
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

  /* ── AUTO-ANIMATED DIGITAL PASS DEMO ── */
  .pass-auto-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .pass-ticket-stub {
    position: relative;
    width: 100%;
    border-radius: 1.25rem;
    background: linear-gradient(145deg, #141b2d, #0d1220);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.6);
    padding: 1.35rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: pass-card-float 6s ease-in-out infinite;
  }

  @keyframes pass-card-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  .pass-stub-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pass-stub-brand {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.85rem;
    color: #ffffff;
  }
  .pass-brand-icon {
    color: var(--st-secondary);
  }
  .pass-pill-status {
    font-family: var(--st-font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 0.2rem 0.5rem;
    border-radius: 9999px;
    background: rgba(251, 191, 36, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(251, 191, 36, 0.3);
  }

  .pass-stub-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .pass-label {
    font-family: var(--st-font-ui);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.45);
  }
  .pass-name {
    font-family: var(--st-font-display);
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
  }
  .pass-sub {
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .pass-stub-divider {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 -1.35rem;
    height: 16px;
  }
  .pass-notch-l, .pass-notch-r {
    width: 12px;
    height: 18px;
    background: var(--st-surface-container);
    position: absolute;
  }
  .pass-notch-l {
    left: 0;
    border-radius: 0 10px 10px 0;
  }
  .pass-notch-r {
    right: 0;
    border-radius: 10px 0 0 10px;
  }
  .pass-dash {
    flex: 1;
    margin: 0 18px;
    border-bottom: 1.5px dashed rgba(255, 255, 255, 0.2);
  }

  .pass-stub-foot {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .pass-qr-wrap {
    position: relative;
    padding: 0.35rem;
    background: #ffffff;
    color: #0b0f19;
    border-radius: var(--st-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .pass-laser-sweep {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent, rgba(56, 189, 248, 0.4), transparent);
    animation: pass-qr-sweep 3s ease-in-out infinite;
  }
  @keyframes pass-qr-sweep {
    0%, 100% { top: -100%; }
    50% { top: 100%; }
  }

  .pass-meta-block {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .pass-code {
    font-family: var(--st-font-mono, monospace);
    font-size: 0.82rem;
    font-weight: 700;
    color: #ffffff;
  }
  .pass-note {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.55);
  }

  .pass-auto-toast {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 9999px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    font-family: var(--st-font-ui);
    font-size: 0.8rem;
    font-weight: 600;
    animation: pass-toast-fade 4s ease-in-out infinite;
  }
  @keyframes pass-toast-fade {
    0%, 100% { opacity: 0.7; transform: scale(0.98); }
    50% { opacity: 1; transform: scale(1); }
  }

  /* ── CLEAN AUDIENCE CARDS ── */
  .pass-audience-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .pass-audience-card {
    position: relative;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  .pass-audience-card:hover {
    transform: translateY(-4px);
    border-color: var(--st-secondary);
  }

  .pass-aud-media {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .pass-aud-img {
    object-fit: cover;
  }
  .pass-aud-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(13, 18, 32, 0.95) 100%);
  }

  .pass-aud-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .pass-aud-title {
    font-family: var(--st-font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
  }
  .pass-aud-desc {
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  @media (max-width: 991px) {
    .pass-audience-grid {
      grid-template-columns: 1fr;
    }
    .pass-hero {
      align-items: stretch;
    }
  }
`;
