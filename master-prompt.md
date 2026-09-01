# master-prompt.md

Phased implementation plan for `idexi-MASTER-SPEC.md`, constrained by the verdicts in `SPEC-GAP-ANALYSIS.md`.

Branch: `feat/spec-phased-implementation`
Base: `main` at `f9f036a`
Status: Phases 0 through 11 implemented. Build, lint, and typecheck clean; verified in Chromium.

---

## How to read this document

Each phase carries four fixed blocks:

- **Scope** — what changes, and what is explicitly out of bounds.
- **Skills** — the exact invocations to run. Every phase opens with a `superpowers:` skill. That is not decoration: the superpowers process skills set the working method, and the implementation skills carry it out inside that method.
- **Copywriting** — present only when the phase writes or rewrites user-facing text. When present, `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md` is mandatory reading before the first word is written, not a cleanup pass afterward.
- **Done when** — the check that closes the phase.

Skill invocation uses the `Skill` tool:

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "impeccable:impeccable", args: "polish src/components/ProblemSection.tsx")
Skill(skill: "frontend-design")
```

Plugin-scoped names use `plugin:skill`. Project skills in `.claude/skills/` are unscoped.

---

## Standing rules for every phase

1. **Existing sections get content changes only.** The six sections already on the home page (Hero, AIEnginesSection, EventLifecycleSection, VenueAccordion, OurStorySection, CtaSection), plus Navbar, Footer, and the three service pages, keep their current layout, interaction model, and animation timing. Copy changes freely. Structure does not move without explicit approval.

2. **Anything marked BLOCKED stops and asks.** Three items in this plan require a decision that is not mine to make. They are listed in Phase 0 and repeated at their phase. Do not work around them.

3. **No Tailwind.** This repository has no Tailwind, no shadcn, no `@/lib/utils`, and no `cn()`. Styling is scoped CSS in a template literal rendered through `<style>{someCSS}</style>`, with shared tokens in `src/app/globals.css`. Every new component follows that convention.

4. **No new dependencies without a stated reason.** The current tree is `framer-motion`, `lucide-react`, `next`, `react`, `react-dom`, `resend`, `zod`. The animation work in this plan adds nothing to it.

5. **Do not touch `src/app/actions/submit-lead.ts`** except under the approved Phase 8 form decision. It is the most robust file in the repository: Zod schema, Resend transport, honeypot trap, per-field errors, value echo-back, reply-to threading.

6. **Verify in a browser, not by reading the diff.** Every phase that renders pixels ends with a real page load. This was settled the hard way earlier in this project.

---

## Phase 0 — Blockers and decisions

No code. This phase exists because three unresolved conflicts would otherwise get silently resolved wrong somewhere around Phase 4, and unwinding them later costs more than settling them now.

### Scope

Resolve the following before any file changes.

**Blocker A: the product color system contradicts the spec.**

`globals.css` currently declares:

| Token | Current value | Reads as | Spec requires |
|---|---|---|---|
| `--accent-pass` | `#34d399` | green | blue |
| `--accent-flow` | `#7b5cfa` | purple | teal |
| `--accent-face` | `var(--accent-cyan)` = `#31c4f3` | cyan | coral |

All three product colors are wrong against the spec, and the spec's reserved sponsor color (purple) is currently occupied by Flow. Section 3, Section 5, Section 6, and Section 7 all depend on this mapping being correct, so the tokens have to be settled before any of them are built. Phase 1 does the work. The decision needed here is whether the spec's mapping wins over the shipped one.

**Blocker B: the `idexi-design-system` project skill is stale and will mislead any phase that invokes it.**

`.claude/skills/idexi-design-system/SKILL.md` instructs: Tailwind CSS v4 with an `@theme` block, tokens named `--font-heading` / `--font-body`, Sora and Inter typefaces, a dark navy gradient as the default background for every full-bleed section, cyan as the only accent, and a rule that every surface carries a signal-arc or wave motif.

None of that describes this codebase any more. The site runs no Tailwind at all, uses the `--st-*` token namespace, sets Outfit, Inter, and Playfair Display as its typefaces, defaults to a light background (`--st-background: #edf0ff`) with dark as the variant, and had `InteractiveWaves` deleted outright during the design system migration. The skill also declares that on conflict it wins over repository convention, which makes it actively dangerous to invoke here.

