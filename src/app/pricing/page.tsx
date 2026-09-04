import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "idexi event plans start at $199. Backed by our Zero-Risk Guarantee: full refund if check-in fails. No hardware to buy, no per-guest photo charges.",
};

const INCLUDED = [
  "Zero-Risk Guarantee: Full refund if check-in fails at your door",
  "Personalized QR tickets delivered to every guest",
  "Ticket categories for VIP, general, press, and staff",
  "Check-in from any staff phone, with no scanner hardware to buy",
  "Offline scanning that syncs when connectivity returns",
  "Private, OTP-gated photo galleries for every matched guest",
  "Sponsor branding across tickets, emails, and photos",
  "A post-event report covering attendance and guest journey",
  "Our team reachable during your event, not just before it",
];

const SCOPE_FACTORS = [
  {
    title: "How many guests",
    body: "The same process runs at 150 guests and at 3,000. Scale affects the quote, not the workflow.",
  },
  {
    title: "Which products you need",
    body: "Pass, Flow, and Face can be taken together or individually. Plenty of organizers already have ticketing and take Face on its own.",
  },
  {
    title: "How many days and doors",
    body: "A single-evening gala and a three-day conference with session access are different amounts of setup.",
  },
  {
    title: "What you already run",
    body: "If you have a registration tool you like, we integrate around it rather than asking you to replace it.",
  },
];

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Plans start at $199 per event"
      intro="Priced per event, not per seat and not per photo. Every quote is scoped in a short call, because a 150-guest competition and a three-day summit are not the same job."
      wide
    >
      <div className="pricing-grid">
        <section className="pricing-card">
          <p className="pricing-eyebrow">Starting at</p>
          <p className="pricing-figure">
            $199<span className="pricing-unit"> / event</span>
          </p>
          <p className="pricing-note">
            No scanning hardware to buy or maintain. No per-guest charge for photo
            delivery.
          </p>

          <div className="pricing-guarantee">
            <div className="pricing-guarantee-header">
              <ShieldCheck size={18} className="pricing-guarantee-icon" aria-hidden="true" />
              <span>Zero-Risk Guarantee</span>
            </div>
            <p className="pricing-guarantee-copy">
              <strong>Full refund if check-in fails.</strong> If our system experiences downtime or fails guest admission at your door, you receive a 100% refund.
            </p>
          </div>

          <Link href="/#contact" className="st-btn st-btn-primary pricing-cta">
            Book a Demo
          </Link>
        </section>

        <section className="pricing-included">
          <h2>What every event includes</h2>
          <ul className="pricing-list">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="shell-section pricing-scope">
        <h2>What moves a quote</h2>
        <div className="pricing-factors">
          {SCOPE_FACTORS.map(({ title, body }) => (
            <div key={title} className="pricing-factor">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="shell-note">
        Tell us the date, the venue, and roughly how many people are coming, and we will
        come back with a number and a walkthrough. No commitment and no pressure. Reach us
        through <Link href="/#contact">the demo form</Link> or at{" "}
        <a href="mailto:info@idexi.tech">info@idexi.tech</a>.
      </p>

      <style>{pricingCSS}</style>
    </PageShell>
  );
}

const pricingCSS = `
  .pricing-grid {
    display: grid;
    grid-template-columns: minmax(260px, 340px) 1fr;
    gap: var(--st-space-md);
    margin-bottom: 3rem;
    align-items: start;
  }

  .pricing-card {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: var(--st-space-md);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-top: 3px solid var(--st-product-pass);
    border-radius: var(--st-radius-xl);
  }

  .pricing-eyebrow {
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--st-on-surface-variant);
  }

  .pricing-figure {
    font-family: var(--st-font-display);
    font-weight: 800;
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    line-height: 1;
    color: var(--st-product-pass);
    font-variant-numeric: tabular-nums;
  }

  .pricing-unit {
    font-size: 1rem;
    font-weight: 600;
    color: var(--st-on-surface-variant);
  }

  .pricing-note {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  .pricing-guarantee {
    margin: 0.75rem 0 0.5rem;
    padding: 0.85rem 1rem;
    border-radius: var(--st-radius-md);
    background: color-mix(in srgb, var(--st-product-pass) 8%, transparent);
    border: 1px solid color-mix(in srgb, var(--st-product-pass) 25%, transparent);
  }

  .pricing-guarantee-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-display);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--st-product-pass);
  }

  .pricing-guarantee-icon {
    color: var(--st-product-pass);
    flex-shrink: 0;
  }

  .pricing-guarantee-copy {
    margin: 0.35rem 0 0;
    font-size: 0.86rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
  }

  .pricing-cta {
    margin-top: 0.5rem;
    align-self: flex-start;
  }

  .pricing-included h2 {
    font-family: var(--st-font-serif);
    font-weight: 500;
    font-size: 1.5rem;
    color: var(--st-on-background);
    margin-bottom: 1rem;
  }

  .pricing-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem 1.5rem;
    margin-left: 1.1rem;
    list-style: disc;
  }
  .pricing-list li {
    font-size: 0.97rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
  }

  .pricing-factors {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--st-space-md);
  }

  .pricing-factor h3 {
    margin-top: 0;
  }

  @media (max-width: 860px) {
    .pricing-grid,
    .pricing-list,
    .pricing-factors {
      grid-template-columns: 1fr;
    }
  }
`;
