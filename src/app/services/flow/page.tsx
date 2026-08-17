"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Activity, CheckCircle2, Gift, ScanLine, Smartphone, Users } from "lucide-react";

// Copy grounded in "idexi - Intelligent Event Solutions.md"'s "Dynamic
// Scanning" section: one universal QR code, scanned by staff phones for
// three distinct jobs. Supporting-card language is carried forward from
// this page's already-vetted "no hardware" / "one code" / "live
// visibility" claims rather than dropped.
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

const targetAudiences = [
  { title: "Multi-Track Conferences", desc: "Verify which session or workshop each guest registered for and guide them straight to the right room." },
  { title: "Corporate Events & Galas", desc: "Highlight VIP guests at the door and track hospitality item pickups like badges and welcome kits." },
  { title: "Trade Shows & Expos", desc: "Manage exhibitor badge pickups and staff logistics across every touchpoint of the show floor." },
];

// One shared 9s loop, 3s per pillar, CSS-only (no JS timers) — same
// convention as the homepage's widget cycles.
const PILLAR_ICONS = [Users, Gift, ScanLine];

function ScanModesDemo() {
  return (
    <div className="flow-demo" aria-hidden="true">
      <span className="flow-demo-header">idexi Flow &middot; Staff Scanner</span>
      <div className="flow-demo-phone">
        <div className="flow-demo-screen">
          <div className="flow-demo-scan-target">
            <ScanLine size={28} className="flow-demo-scan-icon" />
          </div>
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div
                key={pillar.label}
                className="flow-demo-result"
                data-slot={i}
                style={{ "--slot-idx": i } as React.CSSProperties}
              >
                <Icon size={20} className="flow-demo-result-icon" />
                <span className="flow-demo-result-label">{pillar.label}</span>
                <CheckCircle2 size={16} className="flow-demo-result-check" />
              </div>
            );
          })}
        </div>
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
            <h1 className="service-title">Every Touchpoint, One Scan Away</h1>
            <p className="service-description">
              You don&apos;t need scanning hardware or a printed list. idexi Flow turns any staff phone into a scanning
              station, and one QR code per guest covers every checkpoint at your event.
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
            <ScanModesDemo />
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
              <ScanLine size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">One Code, Every Touchpoint</h3>
              <p className="service-bento-card-desc">
                The same QR code works at the gate, a workshop door, or the merch table, so staff never juggle
                separate systems.
              </p>
            </div>
            <div className="service-bento-card">
              <Smartphone size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Live Team Visibility</h3>
              <p className="service-bento-card-desc">
                Entry status, workshop eligibility, and item pickups sync instantly across every organizer&apos;s
                dashboard.
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

const flowCSS = `
  .flow-hero {
    align-items: center;
  }

  /* ── Phone mockup cycling through the three scan modes. One shared 9s
     loop, CSS-only, no JS timers. ── */
  .flow-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  .flow-demo-header {
    align-self: flex-start;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-on-surface-variant);
  }
  .flow-demo-phone {
    width: 100%;
    max-width: 260px;
    padding: 0.75rem;
    border-radius: 2rem;
    background: #0d1b3e;
    box-shadow: 0 24px 60px -20px rgba(13, 27, 62, 0.45);
  }
  .flow-demo-screen {
    position: relative;
    height: 340px;
    border-radius: 1.4rem;
    background: #101f38;
    overflow: hidden;
  }
  /* Scan icon: a 3s beat that repeats 3 times inside the outer 9s cycle
     (one beat per pillar), rather than a single 9s animation that would
     only ever show once per loop. */
  .flow-demo-scan-target {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: flow-scan-target-visibility 3s ease-in-out infinite;
  }
  .flow-demo-scan-icon {
    color: rgba(255, 255, 255, 0.35);
    animation: flow-scan-pulse 1.4s ease-in-out infinite;
  }
  @keyframes flow-scan-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.08); }
  }
  @keyframes flow-scan-target-visibility {
    0%, 4% { opacity: 1; }
    30%, 100% { opacity: 0; }
  }
  /* Result cards: one shared 9s cycle, each slot offset by a POSITIVE
     delay (not negative — a negative delay starts the animation already
     partway through, which put every card's visible window in the wrong
     place and left the screen blank most of the time) so each of the
     three results lands inside its own 3s segment, right after that
     segment's scan pulse. */
  .flow-demo-result {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.5rem;
    text-align: center;
    opacity: 0;
    animation: flow-result-visibility 9s ease-in-out infinite;
    animation-delay: calc(var(--slot-idx, 0) * 3s);
  }
  .flow-demo-result-icon {
    color: var(--accent-flow, #7b5cfa);
  }
  .flow-demo-result-label {
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.85rem;
    color: #ffffff;
  }
  .flow-demo-result-check {
    color: var(--status-success);
  }
  @keyframes flow-result-visibility {
    0%, 12% { opacity: 0; transform: scale(0.94); }
    20%, 30% { opacity: 1; transform: scale(1); }
    36%, 100% { opacity: 0; transform: scale(0.94); }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-demo-scan-target,
    .flow-demo-scan-icon {
      animation: none;
      opacity: 0;
    }
    .flow-demo-result {
      animation: none;
      opacity: 0;
      transform: none;
    }
    .flow-demo-result[data-slot="0"] {
      opacity: 1;
    }
  }

  @media (max-width: 991px) {
    .flow-hero {
      align-items: stretch;
    }
    .flow-demo-phone {
      margin: 0 auto;
    }
  }
`;
