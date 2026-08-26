"use client";

import Image from "next/image";

interface CardSpec {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rot: number;
  fromX: number;
  fromY: number;
  enterDelay: number;
}

const CARDS: CardSpec[] = [
  {
    id: "c1",
    src: "/editorial-red-coat.jpg",
    alt: "Figure in crimson coat",
    width: 140,
    height: 180,
    x: -28,
    y: 10,
    rot: -1,
    fromX: 0,
    fromY: 0,
    enterDelay: 0,
  },
  {
    id: "c2",
    src: "/editorial-knit-hood.jpg",
    alt: "Knit balaclava portrait",
    width: 110,
    height: 150,
    x: 55,
    y: -35,
    rot: 3,
    fromX: 180,
    fromY: -100,
    enterDelay: 0.12,
  },
  {
    id: "c3",
    src: "/editorial-orange-jacket.jpg",
    alt: "Ochre trench coat in landscape",
    width: 125,
    height: 165,
    x: 75,
    y: 50,
    rot: -2,
    fromX: 160,
    fromY: 140,
    enterDelay: 0.22,
  },
  {
    id: "c4",
    src: "/face-gala-wedding.jpg",
    alt: "Candid atmosphere",
    width: 100,
    height: 135,
    x: -85,
    y: -45,
    rot: -4,
    fromX: -160,
    fromY: -120,
    enterDelay: 0.32,
  },
  {
    id: "c5",
    src: "/face-portrait-scan.jpg",
    alt: "Guest portrait",
    width: 95,
    height: 125,
    x: -15,
    y: -90,
    rot: 2,
    fromX: 0,
    fromY: -180,
    enterDelay: 0.42,
  },
  {
    id: "c6",
    src: "/pass-private-dinner.jpg",
    alt: "Private dinner",
    width: 105,
    height: 140,
    x: -95,
    y: 40,
    rot: 4,
    fromX: -180,
    fromY: 100,
    enterDelay: 0.52,
  },
  {
    id: "c7",
    src: "/face-music-festival.jpg",
    alt: "Concert festival crowd",
    width: 90,
    height: 120,
    x: 120,
    y: 5,
    rot: -3,
    fromX: 180,
    fromY: 0,
    enterDelay: 0.62,
  },
];

