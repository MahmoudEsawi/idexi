"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, XCircle, Loader2, Image as ImageIcon } from "lucide-react";
import WireframeCubesBg from "@/components/WireframeCubesBg";
import IdexiMark from "@/components/IdexiMark";

type Step = {
  number: string;
  product: string;
  title: string;
  description: string;
};

// Copy pulled verbatim from page.md's "Integrated Event Lifecycle" section —
// already run through the humanizer.md pass when that section was last
// touched (no em dashes, no AI-vocabulary tells), so it's used as-is here.
const steps: Step[] = [
  {
    number: "01",
    product: "idexi Pass",
    title: "Smart Pass Issuance",
    description: "Attendees register and receive encrypted smart-passes with biometric profiles.",
  },
  {
    number: "02",
    product: "idexi Pass",
    title: "Express Bio Check-In",
    description: "Guests scan and verify at access points in milliseconds, so lines never form.",
  },
  {
    number: "03",
    product: "idexi Flow",
    title: "Access & Logistics Tracking",
    description:
      "Staff scan one universal QR code per guest to verify entry, workshop access, and logistics pickups from their own phones.",
  },
  {
    number: "04",
    product: "idexi Face",
    title: "Instant Photo Delivery",
    description: "AI matches faces across event photos, then instantly emails each guest their gallery.",
  },
];

// Deterministic faux-QR pattern for the ticket's back face (not decorative
// noise — fixed so it renders identically every time): an 8x8 grid with
// solid 3x3 "finder" blocks in three corners, like a real QR code's corner
// markers, plus scattered filled data cells elsewhere.
const QR_LARGE_FILLED = new Set([
  "0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2",
  "0,5", "0,6", "0,7", "1,5", "1,6", "1,7", "2,5", "2,6", "2,7",
  "5,0", "5,1", "5,2", "6,0", "6,1", "6,2", "7,0", "7,1", "7,2",
  "3,3", "3,4", "4,3", "4,6", "5,4", "5,6", "6,4", "6,6", "7,4", "7,6", "3,6", "2,4", "4,0", "6,7", "3,0", "0,4",
]);

// Deterministic bar-width pattern for the mock barcode on each stub — fixed,
// not random, so both faces render identically every time.
const BARCODE_WIDTHS = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2];

// Same deterministic-finder-pattern approach as QR_LARGE_FILLED, just a
// smaller 7x7 grid sized to sit comfortably inside the scan widget's stage.
const QR_SMALL_FILLED = new Set([
  "0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2",
  "0,4", "0,5", "0,6", "1,4", "1,5", "1,6", "2,4", "2,5", "2,6",
  "4,0", "4,1", "4,2", "5,0", "5,1", "5,2", "6,0", "6,1", "6,2",
  "3,3", "4,4", "4,6", "5,3", "5,5", "6,4", "3,5", "2,3",
]);

