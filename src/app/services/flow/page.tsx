"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ProductComparison from "@/components/product/ProductComparison";
import ProductCompanions from "@/components/product/ProductCompanions";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ScanLine,
  Smartphone,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

/* Product page: idexi Flow.

   Copy is the partner's approved content file, humanized. The page follows
   the same six-section template as Pass and Face:

     Hero -> Comparison -> Process -> Feature highlights -> Cross-sell -> CTA

   Section 3 deliberately breaks from the other two, because the content file
   is explicit that it should: Flow's mechanic is not a sequence. One scan
   serves three purposes at once, so the diagram is a tree, one node above
   three outcomes, not a chain. Pass gets a conveyor because its steps really
   are ordered; Flow does not.

   The scanning motif is adapted from Radar Effect by manuarora700 on 21st.dev
   (21st.dev/@manuarora700/components/radar-effect): concentric rings with a
   rotating sweep over them. Its code was not fetched, because the account's
   daily retrieval quota was already spent on Tilt and Process Timeline, so
   this is built from the pattern rather than ported line by line. It would
   have needed rewriting regardless: the original is Tailwind, and this
   project has none.

   Accuracy note carried from the content file: Flow scans and tracks during
   the live event. It does not generate tickets, which is Pass, and it does
   not match or deliver photos, which is Face. */

const COMPARISON = [
  { old: "Scanning hardware is costly to maintain", idexi: "Any staff phone becomes a scanner" },
  { old: "Manual check-in creates long lines", idexi: "One scan confirms entry, under a second" },
  { old: "Tracking kits and meals is unreliable", idexi: "Every pickup logged automatically" },
  {
    old: "Staff can't identify VIP guests on the spot",
    idexi: "Status appears instantly with every scan",
  },
  {
    old: "Post-event data is incomplete",
    idexi: "A full journey report, generated automatically",
  },
];

const OUTCOMES = [
  {
    icon: ScanLine,
    title: "Access control",
    desc: "Instantly verify entry and flag VIP guests the moment they scan in.",
  },
  {
    icon: UtensilsCrossed,
    title: "Logistics & hospitality",
    desc: "Track exactly who received their welcome kit, badge, or meal, without any guesswork.",
  },
  {
    icon: ClipboardList,
    title: "Workshops & sessions",
    desc: "Confirm which session a guest is registered for, and guide them straight to their seat.",
  },
];

const COMPANIONS = [
  {
    product: "idexi Pass",
    color: "pass" as const,
    href: "/services/pass",
    line: "Flow scans the QR code, but that code only exists because Pass already generated a personalized ticket for every guest.",
  },
  {
    product: "idexi Face",
    color: "face" as const,
    href: "/services/face",
    line: "The same check-in that gets a guest through the door also confirms they're at the event, so their photos can find them later.",
  },
];

/* The same guest the rest of the site follows, so the person scanned here is
   the person who was issued a ticket on the Pass page. */
const GUEST = { name: "Clara Henderson", detail: "Suite 4 · All-access" };

/* Fixed rather than generated: the code has to be identical on the server and
   the client, and nothing may shift during hydration. */
const QR_ROWS = [
  "11101011101",
  "10100010101",
  "11101110111",
  "00010100010",
  "10110011011",
  "01001101100",
  "11010010110",
  "00101100101",
  "11100101101",
  "10101011010",
  "11100110011",
];
const QR_CELLS = QR_ROWS.join("").split("");

/* The hero: a phone actually performing a scan.

   Three states on a loop. The viewfinder frames a code, a beam sweeps it,
   then the result card rises and the code dims behind it. Showing the
   scanning state and the granted state at the same time, which is what this
   page did before, reads as two screenshots stacked rather than one device
   doing one job. */
type Phase = "scanning" | "reading" | "granted";
const PHASE_MS: Record<Phase, number> = { scanning: 1900, reading: 700, granted: 2600 };
const NEXT: Record<Phase, Phase> = { scanning: "reading", reading: "granted", granted: "scanning" };

