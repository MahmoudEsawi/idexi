"use client";

import React from "react";
import Link from "next/link";
import { Ticket, ShieldCheck, WifiOff, Users2, ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import InteractiveWaves from "@/components/InteractiveWaves";

export default function PassService() {
  const steps = [
    { title: "One-Click Registration", desc: "Attendees register online or via your event app and instantly generate a secure, encrypted smart-pass." },
    { title: "Digital Wallet Add", desc: "Passes easily save to Apple Wallet or Google Wallet with high-contrast barcodes and NFC profiles." },
    { title: "Express Verification", desc: "At the gate, passes scan in milliseconds. Integrates with optional facial-verification options." },
    { title: "Instant Event Badge", desc: "Upon verification, connected badge printers output custom visitor credentials instantly." }
  ];

  const targetAudiences = [
    { title: "VIP Events & Dinners", desc: "Deliver seamless, highly personal welcomes with facial check-ins for high-profile guests." },
    { title: "Heavy Attendance Expos", desc: "Deploy offline-ready entry tunnels capable of scanning thousands of tickets per minute." },
    { title: "Multi-Day Conferences", desc: "Secure secondary session rooms and workshops with sub-gate verification rules." }
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
              <Ticket size={14} />
              <span>idexi Pass</span>
            </div>
            <h1 className="service-title">Smart Check-In <br /><span className="text-gradient">& Express Registration</span></h1>
            <p className="service-description">
              Eliminate physical lines entirely. Set up lightning-fast access gates using biometric recognition, NFC smart-passes, and offline-resilient edge terminals.
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
                <span className="service-mockup-title">Gate Terminal #04</span>
              </div>
              <div className="service-mockup-body">
                <div className="pass-mockup">
                  <div className="pass-header">
                    <span className="pass-title">idexi Smart Pass</span>
                    <Smartphone size={20} style={{ color: "var(--accent-cyan)" }} />
                  </div>
                  
                  <div className="pass-barcode-area">
                    <div className="pass-barcode-lines" />
                    <span className="pass-barcode-num">ID-9082-9982</span>
                  </div>

                  <div className="pass-footer">
                    <div>
                      <div className="pass-label">HOLDER</div>
                      <div className="pass-val">Clara Henderson</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="pass-label">ACCESS LAYER</div>
                      <div className="pass-val" style={{ color: "var(--accent-cyan)" }}>All-Access VIP</div>
                    </div>
                  </div>
                </div>

                <div className="scan-status-container">
                  <span className="scan-indicator">● SCAN VERIFIED</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Egress point: Main Foyer</span>
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
              <WifiOff size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">100% Offline-Capable</h3>
              <p className="service-benefit-desc">Venues with weak cellular service pose no risk. Our hardware works offline and syncs immediately once connected.</p>
            </div>
            <div className="service-benefit-item">
              <ShieldCheck size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Fraud Protection</h3>
              <p className="service-benefit-desc">Encrypted, dynamic barcodes prevent ticket sharing or duplicates, securing event margins.</p>
            </div>
            <div className="service-benefit-item">
              <Users2 size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Biometric Access Tunnels</h3>
              <p className="service-benefit-desc">Enable friction-free entry options with face-identification terminals checking in guests automatically on the move.</p>
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
