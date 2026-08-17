// Shared decorative background: a few large, sparse, dashed isometric
// cube outlines. Extracted from AIEnginesSection's cube-visual work so any
// section can reuse the exact same pattern instead of re-deriving it.
//
// Each shape is a hexagon silhouette plus 3 spokes meeting at its center —
// the flat-isometric shorthand for "a cube's edges" (one hexagon = 2 faces'
// worth of parallelogram outline; the spokes mark the third, shared
// corner). Coordinates are real pixel values in the parent <svg>'s own
// viewBox, not a nested <symbol> scaled up via <use> — a stroke-width set
// inside a tiny -1..1 symbol space renders enormous once a <use> viewBox
// transform scales it ~100x, which is what first read as "solid and heavy"
// instead of delicate. Real coordinates keep stroke-width meaning one
// actual pixel, so stroke-dasharray renders crisp.

type WireframeShape = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
};

const DEFAULT_SHAPES: WireframeShape[] = [
  { cx: 70, cy: 40, r: 130, opacity: 0.5 },
  { cx: 330, cy: 210, r: 100, opacity: 0.35 },
];

function isoCubeOutline({ cx, cy, r, opacity }: WireframeShape) {
  const dx = r * 0.866;
  const dy = r * 0.5;
  const points = `${cx},${cy - r} ${cx + dx},${cy - dy} ${cx + dx},${cy + dy} ${cx},${cy + r} ${cx - dx},${cy + dy} ${cx - dx},${cy - dy}`;
  return (
    <g key={`${cx}-${cy}-${r}`} opacity={opacity}>
      <polygon points={points} />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r} />
      <line x1={cx} y1={cy} x2={cx + dx} y2={cy + dy} />
      <line x1={cx} y1={cy} x2={cx - dx} y2={cy + dy} />
    </g>
  );
}

type WireframeCubesBgProps = {
  className?: string;
  shapes?: WireframeShape[];
  /** Stroke color; defaults to the theme's outline-variant token. Pass an
   * explicit color (e.g. a translucent white) when the background sits on
   * a fixed dark panel that doesn't otherwise track the site theme. */
  stroke?: string;
};

export default function WireframeCubesBg({ className, shapes = DEFAULT_SHAPES, stroke }: WireframeCubesBgProps) {
  return (
    <svg
      className={`wireframe-cubes-bg${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      viewBox="0 0 400 280"
      preserveAspectRatio="xMidYMid slice"
      style={stroke ? ({ "--wireframe-stroke": stroke } as React.CSSProperties) : undefined}
    >
      <style>{`
        .wireframe-cubes-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          fill: none;
          stroke: var(--wireframe-stroke, var(--st-outline-variant));
          stroke-width: 1;
          stroke-dasharray: 4 4;
        }
      `}</style>
      {shapes.map(isoCubeOutline)}
    </svg>
  );
}
