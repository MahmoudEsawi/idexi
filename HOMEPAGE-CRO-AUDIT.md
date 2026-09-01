# Home Page Conversion Audit

Business and CRO review of the idexi home page as implemented on `feat/spec-phased-implementation`.

Framework: `page-cro` (coreyhaines31/marketingskills, 46K stars). Companion documents: `SPEC-GAP-ANALYSIS.md` for the spec review, `master-prompt.md` for the implementation plan.

Status: consultation only. No code was written or modified for this report.

---

## Verdict in one line

The page is roughly 40% too long, tells its story twice in the middle, and has no customer voice anywhere on it.

---

## Conversion Readiness Score: 64 / 100

**Low Readiness.** Foundational problems limit conversions.

| Category | Score | Verdict |
|---|---|---|
| Value Proposition Clarity | 20 / 25 | Strong headline, weak differentiation |
| Conversion Goal Focus | 11 / 20 | One goal, but a long and leaky path to it |
| Traffic to Message Match | 11 / 15 | Dual-audience handling is genuinely good |
| Trust and Credibility | 8 / 15 | Worst category. Zero testimonials |
| Friction and UX Barriers | 9 / 15 | Technically clean, structurally too long |
| Objection Handling | 5 / 10 | Price and risk barely addressed |
| **Total** | **64 / 100** | **Low Readiness** |

A score below 70 means A/B testing is not recommended yet. Testing a page with structural problems optimizes the wrong thing. Fix fundamentals first.

### Where the points went

**Value proposition (20/25).** "Tickets Sent. Guests Scanned. Photos Delivered." is a genuinely strong headline: concrete, specific, and it mirrors the three products in order. The subhead earns its place. Points lost because the actual moat, that one guest record moves through all three products with nothing re-entered, is never stated above the fold. It appears as a section heading at screen 6.

**Conversion goal focus (11/20).** The primary CTA is singular and consistent site-wide, which is right. But there are only two CTA instances in the body flow, at screens 1 and 12, and five outbound links in between. The secondary hero CTA sends people off-page at the single highest-attention moment on the site.

**Traffic to message match (11/15).** Cannot be fully scored without traffic data. The dual-audience problem, organizers buying versus attendees hunting for photos, is handled well: the header link serves attendees without polluting the organizer funnel.

**Trust and credibility (8/15).** Three real named events with attendee counts is good and it appears early. But there is not a single customer quote, named person, or human voice anywhere on the page. For B2B this is the largest single gap in the audit.

**Friction and UX (9/15).** The form is five fields, all necessary, with a honeypot and real validation. Technically the page is clean: no horizontal overflow at any breakpoint, reduced motion handled, mobile verified. The friction is structural, not technical. It is the length.

**Objection handling (5/10).** Price appears once, in a checklist, at screen 10. There is no guarantee, no trial, and no risk-reversal language until the CTA subhead. The FAQ content that would handle objections lives on a separate page. The home page surfaces none of it.

---

## Part 1: Redundancies to merge

### R1. AIEnginesSection and DifferenceBand

**Severity: high. This is the clearest problem on the page.**

Sections 4 and 5 sit back to back and are both three-column Pass, Flow, Face explainers with a link out. A visitor reads the product lineup twice in a row.

This one is mine. `DifferenceBand` was added while `AIEnginesSection` already occupied that job, and the collision was missed because the work was audited against the spec rather than against the page flow.

**Recommendation:** merge into a single product band. Keep the `AIEnginesSection` visual identity (icons, per-product accent colors, bespoke cards) and adopt the `DifferenceBand` copy plus its "See what changes" links into the service page comparison tables. Delete `DifferenceBand`.

**Saves roughly one screen** and removes a "did I just read this?" moment at the exact point the visitor is deciding whether to keep scrolling.

### R2. Quick Proof Bar and Why Organizers Choose

**Severity: medium.**

"Under 5 min, ticket delivery" in section 3 and "All your tickets delivered in under 5 minutes" in section 10 are the same claim in nearly the same words. Privacy and photo delivery also appear in both.

Do not merge the sections. Stating a claim early and recapping it before the ask is a legitimate bookend pattern and both positions earn their place.

**Recommendation:** de-duplicate the copy instead. Make the top bar carry the statistics and the closing checklist carry the objections: the $199 entry price, no hardware to buy, nothing for guests to install. Right now the closing checklist wastes its position restating what the visitor already read at screen 2.

### R3. Three routes to one destination

**Severity: medium.**

"See How It Works" in the hero, "See exactly how it works" at the end of Trusted By, and the lifecycle stepper itself. Within the first two screens the page offers two separate ways to leave for the same content.

**Recommendation:** cut the Trusted By link. The hero CTA already covers that intent, and sending traffic off-page at screen 2 of a twelve-screen funnel works against the page's only goal.

---

## Part 2: Bloat to remove

### B1. OurStorySection

**Severity: high. Highest-confidence removal in this audit.**

