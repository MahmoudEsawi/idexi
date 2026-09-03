"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Ticket } from "lucide-react";

/* The idexi Pass hero object: a digital pass held in 3D space.

   The tilt is a port of Tilt by ibelick (motion-primitives) from 21st.dev,
   21st.dev/@ibelick/components/tilt, fetched through the 21st MCP. Its
   mechanic is kept exactly: pointer position is normalised to -0.5..0.5 over
   the element's own box, fed through springs, mapped to rotateX/rotateY by a
   rotation factor, and composed into one perspective() transform with
   useMotionTemplate. That primitive is already plain framer-motion, which is
   what this project uses, so it needed no dependency swap.

   Four things were added or changed for this build:

   1. Reduced motion disables the tilt outright and drops the listeners,
      rather than merely shortening it. Pointer-driven 3D is exactly the
      motion that setting is asking not to receive.
   2. The card floats. The original is static until you point at it; the
      outer wrapper here carries a slow idle rise and fall so the pass reads
      as suspended rather than pinned to the page.
   3. Depth. transform-style: preserve-3d on the card plus translateZ on each
      band means the badge, the name and the code sit at different heights,
      so the tilt parallaxes instead of rotating one flat plane.
   4. The sheen. motion-primitives pairs Tilt with a Spotlight that needs
      Tailwind gradient classes and a cn helper. Rewritten here as one
      pointer-tracked radial built with useMotionTemplate over --st-* values.

   Colour: the card is deliberately dark ink in both themes, which is what a
   real pass looks like and what keeps its white type legible. Light mode
   builds it from the primary container; dark mode from the high surface
   container. Nothing here resolves to a literal. */

const GUEST = {
  name: "Clara Henderson",
  org: "Apex Global",
  seat: "Suite 4",
  code: "IDX-VIP-8821",
};

/* Fixed rather than generated: the pass has to be the same pass on the
   server and on the client, and nothing may shift during hydration. */
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

const ROTATION = 11;
const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };

