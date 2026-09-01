"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Ported from Engineered For Every Venue.md's interactive-image-accordion
// template. Two deliberate deviations from the literal source, both
// low-cost and non-visual:
// - next/image instead of raw <img>: the template's onError fallback
//   existed to handle unreliable remote Unsplash URLs, which doesn't apply
//   to local files in public/ that are guaranteed to exist, and every other
//   local image on this site already goes through next/image.
// - <button> instead of a non-interactive <div onMouseEnter>: same visual
//   result, but keyboard users can Tab to an item and activate it with
//   Enter/Space for free, at no extra code cost.
// Content (venue names, images, the static left-column copy) is swapped
// for the real idexi data from page.md and public/ in place of the
// template's unrelated "Voice Assistant / AI Agent" placeholder set.

interface VenueItem {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Deep link into the matching panel of the /use-cases reel. */
  href: string;
}

const accordionItems: VenueItem[] = [
  {
    id: 1,
    title: "Corporate Summits",
    href: "/use-cases#summits",
    description: "Your VIPs recognized the second they walk in, your sponsors seen everywhere else.",
    image: "/venue-summits.webp",
    alt: "Executives networking on stage at a corporate conference",
  },
  {
    id: 2,
    title: "Trade Shows & Exhibitions",
    href: "/use-cases#tradeshows",
    description: "Thousands of badges scanned in seconds, with no scanners to buy and no lines to manage.",
    /* Not venue-expos.webp, which the Conferences card below already uses:
       two identical photographs in a five-card accordion reads as a bug. This
       is the same photograph the /use-cases trade shows panel uses, so the
       card and the page it links to now show the same room. */
    image: "/flow-trade-expo.jpg",
    alt: "Visitors moving between exhibitor stands on a trade show floor",
  },
  {
    id: 3,
    title: "Conferences & Expos",
    href: "/use-cases#conferences",
    description: "One QR code covers every session, so guests always end up exactly where they belong.",
    image: "/venue-expos.webp",
    alt: "Attendees browsing exhibitor booths on a busy expo floor",
  },
  {
    id: 4,
    title: "Gala & Private Events",
    href: "/use-cases#weddings",
    description: "Private photo albums reach every guest before they have left the venue.",
    image: "/venue-galas.webp",
    alt: "Guests in formal attire mingling at an elegant evening gala",
  },
  {
    id: 5,
    title: "Universities & Graduations",
    href: "/use-cases#graduations",
    description: "Graduates get their photos the moment they walk off stage.",
    image: "/venue-graduations.webp",
    alt: "Graduates in caps and gowns celebrating at a commencement ceremony",
  },
];

