"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lock, Mail, ScanFace, ScanLine, Sparkles } from "lucide-react";

/* The connected journey, told as one record rather than four illustrations.

   Motion thesis: the page's own intro claims "one guest record moves through
   four stages, nothing is re-entered between them". So the sticky panel holds
   a single record that never unmounts. Its header (avatar, name, code) is the
   same DOM node in all four stages; only the status, the accent colour, and
   the body beneath it change. The continuity is the argument. Four separate
   visuals fading in and out would have illustrated the copy; this proves it.

   Stage text follows docs/specs/idexi-MASTER-SPEC.md section 6, matching the home page
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


/* Real portraits rather than grey placeholders: the matching and gallery
   stages are about photographs of people, and abstract boxes could not carry
   that. Drawn from the project own library. */
const FACE_TILES = [
  "/editorial-orange-jacket.jpg",
  "/face-gala-wedding.jpg",
  "/editorial-red-coat.jpg",
  "/face-corporate-summit.jpg",
  "/editorial-knit-hood.jpg",
  "/face-music-festival.jpg",
];

/* Deterministic, not random: the pass must render identically every time,
   the same convention the home page widgets use. */
const QR_CELLS = Array.from({ length: 49 }, (_, i) => (i * 7 + (i % 5)) % 3 === 0);

function QrBlock({ scanning = false }: { scanning?: boolean }) {
  return (
    <span className={scanning ? "jr-qr jr-qr-live" : "jr-qr"} aria-hidden="true">
      <span className="jr-qr-grid">
        {QR_CELLS.map((on, i) => (
          <span key={i} data-on={on ? "1" : undefined} />
        ))}
      </span>
      {scanning ? (
        <>
          <span className="jr-laser" />
          <span className="jr-bracket jr-bracket-tl" />
          <span className="jr-bracket jr-bracket-tr" />
          <span className="jr-bracket jr-bracket-bl" />
          <span className="jr-bracket jr-bracket-br" />
        </>
      ) : null}
    </span>
  );
}

/* Every stage renders the same chrome: a title bar, a body, a footer note.
   Only the body changes, which is what makes four scenes read as one
   interface reshaping rather than four illustrations swapping out. */
function Screen({
  stage,
  icon,
  label,
  note,
  children,
}: {
  stage: Stage;
  icon: React.ReactNode;
  label: string;
  note: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="jr-screen" data-stage={stage.color}>
      <div className="jr-screen-bar">
        <span className="jr-screen-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="jr-screen-label">{label}</span>
        <span className="jr-screen-live" aria-hidden="true" />
      </div>
      <div className="jr-screen-body">{children}</div>
      <p className="jr-screen-foot">{note}</p>
    </div>
  );
}

