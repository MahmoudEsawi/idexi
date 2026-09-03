"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* Use cases as a reel of title cards rather than a grid or a console.

   Structure: one sticky stage holds all six photographs stacked; the text
   panels scroll over it. Crossfading opacity on a single pinned stage costs
   one compositor property and never moves layout, which is what keeps six
   full-bleed photographs affordable.

   The hook line, not the category, is set at display scale. It is the best
   writing on the page and it is the partner's, so it gets the room. The
   category becomes a tracked kicker above it.

   The index spine on the right is the one structural flourish, and it earns
   its place: the spec fixes this order deliberately (academic, then corporate,
   then personal), so position in the sequence is real information rather than
   decoration.

   Photography is the project's own event library, not stock. Swap the `image`
   paths as real photography per category arrives; nothing else needs to move.

   Copy note: category names and hook lines follow docs/specs/idexi-MASTER-SPEC.md
   section 8. The spec's two em dashes are replaced per rule 14 of
   humanizer.md, which bans them: the Graduations hook takes a comma and the
   Weddings hook splits into two sentences. No other wording changes. */

type Scene = {
  id: string;
  category: string;
  hook: string;
  image: string;
  /** Alt text describes the photograph, not the category. */
  alt: string;
  roles: { product: string; color: "pass" | "flow" | "face"; role: string }[];
  tags: string[];
};

const SCENES: Scene[] = [
  {
    id: "graduations",
    category: "Graduations",
    hook: "Whether it's a school, an institute, or a university, graduation day means hundreds of names to organize and the photos every graduate actually wants.",
    image: "/use-cases/graduations.webp",
    alt: "Graduates throwing their caps in the air at an outdoor ceremony at sunset",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Sorts every graduate into their category the moment they register." },
      { product: "idexi Flow", color: "flow", role: "Checks each graduate in as they arrive, so staff always know who's present." },
      { product: "idexi Face", color: "face", role: "Delivers the graduate's own photo the moment the ceremony ends, without mixing them up with anyone else in the crowd." },
    ],
    tags: ["VIP & guest tiers", "Kit & meal pickup", "Private photo gallery"],
  },
  {
    id: "competitions",
    category: "Competitions",
    hook: "Dozens of teams, hundreds of participants from different schools or universities, and a schedule that can't afford to run late.",
    image: "/use-cases/competitions.webp",
    alt: "A student robotics team gathered around their machine at a competition table",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Registers every team and participant with their category, sent out automatically ahead of time." },
      { product: "idexi Flow", color: "flow", role: "Checks participants in fast, and confirms who's cleared for which round or session." },
      { product: "idexi Face", color: "face", role: "Sends every participant their own photos from the day, without digging through team group shots." },
    ],
    tags: ["VIP & guest tiers", "Press credentials", "Session access", "Kit & meal pickup", "Sponsor branding", "Private photo gallery", "Multi-day"],
  },
  {
    id: "conferences",
    category: "Conferences & Talks",
    hook: "Multiple sessions, speakers running on a schedule, and an audience that needs to be in the right room at the right time.",
    image: "/use-cases/conferences.webp",
    alt: "A seated auditorium audience facing a speaker at a lit podium",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Sends every attendee a ticket that matches their access level: general, speaker, or press." },
      { product: "idexi Flow", color: "flow", role: "Confirms which session each guest is registered for, and directs them straight to their seat." },
      { product: "idexi Face", color: "face", role: "Captures every keynote and networking moment, delivered straight to each attendee afterward." },
    ],
    tags: ["VIP & guest tiers", "Press credentials", "Session access", "Kit & meal pickup", "Sponsor branding", "Private photo gallery", "Multi-day"],
  },
  {
    id: "summits",
    category: "Corporate Summits",
    hook: "Executives, partners, and sponsors all in the same room, and every one of them expects to be treated like it matters.",
    image: "/use-cases/summits.webp",
    alt: "Delegates in business attire talking over drinks at an evening summit reception",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Issues branded tickets by category, so VIPs and general attendees are never mixed up." },
      { product: "idexi Flow", color: "flow", role: "Flags VIP guests the moment they arrive, and tracks every badge and welcome kit." },
      { product: "idexi Face", color: "face", role: "Delivers professional event photos to every attendee, the kind they're proud to share on LinkedIn." },
    ],
    tags: ["VIP & guest tiers", "Press credentials", "Session access", "Kit & meal pickup", "Sponsor branding", "Private photo gallery"],
  },
  {
    id: "tradeshows",
    category: "Trade Shows & Exhibitions",
    hook: "Thousands of visitors moving through the floor all day, and every exhibitor booth needs to know exactly who walked by.",
    image: "/use-cases/tradeshows.webp",
    alt: "A packed exhibition hall of stands and lanyarded visitors",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Issues digital badges to thousands of visitors and exhibitors, without a single printed list." },
      { product: "idexi Flow", color: "flow", role: "Scans badges at any booth or entrance, instantly, with zero dedicated hardware." },
      { product: "idexi Face", color: "face", role: "Sends visitors their photos from the floor, a simple touch that keeps your event memorable." },
    ],
    tags: ["VIP & guest tiers", "Press credentials", "Sponsor branding", "Private photo gallery", "Multi-day"],
  },
  {
    id: "weddings",
    category: "Weddings & Private Celebrations",
    hook: "A guest list that matters personally, and photos everyone wants the same night, not weeks later.",
    image: "/use-cases/weddings.webp",
    alt: "Guests dancing under festoon lights at a wedding reception",
    roles: [
      { product: "idexi Pass", color: "pass", role: "Sends elegant, personalized invitations with a unique code for every guest." },
      { product: "idexi Flow", color: "flow", role: "Confirms each guest at the door quietly and smoothly, with no clipboard and no awkward waiting." },
      { product: "idexi Face", color: "face", role: "Gets every guest their own photos before the night even ends, with no waiting on the photographer." },
    ],
    tags: ["Private photo gallery"],
  },
];

