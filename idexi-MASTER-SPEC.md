# idexi.tech — Master Spec File
Home Page + Header + Footer — Full Final Content & Developer Notes
Status: Approved, ready for development

---

# HEADER (Global — every page)

## Structure
```
[Logo]     Platform ▾     Pricing     About          [Where's My Photo?]   [Book a Demo]
```
- Sticky header, stays visible on scroll
- Background: white / --surface-2

## Mega Menu (opens under "Platform")

**Column 1 — Products**
- Idexi Pass — Smart digital ticketing
- Idexi Flow — Unified operations hub
- Idexi Face — Instant photo delivery

**Column 2 — Learn**
- How it works — The full connected journey
- Use cases — Real events, real results
- Privacy & security — How guest data is protected

## Buttons
- **Where's My Photo?** — outline/ghost style, camera icon, links to external guest gallery tool. Visually lighter than Book a Demo, always.
- **Book a Demo** — solid filled button, dominant CTA color reused identically everywhere on the site.

## Mobile
- Collapse nav + mega menu into hamburger below ~768px
- Book a Demo stays visible outside the hamburger (primary conversion action)

---

# HOME PAGE

## Section 1 — Hero

**Eyebrow:** INTELLIGENT EVENT SOLUTIONS

**H1:** Tickets Sent. Guests Scanned. Photos Delivered.

**Subhead:** One system, three moments — handled automatically, from the first click to the last photo.

**Buttons:** Book a Demo (primary) · See How It Works (secondary)

*Note: H1 intentionally mirrors the three products in order (Pass → Flow → Face).*

---

## Section 2 — Trusted By

**H2:** Already running at events across Jordan and the region

**Subhead:** A growing list of events already running on idexi.
*(Evergreen wording — never edit to mention specific counts, since cards will be added over time.)*

**Layout:** Scalable logo-wall grid (`repeat(auto-fill, minmax(160px, 1fr))`) — must reflow automatically as more cards are added, potentially 20+.

**Cards (icon/logo + name + attendee badge, no descriptions):**
| Event | Attendee Badge |
|---|---|
| Arab Robotics and AI Championship | 300 guests |
| IEEE AESS Aerospace Competition | 150 guests |
| TEDx PHU | 300 guests |
| *(faded placeholder)* More added regularly | — |

**Closing link:** See exactly how it works →

---

## Section 3 — Quick Proof Bar

No heading — flows directly from Trusted By. Three columns, staggered fade-in animation (0ms / 120ms / 240ms delay).

| Column | Icon | Stat | Label | Color |
|---|---|---|---|---|
| 1 | bolt | Under 5 min | ticket delivery, start to finish | Blue (= Pass) |
| 2 | arrows-maximize | Any event size | from 150 guests to 3,000+ | Teal (= Flow) |
| 3 | shield-check | 100% guest privacy | OTP-verified photo access | Coral (= Face) |

*Evergreen facts — describe system capability, never need updating as more events happen.*

---

## Section 4 — The Problem

**H2:** You know these moments.

**Layout:** Manual carousel (arrows, not auto-play), counter "01 / 10" above, dot indicators below.

1. A line of two hundred people at the door, with one person checking names off a printed sheet or excel sheet.
2. A ticket that was screenshotted and used twice at the door.
3. A guest showing up with the wrong ticket category, because nothing was checked until they were already inside.
4. A staff member letting the wrong person into the VIP area, because there was no way to check.
5. Running out of welcome kits halfway through, because no one tracked who already picked theirs up.
6. A scanner dying in the middle of check-in, with no backup and a growing line.
7. A guest emailing three days later, still asking where their photos are.
8. Guests scrolling through hundreds of strangers' photos just to find the photos with their own face in them.
9. A sponsor asking why their logo isn't on anything guests actually saw.
10. Sitting down after the event with no real idea of how many people actually showed up, or when.

---

## Section 5 — The idexi Difference

**H2:** The idexi Difference
**Subhead:** Choose a product to see exactly what changes.

**Layout:** 3 tabs (Pass/Flow/Face, default = Pass) → summary sentence → 2-column comparison table (all 5 rows visible at once, no click-through). "With idexi" column background/text recolors per product.

### Idexi Pass (blue)
> No manual approvals. No generic tickets. Just a personalized, fraud-proof QR ticket in every guest's inbox, in minutes.

| The old way | With idexi |
|---|---|
| Manual approvals slow registration | Delivered automatically, in minutes |
| Generic tickets feel unprofessional | Fully branded, with the guest's name |
| Categories managed by hand invite errors | VIP, general, press, staff — built in |
| Screenshotted tickets get reused | One encrypted QR, one entry only |
| Sponsor visibility is an afterthought | Sponsor branding on every ticket |

