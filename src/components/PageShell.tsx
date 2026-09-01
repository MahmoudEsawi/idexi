import type { ReactNode } from "react";
import Link from "next/link";

/* Shared layout for the site's content pages (pricing, about, how it works,
   use cases, and the two privacy documents). It exists so those pages carry
   one consistent masthead and measure instead of each inventing its own, and
   so a future page is a content file rather than a layout exercise.

   Deliberately a server component: none of these pages need interactivity, and
   keeping them out of the client bundle is free. */

export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Wider measure for pages laying out cards rather than running prose. */
  wide?: boolean;
}) {
  return (
    <div className="shell-page">
      <style>{shellCSS}</style>
      <div className={wide ? "shell-container shell-container-wide" : "shell-container"}>
        <Link href="/" className="shell-back">
          &larr; Back to idexi
        </Link>

        <header className="shell-header">
          {eyebrow ? <p className="shell-eyebrow">{eyebrow}</p> : null}
          <h1 className="shell-title">{title}</h1>
          {intro ? <p className="shell-intro">{intro}</p> : null}
        </header>

        {children}
      </div>
    </div>
  );
}

const shellCSS = `
  .shell-page {
    padding: 7rem 1.5rem 5rem;
    background: var(--st-background);
    transition: background 0.4s ease;
  }

  .shell-container {
    max-width: 70ch;
    margin: 0 auto;
  }
  .shell-container-wide {
    max-width: 1080px;
  }

  .shell-back {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--st-on-surface-variant);
    font-size: 0.95rem;
    transition: color 0.25s ease;
  }
  .shell-back:hover {
    color: var(--st-secondary);
  }
  .shell-back:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .shell-header {
    margin-bottom: 3rem;
  }

  .shell-eyebrow {
    margin-bottom: 0.85rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-secondary);
  }

  .shell-title {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }

  .shell-intro {
    margin-top: 1rem;
    font-family: var(--st-font-serif);
    font-size: clamp(1.1rem, 1vw + 0.9rem, 1.3rem);
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* Shared prose rhythm for the text-heavy pages. */
  .shell-section {
    margin-bottom: 2.75rem;
  }
  .shell-section h2 {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: 1.6rem;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    margin-bottom: 1rem;
  }
  .shell-section h3 {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--st-on-background);
    margin: 1.5rem 0 0.5rem;
  }
  .shell-section p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
    margin-bottom: 1rem;
  }
  .shell-section ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin: 0 0 1rem 1.1rem;
    list-style: disc;
  }
  .shell-section li {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--st-on-surface-variant);
  }
  .shell-section a {
    color: var(--st-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .shell-note {
    padding: 1.1rem 1.35rem;
    border-radius: var(--st-radius-lg);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--st-on-surface-variant);
  }

  @media (max-width: 768px) {
    .shell-page {
      padding: 5rem 1.25rem 3.5rem;
    }
    .shell-header {
      margin-bottom: 2.25rem;
    }
  }
`;
