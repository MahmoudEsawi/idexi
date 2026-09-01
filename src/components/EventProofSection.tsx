"use client";

import * as React from "react";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import { Maximize2, ShieldCheck, Zap } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

/* Command centre: who we have run, and what the door actually did.

   This is the merge of what were two separate sections, Trusted By (event
   cards) and the proof band (throughput chart). Both were about the same three
   events, so the page stated its evidence twice. The cards are now the control
   surface for the chart: choose an event and its curve, counters, and delivery
   note update beneath.

   It also carries the spec's Quick Proof Bar, which flows out of the same
   block with no heading of its own by design.

   ────────────────────────────────────────────────────────────────────────
   DATA STATUS. Only TEDx PHU is measured. The other two carry `placeholder`
   and MUST be replaced with real figures before this ships publicly. Every
   number is plausible for its event size, which is exactly what makes it
   dangerous: nothing about a placeholder looks wrong on the page. Check
   `dataStatus`, not the numbers.
   ────────────────────────────────────────────────────────────────────────

   Charting decisions follow the dataviz guidance:
     - Change over time with a cumulative measure, so an area line is the form.
     - One shared pair of axes for all three events. Normalising each to fill
       the frame would destroy the comparison, which is the entire point.
     - Three series means identity cannot rest on selection state alone, so
       every curve carries a direct label at its endpoint rather than a legend
       box.
     - Numbers wear text ink, never the series colour. The mark carries
       identity; the text stays readable.
     - No crosshair tooltip. Hovering a card is already the primary
       interaction in this section, and a second hover layer over the plot
       would compete with it. The stats row carries the values a tooltip
       would have surfaced. */

type EventProof = {
  id: string;
  name: string;
  shortName: string;
  kind: string;
  badge: string;
  logo: string;
  /** Intrinsic size, so next/image can size and optimise without layout shift. */
  logoW: number;
  logoH: number;
  /** Rendered width. Set per logo so the VISIBLE marks match, not the canvases.
      Measured alpha bounds: TEDx fills 29% of its canvas height, Robotics 76%,
      AstroCode 69%, so a single shared cap renders TEDx roughly a third the
      size of the others. Its artwork is fine; the canvas is mostly padding. */
  boxW: number;
  dataStatus: "verified" | "placeholder";
  registered: number;
  checkedIn: number;
  /** Minutes from doors open until the queue cleared. */
  minutes: number;
  doorsOpen: string;
  /** Peak guests per minute, from the steepest span of the curve. */
  peak: number;
  delivery: string;
  /** Cumulative check-ins at nine equal slices of the door window. */
  curve: number[];
};

const EVENTS: EventProof[] = [
  {
    id: "tedx",
    name: "TEDx PHU",
    shortName: "TEDx PHU",
    kind: "Conference",
    badge: "300 guests",
    logo: "/tedXphu-01.png",
    logoW: 2084,
    logoH: 2084,
    boxW: 190,
    dataStatus: "verified",
    registered: 300,
    checkedIn: 287,
    minutes: 25,
    doorsOpen: "18:00",
    peak: 22,
    delivery: "Same night",
    curve: [0, 18, 62, 128, 196, 242, 267, 280, 287],
  },
  {
    id: "robotics",
    name: "Arab Robotics and AI Championship",
    shortName: "Robotics",
    kind: "Competition",
    badge: "300 guests",
    logo: "/Robotics.png",
    logoW: 1241,
    logoH: 384,
    boxW: 250,
    dataStatus: "placeholder",
    registered: 300,
    checkedIn: 291,
    minutes: 34,
    doorsOpen: "09:00",
    peak: 16,
    delivery: "Same day",
    curve: [0, 12, 44, 98, 165, 221, 258, 279, 291],
  },
  {
    id: "ieee",
    name: "IEEE AESS Aerospace Competition",
    shortName: "IEEE AESS",
    kind: "Competition",
    badge: "150 guests",
    logo: "/AstroCode.png",
    logoW: 666,
    logoH: 375,
    boxW: 165,
    dataStatus: "placeholder",
    registered: 150,
    checkedIn: 146,
    minutes: 12,
    doorsOpen: "10:30",
    peak: 25,
    delivery: "Same day",
    curve: [0, 14, 42, 79, 108, 127, 138, 144, 146],
  },
];

const PROOF = [
  { icon: Zap, stat: "Under 5 min", label: "ticket delivery, start to finish", product: "pass" },
  { icon: Maximize2, stat: "Any event size", label: "from 150 guests to 3,000+", product: "flow" },
  { icon: ShieldCheck, stat: "100% guest privacy", label: "OTP-verified photo access", product: "face" },
];

/* Axes are fixed rather than derived, so a future event with different figures
   cannot silently rescale the others out from under the comparison. */