### Idexi Flow (teal)
> Idexi Flow turns any staff phone into a full check-in station — handling entry, hospitality, and session access from a single QR code per guest.

| The old way | With idexi |
|---|---|
| Scanning hardware is costly to maintain | Any staff phone becomes a scanner |
| Manual check-in creates long lines | One scan confirms entry, under a second |
| Tracking kits and meals is unreliable | Every pickup logged automatically |
| Staff can't identify VIP guests on the spot | Status appears instantly with every scan |
| Post-event data is incomplete | A full journey report, generated automatically |

### Idexi Face (coral)
> Idexi Face uses facial recognition to find every guest in every event photo, builds them a private gallery, and delivers it straight to their inbox — automatically.

| The old way | With idexi |
|---|---|
| Guests search folders for hours | AI finds every guest within seconds |
| Shared links compromise privacy | Private galleries, guest's own code only |
| Manual delivery isn't feasible at scale | Every gallery delivered by email, automatically |
| Sponsor exposure gets lost | Every gallery branded for your sponsors |
| The event ends without an impression | Photos delivered within minutes |

---

## Section 6 — How It Works

**Eyebrow:** HOW IT WORKS
**H2:** From ticket to photo — under 5 minutes, start to finish

**Layout:** Auto-playing animation, 4 stages, one active/glowing at a time, advances every ~1.4s, loops continuously. Flowing dashed connector lines between stages.

| Stage | Label | Sublabel | Color | Caption when active |
|---|---|---|---|---|
| 1 | Ticket sent | Idexi Pass | Blue | Guest receives a QR ticket |
| 2 | Checked in | Idexi Flow | Teal | Staff scan it with their own phone |
| 3 | Photos matched | Idexi Face — AI | Coral | AI finds every face, every photo |
| 4 | Delivered | To their inbox | Purple | A private gallery lands in their inbox |

**Closing lines:**
> Guests never search. Staff never guess. You never lose control.
> Watch the full journey → *(links to /how-it-works)*

---

## Section 7 — A New Stage for Your Sponsors

Entire section has purple/lavender background tint (only section on the page with a colored background).

**H2:** A new stage for your sponsors
**Subhead:** Every ticket, every email, and every photo becomes a space your sponsors actually get seen in.

**Layout:** Auto-playing animation, 3 stages, same pattern as Section 6, advances every ~1.6s.

| Stage | Label | Sublabel | Caption when active |
|---|---|---|---|
| 1 | On the ticket | sponsor cover | Seen the moment the ticket lands in their inbox |
| 2 | On the email cover | seen before opening | Seen before the guest even opens the email |
| 3 | On every photo | subtle watermark | Seen across every photo in the gallery, without covering a face |

*Note: "sponsor cover" = one reusable design containing multiple partner logos (not a single logo), applied identically across all 3 touchpoints.*

**Stat callout box:**
> One click. Every guest.
> [Counter animates 0 → 3,000] guests, reached instantly
> One click sends every ticket and every photo. The same process works at any scale, from 150 guests to 3,000.

*Counter animates once on scroll-into-view (~1.8s). Do not add "3-day event" back into the copy — duration is irrelevant to the claim.*

---

## Section 8 — Use Cases

**H2:** Built for every kind of event.
**Subhead:** Find your event below, and see exactly how idexi fits it.

**Layout:** 6-card grid (3×2 desktop). Order is intentional — academic → corporate → personal.

| # | Category | Copy |
|---|---|---|
| 1 | Graduations | Finally — graduates get their photos the moment they walk off stage. |
| 2 | Competitions | No printed lists. No spreadsheets. Just hundreds of participants, checked in and sorted automatically. |
| 3 | Conferences & Talks | One QR code. Every session. Guests always end up exactly where they belong. |
| 4 | Corporate Summits | Your VIPs recognized the second they walk in. Your sponsors seen everywhere else. |
| 5 | Trade Shows & Exhibitions | No scanners to buy. No lines to manage. Just thousands of badges, scanned in seconds. |
| 6 | Weddings & Private Celebrations | No asking the photographer. No waiting to get home. Just open your phone — your photos are already there. |

**Closing link:** See all use cases → *(links to /use-cases)*

*Do NOT reference real events (Robotics Championship, IEEE AESS, TEDx) in this section — that's Trusted By's job. This section is capability, not history.*

---

## Section 9 — Common Questions (Global floating widget + homepage nudge)

**Floating button:** Bottom-left, fixed position, every page of the site (not homepage-only). Chat bubble icon, solid fill.