function FlowScanner() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "granted" : "scanning");

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setPhase(NEXT[phase]), PHASE_MS[phase]);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  return (
    <div className="fs-stage">
      <div className="fs-phone" data-phase={phase} aria-hidden="true">
        <span className="fs-bezel-notch" />

        <div className="fs-status">
          <span className="fs-live">
            <span className="fs-live-dot" />
            Live
          </span>
          <span className="fs-status-label">
            {phase === "granted" ? "Confirmed" : "Scanning"}
          </span>
        </div>

        <div className="fs-viewfinder">
          <span className="fs-code">
            {QR_CELLS.map((cell, i) => (
              <span key={i} data-on={cell === "1" ? "1" : undefined} />
            ))}
          </span>

          <span className="fs-bracket fs-bracket-tl" />
          <span className="fs-bracket fs-bracket-tr" />
          <span className="fs-bracket fs-bracket-bl" />
          <span className="fs-bracket fs-bracket-br" />

          <span className="fs-beam" />

          <div className="fs-result">
            <span className="fs-result-head">
              <CheckCircle2 size={15} strokeWidth={2.4} />
              Entry confirmed
            </span>
            <span className="fs-result-name">{GUEST.name}</span>
            <span className="fs-result-detail">{GUEST.detail}</span>
            <span className="fs-result-chip">VIP</span>
          </div>
        </div>

        <p className="fs-foot">One scan confirms entry, under a second</p>
      </div>

      <p className="fs-note">
        <Smartphone size={14} aria-hidden="true" /> Runs on any staff phone
      </p>
    </div>
  );
}

/* Section 3: one node, three outcomes.

   The radar is the scan. Rings plus one rotating sweep, drawn with a conic
   gradient rather than an image, so it costs nothing and tints from the
   product token. */
function ScanNode() {
  return (
    <span className="fb-node" aria-hidden="true">
      <span className="fb-ring fb-ring-1" />
      <span className="fb-ring fb-ring-2" />
      <span className="fb-sweep" />
      <span className="fb-core">
        <ScanLine size={22} strokeWidth={2.1} />
      </span>
    </span>
  );
}

