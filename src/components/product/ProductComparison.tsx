"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

/* Section 2 of the product page template: the old way against the idexi way.

   Shared by the Pass and Face pages, which the content files describe with
   the same weighted layout: a narrow muted column that reads as crossed out,
   against a wide filled card that dominates. The asymmetry is the argument,
   so it is carried by the column ratio rather than by anything drawn between
   the two.

   The accent comes from the product's own --st-product-* pair, so a page only
   has to say which product it is. */

export type ComparisonRow = { old: string; idexi: string };

type Props = {
  rows: ComparisonRow[];
  product: "pass" | "flow" | "face";
  /** The Pass content file asks for the struck column right-aligned, hard
      against the card it is being replaced by. Face does not. */
  alignOld?: "left" | "right";
  /** Pass also asks for a check against each idexi line. */
  showCheck?: boolean;
};

function Row({
  row,
  index,
  showCheck,
}: {
  row: ComparisonRow;
  index: number;
  showCheck: boolean;
}) {
  const reduced = useReducedMotion();
  const [struck, setStruck] = useState(false);

  return (
    <motion.div
      className="pc-row"
      data-struck={struck ? "1" : undefined}
      onViewportEnter={() => setStruck(true)}
      viewport={{ once: true, amount: 0.7 }}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <p className="pc-old">{row.old}</p>
      <motion.p
        className="pc-new"
        initial={reduced ? false : { opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 230,
                damping: 26,
                delay: index * 0.05 + 0.28,
              }
        }
      >
        {showCheck && (
          <Check size={17} strokeWidth={2.6} className="pc-check" aria-hidden="true" />
        )}
        <span>{row.idexi}</span>
      </motion.p>
    </motion.div>
  );
}

export default function ProductComparison({
  rows,
  product,
  alignOld = "left",
  showCheck = false,
}: Props) {
  return (
    <div className="pc" data-product={product} data-align={alignOld}>
      <style>{comparisonCSS}</style>
      {rows.map((row, i) => (
        <Row key={row.old} row={row} index={i} showCheck={showCheck} />
      ))}
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const comparisonCSS = `
  .pc {
    max-width: 940px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pc-row {
    display: grid;
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
  }

  /* text-decoration-color rather than a positioned bar: the strike has to
     land on both lines when a phrase wraps, which one absolutely positioned
     rule cannot do. It draws itself as the row arrives. */
  .pc-old {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
    opacity: 0.72;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.65s ease 0.12s;
  }
  .pc[data-align='right'] .pc-old {
    text-align: right;
  }
  .pc-row[data-struck] .pc-old {
    text-decoration-color: color-mix(in srgb, var(--st-on-surface-variant) 55%, transparent);
  }

  .pc-new {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    margin: 0;
    padding: 1.05rem 1.35rem;
    border-radius: var(--st-radius-lg);
    font-size: 1.02rem;
    line-height: 1.5;
    font-weight: 500;
  }
  .pc-check {
    flex-shrink: 0;
    margin-top: 0.15rem;
  }

  .pc[data-product='pass'] .pc-new {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .pc[data-product='flow'] .pc-new {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .pc[data-product='face'] .pc-new {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }

  @media (max-width: 860px) {
    .pc-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      padding-bottom: 0.75rem;
    }
    .pc[data-align='right'] .pc-old {
      text-align: left;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pc-old { transition: none; }
  }
`;