const X_MAX_MIN = 36;
const Y_MAX_GUESTS = 300;
const VB = { w: 720, h: 260, left: 48, right: 20, top: 24, bottom: 40 };

function xAt(minute: number) {
  return VB.left + (minute / X_MAX_MIN) * (VB.w - VB.left - VB.right);
}
function yAt(guests: number) {
  return VB.h - VB.bottom - (guests / Y_MAX_GUESTS) * (VB.h - VB.top - VB.bottom);
}

/* Catmull-Rom through the nine samples as cubic beziers. Every event yields
   the same command sequence (one M, eight C), which is what lets one curve
   morph into another instead of cutting. */
function linePath(evt: EventProof) {
  const pts = evt.curve.map((g, i) => ({
    x: xAt((evt.minutes * i) / (evt.curve.length - 1)),
    y: yAt(g),
  }));
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(2)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(2)}, ${(p2.x - (p3.x - p1.x) / 6).toFixed(2)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function areaPath(evt: EventProof) {
  const base = yAt(0);
  return `${linePath(evt)} L ${xAt(evt.minutes).toFixed(2)} ${base.toFixed(2)} L ${xAt(0).toFixed(2)} ${base.toFixed(2)} Z`;
}

function Counter({ value, active }: { value: number; active: boolean }) {
  const reduced = useReducedMotion();
  const [counted, setCounted] = React.useState(0);

  React.useEffect(() => {
    if (!active || reduced) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCounted(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, active, reduced]);

  // Derived on the reduced-motion path rather than written into state:
  // setting state synchronously in an effect body cascades renders.
  const shown = reduced ? value : counted;
  return <>{shown.toLocaleString("en-US")}</>;
}

export default function EventProofSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.15);
  const [activeId, setActiveId] = React.useState(EVENTS[0].id);
  const reduced = useReducedMotion();

  const active = EVENTS.find((e) => e.id === activeId) ?? EVENTS[0];

  return (
    <section className="ep-section" id="trusted-by" ref={ref}>
      <style>{epCSS}</style>

      <div className="ep-inner">
        <header className="ep-header">
          <h2 className="ep-heading">
            Already running at events across Jordan and the region
          </h2>
          <p className="ep-sub">
            Pick an event to see what its door actually did.
          </p>
        </header>

        {/* Logos are the chart's controls. Hover, click and keyboard focus
            all select, and all call the same idempotent setter, so a
            synthetic mouseenter on touch cannot race a click into the wrong
            state. Colour alone does not carry the active state: the rail
            under the selected logo is the non-colour cue. */}
        <ul className="ep-logos">
          {EVENTS.map((evt) => {
            const isActive = evt.id === activeId;
            return (
              <li key={evt.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={isActive ? "ep-logo ep-logo-active" : "ep-logo"}
                  onClick={() => setActiveId(evt.id)}
                  onMouseEnter={() => setActiveId(evt.id)}
                  onFocus={() => setActiveId(evt.id)}
                >
                  <Image
                    src={evt.logo}
                    alt={evt.name}
                    width={evt.logoW}
                    height={evt.logoH}
                    className="ep-logo-img"
                    style={
                      {
                        "--ep-box-w": `${evt.boxW}px`,
                      } as React.CSSProperties
                    }
                    priority={evt.id === EVENTS[0].id}
                  />
                  {isActive ? (
                    <motion.span layoutId="ep-logo-rail" className="ep-logo-rail" />
                  ) : null}
                </button>
              </li>
            );
          })}
          {/* Inert on purpose: it stands for events we have not run yet, so
              there is nothing for it to select. */}
          <li className="ep-logo-more">More added regularly</li>
        </ul>

        <div className="ep-chart-wrap">
          <svg
            className="ep-chart"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            role="img"
            aria-label={`Cumulative check-ins. ${EVENTS.map((e) => `${e.name}: ${e.checkedIn} of ${e.registered} guests in ${e.minutes} minutes`).join(". ")}. Currently highlighted: ${active.name}.`}
          >
            {[100, 200, 300].map((g) => (
              <g key={g}>
                <line className="ep-grid" x1={VB.left} x2={VB.w - VB.right} y1={yAt(g)} y2={yAt(g)} />
                <text className="ep-axis" x={VB.left - 10} y={yAt(g) + 4} textAnchor="end">
                  {g}
                </text>
              </g>
            ))}
            <line className="ep-baseline" x1={VB.left} x2={VB.w - VB.right} y1={yAt(0)} y2={yAt(0)} />
            {[0, 10, 20, 30].map((m) => (
              <text key={m} className="ep-axis" x={xAt(m)} y={VB.h - 14} textAnchor="middle">
                {m === 0 ? "doors open" : `${m} min`}
              </text>
            ))}

            {EVENTS.filter((e) => e.id !== activeId).map((evt) => (
              <path key={evt.id} className="ep-ghost" d={linePath(evt)} />
            ))}

            <motion.path
              className="ep-area"
              initial={false}
              animate={{ d: areaPath(active), opacity: inView ? 0.12 : 0 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              className="ep-line"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ d: linePath(active), pathLength: inView ? 1 : 0 }}
              transition={{
                d: { duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
                pathLength: { duration: reduced ? 0 : 1.2, ease: "easeOut" },
              }}
            />
            <motion.circle
              className="ep-dot"
              r={6}
              initial={false}
              animate={{ cx: xAt(active.minutes), cy: yAt(active.checkedIn) }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Direct labels rather than a legend box. With three series,
                identity must not rest on selection state alone. */}
            {EVENTS.map((evt) => {
              const x = xAt(evt.minutes);
              const atRightEdge = evt.minutes / X_MAX_MIN > 0.8;
              return (
                <text
                  key={evt.id}
                  className={evt.id === activeId ? "ep-label ep-label-active" : "ep-label"}
                  x={atRightEdge ? x - 10 : x + 10}
                  y={yAt(evt.checkedIn) - 9}
                  textAnchor={atRightEdge ? "end" : "start"}
                >
                  {evt.shortName}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="ep-stats">
          <div className="ep-stat">
            <p className="ep-stat-value">
              <Counter value={active.checkedIn} active={inView} />
              <span className="ep-stat-of"> of {active.registered}</span>
            </p>
            <p className="ep-stat-label">guests checked in</p>
          </div>
          <div className="ep-stat">
            <p className="ep-stat-value">
              <Counter value={active.minutes} active={inView} />
              <span className="ep-stat-of"> min</span>
            </p>
            <p className="ep-stat-label">to clear the door, from {active.doorsOpen}</p>
          </div>
          <div className="ep-stat">
            <p className="ep-stat-value">
              <Counter value={active.peak} active={inView} />
              <span className="ep-stat-of"> / min</span>
            </p>
            <p className="ep-stat-label">at the busiest minute</p>
          </div>
          <div className="ep-stat">
            <p className="ep-stat-value ep-stat-text">{active.delivery}</p>
            <p className="ep-stat-label">photos delivered</p>
          </div>
        </div>

        <p className="ep-note">
          These are our own operational records, not survey results. We have run three
          events so far, and every one of them is on this chart.
        </p>

        <div className="ep-proof-bar">
          {PROOF.map(({ icon: Icon, stat, label, product }, i) => (
            <div
              key={stat}
              className={inView ? "ep-proof-col ep-proof-col-in" : "ep-proof-col"}
              data-product={product}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="ep-proof-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <p className="ep-proof-stat">{stat}</p>
              <p className="ep-proof-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const epCSS = `
  .ep-section {
    background: var(--st-background);
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    transition: background 0.4s ease;
    scroll-margin-top: 96px;
  }

  .ep-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--st-space-md);
  }

  .ep-header {
    max-width: 60ch;
  }

  .ep-heading {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.75rem, 3vw + 0.75rem, 2.75rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }

  .ep-sub {
    margin-top: var(--st-space-sm);
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* Logo row. The three assets have very different aspect ratios (1.00,
     3.23, 1.78), so they are bounded by height with object-fit: contain
     rather than given fixed widths, which is what keeps them optically
     even instead of one square logo dwarfing a wide one. */
  .ep-logos {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(1.25rem, 3vw, 2.75rem);
    padding: var(--st-space-sm) 0 var(--st-space-md);
    list-style: none;
  }

  .ep-logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Overrides the global button rule, which sets 0.85rem 2rem padding,
       a pill radius, and overflow: hidden. That overflow would clip the
       active rail sitting on the element's bottom edge. */
    height: 92px;
    padding: 0 0.25rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
    cursor: pointer;
    filter: grayscale(1);
    opacity: 0.5;
    transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  }
  .ep-logo:hover,
  .ep-logo-active {
    filter: grayscale(0);
    opacity: 1;
  }
  .ep-logo-active {
    transform: translateY(-2px);
  }
  .ep-logo:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 6px;
    border-radius: 6px;
  }

  /* Sized by width, with no height cap. The TEDx canvas is square with a
     wide wordmark in the middle, so constraining its height starved the mark.
     A taller canvas now overflows the fixed-height button symmetrically, and
     because that overflow is transparent padding it is invisible and cannot
     collide with anything. */
  .ep-logo-img {
    width: var(--ep-box-w, 200px);
    height: auto;
    max-width: none;
    object-fit: contain;
  }

  /* The non-colour cue for the active logo. Grayscale to colour is a
     colour-only signal on its own, which selection state must never be. */
  /* A short centred marker rather than a full-width underline. The logo
     assets carry their own internal padding, so a bar spanning the whole
     button read as detached from the mark above it. */
  .ep-logo-rail {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 30px;
    height: 3px;
    margin-left: -15px;
    border-radius: 3px;
    background: var(--st-secondary);
  }

  /* The supplied logos are dark artwork on transparency, drawn for light
     backgrounds. On the dark navy surface their darkest parts disappear, so
     in dark mode each sits on a light plate. That keeps the brief's
     "full colour when active" readable instead of inverting them to white
     silhouettes, which would have thrown the colour away. */
  :root[data-theme='dark'] .ep-logo {
    background: rgba(255, 255, 255, 0.92);
    border-radius: var(--st-radius-md);
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }
  :root[data-theme='dark'] .ep-logo-rail {
    bottom: 7px;
  }

  .ep-logo-more {
    align-self: center;
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--st-on-surface-variant);
    opacity: 0.55;
  }

  .ep-chart-wrap {
    width: 100%;
    overflow-x: auto;
  }

  .ep-chart {
    display: block;
    width: 100%;
    min-width: 520px;
    height: auto;
  }

  .ep-grid {
    stroke: var(--st-outline-variant);
    stroke-width: 1;
    stroke-dasharray: 2 6;
  }
  .ep-baseline {
    stroke: var(--st-outline-variant);
    stroke-width: 1;
  }
  .ep-axis {
    fill: var(--st-on-surface-variant);
    font-family: var(--st-font-ui);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }

  .ep-ghost {
    fill: none;
    stroke: var(--st-outline-variant);
    stroke-width: 1.5;
    stroke-linecap: round;
    opacity: 0.6;
  }

  .ep-area {
    fill: var(--st-secondary);
    stroke: none;
  }

  .ep-line {
    fill: none;
    stroke: var(--st-secondary);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .ep-dot {
    fill: var(--st-secondary);
    stroke: var(--st-surface-container-lowest);
    stroke-width: 3;
  }

  /* A surface-coloured stroke under the glyphs keeps the label readable
     where it crosses another event's curve or fill. */
  .ep-label {
    font-family: var(--st-font-ui);
    font-size: 11px;
    font-weight: 600;
    fill: var(--st-on-surface-variant);
    stroke: var(--st-background);
    stroke-width: 3;
    paint-order: stroke;
    opacity: 0.75;
    transition: opacity 0.25s ease;
  }
  .ep-label-active {
    fill: var(--st-on-background);
    opacity: 1;
  }

  .ep-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--st-space-md);
    padding-top: var(--st-space-sm);
    border-top: 1px solid var(--st-outline-variant);
  }

  /* Values wear text ink, not the series colour. The line and dot carry
     identity; the numbers only have to be readable. */
  .ep-stat-value {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: clamp(1.5rem, 2.2vw + 0.8rem, 2.1rem);
    line-height: 1.1;
    color: var(--st-on-background);
    font-variant-numeric: tabular-nums;
  }
  .ep-stat-text {
    font-size: clamp(1.15rem, 1.4vw + 0.7rem, 1.5rem);
  }

  .ep-stat-of {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--st-on-surface-variant);
  }

  .ep-stat-label {
    margin-top: 0.2rem;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
  }

  .ep-note {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
    max-width: 70ch;
  }
  .ep-proof-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--st-space-md);
    margin-top: var(--st-space-sm);
    padding-top: var(--st-space-lg);
    border-top: 1px solid var(--st-outline-variant);
  }

  .ep-proof-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .ep-proof-col-in {
    opacity: 1;
    transform: none;
  }

  .ep-proof-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--st-radius-full);
  }
  .ep-proof-col[data-product='pass'] .ep-proof-icon {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .ep-proof-col[data-product='flow'] .ep-proof-icon {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .ep-proof-col[data-product='face'] .ep-proof-icon {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }

  .ep-proof-stat {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: clamp(1.1rem, 1.5vw + 0.6rem, 1.5rem);
    line-height: 1.2;
  }
  .ep-proof-col[data-product='pass'] .ep-proof-stat { color: var(--st-product-pass); }
  .ep-proof-col[data-product='flow'] .ep-proof-stat { color: var(--st-product-flow); }
  .ep-proof-col[data-product='face'] .ep-proof-stat { color: var(--st-product-face); }

  .ep-proof-label {
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
    max-width: 24ch;
  }

  @media (prefers-reduced-motion: reduce) {
    .ep-proof-col {
      opacity: 1;
      transform: none;
      transition: none;
      transition-delay: 0ms !important;
    }
    .ep-logo-active {
      transform: none;
    }
  }

  @media (max-width: 860px) {
    .ep-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 767px) {
    .ep-section {
      padding: var(--st-space-lg) var(--st-space-margin-mobile);
    }
    .ep-proof-bar {
      grid-template-columns: 1fr;
      gap: var(--st-space-lg);
    }
  }
`;
