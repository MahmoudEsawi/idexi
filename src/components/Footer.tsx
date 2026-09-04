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
  /** Highlighted: the attendee-facing link, the spec's second visual cue. */
  accent?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* Four columns per the master spec. The two privacy destinations sit apart on
   purpose and must not be merged: "Privacy & Security" is the plain-language
   trust page and belongs in Support, while "Privacy Policy" is the formal legal
   document and belongs in the bottom bar. */
const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "idexi Pass", href: "/services/pass" },
      { label: "idexi Flow", href: "/services/flow" },
      { label: "idexi Face", href: "/services/face" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Stop Ticket Fraud", href: "/how-to-stop-duplicate-ticket-scanning" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Common Questions", href: "/faqs" },
      { label: "Privacy & Security", href: "/privacy-security" },
      { label: "Where's My Photo?", href: "/services/face", accent: true },
      { label: "Book a Demo", href: "/#contact" },
    ],
  },
];

const CONTACT = {
  phone: "+962 78 544 7506",
  email: "info@idexi.tech",
  location: "Amman, Jordan",
} as const;

import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/icons/SocialIcons";

const socialColumn: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: <LinkedInIcon size={18} /> },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: <InstagramIcon size={18} /> },
  { label: "X (Twitter)", href: SOCIAL_LINKS.x, icon: <XIcon size={18} /> },
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
            className="footer-logo-img footer-logo-light"
          />
          <Image
            src="/logo-white-horizontal.png"
            alt=""
            aria-hidden="true"
            width={160}
            height={41}
            className="footer-logo-img footer-logo-dark"
          />
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
                  <Link
                    href={link.href}
                    className={link.accent ? "footer-link footer-link-accent" : "footer-link"}
                  >
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

      <div className="footer-bottom">
        <p className="footer-bottom-legal">
          <Link href="/privacy-policy" className="footer-bottom-link">Privacy Policy</Link>
          <span className="footer-bottom-sep" aria-hidden="true">&middot;</span>
          <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
        </p>
        <p className="footer-bottom-contact">
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="footer-bottom-link">
            {CONTACT.phone}
          </a>
          <span className="footer-bottom-sep" aria-hidden="true">&middot;</span>
          <a href={`mailto:${CONTACT.email}`} className="footer-bottom-link">{CONTACT.email}</a>
          <span className="footer-bottom-sep" aria-hidden="true">&middot;</span>
          <span>{CONTACT.location}</span>
        </p>
      </div>
    </footer>
  );
}

const footerCSS = `
  .footer-link-accent {
    color: var(--st-secondary);
    font-weight: 600;
  }

  .footer-bottom {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1.5rem;
    max-width: 1200px;
    margin: 2.5rem auto 0;
    padding: 1.5rem var(--st-space-margin-mobile) 0;
    border-top: 1px solid var(--st-outline-variant);
  }
  .footer-bottom p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }
  .footer-bottom-link {
    color: inherit;
    transition: color 0.2s ease;
  }
  .footer-bottom-link:hover {
    color: var(--st-secondary);
  }
  .footer-bottom-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 3px;
  }
  .footer-bottom-sep {
    opacity: 0.45;
  }

  @media (max-width: 767px) {
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }

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
