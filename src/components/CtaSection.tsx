"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";
import { EVENT_TYPES, SOLUTIONS } from "@/app/actions/lead-options";

// This project has no Tailwind CSS anywhere (confirmed in CLAUDE.md and
// every other component) — the reference brief asked for it, but built
// here with the same CSS-in-JS <style> pattern every sibling section
// uses instead, so it stays consistent with the rest of the codebase.
// Copy (heading, bullets) is pulled from page.md's "Optimize Your Next
// Event" section, the site's only existing CTA content — not invented.

const INITIAL_FORM_STATE: LeadFormState = { status: "idle" };

/* The home page's recap. Product pages pass bullets={null} instead: the
   spec's product template is heading, subhead and form only, and three of
   these five lines are about products that page is not selling. */
const HOME_BULLETS = [
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
  // The form posts straight to the submitLead Server Action. Success is
  // reported only when the notification email actually went out: an earlier
  // version flipped to "thanks, we'll be in touch" unconditionally, which
  // meant a failed send looked identical to a delivered lead.
  const [state, formAction, isPending] = useActionState(submitLead, INITIAL_FORM_STATE);
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
          {/* The "Why organizers choose idexi" checklist used to be its own
              section immediately above this one. Merged in here because the
              two were one closing beat already: the recap and the ask belong
              in the same field of view, not stacked as separate scrolls. */}
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
              {/* Honeypot. Hidden from sight, from screen readers, and from
                  tab order, so only a bot filling every field it finds will
                  ever populate it. Kept off-screen rather than display:none
                  because some bots skip undisplayed inputs. */}
              <div className="cta-hp" aria-hidden="true">
                <label htmlFor="cta-website">Website</label>
                <input id="cta-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

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
    /* Clears the fixed Navbar pill when landed on via a #contact anchor
       jump, so the heading isn't tucked under it. */
    scroll-margin-top: 96px;
  }
  .cta-row {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--st-space-xl) var(--st-space-margin-mobile);
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .cta-text {
    width: 100%;
  }
  /* Body copy and labels below inherit font-family from the global
     body rule. The heading is pinned explicitly to the brand's serif
     display font, matching OurStorySection's heading declaration exactly
     (same family, weight, and letter-spacing) rather than the global
     h1-h6 sans-serif default. */
  .cta-heading {
    margin: 0 0 1.25rem;
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--st-on-background);
  }
  .cta-subtext {
    margin: 0 0 1.25rem;
    max-width: 34rem;
    font-size: 1.0625rem;
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
    max-width: 34rem;
  }
  .cta-bullets li {
    position: relative;
    padding-left: 1.5rem;
    font-size: 1.0625rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
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
  /* Sits tight to the checklist above it: the spec treats the two as one
     closing reassurance beat, not as separate blocks. */
  .cta-nudge {
    margin: 1.35rem 0 0;
    font-size: 1.0625rem;
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
    padding: 2rem;
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
  }

  .cta-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .cta-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
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
  /* Honeypot wrapper: moved off-screen rather than display:none, since some
     bots ignore undisplayed inputs. Never focusable, never announced. */
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
  /* Browsers do not have form controls inherit font-family from the page
     by default (they use the OS's native UI font instead) — font: inherit
     is what makes them genuinely pick up the same font as the label right
     above them, rather than a second hardcoded value duplicating it. */
  .cta-field input,
  .cta-field select,
  .cta-field textarea {
    font: inherit;
    font-size: 0.9375rem;
    color: var(--st-on-background);
    background: var(--st-surface-container-lowest);
    border: 1.5px solid var(--st-outline-variant);
    border-radius: var(--st-radius-md);
    padding: 0.7rem 0.9rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-field textarea {
    resize: vertical;
    min-height: 5.5rem;
  }
  .cta-field input::placeholder,
  .cta-field textarea::placeholder {
    color: var(--st-outline);
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2345464e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.9rem center;
    padding-right: 2.5rem;
  }
  .cta-field select:invalid,
  .cta-field select option[value=""] {
    color: var(--st-outline);
  }

  .cta-submit {
    margin-top: 0.25rem;
    width: 100%;
    padding: 0.9rem 1.5rem;
    font: inherit;
    font-weight: 600;
    font-size: 1rem;
    color: var(--st-on-primary);
    background: var(--st-primary);
    border: none;
    border-radius: var(--st-radius-full);
    cursor: pointer;
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

  @media (min-width: 768px) {
    .cta-row {
      flex-direction: row;
      align-items: center;
    }
    .cta-text {
      width: 50%;
    }
    .cta-form-panel {
      width: 50%;
    }
    .cta-form {
      grid-template-columns: 1fr 1fr;
      gap: 1rem 1.25rem;
    }
  }
`;
