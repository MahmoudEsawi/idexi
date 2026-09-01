"use client";

import Link from "next/link";
import { ScanFace, Ticket, Activity } from "lucide-react";
// Activity (a pulse/waveform mark) is kept as the Flow icon across the site
// as a generic "live operations" signal — it never depicted sensor hardware
// specifically, so it still fits Flow's corrected QR-scanning definition.
import { useInViewOnce } from "@/hooks/useInViewOnce";
import IdexiMark from "@/components/IdexiMark";

type ChatTurn = {
  user: string;
  ai: string;
};

type Engine = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  // Exact hex per the pinned reference, not the site's --accent-* tokens —
  // a deliberate, disclosed exception (see summary): Face's value happens
  // to equal the site's own dark-mode background, so this card's cube and
  // hover panel will blend into the page in dark mode.
  accent: string;
  // Icon color on top of `accent`. Kept separate from `accent` itself
  // because Pass's accent (#00F2FF) is light — reusing it as text/icon
  // color on a light card body would fail contrast, even though it works
  // fine as a solid cube/background fill.
  iconColor: string;
  // Grid-line color for .ai-engine-grid-bg once the card's hover/active
  // state swaps its visual panel to a solid `accent` fill. A fixed white
  // line (the old shared default) has almost no contrast against Pass's
  // near-white accent, which is what made the grid read as "missing" on
  // that card even though the same grid element renders on all three —
  // the fix is per-card contrast, not a missing structure to copy over.
  // Reuses the same light/dark split as `iconColor` for the same reason.
  gridLineColor: string;
  chat: ChatTurn;
};

// Card body copy is pulled from page.md's "Explore Our AI Engines" section
// (Face, Pass) and — for idexi Flow — from "idexi - Intelligent Event
// Solutions.md", now the confirmed single source of truth for what Flow is:
// staff-phone QR scanning for access control, logistics, and workshop
// check-in. The old "crowd diagnostic telemetry / density sensors" framing
// is deprecated; page.md, PRODUCT.md, and the /services/flow page were all
// updated in the same pass so this card no longer contradicts them.
const engines: Engine[] = [
  {
    name: "idexi Face",
    tagline: "Instant photo delivery",
    description:
      "Uses facial recognition to find every guest in every event photo, then automatically builds them a private gallery and delivers it to their inbox.",
    href: "/services/face",
    icon: <ScanFace size={30} strokeWidth={1.5} />,
    accent: "#0D1B3E",
    iconColor: "#ffffff",
    gridLineColor: "rgba(255, 255, 255, 0.65)",
    chat: {
      user: "Our guests are scrolling through hundreds of strangers' photos trying to find themselves.",
      ai: "They won't have to. We find every guest in seconds and send each one a private gallery that only their own code opens.",
    },
  },
  {
    name: "idexi Flow",
    tagline: "Unified operations hub",
    description:
      "Turns any staff phone into a full check-in station, handling entry, hospitality, and session access from a single QR code per guest.",
    href: "/services/flow",
    icon: <Activity size={30} strokeWidth={1.5} />,
    accent: "#007AFF",
    iconColor: "#ffffff",
    gridLineColor: "rgba(255, 255, 255, 0.65)",
    chat: {
      user: "We're renting scanners again and the queue is already out the door.",
      ai: "Any staff phone is a scanner. One tap confirms entry in under a second, and every kit and meal pickup logs itself.",
    },
  },
  {
    name: "idexi Pass",
    tagline: "Smart digital ticketing",
    description:
      "Every guest gets a personalized, fraud-proof QR ticket in their inbox within minutes, without anyone approving registrations by hand.",
    href: "/services/pass",
    icon: <Ticket size={30} strokeWidth={1.5} />,
    accent: "#00F2FF",
    iconColor: "#0D1B3E",
    gridLineColor: "rgba(13, 27, 62, 0.35)",
    chat: {
      user: "Someone screenshotted their ticket and walked two people in on it.",
      ai: "One encrypted QR, one entry. Every ticket is branded and personalized, and it goes out in minutes with nobody approving anything by hand.",
    },
  },
];

