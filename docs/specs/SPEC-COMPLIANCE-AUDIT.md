# idexi — Spec Compliance Audit

**Reference:** `idexi-MASTER-SPEC.md` (311 lines, "Approved, ready for development")
**Audited:** Home `/`, `/how-it-works`, `/use-cases`, plus global Header/Footer and the routes that absorbed spec content
**Method:** rendered DOM inspection at 1440px + source cross-reference
**Date:** 2 September 2026
**Branch:** `feat/spec-phased-implementation`
**Code changed during this audit:** none

---

## Executive summary

11 of 11 home sections accounted for. **9 shipped in place, 2 relocated, 1 removed.** No spec section was silently dropped.

Relative section order is **100% preserved** — every deviation is a merge, a relocation, or an addition, never a reshuffle.

| Metric | Result |
|---|---|
| Spec sections implemented in place | 9 / 11 |
| Spec sections relocated to another surface | 2 (§5 tables, §9 FAQ) |
| Spec sections removed outright | 1 (§9 floating widget) |
| Sections reordered | **0** |
| Em dashes in rendered copy | **0** across all four pages |
| Factual claims altered | **0** |
| Unintentional omissions found | 3 (§1.3 items 1, 3, 7) |

---

## 1. Implementation Status

### 1.1 Header (Global)

| Spec item | Status | Notes |
|---|---|---|
| Sticky header | Implemented | |
| Mega menu, Column 1 (3 products + sublabels) | Implemented | Verbatim |
| Mega menu, Column 2 (3 Learn links + sublabels) | Implemented | Verbatim |
| "Where's My Photo?" ghost button | Implemented | Lighter weight than Book a Demo, as specified |
| "Book a Demo" solid CTA | Implemented | |
| Mobile hamburger < 768px, CTA stays outside | Implemented | |
| Nav label **"Platform ▾"** | **Changed** | Renders as **"Services ▾"** |
| — | **Added** | A **"Home"** nav item (not in spec) |
| — | **Added** | **Light/dark theme toggle** (not in spec) |

### 1.2 Home Page — section by section

| § | Spec section | Status | What happened |
|---|---|---|---|
| 1 | Hero | Partial | H1, buttons, subhead present. **Eyebrow missing.** Price anchor added. |
| 2 | Trusted By | Reworked | Content present, layout and subhead replaced, closing link removed |
| 3 | Quick Proof Bar | Merged | Copy verbatim, absorbed into §2 |
| 4 | The Problem | Trimmed | **10 items → 5**, carousel → scroll stack |
| 5 | The idexi Difference | Split | Heading replaced; **3 tables relocated to service pages** |
| 6 | How It Works | Implemented | All content verbatim; timing and connector differ |
| 7 | Sponsors | Implemented | All copy verbatim; **purple background removed** |
| 8 | Use Cases | Reworked | Grid → accordion; heading/subhead absent on home; 4 of 6 labels renamed |
| 9 | Common Questions | **Removed from home** | Widget rejected; 11 Q&As live at `/faqs` |
| 10 | Why organizers choose idexi | Merged | Heading dropped, 5 items folded into §11 |
| 11 | Final CTA | Implemented | Form matches spec exactly |

### 1.3 MISSING or SKIPPED — the explicit list

#### 1. Hero eyebrow — "INTELLIGENT EVENT SOLUTIONS" — MISSING

Not rendered anywhere on the page. It survives only in the `<title>` metadata.

**Reasoning:** This looks like an **unintentional omission**, not a decision. Isolated uppercase eyebrow chips above an H1 are a flagged generated-UI pattern and were deliberately removed from the *service* pages (there is a code comment saying so) — but the same treatment appears to have been applied to the hero without it being called out. Every other section kept its eyebrow (`HOW IT WORKS` renders correctly).

> This is the one finding classed as a genuine defect rather than a trade-off.

#### 2. Section 9 — Floating Common Questions widget — REMOVED

No fixed bottom-left element exists on any page. Verified by scanning computed styles for `position: fixed` near the bottom-left — zero matches.

