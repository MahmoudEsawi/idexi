import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

/* The plain-language trust page from the spec's Learn menu and footer Support
   column. This is NOT the legal privacy policy, and the spec is explicit that
   the two must never be merged: this one exists to answer an organizer's or a
   guest's actual worry in words they will read. The formal document lives at
   /privacy-policy.

   Content is the Privacy & Security file, humanized for punctuation only.
   Every timeframe, figure and promise on this page is reproduced exactly as
   written, because on this page the wording is the product.

   The content file carries a standing legal instruction that is repeated here
   so it survives the next edit: this page makes NO regulatory compliance
   claims of any kind, and none may be added without review by a qualified
   data protection lawyer first. Jordan's Personal Data Protection Law
   classifies biometric data as sensitive personal data with its own consent
   and handling requirements, and idexi's consent flow, storage location and
   cross-border transfer practices have not been through that review. Do not
   add GDPR, PDPL, SOC 2, ISO or any similar claim to this file.

   No padlocks, shields or seals anywhere: a trust page that decorates itself
   with security clip art undercuts the thing it is claiming. The hierarchy is
   carried by type and rules alone. */

export const metadata: Metadata = {
  title: "Privacy & Security",
  description:
    "How idexi protects guest data: private OTP-gated photo galleries, zero sponsor sharing, and automatic deletion 30 days after your event ends.",
};

const PROTECTION = [
  {
    label: "What we collect",
    items: ["Just your name, email, and a photo of your face. Nothing more."],
  },
  {
    label: "How we protect it",
    items: [
      "A private link to your gallery, sent only to your email.",
      "A one-time code, also sent only to your email. Both are required to open it.",
      "Your event's data lives on its own dedicated, secured server.",
    ],
  },
  {
    label: "What we never do",
    items: [
      "Never used for anything beyond matching you in event photos.",
      "Never shared with sponsors, partners, or anyone outside the event.",
      "Never kept: automatically deleted 30 days after the event ends.",
    ],
  },
];

/* The four privacy-relevant questions from the site-wide set. Answers 1, 3
   and 4 are the /faqs wording verbatim so the two surfaces cannot drift.
   Answer 2 follows this page's own content file instead, because it names
   both factors the gallery actually requires, which the shorter FAQ answer
   leaves out. */
const QUESTIONS = [
  {
    q: "What if the AI matches the wrong photo to someone?",
    a: "We built our own facial recognition model, trained specifically for crowded event photos, and it is accurate 99% of the time. If anything still looks off, guests can flag it and our team corrects it manually.",
  },
  {
    q: "Will my photos be public for anyone to see?",
    a: "No. Every gallery is locked behind a private link and a one-time code, both sent only to your registered email.",
  },
  {
    q: "Is there support if something goes wrong during the event itself?",
    a: "Yes. Our team is reachable throughout your event, not just before it.",
  },
  {
    q: "What happens to our data after the event ends?",
    a: "We don't keep it. Every event's photos are stored on a dedicated, secured server and automatically deleted 30 days after the event ends.",
  },
];

const SECTIONS = [
  { id: "protect", label: "How we protect your data" },
  { id: "sponsors", label: "Sponsors and your data" },
  { id: "questions", label: "Common privacy questions" },
  { id: "help", label: "Still have a question?" },
];