**Expanded panel:** Shows 4 questions first (Where's my photo? / WiFi issues? / Need an app? / Data privacy?), "See 7 more questions" button reveals the rest. Click a question → chat-style answer bubble appears below.

**Homepage inline nudge** (between Section 10 and Final CTA):
> 💬 Still have a question? Ask here → *(opens the same floating widget)*

**All 11 Q&As:**

1. **Where can I find my event photos?** — Use the "Where's My Photo?" button at the top of any page — enter your email and we'll send you a secure link to your gallery.
2. **Our venue has terrible WiFi.** — idexi Flow works offline and syncs the moment you're back online.
3. **My guests won't download an app.** — Everything works through email and a QR code — nothing to install.
4. **We already use a ticketing tool.** — Use idexi Face or Flow on their own, alongside what you already have.
5. **What if the AI matches the wrong photo to someone?** — We built our own facial recognition model, trained specifically for crowded event photos — accurate 99% of the time. If anything still looks off, guests can flag it and our team corrects it manually.
6. **Will my guests' photos be public for anyone to see?** — No. Every gallery is locked behind a private OTP code sent only to that guest. No public links — only they can open their own photos.
7. **Can it handle a sudden rush at the door?** — Any number of staff phones can scan in parallel — no single bottleneck.
8. **Will it work for a multi-day event?** — Yes, guest data and photo galleries persist across all days of the event.
9. **What if a guest doesn't have a smartphone?** — Staff can look up and verify guests manually from the dashboard as a backup.
10. **Is there support if something goes wrong during the event itself?** — Yes — our team is reachable throughout your event, not just before it.
11. **What happens to our data after the event ends?** — We don't keep it. Every event's photos are stored on a dedicated, secured server and automatically deleted 30 days after the event ends.

---

## Section 10 — Why organizers choose idexi

**H2:** Why organizers choose idexi

Compact single-column checklist, max-width ~400px:

- ✓ All your tickets delivered in under 5 minutes
- ✓ No scanning hardware to buy or maintain
- ✓ Every guest gets their photos, automatically
- ✓ Sponsor branding on every ticket, email, and photo
- ✓ Plans starting at $199 per event

*Fast-scan recap, ~3 seconds to read. Keep tight spacing to the question nudge line right after it — they function as one "final reassurance" moment.*

---

## Section 11 — Final CTA

**H2:** Your next event doesn't have to be chaos

**Subhead:** Tell us about your event. We'll show you exactly how idexi fits — no commitment, no pressure.

**Form fields (in order):**
1. Full name (required)
2. Email (required)
3. Phone number (required)
4. Event type — dropdown: Graduation / Competition / Conference / Corporate summit / Trade show / Wedding
5. What interests you most? — dropdown: Idexi Pass / Idexi Flow / Idexi Face / Full suite

**Submit button:** Book a Demo (same style as every other Book a Demo button site-wide)

**On success:** Show inline confirmation ("Thanks — we'll be in touch shortly"), don't redirect away.

---

# FOOTER (Global — every page)

## 4 Columns

**Column 1 — Brand:** Logo + "Intelligent Event Solutions — smart ticketing, access control, and AI photo delivery for every live event."

**Column 2 — Products:** Idexi Pass · Idexi Flow · Idexi Face

**Column 3 — Company:** About · How It Works · Use Cases · Pricing

**Column 4 — Support:** Common Questions (opens floating widget) · Privacy & Security (trust/education page) · **Where's My Photo?** (accent color, second visual cue for attendees)

## Bottom Bar
- © 2026 idexi. All rights reserved.
- Privacy Policy *(formal legal doc — different from "Privacy & Security")* · Terms of Service
- +962 78 544 7506 · tryidexi@gmail.com · Amman, Jordan

## Critical distinction
Two separate privacy pages must never be merged:
1. **"Privacy & Security"** (Learn menu + footer Support column) — plain-language trust page (OTP, 30-day auto-deletion, dedicated servers)
2. **"Privacy Policy"** (footer bottom bar) — standard legal/compliance document

## Floating button clearance
The floating Common Questions button must never visually overlap footer content on any screen size — maintain clearance above the footer.

---

# GLOBAL DESIGN NOTES

- **Primary CTA color** ("Book a Demo") is identical across every instance site-wide — header, hero, every section, final form, no exceptions.
- **Product colors:** Blue = Pass, Teal = Flow, Coral = Face — consistent across Quick Proof Bar, The idexi Difference, and How It Works.
- **Purple** is reserved exclusively for the Sponsors section — never reused elsewhere, so it reads as visually distinct the instant a visitor scrolls into it.
- **Evergreen content rule:** Any copy referencing scale, counts, or event history must be written to never require editing as more events happen (e.g. "any event size," "a growing list") — avoid hardcoded totals outside of the Trusted By cards and the one verified 3,000-guest figure.
- **Two audiences, one page:** B2B organizers follow the full funnel top to bottom; attendees looking for photos are served instantly via the header button, the floating widget, and the footer link — without needing to scroll through organizer-focused content.
