# idexi.tech — Page: Privacy & Security (Developer Spec)
Status: Approved, ready for development
URL: /privacy-security

## Page Purpose
A plain-language trust page explaining how idexi handles guest data — NOT the formal legal Privacy Policy (that's a separate document, linked from the footer bottom bar). This page is educational/reassuring, written for two audiences at once: event organizers deciding whether to trust idexi with their guests' data, AND individual attendees who may land here wondering "what did they do with my photo." Linked from the header mega menu (Learn column) and the footer (Support column).

5 sections total.

## CRITICAL — legal note for Saif and future content editors
This page currently makes NO claims about legal/regulatory compliance (e.g. GDPR, Jordan's PDPL Law No. 24 of 2023, or any other specific data protection law). This is intentional — do not add compliance claims to this page without first having them reviewed by a qualified data protection lawyer. Jordan's Personal Data Protection Law explicitly classifies biometric data as "sensitive personal data" with specific consent and handling requirements — idexi should get legal review on its actual consent flow, data storage location, and cross-border transfer practices before making any public compliance claims.

---

## Section 1 — Hero

**Eyebrow:**
```
PRIVACY & SECURITY
```

**H1:**
```
Your Guests' Data Isn't a Side Note. It's the Foundation.
```

**Subhead:**
```
Whether you're organizing the event or attending it — here's exactly what happens to your data, and why.
```

No buttons in this section.

---

## Section 2 — How We Protect Your Data

**H2:**
```
How We Protect Your Data
```

**Layout:** Three labeled groups, each with a small icon + uppercase label, stacked vertically. Each group contains 1-3 short sentences (not paragraphs).

### Group 1 — What we collect (icon: clipboard-list)
```
Just your name, email, and a photo of your face — nothing more.
```

### Group 2 — How we protect it (icon: shield-lock)
```
A private link to your gallery, sent only to your email.
A one-time code, also sent only to your email — both are required to open it.
Your event's data lives on its own dedicated, secured server.
```

### Group 3 — What we never do (icon: ban)
```
Never used for anything beyond matching you in event photos.
Never shared with sponsors, partners, or anyone outside the event.
Never kept — automatically deleted 30 days after the event ends.
```

### Mechanics note for Saif (how the link + code system actually works)
Each guest's photo gallery has its own unique link. That link is sent only to the email address the guest registered with. To actually open the gallery, the guest ALSO needs a one-time verification code, sent separately to that same email. Both the link and the code are required — this is a two-factor-style protection, not just a single password or a guessable URL.

---

## Section 3 — Sponsors See the Branding, Not the Data

**H2:**
```
Sponsors See the Branding, Not the Data
```

**Body text:**
```
Sponsor logos appear on tickets, emails, and photo galleries — but that's the extent of it. Sponsors never see your name, your email, or your photos themselves. Branding and data are handled completely separately.
```

*(This section exists specifically to prevent a common misconception: that sponsor logos appearing on a guest's ticket/gallery means the sponsor has access to that guest's personal data. They don't — branding placement and data access are entirely separate systems.)*

---

## Section 4 — Common Privacy Questions

**H2:**
```
Common Privacy Questions
```

**Layout:** 4 stacked cards, each with a bold question and a short answer below it (same visual style as FAQ answers used in the site-wide floating widget).

**1. What if the AI matches the wrong photo to someone?**
```
We built our own facial recognition model, trained specifically for crowded event photos — accurate 99% of the time. If anything still looks off, guests can flag it and our team corrects it manually.
```

**2. Will my photos be public for anyone to see?**
```
No. Every gallery is locked behind a private link and a one-time code — both sent only to your registered email.
```

**3. Is there support if something goes wrong during the event itself?**
```
Yes — our team is reachable throughout your event, not just before it.
```

**4. What happens to our data after the event ends?**
```
We don't keep it. Every event's photos are stored on a dedicated, secured server and automatically deleted 30 days after the event ends.
```

*(Note: these 4 Q&As are a focused subset of the full 11-question site-wide floating "Common Questions" widget — same exact wording, just the privacy-relevant ones surfaced here directly since this page's visitor is already thinking about privacy.)*

---

## Section 5 — Final CTA

**H2:**
```
Still have a question about your data?
```

**Subhead:**
```
Whether you're organizing an event or looking for your own photos, we're here to help.
```

**Two buttons, side by side (this page serves both audiences, so both CTAs are shown together — unlike other pages which have one primary CTA):**
- "Book a Demo" (primary, filled style — for organizers)
- "Where's My Photo?" (outline style with camera icon — for attendees, same style as the header button)

---

## Design notes for Saif
1. This is one of the few pages on the site that explicitly serves both B2B organizers and individual attendees with equal weight throughout — reflected in the dual-audience hero subhead and the two-button final CTA (most other pages have a single primary CTA).
2. No pricing, no sales-heavy language anywhere on this page — the tone should stay purely informational and reassuring throughout.
3. Do not add any specific legal/regulatory compliance claims without legal review first (see the CRITICAL note at the top of this document).
