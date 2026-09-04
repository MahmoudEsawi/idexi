import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertTriangle, Smartphone, Zap } from "lucide-react";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "How to Stop Duplicate Ticket Scanning: Complete Guide",
  description:
    "Learn how to stop duplicate ticket scanning and screenshot pass fraud at events using dynamic tokens, sub-second gate invalidation, and offline mesh sync.",
  keywords: [
    "how to stop duplicate ticket scanning",
    "stop duplicate ticket entry",
    "prevent event ticket fraud",
    "event check-in software",
    "offline event check-in app",
    "screenshot ticket reuse",
    "gate access control",
  ],
};

const guideFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do attendees duplicate tickets at events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common duplicate ticket entry method is screenshot forwarding via WhatsApp, iMessage, or Telegram. One attendee buys a legitimate ticket, screenshots the QR code or PDF barcode, and sends it to multiple friends who attempt entry at different gates.",
      },
    },
    {
      "@type": "Question",
      name: "How does event check-in software detect duplicate tickets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a QR ticket is scanned at any door, the check-in software immediately queries a central guest record and marks the token as used. Subsequent scans of the same ticket trigger an immediate duplicate alert showing the exact timestamp and gate where the first entry occurred.",
      },
    },
    {
      "@type": "Question",
      name: "How can you stop duplicate ticket scanning when venue WiFi fails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern check-in software like idexi Flow uses local offline mesh caching. Scanning devices keep a local encrypted database of checked-in tickets on each device and broadcast invalidation state locally, preventing duplicate entries even during complete internet blackouts.",
      },
    },
  ],
};

export default function StopDuplicateTicketsPage() {
  return (
    <PageShell
      eyebrow="Security Guide"
      title="How to Stop Duplicate Ticket Scanning at Live Events"
      intro="Static barcodes and screenshot passes cost organizers thousands in unpaid entries and venue capacity violations. Here is how modern gate systems eliminate duplicate ticket fraud permanently."
      wide
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd) }}
      />
      <style>{guideCSS}</style>

      {/* Overview Card */}
      <div className="guide-summary-card">
        <div className="guide-summary-badge">
          <ShieldCheck size={20} aria-hidden="true" />
          <span>Core Takeaway</span>
        </div>
        <p className="guide-summary-lead">
          Stopping duplicate ticket entry requires two synchronized systems: <strong>single-use cryptographic tokens</strong> generated at issuance, and <strong>sub-second gate invalidation</strong> that functions seamlessly even when venue internet completely fails.
        </p>
      </div>

      <section className="shell-section">
        <h2>The 3 Ways Duplicate Ticket Fraud Happens</h2>
        <div className="guide-problems-grid">
          <div className="guide-problem-card">
            <span className="guide-problem-num">01</span>
            <h3>Screenshot Forwarding</h3>
            <p>
              An attendee receives a static PDF or generic ticket image, screenshots the QR code, and sends it to three friends. If gates don&apos;t invalidate scans across devices instantly, all four enter undetected.
            </p>
          </div>
          <div className="guide-problem-card">
            <span className="guide-problem-num">02</span>
            <h3>Parallel Door Attacks</h3>
            <p>
              Two people arrive at separate gates (e.g. North Gate and South Gate) at the exact same minute. If the check-in scanners do not sync in real time, both gates accept the same code before databases reconcile.
            </p>
          </div>
          <div className="guide-problem-card">
            <span className="guide-problem-num">03</span>
            <h3>Offline Sync Collisions</h3>
            <p>
              When venue WiFi crashes or cell towers get jammed by crowds, legacy scanner guns fall back to uncoordinated local lists or fail completely, allowing repeated entry.
            </p>
          </div>
        </div>
      </section>

      <section className="shell-section">
        <h2>How idexi Stops Duplicate Ticket Scanning</h2>
        <div className="guide-solution-stack">
          <div className="guide-step-row">
            <div className="guide-step-icon-wrap">
              <Zap size={22} className="guide-step-icon" aria-hidden="true" />
            </div>
            <div className="guide-step-content">
              <h3>1. Dynamic Single-Use QR Passes</h3>
              <p>
                Through <Link href="/services/pass">idexi Pass</Link>, every ticket is tied to a verified attendee profile with cryptographic signatures. The QR code is unique to that specific guest and cannot be guessed or duplicated.
              </p>
            </div>
          </div>

          <div className="guide-step-row">
            <div className="guide-step-icon-wrap">
              <Smartphone size={22} className="guide-step-icon" aria-hidden="true" />
            </div>
            <div className="guide-step-content">
              <h3>2. Sub-Second Invalidation Across All Staff Phones</h3>
              <p>
                Using <Link href="/services/flow">idexi Flow</Link>, any staff smartphone becomes a high-speed scanner. Within 300 milliseconds of a scan, the ticket state flips from &quot;Valid&quot; to &quot;Entered&quot; across every scanning station simultaneously.
              </p>
            </div>
          </div>

          <div className="guide-step-row">
            <div className="guide-step-icon-wrap">
              <ShieldCheck size={22} className="guide-step-icon" aria-hidden="true" />
            </div>
            <div className="guide-step-content">
              <h3>3. Offline Local Mesh Sync When WiFi Dies</h3>
              <p>
                If venue connectivity drops, staff devices automatically transition to offline mode. Each device caches entry timestamps and hashes, instantly alerting staff if an already-scanned code is re-scanned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="shell-section">
        <h2>Traditional Gate Scanners vs. idexi Flow</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Traditional Barcode Guns</th>
                <th>idexi Check-In Software</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware Required</td>
                <td>Rented laser scanners ($75-$150/unit)</td>
                <td>Any staff smartphone (iOS or Android)</td>
              </tr>
              <tr>
                <td>Duplicate Detection Speed</td>
                <td>2 to 5 seconds (relies on external server)</td>
                <td>Sub-second (&lt; 300ms real-time sync)</td>
              </tr>
              <tr>
                <td>Offline Protection</td>
                <td>Fails or creates duplicate entry sync errors</td>
                <td>100% offline mesh caching with timestamped locks</td>
              </tr>
              <tr>
                <td>Pricing</td>
                <td>$500+ minimum plus rental deposits</td>
                <td>From $199/event with 100% refund guarantee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk Reversal Banner */}
      <div className="guide-guarantee-banner">
        <div className="guide-guarantee-header">
          <ShieldCheck size={24} className="guide-guarantee-icon" aria-hidden="true" />
          <h3>Backed by Our Zero-Risk Guarantee</h3>
        </div>
        <p>
          Full refund if check-in fails. If idexi check-in software experiences downtime or fails to scan your attendees at the gate, we refund 100% of your event fee.
        </p>
        <div className="guide-guarantee-actions">
          <Link href="/#contact" className="st-btn st-btn-primary">
            Book a Demo
          </Link>
          <Link href="/pricing" className="st-btn st-btn-bracket">
            View $199 Pricing
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

