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
  title: "Use Cases",
  description:
    "Graduations, summits, conferences, expos, and galas: how idexi provides offline event check-in, fraud-proof ticketing, and AI photos.",
};

export default function UseCasesPage() {
  return (
    <div className="ucp">
      <style>{pageCSS}</style>

      {/* The light page and the dark reel meet twice. Neither meeting is a
          blend: a gradient between them is a seam by definition, a band of
          interpolated grey with nothing in it, and it reads as a rendering
          artifact rather than a decision.

          Instead the light page is two panels that overlap the reel, each
          with a rounded edge, so the dark slab appears to slide underneath
          the page. Every edge stays a clean curve at full contrast. The
          corner notches show the photograph because these panels sit above
          the reel in the stacking order while the page background sits
          below it. */}
      <header className="ucp-masthead">
        <div className="ucp-measure">
          <Link href="/" className="ucp-back">
            &larr; Back to idexi
          </Link>
          <p className="ucp-eyebrow">Use Cases</p>
          <h1 className="ucp-title">Every Event Is Different. idexi Adapts.</h1>
          <p className="ucp-intro">
            Find your event type below, and see exactly how the pieces fit together.
          </p>
        </div>
      </header>

      <UseCaseReel />

      <div className="ucp-tail" aria-hidden="true" />
    </div>
  );
}

const pageCSS = `
  .ucp {
    /* One radius drives both seams, so the top and bottom edges of the slab
       are the same shape. */
    --ucp-seam: clamp(30px, 4.5vw, 64px);
    position: relative;
    background: var(--st-background);
    transition: background 0.4s ease;
  }

  .ucp-masthead,
  .ucp-tail {
    position: relative;
    /* Above the reel, below nothing. The reel paints over the page
       background, so the area outside each rounded corner shows the
       photograph rather than the page. */
    z-index: 2;
    background: var(--st-background);
  }

  .ucp-masthead {
    padding: 7rem 1.5rem calc(var(--ucp-seam) + 2.5rem);
    margin-bottom: calc(var(--ucp-seam) * -1);
    border-bottom-left-radius: var(--ucp-seam);
    border-bottom-right-radius: var(--ucp-seam);
  }

  .ucp-tail {
    height: calc(var(--ucp-seam) + 2.5rem);
    margin-top: calc(var(--ucp-seam) * -1);
    border-top-left-radius: var(--ucp-seam);
    border-top-right-radius: var(--ucp-seam);
  }

  .ucp-measure {
    max-width: 70ch;
    margin: 0 auto;
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
      padding: 5rem 1.25rem calc(var(--ucp-seam) + 1.75rem);
    }
  }
`;
