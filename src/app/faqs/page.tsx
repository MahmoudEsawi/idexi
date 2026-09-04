import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers on idexi event check-in software, offline gate scanning, stopping duplicate ticket fraud, AI photo delivery, and our 100% full refund guarantee.",
};

interface FaqItem {
  question: string;
  answer: string[];
}

interface FaqCategory {
  title: string;
  questions: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    title: "Ticketing & Gate Security",
    questions: [
      {
        question: "How do you stop duplicate ticket scanning and screenshot fraud?",
        answer: [
          "idexi Pass issues dynamic cryptographic QR codes tied to an individual guest record. The moment a ticket is scanned at any door by idexi Flow, that ticket token is permanently invalidated in real-time.",
          "Even if venue internet cuts out completely, Flow's local offline sync engine detects and flags already-scanned codes across all connected staff devices, stopping screenshotted or forwarded passes immediately at the entrance.",
        ],
      },
      {
        question: "What makes idexi different from traditional event check-in software?",
        answer: [
          "Traditional event check-in software forces organizers to rent expensive laser scanners, deal with spotty WiFi gateways, and buy separate photo hosting tools. idexi turns any staff smartphone into an instant 0.3-second QR scanner that operates 100% offline, syncs automatically, and connects directly to AI facial recognition photo delivery from $199 per event.",
        ],
      },
      {
        question: "What is your refund policy or check-in guarantee?",
        answer: [
          "We offer a 100% Zero-Risk Money-Back Guarantee: full refund if check-in fails. If idexi experiences platform downtime or our check-in software fails to process your attendees at the gate, your event fee is refunded in full. We take the technical risk so you don't have to.",
        ],
      },
    ],
  },
  {
    title: "Photos & privacy",
    questions: [
      {
        question: "Where can I find my event photos?",
        answer: [
          "Use the \"Where's My Photo?\" link at the top of any page, or head straight to idexi Face. Your gallery arrives by email once your event's photos have been matched, and it opens with a one-time code sent only to you. If you can't find it, email info@idexi.tech and we'll resend your secure link.",
        ],
      },
      {
        question: "What if the AI matches the wrong photo to someone?",
        answer: [
          "We built our own facial recognition model, trained specifically for crowded event photos, and it is accurate 99% of the time. If anything still looks off, guests can flag it and our team corrects it manually.",
        ],
      },
      {
        question: "Will my guests' photos be public for anyone to see?",
        answer: [
          "No. Every gallery is locked behind a private OTP code sent only to that guest. There are no public links, so only they can open their own photos.",
        ],
      },
      {
        question: "What happens to our data after the event ends?",
        answer: [
          "We don't keep it. Every event's photos are stored on a dedicated, secured server and automatically deleted 30 days after the event ends.",
        ],
      },
    ],
  },
  {
    title: "Running your event",
    questions: [
      {
        question: "Our venue has terrible WiFi.",
        answer: [
          "idexi Flow works offline and syncs the moment you're back online.",
        ],
      },
      {
        question: "Can it handle a sudden rush at the door?",
        answer: [
          "Any number of staff phones can scan in parallel, so there is no single bottleneck.",
        ],
      },
      {
        question: "Will it work for a multi-day event?",
        answer: [
          "Yes. Guest data and photo galleries persist across all days of the event.",
        ],
      },
      {
        question: "What if a guest doesn't have a smartphone?",
        answer: [
          "Staff can look up and verify guests manually from the dashboard as a backup.",
        ],
      },
      {
        question: "Is there support if something goes wrong during the event itself?",
        answer: [
          "Yes. Our team is reachable throughout your event, not just before it.",
        ],
      },
    ],
  },
  {
    title: "Getting started",
    questions: [
      {
        question: "My guests won't download an app.",
        answer: [
          "Everything works through email and a QR code, so there is nothing to install.",
        ],
      },
      {
        question: "We already use a ticketing tool.",
        answer: [
          "Use idexi Face or Flow on their own, alongside what you already have.",
        ],
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((cat) =>
    cat.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join(" "),
      },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <div className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <style>{faqCSS}</style>
      <div className="container faq-container">
        <Link href="/" className="faq-back-link">
          ← Back to idexi
        </Link>

        <h1 className="faq-heading">Frequently asked questions</h1>
        <p className="faq-intro">
          Answers about how idexi&apos;s check-in, access control, fraud prevention, and photo delivery products work.
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