**Reasoning:** **Explicitly rejected at project kickoff**, in favour of updating `/faqs`. All 11 Q&As are present there, verbatim, grouped into three categories, reachable from the footer's "Common Questions" link. The spec's "floating button clearance" requirement is therefore moot.

#### 3. Homepage inline nudge — "Still have a question? Ask here →" — MISSING

Absent. Confirmed by full-body text search.

**Reasoning:** Collateral damage from #2 — the nudge's only defined behaviour was "opens the same floating widget," which no longer exists. **This one was not consciously re-decided.** It could be restored as a plain text link to `/faqs` between the checklist and the form, which is where the spec wanted it and where it would still do its job.

#### 4. Problem items 3, 4, 5, 6 and 8 (five of ten) — DROPPED

Dropped: wrong ticket category, VIP area breach, welcome kits running out, scanner dying, guests scrolling strangers' photos.

**Reasoning:** **Approved CRO decision.** Ten sequential pain cards was the single largest scroll block on the page. The counter honestly reads `01 / 05`. Note that item 8 was not lost — it resurfaces verbatim as the hover objection on the idexi Face card in §5.

#### 5. Section 2 closing link — "See exactly how it works →" — REMOVED

**Reasoning:** **Directed during the logo-row rework** — it was leaking traffic out of the funnel at the top of the page, before any value had been established.

#### 6. Section 7 purple/lavender background tint — REMOVED

The Sponsors section renders on `--st-background` (`#edf0ff`), identical to the sections around it. Verified: computed `background-color` of `#sponsors` equals `body`'s.

**Reasoning:** **Directed** — the tint read as "default AI template purple." Purple survives as a restrained accent inside the section (the sponsor cover plate, index numerals, marker rule), which preserves the spec's *intent* (visual distinctiveness at the sponsor touchpoint) while dropping its *mechanism*.

> This is the largest single departure from the spec's stated design direction and should be a conscious sign-off.

#### 7. Section 8 heading and subhead on the home page — MISSING

"Built for every kind of event." and "Find your event below, and see exactly how idexi fits it." do not appear on `/`. The only `<h2>` in that block is the active accordion card's title.

**Reasoning:** A consequence of replacing the 6-card grid with the horizontal accordion, whose active panel title occupies the heading slot. Both strings **do** appear on `/use-cases` (H1 + intro). The home block is now unlabelled, which is a real information-architecture gap — a visitor scrolling past sees six event categories with no sentence telling them what they are looking at.

#### 8. Section 5's three comparison tables — RELOCATED, not missing

All 15 rows exist verbatim in `ServiceComparison.tsx`, rendered on `/services/pass`, `/services/flow`, `/services/face`.

**Reasoning:** **Decided in response to a blocking question.** Each table is entirely about one product, and the service pages had no old-way/with-idexi framing at all. The home page retains the concept via three hover objection/answer pairs on the product cards, each linking through.

#### 9. Section 10 heading — "Why organizers choose idexi" — MERGED AWAY

The H2 is gone; all five checklist items render inside the Final CTA block.

**Reasoning:** **Approved CRO decision.** The spec itself says §10 and the §9 nudge "function as one final reassurance moment" — merging into the CTA honours that intent more literally than a separate section did. Item 5 (`$199`) was additionally promoted into the hero as a price anchor.

### 1.4 Successfully implemented — verified verbatim

