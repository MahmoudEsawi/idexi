# Spec vs. Shipped

**Gap Analysis — `idexi-MASTER-SPEC.md` vs. `main@f9f036a`**

> The spec is right about *what*. It's wrong about *how*.

Eighteen structural, interactive, and animation shifts, audited against the code that actually ships today. The copywriting and information architecture are a clear step up. Three specific interaction decisions would make the product measurably worse, and one of them would delete working code.

| | |
|---|---|
| **Scope** | Home · header · footer |
| **Reviewed** | 11 components · 7 routes · 349-node graph |
| **Code written** | None — analysis only |

---

## Where it lands

Ten of eighteen shifts are genuine improvements, and most of those are copy and structure rather than engineering. The problems cluster tightly in one place: motion and interaction specifics.

| Verdict | Count |
|---|---|
| ✅ Upgrade | 10 |
| ❌ Downgrade | 3 |
| ⚠️ Unnecessary complexity | 2 |
| ◻️ Decision required | 3 |

### Index

| # | Shift | Verdict |
|---|---|---|
| 01 | Mega menu | ⚠️ Unnecessary complexity |
| 02 | "Where's My Photo?" button | ✅ Upgrade |
| 03 | Hero headline | ✅ Upgrade |
| 04 | Trusted By | ✅ Upgrade |
| 05 | Quick Proof Bar + stagger | ✅ Upgrade |
| 06 | The Problem — 10-slide carousel | ❌ Downgrade |
| 07 | idexi Difference — tabs + table | ✅ Upgrade |
| 08 | How It Works — 1.4s auto-advance | ❌ Downgrade |
| 09 | Sponsors section + counter | ✅ Upgrade |
| 10 | Use Cases — 6-card grid | ✅ Upgrade |
| 11 | Floating questions widget | ⚠️ Unnecessary complexity |
| 12 | Why organizers choose | ✅ Upgrade |
| 13 | Final CTA form fields | ❌ Downgrade |
| 14 | Footer + contact bar | ✅ Upgrade |
| 15 | Product colour system | ✅ Upgrade |
| 16 | Our Story — silently deleted | ◻️ Decision required |
| 17 | Seven routes that don't exist | ◻️ Blocker |
| 18 | Intro loader — unaddressed | ◻️ Decision required |

---

## Item by item

### 01 · Mega menu under "Platform" — ⚠️ UNNECESSARY COMPLEXITY

**Now** — Single-column hover dropdown, 3 services. Has a padding "bridge" so the cursor can cross the trigger-to-menu gap, a 150 ms close delay, click-to-open for touch devices, and click-outside dismissal.

**Spec** — Two-column mega menu — Products (3) + Learn (3). Adds *Pricing* and *About* as new top-level items.

**Verdict** — Six links do not justify a mega menu. Mega menus earn their complexity somewhere north of 15–20 destinations, where a flat list becomes genuinely unscannable. At six, a two-column panel is a bigger surface holding the same information — more pixels, more hover area, more states to get right, no faster to parse.

The nav *restructure* is right, though, and I want to separate those two things. Promoting Pricing to top-level is correct — pricing is a top-3 destination for any B2B evaluator and burying it is a known conversion leak. Grouping "Learn" content is also sound thinking.

The sharper problem: four of the six mega-menu destinations don't exist. A menu whose primary purpose is to showcase depth, pointed at four 404s, is worse than the current honest three-item dropdown.

> **Recommendation** — Keep a single-column dropdown, extend it to the six items, and preserve the existing hover-bridge and touch-toggle logic — that behaviour was hard-won and the spec doesn't acknowledge it exists. Build the mega menu later, if and when the Learn pages ship and the nav actually outgrows a list.

---

### 02 · "Where's My Photo?" in the header — ✅ UPGRADE

**Now** — *Net-new.* Nothing on the site serves an attendee looking for their photos — every path assumes a B2B organiser.

**Spec** — Persistent ghost/outline button in the header, camera icon, links to an external guest gallery tool. Repeated in the footer Support column.

**Verdict** — **The single strongest idea in the document.** It resolves a real structural conflict: two completely different audiences hit this domain, and right now one of them is invisible to the design. An attendee who was told "your photos are on idexi" currently has to scroll a sales funnel to find nothing useful.

