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
    <figure className="sheet sheet--torn tilt-r m-0">
      <figcaption className="flex flex-wrap items-end justify-between gap-3 px-5 pb-2 pt-4">
        <span>
          <span className="stamp">Plate II</span>
          <span className="hand ml-3 text-[15px]">
            the metallic arts, so far as they are known to me
          </span>
        </span>
        <span className="hand text-[14px] text-ink-faint">
          {known} of 16 identified
        </span>
      </figcaption>

      <div className="grid gap-x-7 gap-y-6 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-4">
        {METAL_GROUPS.map((group) => (
          <div key={group}>
            <p className="ruled pb-1 text-[17px] italic">{group}</p>
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
                      <span className="text-[15px]">
                        {on ? m.name : "Unidentified"}
                      </span>
                    </div>
                    <p className="mt-1 pl-8 text-[15px] leading-snug text-ink-soft">
                      {on
                        ? m.allomancy
                        : "Nothing on your shelf names this one."}
                    </p>
                    {on && (
                      <p className="hand mt-1 pl-8 text-[14px] text-ink-faint">
                        acts {m.reach === "internal" ? "on the burner" : "on the world"},{" "}
                        {m.axis === "push" ? "pushing" : "pulling"} &mdash;{" "}
                        {m.feruchemy.replace("Stores", "stores")}
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
        <p className="hand border-t border-rule px-5 py-3 text-[16px]">
          Sixteen cells, all of them blank. Scholars on that world took
          centuries to fill this in. You fill it in by reading.
        </p>
      )}
    </figure>
  );
}
