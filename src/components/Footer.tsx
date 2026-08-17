"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useInViewOnce } from "@/hooks/useInViewOnce";

// TODO: replace with official idexi company profile URLs
const SOCIAL_LINKS = {
  linkedin: "#",
  instagram: "#",
  x: "#",
} as const;

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "idexi Pass", href: "/services/pass" },
      { label: "idexi Flow", href: "/services/flow" },
      { label: "idexi Face", href: "/services/face" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/#about" },
      { label: "Use Cases", href: "/#use-cases" },
      { label: "Book Consultation", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "/faqs" },
      // Privacy Policy and Terms of Service slot in here once attorney-drafted
      // biometric-compliance text exists — do not add /privacy or /terms yet.
    ],
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.86.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.795.645-1.439 1.439-1.439.795 0 1.44.644 1.44 1.439z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialColumn: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: <LinkedInIcon /> },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: <InstagramIcon /> },
  { label: "X (Twitter)", href: SOCIAL_LINKS.x, icon: <XIcon /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, inView } = useInViewOnce<HTMLElement>(0.15);

  return (
    <footer
      ref={ref}
      className={`idexi-footer ${inView ? "idexi-footer-revealed" : ""}`}
    >
      <style>{footerCSS}</style>
      <div className="footer-glow" aria-hidden="true" />

      <div className="container footer-grid">
        <div className="footer-brand-col" style={{ "--stagger-idx": 0 } as React.CSSProperties}>
          <Image
            src="/logo-black-horizontal.png"
            alt="idexi: Intelligent Event Solutions"
            width={160}
            height={41}
            className="footer-logo-img footer-logo-light"          />
          <Image
            src="/logo-white-horizontal.png"
            alt=""
            aria-hidden="true"
            width={160}
            height={41}
            className="footer-logo-img footer-logo-dark"          />
          <p className="footer-tagline">
            AI-powered check-in, access control, and photo delivery for live events.
          </p>
          <p className="footer-copyright">
            &copy; {currentYear} idexi. All rights reserved.
          </p>
        </div>

        {footerColumns.map((column, i) => (
          <div
            className="footer-col"
            key={column.title}
            style={{ "--stagger-idx": i + 1 } as React.CSSProperties}
          >
            <h3 className="footer-col-title">{column.title}</h3>
            <ul className="footer-link-list">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          className="footer-col"
          style={{ "--stagger-idx": footerColumns.length + 1 } as React.CSSProperties}
        >
          <h3 className="footer-col-title">Social Links</h3>
          <ul className="footer-link-list">
            {socialColumn.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-social-link"
                >
                  {social.icon}
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const footerCSS = `
  .idexi-footer {
    position: relative;
    overflow: hidden;
    /* <body> is display:flex; flex-direction:column with height:100% (globals.css),
       and <main> is flex:1 with content taller than the viewport. A flex item's
       automatic minimum size (which normally protects it from shrinking below its
       own content) is suppressed by the spec whenever that item's own overflow is
       non-visible — so overflow:hidden here (needed to contain the blurred glow)
       silently made the footer free to collapse toward zero instead of its actual
       ~250px of grid content. flex-shrink:0 overrides that: never shrink below
       natural size, regardless of the overflow-disables-auto-min-size interaction. */
    flex-shrink: 0;
    background: var(--st-surface-container-low);
    transition: background 0.4s ease, border-color 0.4s ease;
    border-top: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl) var(--st-radius-xl) 0 0;
    padding: 4rem 1.5rem 2.5rem;
  }
  .footer-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 120px;
    background: radial-gradient(ellipse at top, var(--st-secondary) 0%, transparent 70%);
    opacity: 0.12;
    filter: blur(12px);
    pointer-events: none;
  }
  .footer-logo-img {
    display: block;
  }
  .footer-logo-dark {
    display: none;
  }
  :root[data-theme='dark'] .footer-logo-light {
    display: none;
  }
  :root[data-theme='dark'] .footer-logo-dark {
    display: block;
  }
  .footer-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 2.5rem;
  }
  .footer-brand-col,
  .footer-col {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(-8px);
    transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease;
    transition-delay: calc(var(--stagger-idx, 0) * 100ms + 100ms);
  }
  .idexi-footer-revealed .footer-brand-col,
  .idexi-footer-revealed .footer-col {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
  .footer-tagline {
    margin-top: 1rem;
    max-width: 300px;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .footer-copyright {
    margin-top: 1.5rem;
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
    opacity: 0.75;
  }
  .footer-col-title {
    font-family: var(--st-font-display);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--st-on-background);
    margin-bottom: 1rem;
  }
  .footer-link-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .footer-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
    color: var(--st-on-surface-variant);
    font-size: 0.92rem;
    transition: color 0.25s ease;
  }
  .footer-link:hover {
    color: var(--st-secondary);
  }
  .footer-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 4px;
  }
  .footer-social-link svg {
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .footer-brand-col,
    .footer-col {
      transition: none !important;
      opacity: 1 !important;
      filter: blur(0) !important;
      transform: translateY(0) !important;
    }
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
    .footer-brand-col {
      grid-column: 1 / -1;
    }
  }

  /* Two rows, not one long column: brand spans the full width as its own
     row, then the 4 link columns (Product, Company, Resources, Social
     Links) pair up 2-per-row underneath — same shape as the tablet
     breakpoint above, just with a tighter gap so two columns fit
     comfortably at phone widths. */
  @media (max-width: 767px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem 1.25rem;
    }
    .footer-brand-col {
      grid-column: 1 / -1;
    }
  }
`;
