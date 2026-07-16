"use client";

import React, { useEffect, useRef } from "react";

/**
 * Renders rich, layered organic wave shapes that closely match the flowing
 * liquid texture inside the idexi logo circle.
 * Uses canvas for buttery-smooth 60fps animation.
 */
export default function InteractiveWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waveConfigs = [
      { amplitude: 60, frequency: 0.003, speed: 0.008, yBase: 0.35, color: "rgba(20, 30, 90, 0.5)" },
      { amplitude: 50, frequency: 0.004, speed: -0.006, yBase: 0.45, color: "rgba(15, 25, 80, 0.4)" },
      { amplitude: 70, frequency: 0.002, speed: 0.005, yBase: 0.55, color: "rgba(25, 35, 100, 0.35)" },
      { amplitude: 40, frequency: 0.005, speed: -0.009, yBase: 0.65, color: "rgba(10, 20, 70, 0.45)" },
      { amplitude: 55, frequency: 0.003, speed: 0.007, yBase: 0.75, color: "rgba(18, 28, 85, 0.3)" },
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const wave of waveConfigs) {
        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 3) {
          const y =
            wave.yBase * h +
            Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 1.5 + t * wave.speed * 0.7) * wave.amplitude * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      // Faint highlight streak (like the thin glowing arcs in the logo background)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= w; x += 3) {
        const y =
          0.3 * h +
          Math.sin(x * 0.002 + t * 0.004) * 80 +
          Math.cos(x * 0.003 - t * 0.003) * 40;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(49, 196, 243, 0.04)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second thin arc
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y =
          0.5 * h +
          Math.sin(x * 0.0025 + t * 0.006 + 1) * 60 +
          Math.cos(x * 0.004 - t * 0.005) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(100, 130, 220, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}