The visual-weight instruction — lighter than Book a Demo, always — is exactly the right call, and the spec is disciplined for stating it as an absolute. It keeps the attendee path discoverable without letting it compete with the conversion action.

One dependency the spec doesn't flag: this button is only as good as the tool behind it. Shipping it before the gallery lookup exists creates a dead end at the exact moment an attendee is most motivated.

---

### 03 · Hero headline — ✅ UPGRADE

**Now** — "Intelligent Event Solutions." / "Frictionless event flow, entry, and instant photo sorting." Paired with an animated kinetic photo collage.

**Spec** — "Tickets Sent. Guests Scanned. Photos Delivered." / "One system, three moments — handled automatically, from the first click to the last photo."

**Verdict** — The current H1 is a category label, not a value proposition. "Intelligent Event Solutions" could sit on a hundred companies' sites and tells a visitor nothing about what happens if they buy.

The spec's headline does three jobs at once: it's concrete, it's three-beat and scannable in about a second, and it structurally mirrors Pass → Flow → Face so the product architecture is absorbed before the reader has consciously learned the product names. That's genuinely good copywriting, not just different copywriting.

> **Watch out** — The spec is silent on the kinetic photo hero visual that currently ships. Silence is not deletion — confirm whether it stays. It's one of the more distinctive assets on the site and losing it by omission would be a shame.

---

### 04 · Trusted By — ✅ UPGRADE

**Now** — *Net-new.* Zero social proof anywhere on the site. No named clients, no logos, no event history.

**Spec** — Auto-filling logo grid. Three named events with attendee badges (Arab Robotics 300 · IEEE AESS 150 · TEDx PHU 300) plus a faded "More added regularly" placeholder.

**Verdict** — Highest business ROI of anything in the spec. Going from zero named customers to three real ones with recognisable institutional names is the difference between "a landing page" and "a company." For a young vendor asking organisers to trust them with guest biometrics, this isn't decoration — it's the precondition for the rest of the page being believed.

The evergreen-wording rule is genuinely disciplined thinking, and I'd extend it as a principle beyond this section. It's also worth noting the spec quietly kills the inflated stats that used to be on this site ("2.4M+ photos", "120+ global partners") in favour of honest capability claims. Those are already gone from the code, and the spec's rule makes sure they don't come back. Right call — those numbers were indefensible next to three events.

> **Open question** — Three logos also broadcasts "three customers." The faded placeholder is honest but draws attention to the gap. Consider whether attendee badges alone carry it until there are 6+ cards.

---

### 05 · Quick Proof Bar, staggered 0 / 120 / 240 ms — ✅ UPGRADE

**Now** — *Net-new as content.* The staggered-reveal *mechanism* already exists — `--stagger-idx` drives it in `AIEnginesSection`, `EventLifecycleSection` and `Footer`.

**Spec** — Three columns, no heading, staggered fade-in at 0/120/240 ms. Under 5 min · Any event size · 100% guest privacy.

**Verdict** — Cheapest win in the entire document. The animation pattern the spec asks for is already implemented and already respects `prefers-reduced-motion` — this is new copy dropped into infrastructure that exists. Near-zero engineering risk.

The content choice is smart too: three capability claims that never need updating, colour-coded to the three products, immediately after social proof. Claim → proof → claim is a solid funnel rhythm.

120 ms between columns is a well-judged interval — enough to read as sequential, short enough that the third column isn't still animating when the eye reaches it.

---

### 06 · The Problem — a 10-slide manual carousel — ❌ DOWNGRADE

**Now** — *Net-new.* No problem-statement section exists.

**Spec** — Manual carousel, arrows only (no auto-play), "01 / 10" counter above, dot indicators below. Ten pain-point scenarios.

**Verdict** — **The content here is the best writing in the spec. The container actively destroys it.**

Those ten scenarios are specific, concrete and uncomfortably recognisable to anyone who has run an event — the printed sheet at the door, the screenshotted ticket, the guest emailing three days later about photos. That's persuasion doing real work. Then the spec puts nine of them behind arrow clicks.

