"use client";

import * as React from "react";
import { useMotionValueEvent } from "framer-motion";
import {
  ScrollCard,
  ScrollCardDeck,
  ScrollCardStack,
  ScrollCardViewport,
  useScrollCardStack,
} from "@/components/ScrollCardStack";

/* Master spec section 4. Copy is verbatim from the spec: these ten lines carry
   specific, concrete detail that would be damaged by rewriting, so the only new
   copy here is the heading and the counter label.

   The spec asks for a manual carousel with arrows and dot indicators. That is
   superseded deliberately: a carousel shows one line and hides nine, and these
   are the strongest lines in the document. The scroll stack shows all ten in
   sequence with no clicking. The counter survives because knowing you are three
   of ten is genuinely useful; the arrows and dots do not, because there is
   nothing to click in a scroll-driven stack. */
const PROBLEMS = [
  // Trimmed from the spec's ten to five on CRO grounds (see
  // HOMEPAGE-CRO-AUDIT.md). Ten cards cost about three screens of pinned
  // scroll for very little marginal persuasion, and several restated each
  // other: "wrong ticket category" and "wrong person in VIP" are both
  // access-control failures, "ran out of kits" and "scanner died" are both
  // operational chaos. These five each own a distinct product or a distinct
  // buyer fear, so nothing in the argument is lost.
  "A line of two hundred people at the door, with one person checking names off a printed sheet or excel sheet.",
  "A ticket that was screenshotted and used twice at the door.",
  "A guest emailing three days later, still asking where their photos are.",
  "A sponsor asking why their logo isn't on anything guests actually saw.",
  "Sitting down after the event with no real idea of how many people actually showed up, or when.",
];

/* Cards are handed index + STACK_OFFSET, matching the reference implementation
   so the first card holds briefly before the stack starts moving. */
const STACK_OFFSET = 2;

function ProblemCounter({ total }: { total: number }) {
  const { scrollYProgress, reduced } = useScrollCardStack();
  const [active, setActive] = React.useState(1);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Card i occupies [i / (n + 1), (i + 1) / (n + 1)] and leaves across that
    // span, so the card in front at any progress is the first one that has not
    // finished leaving.
    const position = Math.round(progress * (total + 1)) - (STACK_OFFSET - 1);
    setActive(Math.min(Math.max(position, 1), total));
  });

  if (reduced) return null;

  return (
    <p className="problem-counter" aria-hidden="true">
      <span className="problem-counter-current">{String(active).padStart(2, "0")}</span>
      <span className="problem-counter-sep"> / </span>
      <span className="problem-counter-total">{String(total).padStart(2, "0")}</span>
    </p>
  );
}

export default function ProblemSection() {
  return (
    <section className="problem-section" id="the-problem">
      <style>{problemCSS}</style>

      <div className="problem-intro">
        <h2 className="problem-heading">You know these moments.</h2>
      </div>

      <ScrollCardStack className="problem-stack">
        <ScrollCardViewport>
          <div className="problem-stage">
            <ProblemCounter total={PROBLEMS.length} />
            <ScrollCardDeck className="problem-deck" role="list">
              {PROBLEMS.map((problem, i) => (
                <ScrollCard
                  key={problem}
                  arrayLength={PROBLEMS.length}
                  index={i + STACK_OFFSET}
                  variant="light"
                  className="problem-card"
                  role="listitem"
                >
                  <span className="problem-card-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="problem-card-text">{problem}</p>
                </ScrollCard>
              ))}
            </ScrollCardDeck>
          </div>
        </ScrollCardViewport>
      </ScrollCardStack>
    </section>
  );
}

/* Scroll budget: 300vh for ten cards, roughly 30vh each. The reference demo
   allocates 300vh for five, and applying that ratio to ten would want 600vh,
   which would make this one section about a third of the entire home page. */
const problemCSS = `
  .problem-section {
    position: relative;
    background: var(--st-background);
    transition: background 0.4s ease;
    /* The global "section { overflow: hidden }" in globals.css made this
       element the nearest scrollport for the sticky viewport inside it, so
       the deck never pinned: it scrolled away at exactly the rate of the
       page while the cards animated on regardless, which is what left the
       section looking like 300vh of empty space.

       overflow-x: clip clips the same way hidden does but does NOT create a
       scroll container, so sticky resolves against the viewport again. Only
       the X axis is clipped, because clipping Y would cut off the pinned
       deck; clip is the one value that may pair with visible on the other
       axis (hidden would force it back to auto and reintroduce the bug).
       Overriding here rather than in globals.css keeps every other section
       on the site untouched.

       Do not put backticks in this comment. It sits inside a template
       literal and a backtick ends the string. */
    overflow-x: clip;
    overflow-y: visible;
  }

  .problem-intro {
    max-width: 70ch;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile) 0;
    text-align: center;
  }

  .problem-heading {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }

  .problem-stack {
    height: 190vh;
  }

  .problem-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--st-space-md);
    width: 100%;
  }

  .problem-counter {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    color: var(--st-on-surface-variant);
    font-variant-numeric: tabular-nums;
  }
  .problem-counter-current {
    color: var(--st-secondary);
  }

  .problem-deck {
    --scs-card-w: min(560px, 88vw);
    --scs-card-h: 260px;
    /* Cards are absolutely placed at top: index * incrementY, so the deck's
       real visual mass extends about 100px below its own box. Without this
       the flex centering above measures only the box and parks the whole
       fan low in the viewport. Flexbox centres (content + margin), so this
       lifts the visible mass by roughly half its value. */
    margin-bottom: 130px;
  }

  .problem-card {
    justify-content: flex-start;
    gap: 0;
    padding: var(--st-space-md) clamp(1.5rem, 4vw, 2.5rem);
  }

  .problem-card-num {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    color: var(--st-secondary);
    font-variant-numeric: tabular-nums;
  }

  /* Optically centred in the space under the number rather than pinned to
     the card's bottom edge, which left an obvious dead band mid-card. */
  .problem-card-text {
    margin: auto 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
    line-height: 1.35;
    color: var(--st-on-surface);
    text-wrap: balance;
  }

  /* Reduced motion turns the stack into a plain list, so the cards no longer
     need a fixed height and the section no longer needs a scroll runway. */
  .problem-stack[data-static='true'] {
    height: auto;
    padding: var(--st-space-lg) var(--st-space-margin-mobile) var(--st-space-xl);
  }
  .problem-stack[data-static='true'] .problem-card {
    min-height: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .problem-stack {
      height: auto;
      padding: var(--st-space-lg) var(--st-space-margin-mobile) var(--st-space-xl);
    }
  }

  @media (max-width: 640px) {
    .problem-deck {
      --scs-card-h: 300px;
      margin-bottom: 70px;
    }
    .problem-intro {
      padding-top: var(--st-space-lg);
    }
  }
`;
