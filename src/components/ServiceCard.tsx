"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  badge?: string;
  accentColor?: string;
}

export default function ServiceCard({
  title,
  tagline,
  description,
  href,
  Icon,
  badge,
  accentColor = "var(--accent-cyan)",
}: ServiceCardProps) {
  return (
    <>
      <style>{cardCSS}</style>
      <Link href={href} className="service-card glass-card">
        {/* Animated corner accent — mimics the logo's cyan teardrop */}
        <div className="card-accent" style={{ background: `radial-gradient(circle at top left, ${accentColor}22, transparent 70%)` }} />

        <div className="card-header">
          <div className="card-icon-box" style={{ borderColor: `${accentColor}25` }}>
            <Icon size={22} style={{ color: accentColor }} />
          </div>
          {badge && <span className="card-badge" style={{ borderColor: `${accentColor}30`, color: accentColor, background: `${accentColor}10` }}>{badge}</span>}
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="card-tagline" style={{ color: accentColor }}>{tagline}</p>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <span className="card-link-text">Learn More</span>
          <ArrowRight size={16} className="card-arrow" style={{ color: accentColor }} />
        </div>
      </Link>
    </>
  );
}

const cardCSS = `
  .service-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    position: relative;
  }
  .card-accent {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 160px;
    height: 160px;
    pointer-events: none;
    border-radius: 20px 0 0 0;
    transition: all 0.5s ease;
  }
  .service-card:hover .card-accent {
    width: 220px;
    height: 220px;
    opacity: 1.5;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
    position: relative;
    z-index: 1;
  }
  .card-icon-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(49, 196, 243, 0.06);
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-smooth);
  }
  .service-card:hover .card-icon-box {
    background: rgba(49, 196, 243, 0.12);
    box-shadow: 0 0 20px rgba(49, 196, 243, 0.1);
    transform: scale(1.05);
  }
  .card-badge {
    font-family: var(--font-headings);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 9999px;
    border: 1px solid;
  }
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    font-family: var(--font-headings);
    margin-bottom: 0.3rem;
    position: relative;
    z-index: 1;
  }
  .card-tagline {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.8rem;
    position: relative;
    z-index: 1;
  }
  .card-desc {
    font-size: 0.92rem;
    color: var(--text-secondary);
    line-height: 1.65;
    flex-grow: 1;
    position: relative;
    z-index: 1;
  }
  .card-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    position: relative;
    z-index: 1;
  }
  .card-link-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    transition: color 0.3s ease;
  }
  .card-arrow {
    transition: transform 0.3s ease;
  }
  .service-card:hover .card-arrow {
    transform: translateX(5px);
  }
  .service-card:hover .card-link-text {
    color: var(--accent-cyan);
  }
`;
