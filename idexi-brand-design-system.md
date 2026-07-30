# Idexi AI — Brand Design System (Universal Reference)
**Version 1.0 — Source of truth for all Idexi-branded surfaces**

> Scope note: This document defines the brand's visual language independent of any single codebase. It contains zero references to specific components, files, or app-specific logic. Any AI agent or engineer implementing an Idexi-branded interface — SaaS app, marketing site, admin panel, mobile app — should treat this as the constitution and layer project-specific migration plans on top of it, not instead of it.

---

## 1. Brand Identity

Idexi AI is premium, futuristic, and intelligent. The visual language should feel like a signal being received and understood — hence the recurring arc/wave motifs. Dark-mode is the default state, not an alternate theme; light surfaces are the exception, used only for specific inverted sections (e.g. a light-background pricing table for print/export contexts).

---

## 2. Design Tokens — Color

Define these as CSS custom properties in a global stylesheet (Tailwind v4 `@theme` block or equivalent). Names are semantic, not tied to any component.

```css
@theme {
  /* Core gradient backgrounds */
  --color-bg-gradient-from: #111d50;
  --color-bg-gradient-to:   #29377b;

  /* Accent gradient (CTAs, highlights, active states) */
  --color-accent-gradient-from: #31c4f3;
  --color-accent-gradient-to:   #29377b;

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-muted:   #C7CCE6; /* derived: bg-gradient-to lightened for secondary text on dark */

  /* Neutral / inverted-surface use */
  --color-surface-neutral: #F2F2F2;
  --color-surface-neutral-text: #111d50; /* text color when placed on neutral surface */

  /* Functional accents (derive as needed, keep hue-consistent with accent) */
  --color-glow: #31c4f3;
  --color-border-subtle: rgba(255, 255, 255, 0.12);
  --color-border-glow: rgba(49, 196, 243, 0.5);
}
```

**Rule:** No raw hex values should appear in component code. Every color reference resolves to one of the tokens above. If a new shade is needed, add it here first, then consume it — never invent a one-off hex in a component file.

---

## 3. Typography System

- **Headings:** Poppins, weights 600 (subheads) / 700 (primary headings)
- **Body:** Inter, weights 400 (body) / 500 (emphasis, labels, buttons)

Type ramp (apply consistently regardless of framework):

| Role | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Display / H1 | Poppins | 700 | 3–3.5rem | 1.1 |
| H2 | Poppins | 700 | 2.25rem | 1.15 |
| H3 | Poppins | 600 | 1.5rem | 1.2 |
| H4 / label-strong | Poppins | 600 | 1.125rem | 1.3 |
| Body | Inter | 400 | 1rem | 1.6 |
| Body small / caption | Inter | 400 | 0.875rem | 1.5 |
| Button / UI label | Inter | 500 | 0.9375rem | 1 |

Load via `next/font/google` (or equivalent) and expose as `--font-heading` / `--font-body` CSS variables — never hardcode font-family strings per component.

---

## 4. Spacing & Radius Scale

| Token | Value | Use case |
|---|---|---|
| `radius-sm` | 8px | Inputs, small chips |
| `radius-md` | 12px | Buttons, small cards |
| `radius-lg` | 16px | Standard cards, panels |
| `radius-xl` | 24px | Hero panels, modals, feature cards |

**Rule:** Nothing brand-facing uses `radius-none` or square corners. If a component currently has 0–4px radius, it is out of compliance regardless of what project it lives in.

---

## 5. Motif Library (portable primitives)

These are defined as **generic, reusable primitives** — not tied to any component name — so they can be dropped into any project's own component structure.

### 5.1 Signal Arc
- Concept: 2–4 concentric quarter-circle arcs, radiating from a fixed corner, suggesting a transmitted signal
- Stroke: 2–4px, color `--color-accent-gradient-from` at 20–60% opacity, outer arcs more transparent than inner
- Default viewBox: `0 0 200 200`, arcs anchored to one corner
- Usage rule: place near icons, logo marks, or as a subtle corner decoration on cards/panels — never as a full-bleed background (reserve that for waves)

### 5.2 Wave Pattern
- Concept: soft sine-wave band, 1–2 layered waves, low opacity (8–20%)
- Usage rule: section dividers (top/bottom of hero, footer transition), empty-state backgrounds
- Should be implemented as a reusable primitive (e.g. an SVG snippet or component taking `color`, `opacity`, and `height` as parameters) — any project can wrap this in its own component naming convention

### 5.3 Gradient Glow
- Soft `box-shadow` bloom in `--color-glow`, applied on hover/focus of primary interactive elements
- Reference recipe: `box-shadow: 0 0 24px 4px rgba(49, 196, 243, 0.35);`
- Usage rule: reserved for *primary* actions and active/selected states — do not apply to every element or it loses meaning

---

## 6. Animation Library

Define once globally, reuse everywhere:

```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 16px 2px rgba(49, 196, 243, 0.25); }
  50%      { box-shadow: 0 0 28px 6px rgba(49, 196, 243, 0.45); }
}

@keyframes wave-drift {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes fade-in-arc {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
```

**Rule:** All motion must respect `prefers-reduced-motion: reduce` — provide a static fallback (no animation, final-state styling only) rather than disabling the visual entirely.

---

## 7. Component-Agnostic Usage Rules

These are the rules an AI agent should apply to *its own* project's components, whatever they're named:

1. Dark gradient background (`--color-bg-gradient-from` → `--color-bg-gradient-to`) is the default for any full-bleed section. Light/neutral backgrounds are opt-in exceptions, not the baseline.
2. Every primary call-to-action uses the accent gradient as its background and gains a glow (`pulse-glow` or static glow shadow) on hover/focus.
3. All cards, panels, modals, and inputs use `radius-lg` or `radius-xl` — never sharp corners.
4. At least one motif (signal arc or wave) should appear in any hero, empty-state, or major section transition — brand surfaces should never be a flat, motif-free rectangle.
5. Body text on dark backgrounds is `--color-text-primary` (pure white) for primary copy, `--color-text-muted` for secondary/supporting copy — never gray-on-gray combinations that fall outside the token set.
6. Any exception to these rules must be a deliberate, documented choice (e.g. a printable invoice view that needs a plain white background) — not an oversight.

---

## 8. Accessibility Minimums

- Body text on the primary navy gradient must maintain at least 4.5:1 contrast — verify `--color-text-primary` and `--color-text-muted` against both ends of the gradient, not just the midpoint
- Focus states must be visible independent of the glow effect (glow alone is not a sufficient focus indicator for accessibility — pair with a visible outline or ring)
- Motif elements (arcs, waves) are decorative — mark as `aria-hidden="true"` and never rely on them to convey information

---

## 9. What This Document Deliberately Excludes

- Specific component names, file paths, or framework implementation details of any one project
- Migration sequencing or "what to fix first" — that belongs in a per-project migration plan
- Any project's existing legacy code — this document describes the target state only

When starting work on a new project (or auditing an existing one), feed **this document** to the AI agent as the fixed reference, and have it generate a **separate, disposable** per-project plan that maps its own real components against these rules — the same pattern used for the Idexi SaaS app's Claude Code audit.
