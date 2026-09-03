# idexi.tech — Page: How It Works (Developer Spec)
Status: Approved, ready for development
URL: /how-it-works

## Page Purpose
Unlike the three product pages (each focused on ONE product), this page's job is to prove the three products work as a single connected system — not three separate tools bolted together. Linked from: the homepage's "How It Works" section, the header mega menu (Learn column), and every product page's "See the full connected journey →" link.

4 sections total.

---

## Section 1 — Hero

**Eyebrow:**
```
HOW IT WORKS
```

**H1:**
```
Before the Doors Open. During the Event. After It Ends.
```

**Subhead:**
```
One connected system — Pass, Flow, and Face hand off to one another automatically, at exactly the right moment.
```

**Button:** Book a Demo (single button, no secondary — this page itself is the "detail," there's no deeper page to link to)

---

## Section 2 — The Timeline

**H2:**
```
Here's exactly what happens, and when.
```

**Small link line directly below H2 (accent color):**
```
Follow Sara through her whole event, below.
```
*(This ties into the guest example "Sara Ahmed" shown later in Section 3's dashboard mockup — a light narrative thread connecting the two sections. "Sara" is a fictional example guest used for illustration, not a real person.)*

## Layout — horizontal timeline, 3 time periods

A horizontal line at the top with 3 marker dots (blue, teal, coral) and labels: **BEFORE**, **DURING**, **AFTER**. Below each time period are 1-2 stacked cards (icon + short title, some with a small muted subtitle line).

**Column 1 — BEFORE (blue, #378ADD)**

Card 1 (top row, CLICKABLE — links to /products/pass):
- Icon: file/document icon
- Title: "Ticket sent"
- Small link label below: "Idexi Pass ↗"

Card 2 (bottom row, NOT clickable):
- Icon: face/selfie icon
- Title: "Face registration"
- Subtitle: "optional, opens early"

**Column 2 — DURING (teal, #1D9E75)**

Card 1 (top row, CLICKABLE — links to /products/flow):
- Icon: inbox/scan icon
- Title: "Check-in"
- Small link label below: "Idexi Flow ↗"

Card 2 (bottom row, NOT clickable):
- Icon: face/selfie icon
- Title: "Live registration"
- Subtitle: "booth or QR on screen"

**Column 3 — AFTER (coral, #D85A30)**

Card 1 (top row, CLICKABLE — links to /products/face):
- Icon: upload/photo icon
- Title: "Photos uploaded"
- Small link label below: "Idexi Face ↗"

Card 2 (bottom row, NOT clickable):
- Icon: inbox/mail icon
- Title: "Galleries delivered"
- Subtitle: "one click, every guest"

**Below the 3 columns:** product name label centered under each column (Idexi Pass / Idexi Flow / Idexi Face)

### Note on clickable cards
Only the FIRST card in each column (the one directly tied to a single product's core action) is clickable and links to that product's page. The second card in each column (Face registration / Live registration / Galleries delivered) is informational only, not a link — avoid making every single card clickable, it would clutter the interaction pattern.

---

## Section 3 — One Dashboard, Every Product

**H2:**
```
One Dashboard, Every Product
```

**Subhead:**
```
You're not managing three accounts. You're managing one event.
```

**Layout:** A mockup of the actual dashboard UI (not a description in prose — an actual visual mockup), showing:
- Top bar: idexi logo + three small colored badges labeled "Pass" (blue), "Flow" (teal), "Face" (coral) — all visible together
- Below that: 3 stat cards side by side — "Tickets sent" (300), "Checked in" (248), "Galleries sent" (300)
- Below that: one example guest row — avatar circle with initials "SA", name "Sara Ahmed", status badge "Checked in" (teal)

**Reassurance line below the dashboard mockup (smaller, muted text):**
```
Prefer to start with just one product? Each one works fully on its own.
```
*(Important: this line exists specifically to prevent visitors who only want ONE product from feeling like they're being pushed into buying all three. Do not remove this — it directly supports the "We already use a ticketing tool" answer in the site-wide FAQ widget, which says the same thing.)*

---

## Section 4 — Final CTA

**H2:**
```
Ready to see it in action?
```

**Subhead:**
```
Tell us about your event. We'll show you exactly how it all connects — no commitment, no pressure.
```

**Button:** Book a Demo (site-wide style, links to contact/demo form)

---

## Design notes for Saif

1. **Color-coding is intentional and consistent with the rest of the site**: blue = Pass, teal = Flow, coral = Face — same mapping used on the homepage's Quick Proof Bar, The idexi Difference, and the product pages themselves.

2. **The "Sara Ahmed" example is a narrative device**, not a marketing claim about a real person — the small text connecting Section 2 and Section 3 ("Follow Sara through her whole event") and the dashboard's example guest row are meant to make the abstract diagram feel like one concrete, relatable event story.

3. **This page deliberately does NOT have a dedicated FAQ section** — same as the product pages, the global floating "Common Questions" button (bottom-left, every page) covers that.

4. **The reassurance line in Section 3 is not optional** — it's a deliberate counterbalance to this page's "one connected system" framing, so visitors who only want one product don't feel pressured into buying all three.
