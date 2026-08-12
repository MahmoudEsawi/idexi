import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQs — idexi",
  description:
    "Answers about idexi's AI-powered event check-in, crowd intelligence, and photo delivery — how it works, what happens at the gate, and how attendee data is handled.",
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
  "Our full privacy documentation — covering data retention and handling in detail — is being finalised and will be published here. For privacy questions in the meantime, contact hello@idexi.ai.";

const categories: FaqCategory[] = [
  {
    title: "Photo Delivery",
    questions: [
      {
        question: "How do attendees receive event photos?",
        answer: [
          "Attendees opt in via QR code at registration and provide one reference selfie. idexi's matching engine scans uploaded event photos, and any photo containing the attendee is automatically compiled and sent straight to their email.",
        ],
      },
      {
        question: "How does face matching operate?",
        answer: [
          "It compares the reference selfie against faces detected across event photography. Matching runs on idexi's infrastructure for that event and resolves in milliseconds per image.",
        ],
      },
      {
        question: "What happens if no photo match is found?",
        answer: [
          "If the system does not find a confident match, no gallery is generated for that user. Organisers can review unmatched queries manually if required.",
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
          "Attendees receive an encrypted smart-pass in Apple Wallet or Google Wallet. At the gate, that pass is scanned in milliseconds with optional biometric express lane verification.",
        ],
      },
      {
        question: "What happens if venue connectivity drops?",
        answer: [
          "idexi hardware operates locally at the venue. Check-in gates and crowd sensors continue scanning during network blackouts and sync when connectivity returns.",
        ],
      },
    ],
  },
  {
    title: "Privacy & Data",
    questions: [
      {
        question: "How is biometric reference data stored?",
        answer: [
          "Reference selfies and matching vectors are encrypted on idexi event infrastructure. Event organisers control their own event's data lifecycle.",
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
          <ArrowLeft size={16} /> BACK TO IDEXI
        </Link>

        <span className="section-label text-lime">KNOWLEDGE BASE</span>
        <h1 className="faq-title">
          FREQUENTLY ASKED <span className="text-lime">QUESTIONS</span>
        </h1>
        <p className="faq-intro">
          Technical specs and operational answers for Idexi Face, Flow, and Pass systems.
        </p>

        {categories.map((category) => (
          <section key={category.title} className="faq-category">
            <h2 className="faq-cat-title">{category.title}</h2>
            <div className="faq-list">
              {category.questions.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary className="faq-question">
                    <h3>{item.question}</h3>
                    <span className="faq-icon text-lime" aria-hidden="true">
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

const faqCSS = `
  .faq-page {
    padding: 7rem 1.5rem;
    background: #07080b;
    min-height: 100vh;
  }
  .faq-container {
    max-width: 800px;
  }
  .faq-back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    color: var(--text-secondary);
    font-family: var(--font-headings);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    transition: color 0.2s ease;
  }
  .faq-back-link:hover {
    color: var(--accent-lime);
  }
  .faq-title {
    font-family: var(--font-headings);
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #ffffff;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
  }
  .faq-intro {
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 4rem;
  }
  .faq-category {
    margin-bottom: 3.5rem;
  }
  .faq-cat-title {
    font-family: var(--font-headings);
    font-size: 1.4rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .faq-item {
    background: #0d0f14;
    border: 1px solid var(--grid-line);
    border-radius: 8px;
    padding: 1.4rem 1.8rem;
    transition: border-color 0.2s ease;
  }
  .faq-item[open] {
    border-color: var(--accent-lime);
  }
  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    list-style: none;
  }
  .faq-question::-webkit-details-marker {
    display: none;
  }
  .faq-question h3 {
    font-family: var(--font-headings);
    font-size: 1.05rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.4;
    text-transform: uppercase;
  }
  .faq-icon {
    font-family: var(--font-headings);
    font-size: 1.4rem;
    font-weight: 900;
  }
  .faq-item[open] .faq-icon {
    transform: rotate(45deg);
  }
  .faq-answer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grid-line);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .faq-answer p {
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--text-secondary);
  }
`;