- **§1** H1 exact. Both CTAs, correct hierarchy.
- **§2** H2 exact. All three events with correct attendee badges (Arab Robotics 300 / IEEE AESS 150 / TEDx PHU 300) plus the faded "More added regularly" placeholder.
- **§3** All three stat/label pairs exact. Correct product colour mapping. **Stagger is exactly the specified 0/120/240ms** (`transitionDelay: i * 120ms`).
- **§4** H2 exact. All five surviving items word-for-word.
- **§5** Subhead exact. All 15 table rows exact (one punctuation edit, see §2.2).
- **§6** Eyebrow exact. All four stages — label, sublabel, colour, active caption — exact. **Both** closing lines present, including "Guests never search…".
- **§7** H2, subhead, all three label/sublabel/caption triples, the stat callout and the body line all exact. The "sponsor cover = one reusable design, applied identically across all 3 touchpoints" note is honoured architecturally: one `SponsorCover` component reused at three scales, mounted continuously so it never remounts. Counter animates 0→3,000 once on scroll-into-view over 1.8s, exactly as specified. **"3-day event" correctly absent.**
- **§8** The "do NOT reference real events here" rule is honoured on both surfaces.
- **§9** All 11 Q&As on `/faqs`, verbatim including the 99% accuracy and 30-day deletion claims.
- **§10** All five checklist items verbatim.
- **§11** H2 exact. **All five fields in the exact spec order**, all 10 dropdown options verbatim, inline success ("Thanks, we'll be in touch.") with no redirect.
- **Footer** All four columns, correct link targets, © 2026, phone, Amman. The critical two-privacy-page distinction is honoured — `/privacy-security` and `/privacy-policy` both exist and are separate.
- **Global** Primary CTA colour identical site-wide. Blue/Teal/Coral product mapping consistent across §3, §5 and §6.

### 1.5 Added beyond spec

| Addition | Where |
|---|---|
| `IntroStrobeLoader` splash | Home, on load |
| `HeroKineticPhotos` moodboard | Hero right column |
| `OurStorySection` (founder bios) | Between §8 and §11 |
| Theme toggle (light/dark) | Header |
| Footer "Social Links" 5th column | Footer |
| Honeypot field (`cta-website`) | Contact form |
| 7 routes | `/about`, `/pricing`, `/faqs`, `/terms`, `/privacy-policy`, `/privacy-security`, `/services/*` |

### 1.6 Two spec conflicts requiring a ruling

#### A. Purple is self-contradictory in the spec

- Global note: *"Purple is reserved exclusively for the Sponsors section — never reused elsewhere."*
- §6 table: *"Stage 4 | Delivered | To their inbox | **Purple**"*

These cannot both hold. The build follows §6 — stage 4 uses `--st-sponsor`. "Purple: Keep" for stage 4 was confirmed earlier. Flagged so the partner knows the global note is now inaccurate as written.

#### B. One evergreen-rule violation

The spec's evergreen rule bans hardcoded totals outside the Trusted By cards and the 3,000 figure. `EventProofSection.tsx:355` renders:

> *"We have run **three events so far**, and every one of them is on this chart."*

That sentence needs a manual edit the moment a fourth event ships. It is a deliberate credibility line — it is what makes the chart honest rather than boastful — but it is technically non-evergreen and will rot.

---

## 2. Content & Copy Fidelity

### 2.1 Confirmations

**Em dashes: zero.** The rendered HTML of `/`, `/how-it-works`, `/use-cases` and `/faqs` was fetched, `<script>` and `<style>` stripped, and `—` counted.

**Result: 0 on all four pages.** 67 em dashes remain in the codebase — every one is inside a `/* code comment */`, never in user-facing copy. En dashes: 0.

**Core messaging intact.** No factual claim, number or promise was altered. Spot-verified:

| Claim | Status |
|---|---|
| Under 5 minutes | intact |
| 150 to 3,000+ | intact |
| 100% guest privacy | intact |
| 99% AI accuracy | intact |
| 30-day deletion | intact |
| $199 per event | intact |
| 300 / 300 / 150 attendee badges | intact |
| 3,000 counter target | intact |
| "One encrypted QR, one entry only" | intact |
| OTP-gated galleries | intact |

### 2.2 Humanizer pass — what types of change were made

Four mechanical categories, all style-only:

| Type | Example |
|---|---|
| **Em dash → comma** | `One system, three moments — handled automatically` → `One system, three moments, handled automatically` |
| **Em dash → period (sentence split)** | `From ticket to photo — under 5 minutes` → `From ticket to photo. Under 5 minutes` |
| **Em dash → conjunction** | `no commitment, no pressure` → `with no commitment and no pressure` |
| **List conjunction added** | `VIP, general, press, staff — built in` → `VIP, general, press and staff, all built in` |

