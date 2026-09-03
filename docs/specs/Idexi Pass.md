# idexi.tech — Product Page: Idexi Pass (Developer Spec)
Status: Approved, ready for development
URL: /products/pass

## Page Purpose
Unlike the homepage (which convinces a visitor idexi as a whole is worth their time), this page is for a visitor who already wants details on ONE product before deciding. Tone is more technical, less emotional, no filler.

This page has 6 sections total — deliberately no dedicated FAQ section here, since the global floating "Common Questions" button (bottom-left, every page) already covers questions site-wide.

---

## Section 1 — Hero

**Eyebrow:**
```
IDEXI PASS
```

**H1:**
```
Smart Digital Ticketing
```

**Subhead:**
```
No manual approvals. No generic tickets. Just a personalized, fraud-proof QR ticket in every guest's inbox, in minutes.
```

**Buttons:**
- Primary: "Book a Demo"
- Secondary: "See the Comparison ↓" (scrolls down to Section 2 on this same page — not a separate page link)

---

## Section 2 — The Old Way vs The idexi Way

**H2:**
```
Ticketing shouldn't be this much work.
```

**Subhead:**
```
Here's exactly what changes.
```

**Layout — IMPORTANT, this is a specific weighted design, not a plain 50/50 table:**
- Two-column layout per row, but asymmetric: left column ~30% width, right column ~70% width
- Left column (old way): small muted gray text, strikethrough, right-aligned, NO card/background — it should look "crossed out" and secondary
- Right column (idexi way): rounded card with light blue background (#E6F1FB), checkmark icon (blue #0C447C) + bold blue text (#0C447C) — this should visually dominate the eye
- 5 rows total, each row is its own left/right pair (not one big table with header divider — just 5 stacked comparison rows)

**Content (5 rows, exact wording):**

| Old way (left, muted/struck) | idexi way (right, card, bold) |
|---|---|
| Manual approvals slow registration | Delivered automatically, in minutes |
| Generic tickets feel unprofessional | Fully branded, with the guest's name |
| Categories managed by hand invite errors | VIP, general, press, staff — built in |
| Screenshotted tickets get reused | One encrypted QR, one entry only |
| Sponsor visibility is an afterthought | Sponsor branding on every ticket |

---

## Section 3 — Three Steps. That's It.

**H2:**
```
Three Steps. That's It.
```

**Layout:** Horizontal 3-step connected flow — three circular icon badges connected by dashed flowing lines (same visual language as the homepage's "How It Works" animation, but this version can be static/non-animated since it's just 3 fixed steps, not a cycling loop). Blue accent color (matches Idexi Pass brand color used site-wide).

**The 3 Steps (icon + title + one-sentence description):**

1. **Icon:** upload/file icon
   **Title:** The Guest List
   **Description:** Upload an Excel sheet with names and categories — along with your event logo and your sponsors' logos.

2. **Icon:** lightning/automation icon
   **Title:** The Automation
   **Description:** The system generates a personalized email and a professionally designed ticket — complete with a QR code — for every guest.

3. **Icon:** mail/inbox icon
   **Title:** The Delivery
   **Description:** Each guest receives their own branded ticket by email, automatically, in minutes.

**Small note below the 3 steps (muted, smaller text):**
```
That QR code is what Idexi Flow uses later at the door.
```

**Closing link:**
```
See the full connected journey — from ticket to photo → (links to /how-it-works)
```

### IMPORTANT — accuracy note for Saif (mechanics of the product)
Idexi Pass's job ENDS at generating and delivering the personalized email + ticket. It does NOT handle door check-in or scanning — that's Idexi Flow's job entirely. Do not blur these two products together anywhere in this page's copy or in any future edits. The QR code Pass generates is simply handed off to Flow later — Pass itself has no door/scanning functionality.

---

## Section 4 — What makes it work

**H2:**
```
What makes it work
```

**Layout:** 3-column grid, icon + bold title + short description per column.

1. **Icon:** upload icon
   **Title:** One Upload, Everything Personalized
   **Description:** Upload your guest list, your event branding, and your sponsors' logos — once. Every guest then gets their own personalized email and ticket, automatically.

2. **Icon:** tags icon
   **Title:** Categories, Matched to the Right Message
   **Description:** VIP, general, press, staff — each category gets its own message and ticket design, generated automatically from one upload.

3. **Icon:** sparkles icon
   **Title:** A Ticket That Looks the Part
   **Description:** Every ticket is professionally designed with your event's identity and your sponsors' logos — not just a QR code in a plain email.

---

## Section 5 — Works Even Better With...

**H2:**
```
Works Even Better With...
```

**Subhead:**
```
Pass gets the ticket out. Here's what happens next.
```

**Layout:** 2-column grid, two cross-sell cards.

**Card 1 — Idexi Flow**
```
That QR code on every ticket? It's what your staff scans at the door — no printed lists, no separate system.
See Idexi Flow → (links to /products/flow)
```

**Card 2 — Idexi Face**
```
Once guests are checked in, their photos find them automatically — delivered to the same inbox that got their ticket.
See Idexi Face → (links to /products/face)
```

---

## Section 6 — Final CTA

**H2:**
```
Ready to send your first ticket?
```

**Subhead:**
```
Tell us about your event. We'll show you exactly how Idexi Pass fits — no commitment, no pressure.
```

**Form:** Same fields/behavior as the homepage Final CTA form (Full name, Email, Phone, Event type, What interests you most?) — EXCEPT the "What interests you most?" field should come pre-selected to "Idexi Pass" by default on this page (visitor can still change it if they want).

**Button:** Book a Demo (same site-wide style)

---

## Template note for Saif
This exact 6-section structure (Hero → Comparison → 3-Step Process → Feature Highlights → Cross-sell → Final CTA) will be reused identically for the Idexi Flow and Idexi Face product pages — same layout patterns, different content and accent color (teal for Flow, coral for Face). Build this as a reusable page template if practical, rather than one-off code.
