"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const POOL_IMAGES = [
  "/editorial-red-coat.jpg",
  "/editorial-knit-hood.jpg",
  "/editorial-orange-jacket.jpg",
  "/face-portrait-scan.jpg",
  "/face-gala-wedding.jpg",
  "/face-corporate-summit.jpg",
  "/face-music-festival.jpg",
  "/flow-vip-hospitality.jpg",
  "/pass-private-dinner.jpg",
  "/pass-arena-expo.jpg",
  "/flow-conference-hall.jpg",
  "/pass-multi-summit.jpg",
];

interface MovingTile {
  id: number;
  // Starting positions (CSS percentages)
  startTop: string;
  startLeft: string;
  width: string;
  height: string;
  moveClass: string;
  zIndex: number;
  intervalMs: number;
}

const MOVING_TILES: MovingTile[] = [
  // Top-left moving upwards
  { id: 1, startTop: "12%", startLeft: "6%", width: "24vw", height: "26vh", moveClass: "drift-up-left", zIndex: 1, intervalMs: 120 },
  // Top center-left drifting down-right
  { id: 2, startTop: "-5%", startLeft: "32%", width: "26vw", height: "30vh", moveClass: "drift-down-right", zIndex: 2, intervalMs: 90 },
  // Top right drifting down-left
  { id: 3, startTop: "4%", startLeft: "68%", width: "25vw", height: "28vh", moveClass: "drift-down-left", zIndex: 1, intervalMs: 110 },
  // Mid-left drifting upwards
  { id: 4, startTop: "38%", startLeft: "2%", width: "28vw", height: "32vh", moveClass: "drift-up", zIndex: 3, intervalMs: 100 },
  // Mid-right drifting downwards
  { id: 5, startTop: "32%", startLeft: "72%", width: "26vw", height: "34vh", moveClass: "drift-down", zIndex: 3, intervalMs: 95 },
  // Bottom left drifting rightwards
  { id: 6, startTop: "68%", startLeft: "10%", width: "22vw", height: "28vh", moveClass: "drift-right", zIndex: 2, intervalMs: 130 },
  // Bottom center drifting upwards
  { id: 7, startTop: "72%", startLeft: "40%", width: "28vw", height: "32vh", moveClass: "drift-up-fast", zIndex: 1, intervalMs: 85 },
  // Bottom right drifting up-left
  { id: 8, startTop: "65%", startLeft: "70%", width: "24vw", height: "30vh", moveClass: "drift-up-left", zIndex: 2, intervalMs: 115 },
];

export default function IntroStrobeLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"active" | "fading" | "exit">("active");

  const [tileImages, setTileImages] = useState<number[]>(() =>
    MOVING_TILES.map((_, i) => (i * 2) % POOL_IMAGES.length)
  );

  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Fast image strobing per moving tile
    intervalsRef.current = MOVING_TILES.map((tile, idx) => {
      return setInterval(() => {
        setTileImages((prev) => {
          const next = [...prev];
          next[idx] = (next[idx] + 1 + Math.floor(Math.random() * 2)) % POOL_IMAGES.length;
          return next;
        });
      }, tile.intervalMs);
    });

    // Timeline:
    // 0.0s - 1.8s: Moving & strobing tiles
    // 1.8s: Tiles fade out, logo stays on theme background
    // 2.3s: Full exit curtain
    const t1 = setTimeout(() => {
      setPhase("fading");
      intervalsRef.current.forEach((int) => clearInterval(int));
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase("exit");
    }, 2300);

    const t3 = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    const handleSkip = () => {
      setIsVisible(false);
    };
    window.addEventListener("keydown", handleSkip);

    return () => {
      intervalsRef.current.forEach((int) => clearInterval(int));
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("keydown", handleSkip);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`intro-strobe-overlay phase-${phase}`}
      onClick={() => setIsVisible(false)}
      role="dialog"
      aria-label="idexi intro"
    >
      <style>{introCSS}</style>

      {/* Moving & Strobing Photo Grid */}
      <div className="intro-moving-canvas" aria-hidden="true">
        {MOVING_TILES.map((tile, i) => {
          const imgIndex = tileImages[i] ?? 0;
          const imgSrc = POOL_IMAGES[imgIndex];

          return (
            <div
              key={tile.id}
              className={`intro-moving-tile ${tile.moveClass}`}
              style={
                {
                  top: tile.startTop,
                  left: tile.startLeft,
                  width: tile.width,
                  height: tile.height,
                  zIndex: tile.zIndex,
                } as React.CSSProperties
              }
            >
              <div className="intro-tile-inner">
                <Image
                  src={imgSrc}
                  alt=""
                  fill
                  sizes="35vw"
                  className="intro-tile-img"
                  priority
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bold, Solid, Static Centerpiece Wordmark */}
      <div className="intro-centerpiece">
        <h1 className="intro-logo-text">
          IDEXI<span className="intro-trademark">&trade;</span>
        </h1>
      </div>
    </div>
  );
}

const introCSS = `
  .intro-strobe-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: var(--st-background);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                visibility 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .intro-strobe-overlay.phase-exit {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* ── MOVING PHOTOS CANVAS ── */
  .intro-moving-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .phase-fading .intro-moving-canvas,
  .phase-exit .intro-moving-canvas {
    opacity: 0;
  }

  .intro-moving-tile {
    position: absolute;
    overflow: hidden;
    background: var(--st-background);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3);
    will-change: transform;
  }

  .intro-tile-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .intro-tile-img {
    object-fit: cover;
  }

  /* ── CONTINUOUS SLIDING & DRIFTING MOTION ── */
  .drift-up-left {
    animation: drift-anim-up-left 3s linear infinite;
  }
  .drift-down-right {
    animation: drift-anim-down-right 3.2s linear infinite;
  }
  .drift-down-left {
    animation: drift-anim-down-left 2.8s linear infinite;
  }
  .drift-up {
    animation: drift-anim-up 3.4s linear infinite;
  }
  .drift-down {
    animation: drift-anim-down 3.1s linear infinite;
  }
  .drift-right {
    animation: drift-anim-right 3.3s linear infinite;
  }
  .drift-up-fast {
    animation: drift-anim-up-fast 2.7s linear infinite;
  }

  @keyframes drift-anim-up-left {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-60px, -90px, 0); }
  }
  @keyframes drift-anim-down-right {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(80px, 100px, 0); }
  }
  @keyframes drift-anim-down-left {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-70px, 80px, 0); }
  }
  @keyframes drift-anim-up {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, -110px, 0); }
  }
  @keyframes drift-anim-down {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, 110px, 0); }
  }
  @keyframes drift-anim-right {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(90px, 0, 0); }
  }
  @keyframes drift-anim-up-fast {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-30px, -130px, 0); }
  }

  /* ── CENTERPIECE SOLID LOGO LOCKUP ── */
  .intro-centerpiece {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .intro-logo-text {
    font-family: var(--st-font-display), 'Outfit', -apple-system, sans-serif;
    font-size: clamp(3.8rem, 9.5vw, 8rem);
    font-weight: 900;
    letter-spacing: 0.05em;
    color: var(--st-on-surface);
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
    text-shadow: 0 0 60px var(--st-surface-container-lowest), 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: flex-start;
  }

  .intro-trademark {
    font-size: 0.3em;
    font-weight: 700;
    margin-left: 0.15em;
    margin-top: 0.08em;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .intro-moving-tile {
      width: 40vw !important;
      height: 24vh !important;
    }
  }
`;