- **Carousel engagement past the first slide is famously dismal.** Realistically a large majority of visitors see slide 01 and move on. You will have written ten excellent pain points and shipped one.
- **The "01 / 10" counter makes it worse.** It tells the reader upfront that there are nine more clicks. That reads as a chore, not an invitation.
- **Manual-only means it needs deliberate effort.** Removing auto-play was the right instinct for accessibility, but it means nothing advances unless the visitor works for it. Nobody works for marketing copy.
- **It's internally inconsistent.** Section 5 explicitly specifies "all 5 rows visible at once, no click-through" — the spec already knows hiding comparison content is bad. Section 4 contradicts that reasoning.

> **Recommendation** — Keep all ten. Show all ten — a compact two-column list or a tight grid, each item one line, the whole section skimmable in about fifteen seconds. Cumulative recognition is the entire mechanism here: the reader should be nodding by item four and sold by item eight. That effect only exists if they can see items four through eight.

---

### 07 · The idexi Difference — 3 tabs + comparison table — ✅ UPGRADE

**Now** — `AIEnginesSection` — three cards with 3D isometric CSS cubes, an isometric grid ground, and a hover state that cross-fades into a simulated chat exchange.

**Spec** — Three tabs (Pass default) → summary sentence → two-column old-way / with-idexi table, all five rows visible, "With idexi" column recoloured per product.

**Verdict** — **Upgrade on selling, downgrade on craft.** Both halves of that are real.

The old-way/new-way table is a far stronger persuasion device than three feature cards. It does the reframing work for the reader instead of asking them to infer value from a feature list, and "Screenshotted tickets get reused → One encrypted QR, one entry only" lands harder than any card copy currently on the site. Fifteen concrete before/afters is a lot of argument for very little screen real estate.

What's lost is personality. The 3D cubes are one of the few genuinely distinctive visual moments on the site — they're memorable in a way a comparison table structurally cannot be. Replacing them wholesale trades character for clarity.

> **Recommendation** — Take the tabs and the table. Keep the cubes as the tab affordance rather than deleting them — a small isometric cube per tab, recoloured to its product. You get the conversion structure and keep the signature.

---

### 08 · How It Works — auto-advance every 1.4 s — ❌ DOWNGRADE

**Now** — `EventLifecycleSection`: 4 steps at 5,500 ms, scroll-spy gated so it doesn't run offscreen, click-to-override, a visible progress-bar countdown, and four bespoke product widgets (flipping ticket, QR scan, logistics timeline, gallery delivery).

**Spec** — 4 stages, one "glowing" at a time, advances every ~1.4 s, loops continuously, dashed connector lines between stages.

**Verdict** — **The most severe technical regression in the document, and the one I'd push back on hardest.**

1.4 seconds is not enough time to read a caption. "AI finds every face, every photo" plus registering the accompanying visual is realistically a 2.5–3 second operation. At 1.4 s the viewer gets flicker where comprehension was intended — and the full loop completes in 5.6 s, so it will cycle roughly ten times while someone reads the surrounding section. That's not an explainer, it's a distraction sitting next to your copy.

The existing 5,500 ms is not an arbitrary number to be overwritten. It's paced for reading, and the progress bar makes the pacing legible so the motion feels intentional rather than restless.

The capability gap is the bigger loss. The current implementation has scroll-spy gating, manual override, reduced-motion handling, and four detailed product visualisations. The spec's version has none of that — it replaces four bespoke widgets with generic glowing nodes. That is throwing away the most substantial interactive asset on the site in exchange for something strictly simpler and worse.

> **Recommendation** — Keep the component. Adopt the spec's *copy* — the stage labels and captions are tighter than what's there now — and add the dashed connector lines, which are a genuine visual improvement. Leave the timing alone. If it must come down, 3,500 ms is the floor, not 1,400.

---

### 09 · Sponsors section + 0 → 3,000 counter — ✅ UPGRADE

**Now** — *Net-new.* Sponsor value is mentioned nowhere on the site.

**Spec** — Purple-tinted section (the only coloured background on the page), 3-stage auto-play at ~1.6 s, plus a stat box with a counter animating 0→3,000 once on scroll-into-view over ~1.8 s.

**Verdict** — Strong business instinct. Sponsor ROI is a real lever for event organisers — often the line item that justifies their budget — and addressing it directly is smart B2B positioning that nothing currently touches.

