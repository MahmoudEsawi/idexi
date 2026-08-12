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

function LinkedInIcon({ size = 16 }: { size?: number }) {
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
      <div className="volt-founder-card">
        <div className="founder-photo-frame">
          <Image
            src={image}
            alt={`${name}, ${role}`}
            width={180}
            height={180}
            priority
            className="founder-photo"
          />
        </div>

        <div className="founder-info-box">
          <h3 className="founder-name">{name}</h3>
          <p className="founder-role text-lime">{role}</p>

          <div className="founder-contact">
            <a
              href={`mailto:${email}`}
              className="founder-contact-link"
              aria-label={`Email ${name}`}
            >
              <Mail size={16} aria-hidden="true" />
              <span>EMAIL</span>
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="founder-contact-link"
              aria-label={`${name} on LinkedIn`}
            >
              <LinkedInIcon size={16} />
              <span>LINKEDIN</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const founderCardCSS = `
  .volt-founder-card {
    position: relative;
    padding: 2.2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background: #0d0f14;
    border: 1px solid var(--grid-line);
    border-radius: 12px;
    transition: var(--transition-fast);
  }

  .volt-founder-card:hover {
    border-color: var(--accent-lime);
    transform: translateY(-3px);
  }

  .founder-photo-frame {
    width: 120px;
    height: 120px;
    min-width: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--grid-line);
    transition: border-color 0.2s ease;
  }

  .volt-founder-card:hover .founder-photo-frame {
    border-color: var(--accent-lime);
  }

  .founder-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.2s ease;
  }

  .volt-founder-card:hover .founder-photo {
    filter: grayscale(0%);
  }

  .founder-info-box {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .founder-name {
    font-family: var(--font-headings);
    font-size: 1.5rem;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .founder-role {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .founder-contact {
    display: flex;
    gap: 0.8rem;
    margin-top: 0.8rem;
  }

  .founder-contact-link {
    font-family: var(--font-headings);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #ffffff;
    background: #07080b;
    border: 1px solid var(--grid-line);
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: var(--transition-fast);
  }

  .founder-contact-link:hover {
    background: var(--accent-lime);
    color: #07080b;
    border-color: var(--accent-lime);
  }

  @media (max-width: 600px) {
    .volt-founder-card { flex-direction: column; text-align: center; }
  }
`;
