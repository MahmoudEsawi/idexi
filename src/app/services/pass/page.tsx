"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ProductComparison from "@/components/product/ProductComparison";
import ProductCompanions from "@/components/product/ProductCompanions";
import TiltPass from "@/components/product/TiltPass";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Send,
  Sparkles,
  Tags,
  Ticket,
  Upload,
  Zap,
} from "lucide-react";

/* Product page: idexi Pass.

   Copy is the partner's approved content file, humanized. The page follows
   the six-section template the file defines:

     Hero -> Comparison -> Process -> Feature highlights -> Cross-sell -> CTA

   Section 3 adapts Process Timeline by youcefbnm from 21st.dev
   (21st.dev/@youcefbnm/components/process-timeline), fetched through the
   21st MCP. Its mechanic is a tall scroll container whose progress drives
   cards across a pinned, clipped viewport. That is kept. Everything else is
   re-engineered: the original needs class-variance-authority, a cn helper,
   useMeasure from @uidotdev/usehooks and motion/react, none of which this
   project has, and it reads window.innerWidth during render, which throws
   during SSR. The track here is sized in viewport-width slots instead, so
   each card centres exactly with no measurement and no window access. Its
   indigo gradient cards and radial indigo ground are dropped for the --st-*
   scale.

   The hero visual is TiltPass, a pointer-driven 3D pass. It replaced an
   earlier ticket stub whose stylesheet was lost when this page's scoped CSS
   was rewritten, leaving the markup to render undressed.

   Accuracy note carried from the content file: Pass ends at generating and
   delivering the ticket. It has no door or scanning function, which belongs
   to Flow. Nothing on this page claims otherwise; the only mention of
   scanning is the Flow cross-sell card, which is about Flow. */

const COMPARISON = [
  { old: "Manual approvals slow registration", idexi: "Delivered automatically, in minutes" },
  { old: "Generic tickets feel unprofessional", idexi: "Fully branded, with the guest's name" },
  {
    old: "Categories managed by hand invite errors",
    idexi: "VIP, general, press and staff, all built in",
  },
  { old: "Screenshotted tickets get reused", idexi: "One encrypted QR, one entry only" },
  { old: "Sponsor visibility is an afterthought", idexi: "Sponsor branding on every ticket" },
];

const STEPS = [
  {
    icon: FileSpreadsheet,
    title: "The Guest List",
    desc: "Upload an Excel sheet with names and categories, along with your event logo and your sponsors' logos.",
  },
  {
    icon: Zap,
    title: "The Automation",
    desc: "The system generates a personalized email and a professionally designed ticket, complete with a QR code, for every guest.",
  },
  {
    icon: Send,
    title: "The Delivery",
    desc: "Each guest receives their own branded ticket by email, automatically, in minutes.",
  },
];

const COMPANIONS = [
  {
    product: "idexi Flow",
    color: "flow" as const,
    href: "/services/flow",
    line: "That QR code on every ticket is what your staff scans at the door, with no printed lists and no separate system.",
  },
  {
    product: "idexi Face",
    color: "face" as const,
    href: "/services/face",
    line: "Once guests are checked in, their photos find them automatically, delivered to the same inbox that got their ticket.",
  },
];

/* One guest carried across all three cards, so the row in the sheet, the
   ticket built from it and the email that delivers it are plainly the same
   person's. Same record the rest of the site uses. */
const GUEST = { name: "Layla Haddad", email: "layla.haddad@mail.com", code: "IDX-2K7-4413" };

const SHEET = [
  { name: "Layla Haddad", tier: "VIP" },
  { name: "Omar Nassar", tier: "General" },
  { name: "Rana Khoury", tier: "Press" },
  { name: "Sami Dabbas", tier: "Staff" },
];

/* Fixed rather than generated: the ticket has to be the same ticket on the
   server and on the client, and nothing may shift during hydration. */
const QR_ROWS = [
  "11101011101",
  "10100010101",
  "11101110111",
  "00010100010",
  "10110011011",
  "01001101100",
  "11010010110",
  "00101100101",
  "11100101101",
  "10101011010",
  "11100110011",
];
const QR_CELLS = QR_ROWS.join("").split("");

