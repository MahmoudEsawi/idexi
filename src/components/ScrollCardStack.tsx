"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Scroll-driven card stack.

   Ported from the supplied `animated-cards-stack.tsx` reference. The scroll
   math is preserved exactly; everything around it was rewritten, because the
   original cannot run in this repository as written. It depends on Tailwind
   utility classes, `class-variance-authority`, `cn()` from `@/lib/utils`, the
   shadcn `/components/ui` directory, and the `motion/react` package. None of
   those exist here, and the styling convention is scoped CSS in a template
   literal (see CLAUDE.md).

   Preserved verbatim from the reference:
     - useScroll offset ["start center", "end end"], shared via context
     - per-card range: start = i / (n + 1), end = (i + 1) / (n + 1)
     - rotateRange = [range[0] - 1.5, range[1] / 1.5]
     - translateZ(i * incrementZ) translateY(y) rotate(deg), y: 0% → -180%
     - the four-value scroll-linked drop-shadow
     - perspective 1000px on both containers, backfaceVisibility hidden,
       zIndex (n - i) * incrementZ, top: i * incrementY

   Three deliberate changes:

   1. The reference calls a hook inside a ternary:
        const filter = variant === "light" ? useMotionTemplate`…` : "none"
      That is a conditional hook. It breaks the Rules of Hooks the moment
      `variant` changes between renders, and React 19 surfaces it. Here the
      template is always computed and the choice happens afterward, so the
      hook count is constant.

   2. The reference has no reduced-motion handling. With `prefers-reduced-
      motion: reduce` the stack collapses to a plain vertical list and no
      transform is applied at all. The content stays fully readable.

   3. `ReviewStars` is dropped. It is testimonial furniture with no use here.

   Index convention is the reference's: callers pass `index={i + 2}` so the
   first card enters partway through the scroll rather than immediately. Both
   supplied demos do this. Kept as a caller responsibility rather than baked
   in, since the demos use different offsets (+2 and +1) on purpose.
   ───────────────────────────────────────────────────────────────────────── */

interface ScrollStackContextValue {
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}

const ScrollStackContext = React.createContext<ScrollStackContextValue | undefined>(undefined);

function useScrollStackContext() {
  const context = React.useContext(ScrollStackContext);
  if (context === undefined) {
    throw new Error("ScrollCard must be rendered inside a ScrollCardStack.");
  }
  return context;
}

/* ── Root: owns the scroll progress and the tall scroll runway ── */

export function ScrollCardStack({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  });
  const reduced = useReducedMotion() ?? false;

  const value = React.useMemo(
    () => ({ scrollYProgress, reduced }),
    [scrollYProgress, reduced]
  );

  return (
    <ScrollStackContext.Provider value={value}>
      <style>{scrollStackCSS}</style>
      <div
        ref={scrollRef}
        data-static={reduced ? "true" : undefined}
        className={["scs-root", className].filter(Boolean).join(" ")}
        style={style}
        {...props}
      >
        {children}
      </div>
    </ScrollStackContext.Provider>
  );
}

/* ── Viewport: the sticky pane the deck is pinned inside ── */

