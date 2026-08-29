"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

/**
 * The progress ring, this author's most recognisable piece of public UI, with
 * two pieces of motion on it.
 *
 * The arc is drawn by a CSS animation rather than by script, so the number that
 * renders server-side and without JavaScript is the real one — the sweep is a
 * flourish, never the source of truth. Only the counting numeral needs JS, and
 * it is set to zero before first paint so it does not flash the final figure.
 *
 * Behind each ring sits an ambient motif keyed to what the project actually is:
 * mist for Mistborn, a burning reserve for the era-three draft, a rising ring
 * of sound for Songrise, debris trailing the leading edge for Riftwake. They
 * loop slowly and stay quiet; anyone who has asked for reduced motion gets the
 * finished ring and no movement at all.
 */

export type Motif = "mist" | "ember" | "song" | "rift";

const R = 34;
const CIRCUMFERENCE = 2 * Math.PI * R;
const SWEEP_MS = 1500;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * How far round the leading edge has travelled, in degrees.
 *
 * The motif's artwork sits at twelve o'clock and the arc also starts there, so
 * this is simply the fraction swept — no -90 correction. Subtracting it again
 * (the arc group already carries its own rotate(-90)) parks the motif at the
 * arc's start instead of its tip.
 */
function tipRotation(value: number) {
  return (value / 100) * 360;
}

function Motifs({
  motif,
  value,
  blurId,
}: {
  motif?: Motif;
  value: number;
  /** Filter ids must be unique per instance — four gauges share a document. */
  blurId: string;
}) {
  if (!motif) return null;

  if (motif === "mist") {
    return (
      // Not currentColor: on paper that paints mist as a dark smudge. The pencil
      // token sits between both grounds, so it reads as haze either way.
      <g className="motif-mist" opacity="0.42" aria-hidden>
        {[
          "M14 34 C28 26 46 30 62 26 C74 23 82 27 90 24",
          "M10 48 C26 42 44 47 60 43 C72 40 80 44 88 41",
          "M16 60 C30 55 46 59 60 56 C70 54 78 57 86 55",
        ].map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--pencil)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter={`url(#${blurId})`}
          />
        ))}
      </g>
    );
  }

  if (motif === "ember") {
    return (
      <g
        className="tip-follow"
        style={{ "--tip-rotation": `${tipRotation(value)}deg` } as React.CSSProperties}
        aria-hidden
      >
        <g transform={`translate(48 ${48 - R})`}>
          <circle
            className="motif-ember-glow"
            r="9"
            fill="var(--brand)"
            opacity="0.32"
            filter={`url(#${blurId})`}
          />
          <g
            className="motif-ember-lines"
            stroke="var(--brand)"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <path d="M0 -9 L0 -15 M7 -5 L12 -9 M-7 -5 L-12 -9" />
          </g>
        </g>
      </g>
    );
  }

  if (motif === "song") {
    return (
      <g className="motif-song" aria-hidden>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="48"
            cy="48"
            r={R - 6}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </g>
    );
  }

  // rift — debris shed from the leading edge, falling behind it
  return (
    <g
      className="tip-follow"
      style={{ "--tip-rotation": `${tipRotation(value)}deg` } as React.CSSProperties}
      aria-hidden
    >
      <g className="motif-rift" transform={`translate(48 ${48 - R})`}>
        {[
          { cx: -2.5, cy: 1, r: 2.1 },
          { cx: -6, cy: -2.5, r: 1.6 },
          { cx: -10, cy: 2.5, r: 1.3 },
          { cx: -4, cy: 5, r: 1 },
        ].map((d, i) => (
          <circle key={i} {...d} fill="var(--brand)" />
        ))}
      </g>
    </g>
  );
}

export default function RingGauge({
  value,
  label,
  detail,
  motif,
  delay = 0,
}: {
  value: number;
  label: string;
  detail?: string;
  motif?: Motif;
  delay?: number;
}) {
  const blurId = `soften-${useId().replace(/:/g, "")}`;
  const done = Math.max(0, Math.min(100, Math.round(value)));
  const complete = done >= 100;
  const offset = CIRCUMFERENCE * (1 - done / 100);

  // Server and no-JS render the real figure; the count-up only happens once we
  // know we can finish it.
  const [shown, setShown] = useState(done);
  const frame = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const started = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - started) / SWEEP_MS));
      // Matches the arc's easing so the number and the sweep land together.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(done * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [done, delay]);

  return (
    <figure className="m-0 flex flex-col items-center text-center">
      <svg
        viewBox="0 0 96 96"
        className="h-28 w-28"
        role="img"
        aria-label={`${label}: ${done} per cent`}
        // Declared here so the arc and the tip-riding motif, which are
        // siblings, both inherit the same stagger.
        style={{ "--ring-delay": `${delay}ms` } as React.CSSProperties}
      >
        <defs>
          <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        <Motifs motif={motif} value={done} blurId={blurId} />

        <circle
          cx="48"
          cy="48"
          r={R}
          fill="none"
          stroke="var(--pencil)"
          strokeWidth="4"
          opacity="0.4"
        />
        <g transform="rotate(-90 48 48)">
          <circle
            className="ring-arc"
            cx="48"
            cy="48"
            r={R}
            fill="none"
            stroke={complete ? "var(--accent)" : "var(--brand)"}
            strokeWidth="4.5"
            strokeLinecap="round"
            style={
              {
                "--ring-circumference": CIRCUMFERENCE,
                "--ring-offset": offset,
              } as React.CSSProperties
            }
          />
        </g>
        <text
          x="48"
          y="53"
          textAnchor="middle"
          fill="currentColor"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}%
        </text>
      </svg>
      <figcaption className="mt-2 max-w-[13rem]">
        <span className="block text-[16px] leading-snug">{label}</span>
        {detail && (
          <span className="mt-1 block text-[14px] leading-snug text-ink-faint">
            {detail}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
