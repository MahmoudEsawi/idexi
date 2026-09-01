"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceComparison from "@/components/ServiceComparison";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  CheckCircle2,
  ScanLine,
  Smartphone,
  Radio,
} from "lucide-react";

const steps = [
  {
    title: "Zero Hardware Needed",
    desc: "Staff and volunteers download the app on their own phones in seconds.",
  },
  {
    title: "0.3s Instant Verification",
    desc: "A single camera scan confirms admission and verifies VIP status immediately.",
  },
  {
    title: "Live Cloud Sync",
    desc: "Check-in counts, room capacities, and item pickups update across the entire team in real time.",
  },
];

const flowAudiences = [
  {
    id: "conferences",
    title: "Multi-Track Conferences",
    image: "/flow-conference-hall.jpg",
    desc: "Real-time session eligibility routing and room guidance from the main gate scan.",
  },
  {
    id: "corporate",
    title: "Corporate Events & Galas",
    image: "/flow-vip-hospitality.jpg",
    desc: "Instant VIP arrival push notifications and item-level hospitality pickup tracking.",
  },
  {
    id: "expos",
    title: "Trade Shows & Expos",
    image: "/flow-trade-expo.jpg",
    desc: "High-throughput badge scanning across multiple exhibition floor checkpoints.",
  },
];

function FlowAutoDemo() {
  return (
    <div className="flow-auto-demo" aria-hidden="true">
      <div className="flow-phone-mockup">
        <div className="flow-phone-notch" />
        
        <div className="flow-phone-top">
          <span className="flow-live-badge">
            <Radio size={11} className="flow-pulse-dot" /> Live Cloud Sync
          </span>
          <span className="flow-phone-time">0.3s Scan</span>
        </div>

        <div className="flow-phone-viewfinder">
          <div className="flow-viewfinder-reticle">
            <ScanLine size={32} className="flow-qr-target" />
            <div className="flow-scanner-laser" />
          </div>

          <div className="flow-auto-result">
            <div className="flow-res-head">
              <CheckCircle2 size={16} className="flow-res-check" />
              <span className="flow-res-title">VIP ACCESS GRANTED</span>
            </div>
            <strong className="flow-res-name">Clara Henderson</strong>
            <span className="flow-res-detail">Suite 4 &middot; All-Access Badge</span>
          </div>
        </div>
      </div>

      <div className="flow-auto-toast">
        <Smartphone size={15} />
        <span>Runs on any iOS or Android phone</span>
      </div>
    </div>
  );
}

export default function FlowService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container">
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
            <h1 className="service-title">Every Touchpoint, One Phone Scan Away</h1>
            <p className="service-description">
              Turn any staff phone into a high-speed scanner. One QR code verifies gate entry, guides session seating,
              and tracks hospitality items in under 0.3 seconds.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book a Demo <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FlowAutoDemo />
          </motion.div>
        </div>

        {/* How it works */}
        <div className="service-section">
          <h2 className="service-subsection-title">One scan, three jobs</h2>
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
              <span className="service-bento-feature-stat">Zero hardware cost</span>
              <p className="service-bento-feature-desc">
                No bulky scanners to rent or ship. Runs natively on your team&apos;s existing phones.
              </p>
            </div>
            <div className="service-bento-card">
              <ScanLine size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">One universal code</h3>
              <p className="service-bento-card-desc">
                Gate access, workshop routing, and hospitality pickups all from the same badge.
              </p>
            </div>
            <div className="service-bento-card">
              <Smartphone size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Real-time sync</h3>
              <p className="service-bento-card-desc">
                Live dashboard syncs across all organizers with full offline support.
              </p>
            </div>
          </div>
        </div>

        {/* Clean, Visual Who Is It For */}
        <ServiceComparison product="flow" />

        <div className="service-section">
          <h2 className="service-subsection-title">Who is it for?</h2>
          <div className="flow-audience-grid">
            {flowAudiences.map((aud) => (
              <div key={aud.id} className="flow-audience-card">
                <div className="flow-aud-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="flow-aud-img"
                  />
                  <div className="flow-aud-scrim" />
                </div>
                <div className="flow-aud-content">
                  <h3 className="flow-aud-title">{aud.title}</h3>
                  <p className="flow-aud-desc">{aud.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const flowCSS = `
  .flow-hero {
    align-items: center;
  }

  /* ── AUTO-ANIMATED PHONE SCANNER DEMO ── */
  .flow-auto-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }

  .flow-phone-mockup {
    position: relative;
    width: 100%;
    border-radius: 2rem;
    background: #0d1222;
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.6);
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: flow-phone-float 6s ease-in-out infinite;
  }

  @keyframes flow-phone-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  .flow-phone-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 5px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.15);
  }

  .flow-phone-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.5rem 0.2rem;
  }
  .flow-live-badge {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--st-font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    color: #34d399;
  }
  .flow-pulse-dot {
    animation: flow-pulse 2s ease-in-out infinite;
  }
  @keyframes flow-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .flow-phone-time {
    font-family: var(--st-font-ui);
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .flow-phone-viewfinder {
    border-radius: 1.25rem;
    background: radial-gradient(circle at center, #151b32 0%, #0a0d18 100%);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
  }

  .flow-viewfinder-reticle {
    position: relative;
    height: 90px;
    border-radius: var(--st-radius-md);
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .flow-qr-target {
    color: rgba(255, 255, 255, 0.35);
  }

  .flow-scanner-laser {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--st-secondary), transparent);
    box-shadow: 0 0 8px var(--st-secondary);
    animation: flow-laser-sweep 2.6s ease-in-out infinite;
  }
  @keyframes flow-laser-sweep {
    0%, 100% { top: 10px; opacity: 0.3; }
    50% { top: 75px; opacity: 1; }
  }

  .flow-auto-result {
    border-radius: var(--st-radius-md);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .flow-res-head {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #34d399;
  }
  .flow-res-check {
    flex-shrink: 0;
  }
  .flow-res-title {
    font-family: var(--st-font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .flow-res-name {
    font-family: var(--st-font-display);
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }
  .flow-res-detail {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .flow-auto-toast {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 9999px;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    font-family: var(--st-font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
  }

  /* ── CLEAN AUDIENCE CARDS ── */
  .flow-audience-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .flow-audience-card {
    position: relative;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  .flow-audience-card:hover {
    transform: translateY(-4px);
    border-color: var(--st-secondary);
  }

  .flow-aud-media {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .flow-aud-img {
    object-fit: cover;
  }
  .flow-aud-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(13, 18, 32, 0.95) 100%);
  }

  .flow-aud-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .flow-aud-title {
    font-family: var(--st-font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
  }
  .flow-aud-desc {
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  @media (max-width: 991px) {
    .flow-audience-grid {
      grid-template-columns: 1fr;
    }
    .flow-hero {
      align-items: stretch;
    }
  }
`;
