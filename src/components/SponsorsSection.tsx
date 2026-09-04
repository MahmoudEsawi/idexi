"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* Master spec section 7.

   Concept: the heading says "a new stage", so the section is built as one.
   A single plinth holds one object at a time, and choosing a touchpoint
   beneath it swaps what is standing there. A ticket, an email, a gallery.
   Each is drawn as the real thing rather than as a wireframe of it, because
   the question a sponsor is asking is literally "where does my logo go" and
   a grey placeholder bar does not answer it.

   The spec defines "sponsor cover" as one reusable design holding several
   partner logos, applied identically across all three touchpoints. That is
   why SponsorCover is a single component reused verbatim at three scales,
   not three drawings: the whole claim is that it is the same asset every
   time. It is mounted inside all three objects and never unmounts, so as
   the object changes around it the cover holds its place.

   Motion: the three layers stay mounted and framer-motion springs their
   opacity and depth. AnimatePresence would unmount the gallery, and with it
   the photograph, which then has to load again the next time you land on
   it. Keeping the layer alive means the image is fetched once when the
   section renders and every later pass is instant.

   Colour: every value resolves to an --st-* token, and the section stands
   on the same --st-background as the sections around it. The sponsor scale
   (--st-sponsor and its container pair) is spent in exactly one place, the
   cover itself, because the cover is the thing the sponsor owns; tinting the
   whole section would spend it on the furniture instead. Shades are produced
   with color-mix over tokens rather than fresh values, so both themes come
   for free. No literal colour appears in this file.

   Copy is verbatim from the spec. Only the delivery changed. */

type StageKey = "ticket" | "email" | "photo";

const POINTS: { key: StageKey; label: string; sublabel: string; caption: string }[] = [
  {
    key: "ticket",
    label: "On the ticket",
    sublabel: "sponsor cover",
    caption: "Seen the moment the ticket lands in their inbox",
  },
  {
    key: "email",
    label: "On the email cover",
    sublabel: "seen before opening",
    caption: "Seen before the guest even opens the email",
  },
  {
    key: "photo",
    label: "On every photo",
    sublabel: "subtle watermark",
    caption: "Seen across every photo in the gallery, without covering a face",
  },
];

/* The spec asks for the same pattern as section 6, so this matches the
   lifecycle stepper's cadence rather than the spec's own ~1.6s, which is
   under the time it takes to read a caption. */
const ADVANCE_MS = 5500;
const COUNTER_MS = 1800;
const COUNTER_TARGET = 3000;

/* One guest carried across all three objects, so the ticket, the email and
   the gallery are plainly the same person's. Same record the how-it-works
   walkthrough uses. */
const GUEST = { name: "Layla Haddad", first: "Layla", code: "IDX-2K7-4413" };

/* Fixed rather than generated: the ticket has to be the same ticket on the
   server and on the client, and nothing may shift during hydration. */
const QR_ROWS = [
  "11101010111",
  "10100110101",
  "11101101111",
  "00010110100",
  "10110010011",
  "01001101100",
  "11010011010",
  "00101100101",
  "11100101101",
  "10101011010",
  "11100110011",
];
const QR_CELLS = QR_ROWS.join("").split("");

/* The recurring asset: four partner marks on one plate, at three scales.
   Built from the sponsor container pair, so it stays legible on ticket
   stock, on an email cover, and over a photograph, in both themes, from one
   definition. */
function SponsorCover({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <span className={"sp-cover sp-cover-" + size}>
      <span className="sp-cover-ring" aria-hidden="true" />
      <span className="sp-cover-mark sp-cover-a" />
      <span className="sp-cover-mark sp-cover-b" />
      <span className="sp-cover-mark sp-cover-c" />
      <span className="sp-cover-mark sp-cover-d" />
    </span>
  );
}

function QrBlock() {
  return (
    <span className="sp-qr" aria-hidden="true">
      {QR_CELLS.map((cell, i) => (
        <span key={i} data-on={cell === "1" ? "1" : undefined} />
      ))}
    </span>
  );
}

