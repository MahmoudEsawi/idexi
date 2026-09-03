"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ProductComparison from "@/components/product/ProductComparison";
import ProductCompanions from "@/components/product/ProductCompanions";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Images,
  Lock,
  ScanFace,
  Send,
  Sparkles,
  UsersRound,
} from "lucide-react";

/* Product page: idexi Face.

   Copy is the partner's approved content file, already humanized, and is
   carried through this rewrite unchanged. Only the visual architecture and
   the motion are new.

   Section 3 is a port of the Sticky Scroll Reveal pattern from 21st.dev
   (21st.dev/aceternity/sticky-scroll-reveal): a pinned panel beside a column
   of steps, where scroll position drives which step is lit and which panel
   is on the plinth. The mechanic is the pattern's; nothing else is. The
   original ships cyan/emerald/orange gradient panels, which is exactly the
   stock-template look this page was rebuilt to get away from, so the panels
   here are drawn as real product surfaces on the --st-* scale instead.

   Its code was not copied: 21st.dev ships Tailwind and shadcn, and this
   project has neither. Structure and motion were reimplemented against the
   scoped-style pattern every other component here uses.

   The hero, its video and its entrance animation are untouched by
   instruction. */

const COMPARISON = [
  {
    old: "Guests search folders for hours",
    idexi: "AI finds every guest automatically, even in large group shots",
  },
  {
    old: "Shared links compromise privacy",
    idexi:
      "Private galleries, unlocked only with a one-time code sent to the guest's own email",
  },
  {
    old: "Manual delivery isn't feasible at scale",
    idexi: "One click sends every guest their own gallery",
  },
  {
    old: "Sponsor exposure gets lost",
    idexi: "Every gallery branded for your sponsors",
  },
  {
    old: "The event ends without an impression",
    idexi: "Every guest gets a gallery that's actually theirs",
  },
];

const STEPS = [
  {
    icon: ScanFace,
    title: "The Registration",
    /* The source reads "4 details" but lists three, and its own accuracy note
       lists three: name, email, face photo. Written as three; flagged for the
       partner rather than a fourth being invented. */
    desc: "Guests submit three details through a simple form: their name, their email, and a face photo, either a selfie or one from their gallery. Organizers can collect this however fits best. A QR code at a dedicated idexi booth, a code on screen during the opening, or a link sent by email before or after the event.",
  },
  {
    icon: Sparkles,
    title: "The Matching",
    desc: "After the event, the organizer uploads the full photo folder, and the size of it does not matter: 10 photos or 10,000. Our own AI model, tested at 99% accuracy even in group shots, then builds a private gallery for every guest automatically.",
  },
  {
    icon: Send,
    title: "The Delivery",
    desc: "One click from the dashboard sends every guest's gallery straight to their inbox.",
  },
];

const COMPANIONS = [
  {
    product: "idexi Pass",
    color: "pass" as const,
    href: "/services/pass",
    line: "Every guest already has an email on file, and the address their ticket went to is exactly where their photos land.",
  },
  {
    product: "idexi Flow",
    color: "flow" as const,
    href: "/services/flow",
    line: "Check-in confirms who actually showed up, so galleries only go out to guests who were really there.",
  },
];

/* One guest carried across all three panels, so the form, the matches and the
   delivered gallery are plainly the same person's. Same record the
   how-it-works walkthrough and the sponsors stage use. */
const GUEST = { name: "Layla Haddad", email: "layla.haddad@mail.com" };

/* Which tiles in the matching grid are hers. Fixed rather than derived, so
   the grid is identical on the server and the client. */
const GRID = [
  { src: "/editorial-orange-jacket.jpg", match: true },
  { src: "/face-gala-wedding.jpg", match: false },
  { src: "/editorial-red-coat.jpg", match: true },
  { src: "/face-corporate-summit.jpg", match: false },
  { src: "/editorial-knit-hood.jpg", match: true },
  { src: "/face-music-festival.jpg", match: false },
];

/* ── The three pinned panels ── */

