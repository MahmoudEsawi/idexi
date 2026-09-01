"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Image as ImageIcon, Lock, Mail, ScanLine } from "lucide-react";

/* The connected journey, told as one record rather than four illustrations.

   Motion thesis: the page's own intro claims "one guest record moves through
   four stages, nothing is re-entered between them". So the sticky panel holds
   a single record that never unmounts. Its header (avatar, name, code) is the
   same DOM node in all four stages; only the status, the accent colour, and
   the body beneath it change. The continuity is the argument. Four separate
   visuals fading in and out would have illustrated the copy; this proves it.

   Stage text follows idexi-MASTER-SPEC.md section 6, matching the home page
   stepper exactly, including the capitalised "Idexi". The spec's em dash in
   stage 3 is replaced with a comma per rule 14 of humanizer.md, which bans
   them; nothing else about the wording changes.

   Stage detection uses one IntersectionObserver per block rather than scroll
   position maths: cheaper, and it does not fight the browser's own
   compositing on a long sticky page. */

type Stage = {
  n: string;
  label: string;
  product: string;
  color: "pass" | "flow" | "face" | "sponsor";
  href: string | null;
  /** Product name for the outbound link. Separate from `product` because the
      spec's stage 3 sublabel is "Idexi Face, AI", which reads badly inside a
      sentence. The sublabel itself is unchanged. */
  linkLabel: string | null;
  caption: string;
  body: string;
  /** Shown on the persistent record header for this stage. */
  status: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    label: "Ticket sent",
    product: "Idexi Pass",
    color: "pass",
    href: "/services/pass",
    linkLabel: "Idexi Pass",
    caption: "Guest receives a QR ticket",
    body: "A guest registers and their ticket is generated and emailed automatically, carrying their name, their category, and an encrypted QR code that works exactly once. Nobody approves anything by hand, and sponsor branding is already on it when it lands.",
    status: "Ticket issued",
  },
  {
    n: "02",
    label: "Checked in",
    product: "Idexi Flow",
    color: "flow",
    href: "/services/flow",
    linkLabel: "Idexi Flow",
    caption: "Staff scan it with their own phone",
    body: "At the door, any staff phone is the scanner. One scan confirms entry in under a second and shows the guest's status on the spot, so VIP access and session permissions are visible rather than guessed. Kit and meal pickups log against the same record. If the venue's network drops, scans queue locally and sync later.",
    status: "Checked in 18:04",
  },
  {
    n: "03",
    label: "Photos matched",
    product: "Idexi Face, AI",
    color: "face",
    href: "/services/face",
    linkLabel: "Idexi Face",
    caption: "AI finds every face, every photo",
    body: "As photographers upload, our matching model works through the event's photography and finds each guest who opted in. It was trained specifically on crowded event photos, which is the case that generic face matching handles worst.",
    status: "14 photos matched",
  },
  {
    n: "04",
    label: "Delivered",
    product: "To their inbox",
    color: "sponsor",
    href: null,
    linkLabel: null,
    caption: "A private gallery lands in their inbox",
    body: "Each guest gets an email with their own gallery, opened by a one-time code sent only to them. No public link exists, so nothing is exposed by a forwarded message. Every gallery carries your sponsors' branding.",
    status: "Gallery delivered",
  },
];

/* The one guest the whole page follows. Fixed, not random, matching the
   determinism convention used by the widgets on the home page. */
const GUEST = { name: "Layla Haddad", initials: "LH", code: "IDX-2K7-4413" };

const PHOTO_TILES = [0, 1, 2, 3, 4, 5];

