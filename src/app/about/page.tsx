import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { LinkedInIcon } from "@/components/icons/SocialIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "idexi was built by AI graduates Saif Alqdessi and Jafar Alkhadrawi with 8 years of event experience to fix tickets, door check-in, and photo delivery.",
};

const TEAM_MEMBERS = [
  {
    name: "Saif Alqdessi",
    role: "Co-Founder & Tech Lead",
    image: "/saif.webp",
    email: "alqdessi.qp@gmail.com",
    linkedin: "https://www.linkedin.com/in/saif-alqdess",
    bio: "AI systems engineer. Focused on distributed gate architecture, offline sync protocols, and real-time fraud prevention.",
  },
  {
    name: "Jafar Alkhadrawi",
    role: "Co-Founder & Business Lead",
    image: "/jafar.webp",
    email: "khadrawi.jafer@gmail.com",
    linkedin: "https://www.linkedin.com/in/jafar-alkhadrawi",
    bio: "AI graduate and operations lead. Focused on on-site event deployment, venue partnerships, and client success.",
  },
];

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
          We are co-founded by two AI graduates with frontline experience. We keep our core team small on purpose so our founders remain personally reachable and accountable during your live event, not just beforehand.
        </p>
        <div className="about-team-grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="about-member-card">
              <div className="about-member-photo-wrap">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="120px"
                  quality={85}
                  className="about-member-photo"
                />
              </div>
              <div className="about-member-details">
                <h3 className="about-member-name">{member.name}</h3>
                <span className="about-member-role">{member.role}</span>
                <p className="about-member-bio">{member.bio}</p>
                <div className="about-member-contacts">
                  <a
                    href={`mailto:${member.email}`}
                    className="about-member-link"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={15} aria-hidden="true" />
                    <span>{member.email}</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-member-link"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon size={15} />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
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

      <style>{aboutCSS}</style>
    </PageShell>
  );
}

const aboutCSS = `
  .about-team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  .about-member-card {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1.25rem;
    background: var(--st-surface-container-lowest);
    border: 1px solid var(--st-outline-variant);
    border-radius: var(--st-radius-xl);
    box-shadow: 0 8px 24px -12px rgba(11, 28, 48, 0.08);
  }
  .about-member-photo-wrap {
    position: relative;
    width: 96px;
    height: 96px;
    flex-shrink: 0;
    border-radius: var(--st-radius-lg);
    overflow: hidden;
    background: var(--st-surface-container-high);
  }
  .about-member-photo {
    object-fit: cover;
    object-position: top center;
  }
  .about-member-details {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }
  .about-member-name {
    margin: 0;
    font-family: var(--st-font-display);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--st-on-background);
  }
  .about-member-role {
    font-size: 0.75rem;
    font-weight: 600;
    font-family: var(--st-font-display);
    color: var(--st-secondary);
    padding: 0.15rem 0.5rem;
    background: color-mix(in srgb, var(--st-secondary) 10%, transparent);
    border-radius: var(--st-radius-full);
    width: fit-content;
  }
  .about-member-bio {
    margin: 0.2rem 0 0;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--st-on-surface-variant);
  }
  .about-member-contacts {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--st-outline-variant);
  }
  .about-member-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--st-on-surface-variant);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .about-member-link:hover {
    color: var(--st-secondary);
  }
  @media (max-width: 500px) {
    .about-member-card {
      flex-direction: column;
      align-items: flex-start;
    }
    .about-member-photo-wrap {
      width: 80px;
      height: 80px;
    }
  }
`;
