"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileSpreadsheet,
  ShieldCheck,
  Ticket,
  WifiOff,
  Zap,
  Crown,
  Check,
  QrCode,
  Sparkles,
  Smartphone,
} from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md"
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

const passTiers = [
  {
    id: "vip",
    tierName: "VIP All-Access",
    guestName: "Clara Henderson",
    company: "Apex Global",
    seat: "Suite 4 · VIP Lounge",
    themeClass: "tier-vip",
    accentColor: "#fbbf24",
    badgeLabel: "ALL-ACCESS",
    code: "IDX-VIP-8821",
  },
  {
    id: "delegate",
    tierName: "Keynote Delegate",
    guestName: "Marcus Webb",
    company: "Synthetix Labs",
    seat: "Hall 1 · Row B-12",
    themeClass: "tier-delegate",
    accentColor: "#34d399",
    badgeLabel: "DELEGATE",
    code: "IDX-DEL-4092",
  },
  {
    id: "press",
    tierName: "Press & Media",
    guestName: "Elena Rostova",
    company: "Tech Insider",
    seat: "Media Box · Level 2",
    themeClass: "tier-press",
    accentColor: "#818cf8",
    badgeLabel: "PRESS PASS",
    code: "IDX-PRS-9174",
  },
];

const passAudiences = [
  {
    id: "vip",
    title: "VIP Events & Dinners",
    shortTitle: "VIP Events & Dinners",
    image: "/pass-private-dinner.jpg",
    icon: Crown,
    badge: "Personalized Passes",
    status: "VIP INVITATIONS",
    desc: "Deliver personalized, branded digital passes with category-level access for high-profile attendees and VIP dinner guests.",
    specs: [
      { label: "Generation", value: "< 5 Mins" },
      { label: "Design", value: "Custom Branded" },
      { label: "Security", value: "Dynamic QR" },
    ],
    highlight: "Instant white-glove email pass delivery",
  },
  {
    id: "expos",
    title: "Heavy Attendance Expos",
    shortTitle: "High-Volume Expos",
    image: "/pass-arena-expo.jpg",
    icon: Zap,
    badge: "Bulk Generation",
    status: "BULK ISSUANCE",
    desc: "Generate and distribute thousands of encrypted barcodes in minutes from simple spreadsheet uploads, ready for offline entry gates.",
    specs: [
      { label: "Batch Scale", value: "Thousands" },
      { label: "Offline", value: "Built-In" },
      { label: "Issuance", value: "1-Click" },
    ],
    highlight: "Upload an Excel sheet and deliver tickets in minutes",
  },
  {
    id: "conferences",
    title: "Multi-Day Conferences",
    shortTitle: "Multi-Day Conferences",
    image: "/pass-multi-summit.jpg",
    icon: Ticket,
    badge: "Tiered Access",
    status: "TIERED PASSES",
    desc: "Secure workshop rooms, keynotes, and evening receptions with multi-tier access permissions encoded into a single digital pass.",
    specs: [
      { label: "Tiers", value: "Unlimited" },
      { label: "Validation", value: "Sub-Gates" },
      { label: "Delivery", value: "Instant Email" },
    ],
    highlight: "One pass manages multi-day access across all halls",
  },
];

const TICKET_COUNT_TARGET = 1284;
const TICKET_COUNT_DURATION_MS = 2600;