export default function HeroKineticPhotos() {
  const wordmark = "IDEXI";

  return (
    <div className="hero-kphoto-stage" aria-hidden="true">
      <style>{heroKPhotoCSS}</style>

      {/* Mid-frame Background Scrolling Ticker */}
      <div className="hero-kphoto-ticker-wrap">
        <div className="hero-kphoto-ticker-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="hero-kphoto-ticker-item">
              {wordmark}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Scattered Moodboard Photo Cluster */}
      <div className="hero-kphoto-cluster">
        {CARDS.map((card, idx) => (
          <div
            key={card.id}
            className={`hero-kphoto-card hero-kcard-${idx}`}
            style={
              {
                "--w": `${card.width}px`,
                "--h": `${card.height}px`,
                "--target-x": `${card.x}px`,
                "--target-y": `${card.y}px`,
                "--rot": `${card.rot}deg`,
                "--from-x": `${card.fromX}px`,
                "--from-y": `${card.fromY}px`,
                "--anim-delay": `${card.enterDelay}s`,
              } as React.CSSProperties
            }
          >
            <div className="hero-kphoto-card-inner">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="200px"
                className="hero-kphoto-img"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Closing Centered Wordmark Lockup */}
      <div className="hero-kphoto-end-lockup">
        <span className="hero-kphoto-end-title">{wordmark}</span>
      </div>
    </div>
  );
}

const heroKPhotoCSS = `
  .hero-kphoto-stage {
    position: relative;
    width: 100%;
    max-width: 520px;
    height: 480px;
    margin: 0 auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    pointer-events: auto;
  }

  /* ── 1. BACKGROUND SCROLLING TICKER ── */
  .hero-kphoto-ticker-wrap {
    position: absolute;
    top: 50%;
    left: -20%;
    right: -20%;
    transform: translateY(-50%);
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    animation: hero-ticker-cycle 4.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .hero-kphoto-ticker-track {
    display: flex;
    white-space: nowrap;
    width: max-content;
    animation: hero-ticker-scroll 12s linear infinite;
  }

  .hero-kphoto-ticker-item {
    font-family: var(--st-font-ui), sans-serif;
    font-size: clamp(1.25rem, 2.5vw, 1.6rem);
    font-weight: 500;
    letter-spacing: 0.55em;
    color: var(--st-on-surface);
    opacity: 0.12;
  }

  @keyframes hero-ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes hero-ticker-cycle {
    0%, 75% { opacity: 1; }
    82%, 100% { opacity: 0; }
  }

  /* ── 2. CARDS CLUSTER STAGE ── */
  .hero-kphoto-cluster {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  .hero-kphoto-card {
    position: absolute;
    width: var(--w);
    height: var(--h);
    border-radius: 6px;
    overflow: hidden;
    background: #0d1222;
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
    will-change: transform, opacity;
    animation: hero-kcard-sequence 4.6s cubic-bezier(0.2, 0.9, 0.2, 1) infinite;
    pointer-events: auto;
    transition: box-shadow 0.25s ease;
  }

  .hero-kphoto-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .hero-kphoto-img {
    object-fit: cover;
  }

  /* ── 4.6S SNAPPY EASING SEQUENCE ── */
  @keyframes hero-kcard-sequence {
    0% {
      opacity: 0;
      transform: translate3d(var(--from-x), var(--from-y), 0) scale(0.65) rotate(0deg);
    }
    16% {
      opacity: 1;
      transform: translate3d(calc(var(--target-x) * 1.04), calc(var(--target-y) * 1.04), 0) scale(1.02) rotate(var(--rot));
    }
    22% {
      opacity: 1;
      transform: translate3d(var(--target-x), var(--target-y), 0) scale(1) rotate(var(--rot));
    }
    52% {
      opacity: 1;
      transform: translate3d(var(--target-x), var(--target-y), 0) scale(1) rotate(var(--rot));
    }
    66% {
      opacity: 0.8;
      transform: translate3d(calc(var(--target-x) * 0.4), calc(var(--target-y) * 0.4), 0) scale(0.85) rotate(0deg);
    }
    76% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.5);
    }
  }

  .hero-kcard-0 { animation-delay: 0s; z-index: 7; }
  .hero-kcard-1 { animation-delay: 0.12s; z-index: 6; }
  .hero-kcard-2 { animation-delay: 0.22s; z-index: 5; }
  .hero-kcard-3 { animation-delay: 0.32s; z-index: 4; }
  .hero-kcard-4 { animation-delay: 0.42s; z-index: 3; }
  .hero-kcard-5 { animation-delay: 0.52s; z-index: 2; }
  .hero-kcard-6 { animation-delay: 0.62s; z-index: 1; }

  /* ── 3. END LOGO LOCKUP ── */
  .hero-kphoto-end-lockup {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
    animation: hero-end-fade 4.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .hero-kphoto-end-title {
    font-family: var(--st-font-ui), sans-serif;
    font-size: clamp(1.1rem, 2.2vw, 1.4rem);
    font-weight: 600;
    letter-spacing: 0.6em;
    color: var(--st-on-surface);
    text-transform: uppercase;
  }

  @keyframes hero-end-fade {
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

  /* ── RESPONSIVENESS ── */
  @media (max-width: 1023px) {
    .hero-kphoto-stage {
      height: 380px;
      max-width: 420px;
    }
    .hero-kphoto-card {
      transform-origin: center center;
    }
  }

  @media (max-width: 480px) {
    .hero-kphoto-stage {
      height: 320px;
      max-width: 320px;
    }
  }
`;