Five user-facing em dashes were removed in total. Two more appear in shipped copy paths as sentence splits:

- `Finally — graduates get` → `Finally, graduates get`
- `open your phone — your photos` → `open your phone. Your photos`

**In every case the proposition is identical.** Nothing was hedged, softened or re-scoped.

### 2.3 Deviations that are NOT the humanizer — content rewrites

Five places where the text genuinely differs in substance. These deserve partner sign-off:

| Location | Spec | Shipped |
|---|---|---|
| **§2 subhead** | "A growing list of events already running on idexi." | "Pick an event to see what its door actually did." |
| **§5 H2** | "The idexi Difference" | "Three products, one guest record" |
| **§5 summary sentences** | 3 first-person product promises | Rewritten as third-person product descriptions |
| **Footer brand line** | "Intelligent Event Solutions — smart ticketing, access control, and AI photo delivery for every live event." | "AI-powered check-in, access control, and photo delivery for live events." |
| **Footer email** | `tryidexi@gmail.com` | `info@idexi.tech` *(approved)* |

> The §2 subhead swap is the one to flag hardest: the spec explicitly annotates it *"Evergreen wording — never edit"*, and it was edited. The replacement is an interaction instruction, not a positioning statement, so the "growing list" reassurance is now unsaid anywhere on the page.

Additionally, **the home-page use-case card copy is rewritten**, not humanized — six shortened one-liners replace the spec's hooks. The **spec's exact hooks survive verbatim on `/use-cases`**, so nothing is lost, but the home page no longer carries the partner's wording.

---

## 3. Structural Alignment & Ordering

### 3.1 Sequence comparison

| Spec order | Rendered order | Verdict |
|---|---|---|
| 1 Hero | 1 Hero | in place |
| 2 Trusted By | 2 `EventProofSection` | **§2 + §3 merged** |
| 3 Quick Proof Bar | *(inside §2)* | merged |
| 4 The Problem | 3 `ProblemSection` | in place |
| 5 The idexi Difference | 4 `AIEnginesSection` | in place |
| 6 How It Works | 5 `EventLifecycleSection` | in place |
| 7 Sponsors | 6 `SponsorsSection` | in place |
| 8 Use Cases | 7 `VenueAccordion` | in place |
| — | 8 `OurStorySection` | **inserted** |
| 9 Common Questions | *(relocated to `/faqs`)* | removed |
| 10 Why organizers | 9 `CtaSection` | **§10 + §11 merged** |
| 11 Final CTA | *(same block)* | merged |

### 3.2 The direct answer

**Yes — the sections are in the exact same sequence as the spec.** Not a single section was moved relative to another. Every deviation is one of three non-reordering operations:

- **2 merges** (§2+§3, §10+§11)
- **1 removal** (§9 → `/faqs`)
- **1 insertion** (`OurStorySection`)

Net: **11 spec blocks → 9 rendered blocks.**

### 3.3 Rationale per deviation

#### Merge §2 + §3 — "Command Center"

The spec itself says §3 has *"No heading — flows directly from Trusted By."* It was already defined as a continuation, not a peer. Two separate `<section>` wrappers produced two full sets of vertical padding for one idea. The merge also solved a redundancy: both blocks were making credibility arguments to the same reader at the same scroll position.

**Cost:** §3's spec'd "three columns" reading is now visually subordinate to the throughput chart above it.

#### Merge §10 + §11 — final reassurance

Directly sanctioned by the spec's own annotation: *"Keep tight spacing to the question nudge line right after it — they function as one 'final reassurance' moment."* Merging is the strongest possible reading of that instruction. The checklist now sits immediately left of the form fields, so the five reasons are on screen while the user types.

**Cost:** the "Why organizers choose idexi" H2 no longer exists as a scannable landmark or anchor target.

#### Remove §9 from the page

The trade is a genuinely better FAQ surface (categorised, linkable, indexable, keyboard-accessible) against the loss of zero-navigation answers for attendees. The spec's "two audiences, one page" principle survives via the header "Where's My Photo?" button and the footer link — **two of the three paths the spec specified remain; the widget was the third.**

