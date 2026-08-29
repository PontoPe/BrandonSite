"use client";

import { METAL_GROUPS, METALS } from "@/data/metals";
import { useReading } from "@/lib/reading";

/**
 * Plate II. Same engine as the Atlas: sixteen cells, each appearing only once a
 * book you have read has named it. A reader three chapters into The Final
 * Empire sees eight metals, which is exactly what that reader knows.
 */
export default function MetalTable() {
  const { reveals, count } = useReading();
  const known = METALS.filter((m) => reveals(m.revealedBy)).length;

  return (
    <figure className="m-0 rounded-sm border border-rule bg-stock-raised">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-4 py-3">
        <span className="label">Plate II — The Metallic Arts</span>
        <span className="label">{known}/16 identified</span>
      </figcaption>

      <div className="grid gap-px bg-rule p-px sm:grid-cols-2 lg:grid-cols-4">
        {METAL_GROUPS.map((group) => (
          <div key={group} className="bg-stock-raised p-4">
            <p className="label border-b border-rule pb-2">{group}</p>
            <ul className="mt-3 space-y-3">
              {METALS.filter((m) => m.group === group).map((m) => {
                const on = reveals(m.revealedBy);
                return (
                  <li key={m.id} className={on ? "" : "opacity-45"}>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center border text-[10px]"
                        style={{
                          fontFamily: "var(--font-tech)",
                          borderColor: on ? "var(--accent)" : "var(--veiled)",
                          color: on ? "var(--accent)" : "var(--veiled)",
                          borderStyle: on ? "solid" : "dashed",
                        }}
                        aria-hidden
                      >
                        {on ? m.symbol : "?"}
                      </span>
                      <span className="prose-serif text-[15px]">
                        {on ? m.name : "Unidentified"}
                      </span>
                    </div>
                    <p className="mt-1 pl-8 text-[13px] leading-snug text-ink-soft">
                      {on ? m.allomancy : "No book on your shelf names this one."}
                    </p>
                    {on && (
                      <p className="label mt-1 pl-8">
                        {m.reach} · {m.axis} · {m.feruchemy}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {count === 0 && (
        <p className="prose-serif border-t border-rule px-4 py-3 text-[14px] text-ink-faint">
          Sixteen cells, all of them blank. In-world scholars filled this table
          in over centuries; you fill it in by reading.
        </p>
      )}
    </figure>
  );
}
