"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera, Activity, Ticket, ArrowUpRight, ArrowRight,
  ShieldCheck, Calendar, Grid
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import EventLifecycleTimeline from "@/components/EventLifecycleTimeline";
import VenueAccordion from "@/components/VenueAccordion";
import FounderCard from "@/components/FounderCard";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "face", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", company: "", service: "face", message: "" });
    }, 4000);
  };

  return (
    <>
      <style>{pageCSS}</style>

      {/* ─── 1. HERO ─── */}
      <Hero />

      {/* ─── 2. SEAMLESS INFINITE MARQUEE TICKER BAR ─── */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {/* Group 1 */}
          <span className="ticker-item">IDEXI PLATFORM</span> <span className="text-lime">///</span>
          <span className="ticker-item">INTELLIGENT EVENT SOLUTIONS</span> <span className="text-lime">///</span>
          <span className="ticker-item">BIOMETRIC PRECISION</span> <span className="text-lime">///</span>
          <span className="ticker-item">REAL-TIME CROWD TELEMETRY</span> <span className="text-lime">///</span>
          
          {/* Group 2 */}
          <span className="ticker-item">IDEXI PLATFORM</span> <span className="text-lime">///</span>
          <span className="ticker-item">INTELLIGENT EVENT SOLUTIONS</span> <span className="text-lime">///</span>
          <span className="ticker-item">BIOMETRIC PRECISION</span> <span className="text-lime">///</span>
          <span className="ticker-item">REAL-TIME CROWD TELEMETRY</span> <span className="text-lime">///</span>

          {/* Group 3 (Duplicated for 100% smooth seamless loop) */}
          <span className="ticker-item">IDEXI PLATFORM</span> <span className="text-lime">///</span>
          <span className="ticker-item">INTELLIGENT EVENT SOLUTIONS</span> <span className="text-lime">///</span>
          <span className="ticker-item">BIOMETRIC PRECISION</span> <span className="text-lime">///</span>
          <span className="ticker-item">REAL-TIME CROWD TELEMETRY</span> <span className="text-lime">///</span>

          {/* Group 4 */}
          <span className="ticker-item">IDEXI PLATFORM</span> <span className="text-lime">///</span>
          <span className="ticker-item">INTELLIGENT EVENT SOLUTIONS</span> <span className="text-lime">///</span>
          <span className="ticker-item">BIOMETRIC PRECISION</span> <span className="text-lime">///</span>
          <span className="ticker-item">REAL-TIME CROWD TELEMETRY</span> <span className="text-lime">///</span>
        </div>
      </div>

      {/* ─── 3. FULL-WIDTH MOODY FEATURE HERO ─── */}
      <section className="moody-feature-section">
        <div className="feature-bg-container">
          <Image
            src="/3.-Conferences-_-Expos.webp"
            alt="Intelligent Event Energy"
            fill
            className="feature-bg-img"
          />
          <div className="feature-overlay" />
        </div>

        <div className="container feature-content">
          <div className="feature-center-box">
            <div className="dot-matrix-center">
              <Grid size={24} className="text-lime" />
            </div>
            <h2 className="feature-title">
              EXPERIENCE THE TRUE ENERGY OF <span className="text-lime">INTELLIGENT EVENTS</span>
            </h2>
            <p className="feature-desc">
              Fast-paced, biometric, and seamless. Automate instant attendee photo delivery, eliminate gate check-in queues, and monitor venue safety telemetry in real time.
            </p>

            <Link href="/#contact" className="btn btn-lime feature-btn">
              BOOK A DEMO <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. SOLUTIONS CARDS SECTION (POWER YOUR EVENT) ─── */}
      <section id="services" className="solutions-section">
        <div className="container">
          {/* Section Header */}
          <div className="solutions-header-row">
            <div>
              <span className="section-label">PRODUCTS</span>
              <h2 className="solutions-title">POWER YOUR EVENT LIKE A PRO</h2>
            </div>
            <a href="#contact" className="solutions-swipe-link">
              EXPLORE ALL ENGINES <ArrowRight size={16} />
            </a>
          </div>

          {/* Solutions Cards Grid */}
          <div className="solutions-grid">
            <ServiceCard
              title="IDEXI FACE"
              tagline="PHOTO MATCHING & DELIVERY"
              description="Facial recognition mapping candid event photography and delivering individual galleries directly to attendees."
              href="/services/face"
              Icon={Camera}
              badge="FACE MATCH"
              statNumber="2.4M+"
              statLabel="photos sorted"
              image="/ai_face_match_photo.png"
            />
            <ServiceCard
              title="IDEXI FLOW"
              tagline="CROWD TELEMETRY & SAFETY"
              description="Passive sensor diagnostics monitoring crowd density, movement vectors, and exit congestion in real time."
              href="/services/flow"
              Icon={Activity}
              badge="TELEMETRY"
              statNumber="850K+"
              statLabel="attendees monitored"
              image="/2.-Music-Festivals.webp"
            />
            <ServiceCard
              title="IDEXI PASS"
              tagline="EXPRESS ACCESS & CREDENTIALS"
              description="Digital wallet registration and express gate scanning replacing ticketing queues with offline-capable verification."
              href="/services/pass"
              Icon={Ticket}
              badge="CHECK-IN"
              statNumber="99.99%"
              statLabel="system uptime"
              image="/3.-Conferences-_-Expos.webp"
            />
          </div>

          <div className="champion-banner text-right">
            OPERATE LIKE A CHAMPION
          </div>
        </div>
      </section>

      {/* ─── 5. FULL-WIDTH VENUE PHOTO OVERLAY SECTION (ELEVATE YOUR EVENT) ─── */}
      <section id="use-cases" style={{ padding: 0 }}>
        <VenueAccordion />
      </section>

      {/* ─── 6. WORKFLOW & SYSTEM PIPELINE ─── */}
      <section id="how-it-works" className="workflow-section">
        <div className="container">
          <div className="solutions-header-row">
            <div>
              <span className="section-label">SYSTEM PIPELINE</span>
              <h2 className="solutions-title">INTEGRATED EVENT LIFECYCLE</h2>
            </div>
          </div>
          <EventLifecycleTimeline />
        </div>
      </section>

      {/* ─── 7. FOUNDERS LEADERSHIP ─── */}
      <section id="about" className="founders-section">
        <div className="container">
          <div className="solutions-header-row">
            <div>
              <span className="section-label">ENGINEERING LEADERSHIP</span>
              <h2 className="solutions-title">MEET THE FOUNDERS</h2>
            </div>
          </div>

          <div className="founders-grid">
            <FounderCard
              name="Saif Alqdessi"
              role="Co-Founder, Tech Lead"
              image="/saif.webp"
              email="alqdessi.qp@gmail.com"
              linkedin="https://www.linkedin.com/in/saif-alqdess"
            />
            <FounderCard
              name="Jafar Alkhadrawi"
              role="Co-Founder, Business Lead"
              image="/jafar.webp"
              email="khadrawi.jafer@gmail.com"
              linkedin="https://www.linkedin.com/in/jafar-alkhadrawi"
            />
          </div>
        </div>
      </section>

      {/* ─── 8. CONTACT DEMO SECTION ─── */}
      <section id="contact" className="contact-volt-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-label">RESERVE DEMO</span>
            <h2>SCHEDULE A TECHNICAL ASSESSMENT</h2>
            <p>Deploy Idexi Face, Flow, and Pass hardware at your next conference, festival, or summit.</p>
            <div className="contact-bullets">
              <div className="bullet-item">
                <Calendar size={22} className="text-lime" />
                <div>
                  <h4>System Walkthrough</h4>
                  <p>Live diagnostics demo of biometric photo pipeline and crowd telemetry.</p>
                </div>
              </div>
              <div className="bullet-item">
                <ShieldCheck size={22} className="text-lime" />
                <div>
                  <h4>Integration Scoping</h4>
                  <p>Custom workflows tailored to your existing registration engine.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            {formSubmitted ? (
              <div className="form-success">
                <h3 className="text-lime">DEMO CONFIRMED</h3>
                <p>An integration engineer will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>RESERVE A DEMO</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Jane Doe" />
                  </div>
                  <div className="form-group">
                    <label>Work Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="jane@company.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Organization</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleInputChange} placeholder="Events Inc." />
                  </div>
                  <div className="form-group">
                    <label>Primary Requirement</label>
                    <select name="service" value={formData.service} onChange={handleInputChange}>
                      <option value="face">IDEXI FACE (Photo Matching)</option>
                      <option value="flow">IDEXI FLOW (Crowd Telemetry)</option>
                      <option value="pass">IDEXI PASS (Express Check-in)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Event Specifications</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} placeholder="Attendee count, venue specs, integration needs..." />
                </div>
                <button type="submit" className="btn btn-lime submit-btn">
                  RESERVE A DEMO <ArrowUpRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const pageCSS = `
  /* Ticker Bar Infinite Marquee */
  @keyframes tickerMarquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .ticker-bar {
    background: #0d0f14;
    border-top: 1px solid var(--grid-line);
    border-bottom: 1px solid var(--grid-line);
    padding: 0.85rem 0;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }

  .ticker-track {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    font-family: var(--font-headings);
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #ffffff;
    animation: tickerMarquee 25s linear infinite;
    will-change: transform;
  }

  .ticker-track:hover {
    animation-play-state: paused;
  }

  .ticker-item {
    display: inline-block;
  }

  /* Moody Feature Hero */
  .moody-feature-section {
    position: relative;
    padding: 8rem 0;
    background: #07080b;
  }

  .feature-bg-container {
    position: absolute;
    inset: 0;
  }

  .feature-bg-img {
    object-fit: cover;
    filter: grayscale(100%) brightness(0.35);
  }

  .feature-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(7, 8, 11, 0.4) 0%, #07080b 90%);
  }

  .feature-content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
  }

  .feature-center-box {
    max-width: 720px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .feature-title {
    font-family: var(--font-headings);
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    font-weight: 900;
    color: #ffffff;
    line-height: 1.05;
  }

  .feature-desc {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .feature-btn {
    margin-top: 1rem;
    padding: 1rem 2.5rem !important;
  }

  /* Solutions Section */
  .solutions-section {
    padding: 6rem 0;
    background: #07080b;
  }

  .solutions-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
  }

  .section-label {
    font-family: var(--font-headings);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--accent-purple-bright);
    display: block;
    margin-bottom: 0.4rem;
  }

  .solutions-title {
    font-family: var(--font-headings);
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: #ffffff;
  }

  .solutions-swipe-link {
    font-family: var(--font-headings);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s ease;
  }

  .solutions-swipe-link:hover {
    color: var(--accent-purple-bright);
  }

  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.8rem;
  }

  .champion-banner {
    font-family: var(--font-headings);
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-top: 3rem;
  }

  /* Elevate Venue Section */
  .elevate-venue-section {
    position: relative;
    padding: 7rem 0;
    background: #07080b;
  }

  .elevate-bg-container {
    position: absolute;
    inset: 0;
  }

  .elevate-bg-img {
    object-fit: cover;
    filter: grayscale(100%) brightness(0.25);
  }

  .elevate-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #07080b 0%, rgba(7, 8, 11, 0.7) 50%, #07080b 100%);
  }

  .elevate-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  .elevate-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag-pill {
    font-family: var(--font-headings);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    padding: 0.4rem 1rem;
    border-radius: 99px;
  }

  .tag-center {
    font-family: var(--font-headings);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }

  .tag-right {
    font-family: var(--font-headings);
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .split-headline-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    text-align: center;
    width: 100%;
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

  /* Founders & Workflow */
  .workflow-section, .founders-section {
    padding: 6rem 0;
    background: #07080b;
  }

  .founders-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }

  /* Contact Section */
  .contact-volt-section {
    padding: 6rem 0;
    background: #07080b;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4rem;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.2rem;
  }

  .contact-bullets {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .bullet-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .bullet-item h4 {
    font-size: 1.05rem;
    color: #ffffff;
  }

  .contact-form-card {
    background: #0d0f14;
    border: 1px solid var(--grid-line);
    padding: 2.5rem;
    border-radius: 12px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.85rem 1.1rem;
    background: #07080b;
    border: 1px solid var(--grid-line);
    border-radius: 6px;
    color: #fff;
    font-size: 0.9rem;
    font-family: var(--font-body);
    outline: none;
    transition: border-color 0.2s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: var(--accent-purple-bright);
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
    padding: 1rem !important;
    margin-top: 0.5rem;
  }

  @media (max-width: 1024px) {
    .solutions-grid { grid-template-columns: 1fr; }
    .split-headline-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .founders-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  @media (max-width: 768px) {
    .solutions-header-row { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
    .elevate-top-bar { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
    .split-word { font-size: clamp(1.8rem, 7vw, 3.5rem); }
    .moody-feature-section { padding: 5rem 0; }
    .solutions-section, .workflow-section, .founders-section, .contact-volt-section { padding: 4rem 0; }
    .elevate-venue-section { padding: 4rem 0; }
  }

  @media (max-width: 600px) {
    .split-headline-grid { grid-template-columns: 1fr; text-align: left; }
    .form-row { grid-template-columns: 1fr; }
    .contact-form-card { padding: 1.5rem; }
    .champion-banner { text-align: left; font-size: 1rem; }
  }
`;
