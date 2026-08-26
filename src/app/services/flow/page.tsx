"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  CheckCircle2,
  Gift,
  ScanLine,
  Smartphone,
  Users,
  Check,
  Radio,
  DoorOpen,
  PackageCheck,
  ShieldAlert,
} from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md"
const pillars = [
  {
    label: "Access Control",
    title: "Verify entry and flag VIPs on the spot",
    desc: "Give any number of organizers or volunteers dashboard access from their own phones. A scan confirms entry instantly and flags VIP guests the moment they walk in.",
  },
  {
    label: "Logistics & Hospitality",
    title: "Track every welcome kit, badge, and meal",
    desc: "Track exactly who picked up a welcome kit, a badge, or a meal. Your team always knows what's left and who still needs one.",
  },
  {
    label: "Workshops & Sessions",
    title: "Guide guests to the right room and seat",
    desc: "Confirm which session a guest registered for and point them to their assigned seat, all from the same scan that got them through the door.",
  },
];

const scannerModes = [
  {
    id: "gate",
    modeLabel: "Main Gate Check-in",
    icon: DoorOpen,
    badge: "ACCESS VERIFIED",
    badgeColor: "#10b981",
    attendee: "Clara Henderson",
    company: "Apex Global",
    detailTitle: "VIP All-Access Pass",
    detailSub: "Gate 1 · Suite 4 Lounge Access",
    statusNote: "VIP Flagged · Concierge Notified",
  },
  {
    id: "session",
    modeLabel: "Session Routing",
    icon: Users,
    badge: "SEAT CONFIRMED",
    badgeColor: "#6366f1",
    attendee: "Marcus Webb",
    company: "Synthetix Labs",
    detailTitle: "Keynote: Next-Gen AI",
    detailSub: "Plenary Hall A · Reserved Row B-12",
    statusNote: "Eligible for Morning Track",
  },
  {
    id: "hospitality",
    modeLabel: "Hospitality & Kits",
    icon: PackageCheck,
    badge: "ITEM CLAIMED (1/1)",
    badgeColor: "#f59e0b",
    attendee: "Elena Rostova",
    company: "Tech Insider",
    detailTitle: "Speaker Kit + Dinner Voucher",
    detailSub: "Hospitality Counter 2",
    statusNote: "Remaining Event Inventory: 42",
  },
];

const flowAudiences = [
  {
    id: "conferences",
    title: "Multi-Track Conferences",
    shortTitle: "Conferences",
    image: "/flow-conference-hall.jpg",
    icon: Users,
    badge: "Session Routing",
    status: "ROOM GUIDANCE",
    desc: "Verify which session or workshop each guest registered for and guide them straight to their assigned room in real-time.",
    specs: [
      { label: "Scan Speed", value: "< 0.3s" },
      { label: "Sync", value: "Real-Time Cloud" },
      { label: "Device", value: "Any Smartphone" },
    ],
    highlight: "Zero dedicated hardware needed for staff",
  },
  {
    id: "corporate",
    title: "Corporate Events & Galas",
    shortTitle: "Corporate & Galas",
    image: "/flow-vip-hospitality.jpg",
    icon: Gift,
    badge: "VIP Alerts",
    status: "VIP & HOSPITALITY",
    desc: "Flag VIP guests the instant they walk through the door and accurately track hospitality pickups like badges, gifts, and meal allocations.",
    specs: [
      { label: "Alerts", value: "Instant VIP Push" },
      { label: "Tracking", value: "Item-Level" },
      { label: "Offline", value: "Auto-Sync" },
    ],
    highlight: "Instant VIP arrival push alerts for organizers",
  },
  {
    id: "expos",
    title: "Trade Shows & Expos",
    shortTitle: "Trade Shows & Expos",
    image: "/flow-trade-expo.jpg",
    icon: ScanLine,
    badge: "Multi-Checkpoint",
    status: "EXPO CHECKPOINTS",
    desc: "Manage exhibitor badges, attendee floor access, and staff logistics seamlessly across every touchpoint of the show floor.",
    specs: [
      { label: "Throughput", value: "Unlimited" },
      { label: "Checkpoints", value: "Multi-Door" },
      { label: "Analytics", value: "Live Dashboard" },
    ],
    highlight: "One universal QR code across every touchpoint",
  },
];