The counter spec is well-judged: once, on scroll-in, 1.8 s. That's a moment, not an ambient effect.

Two real problems, though. First, **a direct token conflict**: purple is currently `--accent-flow: #7b5cfa`. "Purple reserved exclusively for sponsors" and "Flow is purple" cannot both be true. Second, **motion fatigue** — this puts a second auto-playing multi-stage animation immediately after Section 6's auto-playing multi-stage animation. Two consecutive sections that move on their own start to feel like a screensaver.

> **Recommendation** — Resolve the purple conflict explicitly before build (see item 15). Consider making this one static or scroll-driven rather than a second auto-player.

---

### 10 · Use Cases — 6-card grid — ✅ UPGRADE

**Now** — `VenueAccordion` — 5 venue types as a horizontal image accordion. Four are collapsed to narrow vertical slivers with 90°-rotated captions; one is expanded.

**Spec** — Six cards in a 3×2 grid, all visible. Order deliberately runs academic → corporate → personal.

**Verdict** — The grid wins on usability, and it isn't close. Rotated vertical text is genuinely hard to read, and the accordion means four of five use cases are effectively hidden at any moment. A visitor scanning for "does this fit *my* event" has to hunt; the grid answers in one glance.

The spec's copy is also markedly better. "Finally — graduates get their photos the moment they walk off stage" is written from the customer's emotional position. The current "Handle graduation crowds and get every student their photos" is written from the vendor's feature list.

Being honest about the cost: the accordion is prettier, more distinctive, and took real engineering to get right — the width animation had to be rebuilt to avoid layout thrash. Sunk cost isn't a reason to keep it, but the site does get slightly more generic when it goes.

> **Recommendation** — Take the grid, but put the accordion's venue photography inside the cards. Image cards, not text cards — keeps the visual richness while gaining the scannability.

---

### 11 · Floating Common Questions widget — ⚠️ UNNECESSARY COMPLEXITY

**Now** — `/faqs` — a static, indexable page with 13 Q&As in three categories, built on native `<details>`. Works without JavaScript.

**Spec** — Fixed bottom-left chat-bubble button on every page. Panel shows 4 questions, "See 7 more" reveals the rest, answers appear as chat-style bubbles.

**Verdict** — **The content is an upgrade. The container is a mistake.** These should be separated.

The 11 Q&As are much stronger than what's live — specific and honest where the current set is hedged. "Accurate 99% of the time, and guests can flag it" and "automatically deleted 30 days after the event" are the kind of concrete answers that actually resolve objections. Take all of that.

- **A chat bubble that isn't chat is a broken promise.** A floating bubble in a screen corner has one universally-learned meaning: live support. Opening it to find a canned FAQ list is a small betrayal, and it costs goodwill at the exact moment someone had a question.
- **The SEO cost is real and permanent.** Eleven high-intent questions — "will my guests' photos be public", "what happens to our data" — are search traffic. Sealed inside a JS widget, they're invisible to search, unlinkable, and unshareable. That is giving up a genuine acquisition asset for an interaction pattern.
- **Bottom-left is the wrong corner.** Bottom-right is the near-universal convention; bottom-left is where cookie banners and back-to-top controls live. The spec itself flags the footer-overlap problem, which is a signal that the pattern is fighting the layout.
- **It's a lot of surface for solved content.** Global mount, z-index management, footer clearance, focus trapping, ESC handling, mobile scroll-lock, ARIA dialog semantics. All of that to reproduce a page that already works.

> **Recommendation** — Move all 11 Q&As onto `/faqs` and keep it indexable. If a persistent affordance is wanted, make it a small labelled link — "Questions?" — not a chat bubble, and have it navigate rather than open a panel. The homepage inline nudge is a good idea; point it at the page.

---

### 12 · Why organizers choose idexi — ✅ UPGRADE

**Now** — *Net-new.* No recap section, and no pricing signal anywhere on the site.

**Spec** — Compact single-column checklist, max-width ~400px, five items — including "Plans starting at $199 per event."

**Verdict** — Cheap to build, disproportionately valuable. A three-second recap immediately before the form is a well-established pattern for good reason — it re-arms the reader with the argument right at the decision point.