function StageVisual({ stage }: { stage: Stage }) {
  switch (stage.color) {
    case "pass":
      return (
        <div className="jr-vis jr-vis-ticket">
          <div className="jr-qr" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} data-on={(i * 7 + (i % 5)) % 3 === 0 ? "1" : undefined} />
            ))}
          </div>
          <div className="jr-vis-meta">
            <span className="jr-chip">General admission</span>
            <span className="jr-vis-note">
              <Mail size={13} aria-hidden="true" /> Sent to layla@example.com
            </span>
          </div>
        </div>
      );
    case "flow":
      return (
        <div className="jr-vis jr-vis-scan">
          <div className="jr-qr jr-qr-scanning" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} data-on={(i * 7 + (i % 5)) % 3 === 0 ? "1" : undefined} />
            ))}
            <span className="jr-scanline" />
          </div>
          <div className="jr-vis-meta">
            <span className="jr-chip">Main gate</span>
            <span className="jr-vis-note">
              <ScanLine size={13} aria-hidden="true" /> Verified in 0.4s, one entry only
            </span>
          </div>
        </div>
      );
    case "face":
      return (
        <div className="jr-vis jr-vis-match">
          <div className="jr-tiles" aria-hidden="true">
            {PHOTO_TILES.map((i) => (
              <span key={i} className="jr-tile" style={{ "--i": i } as React.CSSProperties}>
                <ImageIcon size={14} />
                <span className="jr-tile-frame" />
              </span>
            ))}
          </div>
          <span className="jr-vis-note">
            <Check size={13} aria-hidden="true" /> Same guest found across 14 photos
          </span>
        </div>
      );
    default:
      return (
        <div className="jr-vis jr-vis-deliver">
          <div className="jr-gallery" aria-hidden="true">
            <span className="jr-gallery-card jr-gallery-card-3" />
            <span className="jr-gallery-card jr-gallery-card-2" />
            <span className="jr-gallery-card jr-gallery-card-1">
              <Lock size={16} />
              <span className="jr-otp">OTP 4413</span>
            </span>
          </div>
          <span className="jr-vis-note">
            <Mail size={13} aria-hidden="true" /> Private gallery, her code only
          </span>
        </div>
      );
  }
}