function Barcode() {
  return (
    <div className="ticket-barcode" aria-hidden="true">
      {BARCODE_WIDTHS.map((w, i) => (
        <span key={i} style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

function TicketNotches() {
  return (
    <div className="ticket-stub-divider" aria-hidden="true">
      <span className="ticket-notch ticket-notch-left" />
      <span className="ticket-notch ticket-notch-right" />
    </div>
  );
}

type WidgetProps = {
  /** Whether this widget's step is the currently active one. Only
   * LogisticsWidget uses it (to key its list and replay the stagger-in
   * animation each time the user navigates back to this step) — the other
   * three ignore it, but share the signature so the `widgets` array below
   * stays a single consistent component type. */
  active: boolean;
};

function PassWidget(_props: WidgetProps) {
  return (
    <div className="ticket-scene">
      <div className="ticket-flip">
        <div className="ticket-face ticket-face-front">
          <div className="ticket-header">
            <IdexiMark className="ticket-logo-mark" />
            <span className="ticket-brand">idexi Pass</span>
          </div>

          <div className="ticket-route">
            <span className="ticket-zone">MAIN</span>
            <span className="ticket-route-arrow" aria-hidden="true">&#8594;</span>
            <span className="ticket-zone">VIP</span>
          </div>

          <div className="ticket-meta-row">
            <div className="ticket-meta">
              <span className="ticket-meta-label">Date</span>
              <span className="ticket-meta-value">Sep 14</span>
            </div>
            <div className="ticket-meta">
              <span className="ticket-meta-label">Gate</span>
              <span className="ticket-meta-value">B</span>
            </div>
            <div className="ticket-meta">
              <span className="ticket-meta-label">Seat</span>
              <span className="ticket-meta-value">A-12</span>
            </div>
          </div>

          <TicketNotches />

          <div className="ticket-stub">
            <div className="ticket-stub-row">
              <span className="ticket-countdown">BOARDS IN 03h 45m</span>
              <span className="ticket-active-badge">
                <span className="ticket-pulse-dot" aria-hidden="true" />
                Active Pass
              </span>
            </div>
            <Barcode />
          </div>
        </div>

        <div className="ticket-face ticket-face-back">
          <div className="ticket-hologram" aria-hidden="true" />

          <div className="ticket-header">
            <IdexiMark className="ticket-logo-mark" />
            <span className="ticket-brand">idexi Pass</span>
          </div>

          <div className="ticket-qr" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => (
                <span
                  key={`${row}-${col}`}
                  className={QR_LARGE_FILLED.has(`${row},${col}`) ? "ticket-qr-cell ticket-qr-cell-filled" : "ticket-qr-cell"}
                />
              ))
            )}
          </div>

          <div className="ticket-meta-row ticket-meta-row-back">
            <div className="ticket-meta ticket-meta-wide">
              <span className="ticket-meta-label">Attendee</span>
              <span className="ticket-meta-value">Ezekiel Adewumi</span>
            </div>
          </div>
          <div className="ticket-meta-row">
            <div className="ticket-meta">
              <span className="ticket-meta-label">Pass Type</span>
              <span className="ticket-meta-value">VIP Access</span>
            </div>
            <div className="ticket-meta">
              <span className="ticket-meta-label">Group</span>
              <span className="ticket-meta-value">Group A</span>
            </div>
          </div>

          <TicketNotches />

          <div className="ticket-stub">
            <div className="ticket-stub-row">
              <span className="ticket-countdown">XKFM72</span>
              <span className="ticket-active-badge">Ready to scan</span>
            </div>
            <Barcode />
          </div>
        </div>
      </div>
    </div>
  );
}

// Continues Step 1's ticket: same attendee, same pass data (VIP / Group A —
// matching what's actually printed on the ticket's back face, not the
// "Group 2" shorthand from the brief, since the point of this widget is
// literal consistency with that ticket, not a new value).
// One shared 6s cycle drives every layer below via CSS keyframes only (see
// scan-cycle-css). No JS timers/state — each layer's animation-duration is
// identical, so they stay in sync purely by starting together on mount.
function ScanWidget(_props: WidgetProps) {
  return (
    <div className="widget-card widget-scan-cycle">
      <span className="scan-cycle-header">idexi Pass &middot; Express Check-In</span>

      <div className="scan-stage">
        <div className="scan-target" aria-hidden="true">
          <div className="scan-qr">
            {Array.from({ length: 7 }).map((_, row) =>
              Array.from({ length: 7 }).map((_, col) => (
                <span
                  key={`${row}-${col}`}
                  className={QR_SMALL_FILLED.has(`${row},${col}`) ? "scan-qr-cell scan-qr-cell-filled" : "scan-qr-cell"}
                />
              ))
            )}
          </div>
          <span className="scan-line" />
        </div>

        <span className="scan-processing-ring" aria-hidden="true" />

        <div className="scan-success">
          <CheckCircle2 size={26} className="scan-success-check" />
          <span className="scan-success-name">Ezekiel Adewumi</span>
          <span className="scan-success-badge">VIP &middot; Group A</span>
          <span className="scan-success-time">Verified in 0.2s</span>
        </div>
      </div>
    </div>
  );
}

type LogisticsStatus = "success" | "missed" | "pending";

const LOGISTICS_STOPS: { label: string; time: string; status: LogisticsStatus }[] = [
  { label: "Main Gates", time: "08:45 AM", status: "success" },
  { label: "Workshop A", time: "No-show", status: "missed" },
  { label: "VIP Catering", time: "12:30 PM", status: "success" },
  { label: "Workshop B", time: "02:15 PM", status: "success" },
  { label: "Departure", time: "Pending", status: "pending" },
];

function LogisticsStatusIcon({ status }: { status: LogisticsStatus }) {
  if (status === "success") return <CheckCircle2 size={16} className="logistics-icon logistics-icon-success" />;
  if (status === "missed") return <XCircle size={16} className="logistics-icon logistics-icon-missed" />;
  return <Loader2 size={16} className="logistics-icon logistics-icon-pending logistics-spin" />;
}

function LogisticsWidget({ active }: WidgetProps) {
  return (
    <div className="widget-card widget-logistics-timeline">
      <div className="logistics-header">
        <span className="logistics-avatar">EA</span>
        <div className="logistics-header-info">
          <span className="logistics-name">Ezekiel Adewumi</span>
          <span className="logistics-live">
            <span className="logistics-live-dot" aria-hidden="true" />
            Live Status
          </span>
        </div>
      </div>

      {/* Keyed on `active` so the list remounts (and the stagger-in
          animation replays) every time the user navigates back to this
          step, rather than only once on page load when this widget was
          still hidden behind step 1. */}
      <ul className="logistics-timeline" key={String(active)}>
        {LOGISTICS_STOPS.map((stop, i) => (
          <li
            key={stop.label}
            className={`logistics-row logistics-row-${stop.status}`}
            style={{ "--stagger-idx": i } as React.CSSProperties}
          >
            <LogisticsStatusIcon status={stop.status} />
            <span className="logistics-row-label">{stop.label}</span>
            <span className="logistics-row-time">{stop.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Scattered starting positions + per-particle delay (within the shared 6s
// loop) for the "chaos" photo icons on the left — fixed, not random, same
// determinism convention as the QR patterns and barcode widths elsewhere
// in this file.
const GALLERY_PARTICLES = [
  { top: 8, delay: 0 },
  { top: 32, delay: 0.5 },
  { top: 58, delay: 0.15 },
  { top: 80, delay: 0.75 },
  { top: 20, delay: 1.1 },
  { top: 68, delay: 1.4 },
];

function GalleryWidget(_props: WidgetProps) {
  return (
    <div className="widget-card widget-gallery">
      <span className="gallery-header">idexi Face &middot; Instant Delivery</span>

      <div className="gallery-stage">
        {GALLERY_PARTICLES.map((particle, i) => (
          <span
            key={i}
            className="gallery-particle"
            style={{ top: `${particle.top}%`, animationDelay: `${particle.delay}s` } as React.CSSProperties}
          >
            <ImageIcon size={13} />
          </span>
        ))}

        <span className="gallery-gate" aria-hidden="true" />

        <div className="gallery-inbox">
          <Mail size={28} className="gallery-inbox-icon" />
          <span className="gallery-success-badge">
            <CheckCircle2 size={12} />
            Gallery Sent
          </span>
        </div>
      </div>
    </div>
  );
}

const widgets = [PassWidget, ScanWidget, LogisticsWidget, GalleryWidget];

const AUTO_ADVANCE_MS = 5500;

export default function EventLifecycleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-spy: only autoplay while the section is actually on screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Autoplay via a single chained setTimeout (re-armed every time
  // activeIndex changes), not setInterval: this is what makes a manual
  // click "just work" as a timer reset for free — clicking a step changes
  // activeIndex, which reruns this effect, whose cleanup cancels the
  // pending timeout before scheduling a fresh one for the new step. A raw
  // setInterval would keep ticking on its own original schedule regardless
  // of manual clicks, so reproducing "manual override resets the timer"
  // would mean manually clearing and re-creating the interval on every
  // click anyway — at which point it's the same pattern with extra steps.
  // Also matches this project's existing autoplay convention (see the
  // (currently unused) EventLifecycleTimeline component).
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [inView, activeIndex]);

  return (
    <section id="how-it-works" className="lifecycle" ref={sectionRef}>
      <style>{lifecycleCSS}</style>

      <div className="lifecycle-grid">
        <div className="lifecycle-left">
          <div className="lifecycle-header">
            <h2 className="lifecycle-heading">Integrated Event Lifecycle</h2>
            <p className="lifecycle-subtext">Watch how our products connect to create a seamless attendee journey.</p>
          </div>

          <div className="lifecycle-stepper" role="tablist" aria-orientation="vertical">
            {steps.map((step, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`lifecycle-step${active ? " lifecycle-step-active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {active && (
                    <span className="lifecycle-progress-track" aria-hidden="true">
                      <span
                        className={`lifecycle-progress-fill${inView ? " lifecycle-progress-animating" : ""}`}
                        style={{ "--progress-duration": `${AUTO_ADVANCE_MS}ms` } as React.CSSProperties}
                      />
                    </span>
                  )}
                  <span className="lifecycle-step-head">
                    <span className="lifecycle-step-number">{step.number}</span>
                    <span className="lifecycle-step-title">{step.title}</span>
                  </span>
                  <span className="lifecycle-step-desc-wrap">
                    <span className="lifecycle-step-desc">{step.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lifecycle-panel">
          <WireframeCubesBg stroke="rgba(255, 255, 255, 0.18)" />
          {steps.map((step, i) => {
            const Widget = widgets[i];
            return (
              <div
                key={step.title}
                className={`lifecycle-widget-wrap${i === activeIndex ? " lifecycle-widget-wrap-active" : ""}`}
                aria-hidden={i !== activeIndex}
              >
                <Widget active={i === activeIndex} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const lifecycleCSS = `
  /* Full-bleed split screen: no section-level padding and no max-width on
     the grid itself, so the right (panel) column can actually reach the
     viewport's right edge and stretch the section's full height — the
     "boxy floating" look before this was max-width:1200px + margin:auto
     centering a padded, rounded, height-capped card instead of a true
     split. Left-side breathing room now lives on .lifecycle-left alone. */
  .lifecycle {
    position: relative;
    background: var(--st-background);
    transition: background 0.4s ease;
    /* Clears the fixed Navbar pill when landed on via a #how-it-works
       anchor jump, so the heading isn't tucked under it. */
    scroll-margin-top: 96px;
  }
  .lifecycle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 640px;
  }
  .lifecycle-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--st-space-lg);
    padding: var(--st-space-xl) clamp(1.5rem, 5vw, 4.5rem);
  }
  .lifecycle-header {
    max-width: 460px;
    text-align: left;
  }
  /* Brand serif display heading — matches OurStorySection/CtaSection's
     heading declaration (family + weight), the shared look every main
     section heading on the page uses. */
  .lifecycle-heading {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2rem, 3vw + 1rem, 3rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .lifecycle-subtext {
    margin: var(--st-space-sm) 0 0;
    font-family: var(--st-font-ui);
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* The track is drawn ONCE on the container as a pseudo-element, not as
     a border-left on each step. A per-step border can only ever be as
     tall as its own step, so it necessarily breaks at every flex gap —
     that is what fragmented this line into disconnected segments. Here
     the rail spans top:0 to bottom:0 of the whole stepper, so it is one
     unbroken axis from step 01 through step 04 by construction, and no
     amount of gap or per-step styling can split it again.

     It also lives in the container's left padding gutter, which is
     outside every step's own box — so an active step's white background
     and box-shadow have nothing to paint over. That removes the
     z-index-versus-card fight entirely rather than trying to win it. */
  .lifecycle-stepper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--st-space-xs);
    max-width: 460px;
    padding-left: 1.75rem;
  }
  .lifecycle-stepper::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: var(--st-radius-full);
    background: var(--st-outline-variant);
  }

  .lifecycle-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    text-align: left;
    background: transparent;
    /* No border, deliberately. Absolutely-positioned children resolve
       against the PADDING box, so a 1px border here would offset the
       progress bar below by exactly 1px and leave it sitting alongside
       the rail instead of on it. The active step's outline is an inset
       box-shadow ring instead: same look, zero layout contribution, so
       the bar's -1.75rem offset stays exactly the container's padding. */
    border: none;
    border-radius: var(--st-radius-md);
    padding: 0.85rem 1.1rem;
    cursor: pointer;
    transition: var(--transition-smooth);
    /* Overrides the global "button, .btn { overflow: hidden }" rule in
       globals.css. This step is a <button>, so it inherited that clip and
       it silently ate the progress bar, which sits in the gutter OUTSIDE
       this box. It is also why a per-step border-left was the only version
       that ever rendered: a border paints on the element's own box and is
       never clipped by its own overflow. The description collapse does its
       own clipping on .lifecycle-step-desc, so nothing here needs it. */
    overflow: visible;
  }
  .lifecycle-step-active {
    background: var(--st-surface-container-lowest);
    box-shadow:
      inset 0 0 0 1px var(--st-outline-variant),
      0 8px 24px rgba(11, 28, 48, 0.08);
  }

  /* The active step's segment of the rail. Pulled back into the gutter by
     exactly the container's padding-left, so it lands dead-on the rail
     above with no magic numbers to keep in sync — change the padding and
     this follows. top/bottom: 0 make it track this step's own height,
     which grows as the description expands, with no JS measurement.
     Rendered only while the step is active (see the JSX), so it remounts
     and restarts the countdown on every step change, manual or auto. */
  .lifecycle-progress-track {
    position: absolute;
    left: -1.75rem;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 3px;
  }
  /* Grows scaleY 0 -> 1 across AUTO_ADVANCE_MS: a literal countdown to the
     next auto-advance. transform, not height, so it stays compositor-only
     and never triggers layout. */
  .lifecycle-progress-fill {
    position: absolute;
    inset: 0;
    border-radius: var(--st-radius-full);
    background: var(--st-secondary);
    box-shadow: 0 0 12px color-mix(in srgb, var(--st-secondary) 45%, transparent);
    transform: scaleY(0);
    transform-origin: top;
  }
  .lifecycle-progress-animating {
    animation: lifecycle-progress-grow var(--progress-duration, 5500ms) linear forwards;
  }
  @keyframes lifecycle-progress-grow {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  .lifecycle-step-head {
    display: flex;
    align-items: baseline;
    gap: 0.7rem;
  }
  .lifecycle-step-number {
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-outline);
    transition: color 0.3s ease;
  }
  .lifecycle-step-active .lifecycle-step-number {
    color: var(--st-secondary);
  }
  .lifecycle-step-title {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--st-outline);
    transition: color 0.3s ease;
  }
  .lifecycle-step-active .lifecycle-step-title {
    color: var(--st-on-background);
  }
  /* grid-template-rows 0fr -> 1fr, not max-height/margin-top: animating
     max-height or margin triggers layout on every frame (the hook flagged
     exactly this). The 0fr/1fr grid-row trick collapses/expands the same
     way without ever forcing layout recalculation each frame — only the
     grid track size is animated, and the browser only needs to relayout
     once at each end, not per-frame. */
  .lifecycle-step-desc-wrap {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s ease;
  }
  .lifecycle-step-active .lifecycle-step-desc-wrap {
    grid-template-rows: 1fr;
  }
  .lifecycle-step-desc {
    display: block;
    min-height: 0;
    overflow: hidden;
    opacity: 0;
    font-family: var(--st-font-ui);
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
    transition: opacity 0.3s ease;
  }
  .lifecycle-step-active .lifecycle-step-desc {
    opacity: 1;
    margin-top: 0.4rem;
    transition: opacity 0.3s ease 0.1s;
  }

  /* ── Right panel: fixed deep-blue brand panel (not theme-driven — this is
     a deliberate brand-color surface, same reasoning as the hero CTAs,
     not a bug that it doesn't invert in light mode) with the shared
     wireframe cube background, holding one of 4 cross-fading mini widgets. ── */
  .lifecycle-panel {
    position: relative;
    overflow: hidden;
    /* No border-radius, no min-height of its own: this column fills its
       grid cell exactly (grid's default align-items: stretch), which is
       what makes it span the section's full height edge to edge instead
       of floating as a rounded card. Its children (WireframeCubesBg, each
       .lifecycle-widget-wrap) are all position: absolute and center
       themselves, so the panel itself needs no flex centering of its own. */
    background: #0D1B3E;
  }
  .lifecycle-widget-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--st-space-lg);
    opacity: 0;
    transform: translateY(14px);
    pointer-events: none;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .lifecycle-widget-wrap-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* ── Shared widget card chrome ── */
  .widget-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 300px;
    background: var(--st-surface-container-lowest);
    border-radius: var(--st-radius-lg);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35);
    padding: 1.25rem;
  }

  /* ── Flipping ticket (Smart Pass Issuance widget) ──
     perspective lives on the outer scene; preserve-3d + the flip animation
     live on .ticket-flip; each face is absolutely positioned with
     backface-visibility: hidden so only one is ever actually visible, and
     the back face starts pre-rotated 180deg so it's correctly oriented the
     instant the flip passes 90deg. */
  .ticket-scene {
    width: 100%;
    max-width: 252px;
    perspective: 1400px;
  }
  .ticket-flip {
    position: relative;
    width: 100%;
    height: 324px;
    transform-style: preserve-3d;
    animation: ticket-flip-cycle 10s ease-in-out infinite;
  }
  @keyframes ticket-flip-cycle {
    0%, 40% { transform: rotateY(0deg); }
    50%, 90% { transform: rotateY(180deg); }
    100% { transform: rotateY(360deg); }
  }
  .ticket-face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: var(--st-radius-lg);
    background: #111111;
    color: #ffffff;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
    padding: 1rem 1rem 0;
  }
  .ticket-face-back {
    transform: rotateY(180deg);
  }
  .ticket-hologram {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 25%,
      rgba(0, 122, 255, 0.35) 42%,
      rgba(0, 242, 255, 0.45) 52%,
      transparent 68%
    );
    mix-blend-mode: screen;
    pointer-events: none;
  }
  .ticket-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .ticket-logo-mark {
    width: 18px;
    height: 18px;
    stroke: #ffffff;
    stroke-width: 2.2;
    stroke-linecap: round;
  }
  .ticket-brand {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
  }
  .ticket-route {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1.1rem;
  }
  .ticket-zone {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.85rem;
    letter-spacing: 0.01em;
  }
  .ticket-route-arrow {
    color: var(--accent-flow, #007AFF);
    font-size: 1.2rem;
  }
  .ticket-qr {
    position: relative;
    z-index: 1;
    align-self: center;
    margin-top: 0.9rem;
    display: grid;
    grid-template-columns: repeat(8, 9px);
    grid-template-rows: repeat(8, 9px);
    gap: 1.5px;
    padding: 0.5rem;
    background: #ffffff;
    border-radius: var(--st-radius-sm);
  }
  .ticket-qr-cell {
    background: transparent;
  }
  .ticket-qr-cell-filled {
    background: #111111;
  }
  .ticket-meta-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 1.4rem;
    margin-top: 1.1rem;
  }
  .ticket-meta-row-back {
    margin-top: 0.9rem;
    gap: 0;
  }
  .ticket-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .ticket-meta-wide {
    flex-grow: 1;
  }
  .ticket-meta-label {
    font-family: var(--st-font-ui);
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.55);
  }
  .ticket-meta-value {
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.9rem;
  }

  /* Perforated stub divider: a dashed line with two circles straddling the
     card's own edges. .ticket-face's overflow: hidden clips each circle to
     a semi-circle "bite", matching the panel color behind so it reads as a
     real cutout rather than a drawn shape. */
  .ticket-stub-divider {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding-top: 1.1rem;
    border-top: 2px dashed rgba(255, 255, 255, 0.25);
  }
  .ticket-notch {
    position: absolute;
    top: -9px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #0D1B3E;
  }
  .ticket-notch-left {
    left: -9px;
  }
  .ticket-notch-right {
    right: -9px;
  }
  .ticket-stub {
    position: relative;
    z-index: 1;
    padding: 0.9rem 0 1.1rem;
  }
  .ticket-stub-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.7rem;
  }
  .ticket-countdown {
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.03em;
    color: var(--accent-pass, #00F2FF);
  }
  .ticket-active-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.75);
  }
  .ticket-pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--status-success, #27c93f);
    box-shadow: 0 0 0 0 rgba(39, 201, 63, 0.6);
    animation: ticket-pulse 1.8s ease-out infinite;
  }
  @keyframes ticket-pulse {
    0% { box-shadow: 0 0 0 0 rgba(39, 201, 63, 0.55); }
    70% { box-shadow: 0 0 0 6px rgba(39, 201, 63, 0); }
    100% { box-shadow: 0 0 0 0 rgba(39, 201, 63, 0); }
  }
  .ticket-barcode {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 26px;
  }
  .ticket-barcode span {
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 0.5px;
  }

  /* ── Scan-cycle widget: one 6s loop, driven entirely by CSS keyframes
     (no JS timers). Every layer below shares the same 6s duration and
     starts together on mount, which is what keeps them synchronized —
     no shared state needed. Timeline: 0-40% scanning, 42-58% processing,
     60-90% success, 94-100% reset (fades scan target back in right before
     the loop restarts, so the cut is invisible). ── */
  .widget-scan-cycle {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  .scan-cycle-header {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }
  .scan-stage {
    position: relative;
    height: 128px;
  }

  .scan-target {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: scan-target-visibility 6s ease-in-out infinite;
  }
  /* Mini QR grid — same deterministic-pattern technique as the ticket's own
     QR (QR_LARGE_FILLED), just a smaller 7x7 set sized for this stage.
     Filled cells use --st-on-background (a dark navy in light mode, which
     is the "muted dark blue" the brief asked for) rather than a raw hex,
     so it stays theme-correct instead of a fixed color. */
  .scan-qr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 9px);
    grid-template-rows: repeat(7, 9px);
    gap: 1.5px;
    padding: 0.55rem;
    background: var(--st-surface-container-low);
    border-radius: var(--st-radius-sm);
  }
  .scan-qr-cell {
    background: transparent;
  }
  .scan-qr-cell-filled {
    background: var(--st-on-background);
    border-radius: 1px;
  }
  .scan-line {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 84px;
    height: 2px;
    margin-left: -42px;
    border-radius: var(--st-radius-full);
    background: linear-gradient(90deg, transparent, var(--accent-pass, #00F2FF), transparent);
    box-shadow: 0 0 8px 1px var(--accent-pass, #00F2FF);
    animation: scan-sweep 1.1s ease-in-out infinite, scan-line-visibility 6s ease-in-out infinite;
  }
  @keyframes scan-sweep {
    0%, 100% { transform: translateY(-38px); }
    50% { transform: translateY(38px); }
  }
  @keyframes scan-target-visibility {
    0%, 38% { opacity: 1; }
    44%, 92% { opacity: 0; }
    98%, 100% { opacity: 1; }
  }
  @keyframes scan-line-visibility {
    0%, 38% { opacity: 1; }
    42%, 100% { opacity: 0; }
  }

  .scan-processing-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border-radius: 50%;
    border: 2.5px solid var(--st-outline-variant);
    border-top-color: var(--st-secondary);
    opacity: 0;
    animation: widget-spin 0.8s linear infinite, scan-processing-visibility 6s ease-in-out infinite;
  }
  @keyframes widget-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes scan-processing-visibility {
    0%, 40% { opacity: 0; }
    44%, 56% { opacity: 1; }
    60%, 100% { opacity: 0; }
  }

  .scan-success {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    opacity: 0;
    transform: scale(0.92);
    animation: scan-success-visibility 6s ease-in-out infinite;
  }
  .scan-success-check {
    color: var(--status-success, #27c93f);
    margin-bottom: 0.2rem;
  }
  .scan-success-name {
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--st-on-background);
  }
  .scan-success-badge {
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.78rem;
    color: var(--st-secondary);
  }
  .scan-success-time {
    font-family: var(--st-font-ui);
    font-size: 0.72rem;
    color: var(--st-on-surface-variant);
  }
  @keyframes scan-success-visibility {
    0%, 54% { opacity: 0; transform: scale(0.92); }
    60%, 88% { opacity: 1; transform: scale(1); }
    94%, 100% { opacity: 0; transform: scale(0.96); }
  }

  /* ── Logistics timeline widget ── */
  .widget-logistics-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .logistics-header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .logistics-avatar {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--st-font-ui);
    font-weight: 700;
    font-size: 0.75rem;
    background: color-mix(in srgb, var(--st-secondary) 16%, transparent);
    color: var(--st-secondary);
  }
  .logistics-header-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .logistics-name {
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--st-on-background);
  }
  .logistics-live {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--st-font-ui);
    font-size: 0.7rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .logistics-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--status-success, #27c93f);
    box-shadow: 0 0 0 0 rgba(39, 201, 63, 0.6);
    animation: ticket-pulse 1.8s ease-out infinite;
  }

  .logistics-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .logistics-row {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.55rem 0;
    font-family: var(--st-font-ui);
    font-size: 0.85rem;
    /* Staggered slide/fade-in — a live feed populating top to bottom.
       Replays each time the list remounts (see the key prop on
       .logistics-timeline above), not just once on initial page load. */
    opacity: 0;
    transform: translateY(8px);
    animation: logistics-row-in 0.45s ease both;
    animation-delay: calc(var(--stagger-idx, 0) * 130ms);
  }
  .logistics-row + .logistics-row {
    border-top: 1px solid var(--st-outline-variant);
  }
  @keyframes logistics-row-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .logistics-row-label {
    flex-grow: 1;
    color: var(--st-on-background);
  }
  .logistics-row-time {
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }
  .logistics-row-missed .logistics-row-time {
    color: color-mix(in srgb, var(--status-error, #ba1a1a) 70%, var(--st-on-surface-variant) 30%);
  }
  .logistics-row-pending .logistics-row-time {
    color: var(--st-secondary);
  }
  .logistics-icon {
    flex-shrink: 0;
  }
  .logistics-icon-success {
    color: var(--status-success, #27c93f);
  }
  .logistics-icon-missed {
    /* Muted, not alarm-red — a no-show is informational here, not an error
       state the widget needs to shout about. */
    color: color-mix(in srgb, var(--status-error, #ba1a1a) 65%, var(--st-on-surface-variant) 35%);
  }
  .logistics-icon-pending {
    color: var(--st-secondary);
  }
  .logistics-spin {
    animation: widget-spin 1.1s linear infinite;
  }

  /* ── Gallery widget: chaos -> AI gate -> organized inbox, one continuous
     6s loop, entirely CSS keyframes (no JS timers, no active-based replay
     needed — unlike the logistics list this is an ambient loop, so it's
     already "fresh" no matter when the user looks, same as the ticket flip
     and scan cycle). ── */
  .widget-gallery {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  .gallery-header {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }
  .gallery-stage {
    position: relative;
    height: 132px;
    overflow: hidden;
  }

  .gallery-particle {
    position: absolute;
    left: 4%;
    color: var(--st-on-surface-variant);
    opacity: 0;
    animation: gallery-particle-drift 6s ease-in-out infinite;
  }
  @keyframes gallery-particle-drift {
    0% { opacity: 0; transform: translateX(0) scale(0.75); }
    8% { opacity: 0.75; transform: translateX(4px) scale(1); }
    42% { opacity: 0.85; transform: translateX(112px) scale(1); }
    48% { opacity: 0; transform: translateX(134px) scale(0.55); }
    100% { opacity: 0; transform: translateX(0) scale(0.75); }
  }

  .gallery-gate {
    position: absolute;
    left: 50%;
    top: 4px;
    bottom: 4px;
    width: 3px;
    margin-left: -1.5px;
    border-radius: var(--st-radius-full);
    background: linear-gradient(
      180deg,
      transparent,
      var(--accent-pass, #00F2FF),
      var(--accent-flow, #007AFF),
      transparent
    );
    box-shadow: 0 0 10px 1px var(--accent-pass, #00F2FF);
    animation: gallery-gate-pulse 2.4s ease-in-out infinite;
  }
  @keyframes gallery-gate-pulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 1; }
  }

  .gallery-inbox {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
  }
  .gallery-inbox-icon {
    animation: gallery-inbox-highlight 6s ease-in-out infinite;
  }
  @keyframes gallery-inbox-highlight {
    0%, 48% { color: var(--st-on-surface-variant); }
    54%, 86% { color: var(--st-secondary); }
    92%, 100% { color: var(--st-on-surface-variant); }
  }
  .gallery-success-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.55rem;
    border-radius: var(--st-radius-full);
    background: color-mix(in srgb, var(--status-success, #27c93f) 16%, transparent);
    color: var(--status-success, #27c93f);
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.6875rem;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(6px) scale(0.9);
    animation: gallery-success-visibility 6s ease-in-out infinite;
  }
  @keyframes gallery-success-visibility {
    0%, 46% { opacity: 0; transform: translateY(6px) scale(0.9); }
    52%, 88% { opacity: 1; transform: translateY(0) scale(1); }
    94%, 100% { opacity: 0; transform: translateY(-4px) scale(0.94); }
  }

  @media (prefers-reduced-motion: reduce) {
    .lifecycle-step-desc,
    .lifecycle-step-desc-wrap,
    .lifecycle-widget-wrap {
      transition: none !important;
      animation: none !important;
    }
    /* Shows the active step's progress bar fully filled instantly instead
       of growing — still marks which step is active, no motion. The
       underlying autoplay timer itself is untouched: prefers-reduced-motion
       governs animation, not this section's auto-advancing content, which
       is a separate (and here, pausable-by-click) concern. */
    .lifecycle-progress-animating {
      animation: none !important;
      transform: scaleY(1) !important;
    }
    .ticket-flip {
      animation: none !important;
      transform: rotateY(0deg) !important;
    }
    /* Freezes on the success state — the most information-complete frame,
       same reasoning as the ticket settling on its front face — rather
       than a mid-scan moment that never resolves for these users. */
    .scan-target,
    .scan-line,
    .scan-processing-ring {
      animation: none !important;
      opacity: 0 !important;
    }
    .scan-success {
      animation: none !important;
      opacity: 1 !important;
      transform: scale(1) !important;
    }
    .ticket-pulse-dot,
    .logistics-live-dot,
    .logistics-spin {
      animation: none !important;
    }
    .logistics-row {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    /* Same "freeze on the resolved state" approach as the scan widget: no
       particles drifting, gate static instead of pulsing, inbox shown
       already highlighted with the success badge visible. */
    .gallery-particle,
    .gallery-gate {
      animation: none !important;
      opacity: 0 !important;
    }
    .gallery-gate {
      opacity: 0.75 !important;
    }
    .gallery-inbox-icon {
      animation: none !important;
      color: var(--st-secondary) !important;
    }
    .gallery-success-badge {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  @media (max-width: 900px) {
    .lifecycle-grid {
      grid-template-columns: 1fr;
      /* Stacked single-column now, so the two cells no longer share one
         stretched row — the 640px floor from desktop would just leave a
         large empty gap under short content instead of a full-height
         panel, so it's dropped here in favor of the panel's own explicit
         mobile height below. */
      min-height: 0;
    }
    .lifecycle-left {
      padding: var(--st-space-lg) var(--st-space-margin-mobile);
    }
    .lifecycle-panel {
      min-height: 340px;
      order: -1;
    }
  }
`;