function RegistrationPanel() {
  return (
    <div className="fp-card">
      <p className="fp-card-head">Guest registration</p>

      <div className="fp-field">
        <span className="fp-field-label">Name</span>
        <span className="fp-field-value">{GUEST.name}</span>
      </div>
      <div className="fp-field">
        <span className="fp-field-label">Email</span>
        <span className="fp-field-value">{GUEST.email}</span>
      </div>

      <div className="fp-field">
        <span className="fp-field-label">Face photo</span>
        <div className="fp-shot">
          <Image
            src="/face-portrait-scan.jpg"
            alt=""
            fill
            sizes="120px"
            quality={55}
            className="fp-shot-img"
          />
          <span className="fp-bracket fp-bracket-tl" aria-hidden="true" />
          <span className="fp-bracket fp-bracket-tr" aria-hidden="true" />
          <span className="fp-bracket fp-bracket-bl" aria-hidden="true" />
          <span className="fp-bracket fp-bracket-br" aria-hidden="true" />
        </div>
      </div>

      <span className="fp-submit">Submit</span>
    </div>
  );
}

function MatchingPanel() {
  return (
    <div className="fp-card">
      <p className="fp-card-head">Event folder</p>

      <div className="fp-grid">
        {GRID.map((tile) => (
          <span
            key={tile.src}
            className="fp-tile"
            data-match={tile.match ? "1" : undefined}
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="120px"
              quality={55}
              className="fp-tile-img"
            />
            {tile.match && (
              <span className="fp-tile-flag" aria-hidden="true">
                <Check size={11} strokeWidth={3} />
              </span>
            )}
          </span>
        ))}
      </div>

      <p className="fp-card-note">
        <Sparkles size={13} aria-hidden="true" /> Matching {GUEST.name.split(" ")[0]}
      </p>
    </div>
  );
}

function DeliveryPanel() {
  return (
    <div className="fp-card">
      <p className="fp-card-head">Inbox</p>

      <div className="fp-mail">
        <span className="fp-mail-avatar" aria-hidden="true">ix</span>
        <span className="fp-mail-copy">
          <span className="fp-mail-from">idexi Events</span>
          <span className="fp-mail-subject">Your photos are ready</span>
        </span>
      </div>

      <div className="fp-strip">
        {GRID.filter((t) => t.match).map((tile) => (
          <span key={tile.src} className="fp-strip-tile">
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="90px"
              quality={55}
              className="fp-tile-img"
            />
          </span>
        ))}
      </div>

      <p className="fp-card-note">
        <Lock size={13} aria-hidden="true" /> Opens with a one-time code
      </p>
    </div>
  );
}

const PANELS = [RegistrationPanel, MatchingPanel, DeliveryPanel];

function FaceCleanVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browser policy: autoplay requires programmatic muted property
    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback retry
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="face-video-wrapper" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="face-hero-video"
        src="/face-demo-video.mp4"
      />
    </div>
  );
}

