"use client";

import Link from "next/link";
import HeroNetworkGraphic from "@/components/HeroNetworkGraphic";
import AIEnginesSection from "@/components/AIEnginesSection";
import EventLifecycleSection from "@/components/EventLifecycleSection";
import VenueAccordion from "@/components/VenueAccordion";
import OurStorySection from "@/components/OurStorySection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <style>{pageCSS}</style>

      {/* ─── HERO ─── */}
      <section className="st-hero">
        <div className="st-hero-canvas-wrap" aria-hidden="true">
          <HeroNetworkGraphic />
        </div>
        <div className="st-hero-content">
          <h1 className="st-hero-title st-headline-xl">
            Intelligent Event Solutions.
          </h1>
          <p className="st-hero-subtitle">
            Frictionless event flow, entry, and instant photo sorting.
          </p>
          <div className="st-hero-actions">
            <Link href="/#contact" className="st-btn st-btn-primary">
              Book Consultation
            </Link>
            <Link href="/#services" className="st-btn st-btn-bracket">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      <AIEnginesSection />
      <EventLifecycleSection />
      <VenueAccordion />
      <OurStorySection />
      <CtaSection />
    </>
  );
}

const pageCSS = `
  .st-hero {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: var(--st-space-lg);
    min-height: 100vh;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    background: var(--st-background);
    transition: background 0.4s ease;
    overflow: visible;
  }
  .st-hero-canvas-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    z-index: 1;
    pointer-events: auto;
  }
  .st-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--st-space-sm);
    max-width: 620px;
    pointer-events: none;
  }
  .st-hero-content > * {
    pointer-events: auto;
  }
  .st-hero-title {
    margin: 0;
    /* Slightly under the general headline-xl ceiling: this H1 is short
       ("Intelligent Event Solutions.") and reads as oversized at the full
       clamp — sized here to sit "large but not overwhelming," matching the
       reference rather than maxing out the shared utility's scale. */
    font-size: clamp(2.75rem, 4.5vw + 1rem, 4.25rem);
  }
  .st-hero-subtitle {
    margin: 0;
    max-width: 38ch;
    font-family: var(--st-font-serif);
    font-weight: 400;
    font-size: clamp(1.2rem, 1vw + 1rem, 1.45rem);
    line-height: 1.55;
    color: var(--st-on-surface-variant);
  }
  .st-hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--st-space-md);
    margin-top: var(--st-space-md);
  }

  @media (min-width: 1024px) {
    .st-hero {
      grid-template-columns: 1fr 1fr;
      padding-left: clamp(2.5rem, 8vw, 9rem);
      padding-right: clamp(2.5rem, 8vw, 9rem);
    }
  }

  /* The network graphic is a full-bleed absolute layer behind the hero. It
     only has somewhere to live that ISN'T behind the text above 1024px,
     where .st-hero splits into a two-column text/graphic grid and the
     canvas biases its drawing origin to the right (see centerXFraction in
     HeroNetworkGraphic). Below that breakpoint the layout is a single
     stacked column and the canvas re-centers, so the nodes land directly
     on top of the headline and CTAs by construction — no amount of
     z-index or scrim fixes that, because both things genuinely want the
     same pixels.

     So it's hidden outright below the same 1024px seam the layout itself
     uses, rather than at 768px: between 769px and 1023px the layout is
     still single-column, so the exact same collision happens there, just
     on a tablet. Tying this to the layout breakpoint means the graphic is
     visible precisely when there's a column for it and hidden precisely
     when there isn't. Desktop is untouched.

     HeroNetworkGraphic also stops its requestAnimationFrame loop at this
     same width, so this is a real teardown rather than an invisible
     canvas still animating and burning battery. */
  @media (max-width: 1023px) {
    .st-hero-canvas-wrap {
      display: none;
    }
    /* Without the graphic there's nothing to fill a full viewport height,
       and a 100vh block holding only a headline, one line of subtitle and
       two buttons reads as a broken empty screen. Sized to the content
       instead, with generous but finite breathing room. */
    .st-hero {
      min-height: auto;
      padding-top: calc(var(--st-space-xl) + 3rem);
      padding-bottom: var(--st-space-xl);
    }
  }
`;
