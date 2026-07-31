"use client";

import React from "react";
import Link from "next/link";
import { Camera, Shield, Zap, ArrowLeft, ArrowRight, UserCheck, Workflow } from "lucide-react";
import InteractiveWaves from "@/components/InteractiveWaves";

export default function FaceService() {
  const steps = [
    { title: "Opt-In & Snapshot", desc: "Attendees scan a QR code at registration to opt-in and provide a single reference selfie." },
    { title: "Event Capture", desc: "Your professional event photographers capture high-res snaps throughout the venue." },
    { title: "Real-Time Processing", desc: "Our AI engine scans uploaded images, identifies matches in milliseconds, and indexes tags." },
    { title: "Instant Inbox Delivery", desc: "Photos containing the attendee are automatically compiled and delivered directly to their email/SMS." }
  ];

  const targetAudiences = [
    "Gala Dinners & Weddings",
    "Corporate Summits",
    "Concerts & Sports"
  ];

  return (
    <div className="service-page-container">
      <InteractiveWaves />
      
      <div className="container service-page-content">
        {/* Back Link */}
        <Link href="/" className="service-back-link">
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        {/* Hero Section */}
        <div className="service-hero-grid">
          <div className="service-info-col">
            <div className="service-badge">
              <Camera size={14} />
              <span>idexi Face</span>
            </div>
            <h1 className="service-title">Every Attendee&apos;s Photos,<br /><span className="text-gradient">Delivered Instantly</span></h1>
            <p className="service-description">
              Stop making your event guests search through massive folders of photos. Our facial recognition software maps candid event photos and sends them directly to attendees' inboxes in real-time.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></Link>
            </div>
          </div>

          {/* Interactive visual mockup */}
          <div className="service-visual-col glass-card">
            <div className="service-mockup-container">
              <div className="service-mockup-header">
                <span className="service-mockup-dot" style={{ background: "var(--status-error)" }} />
                <span className="service-mockup-dot" style={{ background: "var(--status-warning)" }} />
                <span className="service-mockup-dot" style={{ background: "var(--status-success)" }} />
                <span className="service-mockup-title">Live Photo Pipeline</span>
              </div>
              <div className="service-mockup-body">
                <div className="service-match-item">
                  <div className="service-match-avatar">👩‍💼</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Sarah Jenkins matched in <strong>IMG_4821.jpg</strong></span>
                    <span className="service-match-time">Processed 0.2s ago</span>
                  </div>
                  <span className="service-status-badge">Delivered 📬</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">👨‍💻</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Marcus Chen matched in <strong>IMG_4902.jpg</strong></span>
                    <span className="service-match-time">Processed 0.5s ago</span>
                  </div>
                  <span className="service-status-badge">Delivered 📬</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">👩‍🎨</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Elena Rostova matched in <strong>IMG_4981.jpg</strong></span>
                    <span className="service-match-time">Processing...</span>
                  </div>
                  <span className="service-status-badge" style={{ background: "rgba(49, 196, 243, 0.1)", color: "var(--accent-cyan)" }}>In Progress ⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="service-section">
          <h2 className="service-subsection-title">How It Works</h2>
          <div className="service-steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="service-step-card glass-card">
                <div className="service-step-number">0{idx + 1}</div>
                <h3 className="service-step-title">{step.title}</h3>
                <p className="service-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Value Proposition */}
        <div className="service-benefits-section">
          <div className="service-benefits-grid">
            <div className="service-benefit-item">
              <Zap size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Ultra-Fast Processing</h3>
              <p className="service-benefit-desc">Photos are indexed and processed within seconds of being uploaded by your photography team.</p>
            </div>
            <div className="service-benefit-item">
              <Shield size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Privacy by Design</h3>
              <p className="service-benefit-desc">Attendees opt in with a single reference selfie at registration. Matching runs on idexi&apos;s infrastructure for your event, and you stay in control of your own event&apos;s data. Full privacy documentation is in progress — reach out with questions.</p>
            </div>
            <div className="service-benefit-item">
              <UserCheck size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Branded Deliveries</h3>
              <p className="service-benefit-desc">Customize emails and delivery portals with sponsors' logos and social share integrations.</p>
            </div>
            <div className="service-benefit-item">
              <Workflow size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Built Around Your Workflow</h3>
              <p className="service-benefit-desc">Share your event and venue details plus whatever ticketing or registration system you already use — our team builds a tailored integration and walkthrough around it, no need to replace your existing setup.</p>
            </div>
          </div>
        </div>

        {/* Targets Row — a compact chip list rather than a full card grid, since
            the homepage's Venue Accordion already covers these venue types in
            more depth (photo + description each). This just confirms fit. */}
        <div className="service-section service-audience-compact">
          <h2 className="service-subsection-title">Who Is It For?</h2>
          <div className="service-audience-chips">
            {targetAudiences.map((aud, idx) => (
              <span key={idx} className="service-audience-chip">{aud}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
