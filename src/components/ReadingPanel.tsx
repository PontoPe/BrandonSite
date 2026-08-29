"use client";

import { useState } from "react";
import { COSMERE_LINES, LINES, booksInLine } from "@/data/books";
import { useReading } from "@/lib/reading";

/**
 * The reading position is not one slider. There is no canonical route through
 * these books — a reader may have finished Stormlight and never touched
 * Mistborn, or read one standalone on a friend's recommendation. So: one toggle
 * per book, grouped by line, with a shortcut for whole lines.
 */
export default function ReadingPanel({ compact = false }: { compact?: boolean }) {
  const { read, toggle, setLine, clear, count, depth } = useReading();
  const [showNonCosmere, setShowNonCosmere] = useState(false);

  const lines = showNonCosmere ? LINES : COSMERE_LINES;

  return (
    <div className={compact ? "text-[13px]" : ""}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
        <div>
          <p className="label">Your shelf</p>
          <p className="prose-serif mt-1 text-[15px] text-ink-soft">
            {count === 0
              ? "Nothing marked. The site assumes you have read none of it."
              : `${count} marked · depth: ${depth}`}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="label border border-rule px-2 py-1 transition hover:border-rule-strong hover:text-ink"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-4 space-y-5">
        {lines.map((line) => {
          const books = booksInLine(line.id);
          const all = books.every((b) => read.has(b.id));
          const some = books.some((b) => read.has(b.id));
          return (
            <section key={line.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-tech text-[12px] uppercase tracking-[0.12em] text-ink">
                  {line.title}
                </h3>
                <button
                  onClick={() => setLine(line.id, !all)}
                  className="label whitespace-nowrap transition hover:text-accent"
                  aria-label={`${all ? "Unmark" : "Mark"} all of ${line.title}`}
                >
                  {all ? "none" : some ? "all" : "all"}
                </button>
              </div>
              <p className="prose-serif mt-1 text-[13px] leading-snug text-ink-faint">
                {line.blurb}
              </p>
              <ul className="mt-2 space-y-1">
                {books.map((b) => {
                  const on = read.has(b.id);
                  return (
                    <li key={b.id}>
                      <label
                        className={`flex cursor-pointer items-baseline gap-2 py-0.5 transition ${
                          on ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(b.id)}
                          disabled={b.forthcoming}
                          className="mt-1 h-3 w-3 shrink-0 accent-[var(--accent)]"
                        />
                        <span className="prose-serif text-[14px] leading-snug">
                          {b.title}
                          {b.kind !== "novel" && (
                            <span className="label ml-2">{b.kind}</span>
                          )}
                          {b.forthcoming && (
                            <span className="label ml-2">{b.year} — not yet</span>
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <button
        onClick={() => setShowNonCosmere((v) => !v)}
        className="label mt-6 border-t border-rule pt-3 transition hover:text-accent"
      >
        {showNonCosmere ? "— hide other worlds" : "+ show non-cosmere lines"}
      </button>
    </div>
  );
}
