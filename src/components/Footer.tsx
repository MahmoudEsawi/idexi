"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="idexi-footer">
      <style>{footerCSS}</style>
      <div className="footer-glow" />
      <div className="container footer-grid">
        {/* Brand details */}
        <div className="footer-brand-block">
          <Link href="/" className="footer-logo-link">
            <Image
              src="/logo-white-horizontal.png"
              alt="idexi — Intelligent Event Solutions"
              width={160}
              height={42}
              style={{ height: "auto" }}
            />
          </Link>
          <p className="footer-brand-desc">
            Next-generation AI-powered event diagnostics, photography check-ins, and audience flow solutions.
          </p>
          <div className="footer-socials-row">
            <a href="#" aria-label="LinkedIn" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Column 1: Products */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Solutions</h4>
          <Link href="/services/face" className="footer-link">idexi Face <ArrowUpRight size={12} className="footer-link-arrow" /></Link>
          <Link href="/services/flow" className="footer-link">idexi Flow <ArrowUpRight size={12} className="footer-link-arrow" /></Link>
          <Link href="/services/pass" className="footer-link">idexi Pass <ArrowUpRight size={12} className="footer-link-arrow" /></Link>
        </div>

        {/* Links Column 2: Platform */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Platform</h4>
          <a href="/#how-it-works" className="footer-link">How It Works</a>
          <a href="/#use-cases" className="footer-link">Use Cases</a>
          <a href="/#about" className="footer-link">About Us</a>
          <a href="/#contact" className="footer-link">Book a Demo</a>
        </div>

        {/* Links Column 3: Contact details */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Get in Touch</h4>
          <div className="footer-contact-item">
            <Mail size={16} style={{ color: "var(--accent-cyan)" }} />
            <a href="mailto:hello@idexi.ai" className="footer-contact-link">hello@idexi.ai</a>
          </div>
          <div className="footer-contact-item">
            <Phone size={16} style={{ color: "var(--accent-cyan)" }} />
            <span style={{ color: "var(--text-secondary)" }}>+1 (555) 019-2831</span>
          </div>
          <div className="footer-contact-item">
            <MapPin size={16} style={{ color: "var(--accent-cyan)" }} />
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>San Francisco, CA</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* Bottom Footer */}
      <div className="container footer-bottom-row">
        <span className="footer-copyright">
          &copy; {currentYear} idexi. All rights reserved. Powered by AI.
        </span>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms of Service</a>
          <button onClick={handleScrollToTop} className="footer-scroll-top-btn">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

const footerCSS = `
  .idexi-footer {
    background: rgba(11, 18, 50, 0.45);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(49, 196, 243, 0.15);
    padding: 5rem 1.5rem 2rem 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .footer-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 150px;
    background: radial-gradient(ellipse at top, rgba(49, 196, 243, 0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.2fr;
    gap: 3rem;
    position: relative;
    z-index: 1;
  }
  .footer-brand-block {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .footer-logo-link {
    display: inline-block;
  }
  .footer-brand-desc {
    font-size: 0.95rem;
    color: var(--text-secondary);
    max-width: 320px;
    line-height: 1.6;
  }
  .footer-socials-row {
    display: flex;
    gap: 0.75rem;
  }
  .footer-social-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(49, 196, 243, 0.15);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: var(--transition-smooth);
  }
  .footer-social-icon:hover {
    color: #ffffff;
    border-color: var(--accent-cyan);
    background: rgba(49, 196, 243, 0.1);
    box-shadow: 0 0 16px rgba(49, 196, 243, 0.3);
    transform: translateY(-2px);
  }
  .footer-links-col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .footer-col-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
    position: relative;
  }
  .footer-link {
    color: var(--text-secondary);
    font-size: 0.95rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .footer-link:hover {
    color: var(--accent-cyan);
  }
  .footer-link-arrow {
    opacity: 0;
    transform: translate(-2px, 2px);
    transition: all 0.2s ease;
  }
  .footer-link:hover .footer-link-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
  .footer-contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .footer-contact-link {
    color: var(--text-secondary);
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }
  .footer-contact-link:hover {
    color: var(--accent-cyan);
  }
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(49, 196, 243, 0.15), transparent);
    margin: 3rem 0 2rem 0;
  }
  .footer-bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
  }
  .footer-copyright {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  .footer-bottom-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .footer-bottom-link {
    font-size: 0.85rem;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }
  .footer-bottom-link:hover {
    color: var(--accent-cyan);
  }
  .footer-scroll-top-btn {
    background: transparent;
    border: none;
    color: var(--accent-cyan);
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  .footer-scroll-top-btn:hover {
    color: #ffffff;
  }

  @media (max-width: 991px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .footer-bottom-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
`;