export default function FaceService() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback((el: HTMLDivElement | null, i: number) => {
    stepRefs.current[i] = el;
  }, []);

  /* Whichever step's box is nearest the middle of the viewport is the lit
     one, measured directly rather than through an IntersectionObserver: the
     steps are taller than the observer's usable band, and every step overlaps
     the middle at some point, so a band-based observer fires once on the way
     in and then has nothing left to report. Reading positions on scroll is
     both simpler and exact. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      if (nodes.length === 0) return;

      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;

      nodes.forEach((node, i) => {
        const box = node.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - mid);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });

      setActive(best);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const reveal = (delay = 0) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="service-page-container face-page">
      <style>{faceCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Camera size={14} /> idexi Face
          </span>
        </div>

        {/* ── Hero. Untouched by instruction. ── */}
        <div className="service-hero-grid face-hero">
          <div className="service-info-col">
            <h1 className="service-title">Your Event Photos, Delivered Instantly</h1>
            <p className="service-description">
              Guests take a quick selfie at registration. Once photographers upload event photos, idexi Face matches
              every face and delivers each guest a private link to their own gallery.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book a Demo <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame face-video-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FaceCleanVideo />
          </motion.div>
        </div>

        {/* ── Section 2. The old way vs the idexi way. ──
            The strike is drawn as the row arrives and the coral card springs
            in behind it, so the row performs the swap rather than stating it. */}
        <div className="service-section" id="comparison">
          <h2 className="service-subsection-title">
            Finding your photos shouldn&apos;t feel like a search party.
          </h2>
          <p className="face-section-lede">Here&apos;s exactly what changes.</p>

          <ProductComparison rows={COMPARISON} product="face" />
        </div>
      </div>

      {/* ── Section 3. Sticky scroll reveal. ──
          Full-bleed rather than inside the page's measured column, so the
          pinned panel has a stage to sit on. */}
      <div className="face-flow">
        <div className="face-flow-head">
          <h2 className="service-subsection-title">Three steps. Zero searching.</h2>
        </div>

        <div className="face-flow-inner">
          <div className="face-flow-stage" aria-hidden="true">
            <div className="face-flow-pin">
              <div className="face-flow-panels" data-active={active}>
                <span className="face-flow-glow" />
                {PANELS.map((Panel, i) => (
                  <div key={i} className="face-flow-panel" data-index={i}>
                    <Panel />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="face-flow-steps">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="face-flow-step"
                  data-on={i === active ? "1" : undefined}
                  ref={(el) => setStepRef(el, i)}
                >
                  <span className="face-flow-marker">
                    <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="face-flow-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="face-flow-title">{step.title}</h3>
                  <p className="face-flow-desc">{step.desc}</p>

                  {/* Reduced motion drops the pinned stage, so each step
                      carries its own panel inline instead of pointing at
                      something that is not there. */}
                  <div className="face-flow-inline" aria-hidden="true">
                    {(() => {
                      const Panel = PANELS[i];
                      return <Panel />;
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container service-page-content face-page-tail">
        {/* ── Section 4. What makes it work. ── */}
        <div className="service-bento-section face-bento-section">
          <h2 className="service-subsection-title">What makes it work</h2>
          <div className="service-bento">
            <motion.div className="service-bento-feature face-tile" {...reveal()}>
              <UsersRound size={26} className="face-feature-icon" aria-hidden="true" />
              <h3 className="service-bento-feature-stat">Built for real crowds</h3>
              <p className="service-bento-feature-desc">
                Our own AI model handles group shots, side angles, and tricky lighting. We
                built and tested it specifically for crowded events.
              </p>
            </motion.div>

            <motion.div className="service-bento-card face-tile" {...reveal(0.08)}>
              <Lock size={22} className="face-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">Privacy by default</h3>
              <p className="service-bento-card-desc">
                No public links, ever. Each guest unlocks their own gallery with a one-time
                code sent only to their email.
              </p>
            </motion.div>

            <motion.div className="service-bento-card face-tile" {...reveal(0.14)}>
              <Images size={22} className="face-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">One upload, every guest matched</h3>
              <p className="service-bento-card-desc">
                Whether it&apos;s 10 photos or 10,000, the organizer uploads once and the
                system matches every guest automatically.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Section 5. Cross-sell. ── */}
        <div className="service-section">
          <h2 className="service-subsection-title">Works even better with...</h2>
          <p className="face-section-lede">
            Face delivers the moment. Here&apos;s what got everyone there.
          </p>

          <ProductCompanions items={COMPANIONS} />
        </div>
      </div>

      {/* ── Section 6. Final CTA. ── */}
      <CtaSection
        heading="Ready to give every guest their moment?"
        subtext="Tell us about your event. We'll show you exactly how idexi Face fits, with no commitment and no pressure."
        bullets={null}
        defaultSolution="idexi Face"
      />
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const faceCSS = `
  .face-page {
    padding-bottom: 0;
  }
  .face-page .service-section:last-of-type {
    margin-bottom: 0;
  }
  .face-page-tail {
    padding-top: 0;
  }

  .face-hero {
    align-items: center;
  }
  .face-video-frame {
    width: 100%;
  }
  .face-video-wrapper {
    width: 100%;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
  }
  .face-hero-video {
    display: block;
    width: 100%;
    height: auto;
  }

  .face-section-lede {
    max-width: 46ch;
    margin: -2.5rem auto 3rem;
    text-align: center;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* ── Section 3: the pinned stage ── */
  .face-flow {
    position: relative;
    margin-bottom: var(--st-space-xl);
    padding: 4rem var(--st-space-margin-mobile) 0;
    background: var(--st-surface-container-low);
    border-top: 1px solid var(--st-outline-variant);
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .face-flow-head {
    max-width: 1200px;
    margin: 0 auto;
  }
  .face-flow-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
  }

  /* A plain stretched grid item. It has to run the full height of the steps
     column, because that column is the sticky range: sizing this to 100svh
     instead made the panel unpin partway through the last step. */
  .face-flow-stage {
    position: relative;
  }
  .face-flow-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .face-flow-panels {
    position: relative;
    display: grid;
    width: min(360px, 100%);
  }

  /* A single wash behind the plinth, mixed from the product token so it
     tints with the theme. This is the one place the accent is spent as
     atmosphere rather than as a surface. */
  .face-flow-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 118%;
    height: 78%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      color-mix(in srgb, var(--st-product-face) 22%, transparent) 0%,
      transparent 72%
    );
    filter: blur(46px);
    pointer-events: none;
  }

  /* All three stay mounted and stacked in one grid cell. Only the one the
     parent names is solid, so the photographs inside are fetched once when
     the section renders rather than again on every pass. Driven by an
     attribute on the parent rather than per-panel animation props, which is
     the same swap the sponsors stage uses. */
  .face-flow-panel {
    grid-area: 1 / 1;
    opacity: 0;
    transform: translateY(16px) scale(0.965);
    transition:
      opacity 0.34s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  .face-flow-panels[data-active='0'] .face-flow-panel[data-index='0'],
  .face-flow-panels[data-active='1'] .face-flow-panel[data-index='1'],
  .face-flow-panels[data-active='2'] .face-flow-panel[data-index='2'] {
    opacity: 1;
    transform: none;
    z-index: 2;
  }

  /* The pin's sticky range is this column's height minus the pin's own
     100svh. Without the tail the range ends about a fifth of a screen before
     the last step reaches the middle, and the panel slides away while its
     step is still being read. The tail buys that range back. */
  .face-flow-steps {
    display: flex;
    flex-direction: column;
    padding-bottom: 26svh;
  }
  .face-flow-step {
    position: relative;
    min-height: 78svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0 2rem 3rem;
    opacity: 0.34;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .face-flow-step[data-on] {
    opacity: 1;
  }

  .face-flow-marker {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -3.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--st-outline-variant);
    color: var(--st-on-surface-variant);
    background: var(--st-surface-container-low);
    transition: border-color 0.5s ease, color 0.5s ease;
  }
  .face-flow-step[data-on] .face-flow-marker {
    border-color: var(--st-product-face);
    color: var(--st-product-face);
  }

  .face-flow-index {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    color: var(--st-product-face);
    font-variant-numeric: tabular-nums;
  }
  .face-flow-title {
    margin: 0.35rem 0 0.6rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.45rem;
    color: var(--st-on-background);
  }
  .face-flow-desc {
    margin: 0;
    max-width: 46ch;
    font-size: 1.02rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
  }

  .face-flow-inline { display: none; }

  /* ── The panels ── */
  .fp-card {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1.5rem 1.4rem;
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    box-shadow: 0 26px 50px -30px color-mix(in srgb, var(--st-on-background) 55%, transparent);
  }
  :root[data-theme='dark'] .fp-card {
    box-shadow: 0 26px 50px -30px var(--st-surface-dim);
  }

  .fp-card-head {
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }

  .fp-field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .fp-field-label {
    font-size: 0.72rem;
    color: var(--st-on-surface-variant);
  }
  .fp-field-value {
    padding: 0.55rem 0.75rem;
    border-radius: var(--st-radius);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    font-size: 0.88rem;
    color: var(--st-on-surface);
  }

  .fp-shot {
    position: relative;
    width: 104px;
    height: 104px;
    border-radius: var(--st-radius);
    overflow: hidden;
    background: var(--st-surface-container-low);
  }
  .fp-shot-img { object-fit: cover; }

  /* Corner brackets, not a full frame: a capture reticle reads as scanning,
     a border reads as a picture frame. */
  .fp-bracket {
    position: absolute;
    width: 13px;
    height: 13px;
    border: 2px solid var(--st-product-face);
  }
  .fp-bracket-tl { top: 7px; left: 7px; border-right: none; border-bottom: none; }
  .fp-bracket-tr { top: 7px; right: 7px; border-left: none; border-bottom: none; }
  .fp-bracket-bl { bottom: 7px; left: 7px; border-right: none; border-top: none; }
  .fp-bracket-br { bottom: 7px; right: 7px; border-left: none; border-top: none; }

  .fp-submit {
    align-self: flex-start;
    margin-top: 0.15rem;
    padding: 0.45rem 1rem;
    border-radius: var(--st-radius-full);
    background: var(--st-primary);
    color: var(--st-on-primary);
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
  }

  .fp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .fp-tile {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--st-radius-sm);
    overflow: hidden;
    background: var(--st-surface-container-low);
  }
  .fp-tile-img { object-fit: cover; }

  /* The matched tiles are the argument, so the unmatched ones step back
     rather than the matched ones shouting. */
  .fp-tile:not([data-match]) .fp-tile-img {
    filter: grayscale(1);
    opacity: 0.45;
  }
  .fp-tile[data-match] {
    box-shadow: inset 0 0 0 2px var(--st-product-face);
  }
  .fp-tile-flag {
    position: absolute;
    right: 4px;
    bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--st-product-face);
    color: var(--st-surface-dim);
  }

  .fp-card-note {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }
  .fp-card-note svg { color: var(--st-product-face); flex-shrink: 0; }

  .fp-mail {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem;
    border-radius: var(--st-radius);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
  }
  .fp-mail-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
  }
  :root[data-theme='dark'] .fp-mail-avatar {
    background: var(--st-surface-container);
  }
  .fp-mail-copy {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }
  .fp-mail-from {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--st-on-surface);
  }
  .fp-mail-subject {
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }

  .fp-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .fp-strip-tile {
    position: relative;
    aspect-ratio: 3 / 4;
    border-radius: var(--st-radius-sm);
    overflow: hidden;
    background: var(--st-surface-container-low);
  }

  /* ── Section 4 ── */
  .face-bento-section {
    background: transparent;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
  .face-feature-icon {
    margin-bottom: 1.25rem;
    color: color-mix(in srgb, var(--st-on-primary) 78%, var(--st-primary));
  }
  .face-card-icon {
    margin-bottom: 0.85rem;
    color: var(--st-product-face);
  }
  .face-tile {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.35s ease;
  }
  .face-tile:hover {
    transform: translateY(-4px);
  }
  .service-bento-card.face-tile:hover {
    border-color: color-mix(in srgb, var(--st-product-face) 45%, transparent);
  }

  @media (max-width: 900px) {
    .face-flow-inner {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .face-flow-stage { display: none; }
    .face-flow-steps { padding-bottom: 0; }
    .face-flow-step {
      min-height: 0;
      opacity: 1;
      padding: 2.25rem 0 2.25rem 2.6rem;
    }
    .face-flow-marker {
      top: 0;
      margin-top: 0.15rem;
    }
    .face-flow-inline {
      display: block;
      max-width: 320px;
      margin-top: 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    /* Pinning is scroll-linked motion, so it goes: each step carries its
       own panel and the page becomes an ordinary column. */
    .face-flow-stage { display: none; }
    .face-flow-inner { grid-template-columns: 1fr; }
    .face-flow-steps { padding-bottom: 0; }
    .face-flow-step {
      min-height: 0;
      opacity: 1;
      padding: 2rem 0 2rem 3rem;
      transition: none;
    }
    .face-flow-marker {
      top: 0;
      margin-top: 0.15rem;
    }
    .face-flow-inline {
      display: block;
      max-width: 340px;
      margin-top: 1.5rem;
    }
    .face-flow-panel,
    .face-tile {
      transition: none;
    }
    .face-tile:hover { transform: none; }
  }
`;
