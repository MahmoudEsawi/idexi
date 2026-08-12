"use client";

import React from "react";
import Link from "next/link";
import { Ticket, ShieldCheck, WifiOff, Users2, ArrowLeft, ArrowUpRight, Smartphone } from "lucide-react";

export default function PassService() {
  const steps = [
    { title: "ONE-CLICK REGISTRATION", desc: "Attendees register online and generate an encrypted smart-pass." },
    { title: "DIGITAL WALLET STORAGE", desc: "Passes save to Apple Wallet or Google Wallet with high-contrast barcodes and NFC profiles." },
    { title: "EXPRESS VERIFICATION", desc: "Passes scan in milliseconds at access points with optional biometric verification." },
    { title: "INSTANT CREDENTIAL ISSUANCE", desc: "Connected badge printers output custom visitor credentials instantly upon verification." }
  ];

  const targetAudiences = [
    { title: "VIP EVENTS & SUMMITS", desc: "Deliver seamless welcomes with facial check-ins for high-profile guests." },
    { title: "HEAVY ATTENDANCE EXPOS", desc: "Deploy offline-ready entry tunnels scanning thousands of tickets per minute." },
    { title: "MULTI-DAY CONFERENCES", desc: "Secure secondary session rooms and workshops with sub-gate rules." }
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
              <Ticket size={14} />
              <span>IDEXI PASS /// SYSTEM 03</span>
            </div>
            <h1 className="service-title">
              EXPRESS BIOMETRIC CHECK-IN <br /><span className="text-lime">& ACCESS CONTROL</span>
            </h1>
            <p className="service-description">
              Lightning-fast access gates using biometric recognition, NFC smart-passes, and offline-resilient edge terminals.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="btn btn-lime">
                BOOK DEMO <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Visual mockup */}
          <div className="service-visual-col">
            <div className="service-mockup-container">
              <div className="service-mockup-header">
                <span className="service-mockup-dot" style={{ background: "#ff4d4d" }} />
                <span className="service-mockup-dot" style={{ background: "#ffb800" }} />
                <span className="service-mockup-dot" style={{ background: "#00e676" }} />
                <span className="service-mockup-title">GATE TERMINAL #04</span>
              </div>
              <div className="service-mockup-body">
                <div className="pass-mockup">
                  <div className="pass-header">
                    <span className="pass-title">IDEXI SMART PASS</span>
                    <Smartphone size={20} className="text-lime" />
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
                      <div className="pass-val text-lime">All-Access VIP</div>
                    </div>
                  </div>
                </div>

                <div className="scan-status-container">
                  <span className="scan-indicator text-lime">SCAN VERIFIED</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Egress Point: Main Foyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="service-section">
          <span className="section-label">EXPRESS PIPELINE</span>
          <h2 className="service-subsection-title">SMART CHECK-IN ARCHITECTURE</h2>
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

        {/* Benefits */}
        <div className="service-benefits-section">
          <div className="service-benefits-grid">
            <div className="service-benefit-item">
              <WifiOff size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">OFFLINE-CAPABLE</h3>
              <p className="service-benefit-desc">Hardware operates offline during cellular disruptions and syncs automatically once online.</p>
            </div>
            <div className="service-benefit-item">
              <ShieldCheck size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">FRAUD PROTECTION</h3>
              <p className="service-benefit-desc">Encrypted dynamic barcodes prevent ticket sharing or duplicates.</p>
            </div>
            <div className="service-benefit-item">
              <Users2 size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">BIOMETRIC ENTRY TUNNELS</h3>
              <p className="service-benefit-desc">Enable friction-free entry options with face-identification terminals checking in guests automatically.</p>
            </div>
          </div>
        </div>

        {/* Targets Column */}
        <div className="service-section">
          <span className="section-label">TARGET DEPLOYMENTS</span>
          <h2 className="service-subsection-title">VENUE CAPABILITIES</h2>
          <div className="service-targets-grid">
            {targetAudiences.map((aud, idx) => (
              <div key={idx} className="service-target-card">
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
