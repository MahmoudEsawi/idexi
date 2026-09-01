import type { Metadata } from "next";
import Link from "next/link";
import UseCaseReel from "@/components/UseCaseReel";

/* The full use-cases page.

   This page deliberately does not use PageShell. The reel is full-bleed, and
   breaking out of a max-width container needs the 100vw negative-margin trick,
   which overflows horizontally by exactly the scrollbar width on any desktop
   that shows one. A bespoke masthead above a full-width reel avoids the
   problem rather than papering over it.

   The six categories and their hook lines are the spec's, in the spec's
   deliberate order (academic, then corporate, then personal). They live in
   UseCaseReel.

   Spec constraint carried over: do not name real events here. Naming the
   Robotics Championship, IEEE AESS, or TEDx PHU is Trusted By's job. This page
   is about capability, not history. */

export const metadata: Metadata = {
  title: "Use Cases | idexi",
  description:
    "Graduations, competitions, conferences, corporate summits, trade shows, and weddings: how idexi fits each kind of event.",
};

export default function UseCasesPage() {
  return (
    <div className="ucp">
      <style>{pageCSS}</style>

      <header className="ucp-masthead">
        <Link href="/" className="ucp-back">
          &larr; Back to idexi
        </Link>
        <p className="ucp-eyebrow">Use Cases</p>
        <h1 className="ucp-title">Built for every kind of event</h1>
        <p className="ucp-intro">
          Find your event below and see exactly how idexi fits it. The pieces are the same
          each time; what changes is which door matters most.
        </p>
      </header>

      {/* The masthead sits on the light page background and the reel is
          near-black. Cutting straight between them read as two pages stapled
          together, so each edge gets a band that carries one into the other. */}
      <div className="ucp-fade ucp-fade-in" aria-hidden="true" />

      <UseCaseReel />

      <div className="ucp-fade ucp-fade-out" aria-hidden="true" />
    </div>
  );
}

const pageCSS = `
  .ucp {
    background: var(--st-background);
    transition: background 0.4s ease;
  }

  .ucp-masthead {
    max-width: 70ch;
    margin: 0 auto;
    padding: 7rem 1.5rem 3rem;
  }

  .ucp-fade {
    height: clamp(90px, 14vh, 170px);
  }
  .ucp-fade-in {
    background: linear-gradient(to bottom, var(--st-background) 0%, #05070d 100%);
  }
  .ucp-fade-out {
    background: linear-gradient(to bottom, #05070d 0%, var(--st-background) 100%);
  }

  .ucp-back {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--st-on-surface-variant);
    font-size: 0.95rem;
    transition: color 0.25s ease;
  }
  .ucp-back:hover { color: var(--st-secondary); }
  .ucp-back:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .ucp-eyebrow {
    margin-bottom: 0.85rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-secondary);
  }

  .ucp-title {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }

  .ucp-intro {
    margin-top: 1rem;
    font-family: var(--st-font-serif);
    font-size: clamp(1.1rem, 1vw + 0.9rem, 1.3rem);
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  @media (max-width: 768px) {
    .ucp-masthead {
      padding: 5rem 1.25rem 2rem;
    }
  }
`;