export function ScrollCardViewport({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["scs-viewport", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

/* ── Deck: the fixed-size box the cards absolutely position against ── */

export function ScrollCardDeck({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["scs-deck", className].filter(Boolean).join(" ")}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Card ── */

interface ScrollCardProps extends HTMLMotionProps<"div"> {
  /** Total number of cards in the deck. */
  arrayLength: number;
  /** Stack position. Callers pass the array index plus an offset (see header). */
  index: number;
  incrementY?: number;
  incrementZ?: number;
  incrementRotation?: number;
  variant?: "light" | "dark";
}

export const ScrollCard = React.forwardRef<HTMLDivElement, ScrollCardProps>(
  function ScrollCard(
    {
      arrayLength,
      index,
      incrementY = 10,
      incrementZ = 10,
      incrementRotation = -index + 90,
      className,
      variant = "light",
      style,
      ...props
    },
    ref
  ) {
    const { scrollYProgress, reduced } = useScrollStackContext();

    const start = index / (arrayLength + 1);
    const end = (index + 1) / (arrayLength + 1);
    const range = React.useMemo(() => [start, end], [start, end]);
    const rotateRange = React.useMemo(
      () => [range[0] - 1.5, range[1] / 1.5],
      [range]
    );

    const y = useTransform(scrollYProgress, range, ["0%", "-180%"]);
    const rotate = useTransform(scrollYProgress, rotateRange, [incrementRotation, 0]);
    const transform = useMotionTemplate`translateZ(${index * incrementZ}px) translateY(${y}) rotate(${rotate}deg)`;

    const dx = useTransform(scrollYProgress, rotateRange, [4, 0]);
    const dy = useTransform(scrollYProgress, rotateRange, [4, 12]);
    const blur = useTransform(scrollYProgress, rotateRange, [2, 24]);
    const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2]);

    // Always computed. The reference put this behind `variant === "light"`,
    // which made it a conditional hook call.
    const shadow = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(11, 28, 48, ${alpha}))`;

    const motionStyle = reduced
      ? style
      : {
          top: index * incrementY,
          transform,
          backfaceVisibility: "hidden" as const,
          zIndex: (arrayLength - index) * incrementZ,
          filter: variant === "light" ? shadow : "none",
          ...style,
        };

    return (
      <motion.div
        layout="position"
        ref={ref}
        style={motionStyle}
        className={["scs-card", `scs-card--${variant}`, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }
);

/* The deck is sized by the consumer through --scs-card-w / --scs-card-h so a
   section can set its own card dimensions without this file knowing about it.
   The reduced-motion rules are duplicated across a [data-static] attribute and
   a media query on purpose: the attribute comes from framer-motion's hook,
   which resolves after first paint, and the media query covers that gap. */
const scrollStackCSS = `
  .scs-root {
    position: relative;
    width: 100%;
    min-height: 100svh;
    perspective: 1000px;
  }

  .scs-viewport {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100svh;
  }

  .scs-deck {
    position: relative;
    width: var(--scs-card-w, 350px);
    height: var(--scs-card-h, 450px);
    /* margin-inline, not the margin shorthand. This rule is emitted after a
       consuming section's own stylesheet at equal specificity, so the
       shorthand "margin: 0 auto" silently reset any vertical margin the
       consumer had set on the deck. Horizontal centring is all this needs
       to do. No backticks in this comment: it lives inside a template
       literal and a backtick would end the string. */
    margin-inline: auto;
    perspective: 1000px;
  }

  .scs-card {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--st-space-md);
    padding: var(--st-space-md);
    border-radius: var(--st-radius-xl);
    will-change: transform;
  }

  .scs-card--light {
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    color: var(--st-on-surface);
  }

  .scs-card--dark {
    background: var(--st-inverse-surface);
    border: 1px solid var(--st-outline);
    color: var(--st-inverse-on-surface);
  }

  /* ── Reduced motion: no transforms, no pinning, plain readable list ── */
  .scs-root[data-static='true'] {
    min-height: 0;
    perspective: none;
  }
  .scs-root[data-static='true'] .scs-viewport {
    position: static;
    height: auto;
    display: block;
  }
  .scs-root[data-static='true'] .scs-deck {
    position: static;
    display: flex;
    flex-direction: column;
    gap: var(--st-space-md);
    width: 100%;
    max-width: 640px;
    height: auto;
    perspective: none;
  }
  .scs-root[data-static='true'] .scs-card {
    position: static;
    height: auto;
    transform: none !important;
    filter: none !important;
    will-change: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .scs-root {
      min-height: 0;
      perspective: none;
    }
    .scs-viewport {
      position: static;
      height: auto;
      display: block;
    }
    .scs-deck {
      position: static;
      display: flex;
      flex-direction: column;
      gap: var(--st-space-md);
      width: 100%;
      max-width: 640px;
      height: auto;
      perspective: none;
    }
    .scs-card {
      position: static;
      height: auto;
      transform: none !important;
      filter: none !important;
      will-change: auto;
    }
  }
`;

/** Subscribe to the enclosing stack's scroll progress, e.g. for a position readout. */
export function useScrollCardStack() {
  return useScrollStackContext();
}
