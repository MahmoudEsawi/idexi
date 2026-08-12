"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{transparentNavCSS}</style>
      <header className={`idexi-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <Image
              src="/logo-white-horizontal.png"
              alt="idexi"
              width={120}
              height={30}
              priority
              style={{ height: "auto" }}
            />
          </Link>

          {/* Navigation Links */}
          <nav className="header-nav">
            <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link href="/#services" className="nav-item">
              Solutions
            </Link>
            <Link href="/#how-it-works" className="nav-item">
              Workflow
            </Link>
            <Link href="/#use-cases" className="nav-item">
              Venues
            </Link>
            <Link href="/faqs" className="nav-item">
              FAQs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="header-mobile-action">
            <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${isOpen ? "active" : ""}`}>
          <Link href="/" className="mobile-item">Home</Link>
          <Link href="/#services" className="mobile-item">Solutions</Link>
          <Link href="/#how-it-works" className="mobile-item">Workflow</Link>
          <Link href="/#use-cases" className="mobile-item">Venues</Link>
          <Link href="/faqs" className="mobile-item">FAQs</Link>
        </div>
      </header>
    </>
  );
}

const transparentNavCSS = `
  .idexi-header {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 1.5rem 0;
    background: transparent;
    border-bottom: none;
    transition: padding 0.3s ease;
  }

  .idexi-header.scrolled {
    background: transparent;
    border-bottom: none;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .nav-item {
    font-size: 0.92rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.2s ease;
  }

  .nav-item:hover,
  .nav-item.active {
    color: #ffffff;
  }

  .header-mobile-action {
    display: none;
  }

  .mobile-menu-toggle {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 0.4rem;
  }

  .mobile-nav-drawer {
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: #07080b;
    border-bottom: 1px solid var(--grid-line);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    z-index: 999;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .mobile-nav-drawer.active {
    max-height: 300px;
    opacity: 1;
  }

  .mobile-item {
    font-family: var(--font-headings);
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
  }

  @media (max-width: 991px) {
    .header-nav {
      display: none;
    }
    .header-mobile-action {
      display: flex;
    }
  }
`;
