/**
 * The weather.
 *
 * Roshar is a world shaped entirely by storms that cross it in one direction,
 * so every plant and building on it faces stoneward. A page for these books
 * should have a direction to it too: long sweeping arcs travel across the
 * ground behind everything, with glyph rosettes standing in the field like
 * things the wind has to get around.
 *
 * It sits behind all content at very low contrast and never intercepts a click.
 * Under reduced motion it holds still and simply becomes a static ground.
 */
import VorinGlyph from "./VorinGlyph";

const SWEEPS = [
  { d: "M-200 120 C 200 40 700 190 1300 90 C 1700 25 2000 120 2400 70", w: 1.6, o: 0.9, dur: "58s" },
  { d: "M-200 300 C 260 210 640 380 1180 280 C 1620 200 1960 320 2400 250", w: 1.1, o: 0.7, dur: "76s" },
  { d: "M-200 470 C 180 400 720 560 1240 450 C 1680 360 2020 480 2400 420", w: 2.2, o: 0.55, dur: "44s" },
  { d: "M-200 660 C 300 580 660 740 1220 640 C 1700 555 2040 660 2400 610", w: 0.9, o: 0.8, dur: "92s" },
  { d: "M-200 840 C 240 770 700 920 1260 820 C 1660 745 2060 850 2400 800", w: 1.4, o: 0.6, dur: "66s" },
];

export default function StormBackdrop() {
  return (
    <div className="storm-backdrop" aria-hidden>
      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g className="storm-sweeps" stroke="currentColor" fill="none" strokeLinecap="round">
          {SWEEPS.map((s) => (
            <path
              key={s.d}
              d={s.d}
              strokeWidth={s.w}
              opacity={s.o}
              style={{ animationDuration: s.dur }}
            />
          ))}
        </g>
      </svg>

      {/* Glyphs standing in the field. Placed off the centre line so the page
          does not read as a symmetrical poster. */}
      <VorinGlyph variant={2} className="storm-glyph storm-glyph--a" />
      <VorinGlyph variant={1} className="storm-glyph storm-glyph--b" />
    </div>
  );
}