function InteractiveScannerTerminal() {
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const currentMode = scannerModes[activeModeIdx];
  const ModeIcon = currentMode.icon;

  return (
    <div className="flow-scanner-terminal">
      {/* Terminal Mode Selector */}
      <div className="flow-terminal-header">
        <span className="flow-terminal-title">Staff Scanner Modes</span>
        <div className="flow-mode-tabs">
          {scannerModes.map((mode, idx) => (
            <button
              key={mode.id}
              type="button"
              className={`flow-mode-tab ${activeModeIdx === idx ? "is-active" : ""}`}
              onClick={() => setActiveModeIdx(idx)}
            >
              {mode.modeLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Staff Smartphone Scanner Frame */}
      <div className="flow-phone-frame">
        {/* Phone Top Bar */}
        <div className="flow-phone-topbar">
          <div className="flow-phone-notch" />
          <div className="flow-phone-status">
            <span className="flow-sync-pill">
              <Radio size={12} className="flow-sync-icon" /> Live Cloud Sync
            </span>
            <span className="flow-battery">100%</span>
          </div>
        </div>

        {/* Viewfinder & Scan Animation */}
        <div className="flow-viewfinder-screen">
          <div className="flow-scanner-reticle">
            <span className="flow-reticle-bracket flow-ret-tl" />
            <span className="flow-reticle-bracket flow-ret-tr" />
            <span className="flow-reticle-bracket flow-ret-bl" />
            <span className="flow-reticle-bracket flow-ret-br" />
            <div className="flow-laser-beam" />
            <ScanLine size={36} className="flow-reticle-qr" />
          </div>

          {/* Instant Verification Feedback Card */}
          <div className="flow-result-modal">
            <div className="flow-result-badge-row">
              <span
                className="flow-result-badge"
                style={{ background: `${currentMode.badgeColor}20`, color: currentMode.badgeColor, borderColor: `${currentMode.badgeColor}40` }}
              >
                <CheckCircle2 size={13} />
                {currentMode.badge}
              </span>
              <span className="flow-scan-speed">&lt; 0.3s</span>
            </div>

            <div className="flow-result-info">
              <div className="flow-result-person">
                <strong className="flow-person-name">{currentMode.attendee}</strong>
                <span className="flow-person-co">{currentMode.company}</span>
              </div>
              <div className="flow-result-details">
                <span className="flow-detail-primary">{currentMode.detailTitle}</span>
                <span className="flow-detail-sub">{currentMode.detailSub}</span>
              </div>
            </div>

            <div className="flow-result-footer">
              <ModeIcon size={14} style={{ color: currentMode.badgeColor }} />
              <span>{currentMode.statusNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zero Hardware Callout */}
      <div className="flow-terminal-footer">
        <Smartphone size={16} className="flow-phone-icon" />
        <span>Runs on any staff iPhone or Android &middot; No proprietary scanners needed</span>
      </div>
    </div>
  );
}

function FlowAudienceShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const active = flowAudiences[activeIdx];
  const Icon = active.icon;

  return (
    <div className="service-section flow-showcase-section">
      <div className="flow-showcase-header">
        <span className="flow-showcase-eyebrow">Who Is It For?</span>
        <h2 className="service-subsection-title">Engineered For Every Checkpoint</h2>
      </div>

      <div className="flow-showcase-container">
        {/* Left: 3D Layered Card Deck */}
        <div className="flow-deck-stage" role="tablist" aria-label="Event Types">
          {flowAudiences.map((aud, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={aud.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`flow-deck-card flow-deck-card-${idx} ${isActive ? "is-active" : "is-inactive"}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
              >
                <div className="flow-deck-card-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 300px, 320px"
                    className="flow-deck-img"
                    priority={idx === 0}
                  />
                  <div className="flow-deck-card-scrim" />
                </div>

                <div className="flow-deck-card-content">
                  <span className="flow-deck-badge">{aud.status}</span>
                  <div className="flow-deck-card-bottom">
                    <h3 className="flow-deck-title">{aud.title}</h3>
                    <span className="flow-deck-meta">{aud.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Clean, Direct Modern Intelligence Panel */}
        <div className="flow-clean-panel" role="tabpanel">
          {/* Top Segmented Controls */}
          <div className="flow-clean-tabs">
            {flowAudiences.map((aud, idx) => (
              <button
                key={aud.id}
                type="button"
                className={`flow-clean-tab ${activeIdx === idx ? "flow-clean-tab-active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {aud.shortTitle}
              </button>
            ))}
          </div>

          {/* Direct Value Info */}
          <div className="flow-clean-body">
            <div className="flow-clean-header-row">
              <div className="flow-clean-icon-wrap">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="flow-clean-title">{active.title}</h3>
                <span className="flow-clean-badge">{active.badge}</span>
              </div>
            </div>

            <p className="flow-clean-desc">{active.desc}</p>

            {/* Direct Specs */}
            <div className="flow-clean-specs-grid">
              {active.specs.map((spec, i) => (
                <div key={i} className="flow-clean-spec">
                  <span className="flow-clean-spec-label">{spec.label}</span>
                  <span className="flow-clean-spec-val">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Key takeaway */}
            <div className="flow-clean-highlight">
              <Check size={16} className="flow-clean-check" />
              <span>{active.highlight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlowService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container flow-page-theme">
      <style>{flowCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Activity size={14} /> idexi Flow
          </span>
        </div>

        {/* Hero */}
        <div className="service-hero-grid flow-hero">
          <div className="service-info-col">
            <span className="flow-kicker">Live Smartphone Scanner & Checkpoint Operations</span>
            <h1 className="service-title">Every Touchpoint, One Smartphone Scan Away</h1>
            <p className="service-description">
              You don&apos;t need expensive scanning hardware or printed lists. idexi Flow turns any organizer or volunteer phone into an
              instant scanning station, coordinating access gates, session seating, and hospitality item tracking from one universal QR code.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book Consultation <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame flow-scanner-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveScannerTerminal />
          </motion.div>
        </div>

        {/* How it works */}
        <div className="service-section">
          <h2 className="service-subsection-title">One Scan, Three Jobs</h2>
          <div className="service-process">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.label}
                className="service-process-step"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="service-process-number">0{idx + 1}</span>
                <h3 className="service-process-title">{pillar.title}</h3>
                <p className="service-process-desc">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proof */}
        <div className="service-bento-section">
          <div className="service-bento">
            <div className="service-bento-feature">
              <span className="service-bento-feature-stat">Zero hardware cost</span>
              <p className="service-bento-feature-desc">
                No scanners to buy, ship, or charge. Every organizer and volunteer already carries the device that
                runs idexi Flow.
              </p>
            </div>
            <div className="service-bento-card">
              <ScanLine size={22} style={{ color: "var(--accent-flow, #7c3aed)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">One Code, Every Touchpoint</h3>
              <p className="service-bento-card-desc">
                The same QR code works at the gate, a workshop door, or the merch table, so staff never juggle
                separate systems.
              </p>
            </div>
            <div className="service-bento-card">
              <Smartphone size={22} style={{ color: "var(--accent-flow, #7c3aed)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Live Team Visibility</h3>
              <p className="service-bento-card-desc">
                Entry status, workshop eligibility, and item pickups sync instantly across every organizer&apos;s
                dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Who is it for - Fast, Clean, 3D Showcase */}
        <FlowAudienceShowcase />
      </div>
    </div>
  );
}

const flowCSS = `
  /* ── FLOW THEME ACCENTS (ELECTRIC INDIGO & VIOLET) ── */
  :root {
    --accent-flow: #7c3aed;
    --accent-flow-light: #a78bfa;
  }

  .flow-page-theme .service-breadcrumb-current {
    color: var(--accent-flow-light);
  }

  .flow-kicker {
    display: inline-block;
    font-family: var(--st-font-ui);
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-flow-light);
    margin-bottom: 0.5rem;
  }

  .flow-hero {
    align-items: center;
  }

  /* ── INTERACTIVE SCANNER TERMINAL ── */
  .flow-scanner-terminal {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  .flow-terminal-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .flow-terminal-title {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .flow-mode-tabs {
    display: flex;
    gap: 0.35rem;
    background: var(--st-surface-container-high);
    padding: 0.25rem;
    border-radius: var(--st-radius-md);
  }

  .flow-mode-tab {
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

  .flow-mode-tab:hover {
    color: var(--st-on-background);
  }

  .flow-mode-tab.is-active {
    background: var(--st-surface);
    color: var(--accent-flow-light);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  /* ── REALISTIC STAFF PHONE FRAME ── */
  .flow-phone-frame {
    position: relative;
    border-radius: 1.5rem;
    background: #0f1424;
    border: 1px solid rgba(124, 58, 237, 0.3);
    box-shadow: 0 24px 60px -20px rgba(124, 58, 237, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .flow-phone-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.1rem;
    background: rgba(0, 0, 0, 0.35);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .flow-sync-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: #34d399;
  }

  .flow-sync-icon {
    animation: flow-pulse-icon 2s ease-in-out infinite;
  }
  @keyframes flow-pulse-icon {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .flow-battery {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .flow-viewfinder-screen {
    position: relative;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background: radial-gradient(circle at center, #171d33 0%, #0c101d 100%);
  }

  /* Reticle & Beam */
  .flow-scanner-reticle {
    position: relative;
    width: 100%;
    height: 110px;
    border-radius: var(--st-radius-md);
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .flow-reticle-bracket {
    position: absolute;
    width: 14px;
    height: 14px;
    border-color: var(--accent-flow-light);
    border-style: solid;
  }
  .flow-ret-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
  .flow-ret-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
  .flow-ret-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
  .flow-ret-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

  .flow-laser-beam {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #a78bfa, transparent);
    box-shadow: 0 0 8px #a78bfa;
    animation: flow-beam-sweep 2.4s ease-in-out infinite;
  }
  @keyframes flow-beam-sweep {
    0%, 100% { top: 15px; opacity: 0.2; }
    50% { top: 90px; opacity: 1; }
  }

  .flow-reticle-qr {
    color: rgba(255, 255, 255, 0.35);
  }

  /* Result Modal inside phone */
  .flow-result-modal {
    border-radius: var(--st-radius-md);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .flow-result-badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flow-result-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.55rem;
    border-radius: 9999px;
    border: 1px solid;
    font-family: var(--st-font-ui);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .flow-scan-speed {
    font-family: var(--st-font-mono, monospace);
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .flow-result-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .flow-result-person {
    display: flex;
    flex-direction: column;
  }
  .flow-person-name {
    font-family: var(--st-font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
  }
  .flow-person-co {
    font-family: var(--st-font-ui);
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .flow-result-details {
    display: flex;
    flex-direction: column;
    padding: 0.45rem 0.65rem;
    background: rgba(0, 0, 0, 0.25);
    border-radius: var(--st-radius-sm);
  }
  .flow-detail-primary {
    font-family: var(--st-font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: #ffffff;
  }
  .flow-detail-sub {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .flow-result-footer {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.8);
    padding-top: 0.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .flow-terminal-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: var(--st-radius-md);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
  }
  .flow-phone-icon {
    color: var(--accent-flow-light);
    flex-shrink: 0;
  }

  /* ── 3D AUDIENCE SHOWCASE ── */
  .flow-showcase-section {
    padding-top: 1rem;
  }
  .flow-showcase-header {
    margin-bottom: 2rem;
  }
  .flow-showcase-eyebrow {
    display: inline-block;
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-flow-light);
    margin-bottom: 0.4rem;
  }

  .flow-showcase-container {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
    align-items: center;
  }

  .flow-deck-stage {
    position: relative;
    width: 100%;
    height: 350px;
    perspective: 1200px;
    transform-style: preserve-3d;
    display: flex;
    align-items: center;
  }

  .flow-deck-card {
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

  .flow-deck-card-0 {
    left: 6%;
    transform: translate3d(0, 0, 20px) rotateY(-16deg) rotateX(4deg) scale(0.96);
    z-index: 3;
  }
  .flow-deck-card-1 {
    left: 32%;
    transform: translate3d(0, 0, 0px) rotateY(-16deg) rotateX(4deg) scale(0.93);
    z-index: 2;
  }
  .flow-deck-card-2 {
    left: 58%;
    transform: translate3d(0, 0, -20px) rotateY(-16deg) rotateX(4deg) scale(0.9);
    z-index: 1;
  }

  .flow-deck-card.is-active,
  .flow-deck-card:hover {
    transform: translate3d(0, -10px, 60px) rotateY(0deg) rotateX(0deg) scale(1.04) !important;
    border-color: var(--accent-flow-light);
    box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--accent-flow) 35%, transparent);
    z-index: 10 !important;
    opacity: 1 !important;
  }

  .flow-deck-stage:hover .flow-deck-card.is-inactive {
    opacity: 0.7;
  }

  .flow-deck-card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .flow-deck-img {
    object-fit: cover;
  }
  .flow-deck-card-scrim {
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

  .flow-deck-card-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.15rem;
  }
  .flow-deck-badge {
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
  .flow-deck-card-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .flow-deck-title {
    font-family: var(--st-font-display);
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    line-height: 1.25;
  }
  .flow-deck-meta {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--accent-flow-light);
  }

  /* Clean, Direct Modern Intelligence Panel */
  .flow-clean-panel {
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
  }
  .flow-clean-tabs {
    display: flex;
    gap: 0.4rem;
    background: var(--st-surface-container-highest);
    padding: 0.3rem;
    border-radius: var(--st-radius-md);
    margin-bottom: 1.5rem;
  }
  .flow-clean-tab {
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
  .flow-clean-tab:hover {
    color: var(--st-on-background);
  }
  .flow-clean-tab-active {
    background: var(--st-surface);
    color: var(--accent-flow-light);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .flow-clean-body {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .flow-clean-header-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .flow-clean-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--accent-flow) 20%, transparent);
    color: var(--accent-flow-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .flow-clean-title {
    font-family: var(--st-font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
    line-height: 1.2;
  }
  .flow-clean-badge {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--accent-flow-light);
  }

  .flow-clean-desc {
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  .flow-clean-specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    background: color-mix(in srgb, var(--st-surface-container-high) 45%, transparent);
    border-radius: var(--st-radius-md);
  }
  .flow-clean-spec {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .flow-clean-spec-label {
    font-family: var(--st-font-ui);
    font-size: 0.7rem;
    color: var(--st-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .flow-clean-spec-val {
    font-family: var(--st-font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--st-on-background);
  }

  .flow-clean-highlight {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--st-on-background);
    padding-top: 0.5rem;
  }
  .flow-clean-check {
    color: var(--status-success);
    flex-shrink: 0;
  }

  /* ── RESPONSIVE MOBILE STYLING ── */
  @media (max-width: 991px) {
    .flow-hero {
      align-items: stretch;
    }
    .flow-showcase-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .flow-deck-stage {
      height: 300px;
      justify-content: center;
    }
    .flow-deck-card {
      width: 200px;
      height: 270px;
    }
    .flow-deck-card-0 { left: 5%; }
    .flow-deck-card-1 { left: 28%; }
    .flow-deck-card-2 { left: 51%; }
  }

  @media (max-width: 640px) {
    .flow-mode-tabs {
      flex-direction: column;
    }
    .flow-clean-tabs {
      flex-direction: column;
    }
    .flow-deck-stage {
      height: 260px;
    }
    .flow-deck-card {
      width: 170px;
      height: 240px;
    }
    .flow-deck-card-0 { left: 2%; }
    .flow-deck-card-1 { left: 25%; }
    .flow-deck-card-2 { left: 48%; }
    .flow-deck-title {
      font-size: 0.92rem;
    }
    .flow-clean-specs-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
`;