function QrBlock() {
  return (
    <span className="pt-qr" aria-hidden="true">
      {QR_CELLS.map((cell, i) => (
        <span key={i} data-on={cell === "1" ? "1" : undefined} />
      ))}
    </span>
  );
}

/* A sponsor strip built from the same four-mark plate the sponsors section
   on the home page uses, so the branding a sponsor sees here is the branding
   they were promised there. */
function SponsorStrip() {
  return (
    <span className="pt-sponsors" aria-hidden="true">
      <span className="pt-sponsor-mark pt-sponsor-a" />
      <span className="pt-sponsor-mark pt-sponsor-b" />
      <span className="pt-sponsor-mark pt-sponsor-c" />
      <span className="pt-sponsor-mark pt-sponsor-d" />
    </span>
  );
}

/* ── The three step visuals ── */

function GuestListVisual() {
  return (
    <div className="pv-card">
      <p className="pv-head">
        <FileSpreadsheet size={13} aria-hidden="true" /> guests.xlsx
      </p>
      <div className="pv-sheet">
        {SHEET.map((row) => (
          <div key={row.name} className="pv-sheet-row" data-me={row.name === GUEST.name ? "1" : undefined}>
            <span className="pv-sheet-name">{row.name}</span>
            <span className="pv-tier" data-tier={row.tier.toLowerCase()}>
              {row.tier}
            </span>
          </div>
        ))}
      </div>
      <div className="pv-uploads">
        <span className="pv-upload">
          <Upload size={12} aria-hidden="true" /> Event logo
        </span>
        <span className="pv-upload">
          <Upload size={12} aria-hidden="true" /> Sponsor logos
        </span>
      </div>
    </div>
  );
}

/* The ticket. This is the thing the page is selling, so it is drawn as the
   real object: brand line, tier, guest, perforation punched through the
   stock, a scannable-looking code and the sponsor strip along the foot. */
function TicketVisual() {
  return (
    <div className="pv-ticket">
      <div className="pv-ticket-top">
        <span className="pv-ticket-brand">
          <Ticket size={14} aria-hidden="true" /> idexi Pass
        </span>
        <span className="pv-ticket-tier">VIP</span>
      </div>

      <div className="pv-ticket-main">
        <span className="pv-ticket-label">Attendee</span>
        <span className="pv-ticket-name">{GUEST.name}</span>
        <span className="pv-ticket-meta">Doors 7:00 PM &middot; Main hall</span>
      </div>

      <div className="pv-perf" aria-hidden="true">
        <span className="pv-notch pv-notch-l" />
        <span className="pv-notch pv-notch-r" />
      </div>

      <div className="pv-ticket-foot">
        <QrBlock />
        <div className="pv-ticket-code">
          <span className="pv-code-value">{GUEST.code}</span>
          <span className="pv-code-note">Encrypted, one entry only</span>
        </div>
      </div>

      <div className="pv-ticket-sponsors">
        <span className="pv-sponsor-label">Presented by</span>
        <SponsorStrip />
      </div>
    </div>
  );
}

function DeliveryVisual() {
  return (
    <div className="pv-card">
      <p className="pv-head">
        <Send size={13} aria-hidden="true" /> Sending
      </p>

      <div className="pv-mail">
        <span className="pv-mail-avatar" aria-hidden="true">ix</span>
        <span className="pv-mail-copy">
          <span className="pv-mail-from">idexi Events</span>
          <span className="pv-mail-to">to {GUEST.email}</span>
        </span>
      </div>

      <div className="pv-mail-body">
        <span className="pv-mail-subject">Your ticket is ready</span>
        <span className="pv-mail-preview">
          Your personalized pass is attached. Show the QR at the door.
        </span>
      </div>

      <p className="pv-sent">
        <CheckCircle2 size={14} aria-hidden="true" /> Delivered to every guest
      </p>
    </div>
  );
}

const VISUALS = [GuestListVisual, TicketVisual, DeliveryVisual];