#### Insert `OurStorySection`

Not in the spec. Sits between Use Cases and the CTA. Rationale: an early-stage vendor asking for a demo benefits from founder faces before the form — it is the substitute for the testimonials the company correctly refuses to fabricate.

**This is the only structural addition and the one with the least spec backing.**

### 3.4 Layout mechanism changes (structure preserved, presentation differs)

| § | Spec called for | Shipped |
|---|---|---|
| 2 | Auto-fill logo-wall grid, `minmax(160px, 1fr)`, must scale to 20+ cards | 3-logo row + interactive throughput chart. **Will not reflow to 20+ without rework — the spec's explicit scalability requirement is not met.** |
| 4 | Manual carousel, arrows, dot indicators | Scroll-driven card stack, no arrows, no dots |
| 5 | 3 tabs → summary → 2-col table, all 5 rows visible | 3 cards with hover objection/answer; tables on service pages |
| 6 | Auto-advance ~1.4s, dashed connector lines | Auto-advance 5.5s, sliding rail marker |
| 7 | Auto-advance ~1.6s | Auto-advance 5.5s |
| 8 | 6-card grid, 3×2 desktop | 6-slat horizontal accordion |

**On the timings (§6, §7):** the spec's 1.4s/1.6s are shorter than it takes to read the captions they reveal, which would make both sections unreadable. 5.5s is a deliberate correction, applied consistently. Worth confirming with the partner rather than leaving as a silent override.

**On §8 category naming:** four of six labels were renamed on the home page:

| Spec | Home accordion | `/use-cases` |
|---|---|---|
| Graduations | Universities & Graduations | Graduations |
| Competitions | Competitions | Competitions |
| Conferences & Talks | Conferences & Expos | Conferences & Talks |
| Corporate Summits | Corporate Summits | Corporate Summits |
| Trade Shows & Exhibitions | Trade Shows & Exhibitions | Trade Shows & Exhibitions |
| Weddings & Private Celebrations | Gala & Private Events | Weddings & Private Celebrations |

`/use-cases` uses the spec names correctly. **The two surfaces now disagree on what four of the six categories are called**, which is a real consistency bug for anyone clicking through from a card to its panel.

### 3.5 `/how-it-works` and `/use-cases`

Both pages are **outside the spec's scope** — its subtitle is "Home Page + Header + Footer." They were built to fill the routes the spec's mega menu links to.

- **`/how-it-works`** — H1 derived from §6's H2. Reuses all four spec stages (label, sublabel, caption verbatim) and expands each with body copy. Both §6 closing lines present. **Faithful expansion, no conflicts.**
- **`/use-cases`** — H1 is §8's H2 (period dropped). All six panels in the spec's intentional academic → corporate → personal order, with **all six hooks verbatim** apart from em-dash removal. Intro is §8's subhead plus one added sentence. The "do not name real events" rule is honoured. **This page is the most spec-faithful surface in the build.**

---

## 4. Recommended actions, ranked

| # | Action | Type |
|---|---|---|
| 1 | **Restore the hero eyebrow** — likely an accidental omission, one line to fix | Defect |
| 2 | **Reconcile the four §8 category names** between the home accordion and `/use-cases` | Defect |
| 3 | **Give the home Use Cases block a heading** — it currently has none | Defect |
| 4 | **Restore the §9 nudge** as a plain link to `/faqs` | Gap |
| 5 | **Confirm §2's subhead replacement** with the partner — the spec marked that line "never edit" | Sign-off |
| 6 | **Confirm the removed purple background** and the 1.4s→5.5s timing override | Sign-off |
| 7 | **Decide on `EventProofSection`'s "three events so far"** — accept the maintenance cost or make it evergreen | Sign-off |
| 8 | **Note the §2 scalability gap** — the current logo row will not take 20+ events without a redesign | Future work |

---

*Audit produced without modifying application code. All findings verified against the rendered DOM, not inferred from source.*
