"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

/* Scroll readers that don't assume WHICH element scrolls. Normally the
   viewport scrolls and window.scrollY is the answer, but a <body> that has
   become its own scroll container (see the html/body note in globals.css)
   reports window.scrollY === 0 forever while body.scrollTop holds the real
   value. Reading both and taking the live one keeps this correct either
   way, so a future CSS change can't silently freeze the indicator again. */
function getScrollTop(): number {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function getScrollRange(): number {
  const doc = document.documentElement;
  const body = document.body;
  // Whichever element is the scroller reports a real range here; the other
  // reports ~0, so max() picks the live one without needing to know which.
  return Math.max(
    doc.scrollHeight - doc.clientHeight,
    body.scrollHeight - body.clientHeight,
    0
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Belt-and-suspenders on top of the CSS gap fix below (a padding bridge
  // that keeps the trigger-to-menu gap inside the hoverable box, so this
  // shouldn't be load-bearing on its own): a short delay before actually
  // closing means a brief cursor stutter or a sub-pixel gap at some
  // viewport size doesn't instantly kill the menu. Opening always cancels
  // any pending close first.
  const openServices = () => {
    if (closeServicesTimer.current) {
      clearTimeout(closeServicesTimer.current);
      closeServicesTimer.current = null;
    }
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeServicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    };
  }, []);

  // Touch devices (a touchscreen laptop/tablet wide enough to still get
  // this desktop pill nav instead of the hamburger drawer, which already
  // has its own always-visible, non-hover service links) have no hover
  // state to open this menu with — mouseenter never fires from a tap.
  //
  // This click handler calls the SAME openServices() as onMouseEnter,
  // deliberately not a toggle: a real click is preceded by a synthetic
  // mouseenter (true for an actual mouse, and for a tap on many touch
  // browsers too), so a toggling click handler would flip the menu open
  // via that mouseenter and then immediately flip it shut again via the
  // click that follows a moment later — confirmed with a raw
  // page.mouse.click() during testing, which reliably left it closed.
  // Making both handlers converge on the same idempotent "open" action
  // removes the race entirely. Closing then relies on the existing
  // hover-leave timer (mouse) or the click-outside listener below (touch/
  // click) — not on tapping the trigger a second time.
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);
  const pathname = usePathname();

  // Reset menu/dropdown state when the route changes. Adjusted during render
  // (React's documented pattern for "resetting state when a prop changes")
  // rather than in an effect, since setState-in-effect here would trigger an
  // extra render pass for no benefit.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setServicesOpen(false);
  }

  const orbitWrapRef = useRef<HTMLDivElement | null>(null);
  const orbitDotRef = useRef<SVGRectElement | null>(null);

  // Scroll-driven orbital dot, written straight to the DOM rather than
  // through framer-motion. Two reasons this is imperative:
  //
  // 1. framer-motion intercepts `pathLength` on SVG children and derives
  //    stroke-dasharray/stroke-dashoffset from it internally, so a
  //    hand-set strokeDashoffset competes with values the library is also
  //    writing. Owning the two attributes outright removes that conflict.
  // 2. A scroll indicator updates every frame while scrolling. Writing an
  //    attribute directly skips React re-renders entirely, which is both
  //    faster and the same approach framer-motion uses under the hood.
  //
  // Dash geometry is measured from the element's REAL perimeter
  // (getTotalLength, with a rounded-rect fallback) rather than normalising
  // with pathLength, because pathLength on basic shapes like <rect> is not
  // reliably supported outside Firefox. Measuring means the dot lands on
  // the pill's true outline at every viewport size.
  useEffect(() => {
    const wrap = orbitWrapRef.current;
    const dot = orbitDotRef.current;
    if (!wrap || !dot) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let perimeter = 0;
    let target = 0; // 0..1, raw scroll progress
    let current = 0; // 0..1, eased toward target
    let frame = 0;

    const measure = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      let length = 0;
      try {
        length = dot.getTotalLength();
      } catch {
        length = 0;
      }
      if (!length || !Number.isFinite(length)) {
        // Rounded-rect perimeter: the straight runs on all four sides plus
        // the four corner quarter-circles, which together make one circle.
        const r = Math.min(width, height) / 2;
        length = 2 * (width - 2 * r) + 2 * (height - 2 * r) + 2 * Math.PI * r;
      }

      perimeter = length;
      const dotLength = Math.min(4, perimeter);
      // One dash and a gap covering the rest, so exactly one dot exists.
      dot.setAttribute("stroke-dasharray", `${dotLength} ${Math.max(perimeter - dotLength, 0.01)}`);
    };

    const paint = () => {
      dot.setAttribute("stroke-dashoffset", String(-current * perimeter));
    };

    const tick = () => {
      frame = 0;
      const delta = target - current;
      if (Math.abs(delta) < 0.0002) {
        current = target;
        paint();
        return;
      }
      current += delta * 0.16;
      paint();
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const range = getScrollRange();
      target = range > 0 ? Math.min(Math.max(getScrollTop() / range, 0), 1) : 0;
      setScrolled(getScrollTop() > 30);
      if (reduceMotion) {
        current = target;
        paint();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      onScroll();
      paint();
    };

    measure();
    onScroll();
    current = target;
    paint();

    // Listen on window AND on document in the capture phase: scroll events
    // do not bubble, so a scrolling <body> (or any nested scroller) would
    // never reach a window-only listener.
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onResize);

    // Content height can change with no scroll or resize event at all —
    // a late-loading font or image, or a section expanding. Both observers
    // keep the measured range and perimeter honest when that happens.
    const bodyObserver = new ResizeObserver(onScroll);
    bodyObserver.observe(document.body);
    const wrapObserver = new ResizeObserver(onResize);
    wrapObserver.observe(wrap);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize);
      bodyObserver.disconnect();
      wrapObserver.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
          setIsOpen(false);
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [pathname]);

  const services = [
    { name: "idexi Face", desc: "AI photo sorting & delivery", href: "/services/face" },
    { name: "idexi Flow", desc: "Access control & event logistics", href: "/services/flow" },
    { name: "idexi Pass", desc: "Smart access & check-in", href: "/services/pass" },
  ];

  return (
    <>
      <style>{navCSS}</style>
      <nav className={`idexi-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-shell">
          {/* Left pill — nav links */}
          <div className="nav-pill nav-pill-links">
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>

            <div
              ref={dropdownRef}
              className="nav-dropdown"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${pathname.startsWith("/services") ? "active" : ""}`}
                onClick={openServices}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services <ChevronDown size={14} className={`chevron ${servicesOpen ? "open" : ""}`} />
              </button>

              <div className={`nav-dropdown-menu-bridge ${servicesOpen ? "show" : ""}`}>
                <div className="nav-dropdown-menu">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} prefetch={true} className="nav-dropdown-item">
                      <span className="dropdown-name">{s.name}</span>
                      <span className="dropdown-desc">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, "/#how-it-works")}>How It Works</Link>
            <Link href="/#use-cases" className="nav-link" onClick={(e) => handleNavClick(e, "/#use-cases")}>Use Cases</Link>
            <Link href="/#about" className="nav-link" onClick={(e) => handleNavClick(e, "/#about")}>About</Link>
          </div>

          {/* Center pill — logo, floats independent of the side pills' widths.
              nav-logo-center: page-level centering only (position:absolute,
              reset to static on mobile — see the media query below).
              nav-logo-orbit-wrap: the pill and its orbit svg's own shared
              box — position:relative + a few px of padding, so the pill
              (nav-pill-logo, untouched, clean, no background changes) and
              the absolutely-positioned pointer-events-none orbit <svg> are
              always glued together as one unit and move as one, regardless
              of what the outer centering wrapper is doing. */}
          <div className="nav-logo-center">
            <div className="nav-logo-orbit-wrap" ref={orbitWrapRef}>
              <Link href="/" className="nav-pill nav-pill-logo" aria-label="idexi home">
                <Image
                  src="/logo-black-horizontal.png"
                  alt="idexi: Intelligent Event Solutions"
                  width={104}
                  height={28}
                  priority
                  className="nav-logo-img nav-logo-light"                />
                <Image
                  src="/logo-white-horizontal.png"
                  alt=""
                  aria-hidden="true"
                  width={104}
                  height={28}
                  priority
                  className="nav-logo-img nav-logo-dark"                />
              </Link>
              {/* stroke-dasharray and stroke-dashoffset are owned by the
                  scroll effect above and written directly to this node. */}
              <svg className="nav-logo-orbit" aria-hidden="true">
                <rect
                  ref={orbitDotRef}
                  className="nav-logo-orbit-dot"
                  width="100%"
                  height="100%"
                  rx="999"
                />
              </svg>
            </div>
          </div>

          {/* Right — theme toggle + CTA, no wrapping pill */}
          <div className="nav-right">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="st-btn nav-cta"
              onClick={(e) => handleNavClick(e, "/#contact")}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="nav-mobile-actions">
            <ThemeToggle />
            <button
              className="nav-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-mobile-drawer ${isOpen ? "open" : ""}`}>
          <Link href="/" className={`mobile-link ${pathname === "/" ? "active" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
          <div className="mobile-section-title">Solutions</div>
          {services.map((s) => (
            <Link key={s.href} href={s.href} prefetch={true} className="mobile-service-link" onClick={() => setIsOpen(false)}>
              <span className="dropdown-name">{s.name}</span>
              <span className="dropdown-desc">{s.desc}</span>
            </Link>
          ))}
          <Link href="/#how-it-works" className="mobile-link" onClick={(e) => handleNavClick(e, "/#how-it-works")}>How It Works</Link>
          <Link href="/#use-cases" className="mobile-link" onClick={(e) => handleNavClick(e, "/#use-cases")}>Use Cases</Link>
          <Link href="/#about" className="mobile-link" onClick={(e) => handleNavClick(e, "/#about")}>About</Link>
          <Link
            href="/#contact"
            className="st-btn nav-cta"
            style={{ justifyContent: "center", marginTop: "1rem" }}
            onClick={(e) => handleNavClick(e, "/#contact")}
          >
            Book Consultation
          </Link>
        </div>
      </nav>
    </>
  );
}

const navCSS = `
  .idexi-nav {
    position: fixed;
    top: 20px; left: 0; right: 0;
    z-index: 1000;
    padding: 0 var(--st-space-margin-mobile);
    transition: var(--transition-smooth);
  }
  .nav-shell {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--st-space-sm);
  }

  /* Shared floating-pill chrome. The color-mix-against-token approach from
     the previous pass read muddy because it was mixing a lot of an already
     mid-toned surface color at fairly high opacity. True glassmorphism
     wants the pill to be nearly colorless — a thin white/black tint plus
     heavy blur — with the crispness coming from a bright translucent edge
     highlight, not from the fill itself. That means genuinely white-based
     values regardless of theme (not derived from --st-* tokens, which are
     tinted), so this is a deliberate, disclosed exception to the
     token-only convention — pinned to the reference's exact glass recipe. */
  .nav-pill {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--st-radius-full);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
    transition: var(--transition-smooth);
  }
  :root[data-theme='dark'] .nav-pill {
    background: rgba(15, 23, 42, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
  .idexi-nav.scrolled .nav-pill {
    box-shadow: 0 8px 24px rgba(11, 28, 48, 0.12);
  }

  .nav-pill-links {
    gap: 1.6rem;
    padding: 0.65rem 1.4rem;
  }
  .nav-link {
    font-family: var(--st-font-ui);
    color: var(--st-on-surface-variant);
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s ease;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--st-on-background);
  }
  .chevron {
    transition: transform 0.25s ease;
  }
  .chevron.open {
    transform: rotate(180deg);
  }

  /* Center logo wrapper — absolutely centered so it never shifts with the
     side pills' natural widths (mirrors the reference's independent
     floating placement). Shrink-wraps to the pill's own rendered size
     (inline-flex) so the absolutely-positioned orbit <svg> inset:0 below
     lines up exactly with the pill's edges, nothing more. */
  .nav-logo-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
  }
  /* The pill and its orbit svg's shared box: position:relative (the
     containing block the absolutely-positioned svg below resolves
     inset:0 against) plus a few px of padding, so the orbit ring has a
     little room and the two elements are always glued together as one
     unit, no matter what the outer nav-logo-center wrapper is doing. */
  .nav-logo-orbit-wrap {
    position: relative;
    display: inline-flex;
    padding: 4px;
  }
  .nav-pill-logo {
    padding: 0.6rem 1.3rem;
  }
  /* The scroll-progress dot: an outline traced exactly over the pill,
     entirely separate from the pill's own background/fill, so the pill
     itself never changes color. pointer-events: none so it never
     intercepts clicks meant for the logo link underneath it. */
  .nav-logo-orbit {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
    /* SVG clips at its viewport by default; the rect sits flush against
       that edge, so half its stroke would be shaved off without this. */
    overflow: visible;
  }
  .nav-logo-orbit-dot {
    fill: none;
    stroke: var(--st-secondary);
    stroke-width: 3;
    stroke-linecap: round;
  }
  .nav-logo-img {
    display: block;
  }
  .nav-logo-dark {
    display: none;
  }
  :root[data-theme='dark'] .nav-logo-light {
    display: none;
  }
  :root[data-theme='dark'] .nav-logo-dark {
    display: block;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .nav-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.4rem;
    font-family: var(--st-font-ui);
    font-size: 0.88rem;
    font-weight: 600;
    min-height: 42px;
    border-radius: var(--st-radius-full);
    background: #000000;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    white-space: nowrap;
    transition: var(--transition-smooth);
  }
  :root[data-theme='dark'] .nav-cta {
    background: #ffffff;
    color: #000000;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
  }
  .nav-cta:hover {
    transform: scale(1.04);
    opacity: 0.92;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
  }
  :root[data-theme='dark'] .nav-cta:hover {
    box-shadow: 0 6px 22px rgba(255, 255, 255, 0.35);
  }
  .nav-cta:active {
    transform: scale(0.98);
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-cta:hover {
      transform: none;
    }
  }

  /* Dropdown */
  .nav-dropdown {
    position: relative;
  }
  /* The hoverable bridge: flush at top:100% against the trigger button, so
     there is zero empty space between this element's box and the button's
     — the old version put that 14px gap in the space BETWEEN the trigger
     and an absolutely-positioned menu that starts 14px below it, which is
     outside both boxes and killed the hover the instant the cursor crossed
     it. Here the same 14px lives inside this element as padding-top, so
     it's still part of one continuous hoverable box the whole way down. */
  .nav-dropdown-menu-bridge {
    position: absolute;
    top: 100%;
    left: -60px;
    width: 280px;
    padding-top: 14px;
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .nav-dropdown-menu-bridge.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .nav-dropdown-menu {
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-lg);
    padding: 0.6rem;
    box-shadow: 0 16px 48px rgba(11, 28, 48, 0.16);
  }
  .nav-dropdown-item {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1rem;
    border-radius: var(--st-radius-md);
    transition: background 0.2s ease;
  }
  .nav-dropdown-item:hover {
    background: var(--st-surface-container-low);
  }
  .dropdown-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--st-on-background);
    font-family: var(--st-font-display);
  }
  .dropdown-desc {
    font-size: 0.75rem;
    color: var(--st-on-surface-variant);
    margin-top: 2px;
  }

  /* Mobile */
  .nav-mobile-actions {
    display: none;
    align-items: center;
    gap: 0.6rem;
  }
  /* padding: 0 overrides the global button/.btn { padding: 0.85rem 2rem }
     rule in globals.css, meant for full-width text buttons. Without it,
     that 64px of inherited horizontal padding alone exceeds this button's
     44px width, forcing the box wider than specified and squeezing the
     Menu/X icon's flex-shrink down to 0 width — rendered but fully
     invisible. Confirmed via computed style during the mobile audit
     (button measured 66px wide, icon measured 0px). Same fix ThemeToggle
     already applies to its own icon button, just missing here. */
  .nav-mobile-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-full);
    color: var(--st-on-background);
    cursor: pointer;
  }
  /* min-height: 0 overrides the flex container's implicit min-height:auto
     — without it, "closed" (max-height: 0) still rendered at ~50px tall in
     testing, because flexbox lets a column container's own min-content
     height win over max-height in some engines. That invisible-but-real
     strip spans nearly the full nav width at a high z-index and, with no
     pointer-events restriction, was silently swallowing hover/click events
     in a band directly over the Services dropdown's flyout — which is what
     was actually killing the dropdown hover, more than the gap below did.
     pointer-events: none while closed (re-enabled in .open) is the second,
     independent guard: a closed drawer should never be able to intercept
     anything again, regardless of any future sizing quirk. */
  .nav-mobile-drawer {
    position: fixed;
    top: 76px; left: var(--st-space-margin-mobile); right: var(--st-space-margin-mobile);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-lg);
    box-shadow: 0 16px 48px rgba(11, 28, 48, 0.16);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 999;
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all 0.35s ease;
  }
  .nav-mobile-drawer.open {
    max-height: calc(100vh - 96px);
    opacity: 1;
    pointer-events: auto;
    padding: 1.5rem;
    overflow-y: auto;
  }
  .mobile-link {
    font-family: var(--st-font-ui);
    color: var(--st-on-background);
    font-size: 1.05rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .mobile-link.active {
    color: var(--st-secondary);
  }
  .mobile-section-title {
    font-family: var(--st-font-ui);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
    letter-spacing: 0.06em;
    margin-top: 0.5rem;
  }
  .mobile-service-link {
    display: flex;
    flex-direction: column;
    padding: 0.6rem 0.8rem;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-md);
  }

  @media (max-width: 900px) {
    .nav-pill-links,
    .nav-right {
      display: none;
    }
    .nav-mobile-actions { display: flex; }
    .nav-logo-center {
      position: static;
      transform: none;
    }
    .nav-shell {
      justify-content: space-between;
    }
  }
`;
