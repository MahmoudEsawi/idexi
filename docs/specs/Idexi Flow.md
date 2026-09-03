# idexi.tech — Product Page: Idexi Flow (Developer Spec)
Status: Approved, ready for development
URL: /products/flow

## Page Purpose
Same template pattern as the Idexi Pass page (see idexi-product-pass-spec.md) — technical, no-filler tone for a visitor who already wants details on this one product. 6 sections, no dedicated FAQ section (global floating "Common Questions" button covers that site-wide).

## Accent Color
Teal (#1D9E75 / background tint #E1F5EE) — used throughout this page's icons, comparison cards, and accents. Different from Idexi Pass's blue.

---

## Section 1 — Hero

**Eyebrow:**
```
IDEXI FLOW
```

**H1:**
```
The Unified Operations Hub
```

**Subhead:**
```
Idexi Flow turns any staff phone into a full check-in station — handling entry, hospitality, and session access from a single QR code per guest.
```

**Buttons:**
- Primary: "Book a Demo"
- Secondary: "See the Comparison ↓" (scrolls to Section 2 on this page)

---

## Section 2 — The Old Way vs The idexi Way

**H2:**
```
Managing the door shouldn't need a manual.
```

**Subhead:**
```
Here's exactly what changes.
```

**Layout:** Identical asymmetric design to the Pass page (30% muted/struck-through left column, 70% teal card right column with checkmark icon) — see Pass spec for exact CSS pattern, just recolor to teal (#E1F5EE background, #085041 text/icon).

**Content (5 rows):**

| Old way (left, muted/struck) | idexi way (right, teal card) |
|---|---|
| Scanning hardware is costly to maintain | Any staff phone becomes a scanner |
| Manual check-in creates long lines | One scan confirms entry, under a second |
| Tracking kits and meals is unreliable | Every pickup logged automatically |
| Staff can't identify VIP guests on the spot | Status appears instantly with every scan |
| Post-event data is incomplete | A full journey report, generated automatically |

---

## Section 3 — One Scan, Three Jobs

**IMPORTANT — this section uses a DIFFERENT visual pattern than the Pass page's linear 3-step flow.** Flow's mechanic isn't sequential steps — it's one action (a scan) that serves three different purposes. The diagram should reflect that: one icon/node at the top, branching downward into three separate outcome cards below it (a "one input, three outputs" tree shape, not a left-to-right chain).

**H2:**
```
One Scan, Three Jobs
```

**Subhead:**
```
Every staff phone can do all three — no separate tools.
```

**Layout:** Single scan icon (top, centered) with three dashed branch lines flowing down to three cards side by side below it.

**The 3 Outcomes (each a card: bold title + one-line description below the diagram):**

1. **Access Control**
   Instantly verify entry and flag VIP guests the moment they scan in.

2. **Logistics & Hospitality**
   Track exactly who received their welcome kit, badge, or meal — no guesswork.

3. **Workshops & Sessions**
   Confirm which session a guest is registered for, and guide them straight to their seat.

---

## Section 4 — What makes it work

**H2:**
```
What makes it work
```

**Layout:** 3-column grid, icon + bold title + short description (same pattern as Pass page Section 4).

1. **Icon:** smartphone icon
   **Title:** Zero Hardware Needed
   **Description:** Any staff smartphone works instantly — no devices to buy, charge, or sync before the event.

2. **Icon:** bolt/lightning icon
   **Title:** Real-Time Status, Every Scan
   **Description:** See a guest's category, workshop, and pickups the moment they're scanned — no separate lookup.

3. **Icon:** report/document icon
   **Title:** One Report, Every Detail
   **Description:** A complete record of every check-in, pickup, and session — ready the moment your event ends.

---

## Section 5 — Works Even Better With...

**H2:**
```
Works Even Better With...
```

**Subhead:**
```
Flow runs the door. Here's what completes the picture.
```

**Card 1 — Idexi Pass**
```
Flow scans the QR code — but that code only exists because Pass already generated a personalized ticket for every guest.
See Idexi Pass → (links to /products/pass)
```

**Card 2 — Idexi Face**
```
The same check-in that gets a guest through the door also confirms they're at the event — so their photos can find them later.
See Idexi Face → (links to /products/face)
```

---

## Section 6 — Final CTA

**H2:**
```
Ready to run your door without the chaos?
```

**Subhead:**
```
Tell us about your event. We'll show you exactly how Idexi Flow fits — no commitment, no pressure.
```

**Form:** Same as homepage Final CTA form — "What interests you most?" field pre-selected to "Idexi Flow" by default.

**Button:** Book a Demo (site-wide style)

---

## Accuracy note for Saif (mechanics of the product, carried over from Pass spec)
Idexi Flow's job is scanning/check-in/tracking DURING the live event — it does not generate tickets (that's Pass) and does not handle photo matching/delivery (that's Face). Flow receives and uses the QR code that Pass already created.
