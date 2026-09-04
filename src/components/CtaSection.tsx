"use client";

import Link from "next/link";
import { useActionState, useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";
import { EVENT_TYPES, SOLUTIONS } from "@/app/actions/lead-options";

const INITIAL_FORM_STATE: LeadFormState = { status: "idle" };

const HOME_BULLETS = [
  "Zero-Risk Guarantee: Full refund if check-in fails at your door",
  "All your tickets delivered in under 5 minutes",
  "No scanning hardware to buy or maintain",
  "Every guest gets their photos, automatically",
  "Sponsor branding on every ticket, email, and photo",
  "Plans starting at $199 per event",
];

type CtaSectionProps = {
  heading?: string;
  subtext?: string;
  /** null renders no recap list. Omit for the home page's five lines. */
  bullets?: string[] | null;
  /** Pre-selects "What interests you most?" on a product page. */
  defaultSolution?: (typeof SOLUTIONS)[number];
};

export default function CtaSection({
  heading = "Your next event doesn't have to be chaos",
  subtext = "Tell us about your event. We'll show you exactly how idexi fits, with no commitment and no pressure.",
  bullets = HOME_BULLETS,
  defaultSolution,
}: CtaSectionProps) {
  const [state, formAction, isPending] = useActionState(submitLead, INITIAL_FORM_STATE);
  const [renderedAt, setRenderedAt] = useState<number | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const submitted = state.status === "success";
  const fieldErrors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  return (
    <section id="contact" className="cta-section">
      <style>{ctaCSS}</style>
      <div className="cta-row">
        {/* Left Side: Text Content */}
        <div className="cta-text">
          <h2 className="cta-heading">{heading}</h2>
          <p className="cta-subtext">{subtext}</p>
          {bullets && bullets.length > 0 && (
            <ul className="cta-bullets">
              {bullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}

          <p className="cta-nudge">
            <Link href="/faqs" className="cta-nudge-link">
              Still have a question? Ask here <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="cta-form-panel">
          {submitted ? (
            <div className="cta-success" role="status">
              <h3>Thanks, we&apos;ll be in touch.</h3>
              <p>A member of our team will reach out shortly to schedule your walkthrough.</p>
            </div>
          ) : (
            <form className="cta-form" action={formAction}>
              {/* Anti-Bot Traps: dual honeypot & time-gate */}
              <div className="cta-hp" aria-hidden="true">
                <label htmlFor="cta-website">Website</label>
                <input id="cta-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                <label htmlFor="cta-company-hp">Company</label>
                <input id="cta-company-hp" name="company_hp" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <input type="hidden" name="_rendered_at" value={renderedAt ?? ""} />

              {state.status === "error" && state.message && (
                <p className="cta-form-error cta-field-full" role="alert">
                  {state.message}
                </p>
              )}

              <div className="cta-field">
                <label htmlFor="cta-name">
                  Your Name <span className="cta-required">*</span>
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  defaultValue={values.name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "cta-name-error" : undefined}
                />
                {fieldErrors.name && (
                  <span id="cta-name-error" className="cta-field-error">{fieldErrors.name}</span>
                )}
              </div>

              <div className="cta-field">
                <label htmlFor="cta-email">
                  Your Email <span className="cta-required">*</span>
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  placeholder="Enter your work email"
                  required
                  defaultValue={values.email}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "cta-email-error" : undefined}
                />
                {fieldErrors.email && (
                  <span id="cta-email-error" className="cta-field-error">{fieldErrors.email}</span>
                )}
              </div>

              <div className="cta-field">
                <label htmlFor="cta-phone">
                  Your Phone <span className="cta-required">*</span>
                </label>
                <input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  defaultValue={values.phone}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? "cta-phone-error" : undefined}
                />
                {fieldErrors.phone && (
                  <span id="cta-phone-error" className="cta-field-error">{fieldErrors.phone}</span>
                )}
              </div>

              <div className="cta-field">
                <label htmlFor="cta-event-type">
                  Event type <span className="cta-required">*</span>
                </label>
                {/* Keyed for the same reason as the solution select below. */}
                <select
                  key={values.eventType ?? "empty"}
                  id="cta-event-type"
                  name="eventType"
                  defaultValue={values.eventType ?? ""}
                  required
                  aria-invalid={Boolean(fieldErrors.eventType)}
                  aria-describedby={fieldErrors.eventType ? "cta-event-type-error" : undefined}
                >
                  <option value="" disabled>
                    Select an event type
                  </option>
                  {EVENT_TYPES.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
                {fieldErrors.eventType && (
                  <span id="cta-event-type-error" className="cta-field-error">{fieldErrors.eventType}</span>
                )}
              </div>

              <div className="cta-field cta-field-full">
                <label htmlFor="cta-solution">
                  What interests you most? <span className="cta-required">*</span>
                </label>
                {/* Keyed on the echoed value so an error re-render remounts
                    the select with the previous choice applied. Text inputs
                    keep their own DOM values across re-renders, but React
                    re-applies a select's defaultValue and would otherwise
                    reset it to the empty placeholder. */}
                <select
                  key={values.solution ?? defaultSolution ?? "empty"}
                  id="cta-solution"
                  name="solution"
                  defaultValue={values.solution ?? defaultSolution ?? ""}
                  required
                  aria-invalid={Boolean(fieldErrors.solution)}
                  aria-describedby={fieldErrors.solution ? "cta-solution-error" : undefined}
                >
                  <option value="" disabled>
                    Select a solution
                  </option>
                  {SOLUTIONS.map((solution) => (
                    <option key={solution} value={solution}>
                      {solution}
                    </option>
                  ))}
                </select>
                {fieldErrors.solution && (
                  <span id="cta-solution-error" className="cta-field-error">{fieldErrors.solution}</span>
                )}
              </div>

              <button type="submit" className="cta-submit cta-field-full" disabled={isPending}>
                {isPending ? "Sending..." : "Book a Demo"}
              </button>

              <div className="cta-guarantee cta-field-full">
                <ShieldCheck size={16} aria-hidden="true" className="cta-guarantee-icon" />
                <span><strong>Zero-Risk Guarantee:</strong> 100% full refund if check-in fails at your door.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const ctaCSS = `
  .cta-section {
    background: var(--st-background);
    transition: background 0.4s ease;
    scroll-margin-top: 96px;
    width: 100%;
    overflow: hidden;
  }
  .cta-row {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .cta-text {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .cta-heading {
    margin: 0 0 1.25rem;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
    word-break: break-word;
  }
  .cta-subtext {
    margin: 0 0 1.25rem;
    max-width: 36rem;
    font-size: clamp(0.98rem, 2vw, 1.0625rem);
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .cta-bullets {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    max-width: 36rem;
    width: 100%;
    box-sizing: border-box;
  }
  .cta-bullets li {
    position: relative;
    padding-left: 1.4rem;
    font-size: clamp(0.95rem, 2vw, 1.0625rem);
    line-height: 1.55;
    color: var(--st-on-surface-variant);
    word-break: break-word;
  }
  .cta-bullets li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--st-secondary);
  }
  .cta-nudge {
    margin: 1.35rem 0 0;
    font-size: clamp(0.95rem, 2vw, 1.0625rem);
    line-height: 1.55;
  }
  .cta-nudge-link {
    color: var(--st-secondary);
    text-decoration: none;
    border-bottom: 1px solid color-mix(in srgb, var(--st-secondary) 35%, transparent);
    padding-bottom: 1px;
    transition: border-color 0.25s ease, color 0.25s ease;
  }
  .cta-nudge-link:hover {
    color: var(--st-on-background);
    border-bottom-color: var(--st-on-background);
  }
  .cta-nudge-link:focus-visible {
    outline: 2px solid var(--st-secondary);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .cta-bullets strong {
    font-weight: 600;
    color: var(--st-on-background);
  }

  .cta-form-panel {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 1.5rem 1.25rem;
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    box-shadow: 0 16px 40px -20px rgba(11, 28, 48, 0.12);
    container-type: inline-size;
    container-name: ctaform;
  }

  @media (min-width: 600px) {
    .cta-form-panel {
      padding: 2.25rem 2rem;
    }
  }

  .cta-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  /* Two-column layout when the card container has at least 460px */
  @container ctaform (min-width: 460px) {
    .cta-form {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem 1.25rem;
    }
    .cta-field-full {
      grid-column: 1 / -1;
    }
  }

  /* Fallback for browsers without container query support */
  @supports not (container-type: inline-size) {
    @media (min-width: 640px) {
      .cta-form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.1rem 1.25rem;
      }
      .cta-field-full {
        grid-column: 1 / -1;
      }
    }
  }

  .cta-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .cta-field-full {
    grid-column: 1 / -1;
  }
  .cta-field label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--st-on-background);
  }
  .cta-required {
    color: var(--st-error);
  }
  .cta-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    pointer-events: none;
  }
  .cta-form-error {
    margin: 0;
    padding: 0.75rem 1rem;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--st-error) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--st-error) 35%, transparent);
    color: var(--st-error);
    font-size: 0.9rem;
    line-height: 1.5;
    word-break: break-word;
  }
  .cta-field-error {
    font-size: 0.82rem;
    line-height: 1.4;
    color: var(--st-error);
  }
  .cta-field input[aria-invalid="true"],
  .cta-field select[aria-invalid="true"] {
    border-color: var(--st-error);
  }
  .cta-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  .cta-submit:disabled:hover {
    filter: none;
    transform: none;
    box-shadow: none;
  }

  .cta-field input,
  .cta-field select,
  .cta-field textarea {
    font: inherit;
    font-size: 1rem; /* 16px to prevent iOS Safari auto-zoom on focus */
    color: var(--st-on-background);
    background: var(--st-surface-container-lowest);
    border: 1.5px solid var(--st-outline-variant);
    border-radius: var(--st-radius-md);
    padding: 0.75rem 0.9rem;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-field textarea {
    resize: vertical;
    min-height: 5.5rem;
  }
  .cta-field input::placeholder,
  .cta-field textarea::placeholder {
    color: var(--st-outline);
    opacity: 0.85;
    font-size: 0.92rem;
  }
  .cta-field input:focus,
  .cta-field select:focus,
  .cta-field textarea:focus {
    outline: none;
    border-color: var(--st-secondary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--st-secondary) 20%, transparent);
  }
  .cta-field select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2345464e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.85rem center;
    padding-right: 2.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  .cta-field select:invalid,
  .cta-field select option[value=""] {
    color: var(--st-outline);
  }

  .cta-submit {
    margin-top: 0.25rem;
    width: 100%;
    min-height: 48px;
    padding: 0.9rem 1.5rem;
    font: inherit;
    font-weight: 600;
    font-size: 1rem;
    color: var(--st-on-primary);
    background: var(--st-primary);
    border: none;
    border-radius: var(--st-radius-full);
    cursor: pointer;
    box-sizing: border-box;
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-submit:hover {
    filter: brightness(1.15);
    transform: scale(1.02);
    box-shadow: 0 10px 28px rgba(11, 28, 48, 0.2);
  }
  .cta-submit:active {
    transform: scale(0.99);
  }

  .cta-guarantee {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 0.75rem;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  .cta-guarantee-icon {
    color: var(--st-product-pass);
    flex-shrink: 0;
  }
  .cta-guarantee strong {
    color: var(--st-product-pass);
    font-weight: 600;
  }

  @media (max-width: 440px) {
    .cta-guarantee {
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.78rem;
    }
  }

  .cta-success {
    padding: 2rem 0.5rem;
    text-align: center;
  }
  .cta-success h3 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    color: var(--st-on-background);
  }
  .cta-success p {
    margin: 0;
    font-size: 1rem;
    color: var(--st-on-surface-variant);
  }

  @media (prefers-reduced-motion: reduce) {
    .cta-submit:hover {
      transform: none;
    }
  }

  /* Split side-by-side layout only on desktop screens with ample breathing room */
  @media (min-width: 1024px) {
    .cta-row {
      grid-template-columns: 1fr 1.08fr;
      gap: 4rem;
      align-items: center;
    }
    .cta-text {
      max-width: none;
      margin: 0;
    }
    .cta-form-panel {
      max-width: none;
      margin: 0;
    }
  }

  @media (min-width: 1280px) {
    .cta-row {
      gap: 5rem;
    }
  }
`;