function Counter({ value, active }: { value: number; active: boolean }) {
  const reduced = useReducedMotion();
  const [counted, setCounted] = React.useState(0);

  React.useEffect(() => {
    if (!active || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / COUNTER_MS, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCounted(Math.round(eased * value));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, active, reduced]);

  const shown = reduced ? value : counted;
  return <>{shown.toLocaleString("en-US")}</>;
}

export default function SponsorsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [held, setHeld] = React.useState(false);
  const reduced = Boolean(useReducedMotion());

  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // One timeout per transition, never a repeating interval driving setState.
  React.useEffect(() => {
    if (!inView || reduced || held) return;
    const id = window.setTimeout(
      () => setActive((prev) => (prev + 1) % POINTS.length),
      ADVANCE_MS
    );
    return () => window.clearTimeout(id);
  }, [inView, reduced, held, active]);

  const activeKey = POINTS[active].key;

  /* One spring per layer. Opacity crossfades on a tween so two objects are
     never both half-solid; position and scale settle on a spring so the new
     object arrives rather than snapping. */
  const layer = (key: StageKey) => {
    const on = key === activeKey;
    return {
      className: "sp-object",
      "data-object": key,
      animate: reduced
        ? { opacity: on ? 1 : 0, scale: 1, y: 0 }
        : { opacity: on ? 1 : 0, scale: on ? 1 : 0.96, y: on ? 0 : 14 },
      transition: reduced
        ? { duration: 0 }
        : {
            default: { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 },
            opacity: { duration: 0.34, ease: [0.16, 1, 0.3, 1] as const },
          },
      style: { zIndex: on ? 2 : 1, pointerEvents: "none" as const },
      "aria-hidden": !on,
    };
  };

  return (
    <section className="sp-section" id="sponsors" ref={sectionRef}>
      <style>{sponsorsCSS}</style>

      <div className="sp-inner">
        <header className="sp-header">
          <h2 className="sp-heading">A new stage for your sponsors</h2>
          <p className="sp-sub">
            Every ticket, every email, and every photo becomes a space your sponsors
            actually get seen in.
          </p>
        </header>

        {/* The stage. All three objects stay mounted and stacked; only opacity
            and depth change, so the sponsor cover inside never remounts as the
            object around it is replaced. */}
        <div className="sp-stage">
          <div className="sp-plinth">
            <motion.div {...layer("ticket")}>
              <article className="sp-ticket">
                {/* The sponsor zone: the top band of the ticket, tinted just
                    enough to read as reserved space. */}
                <div className="sp-ticket-sponsor">
                  <span className="sp-kicker">Presented by</span>
                  <SponsorCover />
                </div>

                <div className="sp-ticket-main">
                  <p className="sp-ticket-name">{GUEST.name}</p>
                  <p className="sp-ticket-tier">General admission</p>
                  <dl className="sp-ticket-meta">
                    <div>
                      <dt>Doors</dt>
                      <dd>7:00 PM</dd>
                    </div>
                    <div>
                      <dt>Entrance</dt>
                      <dd>Main hall</dd>
                    </div>
                  </dl>
                </div>

                <div className="sp-ticket-perf" aria-hidden="true">
                  <span className="sp-notch sp-notch-l" />
                  <span className="sp-notch sp-notch-r" />
                </div>

                <div className="sp-ticket-foot">
                  <QrBlock />
                  <div className="sp-ticket-code">
                    <span className="sp-ticket-code-value">{GUEST.code}</span>
                    <span className="sp-ticket-code-note">Scan at the door</span>
                  </div>
                </div>
              </article>
            </motion.div>

            <motion.div {...layer("email")}>
              <article className="sp-mail">
                <header className="sp-mail-bar">
                  <span className="sp-mail-avatar" aria-hidden="true">
                    ix
                  </span>
                  <span className="sp-mail-from">
                    <span className="sp-mail-sender">idexi Events</span>
                    <span className="sp-mail-to">to {GUEST.first}</span>
                  </span>
                  <span className="sp-mail-time">7:04 PM</span>
                </header>

                {/* The cover slot, which in a mail client is the first thing
                    rendered under the header and the first thing the guest
                    sees. Nothing else in the message competes with it. */}
                <div className="sp-mail-cover">
                  <SponsorCover size="lg" />
                </div>

                <div className="sp-mail-body">
                  <p className="sp-mail-subject">Your ticket is ready</p>
                  <p className="sp-mail-preview">
                    Show the QR at the door. Your photos arrive the same night.
                  </p>
                  <span className="sp-mail-cta">View ticket</span>
                </div>
              </article>
            </motion.div>

            <motion.div {...layer("photo")}>
              <article className="sp-gallery">
                <div className="sp-gallery-frame">
                  <Image
                    src="/face-gala-wedding.jpg"
                    alt=""
                    fill
                    sizes="420px"
                    quality={68}
                    className="sp-gallery-img"
                  />
                  <span className="sp-gallery-mark">
                    <SponsorCover size="sm" />
                  </span>
                </div>
                <footer className="sp-gallery-foot">
                  <span className="sp-gallery-owner">{GUEST.first}&rsquo;s gallery</span>
                  <span className="sp-gallery-count">248 photos</span>
                </footer>
              </article>
            </motion.div>
          </div>

          <span className="sp-shadow" aria-hidden="true" />
          <span className="sp-floor" aria-hidden="true" />
        </div>

        {/* Touchpoints: understated triggers beneath the stage, not cards. */}
        <div
          className="sp-points"
          onMouseLeave={() => setHeld(false)}
          onBlur={() => setHeld(false)}
        >
          {POINTS.map((point, i) => (
            <button
              key={point.key}
              type="button"
              aria-pressed={i === active}
              className={i === active ? "sp-point sp-point-active" : "sp-point"}
              onMouseEnter={() => {
                setActive(i);
                setHeld(true);
              }}
              onFocus={() => {
                setActive(i);
                setHeld(true);
              }}
              onClick={() => {
                setActive(i);
                setHeld(true);
              }}
            >
              <span className="sp-point-mark" aria-hidden="true" />
              <span className="sp-point-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="sp-point-label">{point.label}</span>
              <span className="sp-point-sub">{point.sublabel}</span>
              <span className="sp-point-caption">{point.caption}</span>
            </button>
          ))}
        </div>

        <div className="sp-metric">
          <p className="sp-metric-title">One click. Every guest.</p>
          <p className="sp-metric-value">
            <Counter value={COUNTER_TARGET} active={inView} />
          </p>
          <p className="sp-metric-stat">guests, reached instantly</p>
          <p className="sp-metric-body">
            One click sends every ticket and every photo. The same process works at any
            scale, from 150 guests to 3,000.
          </p>
        </div>
      </div>
    </section>
  );
}

