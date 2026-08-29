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
| `/workbench` | Work in progress, on real published percentages, plus what is coming and the adaptations. |
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

Modelled on the in-world field notebook rather than on a fantasy book jacket: the
annotated plates and naturalist's sketch pages that close these novels, where a
scholar draws a thing badly and writes beside it.

- **Drawn, not generated.** Each world on the Atlas is its own small ink drawing —
  a highstorm over scoured shelves, an ash-cone still falling, a cairn — in
  `src/components/WorldGlyph.tsx`. Worlds you have not read stay as an unfinished
  pencil under-sketch. Circles on a grid would read as a diagram; a wobbling line
  reads as a hand.
- **Three voices: cover, page, margin.** Archivo bold-uppercase is the imprint's
  own register, used for headings the way it works on the jackets. EB Garamond is
  the book — anything printed and meant to be read. Architects Daughter is
  anything *written onto* the page: plate labels, marginal notes, corrections.
  The `Note` component is that third voice, with a drawn arrow at what it doubts.
- **Dragonsteel red**, used as the live-and-urgent accent — unreleased dates,
  in-progress rings — never on the plates themselves. The covers are bold and
  commercial; the endpapers are hand-drawn. Both are true of these books.
- **Nothing square.** Sheets are laid down at slight angles, torn along one edge,
  on paper with fibre grain and uneven washes.
- **Deterministic wobble.** Hand-drawn irregularity is seeded from each element's
  id (`jitter()` in `Atlas.tsx`), so it is identical on server and client and does
  not flicker on hydration.

The prose in these books is deliberately plain and fast; the site makes the same
trade — clarity over atmosphere, no scrollwork and no dragons.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js (App Router) · TypeScript · Tailwind v4. Fonts are fetched and self-hosted
at build time by `next/font`, so the build needs network but the running site does
not. No runtime data source.

## Status

Foundation and the two plates are built and browser-verified. Catalogue and status
data are current to August 2026, including the Riftwake line (Blightfall, 1 Sept
2026) and the Apple adaptation deal.

Still open: the Double Eye and its ten orders, Aons, Breath, character and world
pages, and real content behind the Library entries. The Library, Workshop and
Systems pages have had the typography pass but not the drawing pass the Atlas got.
