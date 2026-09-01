import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

/* The plain-language trust page from the spec's Learn menu and footer Support
   column. This is NOT the legal privacy policy, and the spec is explicit that
   the two must never be merged: this one exists to answer an organizer's or a
   guest's actual worry in words they will read. The formal document lives at
   /privacy-policy. */

export const metadata: Metadata = {
  title: "Privacy & Security | idexi",
  description:
    "How idexi protects guest data: OTP-gated private galleries, no public links, dedicated secured servers, and automatic deletion 30 days after your event ends.",
};

export default function PrivacySecurityPage() {
  return (
    <PageShell
      eyebrow="Privacy & Security"
      title="How guest data is protected"
      intro="Event photos are personal. Here is exactly what happens to them, in plain language."
    >
      <section className="shell-section">
        <h2>Every gallery is private by default</h2>
        <p>
          There are no public gallery links. A guest opens their photos by entering a
          one-time code sent only to them, so a link forwarded to someone else opens
          nothing. Guests see the photos they appear in, not everyone else&apos;s.
        </p>
      </section>

      <section className="shell-section">
        <h2>Photos are deleted automatically after 30 days</h2>
        <p>
          We do not keep your event&apos;s data. Every event&apos;s photos sit on a
          dedicated, secured server for that event alone, and they are deleted
          automatically 30 days after the event ends. Deletion is the default, not
          something you have to request.
        </p>
      </section>

      <section className="shell-section">
        <h2>Face matching runs for one event at a time</h2>
        <p>
          The reference selfie a guest provides at opt-in is used to match them against
          that event&apos;s photography, and that processing happens on the
          infrastructure set up for that event. Our matching model was trained
          specifically for crowded event photography.
        </p>
        <p>
          If a guest thinks a photo was matched to them in error, they can flag it and
          our team corrects it by hand.
        </p>
      </section>

      <section className="shell-section">
        <h2>Organizers stay in control</h2>
        <p>
          You decide what your event collects and who on your team can see it. A guest
          who wants their photos removed from a gallery can ask you or us directly, and
          staff can look up and verify a guest manually from the dashboard when someone
          arrives without a phone.
        </p>
      </section>

      <section className="shell-section">
        <h2>Check-in keeps working when the network does not</h2>
        <p>
          Scans queue locally on the staff phone during a network blackout and sync to
          the shared dashboard once connectivity returns, so a weak venue connection
          never becomes a data gap or a stalled door.
        </p>
      </section>

      <p className="shell-note">
        This page explains our practices in everyday terms. The formal legal document is
        at <Link href="/privacy-policy">Privacy Policy</Link>. Questions about your
        event&apos;s data can go to{" "}
        <a href="mailto:info@idexi.tech">info@idexi.tech</a>.
      </p>
    </PageShell>
  );
}