export default function AIEnginesSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.1);

  return (
    <section id="services" ref={ref} className={`ai-engines ${inView ? "ai-engines-in-view" : ""}`}>
      <style>{aiEnginesCSS}</style>
      <div className="ai-engines-header">
        <h2 className="ai-engines-heading">Three products, one guest record</h2>
        <p className="ai-engines-subtext">
          Choose a product to see exactly what changes.
        </p>
      </div>

      <div className="ai-engines-grid">
        {engines.map((engine, i) => (
          <Link
            key={engine.name}
            href={engine.href}
            prefetch={true}
            className="ai-engine-card"
            style={{
              "--accent": engine.accent,
              "--stagger-idx": i,
              "--grid-line-color-active": engine.gridLineColor,
            } as React.CSSProperties}
          >
            <div className="ai-engine-visual">
              <div className="ai-engine-grid-bg" aria-hidden="true" />

              <div className="ai-engine-cube-scene" aria-hidden="true">
                <div className="ai-engine-cube">
                  <div className="cube-face cube-face-front" />
                  <div className="cube-face cube-face-right" />
                  <div className="cube-face cube-face-top">
                    <span className="cube-icon" style={{ color: engine.iconColor }}>
                      {engine.icon}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ai-engine-chat" aria-hidden="true">
                <div className="chat-bubble chat-bubble-user">{engine.chat.user}</div>
                <div className="chat-bubble chat-bubble-ai">
                  <span className="chat-sender">
                    <IdexiMark className="chat-sender-mark" />
                    idexi AI
                  </span>
                  {engine.chat.ai}
                </div>
              </div>
            </div>

            <div className="ai-engine-body">
              <h3 className="ai-engine-name">{engine.name}</h3>
              <p className="ai-engine-tagline">{engine.tagline}</p>
              <p className="ai-engine-description">{engine.description}</p>
              <span className="ai-engine-explore">
                See what changes <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="ai-engines-cta">
        <p className="ai-engines-cta-text">
          Not sure which pieces you need? That is what the call is for.
        </p>
        <Link href="/#contact" className="st-btn st-btn-primary">
          Book a Demo
        </Link>
      </div>
    </section>
  );
}

const aiEnginesCSS = `
  .ai-engines-cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--st-space-md);
    margin-top: var(--st-space-lg);
    text-align: center;
  }
  .ai-engines-cta-text {
    font-size: 1.02rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }

  .ai-engines {
    position: relative;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    background: var(--st-background);
    transition: background 0.4s ease;
    /* Clears the fixed Navbar pill when landed on via a #services anchor
       jump, so the heading isn't tucked under it. */
    scroll-margin-top: 96px;
  }
  .ai-engines-header {
    max-width: 640px;
    margin: 0 auto var(--st-space-lg);
    text-align: center;
  }
  /* Brand serif display heading — matches OurStorySection/CtaSection's
     heading declaration (family + weight), the shared look every main
     section heading on the page uses. */
  .ai-engines-heading {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2rem, 3vw + 1rem, 3rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .ai-engines-subtext {
    margin: var(--st-space-sm) 0 0;
    font-family: var(--st-font-ui);
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  .ai-engines-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--st-space-lg);
    max-width: 1280px;
    margin: 0 auto;
  }

  .ai-engine-card {
    display: block;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    transition-delay: calc(var(--stagger-idx, 0) * 120ms);
  }
  .ai-engines-in-view .ai-engine-card {
    opacity: 1;
    transform: translateY(0);
  }
  .ai-engine-card:hover,
  .ai-engine-card:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 16px 40px rgba(11, 28, 48, 0.12);
  }
  .ai-engine-card:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  /* ── Visual area: isometric grid + 3D cube by default, cross-fades to a
     solid accent panel with a simulated chat exchange on hover. ── */
  .ai-engine-visual {
    position: relative;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--st-surface-container-low);
    transition: background 0.5s ease;
  }
  .ai-engine-grid-bg {
    position: absolute;
    inset: 0;
    /* Line color is a custom property, not baked directly into the
       gradient stops, specifically so the hover rule below can swap it for
       a light, contrasting tone without duplicating this whole
       background-image declaration. */
    --grid-line-color: var(--st-outline-variant);
    background-image:
      repeating-linear-gradient(30deg, var(--grid-line-color) 0 1px, transparent 1px 44px),
      repeating-linear-gradient(150deg, var(--grid-line-color) 0 1px, transparent 1px 44px),
      repeating-linear-gradient(90deg, var(--grid-line-color) 0 1px, transparent 1px 44px);
    opacity: 0.55;
    transition: opacity 0.4s ease;
  }

  /* ── 3D isometric cube. rotateX(-30deg) rotateY(-45deg) on the outer
     .ai-engine-cube, verified face-by-face: front (plain translateZ), top
     (rotateX(90deg)), and right (rotateY(90deg)) all resolve to a positive
     Z-axis normal under this rotation, i.e. camera-facing — those are the
     three faces defined below, and all three are genuinely visible.
     No perspective is set on the scene, deliberately: real isometric art
     is an orthographic (parallel) projection with zero foreshortening.
     transform-style: preserve-3d still computes true 3D rotation and
     depth-sorting without a perspective value — perspective only adds
     distortion a flat isometric look shouldn't have.
     backface-visibility: hidden is kept as a safety net — for these three
     faces it's a no-op (they're already front-facing by the math above),
     but it guarantees any sign mistake fails as "a face disappears
     cleanly" rather than "a face renders mirrored and wrong". ── */
  .ai-engine-cube-scene {
    position: relative;
    z-index: 1;
    width: 72px;
    height: 72px;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .ai-engine-cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-45deg);
  }
  .cube-face {
    position: absolute;
    width: 72px;
    height: 72px;
    background: var(--accent);
    backface-visibility: hidden;
  }
  /* Shading via filter: brightness() on one shared background — top
     brightest, front mid-tone, right darkest — rather than hardcoding a
     lightened/darkened hex per card. */
  .cube-face-top {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateX(90deg) translateZ(36px);
    filter: brightness(1.2);
  }
  .cube-face-front {
    transform: translateZ(36px);
    filter: brightness(0.88);
  }
  .cube-face-right {
    transform: rotateY(90deg) translateZ(36px);
    filter: brightness(0.62);
  }
  .cube-icon {
    display: flex;
  }

  .ai-engine-chat {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.5rem;
    opacity: 0;
    pointer-events: none;
  }
  .chat-bubble {
    max-width: 82%;
    padding: 0.65rem 0.9rem;
    border-radius: var(--st-radius-lg);
    font-family: var(--st-font-ui);
    font-size: 0.85rem;
    line-height: 1.45;
    background: rgba(255, 255, 255, 0.94);
    color: #0b1c30;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .chat-bubble-user {
    align-self: flex-end;
    background: rgba(255, 255, 255, 0.7);
  }
  .chat-bubble-ai {
    align-self: flex-start;
    transition-delay: 0.12s;
  }
  .chat-sender {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.02em;
    /* Darkened off the raw accent, not the accent itself — Pass's accent
       (#00F2FF) is too light to read as text on this near-white bubble. */
    color: color-mix(in srgb, var(--accent) 65%, black 25%);
    margin-bottom: 0.2rem;
  }
  .chat-sender-mark {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    stroke: currentColor;
    stroke-width: 2.4;
    stroke-linecap: round;
    /* IdexiMark's default paths pivot from the viewBox's bottom-right
       corner. The real logo's mark pivots from the bottom-left, with the
       arcs opening upward — confirmed by overlaying the raw paths on the
       actual logo asset at several rotations; a 90deg turn is the one
       that lines up. Scoped to this usage only, not the shared component,
       since EventLifecycleSection's .ticket-logo-mark usage is unrelated
       and untouched here. */
    transform: rotate(90deg);
  }

  @media (hover: hover) and (pointer: fine) {
    .ai-engine-card:hover .ai-engine-visual,
    .ai-engine-card:focus-visible .ai-engine-visual {
      background: var(--accent);
    }
    .ai-engine-card:hover .ai-engine-grid-bg,
    .ai-engine-card:focus-visible .ai-engine-grid-bg {
      /* Stays visible on top of the solid accent panel instead of
         disappearing — switched to --grid-line-color-active (set per
         engine in the component, light or dark depending on that card's
         own accent) instead of the neutral --st-outline-variant token,
         which has no guaranteed contrast against an arbitrary accent
         color. A single hardcoded white line here previously made the
         grid nearly invisible on Pass's near-white accent specifically,
         while reading fine on Face/Flow's darker accents — this is the
         same light/dark split already used for iconColor, applied to the
         grid line for the same reason. */
      opacity: 0.35;
      --grid-line-color: var(--grid-line-color-active);
    }
    .ai-engine-card:hover .ai-engine-cube-scene,
    .ai-engine-card:focus-visible .ai-engine-cube-scene {
      opacity: 0;
      transform: scale(0.85);
    }
    .ai-engine-card:hover .ai-engine-chat,
    .ai-engine-card:focus-visible .ai-engine-chat {
      opacity: 1;
    }
    .ai-engine-card:hover .chat-bubble,
    .ai-engine-card:focus-visible .chat-bubble {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ai-engine-body {
    padding: var(--st-space-md) var(--st-space-md) var(--st-space-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
  .ai-engine-name {
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.35rem;
    color: var(--st-on-background);
  }
  .ai-engine-tagline {
    margin: 0;
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.85rem;
    /* Same reasoning as .chat-sender: darkened off the raw accent so Pass's
       light cyan stays readable as small text on the card's light body. */
    color: color-mix(in srgb, var(--accent) 65%, black 25%);
  }
  .ai-engine-description {
    margin: 0.3rem 0 0;
    font-family: var(--st-font-ui);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .ai-engine-explore {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: var(--st-space-sm);
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--st-on-background);
  }
  .ai-engine-explore span {
    transition: transform 0.25s ease;
  }
  .ai-engine-card:hover .ai-engine-explore span,
  .ai-engine-card:focus-visible .ai-engine-explore span {
    transform: translateX(3px);
  }

  @media (prefers-reduced-motion: reduce) {
    .ai-engine-card,
    .ai-engine-visual,
    .ai-engine-grid-bg,
    .ai-engine-cube-scene,
    .ai-engine-chat,
    .chat-bubble,
    .ai-engine-explore span {
      transition: none !important;
    }
    .ai-engine-card {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 1024px) {
    .ai-engines-grid {
      grid-template-columns: 1fr;
      max-width: 480px;
    }
  }
`;
