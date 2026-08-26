"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Workflow,
  Sparkles,
  Zap,
  Crown,
  Check,
} from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md"
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

const matchAudiences = [
  {
    id: "galas",
    title: "Gala Dinners & Weddings",
    shortTitle: "Galas & Weddings",
    image: "/face-gala-wedding.jpg",
    icon: Crown,
    badge: "99.8% Match",
    status: "CANDID MATCH",
    desc: "Photographers capture candid laughter and table moments. idexi Face delivers each guest their private gallery before dessert is served.",
    specs: [
      { label: "Delivery", value: "< 2 mins" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Privacy", value: "Private Album" },
    ],
    highlight: "Zero search friction for formal guests",
  },
  {
    id: "summits",
    title: "Corporate Summits & Keynotes",
    shortTitle: "Summits & Keynotes",
    image: "/face-corporate-summit.jpg",
    icon: Zap,
    badge: "99.9% Match",
    status: "SPEAKER LOCK",
    desc: "Auto-detects speakers and VIPs on stage. Presenters receive press-ready, high-resolution photography the moment they step off the podium.",
    specs: [
      { label: "Delivery", value: "Real-Time" },
      { label: "Accuracy", value: "99.9%" },
      { label: "Format", value: "Press & Social" },
    ],
    highlight: "Instant sharing while talks are trending",
  },
  {
    id: "sports",
    title: "Concerts, Festivals & Sports",
    shortTitle: "Concerts & Festivals",
    image: "/face-music-festival.jpg",
    icon: Sparkles,
    badge: "99.4% Match",
    status: "MASS INDEX",
    desc: "Index tens of thousands of faces across stadium crowds and rapid motion, instantly delivering attendees their memorable action shots.",
    specs: [
      { label: "Capacity", value: "10,000+ faces" },
      { label: "Accuracy", value: "99.4%" },
      { label: "Access", value: "Direct Link" },
    ],
    highlight: "Turns attendees into brand advocates",
  },
];

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

function FaceAudienceShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const active = matchAudiences[activeIdx];
  const Icon = active.icon;

  return (
    <div className="service-section face-showcase-section">
      <div className="face-showcase-header">
        <span className="face-showcase-eyebrow">Who Is It For?</span>
        <h2 className="service-subsection-title">Tailored For Every Event Scale</h2>
      </div>

      <div className="face-showcase-container">
        {/* Left: 3D Layered Card Deck */}
        <div className="face-deck-stage" role="tablist" aria-label="Event Types">
          {matchAudiences.map((aud, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={aud.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`face-deck-card face-deck-card-${idx} ${isActive ? "is-active" : "is-inactive"}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
              >
                <div className="face-deck-card-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 300px, 320px"
                    className="face-deck-img"
                    priority={idx === 0}
                  />
                  <div className="face-deck-card-scrim" />
                </div>

                <div className="face-deck-card-content">
                  <span className="face-deck-badge">{aud.status}</span>
                  <div className="face-deck-card-bottom">
                    <h3 className="face-deck-title">{aud.title}</h3>
                    <span className="face-deck-meta">{aud.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Clean, Direct Modern Intelligence Panel */}
        <div className="face-clean-panel" role="tabpanel">
          {/* Top Segmented Controls */}
          <div className="face-clean-tabs">
            {matchAudiences.map((aud, idx) => (
              <button
                key={aud.id}
                type="button"
                className={`face-clean-tab ${activeIdx === idx ? "face-clean-tab-active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {aud.shortTitle}
              </button>
            ))}
          </div>

          {/* Direct Value Info */}
          <div className="face-clean-body">
            <div className="face-clean-header-row">
              <div className="face-clean-icon-wrap">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="face-clean-title">{active.title}</h3>
                <span className="face-clean-badge">{active.badge} accuracy</span>
              </div>
            </div>

            <p className="face-clean-desc">{active.desc}</p>

            {/* Direct Specs */}
            <div className="face-clean-specs-grid">
              {active.specs.map((spec, i) => (
                <div key={i} className="face-clean-spec">
                  <span className="face-clean-spec-label">{spec.label}</span>
                  <span className="face-clean-spec-val">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Key takeaway */}
            <div className="face-clean-highlight">
              <Check size={16} className="face-clean-check" />
              <span>{active.highlight}</span>
            </div>
          </div>
        </div>
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

        {/* Who is it for - Fast, Clean, 3D Showcase */}
        <FaceAudienceShowcase />
      </div>
    </div>
  );
}

const faceCSS = `
  .face-hero {
    align-items: center;
  }

  /* ── Live matching demo ── */
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

  /* ── ULTRA-FAST, CLEAN 3D AUDIENCE SHOWCASE ── */
  .face-showcase-section {
    padding-top: 1rem;
  }
  .face-showcase-header {
    margin-bottom: 2rem;
  }
  .face-showcase-eyebrow {
    display: inline-block;
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--st-secondary);
    margin-bottom: 0.4rem;
  }

  .face-showcase-container {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
    align-items: center;
  }

  /* 3D Perspective Deck Stage (GPU-accelerated, zero lag) */
  .face-deck-stage {
    position: relative;
    width: 100%;
    height: 350px;
    perspective: 1200px;
    transform-style: preserve-3d;
    display: flex;
    align-items: center;
  }

  .face-deck-card {
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

  /* 3D Positions */
  .face-deck-card-0 {
    left: 6%;
    transform: translate3d(0, 0, 20px) rotateY(-16deg) rotateX(4deg) scale(0.96);
    z-index: 3;
  }
  .face-deck-card-1 {
    left: 32%;
    transform: translate3d(0, 0, 0px) rotateY(-16deg) rotateX(4deg) scale(0.93);
    z-index: 2;
  }
  .face-deck-card-2 {
    left: 58%;
    transform: translate3d(0, 0, -20px) rotateY(-16deg) rotateX(4deg) scale(0.9);
    z-index: 1;
  }

  /* Active / Hover Card Pop */
  .face-deck-card.is-active,
  .face-deck-card:hover {
    transform: translate3d(0, -10px, 60px) rotateY(0deg) rotateX(0deg) scale(1.04) !important;
    border-color: var(--st-secondary);
    box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--st-secondary) 35%, transparent);
    z-index: 10 !important;
    opacity: 1 !important;
  }

  .face-deck-stage:hover .face-deck-card.is-inactive {
    opacity: 0.7;
  }

  .face-deck-card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .face-deck-img {
    object-fit: cover;
  }
  .face-deck-card-scrim {
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

  .face-deck-card-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.15rem;
  }
  .face-deck-badge {
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
  .face-deck-card-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .face-deck-title {
    font-family: var(--st-font-display);
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    line-height: 1.25;
  }
  .face-deck-meta {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--st-secondary);
  }

  /* Clean, Direct Modern Intelligence Panel */
  .face-clean-panel {
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
  }
  .face-clean-tabs {
    display: flex;
    gap: 0.4rem;
    background: var(--st-surface-container-highest);
    padding: 0.3rem;
    border-radius: var(--st-radius-md);
    margin-bottom: 1.5rem;
  }
  .face-clean-tab {
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
  .face-clean-tab:hover {
    color: var(--st-on-background);
  }
  .face-clean-tab-active {
    background: var(--st-surface);
    color: var(--st-secondary);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .face-clean-body {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .face-clean-header-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .face-clean-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--st-secondary) 15%, transparent);
    color: var(--st-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .face-clean-title {
    font-family: var(--st-font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
    line-height: 1.2;
  }
  .face-clean-badge {
    font-family: var(--st-font-ui);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--st-secondary);
  }

  .face-clean-desc {
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  .face-clean-specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    background: color-mix(in srgb, var(--st-surface-container-high) 45%, transparent);
    border-radius: var(--st-radius-md);
  }
  .face-clean-spec {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .face-clean-spec-label {
    font-family: var(--st-font-ui);
    font-size: 0.7rem;
    color: var(--st-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .face-clean-spec-val {
    font-family: var(--st-font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--st-on-background);
  }

  .face-clean-highlight {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--st-on-background);
    padding-top: 0.5rem;
  }
  .face-clean-check {
    color: var(--status-success);
    flex-shrink: 0;
  }

  /* ── RESPONSIVE MOBILE STYLING ── */
  @media (max-width: 991px) {
    .face-hero {
      align-items: stretch;
    }
    .face-showcase-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .face-deck-stage {
      height: 300px;
      justify-content: center;
    }
    .face-deck-card {
      width: 200px;
      height: 270px;
    }
    .face-deck-card-0 { left: 5%; }
    .face-deck-card-1 { left: 28%; }
    .face-deck-card-2 { left: 51%; }
  }

  @media (max-width: 640px) {
    .face-clean-tabs {
      flex-direction: column;
    }
    .face-deck-stage {
      height: 260px;
    }
    .face-deck-card {
      width: 170px;
      height: 240px;
    }
    .face-deck-card-0 { left: 2%; }
    .face-deck-card-1 { left: 25%; }
    .face-deck-card-2 { left: 48%; }
    .face-deck-title {
      font-size: 0.92rem;
    }
    .face-clean-specs-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
`;