export default function JourneyScroll() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const blockRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    // One observer, band across the middle of the viewport: whichever stage
    // block is crossing the centre owns the panel.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const i = nodes.indexOf(hit.target as HTMLDivElement);
        if (i >= 0) setActiveIndex(i);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const active = STAGES[activeIndex];

  return (
    <div className="jr-root" data-color={active.color}>
      <style>{journeyCSS}</style>

      <div className="jr-grid">
        <div className="jr-track">
          {STAGES.map((stage, i) => (
            <div
              key={stage.n}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className={i === activeIndex ? "jr-block jr-block-active" : "jr-block"}
              data-color={stage.color}
            >
              {/* On mobile the sticky panel is gone, so each stage carries its
                  own visual inline instead. */}
              <div className="jr-inline-visual" data-color={stage.color} aria-hidden="true">
                <StageVisual stage={stage} />
              </div>

              <div className="jr-block-head">
                <span className="jr-block-n">{stage.n}</span>
                <div>
                  <h2 className="jr-block-label">{stage.label}</h2>
                  <p className="jr-block-product">{stage.product}</p>
                </div>
              </div>
              <p className="jr-block-caption">{stage.caption}</p>
              <p className="jr-block-body">{stage.body}</p>
              {stage.href ? (
                <Link href={stage.href} className="jr-block-link">
                  More on {stage.linkLabel}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="jr-sticky" aria-hidden="true">
          <div className="jr-panel">
            {/* Persistent across all four stages. This node is never
                remounted, which is the whole point of the section. */}
            <div className="jr-record">
              <span className="jr-avatar">{GUEST.initials}</span>
              <div className="jr-record-id">
                <span className="jr-record-name">{GUEST.name}</span>
                <span className="jr-record-code">{GUEST.code}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active.status}
                  className="jr-record-status"
                  initial={reduced ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                  transition={{ duration: reduced ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {active.status}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="jr-panel-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.color}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduced ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StageVisual stage={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="jr-rail">
              {STAGES.map((stage, i) => (
                <span
                  key={stage.n}
                  className={i <= activeIndex ? "jr-rail-seg jr-rail-seg-on" : "jr-rail-seg"}
                  data-color={stage.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const journeyCSS = `
  /* The global "section { overflow: hidden }" in globals.css turns any
     ancestor section into a scrollport, which silently kills position:
     sticky in every descendant. clip clips the same way without creating
     one. Only the X axis, because clipping Y would cut off the pinned
     panel; clip is the one value allowed to pair with visible. */
  .jr-root {
    overflow-x: clip;
    overflow-y: visible;
    margin-bottom: 3rem;
  }

  .jr-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--st-space-md);
  }

  .jr-block {
    padding: var(--st-space-md) 0;
  }

  .jr-block-head {
    display: flex;
    align-items: baseline;
    gap: 0.85rem;
  }

  .jr-block-n {
    font-family: var(--st-font-display);
    font-weight: 800;
    font-size: 1.1rem;
    font-variant-numeric: tabular-nums;
    transition: color 0.4s ease;
  }
  .jr-block[data-color='pass'] .jr-block-n { color: var(--st-product-pass); }
  .jr-block[data-color='flow'] .jr-block-n { color: var(--st-product-flow); }
  .jr-block[data-color='face'] .jr-block-n { color: var(--st-product-face); }
  .jr-block[data-color='sponsor'] .jr-block-n { color: var(--st-sponsor); }

  .jr-block-label {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.35rem;
    color: var(--st-on-surface);
  }

  .jr-block-product {
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    color: var(--st-on-surface-variant);
  }

  .jr-block-caption {
    margin-top: 0.7rem;
    font-family: var(--st-font-serif);
    font-size: clamp(1.15rem, 1.4vw + 0.8rem, 1.5rem);
    line-height: 1.4;
    color: var(--st-on-background);
  }

  .jr-block-body {
    margin-top: 0.7rem;
    font-size: 0.98rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
    max-width: 46ch;
  }

  .jr-block-link {
    display: inline-block;
    margin-top: 0.9rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.93rem;
    color: var(--st-secondary);
  }
  .jr-block-link:hover { opacity: 0.75; }
  .jr-block-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .jr-sticky { display: none; }

  .jr-inline-visual {
    margin-bottom: var(--st-space-md);
    padding: 1.1rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
  }

  /* ── Panel ── */
  .jr-panel {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    padding: 1.35rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    box-shadow: 0 24px 48px -28px rgba(11, 28, 48, 0.28);
  }

  .jr-record {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--st-outline-variant);
  }

  .jr-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: var(--st-radius-full);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.85rem;
    transition: background 0.45s ease, color 0.45s ease;
  }
  .jr-root[data-color='pass'] .jr-avatar {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .jr-root[data-color='flow'] .jr-avatar {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .jr-root[data-color='face'] .jr-avatar {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }
  .jr-root[data-color='sponsor'] .jr-avatar {
    background: var(--st-sponsor-container);
    color: var(--st-on-sponsor-container);
  }

  .jr-record-id {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .jr-record-name {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--st-on-surface);
  }
  .jr-record-code {
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--st-on-surface-variant);
    font-variant-numeric: tabular-nums;
  }

  .jr-record-status {
    margin-left: auto;
    padding: 0.3rem 0.65rem;
    border-radius: var(--st-radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    transition: background 0.45s ease, color 0.45s ease;
  }
  .jr-root[data-color='pass'] .jr-record-status {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .jr-root[data-color='flow'] .jr-record-status {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .jr-root[data-color='face'] .jr-record-status {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }
  .jr-root[data-color='sponsor'] .jr-record-status {
    background: var(--st-sponsor-container);
    color: var(--st-on-sponsor-container);
  }

  .jr-panel-body {
    min-height: 210px;
    display: flex;
    align-items: center;
  }

  .jr-rail {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
  .jr-rail-seg {
    height: 3px;
    border-radius: 3px;
    background: var(--st-outline-variant);
    transition: background 0.45s ease;
  }
  .jr-rail-seg-on[data-color='pass'] { background: var(--st-product-pass); }
  .jr-rail-seg-on[data-color='flow'] { background: var(--st-product-flow); }
  .jr-rail-seg-on[data-color='face'] { background: var(--st-product-face); }
  .jr-rail-seg-on[data-color='sponsor'] { background: var(--st-sponsor); }

  /* ── Stage visuals ── */
  .jr-vis {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    width: 100%;
  }

  .jr-qr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3px;
    width: 108px;
    padding: 10px;
    background: var(--st-surface-container);
    border-radius: var(--st-radius);
    overflow: hidden;
  }
  .jr-qr span {
    aspect-ratio: 1;
    border-radius: 1px;
    background: transparent;
  }
  .jr-qr span[data-on] {
    background: var(--st-on-surface);
  }

  .jr-scanline {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--st-product-flow);
    box-shadow: 0 0 10px var(--st-product-flow);
    animation: jr-scan 2.4s ease-in-out infinite;
  }
  @keyframes jr-scan {
    0%, 100% { top: 6%; }
    50% { top: 92%; }
  }

  .jr-vis-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .jr-chip {
    padding: 0.25rem 0.6rem;
    border-radius: var(--st-radius-full);
    background: var(--st-surface-container);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
  }

  .jr-vis-note {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    line-height: 1.4;
    color: var(--st-on-surface-variant);
  }

  .jr-tiles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
  }
  .jr-tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 4 / 3;
    border-radius: var(--st-radius);
    background: var(--st-surface-container);
    color: var(--st-on-surface-variant);
  }
  .jr-tile-frame {
    position: absolute;
    inset: 24%;
    border: 2px solid var(--st-product-face);
    border-radius: 3px;
    opacity: 0;
    transform: scale(1.3);
    animation: jr-lock 3s ease-out infinite;
    animation-delay: calc(var(--i) * 0.2s);
  }
  @keyframes jr-lock {
    0% { opacity: 0; transform: scale(1.3); }
    20% { opacity: 1; transform: scale(1); }
    75% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1); }
  }

  .jr-gallery {
    position: relative;
    height: 120px;
  }
  .jr-gallery-card {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 132px;
    height: 100px;
    border-radius: var(--st-radius-md);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
    color: var(--st-sponsor);
  }
  .jr-gallery-card-1 { transform: translate(0, 8px); z-index: 3; }
  .jr-gallery-card-2 { transform: translate(10px, 2px) rotate(4deg); z-index: 2; opacity: 0.7; }
  .jr-gallery-card-3 { transform: translate(20px, -4px) rotate(8deg); z-index: 1; opacity: 0.4; }

  .jr-otp {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    color: var(--st-sponsor);
  }

  /* ── Desktop: the sticky pattern turns on here ── */
  @media (min-width: 900px) {
    .jr-grid {
      grid-template-columns: 1fr minmax(300px, 380px);
      gap: var(--st-space-lg);
      align-items: start;
    }
    .jr-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 78vh;
      padding: var(--st-space-lg) 0;
      opacity: 0.42;
      transition: opacity 0.45s ease;
    }
    .jr-block-active {
      opacity: 1;
    }
    .jr-inline-visual {
      display: none;
    }
    .jr-sticky {
      display: block;
      position: sticky;
      top: 120px;
    }
  }

  /* Reduced motion keeps the colour and state changes, which carry meaning,
     and drops the travel. The sticky pin also goes, so nothing depends on
     scroll position to become readable. */
  @media (prefers-reduced-motion: reduce) {
    .jr-scanline,
    .jr-tile-frame {
      animation: none;
    }
    .jr-tile-frame {
      opacity: 1;
      transform: none;
    }
    .jr-block {
      min-height: 0;
      opacity: 1;
    }
    .jr-sticky {
      display: none;
    }
    .jr-inline-visual {
      display: block;
    }
  }
`;