The pricing line is the important part. Publishing a starting price is a strong qualifying signal: it filters out mismatched leads before they cost sales time, and it removes the "probably enterprise-priced, probably not for us" hesitation that kills small-organiser conversions silently. Most competitors hide this. Not hiding it is a competitive stance.

> **Dependency** — This is the only pricing mention in the whole spec, while the nav and footer both link to a `/pricing` page that doesn't exist. Either build the page or drop those links — a Pricing nav item that 404s is worse than no Pricing nav item.

---

### 13 · Final CTA — form fields — ❌ DOWNGRADE (current code is superior)

**Now** — Name · email · phone · company · solution · free-text "About Your Event", backed by a working server action: Zod validation, Resend delivery, honeypot spam trap, per-field errors, values echoed back on failure, reply-to set to the prospect.

**Spec** — Full name · email · phone · *Event type* dropdown · *What interests you most?* dropdown. Inline success confirmation, no redirect.

**Verdict** — **Follow this literally and you delete working code to make the product worse.** This is the item I'd flag loudest before anyone opens an editor.

- **It drops the free-text event field** — the highest-signal input on the form. "300 guests, outdoor venue, patchy wifi, need photos same day" is what makes the first sales call useful. A dropdown cannot replace it.
- **It drops company**, which is basic B2B lead qualification.
- **It's silent on everything that actually matters.** No mention of validation, error states, spam handling, or send failures. All of that is already built and is the difference between a form and a form that works. A spec that lists five fields and stops reads, to an implementer, like permission to rebuild from scratch.

The one genuine improvement is *Event type*. Segmenting leads by graduation / competition / conference / summit / trade show / wedding is real qualification value and maps cleanly onto the Use Cases section.

> **Recommendation** — Add the Event type dropdown. Keep company and the free-text field. Do not touch `submit-lead.ts` — the server action is the most robust thing on the site and nothing in the spec improves on it.

---

### 14 · Footer + contact bar — ✅ UPGRADE

**Now** — Four columns (Brand · Product · Company · Resources) plus social links, with a staggered blur-in reveal. No phone, no email, no address, no legal links.

**Spec** — Four columns (Brand · Products · Company · Support) plus a bottom bar carrying copyright, Privacy Policy, Terms, phone, email and "Amman, Jordan".

**Verdict** — Straightforward improvement at low cost. Real contact details and a physical location are a meaningful trust signal for a company handling guest biometric data, and their complete absence today is a gap. A visible Jordanian phone number and address does more for regional credibility than any amount of copy.

The distinction between *Privacy & Security* (plain-language trust page) and *Privacy Policy* (legal document) is unusually sophisticated for a spec at this stage, and correct — they serve different readers with different needs and merging them serves neither.

The existing stagger-reveal is worth preserving through this change; it's already built and already reduced-motion safe.

---

### 15 · Product colour system — ✅ UPGRADE

**Now** — Three competing definitions. Tokens say Pass = green `#34d399`, Flow = purple `#7b5cfa`, Face = cyan. `EventLifecycleSection` hardcodes different fallbacks (`#007AFF`, `#00F2FF`). `AIEnginesSection` uses a third set.

**Spec** — Blue = Pass, Teal = Flow, Coral = Face, applied consistently across Quick Proof Bar, idexi Difference and How It Works. Purple reserved exclusively for Sponsors.

**Verdict** — **The most underrated item in the spec.** It reads like a design note; it's actually a technical debt fix. Three components currently disagree about what colour each product is, and two of them bypass the tokens entirely with hardcoded hex fallbacks that don't match the tokens they're falling back from. That is a real bug, just a silent one.

Imposing one coherent mapping and enforcing it through tokens is straightforwardly correct, and colour-coding products consistently is a legitimate comprehension aid across a page that references all three repeatedly.

> **Conflict to resolve first** — Flow is currently purple, and the spec reserves purple for Sponsors alone. Both rules cannot hold. The spec's mapping (Flow = teal) resolves it, but this needs an explicit decision rather than being discovered mid-build.

---

### 16 · Our Story — deleted without mention — ◻️ DECISION REQUIRED

**Now** — `OurStorySection` — founding narrative plus a stacked-card carousel of Saif and Jafar with roles, headshots, and contact links.

