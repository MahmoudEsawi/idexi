"use client";

import Link from "next/link";
import IntroStrobeLoader from "@/components/IntroStrobeLoader";
import HeroKineticPhotos from "@/components/HeroKineticPhotos";
import AIEnginesSection from "@/components/AIEnginesSection";
import EventLifecycleSection from "@/components/EventLifecycleSection";
import VenueAccordion from "@/components/VenueAccordion";
import OurStorySection from "@/components/OurStorySection";
import CtaSection from "@/components/CtaSection";
import EventProofSection from "@/components/EventProofSection";

import ProblemSection from "@/components/ProblemSection";
import SponsorsSection from "@/components/SponsorsSection";

export default function Home() {
  return (
    <>
      <IntroStrobeLoader />
      <style>{pageCSS}</style>

      {/* ─── HERO ─── */}
      <section className="st-hero">
        <div className="st-hero-content">
          <h1 className="st-hero-title st-headline-xl">
            Tickets Sent. Guests Scanned. Photos Delivered.
          </h1>
          <p className="st-hero-subtitle">
            One system, three moments, handled automatically from the first click to the
            last photo.
          </p>
          <div className="st-hero-actions">
            <Link href="/#contact" className="st-btn st-btn-primary">
              Book a Demo
            </Link>
            <Link href="/how-it-works" className="st-btn st-btn-bracket">
              See How It Works
            </Link>
          </div>
          {/* Price anchor sits under the CTAs rather than in the headline: it
              qualifies traffic before anyone fills the form, and answers the
              first question most organizers actually have. */}
          <p className="st-hero-price">
            Plans start at <strong>$199 per event</strong>. No hardware to buy.
          </p>
        </div>

        {/* Right Column: Transparent Kinetic Photo Moodboard */}
        <div className="st-hero-visual-col">
          <HeroKineticPhotos />
        </div>
      </section>

      <EventProofSection />
      <ProblemSection />
      <AIEnginesSection />
      <EventLifecycleSection />
      <SponsorsSection />
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
    gap: var(--st-space-xl);
    min-height: calc(100vh - 80px);
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    background: var(--st-background);
    transition: background 0.4s ease;
    overflow: hidden;
  }

  .st-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--st-space-sm);
    max-width: 580px;
  }

  .st-hero-price {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }
  .st-hero-price strong {
    font-weight: 600;
    color: var(--st-on-background);
  }

  .st-hero-title {
    margin: 0;
    font-size: clamp(2.75rem, 4.5vw + 1rem, 4.25rem);
    line-height: 1.08;
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

  .st-hero-visual-col {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  @media (min-width: 1024px) {
    .st-hero {
      grid-template-columns: 1.05fr 1fr;
      padding-left: clamp(2.5rem, 8vw, 8rem);
      padding-right: clamp(2.5rem, 8vw, 8rem);
    }
  }

  @media (max-width: 1023px) {
    .st-hero {
      min-height: auto;
      padding-top: calc(var(--st-space-xl) + 2rem);
      padding-bottom: var(--st-space-xl);
      gap: 3rem;
    }
    .st-hero-content {
      align-items: center;
      text-align: center;
      margin: 0 auto;
    }
    .st-hero-actions {
      justify-content: center;
    }
  }
`;
