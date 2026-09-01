import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import JourneyScroll from "@/components/JourneyScroll";

/* The long-form journey page, linked from the Learn menu, the Trusted By
   section, and the spec's "Watch the full journey" line under section 6.

   The four stages live in JourneyScroll, which tells them as one guest record
   moving through four states rather than as four separate cards. Their labels
   and captions are the spec's, matching the home page stepper exactly so the
   two never describe the journey differently. */

export const metadata: Metadata = {
  title: "How It Works | idexi",
  description:
    "From ticket to photo in under five minutes: how idexi Pass, Flow, and Face hand one guest record between them across a single event.",
};

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How It Works"
      title="From ticket to photo, under 5 minutes"
      intro="One guest record moves through four stages. Nothing is re-entered between them, which is the whole reason the timing holds."
      wide
    >
      <JourneyScroll />

      <section className="hiw-close">
        <p className="hiw-close-line">Guests never search.</p>
        <p className="hiw-close-line">Staff never guess.</p>
        <p className="hiw-close-line">You never lose control.</p>
      </section>

      <p className="shell-note">
        Want to see it against your own event?{" "}
        <Link href="/#contact">Book a demo</Link> and we will map the four stages
        onto your doors, your sessions, and your photographers.
      </p>

      <style>{hiwCSS}</style>
    </PageShell>
  );
}

const hiwCSS = `
  /* No side accent bar here. These three lines are the page's closing
     argument and carry themselves on type and space; a coloured rule down
     one edge is the most recognisable tell of generated UI and adds nothing
     the words do not already do. */
  .hiw-close {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin: var(--st-space-lg) 0 3rem;
    padding-top: var(--st-space-md);
    border-top: 1px solid var(--st-outline-variant);
  }

  .hiw-close-line {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.5rem, 3.2vw, 2.35rem);
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .hiw-close-line:nth-child(2) { color: var(--st-on-surface-variant); }
  .hiw-close-line:nth-child(3) { color: var(--st-on-surface-variant); }
`;