function InteractiveWalletStudio() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  const activeTier = passTiers[selectedTierIdx];

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
    <div className="pass-wallet-studio">
      <div className="pass-studio-header">
        <span className="pass-studio-title">Interactive Wallet Pass</span>
        <div className="pass-tier-selector">
          {passTiers.map((tier, idx) => (
            <button
              key={tier.id}
              type="button"
              className={`pass-tier-btn ${selectedTierIdx === idx ? "is-active" : ""}`}
              onClick={() => setSelectedTierIdx(idx)}
            >
              {tier.tierName}
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Digital Wallet Pass Card */}
      <div className={`pass-ticket-card ${activeTier.themeClass}`}>
        <div className="pass-card-head">
          <div className="pass-brand-mark">
            <Ticket size={16} style={{ color: activeTier.accentColor }} />
            <span>idexi Pass</span>
          </div>
          <span className="pass-tier-ribbon" style={{ color: activeTier.accentColor, borderColor: `${activeTier.accentColor}40` }}>
            {activeTier.badgeLabel}
          </span>
        </div>

        <div className="pass-card-main">
          <div className="pass-field-group">
            <span className="pass-field-label">ATTENDEE</span>
            <span className="pass-guest-name">{activeTier.guestName}</span>
            <span className="pass-company-name">{activeTier.company}</span>
          </div>

          <div className="pass-field-group pass-field-seat">
            <span className="pass-field-label">ACCESS LEVEL / SEAT</span>
            <span className="pass-seat-val">{activeTier.seat}</span>
          </div>
        </div>

        {/* Perforated Tear Line with circular cutouts */}
        <div className="pass-perforation" aria-hidden="true">
          <div className="pass-notch pass-notch-left" />
          <div className="pass-dash-line" />
          <div className="pass-notch pass-notch-right" />
        </div>

        <div className="pass-card-footer">
          <div className="pass-qr-box">
            <QrCode size={46} className="pass-qr-icon" />
            <span className="pass-qr-glimmer" />
          </div>
          <div className="pass-qr-meta">
            <span className="pass-code-str">{activeTier.code}</span>
            <span className="pass-scan-note">Instant 1-Scan Verification</span>
          </div>
        </div>
      </div>

      {/* Live Batch Generation Counter */}
      <div className="pass-studio-stats">
        <div className="pass-stat-item">
          <FileSpreadsheet size={16} className="pass-stat-icon" />
          <span>Excel to Email</span>
        </div>
        <div className="pass-stat-counter">
          <strong className="pass-stat-num">{count.toLocaleString()}</strong>
          <span className="pass-stat-txt">passes issued in &lt; 5m</span>
        </div>
      </div>
    </div>
  );
}

function PassAudienceShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const active = passAudiences[activeIdx];
  const Icon = active.icon;

  return (
    <div className="service-section pass-showcase-section">
      <div className="pass-showcase-header">
        <span className="pass-showcase-eyebrow">Who Is It For?</span>
        <h2 className="service-subsection-title">Tailored For Every Ticket Model</h2>
      </div>

      <div className="pass-showcase-container">
        {/* Left: 3D Layered Card Deck */}
        <div className="pass-deck-stage" role="tablist" aria-label="Event Types">
          {passAudiences.map((aud, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={aud.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`pass-deck-card pass-deck-card-${idx} ${isActive ? "is-active" : "is-inactive"}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
              >
                <div className="pass-deck-card-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 300px, 320px"
                    className="pass-deck-img"
                    priority={idx === 0}
                  />
                  <div className="pass-deck-card-scrim" />
                </div>

                <div className="pass-deck-card-content">
                  <span className="pass-deck-badge">{aud.status}</span>
                  <div className="pass-deck-card-bottom">
                    <h3 className="pass-deck-title">{aud.title}</h3>
                    <span className="pass-deck-meta">{aud.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Clean, Direct Modern Intelligence Panel */}
        <div className="pass-clean-panel" role="tabpanel">
          {/* Top Segmented Controls */}
          <div className="pass-clean-tabs">
            {passAudiences.map((aud, idx) => (
              <button
                key={aud.id}
                type="button"
                className={`pass-clean-tab ${activeIdx === idx ? "pass-clean-tab-active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {aud.shortTitle}
              </button>
            ))}
          </div>

          {/* Direct Value Info */}
          <div className="pass-clean-body">
            <div className="pass-clean-header-row">
              <div className="pass-clean-icon-wrap">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="pass-clean-title">{active.title}</h3>
                <span className="pass-clean-badge">{active.badge}</span>
              </div>
            </div>

            <p className="pass-clean-desc">{active.desc}</p>

            {/* Direct Specs */}
            <div className="pass-clean-specs-grid">
              {active.specs.map((spec, i) => (
                <div key={i} className="pass-clean-spec">
                  <span className="pass-clean-spec-label">{spec.label}</span>
                  <span className="pass-clean-spec-val">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Key takeaway */}
            <div className="pass-clean-highlight">
              <Check size={16} className="pass-clean-check" />
              <span>{active.highlight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PassService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container pass-page-theme">
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
            <span className="pass-kicker">Instant Digital Credential Engine</span>
            <h1 className="service-title">Smart Digital Passes, Issued in Minutes</h1>
            <p className="service-description">
              idexi Pass replaces manual ticket approvals and generic PDFs with automated digital credentials: upload your guest
              list, or let attendees register directly, and every guest receives an encrypted, branded Apple Wallet & email pass in
              under 5 minutes.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book Consultation <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame pass-studio-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveWalletStudio />
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
                That&apos;s how long it takes for every guest on your list to have a branded pass in their inbox, however
                many thousands there are.
              </p>
            </div>
            <div className="service-bento-card">
              <WifiOff size={22} style={{ color: "var(--accent-pass, #10b981)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Works Offline</h3>
              <p className="service-bento-card-desc">
                Venues with weak cellular service pose no risk. Our credentials verify offline and sync the moment
                connectivity returns.
              </p>
            </div>
            <div className="service-bento-card">
              <ShieldCheck size={22} style={{ color: "var(--accent-pass, #10b981)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Fraud Protection</h3>
              <p className="service-bento-card-desc">
                Encrypted, dynamic barcodes mean a screenshotted or forwarded ticket won&apos;t scan twice.
              </p>
            </div>
          </div>
        </div>

        {/* Who is it for - Fast, Clean, 3D Showcase */}
        <PassAudienceShowcase />
      </div>
    </div>
  );
}

const passCSS = `
  /* ── PASS THEME ACCENTS (EMERALD & MINT) ── */
  :root {
    --accent-pass: #10b981;
    --accent-pass-dim: rgba(16, 185, 129, 0.15);
  }

  .pass-page-theme .service-breadcrumb-current,
  .pass-page-theme .face-clean-meta {
    color: var(--accent-pass);
  }

  .pass-kicker {
    display: inline-block;
    font-family: var(--st-font-ui);
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-pass);
    margin-bottom: 0.5rem;
  }

  .pass-hero {
    align-items: center;
  }

  /* ── DIGITAL WALLET PASS STUDIO ── */
  .pass-wallet-studio {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  .pass-studio-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pass-studio-title {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .pass-tier-selector {
    display: flex;
    gap: 0.35rem;
    background: var(--st-surface-container-high);
    padding: 0.25rem;
    border-radius: var(--st-radius-md);
  }

  .pass-tier-btn {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.4rem 0.6rem;
    border-radius: calc(var(--st-radius-md) - 2px);
    font-family: var(--st-font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-align: center;
  }

  .pass-tier-btn:hover {
    color: var(--st-on-background);
  }

  .pass-tier-btn.is-active {
    background: var(--st-surface);
    color: var(--accent-pass);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  /* ── REALISTIC WALLET PASS CARD ── */
  .pass-ticket-card {
    position: relative;
    border-radius: 1.25rem;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5);
    transition: background 0.35s ease, border-color 0.35s ease;
    overflow: hidden;
  }

  .pass-ticket-card.tier-vip {
    background: linear-gradient(145deg, #181c2b, #0d111d);
    border-color: rgba(251, 191, 36, 0.35);
  }
  .pass-ticket-card.tier-delegate {
    background: linear-gradient(145deg, #092620, #041713);
    border-color: rgba(52, 211, 153, 0.35);
  }
  .pass-ticket-card.tier-press {
    background: linear-gradient(145deg, #151833, #0b0d1e);
    border-color: rgba(129, 140, 248, 0.35);
  }

  .pass-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pass-brand-mark {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.9rem;
    color: #ffffff;
  }

  .pass-tier-ribbon {
    font-family: var(--st-font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.55rem;
    border-radius: 9999px;
    border: 1px solid;
    background: rgba(0, 0, 0, 0.35);
  }

  .pass-card-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .pass-field-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .pass-field-label {
    font-family: var(--st-font-ui);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.5);
  }

  .pass-guest-name {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: #ffffff;
    line-height: 1.2;
  }

  .pass-company-name {
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .pass-field-seat {
    text-align: right;
  }

  .pass-seat-val {
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.85rem;
    color: #ffffff;
  }

  /* Perforation tear line with left/right notches */
  .pass-perforation {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 -1.4rem;
    height: 16px;
  }

  .pass-notch {
    width: 14px;
    height: 20px;
    background: var(--st-surface-container);
    border: 1px solid var(--st-outline-variant);
    position: absolute;
    top: -2px;
  }
  .pass-notch-left {
    left: -1px;
    border-radius: 0 10px 10px 0;
    border-left: none;
  }
  .pass-notch-right {
    right: -1px;
    border-radius: 10px 0 0 10px;
    border-right: none;
  }

  .pass-dash-line {
    flex: 1;
    margin: 0 18px;
    border-bottom: 1.5px dashed rgba(255, 255, 255, 0.2);
  }

  .pass-card-footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pass-qr-box {
    position: relative;
    padding: 0.4rem;
    border-radius: var(--st-radius-sm);
    background: #ffffff;
    color: #0d111d;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .pass-qr-glimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(16, 185, 129, 0.35) 50%, transparent 70%);
    animation: pass-qr-glint 3.5s ease-in-out infinite;
  }
  @keyframes pass-qr-glint {
    0%, 60% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .pass-qr-meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .pass-code-str {
    font-family: var(--st-font-mono, monospace);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  .pass-scan-note {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
  }

  /* Live batch stats */
  .pass-studio-stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: var(--st-radius-md);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
  }

  .pass-stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
  }
  .pass-stat-icon {
    color: var(--accent-pass);
  }

  .pass-stat-counter {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
  }
  .pass-stat-num {
    font-family: var(--st-font-display);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--accent-pass);
    font-variant-numeric: tabular-nums;
  }
  .pass-stat-txt {
    font-family: var(--st-font-ui);
    font-size: 0.75rem;
    color: var(--st-on-surface-variant);
  }

  /* ── 3D SHOWCASE SECTION ── */
  .pass-showcase-section {
    padding-top: 1rem;
  }
  .pass-showcase-header {
    margin-bottom: 2rem;
  }
  .pass-showcase-eyebrow {
    display: inline-block;
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-pass);
    margin-bottom: 0.4rem;
  }

  .pass-showcase-container {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
    align-items: center;
  }

  .pass-deck-stage {
    position: relative;
    width: 100%;
    height: 350px;
    perspective: 1200px;
    transform-style: preserve-3d;
    display: flex;
    align-items: center;
  }

  .pass-deck-card {
    position: absolute;
    width: 240px;
    height: 320px;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.35);
    outline: none;
    will-change: transform, opacity;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
                border-color 0.25s ease,
                box-shadow 0.25s ease,
                opacity 0.25s ease;
  }

  .pass-deck-card-0 {
    left: 6%;
    transform: translate3d(0, 0, 20px) rotateY(-16deg) rotateX(4deg) scale(0.96);
    z-index: 3;
  }
  .pass-deck-card-1 {
    left: 32%;
    transform: translate3d(0, 0, 0px) rotateY(-16deg) rotateX(4deg) scale(0.93);
    z-index: 2;
  }
  .pass-deck-card-2 {
    left: 58%;
    transform: translate3d(0, 0, -20px) rotateY(-16deg) rotateX(4deg) scale(0.9);
    z-index: 1;
  }

  .pass-deck-card.is-active,
  .pass-deck-card:hover {
    transform: translate3d(0, -10px, 60px) rotateY(0deg) rotateX(0deg) scale(1.04) !important;
    border-color: var(--accent-pass);
    box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--accent-pass) 35%, transparent);
    z-index: 10 !important;
    opacity: 1 !important;
  }

  .pass-deck-stage:hover .pass-deck-card.is-inactive {
    opacity: 0.7;
  }

  .pass-deck-card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .pass-deck-img {
    object-fit: cover;
  }
  .pass-deck-card-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(7, 13, 24, 0.35) 0%,
      rgba(7, 13, 24, 0.1) 40%,
      rgba(7, 13, 24, 0.85) 80%,
      rgba(7, 13, 24, 0.98) 100%
    );
  }

  .pass-deck-card-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.15rem;
  }
  .pass-deck-badge {
    align-self: flex-start;
    padding: 0.25rem 0.55rem;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #ffffff;
    font-family: var(--st-font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .pass-deck-card-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .pass-deck-title {
    font-family: var(--st-font-display);
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    line-height: 1.25;
  }
  .pass-deck-meta {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--accent-pass);
  }

  /* Clean, Direct Modern Intelligence Panel */
  .pass-clean-panel {
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
  }
  .pass-clean-tabs {
    display: flex;
    gap: 0.4rem;
    background: var(--st-surface-container-highest);
    padding: 0.3rem;
    border-radius: var(--st-radius-md);
    margin-bottom: 1.5rem;
  }
  .pass-clean-tab {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.45rem 0.5rem;
    border-radius: calc(var(--st-radius-md) - 2px);
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    white-space: nowrap;
  }
  .pass-clean-tab:hover {
    color: var(--st-on-background);
  }
  .pass-clean-tab-active {
    background: var(--st-surface);
    color: var(--accent-pass);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .pass-clean-body {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .pass-clean-header-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .pass-clean-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--accent-pass) 15%, transparent);
    color: var(--accent-pass);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pass-clean-title {
    font-family: var(--st-font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
    line-height: 1.2;
  }
  .pass-clean-badge {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--accent-pass);
  }

  .pass-clean-desc {
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  .pass-clean-specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    background: color-mix(in srgb, var(--st-surface-container-high) 45%, transparent);
    border-radius: var(--st-radius-md);
  }
  .pass-clean-spec {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .pass-clean-spec-label {
    font-family: var(--st-font-ui);
    font-size: 0.7rem;
    color: var(--st-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .pass-clean-spec-val {
    font-family: var(--st-font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--st-on-background);
  }

  .pass-clean-highlight {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--st-on-background);
    padding-top: 0.5rem;
  }
  .pass-clean-check {
    color: var(--status-success);
    flex-shrink: 0;
  }

  /* ── RESPONSIVE MOBILE STYLING ── */
  @media (max-width: 991px) {
    .pass-hero {
      align-items: stretch;
    }
    .pass-showcase-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .pass-deck-stage {
      height: 300px;
      justify-content: center;
    }
    .pass-deck-card {
      width: 200px;
      height: 270px;
    }
    .pass-deck-card-0 { left: 5%; }
    .pass-deck-card-1 { left: 28%; }
    .pass-deck-card-2 { left: 51%; }
  }

  @media (max-width: 640px) {
    .pass-tier-selector {
      flex-direction: column;
    }
    .pass-clean-tabs {
      flex-direction: column;
    }
    .pass-deck-stage {
      height: 260px;
    }
    .pass-deck-card {
      width: 170px;
      height: 240px;
    }
    .pass-deck-card-0 { left: 2%; }
    .pass-deck-card-1 { left: 25%; }
    .pass-deck-card-2 { left: 48%; }
    .pass-deck-title {
      font-size: 0.92rem;
    }
    .pass-clean-specs-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
`;
