"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldAlert, Compass, BarChart3, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function FlowService() {
  const steps = [
    { title: "SENSOR SETUP", desc: "Position compact edge-sensors at major doorways, narrow corridors, and exit gates." },
    { title: "PASSIVE DETECTION", desc: "Sensors passively track foot movement direction and crowd velocities without capturing PII." },
    { title: "AI DENSITY DIAGNOSTICS", desc: "Engine maps velocity changes to alert organizers of congestion points before bottlenecks occur." },
    { title: "DYNAMIC REROUTING", desc: "Dispatch staff to open auxiliary lanes or update digital signage automatically." }
  ];

  const targetAudiences = [
    { title: "EXPOSITIONS & TRADE SHOWS", desc: "Track hall density and optimize floor layout dynamically." },
    { title: "MASS CONCERTS & FESTIVALS", desc: "Maintain real-time egress control and monitor crowd flow safely near main stages." },
    { title: "STADIUMS & ARENAS", desc: "Manage queue bottlenecks to improve venue concession throughput." }
  ];

  const progressInnerStyle = (width: string, color: string) => ({
    width,
    background: color,
  });

  const zoneStatusStyle = (type: "high" | "normal" | "critical") => {
    const colors = {
      high: "#ffb800",
      normal: "#00e676",
      critical: "#ff4d4d",
    };
    return {
      color: colors[type],
    };
  };

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
              <Activity size={14} />
              <span>IDEXI FLOW /// SYSTEM 02</span>
            </div>
            <h1 className="service-title">
              CROWD TELEMETRY <br /><span className="text-lime">& DENSITY DIAGNOSTICS</span>
            </h1>
            <p className="service-description">
              Monitor crowd velocity, attendee density, and bottleneck indicators in real time using non-intrusive AI sensors.
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
                <span className="service-mockup-title">ZONE LOAD TELEMETRY</span>
              </div>
              <div className="service-mockup-body">
                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">GATE A (MAIN ENTRY)</span>
                    <span className="service-zone-status" style={zoneStatusStyle("high")}>92% DENSITY</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("92%", "#ffb800")} />
                  </div>
                </div>
                
                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">HALL B (EXHIBITORS)</span>
                    <span className="service-zone-status" style={zoneStatusStyle("normal")}>45% DENSITY</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("45%", "#00e676")} />
                  </div>
                </div>

                <div className="service-zone-metric">
                  <div className="service-zone-label-row">
                    <span className="service-zone-name">CONCESSION NORTH</span>
                    <span className="service-zone-status" style={zoneStatusStyle("critical")}>98% CONGESTED</span>
                  </div>
                  <div className="service-progress-outer">
                    <div className="service-progress-inner" style={progressInnerStyle("98%", "#ff4d4d")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="service-section">
          <span className="section-label">SYSTEM ARCHITECTURE</span>
          <h2 className="service-subsection-title">PASSIVE SENSOR OPERATIONAL PIPELINE</h2>
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
              <ShieldAlert size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">PROACTIVE BOTTLENECK ALERTS</h3>
              <p className="service-benefit-desc">Flags slowdowns up to 15 minutes before congestion manifests.</p>
            </div>
            <div className="service-benefit-item">
              <Compass size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">PASSIVE METRICS</h3>
              <p className="service-benefit-desc">Tracks crowd vectors and speeds without storing personal identifiable information.</p>
            </div>
            <div className="service-benefit-item">
              <BarChart3 size={24} className="text-lime" style={{ marginBottom: "1rem" }} />
              <h3 className="service-benefit-title">ANALYTICS REPORTING</h3>
              <p className="service-benefit-desc">Delivers dwell-time analytics and traffic exposure metrics.</p>
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
