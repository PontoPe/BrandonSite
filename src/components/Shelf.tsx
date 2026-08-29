"use client";

import { LINES, booksInLine } from "@/data/books";
import { useReading } from "@/lib/reading";

export default function Shelf() {
  const { read, toggle, setLine } = useReading();

  return (
    <div className="space-y-12">
      {LINES.map((line) => {
        const books = booksInLine(line.id);
        const done = books.filter((b) => read.has(b.id)).length;
        const all = done === books.length;
        return (
          <section key={line.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-2">
              <div>
                <h2 className="prose-serif text-2xl">{line.title}</h2>
                <p className="prose-serif mt-1 text-[15px] text-ink-soft">
                  {line.blurb}
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="label">
                  {done}/{books.length} read
                </span>
                <button
                  onClick={() => setLine(line.id, !all)}
                  className="label border border-rule px-2 py-1 transition hover:border-rule-strong hover:text-ink"
                >
                  {all ? "unmark all" : "mark all"}
                </button>
              </div>
            </div>

            <ul className="mt-4 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {books.map((b) => {
                const on = read.has(b.id);
                return (
                  <li key={b.id} className="bg-stock-raised">
                    <button
                      onClick={() => !b.forthcoming && toggle(b.id)}
                      disabled={b.forthcoming}
                      aria-pressed={on}
                      className={`flex h-full w-full flex-col items-start gap-1 p-4 text-left transition ${
                        b.forthcoming
                          ? "cursor-default opacity-60"
                          : "hover:bg-accent-wash"
                      }`}
                    >
                      <span className="flex w-full items-baseline justify-between gap-2">
                        <span className="label">{b.year}</span>
                        <span
                          className="label"
                          style={{ color: on ? "var(--accent)" : undefined }}
                        >
                          {b.forthcoming ? "forthcoming" : on ? "✓ read" : "unread"}
                        </span>
                      </span>
                      <span className="prose-serif text-[17px] leading-snug">
                        {b.title}
                      </span>
                      {b.kind !== "novel" && (
                        <span className="label">{b.kind}</span>
                      )}
                      {b.note && (
                        <span className="prose-serif mt-1 text-[13px] leading-snug text-ink-faint">
                          {b.note}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
