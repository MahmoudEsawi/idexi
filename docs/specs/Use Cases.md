# idexi.tech — Page: Use Cases (Developer Spec)
Status: Approved, ready for development
URL: /use-cases

## Page Purpose
Shows how idexi fits 6 different event types. Content here is deliberately GENERAL CAPABILITY, not stories from idexi's own past events (that's what the homepage's "Trusted By" section is for — do not add real event names like the Arab Robotics Championship or TEDx PHU to this page).

3 sections total: Hero, Interactive Category Selector, Final CTA.

---

## Section 1 — Hero

**Eyebrow:**
```
USE CASES
```

**H1:**
```
Every Event Is Different. idexi Adapts.
```

**Subhead:**
```
Find your event type below, and see exactly how the pieces fit together.
```

No buttons in this section — the interactive selector immediately below IS the primary interaction.

---

## Section 2 — Interactive Category Selector

**IMPORTANT: this is a functional interactive component, not a static list.** A 3×2 grid of 6 category buttons sits above a content panel. Clicking any button instantly swaps the content panel below — no page reload, no scrolling to a different section. This keeps the page compact (one screen's worth of grid + panel) instead of a long scroll through 6 stacked blocks.

### The category grid (3 columns × 2 rows)

Each button: icon (Tabler icon, 20px) + label, stacked vertically, centered. Default selected on page load: **Graduations**.

| Button | Icon | Label |
|---|---|---|
| 1 | school | Graduations |
| 2 | trophy | Competitions |
| 3 | microphone-2 | Conferences |
| 4 | briefcase | Corporate |
| 5 | building-store | Trade Shows |
| 6 | heart | Weddings |

**Selected state:** solid dark fill, white text/icon (matches the site's primary button style)
**Unselected state:** outline/ghost style

### The content panel (below the grid, updates on click)

Structure: image at top (full width, ~120px tall) → title → intro sentence → 3 color-coded product bullets (Pass/blue, Flow/teal, Face/coral).

**Bullet format:** each bullet is a small colored badge with the product name (e.g. blue badge "Pass") followed by one short sentence describing that product's role for this specific event type. Same visual pattern as used on the three product pages' comparison tables — reuse those exact color values (blue #E6F1FB/#0C447C, teal #E1F5EE/#085041, coral #FAECE7/#712B13).

### Full content for all 6 categories

**1. Graduations** — image: graduation ceremony (cap toss, stage moment, or graduate walking — warm, celebratory feel; avoid focusing on parents/family in the shot, keep focus on graduates themselves)
> Whether it's a school, an institute, or a university — graduation day means hundreds of names to organize and the photos every graduate actually wants.
- **Pass** — Sorts every graduate into their category the moment they register.
- **Flow** — Checks each graduate in as they arrive, so staff always know who's present.
- **Face** — Delivers the graduate's own photo the moment the ceremony ends — no confusion with anyone else in the crowd.

**2. Competitions** — image: students/teams at a competitive event (robotics, academic, or similar — energetic, focused, diverse group)
> Dozens of teams, hundreds of participants from different schools or universities, and a schedule that can't afford to run late.
- **Pass** — Registers every team and participant with their category, sent out automatically ahead of time.
- **Flow** — Checks participants in fast, and confirms who's cleared for which round or session.
- **Face** — Sends every participant their own photos from the day — no digging through team group shots.

**3. Conferences & Talks** — image: conference audience or speaker on stage (professional, engaged audience, modern venue)
> Multiple sessions, speakers running on a schedule, and an audience that needs to be in the right room at the right time.
- **Pass** — Sends every attendee a ticket that matches their access level — general, speaker, or press.
- **Flow** — Confirms which session each guest is registered for, and directs them straight to their seat.
- **Face** — Captures every keynote and networking moment, delivered straight to each attendee afterward.

**4. Corporate Summits** — image: executives/business networking event (polished, professional setting, mixed formal attire)
> Executives, partners, and sponsors all in the same room — and every one of them expects to be treated like it matters.
- **Pass** — Issues branded tickets by category, so VIPs and general attendees are never mixed up.
- **Flow** — Flags VIP guests the moment they arrive, and tracks every badge and welcome kit.
- **Face** — Delivers professional event photos to every attendee — the kind they're proud to share on LinkedIn.

**5. Trade Shows & Exhibitions** — image: busy exhibition floor with booths (wide shot showing scale/crowd density)
> Thousands of visitors moving through the floor all day — and every exhibitor booth needs to know exactly who walked by.
- **Pass** — Issues digital badges to thousands of visitors and exhibitors, without a single printed list.
- **Flow** — Scans badges at any booth or entrance, instantly, with zero dedicated hardware.
- **Face** — Sends visitors their photos from the floor — a simple touch that keeps your event memorable.

**6. Weddings & Private Celebrations** — image: elegant wedding reception moment (warm lighting, celebratory, tasteful — not a specific couple's face, keep it feel-oriented rather than identifiable)
> A guest list that matters personally, and photos everyone wants the same night — not weeks later.
- **Pass** — Sends elegant, personalized invitations with a unique code for every guest.
- **Flow** — Confirms each guest at the door quietly and smoothly — no clipboard, no awkward waiting.
- **Face** — Gets every guest their own photos before the night even ends — no waiting on the photographer.

---

## Section 3 — Final CTA

**H2:**
```
Don't see your event type listed?
```

**Subhead:**
```
idexi adapts to almost any live event. Tell us about yours, and we'll show you exactly how it fits.
```

**Button:** Book a Demo (site-wide style)

---

## IMAGE SOURCING — important note for Saif

None of the 6 images are real photos from idexi's own events. They should be professional, high-quality stock photography (e.g. from Unsplash or Pexels, both free for commercial use) or licensed stock imagery — NOT AI-generated, NOT scraped from random editorial/news sites without checking license terms first. Descriptions of the ideal image for each category are included above next to each category heading. Prioritize images that look authentic and warm rather than overly generic corporate stock photography.

## Technical notes for Saif
- The category grid and content panel should be built as a single component with 6 data entries (title, intro, image, 3 bullets) — swapping content on click, not 6 separate hidden/shown DOM sections, to keep it lightweight.
- No URL/routing change needed when switching categories — this should feel instant, client-side only (no page reload).
- Consider adding the category name as a URL hash (e.g. /use-cases#weddings) so a specific category can be linked to directly, though this is a nice-to-have, not required for launch.
