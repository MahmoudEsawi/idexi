"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Section 5 of the product page template: the two other products.

   Each card wears the accent of the product it points at, so the pair reads
   as the rest of the suite rather than as decoration. The accent is a custom
   property set from a data attribute, which keeps one rule doing the work for
   all three products. */

export type Companion = {
  product: string;
  color: "pass" | "flow" | "face";
  href: string;
  line: string;
};

export default function ProductCompanions({ items }: { items: Companion[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="pcomp">
      <style>{companionsCSS}</style>
      {items.map((c, i) => (
        <motion.div
          key={c.product}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={c.href} className="pcomp-card" data-color={c.color}>
            <span className="pcomp-rule" aria-hidden="true" />
            <span className="pcomp-name">{c.product}</span>
            <span className="pcomp-line">{c.line}</span>
            <span className="pcomp-go">
              See {c.product} <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const companionsCSS = `
  .pcomp {
    max-width: 940px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .pcomp-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.55rem;
    height: 100%;
    padding: 2rem 1.85rem 1.75rem;
    border-radius: var(--st-radius-xl);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
    overflow: hidden;
    transition: border-color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pcomp-card:hover { transform: translateY(-3px); }
  .pcomp-card[data-color='pass'] { --pcomp-accent: var(--st-product-pass); }
  .pcomp-card[data-color='flow'] { --pcomp-accent: var(--st-product-flow); }
  .pcomp-card[data-color='face'] { --pcomp-accent: var(--st-product-face); }
  .pcomp-card:hover {
    border-color: color-mix(in srgb, var(--pcomp-accent) 55%, transparent);
  }
  .pcomp-card:focus-visible {
    outline: 2px solid var(--pcomp-accent);
    outline-offset: 3px;
  }

  /* The card wears the accent as a rule across its top edge that fills in
     on hover, rather than as a wash over the whole surface. */
  .pcomp-rule {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--pcomp-accent);
    transform: scaleX(0.18);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pcomp-card:hover .pcomp-rule,
  .pcomp-card:focus-visible .pcomp-rule {
    transform: scaleX(1);
  }

  .pcomp-name {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--pcomp-accent);
  }
  .pcomp-line {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .pcomp-go {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: auto;
    padding-top: 1rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--st-on-background);
  }
  .pcomp-go svg {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pcomp-card:hover .pcomp-go svg {
    transform: translateX(3px);
  }

  @media (max-width: 860px) {
    .pcomp { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pcomp-card,
    .pcomp-rule,
    .pcomp-go svg {
      transition: none;
    }
    .pcomp-card:hover { transform: none; }
  }
`;
