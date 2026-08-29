"use client";

import { useMemo, useState } from "react";
import { SHARDS, THREADS, WORLDS, WORLDS_BY_ID } from "@/data/atlas";
import { BOOKS_BY_ID } from "@/data/books";
import { useReading } from "@/lib/reading";

const VIEW_W = 900;
const VIEW_H = 580;

export default function Atlas() {
  const { reveals, depth, count } = useReading();
  const [selected, setSelected] = useState<string | null>(null);

  const worldState = useMemo(
    () => Object.fromEntries(WORLDS.map((w) => [w.id, reveals(w.revealedBy)])),
    [reveals],
  );

  const visibleThreads = useMemo(
    () =>
      THREADS.filter(
        (t) =>
          reveals(t.revealedBy) && worldState[t.from] && worldState[t.to],
      ),
    [reveals, worldState],
  );

  const active = selected ? WORLDS_BY_ID[selected] : null;
  const activeRevealed = active ? worldState[active.id] : false;
  const activeThreads = active
    ? visibleThreads.filter((t) => t.from === active.id || t.to === active.id)
    : [];
  const activeShards = active
    ? SHARDS.filter((s) => s.world === active.id && reveals(s.revealedBy))
    : [];

  const revealedCount = Object.values(worldState).filter(Boolean).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <figure className="m-0 rounded-sm border border-rule bg-stock-raised">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-4 py-3">
          <span className="label">Plate I — The Silver Sea</span>
          <span className="label">
            {revealedCount}/{WORLDS.length} charted · {visibleThreads.length} threads
          </span>
        </figcaption>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label={`A star chart showing ${revealedCount} of ${WORLDS.length} worlds and ${visibleThreads.length} connections between them, based on the books you have marked as read.`}
        >
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="var(--rule)"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#grid)" />

          {/* Threads sit under the worlds so nodes stay readable */}
          <g>
            {visibleThreads.map((t) => {
              const a = WORLDS_BY_ID[t.from];
              const b = WORLDS_BY_ID[t.to];
              const isSpiritual = t.tier === "spiritual";
              const touched =
                !active || t.from === active.id || t.to === active.id;
              return (
                <line
                  key={t.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isSpiritual ? "var(--accent)" : "var(--revealed)"}
                  strokeWidth={isSpiritual ? 1.6 : 1.1}
                  strokeDasharray={isSpiritual ? "1 5" : undefined}
                  strokeLinecap="round"
                  opacity={touched ? 0.85 : 0.18}
                >
                  <title>{t.label}</title>
                </line>
              );
            })}
          </g>

          <g>
            {WORLDS.map((w) => {
              const known = worldState[w.id];
              const isActive = active?.id === w.id;
              return (
                <g
                  key={w.id}
                  transform={`translate(${w.x} ${w.y})`}
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
                  aria-label={known ? w.name : `Uncharted: ${w.veiledName}`}
                  className="cursor-pointer outline-none focus-visible:opacity-100"
                >
                  <circle
                    r={w.r}
                    fill={known ? "var(--accent-wash)" : "transparent"}
                    stroke={known ? "var(--accent)" : "var(--veiled)"}
                    strokeWidth={isActive ? 2.4 : 1.2}
                    strokeDasharray={known ? undefined : "3 4"}
                  />
                  {known && <circle r={3} fill="var(--accent)" />}
                  <text
                    y={w.r + 16}
                    textAnchor="middle"
                    className="pointer-events-none"
                    style={{
                      fontFamily: "var(--font-tech)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fill: known ? "var(--ink)" : "var(--ink-faint)",
                      fontStyle: known ? "normal" : "italic",
                    }}
                  >
                    {known ? w.name : w.veiledName}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </figure>

      <aside className="rounded-sm border border-rule bg-stock-raised p-4">
        {count === 0 ? (
          <>
            <p className="label">Uncharted</p>
            <p className="prose-serif mt-3 text-[15px] leading-relaxed text-ink-soft">
              Ten worlds, none of them named yet, and nothing drawn between them.
              Mark what you have read and the chart fills in — not by an order
              someone else chose for you, but by the one you actually took.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
              Two readers with the same number of books behind them will not see
              the same map.
            </p>
          </>
        ) : active ? (
          <>
            <p className="label">
              {activeRevealed ? active.system : "Uncharted"}
            </p>
            <h3 className="prose-serif mt-1 text-2xl">
              {activeRevealed ? active.name : active.veiledName}
            </h3>
            {activeRevealed ? (
              <p className="prose-serif mt-3 text-[15px] leading-relaxed text-ink-soft">
                {active.blurb}
              </p>
            ) : (
              <p className="mt-3 text-[14px] leading-relaxed text-ink-faint">
                You have not read a book set here. The chart keeps its name.
              </p>
            )}

            {activeShards.length > 0 && (
              <div className="mt-5 border-t border-rule pt-4">
                <p className="label">Power held here</p>
                <ul className="mt-2 space-y-2">
                  {activeShards.map((s) => (
                    <li key={s.id}>
                      <span className="font-tech text-[13px] text-accent">{s.name}</span>
                      <span className="prose-serif block text-[14px] text-ink-soft">
                        {s.intent}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeThreads.length > 0 && (
              <div className="mt-5 border-t border-rule pt-4">
                <p className="label">Threads</p>
                <ul className="mt-2 space-y-3">
                  {activeThreads.map((t) => (
                    <li key={t.id}>
                      <span
                        className="font-tech text-[12px]"
                        style={{
                          color:
                            t.tier === "spiritual"
                              ? "var(--accent)"
                              : "var(--revealed)",
                        }}
                      >
                        {t.label}
                      </span>
                      <span className="prose-serif block text-[14px] leading-snug text-ink-soft">
                        {t.detail}
                      </span>
                      <span className="label mt-1 block">
                        opened by{" "}
                        {t.revealedBy
                          .filter((id) => BOOKS_BY_ID[id])
                          .map((id) => BOOKS_BY_ID[id].title)
                          .join(" / ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="label">Depth · {depth}</p>
            <p className="prose-serif mt-3 text-[15px] leading-relaxed text-ink-soft">
              {depth === "physical" &&
                "Separate worlds, separate stories. Nothing yet says they share a sky."}
              {depth === "cognitive" &&
                "Threads are appearing. The same figure keeps turning up, and some travellers did not start where you met them."}
              {depth === "spiritual" &&
                "The structure underneath is visible: what was shattered, who holds the pieces, and the road between."}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
              Select a world to read what your books have opened there.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

