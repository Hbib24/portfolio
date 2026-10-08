/**
 * Layout for the skills graph.
 *
 * - `core` skills sit in the middle.
 * - Every other skill sits on one of two rings (`proficient` inside, `familiar` outside),
 *   inside the sector of its category.
 * - A small label per category is placed in the middle of its sector.
 * - A few relaxation passes then push overlapping nodes apart, so any number of skills
 *   ends up readable without hand-placing coordinates.
 *
 * Positions are returned as percentages of the container so they can be used directly
 * as `left` / `top` (and SVG x / y) values.
 */

export type SkillLevel = 'core' | 'proficient' | 'familiar';

export interface LayoutInput {
  id: string;
  label: string;
  level: SkillLevel;
  category: string;
}

export interface LayoutNode {
  id: string;
  kind: 'skill' | 'category';
  label: string;
  /** Center of the node, in % of the container width. */
  x: number;
  /** Center of the node, in % of the container height. */
  y: number;
}

export interface LayoutResult {
  nodes: LayoutNode[];
  /** Guide rings for the proficient / familiar tiers (radii in % of container width / height). */
  rings: { rx: number; ry: number }[];
}

interface Body {
  id: string;
  kind: 'skill' | 'category';
  label: string;
  w: number;
  h: number;
  tx: number;
  ty: number;
  x: number;
  y: number;
}

/**
 * Pill sizes in px. Keep in sync with the Tailwind classes in app.ts (`LEVEL_CLASS`).
 * `chrome` = horizontal padding + icon + gap + border, `char` = width of one mono character.
 */
const PILL: Record<SkillLevel, { char: number; chrome: number; height: number }> = {
  core: { char: 16 * 0.6, chrome: 66, height: 42 },
  proficient: { char: 14 * 0.6, chrome: 58, height: 34 },
  familiar: { char: 12 * 0.6, chrome: 50, height: 26 },
};

/** 11px mono label with 0.2em tracking. */
const CATEGORY_LABEL = { char: 11 * 0.6 + 11 * 0.2, height: 16 };

/** Radius of each tier, as a fraction of the outer ellipse. */
const RING = { proficient: 0.58, familiar: 0.94, category: 0.78 };

const GAP = 10;
const EDGE = 8;

export function layoutSkillGraph(items: LayoutInput[], width: number, height: number): LayoutResult {
  const cx = width / 2;
  const cy = height / 2;
  const rxOuter = Math.max(width / 2 - 90, 60);
  const ryOuter = Math.max(height / 2 - 32, 40);

  const bodies: Body[] = [];

  const skillBody = (item: LayoutInput, tx: number, ty: number): Body => {
    const pill = PILL[item.level];
    return {
      id: item.id,
      kind: 'skill',
      label: item.label,
      w: pill.chrome + item.label.length * pill.char,
      h: pill.height,
      tx,
      ty,
      x: tx,
      y: ty,
    };
  };

  // 1. Core skills in the middle
  const core = items.filter((item) => item.level === 'core');
  core.forEach((item, i) => {
    if (core.length === 1) {
      bodies.push(skillBody(item, cx, cy));
      return;
    }
    const start = core.length % 2 === 0 ? -Math.PI / 2 + Math.PI / core.length : -Math.PI / 2;
    const angle = start + (2 * Math.PI * i) / core.length;
    const rx = Math.min(rxOuter * 0.3, 38 + 24 * core.length);
    const ry = Math.min(ryOuter * 0.3, 22 + 12 * core.length);
    bodies.push(skillBody(item, cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)));
  });

  // 2. Everything else: one sector per category, proficient / familiar interleaved on their rings
  const rest = items.filter((item) => item.level !== 'core');
  const categories = [...new Set(rest.map((item) => item.category))];
  let cursor = -Math.PI / 2;

  for (const category of categories) {
    const members = rest.filter((item) => item.category === category);
    const span = (2 * Math.PI * members.length) / rest.length;
    const ordered = interleave(
      members.filter((item) => item.level === 'proficient'),
      members.filter((item) => item.level === 'familiar'),
    );

    ordered.forEach((item, i) => {
      const angle = cursor + (span * (i + 0.5)) / ordered.length;
      const ring = item.level === 'proficient' ? RING.proficient : RING.familiar;
      bodies.push(
        skillBody(
          item,
          cx + rxOuter * ring * Math.cos(angle),
          cy + ryOuter * ring * Math.sin(angle),
        ),
      );
    });

    const mid = cursor + span / 2;
    const tx = cx + rxOuter * RING.category * Math.cos(mid);
    const ty = cy + ryOuter * RING.category * Math.sin(mid);
    bodies.push({
      id: `category:${category}`,
      kind: 'category',
      label: category,
      w: category.length * CATEGORY_LABEL.char,
      h: CATEGORY_LABEL.height,
      tx,
      ty,
      x: tx,
      y: ty,
    });

    cursor += span;
  }

  // 3. Relaxation: gentle pull towards the target, then push overlapping nodes apart.
  //    The last passes only resolve overlaps so the final result is overlap-free where possible.
  const steps = 500;
  for (let step = 0; step < steps; step++) {
    const pull = step < 350 ? 0.05 : 0;

    for (const body of bodies) {
      body.x += (body.tx - body.x) * pull;
      body.y += (body.ty - body.y) * pull;
    }

    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];
        if (!a || !b) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const overlapX = (a.w + b.w) / 2 + GAP - Math.abs(dx);
        const overlapY = (a.h + b.h) / 2 + GAP - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;

        if (overlapX < overlapY) {
          const push = (overlapX / 2) * (dx >= 0 ? 1 : -1);
          a.x -= push;
          b.x += push;
        } else {
          const push = (overlapY / 2) * (dy >= 0 ? 1 : -1);
          a.y -= push;
          b.y += push;
        }
      }
    }

    for (const body of bodies) {
      body.x = clamp(body.x, body.w / 2 + EDGE, width - body.w / 2 - EDGE);
      body.y = clamp(body.y, body.h / 2 + EDGE, height - body.h / 2 - EDGE);
    }
  }

  return {
    nodes: bodies.map((body) => ({
      id: body.id,
      kind: body.kind,
      label: body.label,
      x: (body.x / width) * 100,
      y: (body.y / height) * 100,
    })),
    rings: [RING.proficient, RING.familiar].map((ring) => ({
      rx: ((rxOuter * ring) / width) * 100,
      ry: ((ryOuter * ring) / height) * 100,
    })),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const first = a[i];
    const second = b[i];
    if (first !== undefined) out.push(first);
    if (second !== undefined) out.push(second);
  }
  return out;
}
