"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Grid } from "lucide-react";

export default function Hero() {
  return (
    <>
      <style>{heroCSS}</style>
      <section className="volt-hero">
        {/* Background Overlay */}
        <div className="hero-bg-container">
          <Image
            src="/hero_event_crowd.png"
            alt="Idexi AI Event Intelligence Arena"
            fill
            priority
            className="hero-bg-img"
          />
          <div className="hero-overlay" />
        </div>

        <div className="container hero-content">
          {/* Top 3-Pillar Headline Row */}
          <div className="pillar-grid">
            <div className="pillar-col">
              <h1 className="pillar-title">Precision<span className="dot-accent">.</span></h1>
              <p className="pillar-desc">
                Biometric face matching in milliseconds across high-density venue fields.
              </p>
            </div>

            <div className="pillar-col">
              <h1 className="pillar-title text-lime">Intelligence<span className="dot-accent">.</span></h1>
              <p className="pillar-desc">
                Enter the event space and claim zero entry queue friction.
              </p>
            </div>

            <div className="pillar-col">
              <h1 className="pillar-title">Result<span className="dot-accent">.</span></h1>
              <p className="pillar-desc">
                Master crowd analytics and elevate operational performance limits.
              </p>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div className="hero-bottom-bar">
            {/* Left Floating Stat Card */}
            <div className="hero-floating-card">
              <div className="floating-card-header">
                <span className="card-tag">YOUR EVENT HUB</span>
                <Grid size={16} className="text-lime" />
              </div>
              <div className="floating-card-body">
                <div className="metric-large">2.4M+</div>
                <div className="metric-badge">
                  <span className="star-rating">4.9 ★</span> POSITIVE METRICS
                </div>
              </div>
            </div>

            {/* Right Signature & CTA */}
            <div className="hero-action-right">
              <div className="signature-box">
                <span className="sig-name">Saif Alqdessi & Jafar Alkhadrawi</span>
                <span className="sig-title">AI Engineers & Idexi Founders</span>
              </div>
              <Link href="/#contact" className="btn btn-lime cta-hero-btn">
                BOOK A DEMO <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const heroCSS = `
  .volt-hero {
    position: relative;
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    padding: 8.5rem 0 3.5rem 0;
    overflow: hidden;
    background: #07080b;
  }

  .hero-bg-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-bg-img {
    object-fit: cover;
    object-position: center 20%;
    filter: grayscale(80%) contrast(120%) brightness(0.55);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 8, 11, 0.75) 0%, rgba(7, 8, 11, 0.5) 50%, #07080b 100%);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    width: 100%;
  }

  /* 3-Pillar Headline Grid — Zero Overflow */
  .pillar-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
    width: 100%;
  }

  .pillar-col {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-width: 0;
  }

  .pillar-title {
    font-family: var(--font-headings);
    font-size: clamp(1.3rem, 2.7vw, 3.2rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .pillar-desc {
    font-size: 0.92rem;
    color: var(--text-secondary);
    max-width: 300px;
    line-height: 1.5;
  }

  /* Bottom Bar */
  .hero-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    width: 100%;
  }

  .hero-floating-card {
    background: rgba(13, 15, 20, 0.9);
    border: 1px solid var(--grid-line);
    border-radius: 8px;
    padding: 1.2rem 1.6rem;
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 220px;
  }

  .floating-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-tag {
    font-family: var(--font-headings);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .metric-large {
    font-family: var(--font-headings);
    font-size: 2.2rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1;
  }

  .metric-badge {
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .star-rating {
    color: var(--accent-purple-bright);
  }

  /* Right Action Box */
  .hero-action-right {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
  }

  .signature-box {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .sig-name {
    font-family: var(--font-headings);
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--accent-purple-bright);
    letter-spacing: 0.04em;
  }

  .sig-title {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .cta-hero-btn {
    font-size: 0.88rem !important;
    padding: 0.95rem 2rem !important;
  }

  @media (max-width: 1050px) {
    .volt-hero { padding-top: 7.5rem; min-height: auto; }
    .pillar-grid { grid-template-columns: 1fr; gap: 2rem; }
    .pillar-title { font-size: clamp(2.2rem, 7vw, 4rem); }
    .hero-bottom-bar { flex-direction: column; align-items: stretch; gap: 1.5rem; }
    .hero-action-right { flex-direction: column; align-items: stretch; gap: 1rem; }
    .signature-box { text-align: left; }
    .hero-floating-card { width: 100%; }
    .cta-hero-btn { width: 100%; justify-content: center; }
  }

  @media (max-width: 480px) {
    .volt-hero { padding: 6.5rem 0 2.5rem 0; }
    .pillar-desc { max-width: 100%; }
  }
`;
