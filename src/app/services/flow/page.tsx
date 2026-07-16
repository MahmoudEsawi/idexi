"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldAlert, Compass, BarChart3, ArrowLeft, ArrowRight } from "lucide-react";
import InteractiveWaves from "@/components/InteractiveWaves";

export default function FlowService() {
  const steps = [
    { title: "Sensor Setup", desc: "Position compact edge-sensors at major doorways, narrow corridors, and exit gates." },
    { title: "Passive Detection", desc: "Sensors passively track foot movement direction and crowd velocities without capturing PII." },
    { title: "AI Density Diagnostics", desc: "Our engine maps velocity changes to alert organizers of congestion points before bottlenecks occur." },
    { title: "Dynamic Rerouting", desc: "Dispatch staff to open auxiliary lanes or update digital signage automatically." }
  ];

  const targetAudiences = [
    { title: "Major Expositions & Trade Shows", desc: "Track which sponsor halls draw the highest density and optimize floor layout dynamically." },
    { title: "Mass Concerts & Festivals", desc: "Maintain real-time egress control and monitor crowd flow safely near main stages." },
    { title: "Stadiums & Arenas", desc: "Manage food court and restroom queue bottlenecks to improve fan concessions revenues." }
  ];

  const progressInnerStyle = (width: string, color: string) => ({
    width,
    background: color,
  });

  const zoneStatusStyle = (type: "high" | "normal" | "critical") => {
    const colors = {
      high: "#ffbd2e",
      normal: "#27c93f",
      critical: "#ff5f56",
    };
    return {
      color: colors[type],
    };
  };

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
              <Activity size={14} />
              <span>idexi Flow</span>
            </div>
            <h1 className="service-title">Crowd Analytics <br /><span className="text-gradient">& Diagnostics telemetry</span></h1>
            <p className="service-description">
              Keep event operations moving smoothly and safely. Monitor crowd velocity, attendee density, and bottleneck indicators in real time using non-intrusive AI diagnostics.
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
                <span className="service-mockup-title">Zone Load Analytics</span>
              </div>
              <div className="service-mockup-body">
                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">Gate A (Main Entry)</span>
                    <span className="service-zone-status" style={zoneStatusStyle("high")}>92% Density (Heavy)</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("92%", "#ffbd2e")} />
                  </div>
                </div>
                
                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">Hall B (Exhibitors)</span>
                    <span className="service-zone-status" style={zoneStatusStyle("normal")}>45% Density (Optimal)</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("45%", "#27c93f")} />
                  </div>
                </div>

                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">Concession North</span>
                    <span className="service-zone-status" style={zoneStatusStyle("critical")}>98% Congested (Critical)</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("98%", "#ff5f56")} />
                  </div>
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
              <ShieldAlert size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Proactive Bottleneck Alert</h3>
              <p className="service-benefit-desc">Our system flags slowdowns up to 15 minutes before they manifest into lines, allowing agile mitigation.</p>
            </div>
            <div className="service-benefit-item">
              <Compass size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Passive, GDPR Safe</h3>
              <p className="service-benefit-desc">Tracks crowd movement vectors and speeds without registering facial matches or private devices, ensuring total privacy.</p>
            </div>
            <div className="service-benefit-item">
              <BarChart3 size={24} style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">Sponsor Value Reports</h3>
              <p className="service-benefit-desc">Deliver robust dwell-time analytics to corporate sponsors showing exact exposure rates and traffic metrics.</p>
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
