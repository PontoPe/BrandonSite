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
              <g
                stroke="var(--pencil)"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="5 7"
                strokeWidth="1.3"
                opacity="0.8"
              >
                <circle cx="80" cy="70" r="34" />
                <path d="M26 200 C26 146 44 118 80 118 C116 118 134 146 134 200" />
                <path d="M8 8 H152 V192 H8 Z" strokeDasharray="3 9" opacity="0.5" />
              </g>
              <text
                x="80"
                y="196"
                textAnchor="middle"
                style={{ fontFamily: "var(--font-hand)", fontSize: 11, fill: "var(--pencil)" }}
              >
                {src.replace("/", "")}
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
      {caption && <figcaption className="hand mt-2 text-[15px]">{caption}</figcaption>}
    </figure>
  );
}
