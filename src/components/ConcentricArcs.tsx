"use client";

import React from "react";

interface ConcentricArcsProps {
  size?: number;
  count?: number;
}

/**
 * Concentric wifi/signal arcs matching the logo's bold white arc motif.
 * Three thick arcs pulse outward from a glowing center dot.
 */
export default function ConcentricArcs({ size = 280, count = 3 }: ConcentricArcsProps) {
  const arcs = Array.from({ length: count }, (_, i) => i);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        viewBox="0 0 280 280"
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="arcGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(49,196,243,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Soft glow backdrop */}
        <circle cx="140" cy="140" r="130" fill="url(#arcGlow)" />

        {/* Static decorative rings (always visible) */}
        {[100, 80, 58, 38].map((r, i) => (
          <circle
            key={`static-${i}`}
            cx="140"
            cy="140"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Bold animated arcs matching the logo — thick white strokes */}
        {arcs.map((i) => {
          const r = 40 + i * 30;
          const circumference = 2 * Math.PI * r;
          // Each arc is roughly 120° (a third of the circle)
          const dashLength = circumference * 0.33;
          const gapLength = circumference * 0.67;
          const delay = i * 1.2;
          const opacity = 0.8 - i * 0.15;
          const width = 7 - i * 1.2;

          return (
            <circle
              key={`arc-${i}`}
              cx="140"
              cy="140"
              r={r}
              fill="none"
              stroke="white"
              strokeWidth={width}
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${gapLength}`}
              opacity={opacity}
              style={{
                transformOrigin: "140px 140px",
                animation: `spinArc ${8 + i * 3}s linear infinite, pulseOpacity ${3 + i}s ease-in-out infinite alternate`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Cyan accent teardrop / splash in the top-left like the logo */}
        <ellipse
          cx="85"
          cy="75"
          rx="22"
          ry="30"
          transform="rotate(-30 85 75)"
          fill="rgba(49,196,243,0.15)"
          style={{
            animation: "floatBlob 8s ease-in-out infinite alternate",
          }}
        />

        {/* Center glowing dot */}
        <circle cx="140" cy="140" r="6" fill="#31c4f3">
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="140" r="14" fill="none" stroke="rgba(49,196,243,0.3)" strokeWidth="2">
          <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      <style>{`
        @keyframes spinArc {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseOpacity {
          0% { opacity: 0.4; }
          100% { opacity: 0.85; }
        }
        @keyframes floatBlob {
          0% { transform: translate(0, 0) rotate(-30deg) scale(1); }
          50% { transform: translate(5px, -8px) rotate(-25deg) scale(1.1); }
          100% { transform: translate(-3px, 3px) rotate(-35deg) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