export default function TiltPass() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /* The idle float holds still while the card is being pointed at, so the
     drift is not competing with the tilt for the same pixels. */
  const [held, setHeld] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING);
  const ySpring = useSpring(y, SPRING);

  // isRevese in the original: the card leans toward the pointer, not away.
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [ROTATION, -ROTATION]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-ROTATION, ROTATION]);
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // The sheen rides the pointer across the face of the card.
  const sheenX = useTransform(xSpring, [-0.5, 0.5], ["18%", "82%"]);
  const sheenY = useTransform(ySpring, [-0.5, 0.5], ["18%", "82%"]);
  const sheen = useMotionTemplate`radial-gradient(38% 55% at ${sheenX} ${sheenY}, color-mix(in srgb, var(--hp-accent) 26%, transparent) 0%, transparent 72%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    setHeld(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hp-stage">
      <style>{tiltCSS}</style>

      <motion.div
        className="hp-float"
        animate={reduced || held ? { y: 0 } : { y: [0, -12, 0] }}
        transition={
          reduced
            ? { duration: 0 }
            : held
              ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.div
          ref={ref}
          className="hp-card"
          style={reduced ? undefined : { transform }}
          onMouseEnter={reduced ? undefined : () => setHeld(true)}
          onMouseMove={reduced ? undefined : onMove}
          onMouseLeave={reduced ? undefined : onLeave}
        >
          {!reduced && (
            <motion.span className="hp-sheen" style={{ background: sheen }} aria-hidden="true" />
          )}

          <div className="hp-band hp-top">
            <span className="hp-brand">
              <Ticket size={15} aria-hidden="true" />
              idexi Pass
            </span>
            <span className="hp-badge">ALL-ACCESS VIP</span>
          </div>

          <div className="hp-band hp-body">
            <span className="hp-label">Attendee</span>
            <span className="hp-name">{GUEST.name}</span>
            <span className="hp-org">
              {GUEST.org} &middot; {GUEST.seat}
            </span>
          </div>

          <div className="hp-perf" aria-hidden="true">
            <span className="hp-notch hp-notch-l" />
            <span className="hp-notch hp-notch-r" />
          </div>

          <div className="hp-band hp-foot">
            <span className="hp-qr" aria-hidden="true">
              {QR_CELLS.map((cell, i) => (
                <span key={i} data-on={cell === "1" ? "1" : undefined} />
              ))}
            </span>
            <span className="hp-meta">
              <span className="hp-code">{GUEST.code}</span>
              <span className="hp-note">Encrypted, one entry only</span>
            </span>
          </div>
        </motion.div>
      </motion.div>

      <span className="hp-shadow" aria-hidden="true" />
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const tiltCSS = `
  .hp-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2.5rem 0 3.5rem;
  }

  .hp-float {
    position: relative;
    z-index: 1;
    width: min(360px, 88%);
  }

  /* Ink in both themes. A pass that flipped to a light card in light mode
     would stop reading as a pass, and its white type would go with it. */
  .hp-card {
    --hp-accent: var(--st-product-pass-container);
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: var(--st-radius-xl);
    background: var(--st-primary-container);
    color: var(--st-on-primary);
    transform-style: preserve-3d;
    will-change: transform;
    box-shadow:
      0 2px 4px color-mix(in srgb, var(--st-on-background) 12%, transparent),
      0 30px 60px -28px color-mix(in srgb, var(--st-on-background) 62%, transparent);
  }
  :root[data-theme='dark'] .hp-card {
    --hp-accent: var(--st-product-pass);
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    box-shadow:
      0 2px 4px var(--st-surface-dim),
      0 30px 60px -28px var(--st-surface-dim);
  }

  .hp-sheen {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 3;
  }

  /* Depth. Each band sits at its own height, so the tilt parallaxes the
     contents instead of rotating one flat plane. */
  .hp-band {
    position: relative;
    z-index: 2;
    transform: translateZ(22px);
  }
  .hp-body { transform: translateZ(38px); }
  .hp-foot { transform: translateZ(30px); }

  .hp-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1.1rem 1.25rem;
    border-bottom: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  }
  .hp-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.86rem;
    letter-spacing: 0.01em;
  }
  .hp-brand svg { color: var(--hp-accent); }

  .hp-badge {
    padding: 0.24rem 0.6rem;
    border-radius: var(--st-radius-full);
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .hp-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1.35rem 1.25rem 1.5rem;
  }
  .hp-label {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--hp-accent);
  }
  .hp-name {
    font-family: var(--st-font-serif);
    font-size: 1.65rem;
    line-height: 1.15;
  }
  /* Mixed from the card's own foreground, so it stays correct in either
     theme without a second declaration. */
  .hp-org {
    font-size: 0.8rem;
    color: color-mix(in srgb, currentColor 66%, transparent);
  }

  .hp-perf {
    position: relative;
    z-index: 2;
    height: 0;
    margin: 0 1.25rem;
    border-top: 1px dashed color-mix(in srgb, currentColor 28%, transparent);
    transform: translateZ(18px);
  }
  .hp-notch {
    position: absolute;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--st-background);
    transform: translateY(-50%);
  }
  .hp-notch-l { left: calc(-1.25rem - 9px); }
  .hp-notch-r { right: calc(-1.25rem - 9px); }

  .hp-foot {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1.35rem 1.25rem 1.4rem;
  }
  .hp-meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }
  .hp-code {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }
  .hp-note {
    font-size: 0.72rem;
    color: color-mix(in srgb, currentColor 66%, transparent);
  }

  /* A code is dark on light or a scanner cannot read it, so the plate stays
     light in both themes rather than inverting with the card. */
  .hp-qr {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-auto-rows: 1fr;
    gap: 1px;
    box-sizing: content-box;
    flex-shrink: 0;
    width: 62px;
    height: 62px;
    padding: 6px;
    border-radius: var(--st-radius-sm);
    background: var(--st-surface-container-lowest);
  }
  .hp-qr span { border-radius: 1px; }
  .hp-qr span[data-on] { background: var(--st-on-surface); }
  :root[data-theme='dark'] .hp-qr { background: var(--st-inverse-surface); }
  :root[data-theme='dark'] .hp-qr span[data-on] { background: var(--st-inverse-on-surface); }

  /* The ground the card floats above. */
  .hp-shadow {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    width: min(280px, 68%);
    height: 26px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      color-mix(in srgb, var(--st-on-background) 26%, transparent) 0%,
      transparent 74%
    );
    filter: blur(14px);
    pointer-events: none;
  }
  :root[data-theme='dark'] .hp-shadow {
    background: radial-gradient(
      50% 50% at 50% 50%,
      var(--st-surface-dim) 0%,
      transparent 74%
    );
  }

  @media (prefers-reduced-motion: reduce) {
    .hp-card { transform: none; }
  }
`;
