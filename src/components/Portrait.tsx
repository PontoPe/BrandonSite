"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A photograph slot with an honest empty state.
 *
 * The images live in /public and are dropped in by hand. Until one is present
 * the slot renders a pencil block-in rather than a broken image or a grey box —
 * the same convention the chart uses for a world nobody has drawn yet.
 */
const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

/**
 * The declared path is a first guess, not a contract. If the file on disk turns
 * out to be a different format, try its siblings before giving up — an image
 * present under the wrong extension should not render as an empty slot.
 */
function candidates(src: string): string[] {
  const dot = src.lastIndexOf(".");
  if (dot < 0) return [src];
  const stem = src.slice(0, dot);
  const given = src.slice(dot).toLowerCase();
  return [src, ...EXTENSIONS.filter((e) => e !== given).map((e) => stem + e)];
}

export default function Portrait({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  const tries = candidates(src);
  const [attempt, setAttempt] = useState(0);
  const failed = attempt >= tries.length;

  return (
    <figure className={`m-0 ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        {failed ? (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ minHeight: "18rem" }}
          >
            <svg viewBox="0 0 160 200" className="h-full w-full max-h-72" aria-hidden>
              <g stroke="var(--rule-strong)" fill="none" strokeWidth="1">
                <path d="M0.5 0.5 H159.5 V199.5 H0.5 Z" />
                <path d="M0.5 0.5 L159.5 199.5 M159.5 0.5 L0.5 199.5" opacity="0.35" />
              </g>
              <text
                x="80"
                y="106"
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-tech)",
                  fontSize: 8,
                  letterSpacing: "0.14em",
                  fill: "var(--ink-faint)",
                }}
              >
                {src.replace("/", "").toUpperCase()}
              </text>
            </svg>
          </div>
        ) : (
          <Image
            key={tries[attempt]}
            src={tries[attempt]}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            onError={() => setAttempt((n) => n + 1)}
          />
        )}
      </div>
      {caption && <figcaption className="mt-2 text-[15px] italic text-ink-faint">
          {caption}
        </figcaption>}
    </figure>
  );
}