export default function PassService() {
  const prefersReducedMotion = useReducedMotion();
  const flowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* The 21st pattern's core: one scroll progress for the whole tall
     container, read against a pinned viewport inside it. */
  const { scrollYProgress } = useScroll({ target: flowRef });

  /* One slot per step, each exactly the pinned viewport's width, so moving
     the track by whole multiples of 100% lands every card dead centre. No
     element measurement and no window access, which is what the original
     needed useMeasure and window.innerWidth for. */
  const trackX = useTransform(scrollYProgress, [0.06, 0.94], ["0%", "-200%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.36 ? 0 : v < 0.7 ? 1 : 2;
    setActive((prev) => (prev === next ? prev : next));
  });

  const reveal = (delay = 0) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="service-page-container pass-page">
      <style>{passCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Ticket size={14} /> idexi Pass
          </span>
        </div>

        {/* ── Hero. Untouched by instruction. ── */}
        <div className="service-hero-grid pass-hero">
          <div className="service-info-col">
            <h1 className="service-title">Smart Digital Passes, Issued in Minutes</h1>
            <p className="service-description">
              Upload your guest list and deliver unique, branded digital passes to every inbox in under 5 minutes.
              No manual approvals, no generic PDFs.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book a Demo <ArrowRight size={16} /></Link>
              {/* A plain text link rather than .st-btn-bracket: the bracket
                  marks read as a second button competing with Book a Demo,
                  and as stray corner rules next to it. */}
              <Link href="#comparison" className="pass-hero-link">
                See the Comparison <ArrowDown size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltPass />
          </motion.div>
        </div>

        {/* ── Section 2 ── */}
        <div className="service-section" id="comparison">
          <h2 className="service-subsection-title">Ticketing shouldn&apos;t be this much work.</h2>
          <p className="pass-lede">Here&apos;s exactly what changes.</p>
          <ProductComparison rows={COMPARISON} product="pass" alignOld="right" showCheck />
        </div>
      </div>

      {/* ── Section 3. The conveyor. ── */}
      <div className="pass-flow" ref={flowRef}>
        <div className="pass-flow-pin">
          <div className="pass-flow-head">
            <h2 className="service-subsection-title pass-flow-title">Three steps. That&apos;s it.</h2>
            <div className="pass-flow-rail" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s.title} className="pass-rail-dot" data-on={i <= active ? "1" : undefined}>
                  <span className="pass-rail-num">{String(i + 1).padStart(2, "0")}</span>
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="pass-track"
            style={prefersReducedMotion ? undefined : { x: trackX }}
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const Visual = VISUALS[i];
              return (
                <div key={step.title} className="pass-slot">
                  <article className="pass-step" data-on={i === active ? "1" : undefined}>
                    <div className="pass-step-visual">
                      <Visual />
                    </div>
                    <div className="pass-step-copy">
                      <span className="pass-step-icon">
                        <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <h3 className="pass-step-title">{step.title}</h3>
                      <p className="pass-step-desc">{step.desc}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </motion.div>

          <div className="pass-flow-foot">
            <p className="pass-flow-note">
              That QR code is what idexi Flow uses later at the door.
            </p>
            <Link href="/how-it-works" className="pass-flow-link">
              See the full connected journey, from ticket to photo{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container service-page-content pass-page-tail">
        {/* ── Section 4 ── */}
        <div className="service-bento-section pass-bento-section">
          <h2 className="service-subsection-title">What makes it work</h2>
          <div className="service-bento">
            <motion.div className="service-bento-feature pass-tile" {...reveal()}>
              <Upload size={26} className="pass-feature-icon" aria-hidden="true" />
              <h3 className="service-bento-feature-stat">One upload, everything personalized</h3>
              <p className="service-bento-feature-desc">
                Upload your guest list, your event branding, and your sponsors&apos; logos once.
                Every guest then gets their own personalized email and ticket, automatically.
              </p>
            </motion.div>

            <motion.div className="service-bento-card pass-tile" {...reveal(0.08)}>
              <Tags size={22} className="pass-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">Categories, matched to the right message</h3>
              <p className="service-bento-card-desc">
                VIP, general, press and staff: each category gets its own message and ticket
                design, generated automatically from one upload.
              </p>
            </motion.div>

            <motion.div className="service-bento-card pass-tile" {...reveal(0.14)}>
              <Sparkles size={22} className="pass-card-icon" aria-hidden="true" />
              <h3 className="service-bento-card-title">A ticket that looks the part</h3>
              <p className="service-bento-card-desc">
                Every ticket is professionally designed with your event&apos;s identity and your
                sponsors&apos; logos, not just a QR code in a plain email.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Section 5 ── */}
        <div className="service-section">
          <h2 className="service-subsection-title">Works even better with...</h2>
          <p className="pass-lede">Pass gets the ticket out. Here&apos;s what happens next.</p>
          <ProductCompanions items={COMPANIONS} />
        </div>
      </div>

      {/* ── Section 6 ── */}
      <CtaSection
        heading="Ready to send your first ticket?"
        subtext="Tell us about your event. We'll show you exactly how idexi Pass fits, with no commitment and no pressure."
        bullets={null}
        defaultSolution="idexi Pass"
      />
    </div>
  );
}

