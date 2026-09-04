import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import JourneyScroll from "@/components/JourneyScroll";

/* The long-form journey page, linked from the Learn menu, the Trusted By
   section, and the spec's "Watch the full journey" line under section 6.

   The four stages live in JourneyScroll, which tells them as one guest record
   moving through four states rather than as four separate cards. Their labels
   and captions are the spec's, matching the home page stepper exactly so the
   two never describe the journey differently.

   Hero and closing copy come from the How It Works content file. That file
   also specifies a horizontal before/during/after diagram and a dashboard
   mockup, neither of which exists here: the journey is told as a pinned
   scroll instead, and rebuilding it as a static diagram would mean removing
   that. Those two sections are open questions for the partner, not omissions
   made silently. */

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how idexi Pass, Flow, and Face work together to issue fraud-proof tickets, scan guests offline, and deliver photos in under five minutes.",
};

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How It Works"
      title="Before the Doors Open. During the Event. After It Ends."
      intro="One connected system: Pass, Flow, and Face hand off to one another automatically, at exactly the right moment."
      wide
    >
      {/* The content file's section 2 heading. The pinned journey below is the
          timeline it introduces. */}
      <h2 className="hiw-timeline-head">Here&apos;s exactly what happens, and when.</h2>

      <JourneyScroll />

      {/* The content file's section 4. A heading, a line and one button: it
          specifies a button here rather than the full lead form, which lives
          on the home page and the product pages. */}
      <section className="hiw-cta">
        <h2 className="hiw-cta-heading">Ready to see it in action?</h2>
        <p className="hiw-cta-sub">
          Tell us about your event. We&apos;ll show you exactly how it all connects,
          with no commitment and no pressure.
        </p>
        <Link href="/#contact" className="st-btn st-btn-primary">
          Book a Demo
        </Link>
      </section>

      <style>{hiwCSS}</style>
    </PageShell>
  );
}

const hiwCSS = `
  /* Sits between the page intro and the pinned journey, so it needs enough
     air above it to read as the start of a section rather than a third line
     of the masthead. */
  .hiw-timeline-head {
    margin: clamp(2.5rem, 6vh, 4rem) 0 clamp(1.5rem, 4vh, 2.5rem);
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.6rem, 2.4vw + 0.9rem, 2.3rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }

  .hiw-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    max-width: min(100%, 34rem);
    /* Carries the breathing room the closing tricolon used to provide
       between the pinned journey and the ask. */
    margin: clamp(3.5rem, 9vh, 6rem) auto clamp(2rem, 5vh, 3rem);
    text-align: center;
  }
  .hiw-cta-heading {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.7rem, 2.6vw + 0.9rem, 2.4rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }
  .hiw-cta-sub {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .hiw-cta .st-btn { margin-top: 0.5rem; }

`;