export default function UseCaseReel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [reelInView, setReelInView] = React.useState(false);
  const panelsRef = React.useRef<HTMLDivElement>(null);
  const panelRefs = React.useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();

  /* The spine is fixed so it holds position while the panels scroll, which
     also meant it kept floating over the footer once the reel was behind
     the viewport. It now tracks the panels container rather than the reel
     root, because the root also contains the outro, which is still on
     screen when the page bottom is reached. */
  React.useEffect(() => {
    const node = panelsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setReelInView(entry.isIntersecting),
      // A middle band, not the full viewport: at the page bottom the panels
      // container still had a sliver on screen behind the outro, which kept
      // the spine alive over the footer.
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const i = nodes.indexOf(hit.target as HTMLElement);
        if (i >= 0) setActiveIndex(i);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="reel">
      <style>{reelCSS}</style>

      {/* One pinned stage carries every photograph. Only opacity changes. */}
      <div className="reel-stage" aria-hidden="true">
        {SCENES.map((scene, i) => (
          <div
            key={scene.id}
            className={i === activeIndex ? "reel-shot reel-shot-on" : "reel-shot"}
          >
            {/* 100vw is the wrong number here. The stage is full-bleed at
                100svh and the photographs are 16:9, so cover-cropping into a
                portrait phone viewport is height-constrained: a 390px-wide
                derivative gets stretched about four times vertically. These
                widths are picked from the height the crop actually has to
                fill, capped so a phone still never pulls a 4K frame. Only the
                first is eager: it is the one painted when the reel pins. */}
            <Image
              src={scene.image}
              alt=""
              fill
              sizes="(max-width: 767px) 1080px, 1920px"
              quality={70}
              priority={i === 0}
              className="reel-img"
            />
          </div>
        ))}
        <div className="reel-scrim" />
      </div>

      {/* Chapter spine. The spec fixes this order on purpose, so where you are
          in the sequence is information, not ornament. */}
      <div className={reelInView ? "reel-spine reel-spine-on" : "reel-spine"} aria-hidden="true">
        {SCENES.map((scene, i) => (
          <span
            key={scene.id}
            className={i === activeIndex ? "reel-spine-dot reel-spine-dot-on" : "reel-spine-dot"}
          >
            <span className="reel-spine-num">{String(i + 1).padStart(2, "0")}</span>
          </span>
        ))}
      </div>

      <div className="reel-panels" ref={panelsRef}>
        {SCENES.map((scene, i) => (
          <section
            key={scene.id}
            id={scene.id}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="reel-panel"
          >
            {/* Reduced motion drops the pinned stage, so each panel carries
                its own photograph inline instead of scrolling over nothing. */}
            <div className="reel-inline-shot">
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                sizes="(max-width: 767px) 1080px, 1920px"
                quality={70}
                className="reel-img"
              />
              <div className="reel-inline-scrim" />
            </div>

            <motion.div
              className="reel-content"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: reduced ? 0.25 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="reel-kicker">
                <span className="reel-kicker-index">{String(i + 1).padStart(2, "0")}</span>
                {scene.category}
              </p>

              <h2 className="reel-hook">{scene.hook}</h2>

              <div className="reel-spec">
                <ul className="reel-roles">
                  {scene.roles.map((r) => (
                    <li key={r.product} className="reel-role" data-color={r.color}>
                      <span className="reel-role-product">{r.product}</span>
                      <span className="reel-role-text">{r.role}</span>
                    </li>
                  ))}
                </ul>
                <p className="reel-tags">
                  {scene.tags.map((t, ti) => (
                    <span key={t} className="reel-tag">
                      {ti > 0 ? <span className="reel-tag-sep" aria-hidden="true"> · </span> : null}
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      <div className="reel-outro">
        <h2 className="reel-outro-heading">Don&apos;t see your event type listed?</h2>
        <p className="reel-outro-text">
          idexi adapts to almost any live event. Tell us about yours, and we&apos;ll show
          you exactly how it fits.
        </p>
        <Link href="/#contact" className="st-btn st-btn-primary">
          Book a Demo
        </Link>
      </div>
    </div>
  );
}

const reelCSS = `
  .reel {
    position: relative;
    background: #05070d;
    overflow-x: clip;
    overflow-y: visible;
  }

  .reel-stage {
    position: sticky;
    top: 0;
    height: 100svh;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }

  .reel-shot {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reel-shot-on {
    opacity: 1;
  }

  .reel-img {
    object-fit: cover;
    object-position: center;
  }

  /* Navy-tinted rather than neutral black: the scrim stays part of the brand
     rather than reading as a generic photo overlay. Heaviest at the bottom,
     where the type sits. */
  .reel-scrim {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right, rgba(3, 8, 20, 0.93) 0%, rgba(3, 8, 20, 0.82) 34%, rgba(3, 8, 20, 0.42) 68%, rgba(3, 8, 20, 0.3) 100%),
      linear-gradient(to top, rgba(3, 8, 20, 0.55) 0%, rgba(3, 8, 20, 0.3) 45%, rgba(3, 8, 20, 0.62) 100%);
  }

  .reel-panels {
    position: relative;
    z-index: 1;
    /* Pulls the panels up over the pinned stage. */
    margin-top: -100svh;
  }

  .reel-panel {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 100svh;
    /* Top padding clears the fixed navbar; centring keeps a text block on
       screen for most of each panel's travel instead of only at its foot. */
    padding: clamp(6rem, 13vh, 9rem) clamp(1.25rem, 6vw, 6rem) clamp(3rem, 8vh, 5rem);
    overflow-x: clip;
    overflow-y: visible;
    /* Deep links from the home page accordion land on these panels, so they
       need to clear the fixed navbar. */
    scroll-margin-top: 0;
  }

  .reel-inline-shot { display: none; }

  .reel-content {
    position: relative;
    max-width: 62ch;
  }

  .reel-kicker {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 1rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }
  .reel-kicker-index {
    padding: 0.15rem 0.45rem;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.14);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
  }

  /* The hook carries the page. It is the partner's strongest line, so it gets
     display scale and the serif. */
  .reel-hook {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.5rem, 1.9vw + 0.8rem, 2.4rem);
    line-height: 1.25;
    letter-spacing: -0.015em;
    color: #ffffff;
    text-wrap: balance;
    text-shadow: 0 2px 30px rgba(0, 0, 0, 0.4);
  }

  .reel-spec {
    margin-top: 1.6rem;
    padding: 1.1rem 1.25rem;
    border-radius: var(--st-radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
  }

  .reel-roles {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    list-style: none;
  }
  .reel-role {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.15rem 0.6rem;
    font-size: 0.92rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.82);
  }
  .reel-role-product {
    flex-shrink: 0;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.01em;
  }
  .reel-role[data-color='pass'] .reel-role-product { color: #9ec2ff; }
  .reel-role[data-color='flow'] .reel-role-product { color: #4fe3ec; }
  .reel-role[data-color='face'] .reel-role-product { color: #ffb4a1; }

  .reel-tags {
    margin-top: 0.9rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 0.8rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.62);
  }
  .reel-tag-sep { color: rgba(255, 255, 255, 0.3); }

  /* Chapter spine */
  .reel-spine {
    position: fixed;
    right: clamp(0.75rem, 2vw, 1.75rem);
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease, visibility 0.35s;
  }
  .reel-spine-on {
    opacity: 1;
    visibility: visible;
  }
  .reel-spine-dot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 14px;
  }
  .reel-spine-num {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.32);
    transition: color 0.4s ease, opacity 0.4s ease;
  }
  .reel-spine-dot-on .reel-spine-num {
    color: #ffffff;
  }

  .reel-outro-heading {
    margin: 0;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.7rem, 2.6vw + 0.9rem, 2.4rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: rgba(255, 255, 255, 0.96);
    text-wrap: balance;
  }

  .reel-outro {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--st-space-md);
    padding: clamp(4rem, 12vh, 7rem) clamp(1.25rem, 6vw, 6rem);
    text-align: center;
    background: #05070d;
  }
  .reel-outro-text {
    font-family: var(--st-font-serif);
    font-size: clamp(1.25rem, 2vw + 0.7rem, 1.9rem);
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.9);
    max-width: 38ch;
  }

  /* Short laptop viewports. The longest hook runs to four lines, and at
     1280x720 the full block was clipping under the fixed navbar on every
     panel. Type and the spec strip tighten rather than the panel scrolling,
     because the whole point of the reel is that a panel reads at rest. */
  @media (min-width: 900px) and (max-height: 840px) {
    .reel-panel {
      padding-top: clamp(5.25rem, 10vh, 6.5rem);
      padding-bottom: clamp(2rem, 5vh, 3rem);
    }
    .reel-hook {
      font-size: clamp(1.35rem, 1.5vw + 0.7rem, 1.95rem);
      line-height: 1.25;
    }
    .reel-spec {
      margin-top: 1.05rem;
      padding: 0.85rem 1rem;
    }
    .reel-roles { gap: 0.4rem; }
    .reel-role { font-size: 0.86rem; line-height: 1.45; }
    .reel-tags {
      margin-top: 0.65rem;
      padding-top: 0.6rem;
      font-size: 0.74rem;
    }
    .reel-kicker { margin-bottom: 0.7rem; }
  }

  @media (max-width: 767px) {
    .reel-spine { display: none; }
    .reel-spec { padding: 0.95rem 1rem; }
  }

  /* Reduced motion: no pinned stage, no crossfade. Each panel becomes an
     ordinary block with its own photograph behind its own scrim, so the
     content reads identically without anything having to move. */
  @media (prefers-reduced-motion: reduce) {
    .reel-stage { display: none; }
    .reel-panels { margin-top: 0; }
    .reel-panel {
      min-height: 0;
      padding-top: clamp(3rem, 9vh, 6rem);
    }
    .reel-inline-shot {
      display: block;
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .reel-inline-scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(3, 8, 20, 0.93) 0%, rgba(3, 8, 20, 0.78) 45%, rgba(3, 8, 20, 0.55) 100%);
    }
    .reel-shot { transition: none; }
  }
`;
