// The actual idexi brand mark (per public/logo-*.png): four concentric
// quarter-circle arcs radiating from a shared corner, like a signal/
// broadcast symbol. Traced as four 90-degree arcs sharing one center point
// (18,18), radii 3/7/11/15 apart — no dedicated small icon-only asset
// exists in public/ (only full horizontal/stacked wordmark lockups, which
// read as an illegible blur at small sizes), so this is a hand-built
// replica rather than a raster crop of the full lockup. Extracted as a
// shared component once a second surface (the ticket widget) needed it
// alongside AIEnginesSection's chat-sender label.
export default function IdexiMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 18A15 15 0 0 1 18 3" />
      <path d="M7 18A11 11 0 0 1 18 7" />
      <path d="M11 18A7 7 0 0 1 18 11" />
      <path d="M15 18A3 3 0 0 1 18 15" />
    </svg>
  );
}
