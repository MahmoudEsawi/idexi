"use client";

import Image from "next/image";

interface CardSpec {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  // Offset in the assembled cluster
  x: number;
  y: number;
  rot: number;
  // Starting spawn offset
  fromX: number;
  fromY: number;
  // Step in sequence when it appears (1..7)
  enterDelay: number;
  exitDelay: number;
}

const CARDS: CardSpec[] = [
  {
    id: "c1",
    src: "/editorial-red-coat.jpg",
    alt: "Figure in crimson coat",
    width: 120,
    height: 155,
    x: -25,
    y: 10,
    rot: -1,
    fromX: 0,
    fromY: 0,
    enterDelay: 0,
    exitDelay: 3.4,
  },
  {
    id: "c2",
    src: "/editorial-knit-hood.jpg",
    alt: "Knit balaclava portrait",
    width: 95,
    height: 130,
    x: 45,
    y: -30,
    rot: 3,
    fromX: 180,
    fromY: -100,
    enterDelay: 0.5,
    exitDelay: 2.8,
  },
  {
    id: "c3",
    src: "/editorial-orange-jacket.jpg",
    alt: "Ochre trench coat in landscape",
    width: 110,
    height: 145,
    x: 65,
    y: 45,
    rot: -2,
    fromX: 160,
    fromY: 140,
    enterDelay: 0.7,
    exitDelay: 2.6,
  },
  {
    id: "c4",
    src: "/face-gala-wedding.jpg",
    alt: "Candid warm atmosphere",
    width: 85,
    height: 115,
    x: -75,
    y: -40,
    rot: -4,
    fromX: -160,
    fromY: -120,
    enterDelay: 0.9,
    exitDelay: 2.4,
  },
  {
    id: "c5",
    src: "/face-portrait-scan.jpg",
    alt: "Guest portrait",
    width: 80,
    height: 105,
    x: -15,
    y: -80,
    rot: 2,
    fromX: 0,
    fromY: -180,
    enterDelay: 1.1,
    exitDelay: 2.2,
  },
  {
    id: "c6",
    src: "/pass-private-dinner.jpg",
    alt: "Evening dinner scene",
    width: 90,
    height: 120,
    x: -85,
    y: 35,
    rot: 4,
    fromX: -180,
    fromY: 100,
    enterDelay: 1.3,
    exitDelay: 2.0,
  },
  {
    id: "c7",
    src: "/face-music-festival.jpg",
    alt: "Moody festival light",
    width: 75,
    height: 100,
    x: 105,
    y: 5,
    rot: -3,
    fromX: 180,
    fromY: 0,
    enterDelay: 1.4,
    exitDelay: 1.8,
  },
];

