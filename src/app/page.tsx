"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera, Activity, Ticket, ArrowRight, Sparkles, CheckCircle2,
  Users, ShieldCheck, Calendar, Layers, ChevronRight
} from "lucide-react";
import InteractiveWaves from "@/components/InteractiveWaves";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import EventLifecycleTimeline from "@/components/EventLifecycleTimeline";

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

  const industries = [
    { name: "Corporate Summits", desc: "Express check-ins and live intelligence for high-profile events.", icon: ShieldCheck },
    { name: "Music Festivals", desc: "Manage high-density gates and monitor safety in real-time.", icon: Users },
    { name: "Conferences & Expos", desc: "Automate lead capture and attendee journey tracking.", icon: Layers },
    { name: "Gala & Private Events", desc: "Automatic private photo albums delivered to each guest.", icon: Camera },
  ];

  return (
    <>
      <style>{pageCSS}</style>

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── SERVICES ─── */}
      <section id="services">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our <span className="text-gradient">AI Engines</span></h2>
            <p>Three integrated products for photography delivery, queue reduction, and crowd analytics.</p>
          </div>
          <div className="services-grid">
            <ServiceCard title="idexi Face" tagline="Attendee Delight" description="AI face recognition scans event photography in real-time, matching and auto-emailing attendees their personal gallery instantly." href="/services/face" Icon={Camera} badge="Popular" accentColor="var(--accent-face)" />
            <ServiceCard title="idexi Flow" tagline="Operations & Safety" description="Crowd diagnostic telemetry monitors density, bottlenecks, and foot traffic to keep large-scale venues safe and running." href="/services/flow" Icon={Activity} badge="Enterprise" accentColor="var(--accent-flow)" />
            <ServiceCard title="idexi Pass" tagline="Seamless Access" description="Digital registration and express check-in replaces ticketing lines with secure biometric scans and offline smart verification." href="/services/pass" Icon={Ticket} badge="New" accentColor="var(--accent-pass)" />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="hiw-section">
        <div className="container">
          <div className="section-header">
            <h2>Integrated Event <span className="text-gradient">Lifecycle</span></h2>
            <p>Watch how our products connect to create a seamless attendee journey.</p>
          </div>
          <EventLifecycleTimeline />
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section id="use-cases">
        <div className="container">
          <div className="section-header">
            <h2>Engineered For <span className="text-gradient">Every Venue</span></h2>
            <p>From corporate conferences to heavy-traffic music festivals.</p>
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={i} className="industry-card glass-card">
                  <div className="ind-icon-box"><Icon size={22} /></div>
                  <h3>{ind.name}</h3>
                  <p>{ind.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { num: "2.4M+", label: "Photos Sorted & Emailed" },
            { num: "850k+", label: "Attendees Welcomed" },
            { num: "99.99%", label: "Uptime Access Control" },
            { num: "120+", label: "Global Event Partners" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="about-section">
        <InteractiveWaves />
        <div className="container about-grid">
          <div className="about-left">
            <h2>Our <span className="text-gradient">Story</span></h2>
            <p>At idexi, we believe in frictionless gatherings. Events are for connection, yet organizers are bogged down by ticketing errors, crowd safety risks, and slow photo distribution.</p>
            <p>We built an integrated suite of AI-first solutions to put intelligence back into physical spaces — powering events that feel entirely magic.</p>
            <div className="founders-row">
              <div className="founder-sig">
                <div className="founder-avatar">SA</div>
                <div>
                  <div className="founder-name">Saif Alqdessi</div>
                  <div className="founder-title">Co-Founder, Tech Lead</div>
                </div>
              </div>
              <div className="founder-sig">
                <div className="founder-avatar">JA</div>
                <div>
                  <div className="founder-name">Jafar Alkhadrawi</div>
                  <div className="founder-title">Co-Founder, Business Lead</div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-right glass-card">
            <h3>Why Partners Choose Us</h3>
            <ul className="about-list">
              <li><CheckCircle2 size={18} /> <span>Edge Diagnostics — works during total network blackout.</span></li>
              <li><CheckCircle2 size={18} /> <span>Privacy First — fully GDPR & CCPA compliant biometric caching.</span></li>
              <li><CheckCircle2 size={18} /> <span>Seamless Integrations — plugs into your CRM, ticketing, or email provider.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Optimize Your <span className="text-gradient">Next Event</span></h2>
            <p>Have an upcoming conference, festival, or summit? Schedule a walkthrough with our team.</p>
            <div className="contact-bullets">
              <div className="bullet-item">
                <Calendar size={20} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <h4>Personalized Walkthrough</h4>
                  <p>See idexi Face and Pass diagnostics live in action.</p>
                </div>
              </div>
              <div className="bullet-item">
                <ShieldCheck size={20} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <h4>Tailored Integration Plan</h4>
                  <p>Custom workflows matching your ticketing engine and venues.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card glass-card">
            {formSubmitted ? (
              <div className="form-success">
                <Sparkles size={48} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
                <h3>Demo Request Received!</h3>
                <p>An event strategist will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Schedule a Demo</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Jane Doe" />
                  </div>
                  <div className="form-group">
                    <label>Work Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="jane@company.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleInputChange} placeholder="Events Inc." />
                  </div>
                  <div className="form-group">
                    <label>Solution Interest</label>
                    <select name="service" value={formData.service} onChange={handleInputChange}>
                      <option value="face">idexi Face (AI Photos)</option>
                      <option value="flow">idexi Flow (Crowd Safety)</option>
                      <option value="pass">idexi Pass (Check-in)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>About Your Event</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} placeholder="Attendee count, venue, special needs..." />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  Book Free Consultation <ChevronRight size={18} />
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
  /* ═══ SECTION HEADERS ═══ */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
  }
  .section-header h2 {
    margin-bottom: 1rem;
    color: #fff;
  }
  .section-header p {
    color: var(--text-secondary);
    font-size: 1.08rem;
  }

  /* ═══ SERVICES GRID ═══ */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  /* ═══ HOW IT WORKS ═══ */
  .hiw-section {
    background: linear-gradient(180deg, rgba(6,9,32,0.4), transparent, rgba(6,9,32,0.4));
  }
  /* ═══ INDUSTRIES ═══ */
  .industries-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .industry-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .industry-card h3 {
    font-size: 1.15rem;
    color: #fff;
  }
  .industry-card p {
    font-size: 0.9rem;
    line-height: 1.55;
  }
  .ind-icon-box {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: rgba(49,196,243,0.06);
    border: 1px solid rgba(49,196,243,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-cyan);
  }

  /* ═══ STATS ═══ */
  .stats-section {
    background: rgba(6,9,32,0.7);
    border-top: 1px solid rgba(49,196,243,0.08);
    border-bottom: 1px solid rgba(49,196,243,0.08);
    padding: 4.5rem 1.5rem;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .stat-num {
    font-size: 3rem;
    font-weight: 800;
    font-family: var(--font-headings);
    background: linear-gradient(135deg, var(--accent-cyan) 0%, #ffffff 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .stat-label {
    font-size: 0.88rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 500;
  }

  /* ═══ ABOUT ═══ */
  .about-section {
    position: relative;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .about-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .about-left h2 { color: #fff; }
  .about-left p {
    font-size: 1.02rem;
    line-height: 1.7;
  }
  .founders-row {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .founder-sig {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  .founder-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
  }
  .founder-name { font-weight: 700; color: #fff; font-size: 1rem; }
  .founder-title { font-size: 0.8rem; color: var(--text-secondary); }
  .about-right h3 {
    font-family: var(--font-headings);
    color: #fff;
    margin-bottom: 1.5rem;
  }
  .about-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }
  .about-list li {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }
  .about-list li svg {
    color: var(--accent-cyan);
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* ═══ CONTACT ═══ */
  .contact-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4rem;
  }
  .contact-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-info h2 { color: #fff; margin-bottom: 1rem; }
  .contact-info > p { margin-bottom: 2rem; }
  .contact-bullets {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .bullet-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .bullet-item h4 {
    font-size: 1.05rem;
    color: #fff;
    font-family: var(--font-headings);
  }
  .bullet-item p {
    font-size: 0.88rem;
    line-height: 1.5;
  }
  .contact-form-card {
    padding: 2.5rem;
  }
  .form-success {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
  .form-success h3 { color: #fff; margin-bottom: 0.5rem; }
  .form-success p { font-size: 0.95rem; }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }
  .contact-form h3 {
    font-size: 1.6rem;
    color: #fff;
    font-family: var(--font-headings);
    margin-bottom: 0.5rem;
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
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.85rem 1.1rem;
    background: rgba(11, 18, 50, 0.45);
    border: 1.5px solid rgba(49, 196, 243, 0.15);
    border-radius: 12px;
    color: #fff;
    font-size: 0.92rem;
    font-family: var(--font-body);
    transition: var(--transition-smooth);
    outline: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: var(--accent-cyan);
    background: rgba(49, 196, 243, 0.08);
    box-shadow: 0 0 20px rgba(49, 196, 243, 0.25);
  }
  .form-group select option {
    background: #111d50;
    color: #fff;
  }
  .submit-btn {
    width: 100%;
    justify-content: center;
    padding: 0.95rem;
    margin-top: 0.5rem;
  }

  /* ═══ RESPONSIVE ═══ */
  @media (max-width: 1024px) {
    .services-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
    .industries-grid { grid-template-columns: repeat(2, 1fr); }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .about-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .industries-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .form-row { grid-template-columns: 1fr; }
  }
`;
