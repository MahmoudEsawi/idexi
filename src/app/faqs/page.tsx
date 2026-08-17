import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs | idexi",
  description:
    "Answers about idexi's AI-powered event check-in, access control, and photo delivery: how it works, what happens at the gate, and how attendee data is handled.",
};

interface FaqItem {
  question: string;
  answer: string[];
}

interface FaqCategory {
  title: string;
  questions: FaqItem[];
}

const PRIVACY_NOTE =
  "Our full privacy documentation, covering data retention and handling in detail, is being finalised and will be published here. For privacy questions in the meantime, contact hello@idexi.ai.";

const categories: FaqCategory[] = [
  {
    title: "Photo Delivery",
    questions: [
      {
        question: "How do I receive my event photos?",
        answer: [
          "At registration you opt in via a QR code and provide one reference selfie. Event photographers then capture photos throughout the venue as normal. idexi's matching engine scans the uploaded event photos, and any photo containing you is automatically compiled and sent straight to your email. No searching through a shared album.",
        ],
      },
      {
        question: "How does the face matching actually work, in practical terms?",
        answer: [
          "It compares the one reference selfie you provided at opt-in against faces detected across the event photography. Matching runs on idexi's infrastructure for that event and typically resolves in milliseconds per image, which is what makes near-instant delivery possible once photographers upload their shots.",
        ],
      },
      {
        question: "What happens if I'm not matched in any photo?",
        answer: [
          "If the system doesn't find a confident match for your reference selfie in any of the event's photos, no gallery is generated for you. You simply won't receive a delivery email. This can happen if you weren't photographed, or if the reference selfie was low quality.",
          "If you believe you should have photos waiting and haven't received them, contact the event organiser or idexi support so it can be looked into manually.",
        ],
      },
      {
        question: "Can I ask to be removed from an event's photo gallery?",
        answer: [
          "Yes, you can contact the event organiser or idexi to request that your photos be taken down from an event gallery.",
          PRIVACY_NOTE,
        ],
      },
    ],
  },
  {
    title: "Check-In & Reliability",
    questions: [
      {
        question: "How does gate check-in work?",
        answer: [
          "Attendees register online or through the event's app and receive an encrypted smart-pass, which can be added to Apple Wallet or Google Wallet. At the gate, that pass is scanned and verified in milliseconds; some events layer on optional facial verification for an extra express lane. Once verified, connected badge printers can issue a physical credential on the spot.",
        ],
      },
      {
        question: "What happens if the venue's network connection drops?",
        answer: [
          "idexi's check-in hardware is built to keep operating locally at the venue rather than depending on a live connection: check-in lanes are designed to keep scanning and verifying passes during a network blackout. idexi Flow's staff scanning app works the same way: scans at the gate, a workshop door, or a logistics point queue locally on the phone and sync to the shared dashboard once connectivity returns.",
        ],
      },
      {
        question: "What do organisers need to provide to get started?",
        answer: [
          "The core things are your event and venue details and whatever ticketing or registration system you're already using, so idexi's team can build an integration around it rather than asking you to replace it. From there we put together a tailored walkthrough and integration plan. Reach out through the \"Book Consultation\" link and the team will scope exactly what's needed for your event.",
        ],
      },
    ],
  },
  {
    title: "Privacy",
    questions: [
      {
        question: "What information do I provide when I register or opt in?",
        answer: [
          "You enter your own details directly: for check-in, that's typically your registration information; for photo delivery, that's a single reference selfie provided when you opt in via QR code. Event organisers control the data collected for their own event.",
          PRIVACY_NOTE,
        ],
      },
      {
        question: "How is the reference selfie and matching data handled?",
        answer: [
          "The reference selfie you provide is used to run matching against event photography, and that processing happens on idexi's infrastructure for the event you opted into. Organisers control their own event's data.",
          PRIVACY_NOTE,
        ],
      },
      {
        question: "Is idexi's data handling compliant with privacy regulations like GDPR or BIPA?",
        answer: [
          "Biometric data handling is something we take seriously, and we're finalising formal privacy documentation to address it properly rather than make informal claims here.",
          PRIVACY_NOTE,
        ],
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <div className="faq-page">
      <style>{faqCSS}</style>
      <div className="container faq-container">
        <Link href="/" className="faq-back-link">
          ← Back to idexi
        </Link>

        <h1 className="faq-heading">Frequently Asked Questions</h1>
        <p className="faq-intro">
          Answers about how idexi&apos;s check-in, access control, and photo delivery products actually work.
        </p>

        {categories.map((category) => (
          <section key={category.title} className="faq-category">
            <h2>{category.title}</h2>
            <div className="faq-list">
              {category.questions.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary className="faq-question">
                    <h3>{item.question}</h3>
                    <span className="faq-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="faq-answer">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* Migrated off the legacy dark --accent-cyan/--glass-* system onto --st-*,
   matching every other already-migrated page/section. Headings (h1, the
   per-category h2) use var(--st-font-serif) at weight 500 — the same
   declaration every other main section heading on the site now shares.
   Individual question text (h3, inside the clickable <summary>) stays on
   var(--st-font-display), matching how interactive list-item titles are
   styled elsewhere (e.g. EventLifecycleSection's step titles), reserving
   serif specifically for true section-level headings. */
const faqCSS = `
  .faq-page {
    padding: 7rem 1.5rem;
    background: var(--st-background);
    transition: background 0.4s ease;
  }
  .faq-container {
    max-width: 70ch;
  }
  .faq-back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--st-on-surface-variant);
    font-size: 0.95rem;
    transition: color 0.25s ease;
  }
  .faq-back-link:hover {
    color: var(--st-secondary);
  }
  .faq-back-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 4px;
  }
  .faq-heading {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    margin-bottom: 1rem;
  }
  .faq-intro {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--st-on-surface-variant);
    margin-bottom: 3.5rem;
  }
  .faq-category {
    margin-bottom: 3rem;
  }
  .faq-category h2 {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: 1.6rem;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    margin-bottom: 1.5rem;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .faq-item {
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    padding: 1.25rem 1.5rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .faq-item[open] {
    border-color: var(--st-secondary);
    box-shadow: 0 8px 24px rgba(11, 28, 48, 0.08);
  }
  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    list-style: none;
    min-height: 44px;
  }
  .faq-question::-webkit-details-marker {
    display: none;
  }
  .faq-question:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 4px;
  }
  .faq-question h3 {
    font-family: var(--st-font-display);
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--st-on-background);
    line-height: 1.4;
  }
  .faq-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 1.2rem;
    color: var(--st-secondary);
    transition: transform 0.2s ease;
  }
  .faq-item[open] .faq-icon {
    transform: rotate(45deg);
  }
  .faq-answer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--st-outline-variant);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .faq-answer p {
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--st-on-surface-variant);
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-icon {
      transition: none !important;
    }
  }

  @media (max-width: 768px) {
    .faq-page {
      padding: 5rem 1.25rem;
    }
    .faq-item {
      padding: 1rem 1.1rem;
    }
  }
`;