The founder story and team photos sit at section 9, between Use Cases and the closing pitch. That is the warmest part of the funnel: a visitor who has scrolled eight screens is qualified and moving toward the form. The page stops them to read about two AI graduates in Amman.

It is also fully duplicated by `/about`, which tells the same story with more room and better context.

Founder stories convert in one place: the About page, for the visitor who went looking for it. They do not convert in the closing stretch of a lead generation page.

**Recommendation:** remove from the home page. It already lives at `/about`.

**Saves roughly 1.5 screens** and removes a momentum break immediately before the ask.

### B2. Problem section, ten cards down to five or six

**Severity: medium to high.**

Pain-first is the correct structure and these are the best-written lines on the site. The problem is volume. Ten sequential cards across three scroll-pinned screens is a tax almost nobody pays in full. Realistically a visitor absorbs three or four and then either nods or leaves, so cards five through ten buy very little additional persuasion for about 1.5 screens of scroll.

Several also restate each other. "Wrong ticket category" and "wrong person into the VIP area" are both access-control failures. "Ran out of welcome kits" and "scanner died mid-check-in" are both operational chaos.

**Recommendation:** keep the five that each own a distinct product or a distinct buyer fear.

| Keep | Why it earns its place |
|---|---|
| The line of two hundred at the door | Flow, and the most visceral image in the set |
| The screenshotted ticket used twice | Pass, and a direct revenue loss |
| The guest still emailing about photos three days later | Face |
| The sponsor asking why their logo was not seen | Sponsor revenue |
| Sitting down afterward with no idea who showed up | Data and reporting |

**Saves roughly 1.2 screens** with almost no loss of emotional force.

### B3. Sponsors section

**Severity: medium. Demote rather than delete.**

A full colored band with a three-stage animation and a counter, at section 7, sitting in the middle of the product story.

The business question is whether sponsor visibility is a reason to buy or a reason to feel good after buying. For most organizers choosing a check-in and photo system, it is the second one. It is a differentiator you close with, not one you lead with.

There is a real exception worth naming: for events funded by sponsors, this is the ROI case the organizer takes to their own management. That makes it a closing argument, which is an argument about placement rather than existence.

**Recommendation:** move it after Use Cases, or compress it from a full animated band to a compact three-column block. Do not leave it between the product explanation and the proof.

### B4. Hero eyebrow

**Severity: low.**

"Intelligent Event Solutions" is a category label sitting above the strongest asset on the page. It delays the headline by one line and gives the visitor nothing to act on. Free to cut.

---

## Part 3: What is missing

This was outside the two questions asked, but it outranks most of what is above.

**1. There are no testimonials.** Not one customer quote, named person, or human voice on the entire page. You have three real named events already on it. A single sentence from the TEDx PHU organizer, with a name and a face, would outperform half the sections currently on this page. The trust score of 8/15 is almost entirely explained by this one absence.

**2. There is no mid-page CTA.** Roughly twelve screens, two CTAs, both at the extremes. A visitor convinced at screen 5 has to scroll six more screens or scroll back up to act. Add one after the product band.

**3. Price is buried.** The $199 figure appears once, in a checklist, at screen 10. For a per-event purchase this is a primary qualifying question, not a footnote. Surfacing "from $199 per event" at or near the hero filters out unqualified traffic and reduces anxiety for qualified traffic at the same time.

---

## Target structure

From 11 sections and about 11.8 screens, to 8 sections and about 7 screens.

| # | Section | Change |
|---|---|---|
| 1 | Hero | Add price anchor, remove eyebrow |
| 2 | Trusted By and Proof Bar | Remove outbound link |
| 3 | Problem | Ten cards down to six |
| 4 | Products (merged) | Add mid-page CTA |
| 5 | How It Works | Unchanged |
| 6 | Use Cases | Unchanged |
| 7 | Testimonial | New, or Sponsors demoted into this slot |
| 8 | Why organizers, then the form | De-duplicated copy |

Removed: `OurStorySection`, `DifferenceBand`.
Trimmed: Problem section.
Added: a testimonial, a mid-page CTA.

The result is a page about 40% shorter that carries more proof and offers more places to convert.

---

## Two recommendations reverse decisions already taken

Flagging these rather than burying them, because both are the project owner's call and not mine.

**Trimming the Problem section contradicts the master spec**, which specifies all ten pain points, and that count was already approved. The CRO read says ten is too many for the position it occupies. The spec author's read was that ten tells the story properly. Both are defensible; this is a judgment call.

**Removing `OurStorySection` breaks the standing rule** that existing sections receive content changes only. This is a structural removal of a shipped section, which is a larger action than anything authorized so far in this project. It is recommended here, not performed.

---

## What not to do yet

Do not run A/B tests on this page. At 64/100 the constraints are structural: page length, a duplicated product section, and missing social proof. A test would measure variations of a page whose main problem is its shape. Fix the structure, re-score, and test once the page clears 70.
