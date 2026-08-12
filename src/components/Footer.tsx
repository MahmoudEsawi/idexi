"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerColumns = [
  {
    title: "SOLUTIONS",
    links: [
      { label: "IDEXI Face", href: "/services/face" },
      { label: "IDEXI Flow", href: "/services/flow" },
      { label: "IDEXI Pass", href: "/services/pass" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Idexi", href: "/#about" },
      { label: "Venues", href: "/#use-cases" },
      { label: "Book Demo", href: "/#contact" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="volt-footer">
      <style>{footerCSS}</style>

      {/* Top Banner Header Bar */}
      <div className="container footer-top-bar">
        <div className="footer-brand-title">
          IDEXI PLATFORM <span className="text-lime">///</span> INTELLIGENT EVENT SOLUTIONS
        </div>
        <a href="#contact" className="btn btn-lime footer-btn">
          RESERVE DEMO <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Image
            src="/logo-white-horizontal.png"
            alt="idexi — Intelligent Event Solutions"
            width={160}
            height={41}
            style={{ height: "auto" }}
          />
          <p className="footer-tagline">
            Biometric express check-in, crowd telemetry diagnostics, and real-time photo sorting for modern events.
          </p>
          <p className="footer-copyright">
            &copy; {currentYear} IDEXI AI. All rights reserved.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div className="footer-col" key={column.title}>
            <div className="footer-col-header text-lime">{column.title}</div>
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
      </div>
    </footer>
  );
}

const footerCSS = `
  .volt-footer {
    background: #050608;
    border-top: 1px solid var(--grid-line);
    padding: 4rem 1.5rem 3rem;
  }

  .footer-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2.5rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--grid-line);
  }

  .footer-brand-title {
    font-family: var(--font-headings);
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: #ffffff;
    text-transform: uppercase;
  }

  .footer-btn {
    padding: 0.65rem 1.4rem !important;
    font-size: 0.8rem !important;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  .footer-brand-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-tagline {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
    max-width: 340px;
  }

  .footer-copyright {
    font-size: 0.78rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .footer-col-header {
    font-family: var(--font-headings);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .footer-link-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .footer-link {
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--accent-lime);
  }

  @media (max-width: 991px) {
    .footer-top-bar { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-brand-col { grid-column: 1 / -1; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
  }
`;
