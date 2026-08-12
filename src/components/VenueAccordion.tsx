"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Venue {
  code: string;
  name: string;
  desc: string;
  image: string;
}

const venues: Venue[] = [
  {
    code: "01",
    name: "Corporate Summits",
    desc: "Express biometric check-in and live executive audience analytics.",
    image: "/1.-Corporate-Summits.webp",
  },
  {
    code: "02",
    name: "Music Festivals",
    desc: "Manage high-density gate surges and monitor real-time crowd telemetry.",
    image: "/2.-Music-Festivals.webp",
  },
  {
    code: "03",
    name: "University Events",
    desc: "Commencement crowds handled seamlessly with instant ceremony photos.",
    image: "/5.-Universities-_-Graduations.webp",
  },
  {
    code: "04",
    name: "Conferences & Expos",
    desc: "Automate biometric lead delivery and booth foot-traffic metrics.",
    image: "/3.-Conferences-_-Expos.webp",
  },
  {
    code: "05",
    name: "Gala & Private Events",
    desc: "Deliver instant high-res photo galleries directly to VIP guests.",
    image: "/4.-Gala-_-Private-Events.webp",
  },
];

export default function VenueAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = venues[activeIndex];

  return (
    <>
      <style>{venueOverlayCSS}</style>
      <div className="venue-photo-section">
        {/* Full-Bleed Background Photo */}
        <div className="venue-bg-media">
          <Image
            src={active.image}
            alt={active.name}
            fill
            priority
            className="venue-bg-img"
          />
          <div className="venue-bg-overlay" />
        </div>

        <div className="container venue-photo-container">
          {/* Top Bar Overlaid Directly On Photo */}
          <div className="venue-overlay-top-bar">
            <span className="overlay-tag-pill">CHOOSE YOUR VENUE ●</span>
            <span className="overlay-tag-center">VENUE INTELLIGENCE</span>
            <span className="overlay-tag-right text-lime">IDEXI AI</span>
          </div>

          {/* Huge Split Headline Overlaid Directly On Photo */}
          <div className="venue-overlay-split-headline">
            <span className="split-word">Elevate</span>
            <span className="split-word text-lime">Your</span>
            <span className="split-word">Event</span>
            <span className="split-word text-lime">Experience</span>
          </div>

          {/* Bottom Bar Overlaid Directly On Photo */}
          <div className="venue-overlay-bottom-bar">
            {/* Left Action Button & Active Spec */}
            <div className="venue-overlay-left">
              <div className="active-venue-meta">
                <span className="meta-code text-lime">VENUE #{active.code}</span>
                <h3 className="meta-title">{active.name}</h3>
                <p className="meta-desc">{active.desc}</p>
              </div>

              <Link href="/#contact" className="btn btn-lime venue-overlay-btn">
                BOOK A DEMO <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Right Thumbnails Overlaid Directly On Photo */}
            <div className="venue-thumbnails-grid">
              {venues.map((v, i) => (
                <button
                  key={v.code}
                  className={`venue-thumb-card ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="thumb-img-wrap">
                    <Image src={v.image} alt={v.name} fill className="thumb-img" />
                  </div>
                  <div className="thumb-info">
                    <span className="thumb-code text-lime">#{v.code}</span>
                    <span className="thumb-title">{v.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const venueOverlayCSS = `
  .venue-photo-section {
    position: relative;
    min-height: 85vh;
    display: flex;
    align-items: center;
    padding: 6rem 0;
    overflow: hidden;
    background: #07080b;
  }

  .venue-bg-media {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .venue-bg-img {
    object-fit: cover;
    filter: grayscale(80%) contrast(120%) brightness(0.45);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .venue-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 8, 11, 0.75) 0%, rgba(7, 8, 11, 0.45) 50%, rgba(7, 8, 11, 0.95) 100%);
  }

  .venue-photo-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 70vh;
    gap: 3rem;
  }

  /* Top Bar */
  .venue-overlay-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .overlay-tag-pill {
    font-family: var(--font-headings);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #ffffff;
    background: rgba(13, 15, 20, 0.75);
    border: 1px solid var(--grid-line);
    backdrop-filter: blur(10px);
    padding: 0.45rem 1.1rem;
    border-radius: 99px;
  }

  .overlay-tag-center {
    font-family: var(--font-headings);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }

  .overlay-tag-right {
    font-family: var(--font-headings);
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  /* Giant Split Headline Overlaid Directly On Photo */
  .venue-overlay-split-headline {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    text-align: center;
    width: 100%;
    margin: 1.5rem 0;
  }

  .split-word {
    font-family: var(--font-headings);
    font-size: clamp(1.4rem, 3.1vw, 3.8rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Bottom Bar */
  .venue-overlay-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 3rem;
  }

  .venue-overlay-left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 380px;
  }

  .active-venue-meta {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .meta-code {
    font-family: var(--font-headings);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .meta-title {
    font-family: var(--font-headings);
    font-size: 1.8rem;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
  }

  .meta-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .venue-overlay-btn {
    align-self: flex-start;
  }

  /* Right Thumbnails Overlaid Directly On Photo */
  .venue-thumbnails-grid {
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .venue-thumb-card {
    background: rgba(13, 15, 20, 0.75);
    border: 1px solid var(--grid-line);
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: var(--transition-fast);
    min-width: 130px;
  }

  .venue-thumb-card:hover,
  .venue-thumb-card.active {
    border-color: var(--accent-purple-bright);
    background: rgba(13, 15, 20, 0.95);
    transform: translateY(-3px);
  }

  .thumb-img-wrap {
    position: relative;
    width: 100%;
    height: 75px;
    border-radius: 4px;
    overflow: hidden;
  }

  .thumb-img {
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }

  .venue-thumb-card:hover .thumb-img,
  .venue-thumb-card.active .thumb-img {
    filter: grayscale(0%);
  }

  .thumb-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .thumb-code {
    font-family: var(--font-headings);
    font-size: 0.65rem;
    font-weight: 900;
  }

  .thumb-title {
    font-family: var(--font-headings);
    font-size: 0.72rem;
    font-weight: 800;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1024px) {
    .venue-overlay-bottom-bar { flex-direction: column; align-items: flex-start; gap: 2rem; }
    .venue-thumbnails-grid { width: 100%; }
    .venue-overlay-split-headline { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .venue-overlay-split-headline { grid-template-columns: 1fr; text-align: left; }
    .venue-overlay-top-bar { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
  }
`;
