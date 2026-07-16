"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const services = [
    { name: "idexi Face", desc: "AI photo sorting & delivery", href: "/services/face" },
    { name: "idexi Flow", desc: "Crowd management & diagnostics", href: "/services/flow" },
    { name: "idexi Pass", desc: "Smart access & check-in", href: "/services/pass" },
  ];

  return (
    <>
      <style>{navCSS}</style>
      <nav className={`idexi-nav glass-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <Image
              src="/logo-white-horizontal.png"
              alt="idexi — Intelligent Event Solutions"
              width={180}
              height={48}
              priority
              style={{ height: "auto" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>

            <div
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`nav-link nav-dropdown-toggle ${pathname.startsWith("/services") ? "active" : ""}`}>
                Services <ChevronDown size={14} className={`chevron ${servicesOpen ? "open" : ""}`} />
              </button>

              <div className={`nav-dropdown-menu ${servicesOpen ? "show" : ""}`}>
                {services.map((s) => (
                  <Link key={s.href} href={s.href} className="nav-dropdown-item">
                    <span className="dropdown-name">{s.name}</span>
                    <span className="dropdown-desc">{s.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/#how-it-works" className="nav-link">How It Works</Link>
            <Link href="/#use-cases" className="nav-link">Use Cases</Link>
            <Link href="/#about" className="nav-link">About</Link>

            <Link href="/#contact" className="btn btn-primary nav-cta">
              <Sparkles size={15} />
              Book a Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-mobile-drawer ${isOpen ? "open" : ""}`}>
          <Link href="/" className={`mobile-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
          <div className="mobile-section-title">Solutions</div>
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="mobile-service-link">
              <span className="dropdown-name">{s.name}</span>
              <span className="dropdown-desc">{s.desc}</span>
            </Link>
          ))}
          <Link href="/#how-it-works" className="mobile-link">How It Works</Link>
          <Link href="/#use-cases" className="mobile-link">Use Cases</Link>
          <Link href="/#about" className="mobile-link">About</Link>
          <Link href="/#contact" className="btn btn-primary" style={{ justifyContent: "center", marginTop: "1rem" }}>
            <Sparkles size={15} /> Book a Demo
          </Link>
        </div>
      </nav>
    </>
  );
}

const navCSS = `
  .idexi-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 1.2rem 1.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .idexi-nav.scrolled {
    padding: 0.7rem 1.5rem;
  }
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }
  .nav-logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }
  .nav-brand {
    font-family: var(--font-headings);
    font-weight: 800;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: -0.03em;
  }
  .nav-tagline {
    font-family: var(--font-headings);
    font-weight: 400;
    font-size: 0.6rem;
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.8rem;
  }
  .nav-link {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.25s ease;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-cyan);
    border-radius: 1px;
    transition: width 0.3s ease;
  }
  .nav-link:hover, .nav-link.active {
    color: #ffffff;
  }
  .nav-link:hover::after, .nav-link.active::after {
    width: 100%;
  }
  .chevron {
    transition: transform 0.25s ease;
  }
  .chevron.open {
    transform: rotate(180deg);
  }
  .nav-cta {
    padding: 0.6rem 1.3rem;
    font-size: 0.85rem;
  }

  /* Dropdown */
  .nav-dropdown {
    position: relative;
  }
  .nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    left: -60px;
    width: 280px;
    background: rgba(8, 12, 40, 0.96);
    border: 1px solid rgba(49, 196, 243, 0.15);
    border-radius: 16px;
    padding: 0.6rem;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 30px rgba(49,196,243,0.05);
    backdrop-filter: blur(24px);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: all 0.25s ease;
  }
  .nav-dropdown-menu.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .nav-dropdown-item {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    transition: background 0.2s ease;
  }
  .nav-dropdown-item:hover {
    background: rgba(49, 196, 243, 0.06);
  }
  .dropdown-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: #fff;
    font-family: var(--font-headings);
  }
  .dropdown-desc {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* Mobile */
  .nav-mobile-toggle {
    display: none;
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .nav-mobile-drawer {
    position: fixed;
    top: 70px; left: 0; right: 0;
    background: rgba(11, 18, 50, 0.85);
    border-bottom: 1px solid rgba(49, 196, 243, 0.15);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 999;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.35s ease;
  }
  .nav-mobile-drawer.open {
    max-height: calc(100vh - 70px);
    opacity: 1;
    padding: 2rem 1.5rem;
  }
  .mobile-link {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .mobile-link.active {
    color: var(--accent-cyan);
  }
  .mobile-section-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    margin-top: 0.5rem;
  }
  .mobile-service-link {
    display: flex;
    flex-direction: column;
    padding: 0.6rem 0.8rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-mobile-toggle { display: block; }
  }
`;
