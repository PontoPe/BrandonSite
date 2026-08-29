"use client";

/**
 * The progress ring, which is this author's most recognisable piece of public
 * UI — real percentages, published while the book is still unfinished.
 *
 * Borrowed as-is in structure, redrawn in this site's language: the track is a
 * pencil circle, the progress is inked over it, and the arc is closed with a
 * short overshoot where a pen carries past the end of a stroke.
 */
export default function RingGauge({
  value,
  label,
  detail,
}: {
  value: number;
  label: string;
  detail?: string;
}) {
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const done = Math.max(0, Math.min(100, value));
  const complete = done >= 100;

  return (
    <figure className="m-0 flex flex-col items-center text-center">
      <svg viewBox="0 0 96 96" className="h-28 w-28" role="img" aria-label={`${label}: ${done} per cent`}>
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="var(--pencil)"
          strokeWidth="4"
          opacity="0.4"
        />
        <g transform="rotate(-90 48 48)">
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={complete ? "var(--accent)" : "var(--brand)"}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray={`${(circumference * done) / 100} ${circumference}`}
          />
          {/* The lighter second pass a pen leaves when it retraces a curve. */}
          <circle
            cx="48"
            cy="48"
            r={r + 1.6}
            fill="none"
            stroke={complete ? "var(--accent)" : "var(--brand)"}
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.35"
            strokeDasharray={`${((circumference + 10) * done) / 100} ${circumference + 10}`}
          />
        </g>
        <text
          x="48"
          y="53"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-hand)", fontSize: 19, fill: "var(--ink)" }}
        >
          {done}%
        </text>
      </svg>
      <figcaption className="mt-2 max-w-[13rem]">
        <span className="block text-[16px] leading-snug">{label}</span>
        {detail && (
          <span className="hand mt-1 block text-[14px] text-ink-faint">{detail}</span>
        )}
      </figcaption>
    </figure>
  );
}
