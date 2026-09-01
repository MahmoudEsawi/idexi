import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

/* Terms of service, linked from the footer's bottom bar.

   Same scope discipline as /privacy-policy: this states how the service is
   actually sold and run. It deliberately claims no governing jurisdiction,
   liability cap, or warranty disclaimer, because inventing those would be
   worse than useless. They go in after legal review. */

export const metadata: Metadata = {
  title: "Terms of Service | idexi",
  description:
    "The terms covering use of idexi's ticketing, check-in, and photo delivery services for an event.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      intro="The terms that apply when you run an event on idexi."
    >
      <section className="shell-section">
        <h2>What the service covers</h2>
        <p>
          idexi provides digital ticketing (idexi Pass), staff check-in and access control
          (idexi Flow), and AI photo matching and delivery (idexi Face). Products can be
          used together or individually alongside tools you already have. Each engagement
          is scoped per event, and what is included is set out in the agreement for that
          event.
        </p>
      </section>

      <section className="shell-section">
        <h2>Your responsibilities as an organizer</h2>
        <ul>
          <li>Tell your guests what you are collecting and why, and obtain consent where your context requires it.</li>
          <li>Confirm you have the right to supply the event photography you upload for matching.</li>
          <li>Keep your dashboard accounts limited to staff who should have access.</li>
          <li>Provide accurate event and venue details, since check-in configuration depends on them.</li>
        </ul>
      </section>

      <section className="shell-section">
        <h2>Guest access</h2>
        <p>
          Guests receive their tickets and galleries directly. Gallery access is gated by
          a one-time code issued to the individual guest, and guests may request removal
          of their photos or flag an incorrect photo match at any time.
        </p>
      </section>

      <section className="shell-section">
        <h2>Data retention</h2>
        <p>
          Event photos and galleries are deleted automatically 30 days after the event
          ends. If you need material preserved beyond that window, arrange it before the
          event rather than after, since deletion runs on its own.
        </p>
      </section>

      <section className="shell-section">
        <h2>Support during your event</h2>
        <p>
          Our team is reachable throughout your event, not only during setup beforehand.
          Scanning continues to work offline and syncs when connectivity returns, and
          staff can verify guests manually from the dashboard as a fallback.
        </p>
      </section>

      <section className="shell-section">
        <h2>Fees</h2>
        <p>
          Pricing starts at $199 per event and is quoted per engagement based on scope.
          Payment terms are set out in the agreement for your event.
        </p>
      </section>

      <section className="shell-section">
        <h2>Contact</h2>
        <p>
          Questions about these terms go to{" "}
          <a href="mailto:info@idexi.tech">info@idexi.tech</a>.
        </p>
      </section>

      <p className="shell-note">
        These terms describe how the service currently operates. They are under legal
        review and will be expanded with governing-law and liability provisions once that
        review completes. Where a signed agreement for your event says something
        different, that agreement takes precedence.
      </p>
    </PageShell>
  );
}
