# Ars Arcanum

An **unofficial concept redesign** of a website for Brandon Sanderson's work. Not
affiliated with or endorsed by the author or Dragonsteel Books — this is a design
study, and the footer says so on every page.

## The idea

Twenty-odd novels across ten worlds, quietly sharing one universe, and **no correct
order to read them in**. Someone may arrive through Mistborn, through Stormlight, or
through a standalone a friend pressed on them, and each route reveals the
connections in a different sequence.

So there is no global spoiler switch. Instead:

> Every world, thread, power and metal declares the books that earn it.
> The reader marks what they have actually read, and the site assembles
> itself from that.

Depth is **derived, never chosen**. Two readers with the same number of books behind
them will not see the same site. This is Sanderson's first law — that satisfaction
scales with understanding — enforced as an interface rule.

## Structure

| Route | What it is |
| --- | --- |
| `/` | **Atlas** — Plate I. A star chart of ten worlds. Unread worlds stay dashed and unnamed; threads between them appear only when a book you've read reveals them. |
| `/library` | Four entrances rather than one queue, then the full shelves with per-book toggles. |
| `/systems` | **Plate II** — the Metallic Arts table. Same revelation engine: sixteen cells that fill in as you read. |
| `/workbench` | Work in progress, by named milestone rather than invented percentages. |
| `/workshop` | The three laws, the promise/progress/payoff armature, and a note on the prose. |

## How the revelation engine works

One mechanism runs the whole site — the third law applied to its own architecture.

```ts
// src/data/atlas.ts
{ id: "worldhop-nalthis-roshar", from: "nalthis", to: "roshar",
  tier: "cognitive", revealedBy: ["words-of-radiance"], ... }
```

`revealedBy` is an OR over book ids. `src/lib/reading.tsx` holds the reader's marked
books in `localStorage` and exposes `reveals(ids)`; every component asks that question
and renders veiled or revealed. Server rendering and first paint assume nothing has
been read, which is the safe state.

## Design

Ink-on-paper at the surface — warm stock, serif prose, monospace technical labels,
fine line-work diagrams, modelled on the Ars Arcanum appendix that closes each book.
The realm toggle drops the palette into the Cognitive Realm. Tokens live at the top of
`src/app/globals.css`.

The prose in these books is deliberately plain and fast; the site makes the same
trade — clarity over atmosphere, no scrollwork and no dragons.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js (App Router) · TypeScript · Tailwind v4. No external fonts or runtime data —
it builds and runs fully offline.

## Status

Foundation and the two plates are built and browser-verified. Still open: the Double
Eye and its ten orders, Aons, Breath, character and world pages, and real content
behind the Library entries.