Recommendation: do not invoke `idexi-design-system` in any phase of this plan. Route design work to `frontend-design` and `impeccable:impeccable` instead. Separately, rewrite that skill against the current `--st-*` system. That rewrite is its own task and is not in this plan.

**Blocker C: there is no skill named `framer`.**

The closest available are `ui-motion`, `review-animations`, and `fixing-motion-performance`, all user-level. This plan maps the animation phases to those three. Flagging it so the substitution is a known choice rather than a silent one.

### Decisions taken

Recorded 2026-08-29, after the plan was reviewed.

| # | Question | Decision |
|---|---|---|
| A | Product colors: spec mapping or shipped mapping? | Spec wins. New `--st-product-*` and `--st-sponsor` scale added in both themes; the legacy `--accent-pass/flow/face` triplet is left in place, unread. |
| B | `idexi-design-system` skill | Not invoked anywhere in this work. It describes Tailwind v4, Sora/Inter, and a dark-navy-first system that this codebase no longer uses. Still needs its own rewrite. |
| C | No `framer` skill on this machine | Substituted `ui-motion`, `review-animations`, `fixing-motion-performance`. |
| Section 5 | Tabs on home, or tables on service pages? | Tables moved to the three service pages; home keeps a three-column summary band that links across. |
| P1 | How It Works at 1.4s | Rejected. Interval stays at 5,500ms; captions rewritten only. |
| P2 | Drop `company` and the free-text event field | **Approved.** Form is now name, email, phone, event type, interest. Zod schema and the notification email updated to match. |
| P3 | Header mega menu | Rejected. The spec's Learn column became a second labelled group inside the existing services dropdown. |
| FAQ claims | 30-day deletion and 99% match accuracy | Both confirmed and published. The `PRIVACY_NOTE` placeholder was removed. |
| Contact | Which of three addresses? | `info@idexi.tech` everywhere. It was already the address in `submit-lead.ts`. |

**Still outstanding:** the external "Where's My Photo?" gallery URL. The header button is not built without it, and FAQ 1 currently describes that button.

**Permission-gated items** (each repeated at its phase):

| # | Item | Phase | Why it needs approval |
|---|---|---|---|
| P1 | How It Works advance interval 5,500ms to 1,400ms | 8 | Interaction change to an existing section. Also assessed as a downgrade: 1.4s is below the time needed to read a caption. |
| P2 | Final CTA form field set | 8 | The spec's field list drops `company` and the free-text `event` textarea. Removing them is a structural change and requires editing the Zod schema in `submit-lead.ts`. |
| P3 | Header mega menu | 10 | Assessed as unnecessary complexity: six links do not justify a mega menu, and the existing dropdown already covers them. |

### Skills

```
Skill(skill: "superpowers:brainstorming")
```

Use it to run the three decisions to closure. Do not enter any implementation skill during Phase 0.

### Done when

All three blockers have a recorded decision, and P1, P2, P3 each have an explicit yes or no from the project owner.

---

## Phase 1 — Product color tokens

### Scope

Add a product color scale to `globals.css` in both the light `:root` block and the dark variant block:

- `--st-product-pass` (blue)
- `--st-product-flow` (teal)
- `--st-product-face` (coral)
- `--st-sponsor` (purple, reserved for Section 7 only)

Each needs a contrast-checked on-color companion for text placed on it. Derive the blue from the existing `--st-secondary` family and the teal from `--st-accent-data` so the new scale reads as part of the system rather than bolted onto it. Coral and purple are genuinely new and need choosing.

Leave the legacy `--accent-pass` / `--accent-flow` / `--accent-face` declarations in place for now. Nothing in this plan reads them, and removing them is a separate cleanup with its own blast radius.

