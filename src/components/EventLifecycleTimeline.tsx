"use client";

import React, { useEffect, useRef, useState } from "react";
import { Ticket, ScanFace, Activity, Camera, type LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Stage {
  icon: LucideIcon;
  badge: string;
  title: string;
  desc: string;
}

const stages: Stage[] = [
  {
    icon: Ticket,
    badge: "idexi Pass",
    title: "Smart Pass Issuance",
    desc: "Attendees register and receive encrypted smart-passes with biometric profiles.",
  },
  {
    icon: ScanFace,
    badge: "idexi Pass",
    title: "Express Bio Check-In",
    desc: "Guests scan and verify at access points — zero bottlenecks, millisecond check-in.",
  },
  {
    icon: Activity,
    badge: "idexi Flow",
    title: "Crowd Analytics (Live)",
    desc: "Sensors assess crowd density, movement, and exit patterns dynamically.",
  },
  {
    icon: Camera,
    badge: "idexi Face",
    title: "Instant Photo Delivery",
    desc: "AI matches faces across event photos, then instantly emails each guest their gallery.",
  },
];

const AUTO_ADVANCE_MS = 4000;
const REVEAL_TO_ACTIVATE_MS = 1500;

export default function EventLifecycleTimeline() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [userLocked, setUserLocked] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  // One observer, two jobs: flip hasRevealed once (drives the entrance sweep/stagger),
  // and keep tracking isVisible continuously (drives pausing auto-advance off-screen).
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasRevealed(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Drop the entrance animation's will-change hint once it's had time to finish.
  useEffect(() => {
    if (!hasRevealed) return;
    const timer = setTimeout(() => setHasSettled(true), 1600);
    return () => clearTimeout(timer);
  }, [hasRevealed]);

  // Reduced motion: stage 1 open and static by default (no entrance, no cycling to get
  // there) — but an explicit click/arrow-key still works normally afterward. Derived at
  // render time (not an effect): prefersReducedMotion is already synchronous via
  // useSyncExternalStore, so there's no "catching up" needed.
  const effectiveActiveIndex = activeIndex === null && prefersReducedMotion ? 0 : activeIndex;

  // Once the entrance sweep/stagger has had time to settle, open stage 1 and start the clock.
  useEffect(() => {
    if (prefersReducedMotion || !hasRevealed || activeIndex !== null) return;
    const timer = setTimeout(() => setActiveIndex(0), REVEAL_TO_ACTIVATE_MS);
    return () => clearTimeout(timer);
  }, [hasRevealed, prefersReducedMotion, activeIndex]);

  // Auto-advance: exactly one setTimeout per transition, never a repeating interval.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeIndex === null) return;
    if (userLocked || isHoverPaused || isFocusPaused || !isVisible) return;

    const timer = setTimeout(() => {
      setActiveIndex((current) => (current === null ? 0 : (current + 1) % stages.length));
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, userLocked, isHoverPaused, isFocusPaused, isVisible, prefersReducedMotion]);

  const selectStage = (index: number) => {
    setUserLocked(true);
    setActiveIndex((current) => (current === index ? null : index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusIndex = buttonRefs.current.findIndex((btn) => btn === document.activeElement);
    if (focusIndex === -1) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (focusIndex + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (focusIndex - 1 + stages.length) % stages.length;
    }
    if (nextIndex === null) return;

    event.preventDefault();
    setUserLocked(true);
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocusPaused(false);
    }
  };

  return (
    <>
      <style>{eltCSS}</style>
      <div
        ref={wrapRef}
        className={`elt-wrap ${hasRevealed || prefersReducedMotion ? "elt-revealed" : ""} ${hasSettled ? "elt-settled" : ""} ${isVisible ? "elt-onscreen" : ""}`}
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
      >
        <div
          className="elt-rail"
          role="tablist"
          aria-label="Event lifecycle stages"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          onFocusCapture={() => setIsFocusPaused(true)}
          onBlurCapture={handleBlurCapture}
        >
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = effectiveActiveIndex === i;
            const isTabbable = effectiveActiveIndex === null ? i === 0 : isActive;
            const tabId = `elt-tab-${i}`;
            const panelId = `elt-panel-${i}`;

            return (
              <div className="elt-stage" key={stage.title}>
                <div className="elt-node-col">
                  {i === 0 && (
                    <>
                      {/* Desktop: one continuous sine-shaped path through all 4 node
                          positions (trough/peak/trough/peak), instead of straight
                          segments — so the track itself IS the wave, not a rigid line
                          the icons float above. */}
                      <svg
                        className="elt-wave elt-wave-desktop"
                        aria-hidden="true"
                        viewBox="0 0 300 76"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="eltWaveGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "var(--accent-cyan)" }} />
                            <stop offset="100%" style={{ stopColor: "var(--accent-blue)" }} />
                          </linearGradient>
                        </defs>
                        <path
                          className="elt-wave-base"
                          d="M 0,54 C 50,54 50,22 100,22 C 150,22 150,54 200,54 C 250,54 250,22 300,22"
                        />
                        <path
                          className="elt-wave-fill"
                          pathLength={100}
                          d="M 0,54 C 50,54 50,22 100,22 C 150,22 150,54 200,54 C 250,54 250,22 300,22"
                          stroke="url(#eltWaveGradientH)"
                        />
                        <path
                          className="elt-wave-glow"
                          pathLength={100}
                          d="M 0,54 C 50,54 50,22 100,22 C 150,22 150,54 200,54 C 250,54 250,22 300,22"
                        />
                      </svg>
                      {/* Mobile/tablet: the same wave, rotated to run top-to-bottom
                          down the left rail. */}
                      <svg
                        className="elt-wave elt-wave-mobile"
                        aria-hidden="true"
                        viewBox="0 0 76 300"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="eltWaveGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "var(--accent-cyan)" }} />
                            <stop offset="100%" style={{ stopColor: "var(--accent-blue)" }} />
                          </linearGradient>
                        </defs>
                        <path
                          className="elt-wave-base"
                          d="M 54,0 C 54,50 22,50 22,100 C 22,150 54,150 54,200 C 54,250 22,250 22,300"
                        />
                        <path
                          className="elt-wave-fill"
                          pathLength={100}
                          d="M 54,0 C 54,50 22,50 22,100 C 22,150 54,150 54,200 C 54,250 22,250 22,300"
                          stroke="url(#eltWaveGradientV)"
                        />
                        <path
                          className="elt-wave-glow"
                          pathLength={100}
                          d="M 54,0 C 54,50 22,50 22,100 C 22,150 54,150 54,200 C 54,250 22,250 22,300"
                        />
                      </svg>
                    </>
                  )}
                  <button
                    ref={(el) => {
                      buttonRefs.current[i] = el;
                    }}
                    id={tabId}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isTabbable ? 0 : -1}
                    className={`elt-node ${isActive ? "elt-node-active" : ""}`}
                    style={{ "--stagger-idx": i } as React.CSSProperties}
                    onClick={() => selectStage(i)}
                  >
                    {/* The 44x44 hit area above never scales — only this inner visual
                        wrapper does, so dimming inactive nodes never shrinks the tap target. */}
                    <span className="elt-node-visual">
                      <span className="elt-node-glow" aria-hidden="true" />
                      <span className="elt-node-pulse" aria-hidden="true" />
                      <Icon size={18} className="elt-node-icon" aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <div className="elt-content-col">
                  <span className="elt-label" style={{ "--stagger-idx": i } as React.CSSProperties}>
                    {stage.title}
                  </span>

                  <div className="elt-panel-slot">
                    <div
                      id={panelId}
                      role="tabpanel"
                      aria-labelledby={tabId}
                      aria-hidden={!isActive}
                      className={`elt-panel glass-card ${isActive ? "elt-panel-open" : ""}`}
                    >
                      <span className="elt-panel-connector" aria-hidden="true" />
                      <span className="elt-panel-badge">{stage.badge}</span>
                      <h3 className="elt-panel-title">{stage.title}</h3>
                      <p className="elt-panel-desc">{stage.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const eltCSS = `
  .elt-wrap {
    position: relative;
  }

  /* ═══ RAIL / GRID ═══ */
  .elt-rail {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .elt-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  /* ═══ TRACK — SVG sine wave (lives only in stage 1, spans through all 4 nodes) ═══
     The track IS the wave now: one continuous curved path through all 4 node
     positions (trough/peak/trough/peak), instead of straight segments the icons
     used to float above. Nodes sit statically at the curve's own peaks/troughs
     (see the NODE section below) rather than independently bobbing, so the two
     can never visually disconnect from each other. */
  .elt-node-col {
    position: relative;
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .elt-wave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(3 * (100% + 1.5rem));
    height: 76px;
    transform: translateY(-50%);
    overflow: visible;
  }
  .elt-wave-mobile {
    display: none;
  }
  .elt-wave-base,
  .elt-wave-fill,
  .elt-wave-glow {
    fill: none;
    stroke-linecap: round;
  }
  .elt-wave-base {
    stroke: var(--text-muted);
    stroke-opacity: 0.18;
    stroke-width: 2;
  }
  .elt-wave-fill {
    stroke-width: 2;
    filter: drop-shadow(0 0 6px var(--accent-glow));
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  .elt-wrap.elt-revealed .elt-wave-fill {
    animation: eltWaveDraw 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes eltWaveDraw {
    from { stroke-dashoffset: 100; }
    to   { stroke-dashoffset: 0; }
  }
  /* The traveling glow — a short bright dash endlessly moving along the curve,
     giving the "AI energy/frequency wave" feel. Gated on .elt-settled (not just
     .elt-onscreen) so it never starts mid-reveal, before the draw-in above has
     finished covering the whole curve. */
  .elt-wave-glow {
    stroke: var(--accent-cyan);
    stroke-width: 3;
    opacity: 0.9;
    filter: drop-shadow(0 0 8px var(--accent-glow));
    stroke-dasharray: 12 88;
  }
  .elt-wrap.elt-settled.elt-onscreen .elt-wave-glow {
    animation: eltWaveShimmer 3.1s linear infinite;
  }
  @keyframes eltWaveShimmer {
    to { stroke-dashoffset: -100; }
  }

  /* ═══ NODE (icon button) ═══
     .elt-node is the real hit area — fixed at 44x44, never scaled — so the tap
     target never shrinks below the accessibility floor even when a node is
     visually dimmed. All scaling/border/color/glow live on the inner
     .elt-node-visual instead, which is free to grow/shrink/dim purely visually. */
  .elt-node {
    position: relative;
    z-index: 1;
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    opacity: 0;
    transition: var(--transition-smooth);
    transition-delay: calc(var(--stagger-idx, 0) * 120ms);
  }
  .elt-wrap.elt-revealed .elt-node {
    opacity: 1;
  }
  .elt-wrap.elt-revealed:not(.elt-settled) .elt-node,
  .elt-wrap.elt-revealed:not(.elt-settled) .elt-node-visual,
  .elt-wrap.elt-revealed:not(.elt-settled) .elt-label {
    will-change: opacity, transform;
  }
  .elt-wrap.elt-settled .elt-node-visual,
  .elt-wrap.elt-settled .elt-label {
    will-change: auto;
  }

  /* Static wave position: each node sits at its own point on the SVG curve
     (trough/peak/trough/peak, matching the path's control points exactly) —
     a fixed offset, not an animation, so the node can never drift away from
     the curve under it. Lives on .elt-node (the fixed 44x44 hit area), never
     on .elt-node-visual, so it composes with that element's own active/inactive
     scale() instead of fighting it for the transform property — translating
     the whole button doesn't change its 44x44 box size, only its position. */
  .elt-stage:nth-child(1) .elt-node,
  .elt-stage:nth-child(3) .elt-node {
    transform: translateY(16px);
  }
  .elt-stage:nth-child(2) .elt-node,
  .elt-stage:nth-child(4) .elt-node {
    transform: translateY(-16px);
  }

  .elt-node-visual {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.7);
    transition: var(--transition-smooth);
  }
  .elt-wrap.elt-revealed .elt-node-visual {
    transform: scale(1);
  }
  .elt-node-icon {
    position: relative;
    z-index: 1;
    transition: var(--transition-smooth);
  }
  .elt-node-glow {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 72%);
    opacity: 0;
    pointer-events: none;
    z-index: -1;
    transition: opacity 0.4s ease;
  }
  .elt-node-pulse {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 1.5px solid var(--accent-cyan);
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }
  .elt-node:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 3px;
  }
  .elt-node:focus-visible .elt-node-visual {
    border-color: var(--glass-border-hover);
    color: var(--text-primary);
  }
  .elt-node:focus-visible .elt-node-glow {
    opacity: 0.5;
  }
  @media (hover: hover) and (pointer: fine) {
    .elt-node:hover .elt-node-visual {
      border-color: var(--glass-border-hover);
      color: var(--text-primary);
    }
    .elt-node:hover .elt-node-glow {
      opacity: 0.5;
    }
  }

  /* Active node: brighter, larger, continuously pulsing ring. Targeting through
     .elt-node-active .elt-node-visual (not .elt-node-active alone) gives this
     naturally more specificity than the plain .elt-wrap.elt-revealed .elt-node-visual
     default above, so it reliably wins — same specificity trap as the card-hover
     bug found earlier in this project, avoided here by construction. */
  .elt-wrap.elt-revealed .elt-node-active .elt-node-visual {
    border-color: var(--accent-cyan);
    background: rgba(49, 196, 243, 0.12);
    color: var(--accent-cyan);
    transform: scale(1.14);
  }
  .elt-node-active .elt-node-glow {
    opacity: 0.85;
  }
  .elt-wrap.elt-revealed .elt-node-active .elt-node-pulse {
    animation: eltPulseRing 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }
  @keyframes eltPulseRing {
    0%   { transform: scale(0.9); opacity: 0.6; }
    70%  { opacity: 0; }
    100% { transform: scale(1.7); opacity: 0; }
  }

  /* Inactive nodes, once something else is active: dim + shrink slightly (same hue,
     lower opacity) — purely visual, on .elt-node-visual, never on the .elt-node hit area. */
  .elt-wrap.elt-revealed .elt-node:not(.elt-node-active) .elt-node-visual {
    opacity: 0.55;
    transform: scale(0.92);
  }

  /* ═══ LABEL (always visible) ═══ */
  .elt-content-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .elt-label {
    font-family: var(--font-headings);
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--text-primary);
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: var(--transition-smooth);
    transition-delay: calc(var(--stagger-idx, 0) * 120ms);
  }
  .elt-wrap.elt-revealed .elt-label {
    opacity: 1;
    transform: translateY(0);
  }

  /* ═══ EXPAND PANEL ═══ */
  .elt-panel-slot {
    width: 100%;
    min-height: 168px;
    margin-top: 0.5rem;
    display: flex;
  }
  .elt-panel {
    position: relative;
    width: 100%;
    padding: 1.5rem;
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
    pointer-events: none;
    transition: var(--transition-smooth);
  }
  .elt-panel-open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  .elt-panel-connector {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    width: 2px;
    height: 0.5rem;
    background: var(--accent-cyan);
    opacity: 0.5;
    transform: translateX(-50%);
  }
  .elt-panel-badge {
    display: inline-block;
    align-self: flex-start;
    font-family: var(--font-headings);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-cyan);
    background: rgba(49, 196, 243, 0.08);
    border: 1px solid rgba(49, 196, 243, 0.2);
    border-radius: 9999px;
    padding: 0.25rem 0.7rem;
    margin-bottom: 0.75rem;
  }
  .elt-panel-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .elt-panel-desc {
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
  }

  /* ═══ REDUCED MOTION ═══ */
  @media (prefers-reduced-motion: reduce) {
    .elt-node,
    .elt-label {
      transition: none !important;
      transition-delay: 0s !important;
      opacity: 1 !important;
    }
    /* .elt-node's translateY offset is a static wave-position, not an animation —
       it stays exactly as-is here. Removing it would snap nodes back to a flat
       line while the (still-visible, still-drawn) curve stays wavy beneath them,
       recreating the exact "icons detached from the line" problem this whole
       redesign exists to fix. */
    .elt-node-visual {
      transition: none !important;
      transform: scale(1) !important;
    }
    .elt-label {
      transform: translateY(0) !important;
    }
    .elt-wrap.elt-revealed .elt-node:not(.elt-node-active) .elt-node-visual {
      opacity: 0.55 !important;
      transform: scale(0.92) !important;
    }
    .elt-wave-fill {
      animation: none !important;
      stroke-dashoffset: 0 !important;
    }
    .elt-wave-glow {
      animation: none !important;
      opacity: 0 !important;
    }
    .elt-node-pulse {
      animation: none !important;
      opacity: 0 !important;
    }
    .elt-panel {
      transition: none !important;
    }
  }

  /* ═══ MOBILE / TABLET — vertical rail (<=1024px) ═══
     Mirrors the earlier vertical-track conversion: each stage's two child
     groups (node-col, content-col) are lifted out via display:contents and
     explicitly placed into a shared 2-column (rail | content) grid, one row
     per stage, so the track can run down a single fixed-width left column
     while the label + panel sit inline to its right, directly under that
     stage's own node — exactly the "expanding inline beneath its own node"
     behavior asked for, with no separate mobile markup needed. */
  @media (max-width: 1024px) {
    .elt-rail {
      display: grid;
      grid-template-columns: 76px 1fr;
      column-gap: 1rem;
      row-gap: 1.5rem;
    }
    .elt-stage {
      display: contents;
    }
    .elt-stage:nth-child(1) .elt-node-col { grid-column: 1; grid-row: 1; }
    .elt-stage:nth-child(2) .elt-node-col { grid-column: 1; grid-row: 2; }
    .elt-stage:nth-child(3) .elt-node-col { grid-column: 1; grid-row: 3; }
    .elt-stage:nth-child(4) .elt-node-col { grid-column: 1; grid-row: 4; }
    .elt-stage:nth-child(1) .elt-content-col { grid-column: 2; grid-row: 1; }
    .elt-stage:nth-child(2) .elt-content-col { grid-column: 2; grid-row: 2; }
    .elt-stage:nth-child(3) .elt-content-col { grid-column: 2; grid-row: 3; }
    .elt-stage:nth-child(4) .elt-content-col { grid-column: 2; grid-row: 4; }

    .elt-node-col {
      height: auto;
      align-items: flex-start;
    }
    .elt-node {
      margin-top: 0;
    }
    .elt-content-col {
      align-items: flex-start;
    }
    .elt-label {
      text-align: left;
    }
    .elt-panel-slot {
      justify-content: flex-start;
    }
    .elt-panel-connector {
      top: -0.5rem;
      left: 1.5rem;
    }

    /* The wave itself: swap in the vertical-orientation SVG in place of the
       horizontal one. The reveal-draw and traveling-glow animations are pure
       stroke-dashoffset — a scalar fraction of the path's length — so they need
       no orientation-specific override at all; the same eltWaveDraw/eltWaveShimmer
       rules already apply correctly to whichever SVG is visible. Node position
       (below) switches from translateY to translateX for the same reason the
       desktop version used translateY: nodes sit on whichever axis the curve
       actually bends along. */
    .elt-wave-desktop {
      display: none;
    }
    .elt-wave-mobile {
      display: block;
      top: 1.5rem;
      left: 50%;
      width: 76px;
      height: calc(3 * (100% + 1.5rem));
      transform: translateX(-50%);
    }
    .elt-stage:nth-child(1) .elt-node,
    .elt-stage:nth-child(3) .elt-node {
      transform: translateX(16px);
    }
    .elt-stage:nth-child(2) .elt-node,
    .elt-stage:nth-child(4) .elt-node {
      transform: translateX(-16px);
    }
  }
`;
