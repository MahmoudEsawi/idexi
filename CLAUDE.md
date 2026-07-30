# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js + Turbopack) at localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (eslint-config-next core-web-vitals + typescript)
```

There is no test suite configured in this repo.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Architecture

Marketing/landing site for **idexi**, an AI event-solutions product, built with Next.js App Router (Next 16, React 19, TypeScript, strict mode). No CMS, no backend, no database — everything is static JSX content with client-side interactivity.

- `src/app/layout.tsx` — root layout; wraps every route in `Navbar` + `Footer`, sets shared metadata/viewport.
- `src/app/page.tsx` — the home page. All landing sections (Hero, Services, How It Works, Use Cases, Stats, About, Contact) live here as one large component; the contact form is local `useState` only (no submission endpoint — `handleSubmit` just fakes a success state).
- `src/app/services/{face,flow,pass}/page.tsx` — one dedicated page per product line (idexi Face, idexi Flow, idexi Pass), each following the same section layout (hero mockup → steps → benefits → target audiences).
- `src/components/` — shared pieces: `Navbar`, `Footer`, `Hero`, `ServiceCard` (used on the home page's services grid), `InteractiveWaves` and `ConcentricArcs` (decorative animated backgrounds), `StepRow`.
- Path alias `@/*` maps to `src/*` (see tsconfig.json).

### Styling convention

There is no CSS framework (no Tailwind/CSS-in-JS library). Every component is `"use client"` and defines its own scoped styles as a template-literal string rendered via `<style>{someCSS}</style>` at the top of its JSX (e.g. `pageCSS` in `page.tsx`, `navCSS` in `Navbar.tsx`, `cardCSS` in `ServiceCard.tsx`). Shared tokens, resets, typography, buttons, and reusable utility classes (`.glass-card`, `.btn-primary`, `.text-gradient`, `.service-*` classes used across the three service pages, `.footer-*`) live in `src/app/globals.css`. When adding a new section or component, follow this pattern: reusable/cross-page classes go in `globals.css`, component-local classes go in that component's own inline `<style>` block.

Design tokens (CSS custom properties defined in `globals.css`, e.g. `--accent-cyan`, `--bg-deep`, `--glass-bg`, `--font-headings`/`--font-body`) drive the dark, glassmorphism, cyan-accented aesthetic described in `design_brief.md` — check that file before making visual/branding decisions (colors, motifs like concentric arcs/waves, rounded "containment" shapes).

### Adding a new service page

Copy the structure of an existing page under `src/app/services/*/page.tsx` (badge → title → description → CTA → mockup card → steps grid → benefits → target audiences) and reuse the `.service-*` classes from `globals.css` rather than inventing new ones.
