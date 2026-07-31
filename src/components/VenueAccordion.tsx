"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Venue {
  name: string;
  desc: string;
  image: string;
  alt: string;
}

const venues: Venue[] = [
  {
    name: "Corporate Summits",
    desc: "Express check-ins and live intelligence for high-profile events.",
    image: "/1.-Corporate-Summits.webp",
    alt: "Executives networking on stage at a corporate conference",
  },
  {
    name: "Music Festivals",
    desc: "Manage high-density gates and monitor safety in real-time.",
    image: "/2.-Music-Festivals.webp",
    alt: "A dense festival crowd facing a brightly lit stage at night",
  },
  {
    name: "University Events",
    desc: "Handle graduation crowds and get every student their photos.",
    image: "/5.-Universities-_-Graduations.webp",
    alt: "Graduates in caps and gowns celebrating at a commencement ceremony",
  },
  {
    name: "Conferences & Expos",
    desc: "Automate lead capture and attendee journey tracking.",
    image: "/3.-Conferences-_-Expos.webp",
    alt: "Attendees browsing exhibitor booths on a busy expo floor",
  },
  {
    name: "Gala & Private Events",
    desc: "Automatic private photo albums delivered to each guest.",
    image: "/4.-Gala-_-Private-Events.webp",
    alt: "Guests in formal attire mingling at an elegant evening gala",
  },
];