/* No backticks below: the whole block is a template literal. */
const passCSS = `
  .pass-page { padding-bottom: 0; }
  .pass-page .service-section:last-of-type { margin-bottom: 0; }
  .pass-page-tail { padding-top: 0; }

  /* The secondary hero action: a link, weighted below the primary button
     rather than beside it as a second box. */
  .pass-hero-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: var(--st-space-sm) 0;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--st-product-pass);
    border-bottom: 1px solid color-mix(in srgb, var(--st-product-pass) 35%, transparent);
    transition: border-color 0.25s ease, color 0.25s ease;
  }
  .pass-hero-link:hover {
    color: var(--st-on-background);
    border-bottom-color: var(--st-on-background);
  }
  .pass-hero-link:focus-visible {
    outline: 2px solid var(--st-product-pass);
    outline-offset: 3px;
    border-radius: 3px;
  }
  .pass-hero-link svg { transition: transform 0.3s ease; }
  .pass-hero-link:hover svg { transform: translateY(2px); }

  .pass-lede {
    max-width: 46ch;
    margin: -2.5rem auto 3rem;
    text-align: center;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  /* ── Section 3: the conveyor ──
     One screen of scroll per step. The container is the scroll range the
     pinned viewport inside it reads from. */
  .pass-flow {
    position: relative;
    height: 300svh;
    margin-bottom: var(--st-space-xl);
    background: var(--st-surface-container-low);
    border-top: 1px solid var(--st-outline-variant);
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .pass-flow-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    overflow: hidden;
  }

  .pass-flow-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    padding: 0 var(--st-space-margin-mobile);
  }
  .pass-flow-title { margin-bottom: 0; }

  /* The dashed run between the badges is the content file's connected flow,
     drawn once behind them rather than as a graphic per gap. */
  .pass-flow-rail {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.25rem;
  }
  .pass-flow-rail::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 1.4rem;
    right: 1.4rem;
    height: 0;
    border-top: 1px dashed var(--st-outline);
  }
  .pass-rail-dot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.05rem;
    height: 2.05rem;
    border-radius: 50%;
    border: 2px solid var(--st-outline-variant);
    background: var(--st-surface-container-low);
    color: var(--st-on-surface-variant);
    transition: border-color 0.45s ease, color 0.45s ease, background 0.45s ease;
  }
  .pass-rail-dot[data-on] {
    border-color: var(--st-product-pass);
    color: var(--st-product-pass);
  }
  .pass-rail-num {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.66rem;
    letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
  }

  .pass-track {
    display: flex;
    width: 100%;
  }
  /* Each slot is exactly the pinned viewport's width, which is what makes a
     whole -100% step land the next card dead centre. */
  .pass-slot {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--st-space-margin-mobile);
  }

  .pass-step {
    display: grid;
    grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
    align-items: center;
    gap: 3rem;
    width: min(880px, 100%);
    opacity: 0.32;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pass-step[data-on] { opacity: 1; }

  .pass-step-visual {
    display: flex;
    justify-content: center;
  }
  .pass-step-copy { max-width: 44ch; }

  .pass-step-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.1rem;
    height: 2.1rem;
    margin-bottom: 0.85rem;
    border-radius: 50%;
    border: 2px solid var(--st-product-pass);
    color: var(--st-product-pass);
  }
  .pass-step-title {
    margin: 0 0 0.6rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--st-on-background);
  }
  .pass-step-desc {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
  }

  .pass-flow-foot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 0 var(--st-space-margin-mobile);
    text-align: center;
  }
  .pass-flow-note {
    margin: 0;
    font-size: 0.88rem;
    color: var(--st-on-surface-variant);
  }
  .pass-flow-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--st-product-pass);
  }
  .pass-flow-link svg { transition: transform 0.3s ease; }
  .pass-flow-link:hover svg { transform: translateX(3px); }

  /* ── Step visuals ── */
  .pv-card,
  .pv-ticket {
    width: min(320px, 100%);
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    box-shadow: 0 26px 50px -30px color-mix(in srgb, var(--st-on-background) 55%, transparent);
  }
  :root[data-theme='dark'] .pv-card,
  :root[data-theme='dark'] .pv-ticket {
    box-shadow: 0 26px 50px -30px var(--st-surface-dim);
  }

  .pv-card {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.4rem 1.3rem;
  }
  .pv-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .pv-head svg { color: var(--st-product-pass); }

  .pv-sheet {
    display: flex;
    flex-direction: column;
    border-radius: var(--st-radius);
    border: 1px solid var(--st-outline-variant);
    overflow: hidden;
  }
  .pv-sheet-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.5rem 0.7rem;
    font-size: 0.82rem;
    color: var(--st-on-surface);
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .pv-sheet-row:last-child { border-bottom: none; }
  /* The guest the ticket in the next card belongs to. */
  .pv-sheet-row[data-me] {
    background: color-mix(in srgb, var(--st-product-pass) 10%, transparent);
    font-weight: 600;
  }
  .pv-sheet-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .pv-tier {
    flex-shrink: 0;
    padding: 0.12rem 0.45rem;
    border-radius: var(--st-radius-full);
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    background: var(--st-surface-container);
    color: var(--st-on-surface-variant);
  }
  .pv-tier[data-tier='vip'] {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }

  .pv-uploads {
    display: flex;
    gap: 0.4rem;
  }
  .pv-upload {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.32rem 0.55rem;
    border-radius: var(--st-radius-sm);
    border: 1px dashed var(--st-outline-variant);
    font-size: 0.68rem;
    color: var(--st-on-surface-variant);
  }
  .pv-upload svg { color: var(--st-product-pass); flex-shrink: 0; }

  /* The ticket */
  .pv-ticket {
    display: flex;
    flex-direction: column;
    overflow: visible;
  }
  .pv-ticket-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.85rem 1.1rem;
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .pv-ticket-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.82rem;
    color: var(--st-on-surface);
  }
  .pv-ticket-brand svg { color: var(--st-product-pass); }
  .pv-ticket-tier {
    padding: 0.16rem 0.5rem;
    border-radius: var(--st-radius-full);
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.62rem;
    letter-spacing: 0.08em;
  }

  .pv-ticket-main {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 1rem 1.1rem 1.1rem;
  }
  .pv-ticket-label {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .pv-ticket-name {
    font-family: var(--st-font-serif);
    font-size: 1.3rem;
    line-height: 1.2;
    color: var(--st-on-surface);
  }
  .pv-ticket-meta {
    font-size: 0.75rem;
    color: var(--st-on-surface-variant);
  }

  .pv-perf {
    position: relative;
    height: 0;
    margin: 0 1.15rem;
    border-top: 1px dashed var(--st-outline-variant);
  }
  .pv-notch {
    position: absolute;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    transform: translateY(-50%);
  }
  .pv-notch-l { left: calc(-1.15rem - 9px); }
  .pv-notch-r { right: calc(-1.15rem - 9px); }

  .pv-ticket-foot {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.1rem 1.1rem 0.9rem;
  }
  .pv-ticket-code {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }
  .pv-code-value {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.88rem;
    letter-spacing: 0.07em;
    color: var(--st-on-surface);
    font-variant-numeric: tabular-nums;
  }
  .pv-code-note {
    font-size: 0.68rem;
    color: var(--st-on-surface-variant);
  }

  /* A code has to be dark on light to look scannable, so it keeps its own
     plate in dark mode instead of inverting with the card. */
  .pt-qr {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-auto-rows: 1fr;
    gap: 1px;
    box-sizing: content-box;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    padding: 5px;
    border-radius: var(--st-radius-sm);
    background: var(--st-surface-container-lowest);
  }
  .pt-qr span { border-radius: 1px; }
  .pt-qr span[data-on] { background: var(--st-on-surface); }
  :root[data-theme='dark'] .pt-qr { background: var(--st-inverse-surface); }
  :root[data-theme='dark'] .pt-qr span[data-on] { background: var(--st-inverse-on-surface); }

  .pv-ticket-sponsors {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.7rem 1.1rem 0.9rem;
    border-top: 1px solid var(--st-outline-variant);
  }
  .pv-sponsor-label {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.55rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .pt-sponsors {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 8px;
    border-radius: var(--st-radius-sm);
    background: var(--st-sponsor-container);
  }
  .pt-sponsor-mark {
    display: block;
    height: 5px;
    border-radius: 2px;
    background: var(--st-on-sponsor-container);
  }
  .pt-sponsor-a { width: 13px; }
  .pt-sponsor-b { width: 7px; height: 7px; border-radius: 50%; }
  .pt-sponsor-c { width: 16px; }
  .pt-sponsor-d { width: 7px; }

  /* Delivery */
  .pv-mail {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem;
    border-radius: var(--st-radius);
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
  }
  .pv-mail-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.66rem;
  }
  :root[data-theme='dark'] .pv-mail-avatar { background: var(--st-surface-container); }
  .pv-mail-copy { display: flex; flex-direction: column; gap: 0.08rem; min-width: 0; }
  .pv-mail-from {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.78rem;
    color: var(--st-on-surface);
  }
  .pv-mail-to {
    font-size: 0.7rem;
    color: var(--st-on-surface-variant);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pv-mail-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.15rem;
  }
  .pv-mail-subject {
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--st-on-surface);
  }
  .pv-mail-preview {
    font-size: 0.78rem;
    line-height: 1.5;
    color: var(--st-on-surface-variant);
  }
  .pv-sent {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.78rem;
    color: var(--st-on-surface-variant);
  }
  .pv-sent svg { color: var(--st-product-pass); flex-shrink: 0; }

  /* ── Section 4 ── */
  .pass-bento-section {
    background: transparent;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
  .pass-feature-icon {
    margin-bottom: 1.25rem;
    color: color-mix(in srgb, var(--st-on-primary) 78%, var(--st-primary));
  }
  .pass-card-icon {
    margin-bottom: 0.85rem;
    color: var(--st-product-pass);
  }
  .pass-tile {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  }
  .pass-tile:hover { transform: translateY(-4px); }
  .service-bento-card.pass-tile:hover {
    border-color: color-mix(in srgb, var(--st-product-pass) 45%, transparent);
  }

  /* ── Narrow screens ──
     A conveyor needs a wide viewport to read as one. Below this the track
     becomes an ordinary stack, which is also what the reduced-motion path
     falls back to. */
  @media (max-width: 900px) {
    .pass-flow {
      height: auto;
      padding: var(--st-space-lg) 0;
    }
    .pass-flow-pin {
      position: static;
      height: auto;
      overflow: visible;
      gap: 2.5rem;
    }
    .pass-track {
      flex-direction: column;
      gap: 3rem;
      transform: none !important;
    }
    .pass-slot { flex: 0 0 auto; }
    .pass-step {
      grid-template-columns: 1fr;
      gap: 1.75rem;
      opacity: 1;
    }
    .pass-step-visual { justify-content: flex-start; }
    .pass-flow-rail { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pass-flow {
      height: auto;
      padding: var(--st-space-lg) 0;
    }
    .pass-flow-pin {
      position: static;
      height: auto;
      overflow: visible;
      gap: 2.5rem;
    }
    .pass-track {
      flex-direction: column;
      gap: 3rem;
      transform: none !important;
    }
    .pass-slot { flex: 0 0 auto; }
    .pass-step {
      opacity: 1;
      transition: none;
    }
    .pass-rail-dot,
    .pass-tile,
    .pass-flow-link svg {
      transition: none;
    }
    .pass-tile:hover { transform: none; }
  }
`;