function StageVisual({ stage }: { stage: Stage }) {
  switch (stage.color) {
    case "pass":
      return (
        <Screen
          stage={stage}
          icon={<Mail size={13} strokeWidth={2} />}
          label="Inbox"
          note={
            <>
              <Sparkles size={12} aria-hidden="true" /> Encrypted, single use, branded on
              arrival
            </>
          }
        >
          <div className="jr-mailrow" aria-hidden="true">
            <span className="jr-mailrow-dot" />
            <span className="jr-mailrow-text">
              <strong>idexi</strong> Your ticket for TEDx PHU
            </span>
            <span className="jr-mailrow-time">now</span>
          </div>

          <div className="jr-ticket" aria-hidden="true">
            <span className="jr-ticket-shine" />
            <div className="jr-ticket-top">
              <span className="jr-ticket-brand">idexi Pass</span>
              <span className="jr-ticket-tier">GENERAL</span>
            </div>
            <p className="jr-ticket-name">Layla Haddad</p>
            <div className="jr-perf">
              <span className="jr-perf-notch jr-perf-notch-l" />
              <span className="jr-perf-line" />
              <span className="jr-perf-notch jr-perf-notch-r" />
            </div>
            <div className="jr-ticket-foot">
              <QrBlock />
              <span className="jr-ticket-meta">
                <span className="jr-ticket-code">IDX-2K7-4413</span>
                <span className="jr-ticket-sub">Admit one</span>
              </span>
            </div>
          </div>
        </Screen>
      );

    case "flow":
      return (
        <Screen
          stage={stage}
          icon={<ScanLine size={13} strokeWidth={2} />}
          label="Main gate"
          note={
            <>
              <Check size={12} aria-hidden="true" /> Verified in 0.4s, one entry only
            </>
          }
        >
          <div className="jr-scanstage" aria-hidden="true">
            <QrBlock scanning />
          </div>
          <div className="jr-status" aria-hidden="true">
            <span className="jr-status-pill">
              <Check size={12} strokeWidth={3} />
              Checked in
            </span>
            <span className="jr-status-time">18:04</span>
          </div>
        </Screen>
      );

    case "face":
      return (
        <Screen
          stage={stage}
          icon={<ScanFace size={13} strokeWidth={2} />}
          label="AI matching"
          note={
            <>
              <Check size={12} aria-hidden="true" /> Same guest found across 14 photos
            </>
          }
        >
          <div className="jr-detect" aria-hidden="true">
            {FACE_TILES.map((src, i) => (
              <span key={src} className="jr-detect-tile" style={{ "--i": i } as React.CSSProperties}>
                <Image src={src} alt="" fill sizes="120px" quality={55} className="jr-detect-img" />
                <span className="jr-detect-box" />
              </span>
            ))}
          </div>
          <div className="jr-meter" aria-hidden="true">
            <span className="jr-meter-track">
              <span className="jr-meter-fill" />
            </span>
            <span className="jr-meter-count">14 / 14</span>
          </div>
        </Screen>
      );

    default:
      return (
        <Screen
          stage={stage}
          icon={<Lock size={13} strokeWidth={2} />}
          label="Private gallery"
          note={
            <>
              <Mail size={12} aria-hidden="true" /> Sent to layla@example.com
            </>
          }
        >
          <div className="jr-vault" aria-hidden="true">
            <div className="jr-vault-grid">
              {FACE_TILES.map((src) => (
                <span key={src} className="jr-vault-tile">
                  <Image src={src} alt="" fill sizes="120px" quality={55} className="jr-vault-img" />
                </span>
              ))}
            </div>
            <div className="jr-gate">
              <div className="jr-gate-card">
                <span className="jr-gate-lock">
                  <Lock size={14} strokeWidth={2.2} />
                </span>
                <span className="jr-otp">
                {["4", "4", "1", "3"].map((d, i) => (
                  <span key={i} className="jr-otp-cell" style={{ "--i": i } as React.CSSProperties}>
                    {d}
                  </span>
                  ))}
                </span>
                <span className="jr-gate-label">Her code only</span>
              </div>
            </div>
          </div>
        </Screen>
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

  /* ── Stage visuals ─────────────────────────────────────────────────────
     All four share the Screen chrome: title bar, body, footer note. Only the
     body changes, which is what makes four scenes read as one interface
     reshaping rather than four illustrations swapping out. Colour comes from
     the stage token, so the whole screen retints as the panel accent moves
     from blue to teal to coral to purple. */
  .jr-screen {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: var(--st-radius-lg);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    overflow: hidden;
  }

  .jr-screen-bar {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container);
  }
  .jr-screen-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--st-radius-sm);
  }
  .jr-screen[data-stage="pass"] .jr-screen-icon {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .jr-screen[data-stage="flow"] .jr-screen-icon {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .jr-screen[data-stage="face"] .jr-screen-icon {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }
  .jr-screen[data-stage="sponsor"] .jr-screen-icon {
    background: var(--st-sponsor-container);
    color: var(--st-on-sponsor-container);
  }
  .jr-screen-label {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.74rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .jr-screen-live {
    width: 6px;
    height: 6px;
    margin-left: auto;
    border-radius: 50%;
    animation: jr-pulse 2s ease-in-out infinite;
  }
  .jr-screen[data-stage="pass"] .jr-screen-live { background: var(--st-product-pass); }
  .jr-screen[data-stage="flow"] .jr-screen-live { background: var(--st-product-flow); }
  .jr-screen[data-stage="face"] .jr-screen-live { background: var(--st-product-face); }
  .jr-screen[data-stage="sponsor"] .jr-screen-live { background: var(--st-sponsor); }
  @keyframes jr-pulse {
    0%, 100% { opacity: 0.35; transform: scale(0.85); }
    50% { opacity: 1; transform: scale(1); }
  }

  .jr-screen-body {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    padding: 0.75rem;
  }

  .jr-screen-foot {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 0.75rem;
    border-top: 1px solid var(--st-outline-variant);
    font-size: 0.76rem;
    line-height: 1.4;
    color: var(--st-on-surface-variant);
  }

  /* ── The code block, shared by stages 1 and 2 ── */
  .jr-qr {
    position: relative;
    display: block;
    flex-shrink: 0;
    padding: 6px;
    border-radius: var(--st-radius-sm);
    background: #ffffff;
  }
  .jr-qr-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1.5px;
    width: 62px;
  }
  .jr-qr-grid span {
    aspect-ratio: 1;
    border-radius: 0.5px;
    background: transparent;
  }
  .jr-qr-grid span[data-on] { background: #0b1c30; }

  .jr-qr-live { padding: 10px; }
  .jr-qr-live .jr-qr-grid { width: 92px; }

  .jr-laser {
    position: absolute;
    left: 4px;
    right: 4px;
    height: 2px;
    border-radius: 2px;
    background: var(--st-product-flow);
    box-shadow: 0 0 12px 2px var(--st-product-flow);
    animation: jr-sweep 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  @keyframes jr-sweep {
    0%, 100% { top: 6%; opacity: 0; }
    12%, 88% { opacity: 1; }
    50% { top: 90%; }
  }

  .jr-bracket {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--st-product-flow);
    animation: jr-lock-in 2.2s ease-out infinite;
  }
  .jr-bracket-tl { top: 3px; left: 3px; border-right: 0; border-bottom: 0; border-top-left-radius: 3px; }
  .jr-bracket-tr { top: 3px; right: 3px; border-left: 0; border-bottom: 0; border-top-right-radius: 3px; }
  .jr-bracket-bl { bottom: 3px; left: 3px; border-right: 0; border-top: 0; border-bottom-left-radius: 3px; }
  .jr-bracket-br { bottom: 3px; right: 3px; border-left: 0; border-top: 0; border-bottom-right-radius: 3px; }
  @keyframes jr-lock-in {
    0% { opacity: 0; transform: scale(1.4); }
    18%, 100% { opacity: 1; transform: scale(1); }
  }

  /* ── Stage 1: the pass arriving ── */
  .jr-mailrow {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.5rem;
    border-radius: var(--st-radius-sm);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    font-size: 0.72rem;
    color: var(--st-on-surface-variant);
  }
  .jr-mailrow-dot {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--st-product-pass);
  }
  .jr-mailrow-text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .jr-mailrow-text strong {
    color: var(--st-on-surface);
    font-weight: 700;
    margin-right: 0.3rem;
  }
  .jr-mailrow-time { flex-shrink: 0; opacity: 0.7; }

  .jr-ticket {
    position: relative;
    overflow: hidden;
    padding: 0.7rem 0.75rem 0.75rem;
    border-radius: var(--st-radius);
    background: linear-gradient(158deg, #14294a 0%, #0b1c30 62%);
    color: #ffffff;
    animation: jr-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes jr-rise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: none; }
  }
  .jr-ticket-shine {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 42%;
    background: linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 100%);
    animation: jr-shine 4.5s ease-in-out infinite;
  }
  @keyframes jr-shine {
    0%, 62% { left: -50%; }
    88%, 100% { left: 115%; }
  }
  .jr-ticket-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .jr-ticket-brand {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.74rem;
    letter-spacing: 0.02em;
    color: #9ec2ff;
  }
  .jr-ticket-tier {
    padding: 0.1rem 0.4rem;
    border-radius: var(--st-radius-full);
    background: rgba(255, 255, 255, 0.14);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }
  .jr-ticket-name {
    margin-top: 0.35rem;
    font-family: var(--st-font-serif);
    font-size: 1.1rem;
    line-height: 1.2;
  }
  .jr-perf {
    display: flex;
    align-items: center;
    margin: 0.6rem -0.75rem;
  }
  .jr-perf-line {
    flex: 1;
    height: 1px;
    background: repeating-linear-gradient(to right, rgba(255,255,255,0.34) 0 4px, transparent 4px 8px);
  }
  .jr-perf-notch {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--st-surface-container-low);
    flex-shrink: 0;
  }
  .jr-perf-notch-l { margin-left: -6px; }
  .jr-perf-notch-r { margin-right: -6px; }
  .jr-ticket-foot {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }
  .jr-ticket-meta {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }
  .jr-ticket-code {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
  .jr-ticket-sub {
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.6);
  }

  /* ── Stage 2: the same code under a scanner ── */
  .jr-scanstage {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 0;
    border-radius: var(--st-radius);
    background: linear-gradient(180deg, #0b1c30 0%, #0f2a3d 100%);
  }
  .jr-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.45rem 0.6rem;
    border-radius: var(--st-radius-sm);
    background: var(--st-product-flow-container);
    animation: jr-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
  }
  .jr-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-on-product-flow-container);
  }
  .jr-status-time {
    font-size: 0.76rem;
    font-variant-numeric: tabular-nums;
    color: var(--st-on-product-flow-container);
    opacity: 0.75;
  }

  /* ── Stage 3: detection across real photographs ── */
  .jr-detect {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.35rem;
  }
  .jr-detect-tile {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--st-radius-sm);
    overflow: hidden;
    background: var(--st-surface-container);
  }
  .jr-detect-img { object-fit: cover; }
  .jr-detect-box {
    position: absolute;
    inset: 22% 26%;
    border: 1.5px solid var(--st-product-face);
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transform: scale(1.5);
    animation: jr-detect-lock 3.4s ease-out infinite;
    animation-delay: calc(var(--i) * 0.19s);
  }
  @keyframes jr-detect-lock {
    0% { opacity: 0; transform: scale(1.5); }
    14% { opacity: 1; transform: scale(1); }
    78% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1); }
  }
  .jr-meter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .jr-meter-track {
    flex: 1;
    height: 3px;
    border-radius: 3px;
    background: var(--st-outline-variant);
    overflow: hidden;
  }
  .jr-meter-fill {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--st-product-face);
    transform-origin: left;
    animation: jr-fill 3.4s ease-out infinite;
  }
  @keyframes jr-fill {
    0% { transform: scaleX(0); }
    72%, 100% { transform: scaleX(1); }
  }
  .jr-meter-count {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.74rem;
    font-variant-numeric: tabular-nums;
    color: var(--st-product-face);
  }

  /* ── Stage 4: the gallery, held behind her own code ── */
  .jr-vault {
    position: relative;
    border-radius: var(--st-radius);
    overflow: hidden;
  }
  .jr-vault-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.25rem;
  }
  .jr-vault-tile {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: var(--st-surface-container);
  }
  .jr-vault-img {
    object-fit: cover;
    filter: blur(2.5px) saturate(0.9);
    transform: scale(1.06);
  }
  .jr-gate {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(11, 20, 46, 0.42);
  }
  .jr-gate-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.85rem;
    border-radius: var(--st-radius-md);
    background: rgba(8, 14, 34, 0.88);
    border: 1px solid rgba(207, 188, 255, 0.35);
    box-shadow: 0 14px 34px -14px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .jr-gate-lock {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--st-sponsor-container);
    color: var(--st-on-sponsor-container);
  }
  .jr-otp {
    display: flex;
    gap: 0.25rem;
  }
  .jr-otp-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 28px;
    border-radius: var(--st-radius-sm);
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid var(--st-sponsor);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.85rem;
    color: #ffffff;
    font-variant-numeric: tabular-nums;
    opacity: 0;
    animation: jr-otp-fill 3.6s ease-out infinite;
    animation-delay: calc(var(--i) * 0.22s);
  }
  @keyframes jr-otp-fill {
    0% { opacity: 0; transform: translateY(4px); }
    16% { opacity: 1; transform: none; }
    82% { opacity: 1; transform: none; }
    100% { opacity: 0; transform: none; }
  }
  .jr-gate-label {
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.75);
  }

  @media (prefers-reduced-motion: reduce) {
    .jr-screen-live,
    .jr-laser,
    .jr-bracket,
    .jr-ticket,
    .jr-ticket-shine,
    .jr-status,
    .jr-detect-box,
    .jr-meter-fill,
    .jr-otp-cell {
      animation: none !important;
    }
    .jr-bracket,
    .jr-detect-box,
    .jr-otp-cell,
    .jr-ticket,
    .jr-status {
      opacity: 1 !important;
      transform: none !important;
    }
    .jr-ticket-shine { display: none; }
    .jr-meter-fill { transform: scaleX(1); }
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