export default function VenueAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = venues[activeIndex];

  const canHoverActivate = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMouseEnter = (index: number) => {
    if (canHoverActivate()) setActiveIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusIndex = buttonRefs.current.findIndex((btn) => btn === document.activeElement);
    if (focusIndex === -1) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") {
      nextIndex = (focusIndex + 1) % venues.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (focusIndex - 1 + venues.length) % venues.length;
    }
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <>
      <style>{venueCSS}</style>
      <div className="venue-layout">
        {/* Desktop/tablet: static eyebrow + CTA, dynamic name/description */}
        <div className="venue-left">
          <span className="venue-eyebrow">Venue Types</span>
          <div className="venue-dynamic">
            <h3 className="venue-name" aria-live="polite">
              {active.name}
            </h3>
            <p className="venue-desc" aria-live="polite">
              {active.desc}
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary venue-cta">
            Book a Demo <ArrowRight size={16} />
          </Link>
        </div>

        <div
          className="venue-accordion"
          role="tablist"
          aria-label="Venue types"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
        >
          {venues.map((venue, i) => {
            const isActive = i === activeIndex;
            const tabId = `venue-tab-${i}`;
            const panelId = `venue-panel-${i}`;

            return (
              <div className={`venue-panel-group ${isActive ? "venue-panel-active" : ""}`} key={venue.name}>
                <button
                  ref={(el) => {
                    buttonRefs.current[i] = el;
                  }}
                  id={tabId}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  className="venue-panel"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onFocus={() => setActiveIndex(i)}
                >
                  <div className="venue-panel-media">
                    <Image
                      src={venue.image}
                      alt={venue.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 740px, 520px"
                      className="venue-panel-img"
                      loading={i === 0 ? undefined : "lazy"}
                      priority={i === 0}
                    />
                    <div className="venue-panel-overlay" aria-hidden="true" />
                    <div className="venue-panel-text-scrim" aria-hidden="true" />
                  </div>
                  <span className="venue-panel-label-wrap">
                    <span className="venue-panel-label">{venue.name}</span>
                  </span>
                </button>

                {/* Mobile-only: description expands inline beneath this panel's own row */}
                <div id={panelId} role="tabpanel" aria-labelledby={tabId} className="venue-panel-mobile">
                  <div className="venue-panel-mobile-inner">
                    <p>{venue.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const venueCSS = `
  .venue-layout {
    display: flex;
    align-items: stretch;
    gap: 3rem;
  }

  /* ═══ LEFT COLUMN ═══ */
  .venue-left {
    flex: 0 0 340px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .venue-eyebrow {
    font-family: var(--font-headings);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-cyan);
  }
  .venue-dynamic {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    /* Sized to the longest name + longest description in this set so switching
       venues never shifts the CTA below it. */
    min-height: 190px;
  }
  .venue-name {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text-primary);
  }
  .venue-desc {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-secondary);
  }
  .venue-cta {
    align-self: flex-start;
  }

  /* ═══ ACCORDION ═══ */
  .venue-accordion {
    flex: 1;
    display: flex;
    align-items: stretch;
    gap: 0.85rem;
    height: 440px;
    min-width: 0;
  }
  .venue-panel-group {
    position: relative;
    flex: 0 60px;
    min-width: 60px;
    transition: flex-grow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .venue-panel-group.venue-panel-active {
    flex-grow: 6;
  }
  .venue-panel {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 44px;
    border: 1.5px solid var(--glass-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    padding: 0;
    cursor: pointer;
    background: var(--bg-deep);
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .venue-panel:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 3px;
  }
  .venue-panel-active .venue-panel {
    border-color: var(--accent-cyan);
    box-shadow: 0 0 28px 2px var(--accent-glow);
  }
  .venue-panel-media {
    position: absolute;
    inset: 0;
  }
  .venue-panel-img {
    object-fit: cover;
  }
  .venue-panel-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(11, 18, 50, 0.35) 0%,
      var(--bg-gradient-start) 100%
    );
    opacity: 0.85;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
  .venue-panel-active .venue-panel-overlay {
    opacity: 0.45;
  }
  /* Independent of the panel-wide overlay above (which is intentionally lighter
     on the active panel to show off the photo) — this scrim sits at a fixed,
     unconditional opacity purely to guarantee the label text stays readable
     regardless of active state or how bright the underlying photo is there.
     Measured: without this, 3 of 5 venue photos failed 4.5:1 contrast on the
     active panel's lighter overlay (as low as 3.32:1). */
  .venue-panel-text-scrim {
    position: absolute;
    inset: auto 0 0 0;
    height: 45%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(11, 18, 50, 0.7) 55%,
      rgba(11, 18, 50, 0.92) 100%
    );
    pointer-events: none;
  }
  /* Rotating .venue-panel-label directly around its own center (the old
     approach) pivots around a point whose position depends on the text's
     length — the longer the name, the further the rotated box's edge swings
     past the panel boundary, clipping the first letters against overflow:
     hidden ("Conferences & Expos" overflowed the bottom by 46px). Wrapping it
     in a fixed box spanning the panel's full height and centering the rotated
     label inside via flexbox sidesteps that: the label is always centered in
     a space taller than any of these five names could need, so nothing is
     clipped regardless of length. */
  .venue-panel-label-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.75rem 0;
    pointer-events: none;
  }
  .venue-panel-label {
    white-space: nowrap;
    font-family: var(--font-headings);
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--text-primary);
    transform: rotate(-90deg);
    transition: var(--transition-smooth);
  }
  .venue-panel-active .venue-panel-label-wrap {
    align-items: flex-end;
    padding-bottom: 1.5rem;
  }
  .venue-panel-active .venue-panel-label {
    transform: rotate(0deg);
  }

  /* Mobile-only inline expand panel — collapsed to zero height via the
     grid-rows trick (animatable height without measuring "auto" in JS),
     hidden entirely above the mobile breakpoint since the left column
     carries this same copy there instead. */
  .venue-panel-mobile {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .venue-panel-group {
      transition: none !important;
    }
    .venue-panel-overlay {
      transition: none !important;
    }
    .venue-panel-label {
      transition: none !important;
    }
  }

  /* ═══ TABLET (768–1023px): stack columns, keep accordion horizontal ═══ */
  @media (max-width: 1024px) {
    .venue-layout {
      flex-direction: column;
      gap: 2rem;
    }
    .venue-left {
      flex: none;
    }
    .venue-dynamic {
      min-height: 0;
    }
    .venue-accordion {
      /* The base rule's flex:1 1 0% (needed for desktop's row layout) sets
         flex-basis:0% — once .venue-layout switches to flex-direction:column
         here, that 0% basis applies along the height axis with nothing above
         to grow into, collapsing the accordion to ~50px regardless of the
         height below. flex:none stops it from flexing at all so height wins. */
      flex: none;
      height: 380px;
    }
  }

  /* ═══ MOBILE (<768px): vertical stack, no horizontal accordion ═══ */
  @media (max-width: 768px) {
    .venue-left {
      display: none;
    }
    .venue-accordion {
      flex: none;
      flex-direction: column;
      height: auto;
      gap: 0.75rem;
    }
    .venue-panel-group {
      flex: none;
      width: 100%;
      transition: none;
    }
    .venue-panel {
      display: block;
      height: auto;
      min-height: 44px;
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    }
    .venue-panel-media {
      position: relative;
      inset: auto;
      height: 130px;
    }
    .venue-panel-active .venue-panel-media {
      height: 170px;
    }
    .venue-panel-label-wrap {
      position: static;
      display: block;
      padding: 0;
    }
    .venue-panel-label {
      position: static;
      display: block;
      transform: none !important;
      text-align: left;
      padding: 0.85rem 1.1rem;
      background: var(--glass-bg);
    }
    .venue-panel-mobile {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s ease;
      overflow: hidden;
      background: var(--glass-bg);
      border: 1.5px solid var(--glass-border);
      border-top: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    }
    .venue-panel-active .venue-panel-mobile {
      grid-template-rows: 1fr;
    }
    .venue-panel-mobile-inner {
      min-height: 0;
      overflow: hidden;
      padding: 0 1.1rem;
    }
    .venue-panel-active .venue-panel-mobile-inner {
      padding: 0 1.1rem 1.1rem;
    }
    .venue-panel-mobile-inner p {
      font-size: 0.92rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }
    @media (prefers-reduced-motion: reduce) {
      .venue-panel-mobile {
        transition: none !important;
      }
    }
  }
`;