Out of bounds: applying the new tokens to anything. This phase only declares them.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "frontend-design")
Skill(skill: "impeccable:impeccable", args: "colorize src/app/globals.css")
```

`frontend-design` owns the token naming so it matches the `--st-*` conventions already in the file. `impeccable colorize` owns the hue selection for coral and purple, and it is the skill that will actually check the contrast pairs rather than assume them.

### Done when

Every new token resolves in both themes, and each text-on-color pair has a measured contrast ratio at or above 4.5:1. Measured, not estimated.

---

## Phase 2 — The seven missing routes

### Scope

The spec's header, footer, and two inline section links point at seven destinations that return 404 today:

| Route | Source in spec | Content |
|---|---|---|
| `/pricing` | header, footer Company | Plans, anchored on the one stated figure: $199 per event |
| `/about` | header, footer Company | Company page. Reuse the substance already written in `OurStorySection` rather than inventing a second origin story |
| `/how-it-works` | mega menu Learn, Section 6 closing link | The full connected journey, long form |
| `/use-cases` | mega menu Learn, Section 8 closing link | All use cases, beyond the six on the home page |
| `/privacy-security` | mega menu Learn, footer Support | Plain-language trust page: OTP gating, 30-day auto-deletion, dedicated servers |
| `/privacy-policy` | footer bottom bar | Formal legal document |
| `/terms` | footer bottom bar | Terms of service |

The spec is emphatic that `/privacy-security` and `/privacy-policy` are two different documents and must never be merged. One is a trust and education page for a nervous organizer. The other is a compliance artifact. Build both.

Each page follows the existing page convention: a `page.tsx` exporting `metadata`, scoped CSS in a template literal, `--st-*` tokens, serif headings at weight 500.

One open input: the "Where's My Photo?" button links to an external guest gallery tool. That URL is not in the spec and is not in the codebase. Ask for it, or the button ships pointing nowhere.

Two content cautions. `/privacy-policy` and `/terms` are legal documents, and a plausible-sounding legal page is worse than an honest placeholder that says the document is being finalized. The existing `/faqs` page already handles this correctly with its `PRIVACY_NOTE` constant. Follow that precedent and do not draft legal text that has not been reviewed. Separately, `/pricing` must not invent tiers: the spec states one price point and nothing else.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "frontend-design")
Skill(skill: "impeccable:impeccable", args: "clarify src/app/pricing/page.tsx")
```

`impeccable clarify` is the right call here rather than a visual command, because these pages live or die on whether their labels and explanations are unambiguous.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md` before writing.

Seven pages of new prose is the single largest copywriting surface in this plan and the place where AI tells will cluster hardest. Watch specifically for section 4 (promotional language, which trust pages attract), section 21 (speculative gap-filling, which is exactly the failure mode for a privacy page where the real answer is not yet documented), and section 14 (no em dashes or en dashes in the final text).

### Done when

All seven routes render, every header and footer link resolves, and no page contains an invented legal claim, an invented price, or an invented statistic.

---

## Phase 3 — Port the scroll card stack primitive

### Scope

Build `src/components/ScrollCardStack.tsx`. This is a port of the supplied `animated-cards-stack.tsx`, not a copy, because the original cannot run in this repository as written.

What the original depends on that does not exist here: Tailwind utility classes, `class-variance-authority`, `cn` from `@/lib/utils`, the shadcn `/components/ui` directory, and the `motion/react` package. It also assumes a global token set (`bg-accent`, `bg-background`, `border-stone-700/50`) that this project does not have.

What to preserve exactly, because it is the actual value of the template:

- `ContainerScroll` with `useScroll({ target: scrollRef, offset: ["start center", "end end"] })`, exposing `scrollYProgress` through React context.
- Per-card range math: `start = index / (arrayLength + 1)`, `end = (index + 1) / (arrayLength + 1)`, and `rotateRange = [range[0] - 1.5, range[1] / 1.5]`.
- The composed transform: `translateZ(index * incrementZ) translateY(y) rotate(rotate)`, with `y` running `0%` to `-180%` across the card's range.
- The scroll-linked `drop-shadow` built from four separate `useTransform` values.
- `perspective: 1000px` on both the scroll container and the card container.
- `zIndex: (arrayLength - index) * incrementZ` and `backfaceVisibility: hidden`.

What changes in the port:

1. Import from `framer-motion`, already installed at `^12.42.2`, which exports `useScroll`, `useTransform`, `useMotionTemplate`, and `motion` under the same names. The `motion/react` package is not needed.
2. Replace `cva` variants with a plain `variant` prop and two scoped CSS classes.
3. Replace every Tailwind class with scoped CSS in a `<style>` block, using `--st-*` tokens.
4. Drop `ReviewStars` entirely. It is testimonial furniture and has no use in this section.
5. **Fix the conditional hook call.** The original calls `useMotionTemplate` inside a ternary:

   ```tsx
   const filter = variant === "light" ? useMotionTemplate`drop-shadow(...)` : "none"
   ```

   That is a hook behind a condition. It violates the Rules of Hooks and will break the moment `variant` changes between renders, which React 19 will surface loudly. The port computes the template unconditionally and selects afterward.

6. Honor `prefers-reduced-motion: reduce` with a static stacked fallback. The original has no reduced-motion handling at all.

Out of bounds: wiring this into any page. Phase 3 ships the primitive and a throwaway harness route only.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "ui-motion")
Skill(skill: "impeccable:impeccable", args: "animate src/components/ScrollCardStack.tsx")
```