export default function KineticPhotoStreamSection() {
  const wordmark = "IDEXI";

  return (
    <section className="kbrand-section">
      <style>{kbrandCSS}</style>

      <div className="container kbrand-container">
        {/* 4:5 Vertical Editorial White Stage */}
        <div className="kbrand-stage-canvas" aria-label="idexi Brand Animation Stage">
          {/* Background Scrolling Ticker (Steps 1-4) */}
          <div className="kbrand-ticker-layer" aria-hidden="true">
            <div className="kbrand-ticker-track">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="kbrand-ticker-item">
                  {wordmark}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Cards Asymmetric Cluster Animation Container */}
          <div className="kbrand-cards-stage">
            {CARDS.map((card, idx) => (
              <div
                key={card.id}
                className={`kbrand-card-item kbrand-card-${idx}`}
                style={
                  {
                    "--w": `${card.width}px`,
                    "--h": `${card.height}px`,
                    "--target-x": `${card.x}px`,
                    "--target-y": `${card.y}px`,
                    "--rot": `${card.rot}deg`,
                    "--from-x": `${card.fromX}px`,
                    "--from-y": `${card.fromY}px`,
                    "--enter-delay": `${card.enterDelay}s`,
                    "--exit-delay": `${card.exitDelay}s`,
                  } as React.CSSProperties
                }
              >
                <div className="kbrand-card-img-wrap">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="180px"
                    className="kbrand-img"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>

          {/* End Card Logo Lockup (Step 6) */}
          <div className="kbrand-end-lockup" aria-hidden="true">
            <span className="kbrand-end-title">{wordmark}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const kbrandCSS = `
  .kbrand-section {
    padding: var(--st-space-2xl) 0;
    background: var(--st-background);
    display: flex;
    justify-content: center;
  }

  .kbrand-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .kbrand-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 440px;
  }

  .kbrand-eyebrow {
    font-family: var(--st-font-ui);
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--st-on-surface-variant);
  }

  .kbrand-wordmark-toggle {
    display: flex;
    gap: 0.3rem;
    background: var(--st-surface-container-high);
    padding: 0.2rem;
    border-radius: var(--st-radius-md);
  }

  .kbrand-toggle-btn {
    border: none;
    background: transparent;
    padding: 0.3rem 0.55rem;
    border-radius: calc(var(--st-radius-md) - 2px);
    font-family: var(--st-font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--st-on-surface-variant);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .kbrand-toggle-btn.is-active {
    background: #ffffff;
    color: #000000;
  }

  /* ── 4:5 VERTICAL CLEAN WHITE STAGE ── */
  .kbrand-stage-canvas {
    position: relative;
    width: 100%;
    max-width: 440px;
    aspect-ratio: 4 / 5;
    background: #ffffff;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── 1. BACKGROUND SCROLLING TICKER ── */
  .kbrand-ticker-layer {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    animation: kbrand-ticker-fade 4.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .kbrand-ticker-track {
    display: flex;
    white-space: nowrap;
    width: max-content;
    animation: kbrand-marquee-scroll 10s linear infinite;
  }

  .kbrand-ticker-item {
    font-family: var(--st-font-ui), sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: 0.55em;
    color: #000000;
    opacity: 0.9;
  }

  @keyframes kbrand-marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes kbrand-ticker-fade {
    0%, 75% { opacity: 1; }
    82%, 100% { opacity: 0; }
  }

  /* ── 2. CARDS STAGE & KINETIC CLUSTER ── */
  .kbrand-cards-stage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }

  .kbrand-card-item {
    position: absolute;
    width: var(--w);
    height: var(--h);
    border-radius: 4px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0, 0, 0, 0.12);
    will-change: transform, opacity;
    animation: kbrand-card-sequence 4.6s cubic-bezier(0.2, 0.9, 0.2, 1) infinite;
  }

  .kbrand-card-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .kbrand-img {
    object-fit: cover;
  }

  /* ── PRECISE 4.6S SNAPPY ANIMATION SEQUENCE ── */
  @keyframes kbrand-card-sequence {
    /* 0% - 10%: Initial state (hidden at offscreen position) */
    0% {
      opacity: 0;
      transform: translate3d(var(--from-x), var(--from-y), 0) scale(0.7) rotate(0deg);
    }
    /* 12% - 18%: Snappy Ease-Out Fly-In with slight overshoot landing */
    16% {
      opacity: 1;
      transform: translate3d(calc(var(--target-x) * 1.05), calc(var(--target-y) * 1.05), 0) scale(1.02) rotate(var(--rot));
    }
    22% {
      opacity: 1;
      transform: translate3d(var(--target-x), var(--target-y), 0) scale(1) rotate(var(--rot));
    }
    /* 22% - 55%: Hold at peak density / scattered moodboard cluster */
    52% {
      opacity: 1;
      transform: translate3d(var(--target-x), var(--target-y), 0) scale(1) rotate(var(--rot));
    }
    /* 56% - 74%: Reverse / Collapse back & peel away */
    66% {
      opacity: 0.8;
      transform: translate3d(calc(var(--target-x) * 0.4), calc(var(--target-y) * 0.4), 0) scale(0.85) rotate(0deg);
    }
    76% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg);
    }
    /* 78% - 100%: Clean white frame */
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.5);
    }
  }

  /* Individual card entrance delays (snappy cascade) */
  .kbrand-card-0 { animation-delay: 0s; z-index: 7; }
  .kbrand-card-1 { animation-delay: 0.12s; z-index: 6; }
  .kbrand-card-2 { animation-delay: 0.22s; z-index: 5; }
  .kbrand-card-3 { animation-delay: 0.32s; z-index: 4; }
  .kbrand-card-4 { animation-delay: 0.42s; z-index: 3; }
  .kbrand-card-5 { animation-delay: 0.52s; z-index: 2; }
  .kbrand-card-6 { animation-delay: 0.62s; z-index: 1; }

  /* ── 6. END CARD LOGO LOCKUP ── */
  .kbrand-end-lockup {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
    animation: kbrand-end-fade 4.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .kbrand-end-title {
    font-family: var(--st-font-ui), sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.6em;
    color: #000000;
    text-transform: uppercase;
  }

  @keyframes kbrand-end-fade {
    0%, 74% {
      opacity: 0;
      transform: scale(0.96);
    }
    82%, 94% {
      opacity: 1;
      transform: scale(1);
    }
    98%, 100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @media (max-width: 480px) {
    .kbrand-stage-canvas {
      max-width: 320px;
    }
    .kbrand-ticker-item {
      font-size: 0.95rem;
    }
    .kbrand-end-title {
      font-size: 0.75rem;
    }
  }
`;
