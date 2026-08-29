"use client";

import { useMemo, useState } from "react";
import { SHARDS, THREADS, WORLDS, WORLDS_BY_ID } from "@/data/atlas";
import { BOOKS_BY_ID } from "@/data/books";
import { useReading } from "@/lib/reading";
import WorldGlyph from "./WorldGlyph";

const VIEW_W = 900;
const VIEW_H = 600;

/**
 * A stable pseudo-random number from a string, so the hand-drawn wobble on a
 * given thread is the same on the server, on the client, and on every reload.
 * Randomising at render would flicker on hydration and look like a bug.
 */
function jitter(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000 - 0.5;
}

/** A line drawn by hand bows slightly. Ruled lines read as machinery. */
function bowed(ax: number, ay: number, bx: number, by: number, seed: string) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const bow = jitter(seed) * Math.min(len * 0.2, 40);
  return `M${ax} ${ay} Q${mx - (dy / len) * bow} ${my + (dx / len) * bow} ${bx} ${by}`;
}

export default function Atlas() {
  const { reveals, depth, count } = useReading();
  const [selected, setSelected] = useState<string | null>(null);

  const charted = useMemo(
    () => Object.fromEntries(WORLDS.map((w) => [w.id, reveals(w.revealedBy)])),
    [reveals],
  );

  const visibleThreads = useMemo(
    () =>
      THREADS.filter(
        (t) => reveals(t.revealedBy) && charted[t.from] && charted[t.to],
      ),
    [reveals, charted],
  );

  const active = selected ? WORLDS_BY_ID[selected] : null;
  const activeCharted = active ? charted[active.id] : false;
  const activeThreads = active
    ? visibleThreads.filter((t) => t.from === active.id || t.to === active.id)
    : [];
  const activeShards = active
    ? SHARDS.filter((s) => s.world === active.id && reveals(s.revealedBy))
    : [];

  const chartedCount = Object.values(charted).filter(Boolean).length;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_19rem]">
      <figure className="sheet sheet--torn tilt-l m-0 px-5 py-4">
        <figcaption className="flex flex-wrap items-end justify-between gap-3 pb-2">
          <span>
            <span className="stamp">Plate I</span>
            <span className="hand ml-3 text-[15px]">
              the silver sea, as far as I have it
            </span>
          </span>
          <span className="hand text-[14px] text-ink-faint">
            {chartedCount} of {WORLDS.length} drawn
            {visibleThreads.length > 0 && ` · ${visibleThreads.length} threads`}
          </span>
        </figcaption>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label={`A hand-drawn star chart. ${chartedCount} of ${WORLDS.length} worlds are drawn in, with ${visibleThreads.length} connections between them, based on the books you have marked as read.`}
        >
          {/* Threads under the drawings, so the glyphs stay readable. */}
          <g>
            {visibleThreads.map((t) => {
              const a = WORLDS_BY_ID[t.from];
              const b = WORLDS_BY_ID[t.to];
              const deep = t.tier === "spiritual";
              const touched = !active || t.from === active.id || t.to === active.id;
              return (
                <g key={t.id} opacity={touched ? 1 : 0.15}>
                  <path
                    d={bowed(a.x, a.y, b.x, b.y, t.id)}
                    fill="none"
                    stroke={deep ? "var(--accent)" : "var(--revealed)"}
                    strokeWidth={deep ? 1.5 : 1.2}
                    strokeDasharray={deep ? "2 6" : undefined}
                    strokeLinecap="round"
                    opacity={deep ? 0.9 : 0.75}
                  />
                  {/* The second, lighter pass a pen makes when retracing. */}
                  {!deep && (
                    <path
                      d={bowed(a.x, a.y, b.x, b.y, t.id + "~")}
                      fill="none"
                      stroke="var(--revealed)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                  )}
                  <title>{t.label}</title>
                </g>
              );
            })}
          </g>

          <g>
            {WORLDS.map((w) => {
              const drawn = charted[w.id];
              const isActive = active?.id === w.id;
              return (
                <g
                  key={w.id}
                  transform={`translate(${w.x} ${w.y}) rotate(${(jitter(w.id) * 5).toFixed(2)})`}
                  onClick={() => setSelected(isActive ? null : w.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(isActive ? null : w.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={drawn ? w.name : `Not drawn: ${w.veiledName}`}
                  className="cursor-pointer"
                >
                  {/* Generous invisible hit area — the drawings are thin. */}
                  <circle r="46" fill="transparent" />
                  {isActive && (
                    <circle
                      r="42"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="0.9"
                      strokeDasharray="2 5"
                      opacity="0.75"
                    />
                  )}
                  <g transform="scale(1.35)">
                    <WorldGlyph world={w.id} drawn={drawn} />
                  </g>
                  <text
                    y="56"
                    textAnchor="middle"
                    className="pointer-events-none"
                    style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: drawn ? 16 : 14,
                      fill: drawn ? "var(--ink)" : "var(--pencil)",
                    }}
                  >
                    {drawn ? w.name : w.veiledName}
                  </text>
                  {drawn && (
                    <path
                      d={`M${-w.name.length * 3.9} 61 Q0 ${63 + jitter(w.id) * 3} ${w.name.length * 3.9} 61`}
                      fill="none"
                      stroke="var(--ink-faint)"
                      strokeWidth="0.7"
                      opacity="0.6"
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* A compass drawn in the corner, as these charts always have. */}
          <g transform="translate(825 520)" opacity="0.65">
            <circle r="20" fill="none" stroke="var(--ink-faint)" strokeWidth="0.8" />
            <path
              d="M0 -24 L4 -4 L0 3 L-4 -4 Z"
              fill="none"
              stroke="var(--ink-soft)"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <path d="M-20 0 L-26 0 M20 0 L26 0 M0 20 L0 26" stroke="var(--ink-faint)" strokeWidth="0.7" />
            <text
              y="-28"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-hand)", fontSize: 13, fill: "var(--ink-faint)" }}
            >
              N
            </text>
          </g>

          {count === 0 && (
            <g>
              <text
                x="46"
                y="548"
                style={{ fontFamily: "var(--font-hand)", fontSize: 17, fill: "var(--ink-faint)" }}
              >
                Nothing inked yet. I have only blocked in where things sit.
              </text>
              <path
                d="M44 556 Q170 562 300 554"
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="0.7"
                opacity="0.5"
              />
            </g>
          )}
        </svg>
      </figure>

      <aside className="tilt-r">
        {count === 0 ? (
          <>
            <p className="hand text-[17px] leading-relaxed">
              Ten worlds and nothing between them. I have drawn in only what I
              have been able to confirm myself.
            </p>
            <p className="hand mt-4 text-[16px] text-ink-faint">
              Mark what you have read and I will ink the rest — in the order you
              took, not one somebody else chose.
            </p>
            <p className="mt-5 border-t border-rule pt-3 text-[14px] leading-relaxed text-ink-faint">
              Two readers the same number of books in will not get the same
              chart.
            </p>
          </>
        ) : active ? (
          <>
            <p className="stamp">{activeCharted ? active.system : "Not drawn"}</p>
            <h3 className="mt-1 text-[26px] leading-tight">
              {activeCharted ? active.name : active.veiledName}
            </h3>
            {activeCharted ? (
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {active.blurb}
              </p>
            ) : (
              <p className="hand mt-3 text-[16px]">
                I have not been anywhere near this one. Only the shape of it, and
                that from hearsay.
              </p>
            )}

            {activeShards.length > 0 && (
              <div className="mt-5 border-t border-rule pt-3">
                <p className="stamp">Power held here</p>
                <ul className="mt-2 space-y-2">
                  {activeShards.map((s) => (
                    <li key={s.id}>
                      <span className="text-[16px] text-accent">{s.name}</span>
                      <span className="hand block text-[15px]">{s.intent}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeThreads.length > 0 && (
              <div className="mt-5 border-t border-rule pt-3">
                <p className="stamp">Threads</p>
                <ul className="mt-2 space-y-4">
                  {activeThreads.map((t) => (
                    <li key={t.id}>
                      <span
                        className="text-[15px]"
                        style={{
                          color:
                            t.tier === "spiritual"
                              ? "var(--accent)"
                              : "var(--revealed)",
                        }}
                      >
                        {t.label}
                      </span>
                      <span className="block text-[14px] leading-snug text-ink-soft">
                        {t.detail}
                      </span>
                      <span className="hand mt-1 block text-[14px] text-ink-faint">
                        opened by{" "}
                        {t.revealedBy
                          .filter((id) => BOOKS_BY_ID[id])
                          .map((id) => BOOKS_BY_ID[id].title)
                          .join(", or ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="stamp">Depth · {depth}</p>
            <p className="hand mt-3 text-[17px] leading-relaxed">
              {depth === "physical" &&
                "Separate worlds, separate stories. Nothing yet says they share a sky."}
              {depth === "cognitive" &&
                "Threads now. The same figure keeps turning up, and some travellers did not start where you met them."}
              {depth === "spiritual" &&
                "The structure underneath: what was shattered, who holds the pieces, and the road between."}
            </p>
            <p className="mt-5 border-t border-rule pt-3 text-[14px] leading-relaxed text-ink-faint">
              Pick a world to read what your books have opened there.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
