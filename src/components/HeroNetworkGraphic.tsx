"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type NodeRole = "neutral" | "secondary" | "accent";

type GraphNode = {
  // Base direction * radius fraction, magnitude in (0, 1]. Rotated fresh
  // from this each frame so rotation never accumulates floating-point drift.
  baseX: number;
  baseY: number;
  baseZ: number;
  r: number;
  role: NodeRole;
};

type Colors = {
  neutral: string;
  secondary: string;
  accent: string;
  edge: string;
};

// A single traveling "data flow" pulse: spawns at the center and rides a
// freshly-generated straight line out into empty space (not an existing
// node/edge), then is discarded.
type Pulse = {
  baseX: number;
  baseY: number;
  baseZ: number;
  role: NodeRole;
  startTime: number;
  duration: number;
};

const PERSPECTIVE = 2.6;
// Caps how much a node near the camera plane (p.z approaching PERSPECTIVE)
// can be magnified. Without this, the combination of the full scatter
// radius and a node landing close to the view axis can blow projected
// position/size up several-fold, which is what was pushing nodes past the
// canvas's own vertical bounds even with a taller container.
const MAX_DEPTH_SCALE = 1.55;
const AUTO_SPIN = 0.0015; // rad/frame ambient turntable drift
const DRAG_SENSITIVITY = 0.008;
const FRICTION = 0.94;
const MAX_ACTIVE_PULSES = 2;
const PULSE_SPAWN_DELAY_MIN_MS = 900;
const PULSE_SPAWN_DELAY_MAX_MS = 2200;
const PULSE_DURATION_MIN_MS = 1800;
const PULSE_DURATION_MAX_MS = 3200;
const PULSE_RADIUS = 2.6;
// Independent of the structured cloud's own (now fixed two-shell) radius —
// pulses travel a continuous range from near-center out to the outer shell,
// which is a deliberate visual difference from the node placement, not
// meant to mirror it.
const PULSE_TARGET_RADIUS_MIN = 0.18;
const PULSE_TARGET_RADIUS_MAX = 1.0;

// Structured <-> scattered state-loop phase durations, in ms.
type Phase = "structured" | "scattering" | "scattered" | "gathering";
const PHASE_DURATION_MS: Record<Phase, number> = {
  structured: 4200,
  scattering: 1700,
  scattered: 2600,
  gathering: 1500,
};
// Scattered layout: a few galaxy-arm-shaped clusters (attractors), each
// nodes riding along a random swept curve through it rather than piling up
// at a single point — dense enough to read as a cluster, loose enough that
// the connecting lines between nodes stay visible instead of vanishing
// under overlapping circles.
const SCATTER_CLUSTER_COUNT_MIN = 2;
const SCATTER_CLUSTER_COUNT_MAX = 4;
// Independent per-axis spread (not a spherical direction * radius), so
// attractor placement doesn't fall back into a round shell shape.
const SCATTER_CLUSTER_SPREAD_X = 1.0;
const SCATTER_CLUSTER_SPREAD_Y = 0.75;
const SCATTER_CLUSTER_SPREAD_Z = 1.0;
// Each cluster sweeps along a random tangent direction, bent toward a
// random normal by `curvature` (parabolic — a gentle arc, not a straight
// line) — the "galaxy arm" shape. thicknessSigma is small isotropic
// Gaussian jitter off that curve, giving the arm volume without collapsing
// back into a tight ball.
const SCATTER_ARM_LENGTH_MIN = 0.4;
const SCATTER_ARM_LENGTH_MAX = 0.8;
const SCATTER_ARM_CURVATURE_MIN = 0.15;
const SCATTER_ARM_CURVATURE_MAX = 0.45;
const SCATTER_ARM_THICKNESS_SIGMA = 0.11;

