"use client";

import React from "react";
import Link from "next/link";
import { Camera, Shield, Zap, ArrowLeft, ArrowUpRight, UserCheck, Workflow, Clock } from "lucide-react";

export default function FaceService() {
  const steps = [
    { title: "OPT-IN & SNAPSHOT", desc: "Attendees scan a QR code at registration to opt-in and provide a single reference selfie." },
    { title: "EVENT CAPTURE", desc: "Event photographers capture high-res snaps throughout the venue." },
    { title: "REAL-TIME PROCESSING", desc: "AI engine scans uploaded images, identifies matches in milliseconds, and indexes tags." },
    { title: "INSTANT INBOX DELIVERY", desc: "Photos containing the attendee are automatically compiled and delivered directly via email or SMS." }
  ];

  const targetAudiences = [
    "Gala Dinners & Ceremonies",
    "Corporate Summits",
    "Concerts & Stadium Sports"
  ];

  return (
    <div className="service-page-container">
      <div className="container service-page-content">
        {/* Back Link */}
        <Link href="/" className="service-back-link">
          <ArrowLeft size={16} /> BACK TO OVERVIEW
        </Link>

        {/* Hero Section */}
        <div className="service-hero-grid">
          <div className="service-info-col">
            <div className="service-badge text-lime">
              <Camera size={14} />
              <span>IDEXI FACE /// SYSTEM 01</span>
            </div>
            <h1 className="service-title">
              ATTENDEE PHOTO MATCHING <br /><span className="text-lime">& INSTANT DELIVERY</span>
            </h1>
            <p className="service-description">
              Facial recognition technology mapping candid event photography and delivering individual galleries directly to attendees in real time.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="btn btn-lime">
                BOOK DEMO <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Technical visual mockup */}
          <div className="service-visual-col">
            <div className="service-mockup-container">
              <div className="service-mockup-header">
                <span className="service-mockup-dot" style={{ background: "#ff4d4d" }} />
                <span className="service-mockup-dot" style={{ background: "#ffb800" }} />
                <span className="service-mockup-dot" style={{ background: "#00e676" }} />
                <span className="service-mockup-title">LIVE PHOTO PIPELINE</span>
              </div>
              <div className="service-mockup-body">
                <div className="service-match-item">
                  <div className="service-match-avatar">
                    <UserCheck size={18} className="text-lime" />
                  </div>
                  <div className="service-match-details">
                    <span className="service-match-label">Sarah Jenkins matched in <strong>IMG_4821.jpg</strong></span>
                    <span className="service-match-time">Processed 0.2s</span>
                  </div>
                  <span className="service-status-badge text-lime">DELIVERED</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">
                    <UserCheck size={18} className="text-lime" />
                  </div>
                  <div className="service-match-details">
                    <span className="service-match-label">Marcus Chen matched in <strong>IMG_4902.jpg</strong></span>
                    <span className="service-match-time">Processed 0.5s</span>
                  </div>
                  <span className="service-status-badge text-lime">DELIVERED</span>
                </div>
                <div className="service-match-item">
                  <div className="service-match-avatar">
                    <Clock size={18} className="text-secondary" />
                  </div>
                  <div className="service-match-details">
                    <span className="service-match-label">Elena Rostova matched in <strong>IMG_4981.jpg</strong></span>
                    <span className="service-match-time">Indexing</span>
                  </div>
                  <span className="service-status-badge" style={{ background: "rgba(255, 255, 255, 0.08)", color: "#ffffff" }}>IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="service-section">
          <span className="section-label">PIPELINE ARCHITECTURE</span>
          <h2 className="service-subsection-title">HOW IDEXI FACE OPERATES</h2>
          <div className="service-steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="service-step-card">
                <div className="service-step-number text-lime">0{idx + 1}</div>
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
              <Zap size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">MILLISECOND MATCHING</h3>
              <p className="service-benefit-desc">Photos are indexed and mapped within seconds of photographer upload.</p>
            </div>
            <div className="service-benefit-item">
              <Shield size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">ENCRYPTED PRIVACY</h3>
              <p className="service-benefit-desc">Single-selfie reference opt-in with strict biometric encryption standards.</p>
            </div>
            <div className="service-benefit-item">
              <UserCheck size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">BRANDED DELIVERIES</h3>
              <p className="service-benefit-desc">Customized delivery portals with sponsor logos and social sharing controls.</p>
            </div>
            <div className="service-benefit-item">
              <Workflow size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">SEAMLESS INTEGRATION</h3>
              <p className="service-benefit-desc">Connects directly into existing event registration engines and photography workflows.</p>
            </div>
          </div>
        </div>

        <div className="service-section service-audience-compact">
          <span className="section-label">TARGET CAPABILITIES</span>
          <h2 className="service-subsection-title">ENGINEERED FOR MULTI-VENUE DEPLOYMENTS</h2>
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