/* No backticks below: the whole block is a template literal. */
const sponsorsCSS = `
  .sp-section {
    --sp-shade: var(--st-on-background);
    --sp-object-surface: var(--st-surface-container-lowest);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    padding: var(--st-space-xl) var(--st-space-margin-desktop);
    background: var(--st-background);
    transition: background 0.4s ease;
  }

  :root[data-theme='dark'] .sp-section {
    --sp-shade: var(--st-surface-dim);
    /* Lighter than the dark ground, so the object still catches the light
       instead of reading as a hole cut in the page. */
    --sp-object-surface: var(--st-surface-container-high);
  }

  .sp-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--st-space-lg);
    text-align: center;
  }

  .sp-header { max-width: 58ch; }
  .sp-heading {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.9rem, 3.5vw + 0.75rem, 3rem);
    line-height: 1.12;
    letter-spacing: -0.015em;
    color: var(--st-on-background);
    text-wrap: balance;
  }
  .sp-sub {
    margin-top: var(--st-space-sm);
    font-family: var(--st-font-serif);
    font-size: clamp(1.05rem, 1vw + 0.85rem, 1.25rem);
    line-height: 1.55;
    color: var(--st-on-surface-variant);
  }

  /* ── The stage ── */
  .sp-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 0 var(--st-space-md);
  }

  /* The floor. Three objects of different heights standing on one line
     reads as a stage; three cards floating in space reads as a slideshow.
     It fades at both ends so it never becomes a divider. */
  .sp-floor {
    position: absolute;
    bottom: var(--st-space-md);
    left: 50%;
    width: min(660px, 92%);
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(
      to right,
      transparent,
      var(--st-outline) 22%,
      var(--st-outline) 78%,
      transparent
    );
    pointer-events: none;
  }

  .sp-plinth {
    position: relative;
    display: grid;
    width: min(420px, 88%);
  }

  /* Bottom-aligned: each object rests on the floor rather than hovering at
     a shared centre line, so swapping one for another looks like setting a
     different thing down in the same place. All three share one grid cell,
     which is what stacks them. */
  .sp-object {
    grid-area: 1 / 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .sp-object > * { width: 100%; }

  /* The photograph is the one object with no fixed height of its own, so it
     stretches to whatever the tallest object sets and crops to fit. That is
     what keeps the three level at any width, rather than an aspect ratio
     that only balances at one. */
  .sp-object[data-object='photo'] { align-items: stretch; }

  /* The contact shadow, sitting on the floor line where the object meets it. */
  .sp-shadow {
    position: absolute;
    bottom: calc(var(--st-space-md) - 9px);
    left: 50%;
    width: min(340px, 74%);
    height: 20px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      color-mix(in srgb, var(--sp-shade) 34%, transparent) 0%,
      transparent 74%
    );
    filter: blur(9px);
    pointer-events: none;
  }

  /* ── Sponsor cover ── */
  .sp-cover {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 7px 11px;
    border-radius: var(--st-radius-sm);
    background: var(--st-sponsor-container);
  }
  .sp-cover-mark {
    display: block;
    height: 7px;
    border-radius: 2px;
    background: var(--st-on-sponsor-container);
  }
  .sp-cover-a { width: 18px; }
  .sp-cover-b { width: 9px; height: 9px; border-radius: 50%; }
  .sp-cover-c { width: 22px; }
  .sp-cover-d { width: 9px; }

  /* The focus ring. This is where the sponsor lands on every surface, so it
     is marked rather than described. */
  .sp-cover-ring {
    position: absolute;
    inset: -6px;
    border-radius: var(--st-radius);
    border: 1px solid color-mix(in srgb, var(--st-sponsor) 55%, transparent);
    opacity: 0;
    animation: sp-focus 5.5s ease-out infinite;
  }
  @keyframes sp-focus {
    0% { opacity: 0; transform: scale(1.12); }
    12% { opacity: 1; transform: scale(1); }
    68% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1); }
  }

  .sp-cover-lg {
    gap: 7px;
    padding: 10px 15px;
    border-radius: var(--st-radius);
  }
  .sp-cover-lg .sp-cover-mark { height: 10px; border-radius: 3px; }
  .sp-cover-lg .sp-cover-a { width: 25px; }
  .sp-cover-lg .sp-cover-b { width: 12px; height: 12px; }
  .sp-cover-lg .sp-cover-c { width: 30px; }
  .sp-cover-lg .sp-cover-d { width: 12px; }
  .sp-cover-lg .sp-cover-ring { inset: -8px; border-radius: var(--st-radius-md); }

  .sp-cover-sm {
    gap: 3px;
    padding: 4px 7px;
    background: color-mix(in srgb, var(--st-sponsor-container) 76%, transparent);
    border: 1px solid color-mix(in srgb, var(--st-on-sponsor-container) 18%, transparent);
    backdrop-filter: blur(5px);
  }
  .sp-cover-sm .sp-cover-mark { height: 4px; }
  .sp-cover-sm .sp-cover-a { width: 11px; }
  .sp-cover-sm .sp-cover-b { width: 5px; height: 5px; }
  .sp-cover-sm .sp-cover-c { width: 13px; }
  .sp-cover-sm .sp-cover-d { width: 5px; }
  .sp-cover-sm .sp-cover-ring { inset: -4px; }

  /* Shared object chrome. */
  .sp-ticket,
  .sp-mail,
  .sp-gallery {
    width: 100%;
    border-radius: var(--st-radius-lg);
    background: var(--sp-object-surface);
    border: 1px solid var(--st-outline-variant);
    box-shadow: 0 22px 44px -26px color-mix(in srgb, var(--sp-shade) 55%, transparent);
    text-align: left;
  }

  .sp-kicker {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }

  /* ── The ticket ── */
  .sp-ticket-sponsor {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    padding: 1.05rem 1rem 1.45rem;
    border-top-left-radius: var(--st-radius-lg);
    border-top-right-radius: var(--st-radius-lg);
    background: color-mix(in srgb, var(--st-sponsor) 9%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--st-sponsor) 22%, transparent);
  }

  .sp-ticket-main {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 1.15rem 1.35rem 1.6rem;
  }
  .sp-ticket-name {
    font-family: var(--st-font-serif);
    font-size: 1.4rem;
    line-height: 1.2;
    color: var(--st-on-surface);
  }
  .sp-ticket-tier {
    font-size: 0.8rem;
    color: var(--st-on-surface-variant);
  }
  .sp-ticket-meta {
    display: flex;
    gap: 2.25rem;
    margin-top: 0.85rem;
  }
  .sp-ticket-meta dt {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .sp-ticket-meta dd {
    margin-top: 0.15rem;
    font-size: 0.88rem;
    color: var(--st-on-surface);
    font-variant-numeric: tabular-nums;
  }

  /* The tear line, with the stock punched through at both ends. */
  .sp-ticket-perf {
    position: relative;
    height: 0;
    margin: 0 1.35rem;
    border-top: 1px dashed var(--st-outline-variant);
  }
  .sp-notch {
    position: absolute;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--st-background);
    border: 1px solid var(--st-outline-variant);
    transform: translateY(-50%);
  }
  .sp-notch-l { left: calc(-1.35rem - 10px); }
  .sp-notch-r { right: calc(-1.35rem - 10px); }

  .sp-ticket-foot {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.9rem;
    padding: 1.35rem 1.35rem 1.45rem;
  }

  .sp-qr {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-auto-rows: 1fr;
    gap: 1px;
    box-sizing: content-box;
    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: var(--st-radius-sm);
    background: var(--st-surface-container-lowest);
  }
  .sp-qr span { border-radius: 1px; }
  .sp-qr span[data-on] { background: var(--st-on-surface); }
  :root[data-theme='dark'] .sp-qr { background: var(--st-inverse-surface); }
  :root[data-theme='dark'] .sp-qr span[data-on] { background: var(--st-inverse-on-surface); }

  .sp-ticket-code {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .sp-ticket-code-value {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    color: var(--st-on-surface);
    font-variant-numeric: tabular-nums;
  }
  .sp-ticket-code-note {
    font-size: 0.75rem;
    color: var(--st-on-surface-variant);
  }

  /* ── The email ── */
  .sp-mail { overflow: hidden; }

  .sp-mail-bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .sp-mail-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.75rem;
  }
  :root[data-theme='dark'] .sp-mail-avatar {
    background: var(--st-surface-container-low);
  }
  .sp-mail-from {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex: 1 1 auto;
    min-width: 0;
  }
  .sp-mail-sender {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.86rem;
    color: var(--st-on-surface);
  }
  .sp-mail-to {
    font-size: 0.72rem;
    color: var(--st-on-surface-variant);
  }
  .sp-mail-time {
    font-size: 0.72rem;
    color: var(--st-on-surface-variant);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  .sp-mail-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.6rem 0.75rem;
    background: var(--st-surface-container-low);
    border-bottom: 1px solid var(--st-outline-variant);
  }

  .sp-mail-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 1.05rem 1.1rem 1.25rem;
  }
  .sp-mail-subject {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.02rem;
    color: var(--st-on-surface);
  }
  .sp-mail-preview {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }
  .sp-mail-cta {
    margin-top: 0.7rem;
    padding: 0.45rem 0.95rem;
    border-radius: var(--st-radius-full);
    background: var(--st-primary);
    color: var(--st-on-primary);
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
  }

  /* ── The gallery ── */
  .sp-gallery {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sp-gallery-frame {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    min-height: 220px;
  }
  .sp-gallery-img { object-fit: cover; }

  /* Bottom right, clear of every face, which is what the caption promises. */
  .sp-gallery-mark {
    position: absolute;
    right: 11px;
    bottom: 11px;
  }

  .sp-gallery-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-top: 1px solid var(--st-outline-variant);
  }
  .sp-gallery-owner {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.86rem;
    color: var(--st-on-surface);
  }
  .sp-gallery-count {
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
    font-variant-numeric: tabular-nums;
  }

  /* ── Touchpoints ── */
  .sp-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--st-space-md);
    width: 100%;
    padding-top: var(--st-space-md);
    border-top: 1px solid var(--st-outline-variant);
  }

  .sp-point {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.18rem;
    padding: 0.35rem 0 0;
    background: transparent;
    border: none;
    border-radius: 0;
    text-align: left;
    cursor: pointer;
    opacity: 0.44;
    overflow: visible;
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sp-point:hover { opacity: 0.72; }
  .sp-point-active,
  .sp-point-active:hover { opacity: 1; }
  .sp-point:focus-visible {
    opacity: 1;
    outline: 2px solid var(--st-sponsor);
    outline-offset: 4px;
    border-radius: 4px;
  }

  /* The only marker: a rule that fills across the active touchpoint. */
  .sp-point-mark {
    position: absolute;
    top: calc(var(--st-space-md) * -1 - 1px);
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: var(--st-sponsor);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sp-point-active .sp-point-mark { transform: scaleX(1); }

  .sp-point-index {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    color: var(--st-sponsor);
    font-variant-numeric: tabular-nums;
  }
  .sp-point-label {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.02rem;
    color: var(--st-on-background);
  }
  .sp-point-sub {
    font-size: 0.78rem;
    letter-spacing: 0.02em;
    color: var(--st-sponsor);
  }
  .sp-point-caption {
    margin-top: 0.3rem;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }

  /* ── Metric ── */
  .sp-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    width: 100%;
    padding-top: var(--st-space-md);
    border-top: 1px solid var(--st-outline-variant);
  }
  .sp-metric-title {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--st-on-background);
  }
  .sp-metric-value {
    font-family: var(--st-font-display);
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--st-on-background);
    font-variant-numeric: tabular-nums;
  }
  .sp-metric-stat {
    font-size: 1rem;
    color: var(--st-on-surface-variant);
  }
  .sp-metric-body {
    margin-top: 0.4rem;
    max-width: 48ch;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  @media (max-width: 767px) {
    .sp-section { padding: var(--st-space-lg) var(--st-space-margin-mobile); }
    .sp-inner { gap: var(--st-space-md); }
    .sp-points {
      grid-template-columns: 1fr;
      gap: 0;
      border-top: none;
    }
    .sp-point {
      padding: 0.9rem 0;
      border-top: 1px solid var(--st-outline-variant);
    }
    .sp-point-mark { top: -1px; }
  }

  /* Reduced motion: the object still changes, it just does not travel, and
     the focus ring rests visible instead of pulsing. */
  @media (prefers-reduced-motion: reduce) {
    .sp-point,
    .sp-point-mark {
      transition: none;
    }
    .sp-cover-ring {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;
