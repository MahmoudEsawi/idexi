import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

/* The formal document from the footer's bottom bar, kept separate from
   /privacy-security by design.

   Scope note for whoever revises this: everything stated below is a practice
   already confirmed elsewhere in the product (OTP-gated access, 30-day
   deletion, per-event servers, organizer as the controlling party). No
   jurisdiction, regulator, or compliance certification is claimed here,
   because none has been verified. Do not add one to make the page look more
   complete; get it reviewed and then add it. */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "idexi's privacy policy: what data we process for an event, how long we keep it, who controls it, and how to reach us about it.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What idexi processes on behalf of an event, how long it is kept, and who decides."
    >
      <section className="shell-section">
        <h2>Who controls the data</h2>
        <p>
          idexi provides ticketing, check-in, and photo delivery to event organizers. For
          any given event, the organizer decides what is collected from guests and why.
          We process that data to run the service for that event and for nothing else. We
          do not sell it, and we do not use it to train models for other customers.
        </p>
      </section>

      <section className="shell-section">
        <h2>What we process</h2>
        <ul>
          <li>Registration details the guest enters themselves, such as name, email, phone, and ticket category.</li>
          <li>A single reference selfie, provided only when a guest opts in to photo delivery.</li>
          <li>Event photography supplied by the organizer or their photographers.</li>
          <li>Check-in records: when a pass was scanned, at which point, and by which staff account.</li>
        </ul>
      </section>

      <section className="shell-section">
        <h2>How long we keep it</h2>
        <p>
          Each event&apos;s photos and galleries are stored on a dedicated, secured server
          for that event and are deleted automatically 30 days after the event ends.
          Deletion happens by default and does not need to be requested.
        </p>
      </section>

      <section className="shell-section">
        <h2>How access is restricted</h2>
        <p>
          Guest galleries are not published at public URLs. Access requires a one-time
          code sent to the individual guest, so possession of a link alone grants nothing.
          Organizer dashboards are limited to accounts the organizer authorizes.
        </p>
      </section>

      <section className="shell-section">
        <h2>Your choices</h2>
        <p>
          Photo delivery is opt-in: a guest who does not provide a reference selfie is not
          matched and receives no gallery. A guest can ask the organizer or idexi to
          remove their photos from an event gallery, and can flag an incorrect match for
          manual correction.
        </p>
      </section>

      <section className="shell-section">
        <h2>Contact</h2>
        <p>
          Questions about this policy, or a request concerning your own data, can go to{" "}
          <a href="mailto:info@idexi.tech">info@idexi.tech</a>. If your question is about
          how a specific event handled your data, contacting that event&apos;s organizer
          first is usually fastest.
        </p>
      </section>

      <p className="shell-note">
        This document describes idexi&apos;s current practices. It is under legal review
        and will be expanded with jurisdiction-specific terms once that review completes.
        For a plain-language explanation of the same practices, see{" "}
        <Link href="/privacy-security">Privacy &amp; Security</Link>.
      </p>
    </PageShell>
  );
}
