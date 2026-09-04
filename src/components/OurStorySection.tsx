"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Saif Alqdessi",
    role: "Co-Founder & Tech Lead",
    image: "/saif.webp",
    email: "alqdessi.qp@gmail.com",
    linkedin: "https://www.linkedin.com/in/saif-alqdess",
    bio: "AI engineer. 8 years building gate infrastructure, computer vision, and offline sync engines.",
  },
  {
    name: "Jafar Alkhadrawi",
    role: "Co-Founder & Business Lead",
    image: "/jafar.webp",
    email: "khadrawi.jafer@gmail.com",
    linkedin: "https://www.linkedin.com/in/jafar-alkhadrawi",
    bio: "AI graduate & operations lead. 8 years managing frontline event logistics and partner venues.",
  },
];

export default function OurStorySection() {
  return (
    <section id="about" className="story-section">
      <style>{storyCSS}</style>
      <div className="story-row">
        {/* Left Side: Our Story */}
        <div className="story-text">
          <p className="story-eyebrow">FOUNDING TEAM</p>
          <h2 className="story-heading">Our Story</h2>
          <p className="story-paragraph">
            Born from 8 years of frontline experience in event management and media coverage, idexi was created by
            AI graduates Saif and Jafar to solve the industry&apos;s biggest friction points.
          </p>
          <p className="story-paragraph">
            We merged deep event expertise with AI to eliminate ticketing errors, stop screenshot pass fraud at the gate,
            and automate instant photo delivery. We put intelligence back into physical spaces so events feel seamless
            instead of chaotic.
          </p>
          <div className="story-badge-strip">
            <span className="story-pill">8+ Years Experience</span>
            <span className="story-pill">AI Engineers</span>
            <span className="story-pill">Zero Unproven Risk</span>
          </div>
        </div>

        {/* Right Side: Co-Founders with 100% Parity */}
        <div className="team-panel">
          <div className="founders-grid">
            {TEAM.map((member) => (
              <article key={member.name} className="founder-card">
                <div className="founder-photo-box">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    quality={85}
                    className="founder-photo"
                  />
                </div>
                <div className="founder-body">
                  <div className="founder-header">
                    <h3 className="founder-name">{member.name}</h3>
                    <span className="founder-role-badge">{member.role}</span>
                  </div>
                  <p className="founder-bio">{member.bio}</p>
                  <div className="founder-links">
                    <a
                      href={`mailto:${member.email}`}
                      className="founder-link-item"
                      aria-label={`Email ${member.name} at ${member.email}`}
                      title={`Email ${member.name}`}
                    >
                      <Mail size={15} aria-hidden="true" />
                      <span className="founder-link-label">{member.email}</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="founder-link-item"
                      aria-label={`${member.name} on LinkedIn`}
                      title={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={15} />
                      <span className="founder-link-label">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const storyCSS = `
  .story-section {
    background: var(--st-background);
    transition: background 0.4s ease;
    scroll-margin-top: 96px;
  }
  .story-row {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  .story-text {
    width: 100%;
  }
  .story-eyebrow {
    margin: 0 0 0.5rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    color: var(--st-secondary);
  }
  .story-heading {
    margin: 0 0 1.25rem;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .story-paragraph {
    margin: 0 0 1rem;
    max-width: 42rem;
    font-family: var(--st-font-ui);
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
  }
  .story-badge-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.5rem;
  }
  .story-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.85rem;
    border-radius: var(--st-radius-full);
    font-size: 0.8rem;
    font-weight: 600;
    font-family: var(--st-font-display);
    background: var(--st-surface-container-low);
    color: var(--st-secondary);
    border: 1px solid var(--st-outline-variant);
  }

  .team-panel {
    width: 100%;
  }
  .founders-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .founder-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    box-shadow: 0 10px 30px -15px rgba(11, 28, 48, 0.08);
    transition: transform 0.25s ease, border-color 0.25s ease;
  }
  .founder-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--st-secondary) 50%, var(--st-outline-variant));
  }

  .founder-photo-box {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: var(--st-radius-lg);
    overflow: hidden;
    background: var(--st-surface-container-high);
  }
  .founder-photo {
    object-fit: cover;
    object-position: top center;
  }

  .founder-body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    min-width: 0;
  }
  .founder-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
  }
  .founder-name {
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--st-on-background);
  }
  .founder-role-badge {
    font-size: 0.76rem;
    font-weight: 600;
    font-family: var(--st-font-display);
    padding: 0.15rem 0.55rem;
    border-radius: var(--st-radius-full);
    background: color-mix(in srgb, var(--st-secondary) 12%, transparent);
    color: var(--st-secondary);
    white-space: nowrap;
  }
  .founder-bio {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
  }
  .founder-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem 1rem;
    margin-top: 0.4rem;
    padding-top: 0.6rem;
    border-top: 1px solid var(--st-outline-variant);
  }
  .founder-link-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .founder-link-item:hover {
    color: var(--st-secondary);
  }
  .founder-link-item:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .founder-link-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }

  @media (max-width: 580px) {
    .founder-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    .founder-photo-box {
      width: 90px;
      height: 90px;
    }
  }

  @media (min-width: 860px) {
    .story-row {
      flex-direction: row;
      align-items: flex-start;
      gap: 4rem;
    }
    .story-text {
      width: 48%;
    }
    .team-panel {
      width: 52%;
    }
  }
`;