function projectDepthScale(z: number) {
  return Math.min(MAX_DEPTH_SCALE, PERSPECTIVE / (PERSPECTIVE - z));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Box-Muller transform: converts two uniform (0,1) draws into one
// standard-normal (Gaussian) sample, so cluster jitter concentrates near
// zero with a thinning tail instead of a hard-edged uniform spread.
function gaussianRandom(rand: () => number) {
  const u = Math.max(rand(), Number.EPSILON);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type Vec3 = { x: number; y: number; z: number };

function cross(a: Vec3, b: Vec3): Vec3 {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

// Uniform-random unit vector — same golden-angle-free sphere sampling used
// for pulse targets, factored out since arm tangents need the same thing.
function randomDirection(rand: () => number): Vec3 {
  const theta = rand() * Math.PI * 2;
  const phi = Math.acos(2 * rand() - 1);
  return { x: Math.sin(phi) * Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(theta) };
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Evenly spread directions across a sphere (golden-angle spiral).
function fibonacciDirection(i: number, n: number) {
  const y = 1 - (i / Math.max(1, n - 1)) * 2;
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const theta = goldenAngle * i;
  return { x: Math.cos(theta) * radiusAtY, y, z: Math.sin(theta) * radiusAtY };
}

// Bumped from the original 72 (~1.8x) so the scattered clusters read as
// dense, heavy clouds rather than thin constellations, while the fibonacci
// spiral keeps the structured state evenly distributed at this count too.
const NODE_COUNT = 130;
// The structured silhouette's crispness comes from nodes sitting at one of
// exactly two radii, not a random distance each — a random radiusFrac per
// node is what was reading as jagged/clumpy rather than a clean starburst.
const STRUCTURED_OUTER_RADIUS = 1.0;
const STRUCTURED_INNER_RADIUS = 0.5;
const STRUCTURED_OUTER_SHARE = 0.85;

function generateNodes(seed: number): GraphNode[] {
  const rand = mulberry32(seed);
  const count = NODE_COUNT;
  const nodes: GraphNode[] = [];
  for (let i = 0; i < count; i++) {
    // fibonacciDirection already places directions on a perfect golden-angle
    // lattice (uniform angular spacing, no pole clumping); every node just
    // needs to land on one of the two fixed shells along that direction.
    const dir = fibonacciDirection(i, count);
    const radiusFrac = rand() < STRUCTURED_OUTER_SHARE ? STRUCTURED_OUTER_RADIUS : STRUCTURED_INNER_RADIUS;
    const sizeRoll = rand();
    const r = sizeRoll > 0.93 ? 8 + rand() * 4 : sizeRoll > 0.68 ? 5 + rand() * 2 : 2 + rand() * 2;
    const colorRoll = rand();
    const role: NodeRole = colorRoll < 0.55 ? "neutral" : colorRoll < 0.86 ? "secondary" : "accent";
    nodes.push({ baseX: dir.x * radiusFrac, baseY: dir.y * radiusFrac, baseZ: dir.z * radiusFrac, r, role });
  }
  return nodes;
}

function readColors(): Colors {
  const styles = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    neutral: get("--st-on-surface-variant", "#45464e"),
    secondary: get("--st-secondary", "#0058bc"),
    accent: get("--st-accent-data", "#00939b"),
    edge: get("--st-outline-variant", "#c6c6cf"),
  };
}

type RGB = [number, number, number];

// Renders the color to a 1x1 canvas and reads the pixel back — the browser
// normalizes any valid CSS color (hex, rgb(), a resolved custom property,
// even oklch()) into concrete RGB this way, without hand-rolling a parser.
function toRGB(color: string): RGB {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const pctx = probe.getContext("2d");
  if (!pctx) return [0, 0, 0];
  pctx.fillStyle = color;
  pctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = pctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

const SCATTERED_LIGHT_MODE_RGB: RGB = [17, 17, 17]; // #111 — "black nodes" target

export default function HeroNetworkGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let colors = readColors();
    let roleRGB: Record<NodeRole, RGB> = {
      neutral: toRGB(colors.neutral),
      secondary: toRGB(colors.secondary),
      accent: toRGB(colors.accent),
    };
    let isLightTheme = document.documentElement.getAttribute("data-theme") === "light";
    const nodes = generateNodes(7);
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let worldScale = 0;
    // How much wider the X projection stretches at full scatter, relative
    // to worldScale — computed from the canvas's own aspect ratio. The
    // structured state's roughly-circular shape is bounded by the shorter
    // dimension (nearly always height, since the hero is full-bleed and
    // wide), which is correct and unchanged; but that leaves the scattered
    // cloud with the exact same circular footprint sitting in a mostly-empty
    // wide box. Stretching X only (post-rotation, in screen space) as
    // scatterAmount rises fixes that without touching the 3D world-space
    // distribution — which matters because that distribution rotates with
    // drag, so any anisotropic bias baked into it would un-fix itself the
    // moment the user rotates the structure 90 degrees.
    let scatterWidthStretch = 1;
    let rafId = 0;

    // The canvas is now full-bleed across the whole hero section (not a
    // half-width column), so the drawing origin is offset toward the right
    // instead of dead-center — otherwise the cluster would render in the
    // middle of the screen, behind the text. Matches the .st-hero desktop
    // breakpoint in page.tsx: below it the layout stacks and there's no
    // "right side" to bias toward, so the origin re-centers.
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let centerXFraction = desktopQuery.matches ? 0.72 : 0.5;

    // rotationY = yaw (turn left/right), rotationX = pitch (tilt up/down).
    // Both accumulate every frame with no clamp or modulo wrap, so dragging
    // in one direction keeps spinning the structure infinitely — trig
    // functions handle arbitrarily large angles natively.
    let rotationY = 0.4;
    let rotationX = -0.25;
    let rotationYVel = 0;
    let rotationXVel = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    let activePulses: Pulse[] = [];
    let pulseSpawnTimeoutId: ReturnType<typeof setTimeout> | undefined;

    // Independent seeded stream so each scatter cycle gets a fresh chaotic
    // arrangement (not the same explode shape every loop) while staying
    // reproducible within a given run.
    const scatterRand = mulberry32(23);
    let scatterTargets = nodes.map((n) => ({ x: n.baseX, y: n.baseY, z: n.baseZ }));
    // Which other node each node's edge points to while scattered — its
    // nearest neighbor among that cycle's scatterTargets, so lines connect
    // clustered nodes to each other instead of all radiating from center.
    let neighborIndex: number[] = nodes.map((_, i) => (i + 1) % nodes.length);

    const regenerateScatterTargets = () => {
      const clusterCount =
        SCATTER_CLUSTER_COUNT_MIN + Math.floor(scatterRand() * (SCATTER_CLUSTER_COUNT_MAX - SCATTER_CLUSTER_COUNT_MIN + 1));

      const clusters = Array.from({ length: clusterCount }, () => {
        const center: Vec3 = {
          x: (scatterRand() * 2 - 1) * SCATTER_CLUSTER_SPREAD_X,
          y: (scatterRand() * 2 - 1) * SCATTER_CLUSTER_SPREAD_Y,
          z: (scatterRand() * 2 - 1) * SCATTER_CLUSTER_SPREAD_Z,
        };
        // The arm's sweep direction and the axis it bends toward — normal
        // is built via cross product against an arbitrary reference so it's
        // always perpendicular to tangent regardless of tangent's own
        // orientation (falls back to a different reference on the rare
        // near-parallel case so the cross product doesn't degenerate).
        const tangent = randomDirection(scatterRand);
        const reference: Vec3 = Math.abs(tangent.y) > 0.9 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
        const normal = normalize(cross(tangent, reference));
        const armLength = SCATTER_ARM_LENGTH_MIN + scatterRand() * (SCATTER_ARM_LENGTH_MAX - SCATTER_ARM_LENGTH_MIN);
        const curvature =
          SCATTER_ARM_CURVATURE_MIN + scatterRand() * (SCATTER_ARM_CURVATURE_MAX - SCATTER_ARM_CURVATURE_MIN);
        return { center, tangent, normal, armLength, curvature };
      });

      // Which attractor each node was assigned to — kept alongside the
      // target so the neighbor search below can stay inside the same
      // cluster instead of occasionally reaching across the negative space
      // to a nearby-but-different nebula.
      const clusterOf: number[] = [];
      scatterTargets = nodes.map(() => {
        const clusterIdx = Math.floor(scatterRand() * clusterCount);
        clusterOf.push(clusterIdx);
        const { center, tangent, normal, armLength, curvature } = clusters[clusterIdx];

        // Position along the swept arc: t runs the node's distance along
        // the arm (uniform, so density stays roughly even along its
        // length), bent toward `normal` by a parabolic term in t — a
        // gentle arc rather than a straight cigar shape.
        const t = scatterRand() * 2 - 1;
        const along = t * armLength;
        const bend = curvature * armLength * t * t;

        return {
          x: center.x + tangent.x * along + normal.x * bend + gaussianRandom(scatterRand) * SCATTER_ARM_THICKNESS_SIGMA,
          y: center.y + tangent.y * along + normal.y * bend + gaussianRandom(scatterRand) * SCATTER_ARM_THICKNESS_SIGMA,
          z: center.z + tangent.z * along + normal.z * bend + gaussianRandom(scatterRand) * SCATTER_ARM_THICKNESS_SIGMA,
        };
      });

      // Nearest neighbor restricted to same-cluster members (~O(n^2) worst
      // case but each cluster is a fraction of 130 nodes, and this runs
      // once per scatter cycle, not per frame) — guarantees the "spiderweb"
      // lines stay inside each dense cloud rather than crossing clusters.
      neighborIndex = scatterTargets.map((target, i) => {
        let bestIndex = -1;
        let bestDistSq = Infinity;
        for (let j = 0; j < scatterTargets.length; j++) {
          if (j === i || clusterOf[j] !== clusterOf[i]) continue;
          const other = scatterTargets[j];
          const dx = target.x - other.x;
          const dy = target.y - other.y;
          const dz = target.z - other.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < bestDistSq) {
            bestDistSq = distSq;
            bestIndex = j;
          }
        }
        // A cluster of exactly one node has no same-cluster neighbor —
        // vanishingly rare at 130 nodes across at most 4 clusters, but fall
        // back to any other node rather than leaving the index unset.
        return bestIndex === -1 ? (i + 1) % scatterTargets.length : bestIndex;
      });
    };

    let phase: Phase = "structured";
    let phaseStartTime: number | null = null;

    // Advances the structured <-> scattered loop and returns how far along
    // the current interpolation is. scatterAmount 0 = fully structured
    // (rendered from node.base*), 1 = fully scattered (rendered from the
    // matching scatterTargets entry). The connecting lines stay visible at
    // every value of scatterAmount — only node position (and, in light
    // mode, node color) respond to it.
    const advancePhase = (now: number): number => {
      if (phaseStartTime === null) phaseStartTime = now;
      const elapsed = now - phaseStartTime;
      const duration = PHASE_DURATION_MS[phase];

      if (phase === "structured") {
        if (elapsed >= duration) {
          phase = "scattering";
          phaseStartTime = now;
          regenerateScatterTargets();
        }
        return 0;
      }

      if (phase === "scattering") {
        if (elapsed >= duration) {
          phase = "scattered";
          phaseStartTime = now;
          return 1;
        }
        return easeInOutCubic(elapsed / duration);
      }

      if (phase === "scattered") {
        if (elapsed >= duration) {
          phase = "gathering";
          phaseStartTime = now;
        }
        return 1;
      }

      // gathering: fast collapse that eases into place for an elegant snap,
      // no overshoot (targets are decorrelated per-node directions, so any
      // overshoot geometry would look like noise rather than a clean spring).
      if (elapsed >= duration) {
        phase = "structured";
        phaseStartTime = now;
        return 0;
      }
      return 1 - easeOutCubic(elapsed / duration);
    };

    const scheduleNextPulse = () => {
      const delay = PULSE_SPAWN_DELAY_MIN_MS + Math.random() * (PULSE_SPAWN_DELAY_MAX_MS - PULSE_SPAWN_DELAY_MIN_MS);
      pulseSpawnTimeoutId = setTimeout(() => {
        // Pulses only make sense as "data flowing through the structure" —
        // skip spawning while the network is scattering/scattered/gathering.
        if (activePulses.length < MAX_ACTIVE_PULSES && phase === "structured") {
          // Uniform-random point on a sphere (not a node position), scaled
          // to a random radius within the network's own outer bounds.
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = PULSE_TARGET_RADIUS_MIN + Math.random() * (PULSE_TARGET_RADIUS_MAX - PULSE_TARGET_RADIUS_MIN);
          const roleRoll = Math.random();
          activePulses.push({
            baseX: Math.sin(phi) * Math.cos(theta) * radius,
            baseY: Math.cos(phi) * radius,
            baseZ: Math.sin(phi) * Math.sin(theta) * radius,
            role: roleRoll < 0.55 ? "neutral" : roleRoll < 0.86 ? "secondary" : "accent",
            startTime: performance.now(),
            duration: PULSE_DURATION_MIN_MS + Math.random() * (PULSE_DURATION_MAX_MS - PULSE_DURATION_MIN_MS),
          });
        }
        scheduleNextPulse();
      }, delay);
    };

    const resize = (nextWidth: number, nextHeight: number) => {
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width * centerXFraction;
      centerY = height / 2;
      // Reduced from the pre-scatter/pre-fullbleed value: the wrapper is now
      // full-bleed and much wider than it is tall, so height is almost
      // always the limiting min(width, height) dimension. A smaller
      // multiplier keeps scattered nodes (see SCATTER_RADIUS_MAX) inside
      // the canvas's own vertical bounds instead of relying solely on
      // making the section taller, which shrinks the overshoot in pixels
      // but not as a fraction of the box.
      worldScale = Math.min(width, height) * 0.34;
      // Clamped so extremely ultra-wide viewports don't stretch the cloud
      // into an unreadable flat smear.
      scatterWidthStretch = Math.min(Math.max(width / height, 1), 2.2);
    };

    const onDesktopQueryChange = (ev: MediaQueryListEvent) => {
      centerXFraction = ev.matches ? 0.72 : 0.5;
      resize(width, height);
      // Start/stop alongside the CSS that shows/hides this canvas — see
      // startLoop's note below.
      if (ev.matches) startLoop();
      else stopLoop();
    };
    desktopQuery.addEventListener("change", onDesktopQueryChange);

    const rotate = (x: number, y: number, z: number) => {
      // rotationY (Y axis) then rotationX (X axis)
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    const draw = (now: number, scatterAmount: number) => {
      ctx.clearRect(0, 0, width, height);

      // Blends from the plain (structured) scale up to the wide-canvas
      // stretch as the network scatters — see scatterWidthStretch above.
      const worldScaleX = worldScale * (1 + (scatterWidthStretch - 1) * scatterAmount);

      // Pass 1: each node's interpolated position in world space (still
      // unrotated) — kept separate from the projected/screen pass because
      // edges need this raw 3D position for their own node (both passes
      // use the identical interpolation, just applied to different points).
      const worldPositions = nodes.map((n, i) => {
        const target = scatterTargets[i];
        return {
          x: n.baseX + (target.x - n.baseX) * scatterAmount,
          y: n.baseY + (target.y - n.baseY) * scatterAmount,
          z: n.baseZ + (target.z - n.baseZ) * scatterAmount,
        };
      });

      // Pass 2: rotate + project each world position to screen space — same
      // rotate() as everything else, so the cloud stays locked to drag.
      const projected = worldPositions.map((w, i) => {
        const p = rotate(w.x, w.y, w.z);
        const depthScale = projectDepthScale(p.z);
        return {
          x: centerX + p.x * worldScaleX * depthScale,
          y: centerY + p.y * worldScale * depthScale,
          r: nodes[i].r * depthScale,
          role: nodes[i].role,
          z: p.z,
        };
      });

      // Edges: origin blends from true center (structured) to the node's
      // nearest scattered neighbor's live position (scattered) — using the
      // neighbor's current worldPositions entry, not its static target, so
      // the line stays anchored to the neighbor as it moves mid-transition.
      for (let i = 0; i < nodes.length; i++) {
        const neighbor = worldPositions[neighborIndex[i]];
        const originWorld = {
          x: neighbor.x * scatterAmount,
          y: neighbor.y * scatterAmount,
          z: neighbor.z * scatterAmount,
        };
        const originP = rotate(originWorld.x, originWorld.y, originWorld.z);
        const originDepth = projectDepthScale(originP.z);
        const originX = centerX + originP.x * worldScaleX * originDepth;
        const originY = centerY + originP.y * worldScale * originDepth;

        const p = projected[i];
        const opacity = 0.28 + ((p.z + 1) / 2) * 0.4;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      // No node/dot drawn at the center — lines still geometrically
      // converge on (centerX, centerY) via the edge-origin math above, but
      // the point itself stays empty rather than marked with a circle.

      for (const p of projected) {
        const opacity = 0.55 + ((p.z + 1) / 2) * 0.45;
        ctx.globalAlpha = opacity;
        if (isLightTheme) {
          // Interpolate the node's normal role color toward near-black in
          // lockstep with scatterAmount — the same driver as position, so
          // the color settles exactly as the node reaches its scattered
          // spot rather than snapping. Dark mode keeps the vibrant palette
          // throughout so nodes don't disappear against the dark backdrop.
          const [r0, g0, b0] = roleRGB[p.role];
          const [r1, g1, b1] = SCATTERED_LIGHT_MODE_RGB;
          const r = Math.round(r0 + (r1 - r0) * scatterAmount);
          const g = Math.round(g0 + (g1 - g0) * scatterAmount);
          const b = Math.round(b0 + (b1 - b0) * scatterAmount);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        } else {
          ctx.fillStyle = colors[p.role];
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.r), 0, Math.PI * 2);
        ctx.fill();
      }

      // Drop pulses that have finished their travel this frame.
      activePulses = activePulses.filter((pulse) => now - pulse.startTime < pulse.duration);

      for (const pulse of activePulses) {
        const t = Math.min(1, Math.max(0, (now - pulse.startTime) / pulse.duration));
        // Ease outward (fast start, slows near the target) and fade in/out
        // with a smooth 0 -> 1 -> 0 envelope across the whole trip.
        const eased = 1 - Math.pow(1 - t, 3);
        const envelope = Math.sin(t * Math.PI);

        // Same rotate() used for every other node: dragging mid-flight keeps
        // the pulse (and its trailing line) locked to its 3D path exactly
        // like the rest of the graph.
        const p = rotate(pulse.baseX * eased, pulse.baseY * eased, pulse.baseZ * eased);
        const depthScale = projectDepthScale(p.z);
        const x = centerX + p.x * worldScaleX * depthScale;
        const y = centerY + p.y * worldScale * depthScale;

        ctx.globalAlpha = envelope * 0.5;
        ctx.strokeStyle = colors[pulse.role];
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.globalAlpha = envelope * 0.85;
        ctx.fillStyle = colors[pulse.role];
        ctx.beginPath();
        ctx.arc(x, y, PULSE_RADIUS * depthScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (!isDragging) {
        rotationY += AUTO_SPIN + rotationYVel;
        rotationX += rotationXVel;
        rotationYVel *= FRICTION;
        rotationXVel *= FRICTION;
        if (Math.abs(rotationYVel) < 0.00005) rotationYVel = 0;
        if (Math.abs(rotationXVel) < 0.00005) rotationXVel = 0;
      }
      const scatterAmount = advancePhase(now);
      draw(now, scatterAmount);
      rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      rotationYVel = 0;
      rotationXVel = 0;
      lastPointerX = clientX;
      lastPointerY = clientY;
      canvas.style.cursor = "grabbing";
    };

    const onPointerMoveDrag = (clientX: number, clientY: number) => {
      const deltaX = clientX - lastPointerX;
      const deltaY = clientY - lastPointerY;
      lastPointerX = clientX;
      lastPointerY = clientY;
      const rotationYDelta = deltaX * DRAG_SENSITIVITY;
      const rotationXDelta = deltaY * DRAG_SENSITIVITY;
      // Pure accumulation — no Math.min/max, no modulo wrap. rotationX/Y are
      // free-running radians, so continued dragging in one direction spins
      // the structure through as many full turns as the input demands.
      rotationY += rotationYDelta;
      rotationX += rotationXDelta;
      rotationYVel = rotationYDelta;
      rotationXVel = rotationXDelta;
    };

    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    };

    const onMouseDown = (ev: MouseEvent) => onPointerDown(ev.clientX, ev.clientY);
    const onMouseMove = (ev: MouseEvent) => {
      if (isDragging) onPointerMoveDrag(ev.clientX, ev.clientY);
    };
    const onMouseUp = () => onPointerUp();
    const onMouseLeave = () => onPointerUp();

    const onTouchStart = (ev: TouchEvent) => {
      const t = ev.touches[0];
      if (t) onPointerDown(t.clientX, t.clientY);
    };
    const onTouchMove = (ev: TouchEvent) => {
      const t = ev.touches[0];
      if (t && isDragging) {
        onPointerMoveDrag(t.clientX, t.clientY);
        ev.preventDefault();
      }
    };
    const onTouchEnd = () => onPointerUp();

    const onThemeChange = () => {
      colors = readColors();
      roleRGB = {
        neutral: toRGB(colors.neutral),
        secondary: toRGB(colors.secondary),
        accent: toRGB(colors.accent),
      };
      isLightTheme = document.documentElement.getAttribute("data-theme") === "light";
    };

    // Measure once synchronously so the first frame isn't blank, then let
    // ResizeObserver track the container's real size going forward — this
    // reacts to CSS grid/layout changes, not just window-level resizes.
    const initialRect = canvas.parentElement?.getBoundingClientRect();
    resize(initialRect?.width ?? 500, initialRect?.height ?? 500);
    canvas.style.cursor = "grab";

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width: w, height: h } = entry.contentRect;
      if (w > 0 && h > 0) resize(w, h);
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Respect reduced motion: no ambient auto-spin, no data-flow pulses,
    // and no structured/scattered state loop (all purely decorative) —
    // stays permanently structured. The drag interaction itself is a
    // deliberate user action, so that stays live.
    const staticTick = (now: number) => {
      if (isDragging || rotationYVel !== 0 || rotationXVel !== 0) {
        rotationY += rotationYVel;
        rotationX += rotationXVel;
        rotationYVel = 0;
        rotationXVel = 0;
      }
      draw(now, 0);
      rafId = requestAnimationFrame(staticTick);
    };

    // Below the 1024px layout breakpoint the hero hides this canvas outright
    // (see the .st-hero-canvas-wrap rule in page.tsx): the stacked mobile
    // layout has no column of its own for the graphic, so it would render
    // straight through the headline and CTAs. Tearing the loop down, rather
    // than leaving it spinning behind a display:none, means a phone isn't
    // burning battery redrawing ~100 nodes and their edges every frame for
    // something nobody can see. Driven off the SAME desktopQuery the
    // centerXFraction logic already uses, so the JS teardown and the CSS
    // visibility can never drift onto different breakpoints.
    const startLoop = () => {
      if (rafId) return;
      if (reduceMotion) {
        rafId = requestAnimationFrame(staticTick);
      } else {
        scheduleNextPulse();
        rafId = requestAnimationFrame(tick);
      }
    };
    const stopLoop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      clearTimeout(pulseSpawnTimeoutId);
      pulseSpawnTimeoutId = undefined;
    };

    if (desktopQuery.matches) startLoop();

    return () => {
      stopLoop();
      desktopQuery.removeEventListener("change", onDesktopQueryChange);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle} />;
}

const canvasStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
};
