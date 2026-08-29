/**
 * World glyphs, drawn rather than generated.
 *
 * The in-world notebooks these pages imitate do not mark places with circles on
 * a grid — a naturalist sketches the thing itself, badly and in a hurry, and
 * writes beside it. Each world therefore gets its own small ink drawing: a
 * storm, an ash-mountain, a cairn. Strokes are deliberately uneven and a few
 * overshoot, because a ruled circle reads as a diagram and a wobbling one reads
 * as a hand.
 *
 * Drawn in a 64x64 box centred on (0,0), i.e. -32..32 on both axes.
 */

interface GlyphProps {
  world: string;
  /** Ink for a world you have read; pencil under-sketch for one you have not. */
  drawn: boolean;
}

const STROKE = {
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Glyph({ world }: { world: string }) {
  switch (world) {
    // Roshar — a highstorm coming in over windward stone.
    case "roshar":
      return (
        <g {...STROKE}>
          <path d="M-24 -12 C-18 -24 -2 -26 8 -19 C18 -12 16 2 4 4 C-4 5.4 -10 -1 -6 -7 C-3.4 -10.8 2.4 -9.6 3 -4.6" strokeWidth="1.9" />
          <path d="M-27 -4 C-15 -9 -1 -8 9 -3" strokeWidth="1" opacity="0.7" />
          <path d="M-25 2 C-14 -2.5 -1 -1.5 9 3" strokeWidth="0.85" opacity="0.5" />
          <path d="M-26 20 L-14 20 L-14 14 L-3 14 L-3 20 L9 20 L9 11 L20 11" strokeWidth="1.6" />
          <path d="M-20 24 L-18 20 M-8 24 L-6 20 M3 24 L5 20 M14 16 L16 11" strokeWidth="0.75" opacity="0.6" />
        </g>
      );

    // Scadrial — an ashmount, and the ash still coming down.
    case "scadrial":
      return (
        <g {...STROKE}>
          <path d="M-24 20 L-8 -10 C-6 -14 -2 -14 0 -10 L16 20" strokeWidth="1.7" />
          <path d="M-9 -11 C-6 -16 -2 -18 1 -21" strokeWidth="1" opacity="0.75" />
          <path d="M-2 -19 C1 -23 5 -22 6 -26" strokeWidth="0.9" opacity="0.6" />
          <path d="M-15 8 L-9 8 M-6 14 L3 14 M-13 15 L-10 15" strokeWidth="0.7" opacity="0.55" />
          <path d="M-26 20 L20 20" strokeWidth="1.2" />
          <g strokeWidth="0.9" opacity="0.7">
            <path d="M14 -16 l1.5 1.5 M20 -6 l1.5 1.5 M11 -3 l1.5 1.5 M24 -19 l1.5 1.5 M18 3 l1.5 1.5" />
          </g>
        </g>
      );

    // Sel — a drawn glyph, which is what the magic there literally is.
    case "sel":
      return (
        <g {...STROKE}>
          <path d="M-16 -18 L14 -18 L14 16 L-16 16 Z" strokeWidth="1.5" />
          <path d="M-16 -6 L14 -6" strokeWidth="1.2" />
          <path d="M-1 -18 L-1 16" strokeWidth="1.2" />
          <path d="M-16 -18 L-1 -6 M14 -18 L-1 -6" strokeWidth="0.9" opacity="0.8" />
          <path d="M-10 4 L-6 10 L4 2" strokeWidth="1.4" />
          <circle cx="-1" cy="-6" r="2.6" strokeWidth="1.2" />
          <path d="M17 -21 L17 19" strokeWidth="0.7" opacity="0.45" />
        </g>
      );

    // Nalthis — a bloom, and breath going out of it.
    case "nalthis":
      return (
        <g {...STROKE}>
          <circle cx="-2" cy="0" r="5" strokeWidth="1.5" />
          <path d="M-2 -5 C-9 -14 -17 -11 -14 -3 C-19 -6 -22 1 -14 4 C-19 9 -14 15 -8 9 C-9 18 -1 19 0 11 C4 18 11 14 8 7 C15 8 16 1 9 -1 C14 -8 8 -14 2 -8 C2 -16 -4 -16 -2 -5 Z" strokeWidth="1.3" />
          <path d="M12 -14 C18 -18 22 -14 20 -10" strokeWidth="0.9" opacity="0.7" />
          <path d="M16 -20 C22 -23 26 -20 24 -16" strokeWidth="0.8" opacity="0.5" />
        </g>
      );

    // Taldain — tidally locked: one face lit, one face not.
    case "taldain":
      return (
        <g {...STROKE}>
          <circle cx="-1" cy="-1" r="17" strokeWidth="1.6" />
          <path d="M-1 -18 L-1 16" strokeWidth="1.1" />
          <g strokeWidth="0.8" opacity="0.75">
            <path d="M2 -15 L14 -9 M2 -10 L16 -3 M2 -5 L16 3 M2 0 L15 8 M2 5 L12 12 M2 10 L8 14" />
          </g>
          <path d="M-16 4 C-12 0 -8 6 -4 2" strokeWidth="1" opacity="0.8" />
          <path d="M-15 10 C-11 6 -7 12 -3 8" strokeWidth="0.9" opacity="0.6" />
        </g>
      );

    // Threnody — the forest, and what waits in it.
    case "threnody":
      return (
        <g {...STROKE}>
          <path d="M-14 20 L-14 -4 M-14 -4 L-21 -13 M-14 -4 L-7 -14 M-14 4 L-20 -2 M-14 2 L-8 -4" strokeWidth="1.3" />
          <path d="M8 20 L8 2 M8 2 L2 -6 M8 2 L15 -8 M8 9 L3 4" strokeWidth="1.2" />
          <path d="M-24 20 L20 20" strokeWidth="1.1" />
          <circle cx="-2" cy="8" r="3.4" strokeWidth="0.9" opacity="0.75" />
          <path d="M-2 11.4 C-4 15 -1 17 -2 20" strokeWidth="0.8" opacity="0.55" />
        </g>
      );

    // First of the Sun — islands, and a bird that keeps you alive.
    case "first-of-the-sun":
      return (
        <g {...STROKE}>
          <path d="M-24 12 C-18 3 -8 3 -2 12 Z" strokeWidth="1.5" />
          <path d="M4 15 C8 8 15 8 19 15 Z" strokeWidth="1.3" />
          <path d="M-26 16 C-18 19 -8 14 0 17 C8 20 14 16 22 18" strokeWidth="1" opacity="0.8" />
          <path d="M-26 21 C-16 24 -6 19 2 22" strokeWidth="0.8" opacity="0.55" />
          <path d="M-10 -14 C-6 -19 -2 -19 0 -15 C2 -19 6 -19 10 -14" strokeWidth="1.4" />
          <path d="M-1 -15 L-1 -11" strokeWidth="0.9" opacity="0.7" />
        </g>
      );

    // Lumar — spore seas, in rings, with something small crossing them.
    case "lumar":
      return (
        <g {...STROKE}>
          <path d="M-24 6 C-14 -1 0 -1 10 6" strokeWidth="1.4" />
          <path d="M-26 12 C-14 4 2 4 14 12" strokeWidth="1.1" opacity="0.8" />
          <path d="M-24 18 C-12 10 4 10 18 18" strokeWidth="0.9" opacity="0.6" />
          <path d="M-6 4 L-6 -14 M-6 -14 L8 -8 L-6 -3" strokeWidth="1.4" />
          <path d="M-13 4 C-11 8 -1 8 1 4 Z" strokeWidth="1.3" />
          <g strokeWidth="0.8" opacity="0.6">
            <path d="M12 -6 l1.2 1.2 M17 0 l1.2 1.2 M14 -13 l1.2 1.2" />
          </g>
        </g>
      );

    // Komashi — stacked stones, and a spirit answering them.
    case "komashi":
      return (
        <g {...STROKE}>
          <path d="M-14 18 C-16 12 -4 12 -6 18 Z" strokeWidth="1.4" />
          <path d="M-13 12 C-15 6 -5 6 -7 12 Z" strokeWidth="1.3" />
          <path d="M-12 6 C-13 2 -6 2 -8 6 Z" strokeWidth="1.2" />
          <path d="M-11 2 C-12 -1 -7 -1 -9 2 Z" strokeWidth="1.1" />
          <path d="M-20 20 L4 20" strokeWidth="1.1" />
          <path d="M4 -12 C10 -20 20 -14 15 -6 C12 -1 4 -2 6 -8" strokeWidth="1.3" opacity="0.85" />
          <path d="M8 2 C11 5 15 3 16 6" strokeWidth="0.8" opacity="0.55" />
        </g>
      );

    // Canticle — the sunrise you have to keep ahead of.
    case "canticle":
      return (
        <g {...STROKE}>
          <path d="M-22 10 L20 10" strokeWidth="1.5" />
          <path d="M-12 10 C-12 -1 -3 -8 5 -3 C9 -0.5 10 5 9 10" strokeWidth="1.5" />
          <g strokeWidth="0.9" opacity="0.75">
            <path d="M-19 2 L-15 4 M-16 -6 L-12 -3 M-8 -13 L-6 -9 M2 -14 L1 -10 M12 -8 L9 -5 M17 0 L13 2" />
          </g>
          <path d="M-20 16 L-16 20 M-13 20 L-9 16 M14 16 L18 20" strokeWidth="0.9" opacity="0.6" />
        </g>
      );

    // Yolen — where it starts. Small, and drawn faintly even when known.
    case "yolen":
    default:
      return (
        <g {...STROKE}>
          <circle cx="0" cy="0" r="6" strokeWidth="1.4" />
          <g strokeWidth="1" opacity="0.85">
            <path d="M0 -9 L0 -16 M0 9 L0 16 M-9 0 L-16 0 M9 0 L16 0" />
          </g>
          <g strokeWidth="0.8" opacity="0.55">
            <path d="M6.5 -6.5 L12 -12 M-6.5 6.5 L-12 12 M6.5 6.5 L12 12 M-6.5 -6.5 L-12 -12" />
          </g>
        </g>
      );
  }
}

export default function WorldGlyph({ world, drawn }: GlyphProps) {
  if (!drawn) {
    // Pencil under-sketch: the page where the artist blocked something in and
    // never came back to ink it.
    return (
      <g
        stroke="var(--pencil)"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path
          d="M-15 -9 C-13 -17 -2 -20 6 -15 C13 -10.5 13 -1 6 4 C0 8.4 -8 7 -12 2"
          strokeWidth="1.1"
          strokeDasharray="5 6"
        />
        <path
          d="M-13 3 C-15 -1 -16 -5 -15 -9"
          strokeWidth="0.9"
          strokeDasharray="3 6"
          opacity="0.7"
        />
        <path d="M-6 14 L4 14" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.5" />
      </g>
    );
  }

  return (
    <g stroke="var(--accent)" color="var(--accent)">
      <Glyph world={world} />
    </g>
  );
}