`ui-motion` substitutes for the requested `framer` skill, which does not exist on this machine. See Blocker C.

### Done when

The primitive renders a stack in isolation, scrubs correctly in both scroll directions, collapses to a static stack under reduced motion, and produces zero hook-order warnings in the React 19 console.

---

## Phase 4 — Section 4, "The Problem"

### Scope

New home page section, placed after the Quick Proof Bar. Heading: "You know these moments." Ten cards, one per pain point, verbatim from the spec, driven by the Phase 3 primitive.

The spec asks for a manual carousel with arrows, an "01 / 10" counter, and dot indicators. That is superseded: a carousel shows one card and hides nine, and these ten lines are the strongest copy in the entire spec. The scroll stack shows all ten in sequence without a single click. Keep the counter as a scroll-linked readout, since knowing you are at 3 of 10 genuinely helps. Drop the arrows and dots, which have no meaning in a scroll-driven stack.

**The scroll budget is the risk in this phase.** The supplied demo allocates `h-[300vh]` for five cards. Applied naively, ten cards want 500vh to 600vh, which is five to six full screens for one section on a page that will have ten others. That single section would be roughly a third of the entire home page's scroll length. Tune the container to land the whole sequence in 250vh to 300vh and verify by measuring, not by feel.

Accessibility floor: the ten pain points must be readable without scroll-driven animation. Under `prefers-reduced-motion`, render them as a plain stacked list.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "ui-motion")
Skill(skill: "review-animations")
Skill(skill: "impeccable:impeccable", args: "animate src/components/ProblemSection.tsx")
Skill(skill: "webapp-testing")
```

`webapp-testing` matters more here than anywhere else in the plan. Scroll-linked animation is precisely the class of bug that reads fine in source and fails in the browser, which this project has already learned once.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

The ten lines are already written and already good. They carry specific, concrete, hard-to-fabricate detail, which the humanizer guide identifies as a signal of human writing worth preserving. Use them close to verbatim. The copywriting work here is the section heading and the counter label, not the ten items.

### Done when

All ten cards are reachable by scrolling, the section occupies no more than 300vh, the counter tracks the active card, and the content is fully readable with motion disabled.

---

## Phase 5 — Sections 2, 3, and 10

### Scope

Three new low-cost home sections, grouped because they share a build pattern and none of them animates beyond a fade.

**Section 2, Trusted By.** Heading: "Already running at events across Jordan and the region." A logo wall on `repeat(auto-fill, minmax(160px, 1fr))`, which the spec calls out specifically so the grid reflows as cards are added. Three real events (Arab Robotics and AI Championship at 300 guests, IEEE AESS Aerospace Competition at 150, TEDx PHU at 300) plus one faded "More added regularly" placeholder. Cards carry an icon, a name, and an attendee badge. No descriptions.

**Section 3, Quick Proof Bar.** No heading. Three columns with staggered fade-in at 0ms, 120ms, and 240ms. Under 5 min in Pass blue, Any event size in Flow teal, 100% guest privacy in Face coral. Consumes the Phase 1 tokens.

**Section 10, Why organizers choose idexi.** A single-column checklist capped around 400px wide. Five items, roughly three seconds to read. It sits tight against the Final CTA and functions as one closing beat with it, so the spacing between them is deliberate and should not be normalized to the page's default section gap.

The evergreen content rule from the spec applies to all three. Copy that references scale, counts, or history has to be written so it never needs editing as more events happen. "A growing list" survives. A hardcoded total does not.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "frontend-design")
Skill(skill: "impeccable:impeccable", args: "layout src/components/TrustedBySection.tsx")
Skill(skill: "taste-skill:taste-skill")
```

`impeccable layout` owns the spacing relationship between Section 10 and the Final CTA, which is the one detail in this phase that is easy to get wrong. `taste-skill` handles the logo wall's visual weight, since a sparse grid of four cards reads as emptiness unless it is composed deliberately.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

The five checklist items in Section 10 are the highest-risk copy in this phase. A checklist of benefits is the native habitat of promotional language (guide section 4) and the rule of three (section 10). The spec's wording is already restrained. Keep it that way.

### Done when

