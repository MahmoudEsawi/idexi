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
  index: number;
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

export default function FounderCard({ name, role, image, email, linkedin, index }: FounderCardProps) {
  return (
    <>
      <style>{founderCardCSS}</style>
      <div className="founder-card glass-card" style={{ "--stagger-idx": index } as React.CSSProperties}>
        <div className="founder-wave" aria-hidden="true" />

        <div className="founder-photo-frame">
          <Image
            src={image}
            alt={`${name}, ${role}`}
            width={96}
            height={96}
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
  .founder-card {
    position: relative;
    padding: 2rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.35rem;
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }
  /* .glass-card already defines its own :hover (translateY lift + border/shadow
     change) — this reasserts transform specifically so founder cards get the
     scale the reference calls for instead, with enough specificity to win
     over the plain .glass-card:hover rule (2 classes vs 1). */
  .founder-card.glass-card:hover {
    transform: scale(1.02);
    border-color: var(--glass-border-hover);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(49, 196, 243, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  /* Rising wave — the reference's signature hover detail, retinted to the
     brand's cyan/glow tokens instead of its shadcn --primary. */
  .founder-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    transform: scaleY(0);
    transform-origin: bottom;
    border-radius: 9999px 9999px 0 0;
    background: linear-gradient(0deg, var(--accent-glow) 0%, transparent 100%);
    opacity: 0.35;
    transition: transform 0.5s ease-out;
    transition-delay: calc(var(--stagger-idx, 0) * 80ms);
    pointer-events: none;
  }
  .founder-card:hover .founder-wave {
    transform: scaleY(1);
  }

  .founder-photo-frame {
    position: relative;
    z-index: 1;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid transparent;
    transition: border-color 0.5s ease-out, transform 0.5s ease-out;
    transition-delay: calc(var(--stagger-idx, 0) * 120ms);
  }
  .founder-card:hover .founder-photo-frame {
    border-color: var(--accent-cyan);
    transform: scale(1.06);
  }
  .founder-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-out;
  }
  .founder-card:hover .founder-photo {
    transform: scale(1.1);
  }

  .founder-name {
    position: relative;
    z-index: 1;
    margin-top: 0.75rem;
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

  .founder-contact {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
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
    .founder-card,
    .founder-card.glass-card:hover {
      transform: none !important;
      transition: border-color 0.4s ease, box-shadow 0.4s ease !important;
    }
    .founder-wave {
      transition: none !important;
      transform: scaleY(0) !important;
    }
    .founder-photo-frame,
    .founder-card:hover .founder-photo-frame {
      transition: border-color 0.3s ease !important;
      transform: none !important;
    }
    .founder-photo,
    .founder-card:hover .founder-photo {
      transition: none !important;
      transform: none !important;
    }
  }
`;