export default function PrivacySecurityPage() {
  return (
    <PageShell
      eyebrow="Privacy & Security"
      title="Your Guests' Data Isn't a Side Note. It's the Foundation."
      intro="Whether you're organizing the event or attending it, here's exactly what happens to your data, and why."
      wide
    >
      <style>{pageCSS}</style>

      <div className="ps-layout">
        {/* A section index rather than running prose straight down the page.
            Someone who landed here from a gallery email wants one answer, and
            this lets them take it without reading the rest. */}
        <nav className="ps-index" aria-label="On this page">
          <p className="ps-index-head">On this page</p>
          <ul className="ps-index-list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={"#" + s.id}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ps-body">
          <section className="ps-section" id="protect">
            <h2 className="ps-h2">How we protect your data</h2>

            <div className="ps-groups">
              {PROTECTION.map((group) => (
                <div className="ps-group" key={group.label}>
                  <p className="ps-group-label">{group.label}</p>
                  <ul className="ps-group-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section" id="sponsors">
            <h2 className="ps-h2">Sponsors see the branding, not the data</h2>
            <p className="ps-lead">
              Sponsor logos appear on tickets, emails, and photo galleries, but that&apos;s
              the extent of it. Sponsors never see your name, your email, or your photos
              themselves. Branding and data are handled completely separately.
            </p>
          </section>

          <section className="ps-section" id="questions">
            <h2 className="ps-h2">Common privacy questions</h2>
            <div className="ps-qa">
              {QUESTIONS.map((item) => (
                <div className="ps-card" key={item.q}>
                  <h3 className="ps-q">{item.q}</h3>
                  <p className="ps-a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section ps-section-last" id="help">
            <h2 className="ps-h2">Still have a question about your data?</h2>
            <p className="ps-lead">
              Whether you&apos;re organizing an event or looking for your own photos,
              we&apos;re here to help.
            </p>
            {/* Two actions, not one: this page is read by organizers and by
                attendees in roughly equal measure, and sending an attendee to
                a sales form would be the wrong door. */}
            <div className="ps-actions">
              <Link href="/#contact" className="st-btn st-btn-primary">
                Book a Demo
              </Link>
              <Link href="/services/face" className="ps-secondary">
                Where&apos;s My Photo?
              </Link>
            </div>
          </section>

          <p className="shell-note">
            This page explains our practices in everyday terms. The formal legal document
            is at <Link href="/privacy-policy">Privacy Policy</Link>. Questions about your
            event&apos;s data can go to{" "}
            <a href="mailto:info@idexi.tech">info@idexi.tech</a>.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

/* No backticks below: the whole block is a template literal. */
const pageCSS = `
  .ps-layout {
    display: grid;
    grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: start;
  }

  /* The index sticks; the reading column scrolls past it. */
  .ps-index {
    position: sticky;
    top: 7rem;
  }
  .ps-index-head {
    margin: 0 0 0.9rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--st-outline-variant);
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }
  .ps-index-list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ps-index-list a {
    font-size: 0.92rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
    transition: color 0.2s ease;
  }
  .ps-index-list a:hover { color: var(--st-on-background); }
  .ps-index-list a:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .ps-body { min-width: 0; }

  /* globals.css styles the bare <section> element with padding: 7rem 1.5rem.
     Setting only padding-bottom here left 7rem of dead space above the first
     heading and 1.5rem of inset on both sides, so all four sides are stated. */
  .ps-section {
    padding: 0 0 clamp(2.5rem, 6vh, 4rem);
    margin-bottom: clamp(2.5rem, 6vh, 4rem);
    border-bottom: 1px solid var(--st-outline-variant);
    scroll-margin-top: 7rem;
  }
  .ps-section-last {
    border-bottom: none;
    padding: 0;
  }

  .ps-h2 {
    margin: 0 0 1.25rem;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(1.5rem, 1.9vw + 0.8rem, 2.1rem);
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    text-wrap: balance;
  }

  .ps-lead {
    margin: 0;
    max-width: 62ch;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
  }

  /* Three groups read side by side on a wide screen, because collect,
     protect and never are one statement in three parts rather than three
     separate topics. */
  .ps-groups {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }
  .ps-group-label {
    margin: 0 0 0.9rem;
    padding-top: 0.85rem;
    border-top: 2px solid var(--st-on-background);
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--st-on-background);
  }
  .ps-group-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ps-group-list li {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  .ps-qa {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ps-card {
    padding: 1.4rem 1.5rem;
    border-radius: var(--st-radius-lg);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-lowest);
  }
  .ps-q {
    margin: 0 0 0.5rem;
    font-family: var(--st-font-display);
    font-weight: 700;
    font-size: 1.02rem;
    line-height: 1.4;
    color: var(--st-on-background);
  }
  .ps-a {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.65;
    color: var(--st-on-surface-variant);
  }

  .ps-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-top: 1.75rem;
  }
  /* Outline weight, matching the header's second action: an attendee looking
     for their photos should not be competing with the demo button. */
  .ps-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: var(--st-space-sm) var(--st-space-lg);
    border-radius: var(--st-radius-full);
    border: 1px solid var(--st-outline);
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--st-on-background);
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .ps-secondary:hover {
    border-color: var(--st-on-background);
    background: var(--st-surface-container-low);
  }
  .ps-secondary:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
  }

  .ps-body .shell-note {
    margin-top: clamp(2.5rem, 6vh, 4rem);
  }

  @media (max-width: 900px) {
    .ps-layout { grid-template-columns: 1fr; gap: 2.5rem; }
    /* A sticky index above the content it indexes would sit on top of the
       reading column, so on one column it becomes an ordinary header list. */
    .ps-index { position: static; }
    .ps-index-list {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
    }
    .ps-groups { grid-template-columns: 1fr; gap: 2rem; }
  }
`;
