"use client";

import React from "react";
import Link from "next/link";
import { Camera, Shield, Zap, ArrowLeft, ArrowRight, UserCheck } from "lucide-react";
import InteractiveWaves from "@/components/InteractiveWaves";

export default function FaceService() {
  const steps = [
    { title: "Opt-In & Snapshot", desc: "Attendees scan a QR code at registration to opt-in and provide a single reference selfie." },
    { title: "Event Capture", desc: "Your professional event photographers capture high-res snaps throughout the venue." },
    { title: "Real-Time Processing", desc: "Our AI engine scans uploaded images, identifies matches in milliseconds, and indexes tags." },
    { title: "Instant Inbox Delivery", desc: "Photos containing the attendee are automatically compiled and delivered directly to their email/SMS." }
  ];

  const targetAudiences = [
    { title: "Gala Dinners & Weddings", desc: "Give guests high-quality candid pictures of themselves from their special night." },
    { title: "Corporate Summits", desc: "Increase sponsor engagement and social shares by getting photos to executives instantly." },
    { title: "Concerts & Sports", desc: "Scale photo delivery to tens of thousands of fans without manual searching." }
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
            <h1 className="service-title">AI Photo Delivery <br /><span className="text-gradient">For Happy Attendees</span></h1>
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
                <span className="service-mockup-dot" style={{ background: "#ff5f56" }} />
                <span className="service-mockup-dot" style={{ background: "#ffbd2e" }} />
                <span className="service-mockup-dot" style={{ background: "#27c93f" }} />
                <span className="service-mockup-title">Live Photo Pipeline</span>
              </div>
              <div className="service-mockup-body">
                <div className="service-match-item">
                  <div className="service-match-avatar">👩‍💼</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Sarah Jenkins matched in **IMG_4821.jpg**</span>
                    <span className="service-match-time">Processed 0.2s ago</span>
                  </div>
                  <span className="service-status-badge">Delivered 📬</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">👨‍💻</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Marcus Chen matched in **IMG_4902.jpg**</span>
                    <span className="service-match-time">Processed 0.5s ago</span>
                  </div>
                  <span className="service-status-badge">Delivered 📬</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">👩‍🎨</div>
                  <div className="service-match-details">
                    <span className="service-match-label">Elena Rostova matched in **IMG_4981.jpg**</span>
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
              <h3 className="service-benefit-title">Privacy-First Approach</h3>
              <p className="service-benefit-desc">GDPR-compliant double opt-in. Biometric face profiles are fully deleted 48 hours after the event.</p>
            </div>
            <div className="service-benefit-item">
              <UserCheck size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Branded Deliveries</h3>
              <p className="service-benefit-desc">Customize emails and delivery portals with sponsors' logos and social share integrations.</p>
            </div>
          </div>
        </div>

        {/* Targets Column */}
        <div className="service-section">
          <h2 className="service-subsection-title">Who Is It For?</h2>
          <div className="service-targets-grid">
            {targetAudiences.map((aud, idx) => (
              <div key={idx} className="service-target-card glass-card">
                <h3 className="service-target-title">{aud.title}</h3>
                <p className="service-target-desc">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
