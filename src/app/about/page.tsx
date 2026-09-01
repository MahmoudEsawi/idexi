import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

/* Company page from the header and the footer's Company column.

   The origin story, the founders, and the "8 years of frontline experience"
   figure all come from OurStorySection on the home page rather than being
   written fresh, so the two never drift into telling different versions of the
   same history. If that section's copy changes, change it here too. */

export const metadata: Metadata = {
  title: "About | idexi",
  description:
    "idexi was built by two AI graduates with eight years of frontline event and media experience, to remove the friction between tickets, doors, and photos.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Built by people who worked the door"
      intro="idexi came out of eight years of running events and covering them, not out of a whiteboard session about the events industry."
    >
      <section className="shell-section">
        <h2>Why it exists</h2>
        <p>
          Saif Alqdessi and Jafar Alkhadrawi spent eight years in event management and
          media coverage before either of them wrote a line of idexi. Both are AI
          graduates. The problems they built for are the ones they kept running into
          personally: a printed guest list at a door with two hundred people behind it, a
          ticket screenshotted and used twice, a guest still emailing three days later
          asking where their photos went.
        </p>
        <p>
          Those are not exotic problems. They are what most events quietly accept as the
          cost of doing business. idexi exists because they do not have to be.
        </p>
      </section>

      <section className="shell-section">
        <h2>What we actually built</h2>
        <p>
          Three products that share one guest record, so a person scanned at the door is
          the same person whose photos get delivered afterward, with nothing re-entered in
          between.
        </p>
        <ul>
          <li>
            <Link href="/services/pass">idexi Pass</Link> issues a personalized,
            fraud-resistant QR ticket to every guest within minutes.
          </li>
          <li>
            <Link href="/services/flow">idexi Flow</Link> turns any staff phone into a
            check-in station that handles entry, hospitality, and session access.
          </li>
          <li>
            <Link href="/services/face">idexi Face</Link> finds each guest across the
            event photography and delivers them a private gallery.
          </li>
        </ul>
      </section>

      <section className="shell-section">
        <h2>The team</h2>
        <p>
          <strong>Saif Alqdessi</strong>, co-founder and tech lead. <strong>Jafar
          Alkhadrawi</strong>, co-founder and business lead. We are small on purpose,
          which is why our team is reachable during your event rather than only before it.
        </p>
      </section>

      <section className="shell-section">
        <h2>Where we work</h2>
        <p>
          We are based in Amman, Jordan, and idexi is already running at events across
          Jordan and the wider region, from 150-guest competitions to gatherings of three
          thousand.
        </p>
      </section>

      <p className="shell-note">
        Want to talk about a specific event?{" "}
        <Link href="/#contact">Book a demo</Link> and we will walk through how the
        pieces fit yours, or email <a href="mailto:info@idexi.tech">info@idexi.tech</a>.
      </p>
    </PageShell>
  );
}