function AccordionItem({
  item,
  isActive,
  onActivate,
}: {
  item: VenueItem;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={`venue-item${isActive ? " venue-item-active" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-current={isActive ? "true" : undefined}
    >
      <Image src={item.image} alt={item.alt} fill sizes="400px" className="venue-item-img" />
      <div className="venue-item-overlay" aria-hidden="true" />
      <span className="venue-item-caption">{item.title}</span>
      {/* These cards route somewhere now, so the active one has to look like
          it does. Shown only when expanded, where there is room for it. */}
      <span className="venue-item-go" aria-hidden="true">
        See use case
        <span className="venue-item-go-arrow"> &rarr;</span>
      </span>
    </Link>
  );
}

export default function VenueAccordion() {
  const [activeIndex, setActiveIndex] = useState(4);
  const activeItem = accordionItems[activeIndex];

  return (
    <div id="use-cases" className="venue-wrap">
      <style>{venueCSS}</style>
      <section className="venue-section">
        <div className="venue-row">
          {/* Left Side: Text Content */}
          <div className="venue-text">
            <h2 className="venue-heading">{activeItem.title}</h2>
            <p className="venue-subtext">{activeItem.description}</p>
            <div className="venue-cta-wrap">
              <Link href="/#contact" className="st-btn st-btn-primary">
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="venue-accordion-col">
            <div
              className="venue-accordion"
              style={{
                gridTemplateColumns: accordionItems.map((_, i) => (i === activeIndex ? "6fr" : "1fr")).join(" "),
              }}
            >
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const venueCSS = `
  .venue-wrap {
    background: var(--st-background);
    transition: background 0.4s ease;
    /* Clears the fixed Navbar pill when landed on via a #use-cases anchor
       jump, so the heading isn't tucked under it. */
    scroll-margin-top: 96px;
  }
  .venue-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
  }
  .venue-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }

  .venue-text {
    width: 100%;
    text-align: center;
  }
  /* Brand serif display heading — matches OurStorySection/CtaSection's
     heading declaration (family + weight), the shared look every main
     section heading on the page uses. */
  .venue-heading {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .venue-subtext {
    margin: 1.5rem auto 0;
    max-width: 36rem;
    font-family: var(--st-font-ui);
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .venue-cta-wrap {
    margin-top: 2rem;
  }

  .venue-accordion-col {
    width: 100%;
  }
  /* display: grid with an animated grid-template-columns (set inline per
     render, see the component), not display: flex with each item
     animating its own width: animating width directly triggers layout on
     every frame (flagged by the design hook — a real issue, not a false
     positive). This is the same grid-track-animation technique already
     used in EventLifecycleSection's step description expand, applied here
     to a horizontal accordion instead of a vertical one. A flex item
     couldn't use transform alone as the fix, because the whole point of
     this interaction is that inactive siblings visibly compress as the
     active one grows — transform doesn't affect sibling layout, only the
     transformed element itself, so the resize itself has to be a real
     layout-affecting animation. Animating the container's grid-template-
     columns keeps that one width change to a single container-level
     property instead of 5 separate per-item width transitions. */
  .venue-accordion {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    transition: grid-template-columns 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .venue-item {
    position: relative;
    height: 450px;
    width: 100%;
    border: none;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    background: var(--st-surface-container-low);
  }
  .venue-item:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
  }
  .venue-item-img {
    object-fit: cover;
  }
  .venue-item-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .venue-item-go {
    position: absolute;
    left: 50%;
    bottom: 1.4rem;
    transform: translateX(-50%) translateY(6px);
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 0.82rem;
    letter-spacing: 0.02em;
    color: #ffffff;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .venue-item-active .venue-item-go {
    opacity: 0.92;
    transform: translateX(-50%) translateY(0);
  }
  .venue-item-go-arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .venue-item:hover .venue-item-go-arrow {
    transform: translateX(3px);
  }

  .venue-item-caption {
    position: absolute;
    left: 50%;
    bottom: 6rem;
    transform: translateX(-50%) rotate(90deg);
    width: auto;
    text-align: left;
    white-space: nowrap;
    font-family: var(--st-font-ui);
    font-weight: 600;
    font-size: 1.125rem;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  .venue-item-active .venue-item-caption {
    bottom: 3.5rem;
    transform: translateX(-50%) rotate(0deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .venue-accordion,
    .venue-item-go,
    .venue-item-go-arrow {
      transition: none !important;
    }

    .venue-accordion,
    .venue-item-caption {
      transition: none !important;
    }
  }

  /* Small phones only (the 768px row/column breakpoint below is untouched):
     the 450px item height was tuned for wider screens and reads as
     cramped/overly elongated on a narrow phone with 5 columns squeezed
     into ~350px. Shortened here, with the caption's rest position pulled
     in to match so the vertical label still sits comfortably inside the
     shorter card. */
  @media (max-width: 640px) {
    .venue-item {
      height: 320px;
    }
    .venue-item-caption {
      bottom: 4.5rem;
      font-size: 1rem;
    }
    .venue-item-go {
      bottom: 1.1rem;
      font-size: 0.78rem;
    }
    /* The active item's caption goes horizontal at the card's actual width
       (a fraction of the viewport via the grid-template-columns fr split),
       which on a narrow phone can be less than the longest venue name's
       single-line width — it was clipping at the card edge instead of
       wrapping. Letting it wrap to two lines and centering it reads far
       better than either the clip or forcing the card wider. */
    .venue-item-active .venue-item-caption {
      bottom: 3rem;
      white-space: normal;
      text-align: center;
      max-width: calc(100% - 2rem);
      line-height: 1.25;
    }
  }

  @media (min-width: 768px) {
    .venue-row {
      flex-direction: row;
    }
    .venue-text {
      width: 50%;
      text-align: left;
    }
    .venue-subtext {
      margin-left: 0;
      margin-right: 0;
    }
    .venue-accordion-col {
      width: 50%;
    }
  }
`;