export default function FlowService() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="service-page-container flow-page">
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

        {/* ── Hero ── */}
        <div className="service-hero-grid flow-hero">
          <div className="service-info-col">
            <h1 className="service-title">Every Touchpoint, One Phone Scan Away</h1>
            <p className="service-description">
              Turn any staff phone into a scanner. One QR code verifies gate entry, guides
              session seating, and tracks hospitality items, all in under a second.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">
                Book a Demo <ArrowRight size={16} />
              </Link>
              <Link href="#comparison" className="flow-hero-link">
                See the Comparison <ArrowDown size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FlowScanner />
          </motion.div>
        </div>

        {/* ── Section 2 ── */}
        <div className="service-section" id="comparison">
          <h2 className="service-subsection-title">
            Managing the door shouldn&apos;t need a manual.
          </h2>
          <p className="flow-lede">Here&apos;s exactly what changes.</p>
          <ProductComparison rows={COMPARISON} product="flow" alignOld="right" showCheck />
        </div>

        {/* ── Section 3. One node, three outcomes. ── */}
        <div className="service-section">
          <h2 className="service-subsection-title">One scan, three jobs</h2>
          <p className="flow-lede">
            Every staff phone can do all three, with no separate tools.
          </p>

          <div className="fb">
            <motion.div className="fb-top" {...reveal()}>
              <ScanNode />
              <span className="fb-node-label">One scan</span>
            </motion.div>

            <div className="fb-branches" aria-hidden="true">
              <svg viewBox="0 0 900 90" preserveAspectRatio="none" className="fb-svg">
                <path d="M450 0 V30 Q450 46 434 46 H166 Q150 46 150 62 V90" />
                <path d="M450 0 V90" />
                <path d="M450 0 V30 Q450 46 466 46 H734 Q750 46 750 62 V90" />
              </svg>
            </div>

            <div className="fb-cards">
              {OUTCOMES.map((o, i) => {
                const Icon = o.icon;
                return (
                  <motion.div key={o.title} className="fb-card" {...reveal(0.1 + i * 0.08)}>
                    <span className="fb-card-icon">
                      <Icon size={19} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    <h3 className="fb-card-title">{o.title}</h3>
                    <p className="fb-card-desc">{o.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Section 4 ── */}
        <div className="service-bento-section flow-bento-section">
          <h2 className="service-subsection-title">What makes it work</h2>
          <div className="service-bento">
            <motion.div className="service-bento-feature flow-tile" {...reveal()}>
              <Smartphone size={26} className="flow-feature-icon" aria-hidden="true" />
              <h3 className="service-bento-feature-stat">Zero hardware needed</h3>
              <p className="service-bento-feature-desc">
                Any staff smartphone works instantly, with no devices to buy, charge, or sync
                before the event.
              </p>
            </motion.div>

            <motion.div className="service-bento-card flow-tile" {...reveal(0.08)}>
              <Zap size={22} className="flow-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">Real-time status, every scan</h3>
              <p className="service-bento-card-desc">
                See a guest&apos;s category, workshop, and pickups the moment they&apos;re
                scanned, without a separate lookup.
              </p>
            </motion.div>

            <motion.div className="service-bento-card flow-tile" {...reveal(0.14)}>
              <ClipboardList size={22} className="flow-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">One report, every detail</h3>
              <p className="service-bento-card-desc">
                A complete record of every check-in, pickup, and session, ready the moment
                your event ends.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Section 5 ── */}
        <div className="service-section">
          <h2 className="service-subsection-title">Works even better with...</h2>
          <p className="flow-lede">
            Flow runs the door. Here&apos;s what completes the picture.
          </p>
          <ProductCompanions items={COMPANIONS} />
        </div>
      </div>

      {/* ── Section 6 ── */}
      <CtaSection
        heading="Ready to run your door without the chaos?"
        subtext="Tell us about your event. We'll show you exactly how idexi Flow fits, with no commitment and no pressure."
        bullets={null}
        defaultSolution="idexi Flow"
      />
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const flowCSS = `
  .flow-page { padding-bottom: 0; }
  .flow-page .service-section:last-of-type { margin-bottom: 0; }

  .flow-hero { align-items: center; }

  .flow-hero-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: var(--st-space-sm) 0;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--st-product-flow);
    border-bottom: 1px solid color-mix(in srgb, var(--st-product-flow) 35%, transparent);
    transition: border-color 0.25s ease, color 0.25s ease;
  }
  .flow-hero-link:hover {
    color: var(--st-on-background);
    border-bottom-color: var(--st-on-background);
  }
  .flow-hero-link:focus-visible {
    outline: 2px solid var(--st-product-flow);
    outline-offset: 3px;
    border-radius: 3px;
  }
  .flow-hero-link svg { transition: transform 0.3s ease; }
  .flow-hero-link:hover svg { transform: translateY(2px); }

  .flow-lede {
    max-width: 46ch;
    margin: -2.5rem auto 3rem;
    text-align: center;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* ── Hero scanner ── */
  .fs-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  /* Ink in both themes: a phone running a camera is a dark screen, and
     flipping it to a light card in light mode would stop reading as one. */
  .fs-phone {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    width: min(310px, 88%);
    padding: 1.6rem 1rem 1.1rem;
    border-radius: 2rem;
    background: var(--st-primary-container);
    color: var(--st-on-primary);
    box-shadow:
      0 2px 4px color-mix(in srgb, var(--st-on-background) 12%, transparent),
      0 32px 60px -30px color-mix(in srgb, var(--st-on-background) 62%, transparent);
  }
  :root[data-theme='dark'] .fs-phone {
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    box-shadow:
      0 2px 4px var(--st-surface-dim),
      0 32px 60px -30px var(--st-surface-dim);
  }

  .fs-bezel-notch {
    position: absolute;
    top: 0.7rem;
    left: 50%;
    width: 62px;
    height: 5px;
    border-radius: 3px;
    transform: translateX(-50%);
    background: color-mix(in srgb, currentColor 24%, transparent);
  }

  .fs-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .fs-live {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--st-product-flow);
  }
  :root[data-theme='dark'] .fs-live { color: var(--st-product-flow); }
  .fs-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: fs-pulse 2s ease-in-out infinite;
  }
  @keyframes fs-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.8); }
  }
  .fs-status-label { color: color-mix(in srgb, currentColor 62%, transparent); }

  .fs-viewfinder {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: var(--st-radius-lg);
    overflow: hidden;
    background: color-mix(in srgb, var(--st-on-background) 22%, transparent);
  }
  :root[data-theme='dark'] .fs-viewfinder {
    background: var(--st-surface-dim);
  }

  /* The code being read. It keeps a light plate because that is what a code
     looks like, and it recedes once the read lands. */
  .fs-code {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-auto-rows: 1fr;
    gap: 1px;
    box-sizing: content-box;
    width: 104px;
    height: 104px;
    padding: 8px;
    border-radius: var(--st-radius-sm);
    background: var(--st-surface-container-lowest);
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fs-code span { border-radius: 1px; }
  .fs-code span[data-on] { background: var(--st-on-surface); }
  :root[data-theme='dark'] .fs-code { background: var(--st-inverse-surface); }
  :root[data-theme='dark'] .fs-code span[data-on] { background: var(--st-inverse-on-surface); }

  .fs-phone[data-phase='granted'] .fs-code {
    opacity: 0.18;
    transform: scale(0.82);
  }

  .fs-bracket {
    position: absolute;
    width: 22px;
    height: 22px;
    border: 2px solid var(--st-product-flow);
    transition: opacity 0.4s ease;
  }
  .fs-bracket-tl { top: 12px; left: 12px; border-right: none; border-bottom: none; border-top-left-radius: 5px; }
  .fs-bracket-tr { top: 12px; right: 12px; border-left: none; border-bottom: none; border-top-right-radius: 5px; }
  .fs-bracket-bl { bottom: 12px; left: 12px; border-right: none; border-top: none; border-bottom-left-radius: 5px; }
  .fs-bracket-br { bottom: 12px; right: 12px; border-left: none; border-top: none; border-bottom-right-radius: 5px; }
  .fs-phone[data-phase='granted'] .fs-bracket { opacity: 0.25; }

  /* The beam only runs while a read is in progress. */
  .fs-beam {
    position: absolute;
    left: 8%;
    right: 8%;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      transparent,
      var(--st-product-flow),
      transparent
    );
    box-shadow: 0 0 12px 2px color-mix(in srgb, var(--st-product-flow) 55%, transparent);
    opacity: 0;
  }
  .fs-phone[data-phase='scanning'] .fs-beam {
    animation: fs-sweep 1.9s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }
  @keyframes fs-sweep {
    0% { top: 14%; opacity: 0; }
    12% { opacity: 1; }
    88% { opacity: 1; }
    100% { top: 86%; opacity: 0; }
  }

  /* The result rises over the code rather than sitting beside it. */
  .fs-result {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    padding: 0.8rem 0.9rem;
    border-radius: var(--st-radius);
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  .fs-phone[data-phase='granted'] .fs-result {
    opacity: 1;
    transform: none;
  }
  .fs-result-head {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .fs-result-name {
    margin-top: 0.15rem;
    font-family: var(--st-font-serif);
    font-size: 1.1rem;
    line-height: 1.2;
  }
  .fs-result-detail {
    font-size: 0.72rem;
    opacity: 0.78;
  }
  .fs-result-chip {
    position: absolute;
    top: 0.7rem;
    right: 0.8rem;
    padding: 0.1rem 0.42rem;
    border-radius: var(--st-radius-full);
    background: color-mix(in srgb, var(--st-on-product-flow-container) 14%, transparent);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.58rem;
    letter-spacing: 0.08em;
  }

  .fs-foot {
    margin: 0;
    text-align: center;
    font-size: 0.72rem;
    color: color-mix(in srgb, currentColor 62%, transparent);
  }

  .fs-note {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    padding: 0.45rem 0.85rem;
    border-radius: var(--st-radius-full);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
    font-size: 0.8rem;
    color: var(--st-on-surface-variant);
  }
  .fs-note svg { color: var(--st-product-flow); flex-shrink: 0; }

  /* ── Section 3: the branch ── */
  .fb {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 940px;
    margin: 0 auto;
  }

  .fb-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  .fb-node-label {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-product-flow);
  }

  .fb-node {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 92px;
  }
  .fb-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--st-product-flow) 30%, transparent);
  }
  .fb-ring-1 { inset: 0; }
  .fb-ring-2 { inset: 14px; }

  /* The sweep. A conic gradient rotating over the rings, which costs one
     element and tints from the product token. */
  .fb-sweep {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      color-mix(in srgb, var(--st-product-flow) 42%, transparent) 0deg,
      transparent 70deg,
      transparent 360deg
    );
    animation: fb-spin 3.6s linear infinite;
  }
  @keyframes fb-spin {
    to { transform: rotate(360deg); }
  }

  .fb-core {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--st-product-flow);
    color: var(--st-surface-dim);
  }
  :root[data-theme='dark'] .fb-core {
    color: var(--st-surface-dim);
  }

  /* One drawn path per branch, so the tree is a single shape rather than
     three separate rules pretending to connect. */
  /* Same width as the card grid, so the three endpoints at 1/6, 1/2 and 5/6
     of the viewBox land on the three card centres. Capping this narrower
     than the cards left the branches pointing at the gaps between them. */
  .fb-branches {
    width: 100%;
    margin-top: 0.5rem;
  }
  .fb-svg {
    display: block;
    width: 100%;
    height: 68px;
  }
  .fb-svg path {
    fill: none;
    stroke: var(--st-outline);
    stroke-width: 1.5;
    stroke-dasharray: 5 5;
  }

  .fb-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    width: 100%;
  }
  .fb-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1.6rem 1.4rem;
    border-radius: var(--st-radius-xl);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
    transition: border-color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fb-card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--st-product-flow) 45%, transparent);
  }
  .fb-card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3rem;
    height: 2.3rem;
    margin-bottom: 0.25rem;
    border-radius: 50%;
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .fb-card-title {
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.08rem;
    color: var(--st-on-background);
  }
  .fb-card-desc {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* ── Section 4 ── */
  .flow-bento-section {
    background: transparent;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
  .flow-feature-icon {
    margin-bottom: 1.25rem;
    color: color-mix(in srgb, var(--st-on-primary) 78%, var(--st-primary));
  }
  .flow-card-icon {
    margin-bottom: 0.85rem;
    color: var(--st-product-flow);
  }
  .flow-tile {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  }
  .flow-tile:hover { transform: translateY(-4px); }
  .service-bento-card.flow-tile:hover {
    border-color: color-mix(in srgb, var(--st-product-flow) 45%, transparent);
  }

  @media (max-width: 860px) {
    .fb-cards { grid-template-columns: 1fr; }
    /* Three branches to one column is a diagram of nothing, so the tree
       becomes a single spine. */
    .fb-branches { max-width: 2px; }
    .fb-svg { height: 40px; }
    .fb-svg path:first-child,
    .fb-svg path:last-child { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-live-dot,
    .fs-beam,
    .fb-sweep {
      animation: none;
    }
    .fs-beam { opacity: 0; }
    .fs-code,
    .fs-result,
    .fs-bracket,
    .fb-card,
    .flow-tile,
    .flow-hero-link svg {
      transition: none;
    }
    .fb-card:hover,
    .flow-tile:hover { transform: none; }
  }
`;