The logo wall reflows correctly from four cards to twenty without a layout change, the proof bar stagger fires once on scroll into view, and no copy in any of the three sections would need editing after the next event.

---

## Phase 6 — Section 7, sponsors

### Scope

New home section, the only one on the page with a colored background. Purple or lavender tint, drawn from the `--st-sponsor` token established in Phase 1 and used nowhere else on the site, so it registers as distinct the instant a visitor scrolls into it.

Heading: "A new stage for your sponsors." Three auto-advancing stages at roughly 1.6s: on the ticket, on the email cover, on every photo. The same interaction pattern as Section 6, which means the existing `EventLifecycleSection` is the reference implementation to match, not a component to modify.

A stat callout box holds a counter animating 0 to 3,000 once on scroll into view, over roughly 1.8s.

Two content constraints from the spec, both easy to violate by accident. "Sponsor cover" means one reusable design containing multiple partner logos, not a single logo, and it is applied identically across all three touchpoints. And do not reintroduce "3-day event" into the counter copy: event duration is irrelevant to a claim about scale.

The counter needs guarding. It animates once, on scroll into view, and must not restart when the user scrolls back up. Under reduced motion it renders the final value immediately.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "ui-motion")
Skill(skill: "fixing-motion-performance")
Skill(skill: "impeccable:impeccable", args: "animate src/components/SponsorsSection.tsx")
```

`fixing-motion-performance` is here because this phase adds a third auto-advancing timer to the home page. Together with the lifecycle stepper and the proof bar stagger, that is enough concurrent motion to be worth measuring rather than assuming.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

The three stage captions are written in a tight parallel structure, all three opening with "Seen". That repetition is deliberate and should survive. Do not let elegant variation (guide section 11) talk you into cycling synonyms across them.

### Done when

The purple appears in exactly one place on the site, the counter fires once and does not replay, all three stages advance and loop, and the section is fully legible with motion disabled.

---

## Phase 7 — Section 5, "The idexi Difference", split across home and service pages

### Scope

This phase implements the architectural recommendation. See the consultation note at the end of this document for the reasoning.

**On the home page:** a compact three-column band. Heading "The idexi Difference", subhead "Choose a product to see exactly what changes." Each column carries one product name, its color from Phase 1, the spec's summary sentence for that product verbatim, and a link reading "See what changes" pointing at the matching service page.

**On each service page:** the five-row comparison table for that product, as a content addition to the existing page structure. `/services/pass` takes the Pass table, `/services/flow` the Flow table, `/services/face` the Face table. Use the `.service-*` classes already in `globals.css` rather than inventing new ones.

This is a deliberate departure from the spec, which asks for three tabs with all five rows visible at once and explicitly no click-through. The tradeoff is stated plainly in the consultation note. If the answer is that the spec's version wins, build the tabs on the home page instead and skip the service page half of this phase.

Adding a comparison table to a service page is a content addition to a page that already has a benefits section. It does not relayout the page and does not fall under the structural freeze.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "frontend-design")
Skill(skill: "impeccable:impeccable", args: "layout src/app/services/pass/page.tsx")
Skill(skill: "taste-skill:taste-skill")
```

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

All fifteen comparison rows and three summary sentences come from the spec verbatim. New copy in this phase is limited to the link label and the column framing. Note that the spec's own summary sentences use em dashes; strip them per guide section 14, since these become site copy rather than quoted source text.

### Done when

Each of the three service pages carries its own comparison table, the home page band links correctly to all three, and the product colors match the Phase 1 tokens exactly.

---

## Phase 8 — Content rewrite of existing sections

### Scope

Copy only. This phase touches text and nothing else.

| Component | Spec source | Change |
|---|---|---|
| `page.tsx` hero | Section 1 | Eyebrow "INTELLIGENT EVENT SOLUTIONS", H1 "Tickets Sent. Guests Scanned. Photos Delivered.", subhead, button labels. The H1 deliberately mirrors Pass, Flow, Face in order |
| `AIEnginesSection` | Products | Heading and card copy move onto Pass, Flow, Face naming |
| `EventLifecycleSection` | Section 6 | Stage labels, sublabels, and active captions. Timing untouched. See P1 |
| `VenueAccordion` | Section 8 | The six use case categories and their copy |
| `OurStorySection` | no direct equivalent | Leave the substance. Align terminology with the new product naming |
| `CtaSection` | Section 11 | Heading "Your next event doesn't have to be chaos", subhead, success message. See P2 |

