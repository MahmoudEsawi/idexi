"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Grid, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  badge?: string;
  statNumber?: string;
  statLabel?: string;
  image?: string;
}

export default function ServiceCard({
  title,
  tagline,
  description,
  href,
  badge = "SOLUTION",
  statNumber = "99.99%",
  statLabel = "system accuracy",
  image = "/hero_event_crowd.png",
}: ServiceCardProps) {
  return (
    <>
      <style>{cardCSS}</style>
      <Link href={href} className="volt-solution-card">
        {/* Background Photo Overlay */}
        <div className="card-bg-media">
          <Image src={image} alt={title} fill className="card-img" />
          <div className="card-overlay" />
        </div>

        {/* Card Header Row */}
        <div className="card-header-row">
          <div className="dot-matrix-icon">
            <Grid size={20} className="text-lime" />
          </div>
          <span className="card-action-link">
            EXPLORE SYSTEM <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Card Body & Inset Stat */}
        <div className="card-body">
          <div className="stat-badge-box">
            <span className="stat-num text-lime">{statNumber}</span>
            <span className="stat-lbl">{statLabel}</span>
          </div>

          <div className="card-title-box">
            <span className="card-tagline">{tagline}</span>
            <h3 className="card-main-title">{title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}

const cardCSS = `
  .volt-solution-card {
    position: relative;
    height: 380px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--grid-line);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    color: #ffffff;
    background: #0d0f14;
    transition: var(--transition-fast);
  }

  .volt-solution-card:hover {
    border-color: var(--accent-lime);
    transform: translateY(-4px);
  }

  .card-bg-media {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .card-img {
    object-fit: cover;
    filter: grayscale(100%) contrast(120%) brightness(0.4);
    transition: filter 0.3s ease, transform 0.4s ease;
  }

  .volt-solution-card:hover .card-img {
    filter: grayscale(30%) contrast(110%) brightness(0.5);
    transform: scale(1.05);
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(13, 15, 20, 0.4) 0%, rgba(13, 15, 20, 0.95) 100%);
  }

  .card-header-row {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-action-link {
    font-family: var(--font-headings);
    font-size: 0.78rem;
    font-weight: 900;
    color: var(--accent-lime);
    letter-spacing: 0.06em;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    text-transform: uppercase;
  }

  .card-body {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-badge-box {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .stat-num {
    font-family: var(--font-headings);
    font-size: 2.2rem;
    font-weight: 900;
    line-height: 1;
  }

  .stat-lbl {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-title-box {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .card-tagline {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .card-main-title {
    font-family: var(--font-headings);
    font-size: 2.2rem;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.03em;
  }

  @media (max-width: 600px) {
    .volt-solution-card {
      height: auto;
      min-height: 320px;
      padding: 1.5rem;
    }
    .card-main-title {
      font-size: 1.75rem;
    }
    .stat-num {
      font-size: 1.8rem;
    }
  }
`;