**Spec** — No equivalent section. "About" exists only as a nav destination; the home page has no team or founder content at all.

**Verdict** — Not a verdict — a decision someone needs to make consciously, because right now it would happen by omission. The spec enumerates eleven sections and this isn't one of them, which silently removes it.

The case for keeping it: idexi is a young company asking organisers to trust it with guest facial data, in a regional market where personal credibility carries real commercial weight. Named, visible founders with faces attached is a trust asset, not filler. "Two AI graduates with eight years in event operations" is a better answer to "who are these people" than anything else on the page.

The case for moving it: the spec's home page is a tight, well-sequenced conversion funnel, and founder bios genuinely do slow that down. An `/about` page — which the nav already promises — is a legitimate home for it.

> **Needs a call** — Move to `/about`, or keep a condensed version on the home page? Either is defensible. Deleting it because the spec didn't mention it is not.

---

### 17 · Seven routes the spec links to that don't exist — ◻️ BLOCKER

**Now** — Four routes ship: `/`, `/faqs`, and the three `/services/*` pages. Section navigation uses same-page anchors.

**Spec** — References `/pricing`, `/about`, `/how-it-works`, `/use-cases`, `/privacy-security`, `/privacy-policy`, `/terms` — plus an external guest gallery tool.

**Verdict** — Seven referenced routes, zero of them built. The spec is stamped "Approved, ready for development," and on this evidence it isn't — not because the thinking is wrong, but because roughly half its navigation points at pages nobody has scoped.

This also silently deletes the three `/services/*` pages that *do* exist and are fully built. The spec's mega menu routes Products to Pass/Flow/Face, which presumably means these pages — but it never says so, and their existing content doesn't match the spec's new product descriptions.

> **Needed before build starts** — Decide per route: build now, defer and remove the link, or point at an existing anchor. Shipping a nav full of dead links reads as abandonment — measurably worse for trust than a smaller, honest site.

---

### 18 · The intro loader the spec never mentions — ◻️ DECISION REQUIRED

**Now** — `IntroStrobeLoader` — a full-screen animated photo-strobe overlay at `z-index: 999999` that plays before the home page becomes usable.

**Spec** — Not addressed anywhere in the document.

**Verdict** — Raising it because a rebuild is the natural moment to reconsider it, and the spec's silence means it survives by default rather than by decision.

Intro animations are a conversion tax. They delay first meaningful paint, they delay interactivity, and every returning visitor pays the cost again for a moment they've already seen. Given the spec puts enormous weight on the hero doing immediate work — a three-beat headline built for one-second comprehension — an overlay that withholds it works against the strategy.

> **Suggested** — Cut it, or gate it to first visit only via `sessionStorage`. Worth a measurement either way — it sits in front of every single visitor.

---

## What I'd actually do

Adopt the spec's **copy and structure wholesale** — it's a real improvement over what's live, and the writing in particular is considerably stronger. Push back on **three interaction decisions** and one deletion. Sequenced by value per unit of effort:

1. Resolve the blockers first — route decisions (17) and the purple colour conflict (15). Both are cheap now and expensive mid-build.
2. Ship the pure-copy wins: hero (03), Quick Proof Bar (05), Use Cases copy (10), Why-choose checklist (12), footer contact bar (14). Low risk, immediate lift.
3. Build Trusted By (04). Highest business impact in the document.
4. Build The Problem as a visible list, not a carousel (06), and the Difference table with the cubes retained as tab affordances (07).
5. Add Event type to the form. Change nothing else about it (13).
6. Move the 11 Q&As onto `/faqs`. Skip the floating widget (11).
7. Leave How It Works timing alone; take its copy and the connector lines only (08).
8. Decide consciously on Our Story (16) and the intro loader (18).

---

### What this analysis can't tell you

I have no analytics, session recordings, or conversion data — every judgement here is from code, copy and established interaction patterns, not from how your actual visitors behave.

Three things worth verifying independently:

- That Arab Robotics, IEEE AESS and TEDx PHU have approved public use of their names.
- That the "99% accurate" and "30-day deletion" claims are operationally true and defensible, since they're specific enough to be held to.
- That $199 is a price you actually want anchored publicly before a sales conversation.
