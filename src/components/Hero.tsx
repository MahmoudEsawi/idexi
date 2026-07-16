"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <>
      <style>{heroCSS}</style>
      <section className="premium-hero">
        {/* --- LAYERED SVG BACKGROUND SYSTEM --- */}
        <div className="hero-bg-layer bg-gradient-base" />

        <svg className="hero-layered-waves" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Soft Shadow filter to create depth */}
            <filter id="waveShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.55"/>
            </filter>
            
            {/* Diagonal linear gradients matching brand guide */}
            <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#31c4f3" />
              <stop offset="100%" stopColor="#29377b" />
            </linearGradient>
            
            <linearGradient id="darkNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141f54" />
              <stop offset="100%" stopColor="#0b1130" />
            </linearGradient>

            <linearGradient id="midNavyGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c2d75" />
              <stop offset="100%" stopColor="#0d163d" />
            </linearGradient>
          </defs>

          {/* Layer 1: Base Dark Waves */}
          <path d="M-100,300 C250,150 400,650 850,500 C1150,400 1300,700 1600,650 L1600,850 L-100,850 Z" fill="url(#darkNavyGrad)" opacity="0.9" />

          {/* Layer 2: Mid Wave with drop shadow */}
          <path d="M1600,150 C1150,80 1000,500 650,400 C350,300 150,750 -200,700 L-200,850 L1600,850 Z" fill="url(#midNavyGrad)" filter="url(#waveShadow)" />

          {/* Layer 3: Thin overlay neon paths */}
          <path
            d="M -100,280 C 300,130 600,530 1100,230 C 1300,130 1500,180 1600,130"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            opacity="0.15"
            strokeDasharray="4 4"
            className="hairline-dash-anim"
          />
          <path
            d="M -100,380 C 400,280 500,720 1050,480 C 1250,380 1450,720 1600,670"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="1.5"
            opacity="0.25"
          />

          {/* Layer 4: Top-left vibrant organic accent wave (crisp boundary, gradient fill, drop shadow) */}
          <path d="M-50,-50 C120,-50 240,60 220,170 C200,260 80,260 -50,230 Z" fill="url(#cyanBlueGrad)" filter="url(#waveShadow)" />

          {/* Layer 5: Bottom-right vibrant organic accent wave (crisp boundary, gradient fill, drop shadow) */}
          <path d="M1490,850 C1380,850 1200,760 1240,620 C1280,510 1420,510 1510,530 Z" fill="url(#cyanBlueGrad)" filter="url(#waveShadow)" />
        </svg>

        <div className="container hero-container-grid">
          {/* Left Column: Asymmetric Typography and CTAs */}
          <div className="hero-text-block">
            {/* Treatment 2: Bold Display Style */}
            <h1 className="type-display">
              Frictionless event flow, entry, and instant photo sorting.
            </h1>

            <div className="hero-actions-row">
              {/* Only one CTA gets the gradient treatment */}
              <a href="#contact" className="btn btn-primary cta-demo">
                Book a Demo <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn btn-glass cta-explore">
                Explore Solutions
              </a>
            </div>
          </div>

          {/* Right Column: Large Concentric Signal Arcs Signature Visual + Photo */}
          <div className="hero-visual-block">
            {/* Large Concentric Arcs container */}
            <div className="large-signature-arcs-wrapper">
              <svg viewBox="0 0 500 500" className="signature-arcs-svg">
                {/* Outer pulsing arcs */}
                {[220, 180, 140, 100].map((r, idx) => (
                  <circle
                    key={idx}
                    cx="250"
                    cy="250"
                    r={r}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth={idx === 0 ? "8" : idx === 1 ? "6.5" : idx === 2 ? "5" : "3.5"}
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * r * 0.3} ${2 * Math.PI * r * 0.7}`}
                    className={`sig-arc-circle arc-delay-${idx}`}
                  />
                ))}
                
                {/* Solid decorative rings */}
                {[200, 160, 120, 80].map((r, idx) => (
                  <circle
                    key={`dec-${idx}`}
                    cx="250"
                    cy="250"
                    r={r}
                    fill="none"
                    stroke="rgba(49, 196, 243, 0.08)"
                    strokeWidth="1.5"
                  />
                ))}
                
                {/* Central signal dot and core */}
                <circle cx="250" cy="250" r="10" fill="var(--accent-cyan)" className="core-dot-pulse" />
                <circle cx="250" cy="250" r="24" fill="none" stroke="rgba(49, 196, 243, 0.25)" strokeWidth="3" className="core-ring-pulse" />
              </svg>

              {/* Cyan Teardrop Graphic in top left matching logo */}
              <div className="sig-cyan-splash" />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

const heroCSS = `
  .premium-hero {
    position: relative;
    min-height: 98vh;
    display: flex;
    align-items: center;
    padding: 8rem 1.5rem 6rem 1.5rem;
    overflow: hidden;
    z-index: 1;
  }

  /* --- LAYERED BACKGROUND SYSTEM --- */
  .bg-gradient-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--bg-gradient-start) 0%, var(--bg-deep) 100%);
    z-index: -4;
  }

  .hero-layered-waves {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
    pointer-events: none;
  }

  .hairline-dash-anim {
    stroke-dashoffset: 0;
    animation: flowDash 30s linear infinite;
  }

  @keyframes flowDash {
    to {
      stroke-dashoffset: -1000;
    }
  }

  /* --- HERO CONTAINER --- */
  .hero-container-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 5;
  }

  /* --- LEFT COLUMN: TYPOGRAPHY --- */
  .hero-text-block {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    max-width: 620px;
  }

  /* Treatment 1: Clean Utility Style */
  .type-utility {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-headings);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--accent-cyan);
    background: rgba(49, 196, 243, 0.08);
    border: 1.5px solid rgba(49, 196, 243, 0.2);
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    align-self: flex-start;
  }

  .utility-icon {
    animation: pulse 2s infinite alternate;
  }

  /* Treatment 2: Bold Display Style */
  .type-display {
    font-family: var(--font-headings);
    font-size: clamp(2.3rem, 4.5vw, 3.5rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  /* Treatment 3: Italic Accent / Tagline Style */
  .type-accent-italic {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--text-secondary);
    line-height: 1.7;
    border-left: 2px solid var(--accent-cyan);
    padding-left: 1.2rem;
    margin: 0;
  }

  .hero-actions-row {
    display: flex;
    gap: 1.2rem;
    margin-top: 0.8rem;
  }

  .cta-demo {
    box-shadow: 0 4px 20px rgba(49, 196, 243, 0.35);
  }

  .cta-explore {
    /* Styles are handled by btn-glass class globally */
  }

  /* --- RIGHT COLUMN: VISUAL BLOCK --- */
  .hero-visual-block {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Large Concentric Signal Arcs Signature Visual */
  .large-signature-arcs-wrapper {
    position: relative;
    width: 480px;
    height: 480px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.95;
  }

  .signature-arcs-svg {
    width: 100%;
    height: 100%;
  }

  .sig-arc-circle {
    transform-origin: 250px 250px;
  }

  .arc-delay-0 {
    animation: rotateArc 12s linear infinite;
    transform: rotate(0deg);
  }

  .arc-delay-1 {
    animation: rotateArc 16s linear infinite reverse;
    transform: rotate(45deg);
  }

  .arc-delay-2 {
    animation: rotateArc 20s linear infinite;
    transform: rotate(90deg);
  }

  .arc-delay-3 {
    animation: rotateArc 24s linear infinite reverse;
    transform: rotate(135deg);
  }

  @keyframes rotateArc {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .core-dot-pulse {
    animation: pulseCore 3s ease-in-out infinite alternate;
  }

  .core-ring-pulse {
    transform-origin: 250px 250px;
    animation: scaleRing 3s ease-in-out infinite;
  }

  @keyframes pulseCore {
    0% { r: 8px; fill: var(--accent-cyan); }
    100% { r: 12px; fill: #ffffff; filter: drop-shadow(0 0 8px var(--accent-cyan)); }
  }

  @keyframes scaleRing {
    0% { transform: scale(0.9); opacity: 0.8; }
    50% { opacity: 0.3; }
    100% { transform: scale(1.4); opacity: 0; }
  }

  .sig-cyan-splash {
    position: absolute;
    top: 15%;
    left: 15%;
    width: 80px;
    height: 100px;
    background: radial-gradient(circle, rgba(49, 196, 243, 0.22) 0%, transparent 70%);
    transform: rotate(-35deg);
    pointer-events: none;
  }



  /* --- RESPONSIVE ADJUSTMENTS --- */
  @media (max-width: 1200px) {
    .large-signature-arcs-wrapper {
      width: 440px;
      height: 440px;
    }
  }

  @media (max-width: 991px) {
    .premium-hero {
      padding-top: 7rem;
      min-height: auto;
    }

    .hero-container-grid {
      grid-template-columns: 1fr;
      gap: 3.5rem;
      text-align: center;
    }

    .hero-text-block {
      max-width: 100%;
      align-items: center;
    }

    .type-accent-italic {
      text-align: left;
    }

    .hero-actions-row {
      justify-content: center;
    }

    .hero-visual-block {
      margin-top: 1rem;
    }

    }

  @media (max-width: 480px) {
    .hero-actions-row {
      flex-direction: column;
      width: 100%;
      gap: 0.8rem;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 580px) {
    .large-signature-arcs-wrapper {
      width: 280px !important;
      height: 280px !important;
    }
  }
`;