Explicitly out of bounds: the lifecycle stepper's rail and progress line, the venue accordion's expand interaction, the hero's kinetic photo layout, and every mobile breakpoint rule added in the responsiveness pass.

**BLOCKED, P1.** The spec sets the How It Works advance interval at roughly 1.4s. The shipped value is 5,500ms with scroll-spy and four bespoke stage widgets. 1.4s is not enough time to read a caption, and dropping to it would be a downgrade to a section that currently works well. This is also an interaction change to an existing section, which the standing rules forbid without approval. Do not change the interval. Rewrite the captions at the current timing and raise it separately.

**BLOCKED, P2.** The spec's form is name, email, phone, event type dropdown, and interest dropdown. The shipped form is name, email, phone, company, solution dropdown, and a free-text "About Your Event" textarea, backed by a Zod schema and a honeypot in `submit-lead.ts`. The spec's list removes `company` and the free-text field. The free-text field is the highest-signal input on a consultative B2B form, because it is where an organizer writes the thing that actually qualifies them. Recommendation: treat this as additive. Add the event type dropdown, keep `company`, keep the textarea. That is a content change and needs only a schema extension. Removing fields is structural and needs an explicit yes.

The spec is also silent on validation, error states, and spam handling, all of which `submit-lead.ts` already implements. Nothing in the spec is a reason to weaken any of them.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "impeccable:impeccable", args: "clarify src/components/CtaSection.tsx")
Skill(skill: "frontend-design")
```

Note the absence of any layout, animate, or bolder command in this phase. That is intentional. Handing a visual refinement skill a phase scoped to copy is how a content rewrite turns into a structural change nobody approved.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`. This is the phase the rule was written for.

The spec's own copy contains patterns the guide flags. "Guests never search. Staff never guess. You never lose control." is a rule of three built from three tailing negations, hitting guide sections 9 and 10 simultaneously. Several headings use title case, against section 17. Em dashes appear throughout, against section 14. Run the draft, audit, final loop on every string before it lands in a component, and do not treat "it came from the spec" as exemption. The spec is a content brief, not a style guide.

### Done when

Every string matches the spec's intent, no component's JSX structure or CSS changed, and a diff review confirms the phase touched only text nodes and string constants.

---

## Phase 9 — Rebuild `/faqs` with the eleven questions

### Scope

Replace the `categories` array in `src/app/faqs/page.tsx` with the spec's eleven Q&As. The existing page structure stays exactly as it is: `<details>` and `<summary>` disclosure, the `.faq-*` scoped CSS, serif category headings, the plus-to-cross icon rotation.

The floating widget from Section 9 is not being built. That decision is already made and is consistent with the gap analysis, which assessed it as unnecessary complexity: it presents as a chat bubble while offering no chat, and it moves eleven answers out of a crawlable page into a JavaScript-only panel, forfeiting the FAQ search visibility the page currently earns.

Group the eleven into categories that fit the existing three-category structure. A workable split: photos and privacy (questions 1, 5, 6, 11), running the event (2, 7, 8, 9, 10), and getting started (3, 4).

One conflict to resolve while writing: the current page repeats a `PRIVACY_NOTE` constant saying privacy documentation is still being finalized. The spec's question 11 answers the retention question directly, stating a dedicated secured server and automatic deletion 30 days after the event. Those two cannot both stand. If the 30-day policy is now confirmed, the note goes. If it is not confirmed, the spec's answer cannot ship, because it would be an unverified data-handling claim. Confirm before writing.

Also reconcile the contact address. The current page says `hello@idexi.ai`, the spec footer says `tryidexi@gmail.com`, and `submit-lead.ts` falls back to `info@idexi.tech`. Three addresses across three files. Pick one.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "impeccable:impeccable", args: "clarify src/app/faqs/page.tsx")
```

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

The spec's answers are written conversationally and mostly read well. Two need attention. Question 5 claims accuracy "99% of the time", which is a hard number that must be verified before it ships. Question 2's "works offline and syncs the moment you're back online" needs to match what the current page already says about local queueing, so the two do not contradict each other.

### Done when

All eleven questions render, the page structure is unchanged, no unverified retention or accuracy claim survives, and one contact address is used consistently.

---

## Phase 10 — Navbar and footer

### Scope

**Navbar.** Point the existing links at the routes built in Phase 2. Current state: How It Works, Use Cases, and About all resolve to home page anchors (`/#how-it-works`, `/#use-cases`, `/#about`). Now that real pages exist, decide per link whether it goes to the anchor or the page. Recommendation: keep the anchors, since they work and the scroll-margin offset is already tuned, and add Pricing as a new top-level link.