const guideCSS = `
  .guide-summary-card {
    padding: 1.5rem 1.75rem;
    margin: 2rem 0 3rem;
    border-radius: var(--st-radius-xl);
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-left: 4px solid var(--st-product-pass);
  }
  .guide-summary-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--st-font-display);
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--st-product-pass);
    margin-bottom: 0.75rem;
  }
  .guide-summary-lead {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.65;
    color: var(--st-on-background);
  }

  .guide-problems-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.25rem;
  }
  .guide-problem-card {
    padding: 1.5rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .guide-problem-num {
    font-family: var(--st-font-display);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--st-secondary);
  }
  .guide-problem-card h3 {
    margin: 0;
    font-family: var(--st-font-display);
    font-size: 1.15rem;
    color: var(--st-on-background);
  }
  .guide-problem-card p {
    margin: 0;
    font-size: 0.93rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  .guide-solution-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.25rem;
  }
  .guide-step-row {
    display: flex;
    gap: 1.25rem;
    padding: 1.25rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    align-items: flex-start;
  }
  .guide-step-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: var(--st-radius-lg);
    background: color-mix(in srgb, var(--st-product-pass) 12%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .guide-step-icon {
    color: var(--st-product-pass);
  }
  .guide-step-content h3 {
    margin: 0 0 0.4rem;
    font-family: var(--st-font-display);
    font-size: 1.15rem;
    color: var(--st-on-background);
  }
  .guide-step-content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }

  .guide-table-wrap {
    overflow-x: auto;
    margin-top: 1.25rem;
  }
  .guide-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    background: var(--st-surface-container-lowest);
    border-radius: var(--st-radius-lg);
    overflow: hidden;
    border: 1px solid var(--st-outline-variant);
  }
  .guide-table th {
    background: var(--st-surface-container-low);
    padding: 0.9rem 1.25rem;
    text-align: left;
    font-family: var(--st-font-display);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--st-on-background);
    border-bottom: 1px solid var(--st-outline-variant);
  }
  .guide-table td {
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid var(--st-outline-variant);
    color: var(--st-on-surface-variant);
  }
  .guide-table tr:last-child td {
    border-bottom: none;
  }
  .guide-table td:nth-child(3) {
    font-weight: 600;
    color: var(--st-product-pass);
  }

  .guide-guarantee-banner {
    margin-top: 3.5rem;
    padding: 2.25rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-2xl);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .guide-guarantee-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .guide-guarantee-header h3 {
    margin: 0;
    font-family: var(--st-font-serif);
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--st-on-background);
  }
  .guide-guarantee-icon {
    color: var(--st-product-pass);
  }
  .guide-guarantee-banner p {
    margin: 0;
    max-width: 48ch;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--st-on-surface-variant);
  }
  .guide-guarantee-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;
