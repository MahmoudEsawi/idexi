"use client";

import * as React from "react";
import { Image as ImageIcon, Mail, Ticket } from "lucide-react";

/* Master spec section 7. The only section on the site with a colored
   background, which is the point: purple appears nowhere else, so this band
   registers as distinct the instant it scrolls into view. --st-sponsor and
   --st-sponsor-surface exist for this section alone.

   "Sponsor cover" in the spec means one reusable design holding several
   partner logos, not a single logo, applied identically across all three
   touchpoints. Worth keeping straight when this copy is revised.

   The stage timing matches the lifecycle stepper's pattern rather than its
   duration: one timeout per transition, gated behind IntersectionObserver so
   nothing ticks while the section is off screen. */

const STAGES = [
  {
    icon: Ticket,
    label: "On the ticket",
    sublabel: "sponsor cover",
    caption: "Seen the moment the ticket lands in their inbox",
  },
  {
    icon: Mail,
    label: "On the email cover",
    sublabel: "seen before opening",
    caption: "Seen before the guest even opens the email",
  },
  {
    icon: ImageIcon,
    label: "On every photo",
    sublabel: "subtle watermark",
    caption: "Seen across every photo in the gallery, without covering a face",
  },
];

const ADVANCE_MS = 1600;
const COUNTER_MS = 1800;
const COUNTER_TARGET = 3000;

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/* useSyncExternalStore rather than an effect that calls setState: reading a
   media query synchronously inside an effect body triggers a cascading render,
   which React 19's lint rules reject. */
function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false
  );
}

export default function SponsorsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const reduced = usePrefersReducedMotion();

  // With motion disabled the final value is rendered directly rather than
  // written into state, so the effect below never has to set it synchronously.
  const displayCount = reduced ? COUNTER_TARGET : count;

  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // One timeout per transition, never a repeating interval driving setState.
  React.useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setTimeout(
      () => setActive((prev) => (prev + 1) % STAGES.length),
      ADVANCE_MS
    );
    return () => window.clearTimeout(id);
  }, [inView, reduced, active]);

  // Counter runs once. It is keyed off inView, which latches true and never
  // resets, so scrolling back up does not replay it.
  React.useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / COUNTER_MS, 1);
      // easeOutCubic, so it decelerates into the final number
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCount(Math.round(eased * COUNTER_TARGET));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced]);

  return (
    <section className="sponsors-section" id="sponsors" ref={sectionRef}>
      <style>{sponsorsCSS}</style>

      <div className="sponsors-inner">
        <header className="sponsors-header">
          <h2 className="sponsors-heading">A new stage for your sponsors</h2>
          <p className="sponsors-sub">
            Every ticket, every email, and every photo becomes a space your sponsors
            actually get seen in.
          </p>
        </header>

        <ol className="sponsors-stages">
          {STAGES.map(({ icon: Icon, label, sublabel, caption }, i) => {
            const isActive = reduced || i === active;
            return (
              <li
                key={label}
                className={isActive ? "sponsor-stage sponsor-stage-active" : "sponsor-stage"}
              >
                <span className="sponsor-stage-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <p className="sponsor-stage-label">{label}</p>
                <p className="sponsor-stage-sublabel">{sublabel}</p>
                <p className="sponsor-stage-caption">{caption}</p>
              </li>
            );
          })}
        </ol>

        <div className="sponsors-callout">
          <p className="sponsors-callout-title">One click. Every guest.</p>
          <p className="sponsors-callout-stat">
            <span className="sponsors-counter">{displayCount.toLocaleString("en-US")}</span>{" "}
            guests, reached instantly
          </p>
          <p className="sponsors-callout-body">
            One click sends every ticket and every photo. The same process works at any
            scale, from 150 guests to 3,000.
          </p>
        </div>
      </div>
    </section>
  );
}

const sponsorsCSS = `
  .sponsors-section {
    background: var(--st-sponsor-surface);
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    transition: background 0.4s ease;
  }

  .sponsors-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--st-space-lg);
  }

  .sponsors-header {
    text-align: center;
    max-width: 60ch;
  }

  .sponsors-heading {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.9rem, 3.5vw + 0.75rem, 3rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }

  .sponsors-sub {
    margin-top: var(--st-space-sm);
    font-family: var(--st-font-serif);
    font-size: clamp(1.05rem, 1vw + 0.85rem, 1.25rem);
    line-height: 1.55;
    color: var(--st-on-surface-variant);
  }

  .sponsors-stages {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--st-space-md);
    width: 100%;
    list-style: none;
  }

  .sponsor-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: var(--st-space-md) 1.25rem;
    text-align: center;
    border-radius: var(--st-radius-lg);
    background: transparent;
    border: 1px solid transparent;
    opacity: 0.55;
    transition: opacity 0.45s ease, background 0.45s ease, border-color 0.45s ease;
  }

  .sponsor-stage-active {
    opacity: 1;
    background: var(--st-surface-container-lowest);
    border-color: var(--st-sponsor);
  }

  .sponsor-stage-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--st-radius-full);
    background: var(--st-sponsor-container);
    color: var(--st-on-sponsor-container);
  }

  .sponsor-stage-label {
    margin-top: 0.35rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--st-on-surface);
  }

  .sponsor-stage-sublabel {
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    color: var(--st-sponsor);
  }

  .sponsor-stage-caption {
    margin-top: 0.35rem;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
    max-width: 28ch;
  }

  .sponsors-callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    text-align: center;
    width: 100%;
    max-width: 620px;
    padding: var(--st-space-md) clamp(1.5rem, 4vw, 2.5rem);
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
  }

  .sponsors-callout-title {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--st-on-surface);
  }

  .sponsors-callout-stat {
    font-size: 1rem;
    color: var(--st-on-surface-variant);
  }

  .sponsors-counter {
    font-family: var(--st-font-display);
    font-weight: 800;
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    line-height: 1;
    color: var(--st-sponsor);
    font-variant-numeric: tabular-nums;
  }

  .sponsors-callout-body {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
    max-width: 46ch;
  }

  @media (prefers-reduced-motion: reduce) {
    .sponsor-stage {
      opacity: 1;
      transition: none;
    }
  }

  @media (max-width: 767px) {
    .sponsors-section {
      padding: var(--st-space-lg) var(--st-space-margin-mobile);
    }
    .sponsors-stages {
      grid-template-columns: 1fr;
      gap: var(--st-space-sm);
    }
    .sponsor-stage-caption {
      max-width: none;
    }
  }
`;