Add "Where's My Photo?" as an outline or ghost button, visually lighter than the primary CTA. Blocked on the external gallery URL from Phase 2.

The primary CTA currently reads "Book Consultation" against the spec's "Book a Demo". This was a deliberate change made earlier in the project. Confirm which one wins before touching it, and whichever it is, it has to be identical everywhere on the site.

**BLOCKED, P3.** The spec's mega menu is not being built without approval. Six links across two columns do not justify a mega menu, and the existing services dropdown already handles the Products column. The Learn column's three destinations can join the dropdown as a second group. The existing dropdown also has a fix in it worth keeping: the click handler calls `openServices` rather than toggling, which avoids a synthetic mouseenter race that produced an open-then-close flicker.

**Footer.** Rebuild the link data to the spec's four columns: Brand, Products, Company, Support. Keep the current two-row mobile grid, where `.footer-brand-col` spans `1 / -1` under 767px. Add the bottom bar: copyright, Privacy Policy, Terms of Service, phone, email, location.

The two privacy links land in different places on purpose. Privacy and Security sits in Support. Privacy Policy sits in the bottom bar. Do not collapse them.

### Skills

```
Skill(skill: "superpowers:executing-plans")
Skill(skill: "frontend-design")
Skill(skill: "impeccable:impeccable", args: "adapt src/components/Navbar.tsx")
Skill(skill: "webapp-testing")
```

`impeccable adapt` covers the mobile drawer, since adding links to a drawer is where tap targets quietly fall below 44px. `webapp-testing` verifies every link resolves, which is the entire point of Phase 2.

### Copywriting

Mandatory: read `C:\Users\Admin\Desktop\idexi-main\idexi\.claude\skills\humanizer.md`.

Only the footer brand line is real prose. Everything else is labels, where the guide's relevant rule is that a control says exactly what happens.

### Done when

Every navbar and footer link resolves to a real page or a real anchor, no route 404s, the mobile drawer still closes on link tap, and the primary CTA label is identical in all of its instances.

---

## Phase 11 — Verification and close

### Scope

No new features. This phase proves the work.

- Full page load at 375px, 768px, 1024px, and 1440px. The desktop layout freeze from the responsiveness pass still holds and nothing in this plan may have moved it.
- Reduced motion pass with `prefers-reduced-motion: reduce` forced. Every animated section built in Phases 4, 5, and 6 must remain readable and complete.
- Both themes, since every new token was declared in a light and a dark block.
- Keyboard-only pass through the full home page, the new routes, and the CTA form.
- Total home page scroll length measured. If the Problem section grew past its 300vh budget, fix it here.
- `npm run build` and `npm run lint` clean.
- `graphify update .` to bring the knowledge graph current, per the repository's own instructions in `CLAUDE.md`.

### Skills

```
Skill(skill: "superpowers:verification-before-completion")
Skill(skill: "webapp-testing")
Skill(skill: "impeccable:impeccable", args: "audit src/app/page.tsx")
Skill(skill: "superpowers:requesting-code-review")
Skill(skill: "superpowers:finishing-a-development-branch")
```

If anything fails, do not patch it inline:

```
Skill(skill: "superpowers:systematic-debugging")
```

That is not boilerplate. The two hardest bugs in this project so far, a scroll value frozen at zero because `<body>` had silently become the scroll container, and a stepper rail clipped by a global `button { overflow: hidden }`, were both found by browser inspection after code reading had failed repeatedly. Scroll-driven animation and a page this long will produce more of the same class.

### Done when

Build and lint pass, every checklist item above is verified in a real browser, and the branch is ready to review.

---

## Architectural consultation

The question asked: should any of the spec's home page content move to the service pages, and is the home page getting too heavy?

### The short answer

Yes, it is getting too heavy, and the numbers are worth seeing before the fix.

The home page ships six sections today: Hero, AI Engines, Event Lifecycle, Venue Accordion, Our Story, CTA. Roughly seven screens of scroll.

The spec's home page has eleven sections. Estimated at the spec's own layout instructions:

| Section | Approx. screens |
|---|---|
| 1 Hero | 1.0 |
| 2 Trusted By | 0.8 |
| 3 Quick Proof Bar | 0.4 |
| 4 The Problem, 10 cards at the template's ratio | 4.0 to 6.0 |
| 5 The Difference | 1.0 |
| 6 How It Works | 1.0 |
| 7 Sponsors | 1.2 |
| 8 Use Cases | 1.2 |
| 10 Why organizers | 0.5 |
| 11 Final CTA | 1.0 |
| **Total** | **12 to 14** |

Seven screens to thirteen. That is roughly double, and one section accounts for a third of it.

But the interesting part is that the weight is not spread evenly, which changes what the fix should be. Most of the new sections are cheap. Trusted By, the Proof Bar, and the organizer checklist together add under two screens and each earns its space immediately. The heaviness comes from two places, and only one of them is a distribution problem.

### What should move: Section 5, the comparison tables

This is the one real recommendation, and it is the highest-value change in the plan.

Section 5 is fifteen comparison rows plus three summary sentences, and it is product-specific by construction. Each tab is, literally, one service page's entire argument. Meanwhile `/services/pass`, `/services/flow`, and `/services/face` are the thinnest pages on the site. They follow a shared template of hero, steps, benefits, audiences, and none of them contains the old-way-versus-with-idexi framing that makes this content persuasive.

So the spec is putting three service pages' worth of argument on the home page, on pages that are starving for exactly that argument.

Move each table to its matching service page. Keep a three-column band on home carrying the three summary sentences, which are strong on their own, each linking through. Home loses about a screen and gains a clear route into the product pages. Each service page gains the spine it is missing.

**The honest cost.** The spec says "all 5 rows visible at once, no click-through", so the author clearly wanted the comparison on home without a jump. That preference is real, and the split trades it away. My read is that the trade is worth making, because a visitor who wants a five-row feature comparison is a visitor who is already willing to click, and the visitor who is not willing to click was never going to read fifteen rows anyway. But it is a genuine tradeoff and the call belongs to you.

There is also an internal inconsistency worth noting: the spec's own Section 5 says "no click-through" while Sections 6 and 8 both end with links to `/how-it-works` and `/use-cases`. The page is already built to hand depth off to sub-pages. Section 5 is the outlier.

### What should not move: everything else

**Use Cases (Section 8) stays.** Six cards, roughly one screen, and every card sells the whole suite rather than one product. It is the cheapest persuasion per screen in the spec. The spec already routes depth to `/use-cases` via its closing link, so distribution is handled by design. Moving it would gut the home page's breadth argument to save one screen.

**Sponsors (Section 7) stays.** It is cross-product by definition, since the pitch is that one sponsor design appears on the ticket, the email, and the photo. Splitting it across three service pages would destroy the argument, which only works when all three touchpoints are seen together. It is also the only colored-background section, which makes it a pacing device: a visual breath at roughly the two-thirds mark of a long page.

**How It Works (Section 6) stays.** The connected journey is the product. It cannot live on a page about one third of it.

**Trusted By, Proof Bar, and the organizer checklist stay.** All cheap, all cross-product, all doing work no service page could do.

### The other source of weight, which is not a distribution problem

Section 4 is four to six screens for ten cards, and no amount of moving content elsewhere fixes that, because the ten pain points genuinely belong on the home page. They are the best-written copy in the spec, they run pain-before-solution, which is correct for a cold B2B visitor, and they sit early where attention is highest.

The fix is not to move them or cut them. It is to tune the scroll ratio. The supplied demo allocates 300vh for five cards, and applying that ratio to ten gives 600vh. Compress to 250vh to 300vh for all ten and the section costs two screens instead of five. That is a template parameter, handled in Phase 4.

Worth noting for later: the ten points cluster by product, five Flow, two Pass, two Face, one cross-product. That makes them reusable as the pain framing on each service page. I would not do it in this plan, because duplicating the same copy across four pages costs you on search and doubles the maintenance, but the mapping is there if the service pages need strengthening beyond the Phase 7 tables.

### What this means for the service pages

After Phase 7 each service page gains one comparison table, which is a content addition to a page that already has a benefits section. It does not relayout anything and does not touch the structural freeze.

If you want the service pages to carry more weight than that, the natural next step is a per-product FAQ subset and the product-specific pain points described above. Both are additive. Neither is in this plan.

### Recommendation in one line

Move the three comparison tables to the service pages, compress the Problem section's scroll budget, and leave everything else on the home page. That takes the estimate from roughly thirteen screens to roughly ten, without cutting a single idea from the spec.
