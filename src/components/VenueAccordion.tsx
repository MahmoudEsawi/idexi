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
    image: "/use-cases/summits-portrait.webp",
    alt: "Delegates in business attire talking over drinks at an evening summit reception",
  },
  {
    id: 2,
    title: "Trade Shows & Exhibitions",
    href: "/use-cases#tradeshows",
    description: "Thousands of badges scanned in seconds, with no scanners to buy and no lines to manage.",
    /* Each card carries the same photograph as the /use-cases panel it links
       to, so the card and the page it opens show the same room. */
    image: "/use-cases/tradeshows-portrait.webp",
    alt: "A packed exhibition hall of stands and lanyarded visitors",
  },
  {
    id: 3,
    title: "Conferences & Talks",
    href: "/use-cases#conferences",
    description: "One QR code covers every session, so guests always end up exactly where they belong.",
    image: "/use-cases/conferences-portrait.webp",
    alt: "A seated auditorium audience facing a speaker at a lit podium",
  },
  {
    id: 4,
    title: "Weddings & Private Celebrations",
    href: "/use-cases#weddings",
    description: "Private photo albums reach every guest before they have left the venue.",
    image: "/use-cases/weddings-portrait.webp",
    alt: "Guests dancing under festoon lights at a wedding reception",
  },
  {
    id: 5,
    title: "Graduations",
    href: "/use-cases#graduations",
    description: "Graduates get their photos the moment they walk off stage.",
    image: "/use-cases/graduations-portrait.webp",
    alt: "Graduates throwing their caps in the air at an outdoor ceremony at sunset",
  },
  {
    id: 6,
    title: "Competitions",
    href: "/use-cases#competitions",
    description: "Hundreds of participants checked in and sorted automatically, with no printed lists or spreadsheets.",
    image: "/use-cases/competitions-portrait.webp",
    alt: "A student robotics team gathered around their machine at a competition table",
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
      {/* The slat is a tall crop: 302x450 open on desktop, 154x320 on mobile,
          and it never grows past that. sizes says so, so the browser fetches a
          ~320px derivative rather than the 1920 it would pick from 100vw. The
          source is the 2:3 portrait cut for the same reason: cover-cropping the
          landscape original into this slot is height-constrained, and the
          browser would have to download ~2.7x the slat width and discard it. */}
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 767px) 220px, 320px"
        quality={70}
        className="venue-item-img"
      />
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
        <header className="venue-masthead">
          <h2 className="venue-title">Built for every kind of event.</h2>
          <p className="venue-intro">
            Find your event below, and see exactly how idexi fits it.
          </p>
        </header>

        <div className="venue-row">
          {/* Left Side: Text Content */}
          <div className="venue-text">
            <h3 className="venue-heading">{activeItem.title}</h3>
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
                gridTemplateColumns: accordionItems
                  .map((_, i) => (i === activeIndex ? "var(--venue-open)" : "var(--venue-slat)"))
                  .join(" "),
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

  /* Section masthead. Serif title at the shared main-heading size, with the
     card title below it stepped down so the two never compete. */
  .venue-masthead {
    max-width: 44rem;
    margin: 0 auto var(--st-space-lg);
    text-align: center;
  }
  .venue-title {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2rem, 3vw + 1rem, 3rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }
  .venue-intro {
    margin: var(--st-space-sm) auto 0;
    max-width: 34rem;
    font-family: var(--st-font-ui);
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
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
    font-size: clamp(1.9rem, 3.5vw, 2.85rem);
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
    --venue-open: 6fr;
    --venue-slat: 1fr;
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
    border-radius: var(--st-radius-lg);
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
    bottom: 50%;
    transform: translate(-50%, 50%) rotate(90deg);
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
    /* Six cards on a 390px screen: the 1rem gutters alone were eating 112px
       of the track, which left the collapsed strips narrower than the label
       standing in them. Tighter gutters and a smaller open share buy the
       strips back without meaningfully shrinking the open card. */
    .venue-accordion {
      --venue-open: 4fr;
      gap: 0.5rem;
      padding: 0.75rem;
    }
    .venue-item {
      height: 320px;
    }
    .venue-item-caption {
      bottom: 50%;
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

  /* Phones step down to the shared mobile section rhythm. */
  @media (max-width: 768px) {
    .venue-section { padding-top: var(--st-space-lg); padding-bottom: var(--st-space-lg); }
  }
`;
