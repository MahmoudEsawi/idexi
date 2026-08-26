"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

// "Our Team" (the right-hand panel below) is structurally ported from
// team.md's animated-testimonials template: an absolutely-stacked,
// crossfading photo on one side, a key-swapped text block with prev/next
// controls on the other, autoplay via setInterval. @tabler/icons-react
// (the template's icon source) isn't installed; lucide-react (already a
// project dependency, used everywhere else) supplies the arrows instead.
// Framer Motion itself IS already a dependency, unlike the rest of this
// project's animation, which is hand-rolled CSS — used here rather than
// reimplemented in CSS specifically because the template's fidelity was
// requested directly.

interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Saif Alqdessi",
    role: "Co-Founder, Tech Lead",
    image: "/saif.webp",
    email: "alqdessi.qp@gmail.com",
    linkedin: "https://www.linkedin.com/in/saif-alqdess",
  },
  {
    name: "Jafar Alkhadrawi",
    role: "Co-Founder, Business Lead",
    image: "/jafar.webp",
    email: "khadrawi.jafer@gmail.com",
    linkedin: "https://www.linkedin.com/in/jafar-alkhadrawi",
  },
];

// Fixed values, not Math.random() and not per-index — matches this
// project's established convention of deterministic, not random,
// decorative motion, so the section renders identically on every load.
// The inactive card always tilts/translates the same way: negative
// (toward the photo stack's own left edge, away from the text column),
// regardless of which team member is currently active or which index
// they occupy in the array. A per-index sign here previously made the
// background card swing right for odd indexes and collide with the text.
const INACTIVE_TILT = -10;
const INACTIVE_OFFSET = { x: -18, y: 14 };

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function OurStorySection() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleNext = () => setActive((prev) => (prev + 1) % TEAM.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + TEAM.length) % TEAM.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const current = TEAM[active];

  return (
    <section id="about" className="story-section">
      <style>{storyCSS}</style>
      <div className="story-row">
        {/* Left Side: Our Story */}
        <div className="story-text">
          <h2 className="story-heading">Our Story</h2>
          <p className="story-paragraph">
            Born from 8 years of frontline experience in event management and media coverage, idexi was created by
            AI graduates Saif and Jafar to solve the industry&apos;s biggest friction points.
          </p>
          <p className="story-paragraph">
            We merged deep event expertise with AI to eliminate ticketing errors and automate instant photo
            delivery. That&apos;s what puts intelligence back into physical spaces, so events feel like magic
            instead of logistics.
          </p>
        </div>

        {/* Right Side: Our Team */}
        <div className="team-panel">
          <div className="team-grid">
            <div className="team-photo-stack">
              <AnimatePresence mode="sync">
                {TEAM.map((member, index) => {
                  const isCurrent = isActive(index);
                  return (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, scale: 0.9, rotate: INACTIVE_TILT }}
                      animate={{
                        opacity: isCurrent ? 1 : 0.75,
                        scale: isCurrent ? 1 : 0.94,
                        x: isCurrent ? 0 : INACTIVE_OFFSET.x,
                        y: isCurrent ? 0 : INACTIVE_OFFSET.y,
                        rotate: isCurrent ? 0 : INACTIVE_TILT,
                        zIndex: isCurrent ? 10 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeInOut" }}
                      className="team-photo-frame"
                    >
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="280px"
                        priority
                        className="team-photo"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="team-details">
              <motion.div
                key={active}
                initial={{ y: prefersReducedMotion ? 0 : 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" }}
                aria-live="polite"
              >
                <h3 className="team-name">{current.name}</h3>
                <p className="team-role">{current.role}</p>
                <div className="team-contact">
                  <a href={`mailto:${current.email}`} className="team-contact-link" aria-label={`Email ${current.name}`}>
                    <Mail size={18} aria-hidden="true" />
                  </a>
                  <a
                    href={current.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-contact-link"
                    aria-label={`${current.name} on LinkedIn`}
                  >
                    <LinkedInIcon size={18} />
                  </a>
                </div>
              </motion.div>

              <div className="team-nav">
                <button type="button" onClick={handlePrev} className="team-nav-btn" aria-label="Previous team member">
                  <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                </button>
                <button type="button" onClick={handleNext} className="team-nav-btn" aria-label="Next team member">
                  <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
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
    /* Clears the fixed Navbar pill when landed on via an #about anchor
       jump, so the heading isn't tucked under it. */
    scroll-margin-top: 96px;
  }
  /* Mobile only. The inactive team photo's deliberate "peek out to the
     left" tilt (INACTIVE_OFFSET.x, a negative translateX) has no clipping
     ancestor by design on desktop, where there's enough surrounding
     margin for the peek to never reach the true viewport edge. On a
     narrow phone the stack runs edge-to-edge, so that same offset was
     bleeding past x:0 and causing real page-level horizontal scroll —
     confirmed via document.documentElement.scrollWidth exceeding
     clientWidth. Clipping at the section boundary here still lets most of
     the peek read visually; it just can't spill into the scrollable area. */
  @media (max-width: 767px) {
    .story-section {
      overflow-x: hidden;
    }
  }
  .story-row {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .story-text {
    width: 100%;
  }
  /* The brand's elegant serif display heading — pinned explicitly rather
     than inherited, so it stays serif regardless of the global h1-h6
     sans-serif default. Every main section heading on the page shares
     this exact declaration (see CtaSection, AIEnginesSection,
     EventLifecycleSection, VenueAccordion). */
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
  .story-paragraph:last-child {
    margin-bottom: 0;
  }

  .team-panel {
    width: 100%;
  }
  .team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .team-photo-stack {
    position: relative;
    width: 100%;
    height: 320px;
    perspective: 1000px;
  }
  .team-photo-frame {
    position: absolute;
    inset: 0;
    transform-origin: bottom;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    box-shadow: 0 20px 40px -20px rgba(13, 27, 62, 0.25);
  }
  .team-photo {
    object-fit: cover;
    object-position: top center;
  }

  .team-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .team-name {
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--st-on-background);
  }
  .team-role {
    margin: 0.35rem 0 0;
    font-family: var(--st-font-ui);
    font-size: 0.95rem;
    color: var(--st-on-surface-variant);
  }
  .team-contact {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
  .team-contact-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--st-radius-full);
    background: var(--st-surface-container-low);
    color: var(--st-on-surface-variant);
    transition: color 0.2s ease, background 0.2s ease;
  }
  .team-contact-link:hover {
    color: var(--st-primary);
    background: var(--st-surface-container-high);
  }
  .team-contact-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 2px;
  }

  .team-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.75rem;
  }
  /* No pill/box: no background, border, or padding — just the raw icon,
     colored via --st-on-background so it's black on the light theme and
     white on dark (the same token the "James Kim"-style name/heading text
     above it already uses), with a plain scale-up on hover/focus. */
  .team-nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    color: var(--st-on-background);
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  .team-nav-btn:hover {
    transform: scale(1.15);
    opacity: 0.7;
  }
  .team-nav-btn:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 4px;
    border-radius: var(--st-radius-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .team-nav-btn:hover {
      transform: none;
    }
  }

  @media (min-width: 768px) {
    .story-row {
      flex-direction: row;
      align-items: flex-start;
      gap: 5.5rem;
    }
    .story-text {
      width: 50%;
    }
    .team-panel {
      width: 50%;
    }
    .team-grid {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`;
