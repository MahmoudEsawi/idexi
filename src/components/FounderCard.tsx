"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

interface FounderCardProps {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function FounderCard({ name, role, image, email, linkedin }: FounderCardProps) {
  return (
    <>
      <style>{founderCardCSS}</style>
      <div className="founder-card">
        <div className="hover-wave" aria-hidden="true" />

        <div className="founder-photo-frame">
          <Image
            src={image}
            alt={`${name}, ${role}`}
            width={152}
            height={152}
            priority
            className="founder-photo"
          />
        </div>

        <h3 className="founder-name">{name}</h3>
        <p className="founder-role">{role}</p>

        <div className="founder-contact">
          <a
            href={`mailto:${email}`}
            className="founder-contact-link"
            aria-label={`Email ${name}`}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="founder-contact-link"
            aria-label={`${name} on LinkedIn`}
          >
            <LinkedInIcon size={18} />
          </a>
        </div>
      </div>
    </>
  );
}

const founderCardCSS = `
  /* Transparent by default — the photo is the focal point, not a card
     boundary. All hover/focus feedback comes from the wave, the photo's
     own border/zoom, and the revealed contact row, not the container. */
  .founder-card {
    position: relative;
    padding: 1.5rem 1.25rem 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.35rem;
  }

  /* Rising wave — the reference's signature hover detail, retinted to the
     brand's glow token. Reveals on real hover AND on :focus-within, so
     keyboard users tabbing to a contact link see the same backdrop. */
  .hover-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    transform: scaleY(0);
    transform-origin: bottom;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: linear-gradient(0deg, var(--accent-glow) 0%, transparent 100%);
    opacity: 0.35;
    transition: transform 0.5s ease-out;
    pointer-events: none;
  }
  .founder-card:hover .hover-wave,
  .founder-card:focus-within .hover-wave {
    transform: scaleY(1);
  }

  .founder-photo-frame {
    position: relative;
    z-index: 1;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid transparent;
    transition: border-color 0.5s ease-out, transform 0.5s ease-out;
  }
  .founder-card:hover .founder-photo-frame,
  .founder-card:focus-within .founder-photo-frame {
    border-color: var(--accent-cyan);
    transform: scale(1.06);
  }
  .founder-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-out;
  }
  .founder-card:hover .founder-photo,
  .founder-card:focus-within .founder-photo {
    transform: scale(1.1);
  }

  .founder-name {
    position: relative;
    z-index: 1;
    margin-top: 0.9rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  .founder-role {
    position: relative;
    z-index: 1;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  /* Hidden by default via opacity + pointer-events, NOT visibility:hidden —
     a visibility:hidden element drops out of the tab order entirely, which
     would make ":focus-within reveals it" impossible (you can't tab onto
     something Tab is told to skip). opacity keeps it focusable the whole
     time; pointer-events:none just stops stray clicks while it's invisible. */
  .founder-contact {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .founder-card:hover .founder-contact,
  .founder-card:focus-within .founder-contact {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  /* Touch devices have no hover and don't tab — a pure reveal-on-interact
     pattern would make these links permanently unreachable there. Keep them
     always visible whenever the device has no true hover capability. */
  @media (hover: none) {
    .founder-contact {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
  }

  .founder-contact-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: var(--text-muted);
    transition: color 0.3s ease;
  }
  .founder-contact-link:hover {
    color: var(--accent-cyan);
  }
  .founder-contact-link:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
    color: var(--accent-cyan);
  }

  @media (prefers-reduced-motion: reduce) {
    .hover-wave {
      transform: none !important;
      opacity: 0;
      transition: opacity 0.3s ease !important;
    }
    .founder-card:hover .hover-wave,
    .founder-card:focus-within .hover-wave {
      opacity: 1;
    }
    .founder-photo-frame,
    .founder-card:hover .founder-photo-frame,
    .founder-card:focus-within .founder-photo-frame {
      transition: border-color 0.3s ease !important;
      transform: none !important;
    }
    .founder-photo,
    .founder-card:hover .founder-photo,
    .founder-card:focus-within .founder-photo {
      transition: none !important;
      transform: none !important;
    }
    .founder-contact {
      transition: opacity 0.3s ease !important;
      transform: none !important;
    }
  }
`;
