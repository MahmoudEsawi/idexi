"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, Image as ImageIcon } from "lucide-react";
import IdexiMark from "@/components/IdexiMark";

type Step = {
  number: string;
  /** Spec column "Sublabel". */
  product: string;
  /** Spec column "Label". */
  title: string;
  /** Spec column "Caption when active". */
  description: string;
  /** Spec column "Color". */
  color: "pass" | "flow" | "face" | "sponsor";
};

/* Verbatim from docs/specs/idexi-MASTER-SPEC.md, section 6. Labels, sublabels, captions
   and the colour mapping are the partner's exact wording and are not to be
   rewritten, including the capitalised "Idexi", which differs from the site's
   own conventions elsewhere. If this copy is ever
   revised, revise it in the spec first.

   One deliberate departure: the spec's em dashes are removed per rule 14 of
   .claude/skills/humanizer.md, which bans them outright. The H2 becomes two
   sentences and the stage 3 sublabel takes a comma. Wording is otherwise
   untouched. */
const steps: Step[] = [
  {
    number: "01",
    title: "Ticket sent",
    product: "Idexi Pass",
    description: "Guest receives a QR ticket",
    color: "pass",
  },
  {
    number: "02",
    title: "Checked in",
    product: "Idexi Flow",
    description: "Staff scan it with their own phone",
    color: "flow",
  },
  {
    number: "03",
    title: "Photos matched",
    product: "Idexi Face, AI",
    description: "AI finds every face, every photo",
    color: "face",
  },
  {
    number: "04",
    title: "Delivered",
    product: "To their inbox",
    description: "A private gallery lands in their inbox",
    color: "sponsor",
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
   * FaceMatchWidget uses it (to key its grid and replay the detection
   * stagger each time the user navigates back to this step) — the other
   * three ignore it, but share the signature so the `widgets` array below
   * stays a single consistent component type. */
  active: boolean;
};

function PassWidget() {
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
function ScanWidget() {
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

function GalleryWidget() {
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

/* Six deterministic tiles; the middle four resolve to a match, matching the
   determinism convention used by the QR and barcode patterns above. */
const FACE_TILES = [0, 1, 2, 3, 4, 5];

/* Stage 3 is "Photos matched" in the master spec, so this visual has to show
   the AI finding faces across the event photography. Detection frames lock
   onto the tiles in sequence and settle on a found state. */
function FaceMatchWidget({ active }: WidgetProps) {
  return (
    <div className="widget-card widget-facematch">
      <span className="facematch-header">idexi Face &middot; AI Matching</span>

      <div className="facematch-grid" key={String(active)}>
        {FACE_TILES.map((i) => (
          <span
            key={i}
            className="facematch-tile"
            style={{ "--stagger-idx": i } as React.CSSProperties}
          >
            <ImageIcon size={15} className="facematch-tile-icon" />
            <span className="facematch-frame" aria-hidden="true" />
          </span>
        ))}
      </div>

      <span className="facematch-footer">
        <CheckCircle2 size={13} />
        Every face found
      </span>
    </div>
  );
}

const widgets = [PassWidget, ScanWidget, FaceMatchWidget, GalleryWidget];

const AUTO_ADVANCE_MS = 5500;

export default function EventLifecycleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [rail, setRail] = useState({ top: 0, height: 0 });

  /* One indicator slides between steps rather than each step drawing its own
     segment. Geometry comes from the steps themselves, so it tracks the
     active description expanding without a magic number anywhere.

     Measurement happens in the ResizeObserver callback, never synchronously
     in the effect body: the observer fires once on observe, which gives the
     initial position, and again whenever a step changes height. Calling
     setState directly here would trip React 19 cascading-render rules. */
  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length) return;
    const measure = () => {
      const el = stepRefs.current[activeIndex];
      if (el) setRail({ top: el.offsetTop, height: el.offsetHeight });
    };
    const observer = new ResizeObserver(measure);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [activeIndex]);

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

      <div className="container lifecycle-container">
        <div className="lifecycle-grid">
          <div className="lifecycle-left">
            <div className="lifecycle-header">
              <p className="lifecycle-eyebrow">HOW IT WORKS</p>
              <h2 className="lifecycle-heading">
                From ticket to photo. Under 5 minutes, start to finish
              </h2>
            </div>

            <div className="lifecycle-stepper" role="tablist" aria-orientation="vertical">
              {/* The one moving part. Sits in the rail gutter and slides to
                  whichever step is active, carrying the countdown with it. */}
              <span
                className="lifecycle-rail"
                data-color={steps[activeIndex].color}
                style={{ top: rail.top, height: rail.height }}
                aria-hidden="true"
              >
                <span
                  key={activeIndex}
                  className={`lifecycle-rail-fill${inView ? " lifecycle-rail-animating" : ""}`}
                  style={{ "--progress-duration": `${AUTO_ADVANCE_MS}ms` } as React.CSSProperties}
                />
              </span>

              {steps.map((step, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`lifecycle-step${active ? " lifecycle-step-active" : ""}`}
                    data-color={step.color}
                    onClick={() => setActiveIndex(i)}
                  >
                    <span className="lifecycle-step-head">
                      <span className="lifecycle-step-number">{step.number}</span>
                      <span className="lifecycle-step-title">{step.title}</span>
                    </span>
                    <span className="lifecycle-step-sub">{step.product}</span>
                    <span className="lifecycle-step-desc-wrap">
                      <span className="lifecycle-step-desc">{step.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Closing lines, verbatim from the spec. The link is the
                partner's, kept as specified. */}
            <div className="lifecycle-close">
              <p className="lifecycle-close-lines">
                Guests never search. Staff never guess. You never lose control.
              </p>
              <Link href="/how-it-works" className="lifecycle-close-link">
                Watch the full journey
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>

          <div className="lifecycle-panel-wrap">
            <div className="lifecycle-panel">
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
        </div>
      </div>
    </section>
  );
}

const lifecycleCSS = `
  .lifecycle {
    position: relative;
    /* --st-space-2xl is not a token in this system. An undefined var with no
       fallback makes the whole declaration invalid, so this section has been
       rendering with no vertical padding at all, which is why its seams
       measured half of every other section's. */
    padding: var(--st-space-xl) 0;
    background: var(--st-background);
    transition: background 0.4s ease;
    scroll-margin-top: 96px;
  }
  .lifecycle-container {
    width: 100%;
  }
  .lifecycle-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
    width: 100%;
  }
  .lifecycle-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--st-space-lg);
    padding: 0;
  }
  .lifecycle-header {
    max-width: 460px;
    text-align: left;
  }
  /* Brand serif display heading — matches OurStorySection/CtaSection's
     heading declaration (family + weight), the shared look every main
     section heading on the page uses. */
  .lifecycle-eyebrow {
    margin-bottom: 0.75rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    color: var(--st-secondary);
  }

  .lifecycle-step-sub {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.82rem;
    letter-spacing: 0.02em;
    color: var(--st-on-surface-variant);
  }

  /* Per-stage colour, exactly as the spec maps it: blue Pass, teal Flow,
     coral Face, purple Delivered. */
  .lifecycle-step[data-color='pass'] .lifecycle-step-number { color: var(--st-product-pass); }
  .lifecycle-step[data-color='flow'] .lifecycle-step-number { color: var(--st-product-flow); }
  .lifecycle-step[data-color='face'] .lifecycle-step-number { color: var(--st-product-face); }
  .lifecycle-step[data-color='sponsor'] .lifecycle-step-number { color: var(--st-sponsor); }


  .lifecycle-close {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    margin-top: var(--st-space-md);
    padding-left: 1.75rem;
  }
  .lifecycle-close-lines {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.05rem, 1.2vw + 0.7rem, 1.35rem);
    line-height: 1.4;
    color: var(--st-on-background);
    max-width: 34ch;
  }
  .lifecycle-close-link {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--st-secondary);
  }
  .lifecycle-close-link:hover { opacity: 0.75; }
  .lifecycle-close-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .widget-facematch {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.1rem;
  }
  .facematch-header {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    color: var(--st-on-surface-variant);
  }
  .facematch-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .facematch-tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 4 / 3;
    border-radius: var(--st-radius);
    background: var(--st-surface-container);
    color: var(--st-on-surface-variant);
    overflow: hidden;
  }
  .facematch-frame {
    position: absolute;
    inset: 22%;
    border: 2px solid var(--st-product-face);
    border-radius: 3px;
    opacity: 0;
    transform: scale(1.35);
    animation: facematch-lock 3.2s ease-out infinite;
    animation-delay: calc(var(--stagger-idx) * 0.22s);
  }
  @keyframes facematch-lock {
    0%   { opacity: 0; transform: scale(1.35); }
    18%  { opacity: 1; transform: scale(1); }
    72%  { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1); }
  }
  .facematch-footer {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--st-product-face);
  }

  @media (prefers-reduced-motion: reduce) {
    .facematch-frame {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

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
    padding-left: 1.9rem;
  }
  /* The full-height track the indicator runs in. */
  .lifecycle-stepper::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    border-radius: var(--st-radius-full);
    background: var(--st-outline-variant);
    opacity: 0.6;
  }

  /* No card, no ring, no drop shadow. The active step is signalled by
     opacity and by the rail beside it, which is the whole point: a step is
     a line of type, not a box. Padding is vertical only so the text sits on
     the stepper measure rather than inside a container. */
  .lifecycle-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0.8rem 0;
    cursor: pointer;
    opacity: 0.42;
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    /* Overrides the global "button, .btn { overflow: hidden }" rule in
       globals.css, which clipped anything sitting outside this box. */
    overflow: visible;
  }
  .lifecycle-step:hover { opacity: 0.72; }
  .lifecycle-step-active,
  .lifecycle-step-active:hover { opacity: 1; }
  /* Opacity would otherwise dim the focus ring along with the step. */
  .lifecycle-step:focus-visible {
    opacity: 1;
    outline: 2px solid var(--st-secondary);
    outline-offset: 4px;
    border-radius: 4px;
  }

  /* Sliding indicator. top and height come from the measured active step;
     they animate rather than jump. This element is absolutely positioned and
     out of flow, so moving it reflows nothing around it. */
  .lifecycle-rail {
    position: absolute;
    left: 0;
    width: 2px;
    border-radius: var(--st-radius-full);
    overflow: hidden;
    transition:
      top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.45s ease;
    background: color-mix(in srgb, var(--st-secondary) 22%, transparent);
  }
  .lifecycle-rail[data-color='pass'] { background: color-mix(in srgb, var(--st-product-pass) 22%, transparent); }
  .lifecycle-rail[data-color='flow'] { background: color-mix(in srgb, var(--st-product-flow) 22%, transparent); }
  .lifecycle-rail[data-color='face'] { background: color-mix(in srgb, var(--st-product-face) 22%, transparent); }
  .lifecycle-rail[data-color='sponsor'] { background: color-mix(in srgb, var(--st-sponsor) 22%, transparent); }

  /* Grows scaleY 0 to 1 across AUTO_ADVANCE_MS: a literal countdown to the
     next auto-advance. transform, not height, so it stays compositor-only.
     Keyed on the active index in the JSX, so it restarts on every step
     change, manual or automatic. */
  .lifecycle-rail-fill {
    position: absolute;
    inset: 0;
    border-radius: var(--st-radius-full);
    transform: scaleY(0);
    transform-origin: top;
    background: var(--st-secondary);
  }
  .lifecycle-rail[data-color='pass'] .lifecycle-rail-fill { background: var(--st-product-pass); }
  .lifecycle-rail[data-color='flow'] .lifecycle-rail-fill { background: var(--st-product-flow); }
  .lifecycle-rail[data-color='face'] .lifecycle-rail-fill { background: var(--st-product-face); }
  .lifecycle-rail[data-color='sponsor'] .lifecycle-rail-fill { background: var(--st-sponsor); }
  .lifecycle-rail-animating {
    animation: lifecycle-rail-grow var(--progress-duration, 5500ms) linear forwards;
  }
  @keyframes lifecycle-rail-grow {
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

  .lifecycle-panel-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .lifecycle-panel {
    position: relative;
    width: 100%;
    max-width: 440px;
    height: 440px;
    margin: 0 auto;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    background: #0B1528;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.45);
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

  /* ── Gallery widget: chaos -> AI gate -> organized inbox, one continuous
     6s loop, entirely CSS keyframes (no JS timers, no active-based replay
     needed: this is an ambient loop, so it is already "fresh" no matter
     when the user looks, same as the ticket flip and scan cycle). ── */
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
    .lifecycle-rail-animating {
      animation: none !important;
      transform: scaleY(1) !important;
    }
    /* The indicator still marks the active step, it just jumps there. */
    .lifecycle-rail,
    .lifecycle-step {
      transition: none !important;
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
    .ticket-pulse-dot {
      animation: none !important;
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
      gap: 2.5rem;
    }
    .lifecycle-left {
      padding: 0 var(--st-space-margin-mobile);
    }
    .lifecycle-panel {
      max-width: 360px;
      height: 380px;
      order: 0;
    }
  }

  /* Phones step down to the shared mobile section rhythm. */
  @media (max-width: 768px) {
    .lifecycle { padding-top: var(--st-space-lg); padding-bottom: var(--st-space-lg); }
  }
`;
