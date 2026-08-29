/**
 * A Vorin glyph.
 *
 * Built the way Isaac Stewart actually builds them: one half is drawn, then
 * mirrored. Symmetry is a religious principle in Vorin culture, so the
 * construction is the meaning — not a styling choice. The stroke vocabulary
 * takes after Arabic word art, which is the stated model: long sweeping arcs,
 * tapered hooks, and small punctuating drops.
 *
 * Nothing here spells anything. These are ornament in the manner of the script,
 * not a cipher, and the site does not pretend otherwise.
 */

/** The right half. Everything is mirrored about x = 0. */
function Half({ variant }: { variant: 0 | 1 | 2 }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (variant === 0) {
    return (
      <g {...common}>
        <path d="M4 -100 C52 -96 88 -58 84 -12 C81 26 54 52 22 56" strokeWidth="9" />
        <path d="M22 56 C10 58 2 50 8 42 C13 36 22 41 20 48" strokeWidth="5.5" />
        <path d="M6 -52 C42 -46 60 -22 56 4 C53 22 40 32 26 32" strokeWidth="6.5" />
        <path d="M2 -14 L40 -22" strokeWidth="4" />
        <path d="M4 74 C30 78 44 96 40 116" strokeWidth="5.5" />
        <path d="M2 -108 C16 -120 38 -114 42 -98" strokeWidth="4.5" />
        <circle cx="62" cy="-70" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="34" cy="90" r="3" fill="currentColor" stroke="none" />
      </g>
    );
  }

  if (variant === 1) {
    return (
      <g {...common}>
        <path d="M5 -86 C46 -84 76 -54 74 -18 C72 12 52 30 28 30" strokeWidth="8" />
        <path d="M28 30 C46 34 60 50 58 72 C56 90 44 100 30 100" strokeWidth="6" />
        <path d="M30 100 C20 100 14 92 20 86" strokeWidth="4.5" />
        <path d="M4 -40 C30 -38 44 -22 42 -4" strokeWidth="5" />
        <path d="M3 -94 C14 -104 32 -100 36 -88" strokeWidth="4" />
        <circle cx="54" cy="-56" r="4" fill="currentColor" stroke="none" />
      </g>
    );
  }

  return (
    <g {...common}>
      <path d="M6 -104 C60 -98 96 -52 90 4 C86 44 60 70 26 74" strokeWidth="10" />
      <path d="M26 74 C12 76 4 66 12 58" strokeWidth="6" />
      <path d="M8 -62 C48 -54 66 -26 60 6" strokeWidth="6" />
      <path d="M4 -20 C26 -18 38 -8 38 6" strokeWidth="4.5" />
      <path d="M5 92 C26 96 36 110 34 126" strokeWidth="5" />
      <circle cx="70" cy="-74" r="5" fill="currentColor" stroke="none" />
      <circle cx="48" cy="34" r="3.5" fill="currentColor" stroke="none" />
    </g>
  );
}

export default function VorinGlyph({
  variant = 0,
  className = "",
}: {
  variant?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <svg
      viewBox="-120 -140 240 300"
      className={className}
      aria-hidden
      focusable="false"
    >
      <Half variant={variant} />
      {/* The mirror. This is the whole point of the form. */}
      <g transform="scale(-1 1)">
        <Half variant={variant} />
      </g>
      {/* The spine sits on the axis, so it is drawn once rather than doubled. */}
      <path
        d="M0 -126 L0 132"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
