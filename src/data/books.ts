/**
 * The catalogue. Every book carries an id because those ids are the keys that
 * unlock revelations elsewhere in the site — see `src/data/atlas.ts`.
 *
 * There is no single correct order through this list. A reader may arrive via
 * Mistborn, via Stormlight, via a standalone someone pressed on them. The
 * catalogue is therefore grouped by line, never sequenced overall.
 */

export type BookId = string;

export type Line =
  | "mistborn-era-1"
  | "mistborn-era-2"
  | "stormlight"
  | "sel"
  | "nalthis"
  | "standalone-cosmere"
  | "collections"
  | "skyward"
  | "riftwake"
  | "reckoners"
  | "other-non-cosmere"
  | "wheel-of-time";

export interface Book {
  id: BookId;
  title: string;
  year: number;
  /** Ordinal within its line. Novellas share the decimal spaces between novels. */
  seq: number;
  line: Line;
  cosmere: boolean;
  /** Which world it is set on, where that is not itself a spoiler. */
  world?: string;
  kind: "novel" | "novella" | "collection" | "graphic-novel" | "short";
  /** Not yet published — shown on the Workbench rather than the shelves. */
  forthcoming?: boolean;
  note?: string;
}

export interface LineMeta {
  id: Line;
  title: string;
  cosmere: boolean;
  /** One sentence, safe for someone who has read none of it. */
  blurb: string;
}

export const LINES: LineMeta[] = [
  {
    id: "mistborn-era-1",
    title: "Mistborn: The Final Empire",
    cosmere: true,
    blurb: "A heist crew moves against a god-emperor who has already won.",
  },
  {
    id: "mistborn-era-2",
    title: "Mistborn: Wax & Wayne",
    cosmere: true,
    blurb: "Three centuries on, the same world with railroads, broadsheets and revolvers.",
  },
  {
    id: "stormlight",
    title: "The Stormlight Archive",
    cosmere: true,
    blurb: "A world scoured by hurricane-force storms, and the oaths that let people stand against them.",
  },
  {
    id: "sel",
    title: "Elantris & Sel",
    cosmere: true,
    blurb: "A city of fallen gods, and a magic written as geometry.",
  },
  {
    id: "nalthis",
    title: "Warbreaker",
    cosmere: true,
    blurb: "Colour, breath and returned gods in a city of impossible hues.",
  },
  {
    id: "standalone-cosmere",
    title: "Cosmere Standalones",
    cosmere: true,
    blurb: "Shorter, stranger books, each on a world of its own.",
  },
  {
    id: "collections",
    title: "Collections",
    cosmere: true,
    blurb: "Gathered shorter work, with in-world commentary between the stories.",
  },
  {
    id: "skyward",
    title: "Skyward",
    cosmere: false,
    blurb: "A pilot, a derelict starfighter, and a sky that is not what it seems.",
  },
  {
    id: "riftwake",
    title: "Riftwake",
    cosmere: false,
    blurb: "The Cytoverse after the war, with Skyward Flight sent somewhere far less certain.",
  },
  {
    id: "reckoners",
    title: "The Reckoners",
    cosmere: false,
    blurb: "Ordinary people hunt the superhuman in a broken America.",
  },
  {
    id: "other-non-cosmere",
    title: "Other Worlds",
    cosmere: false,
    blurb: "Standalones and series outside the connected universe.",
  },
  {
    id: "wheel-of-time",
    title: "The Wheel of Time",
    cosmere: false,
    blurb: "The final three volumes of Robert Jordan's series, completed from his notes.",
  },
];

export const BOOKS: Book[] = [
  // ── Sel ────────────────────────────────────────────────────────────────
  { id: "elantris", title: "Elantris", year: 2005, seq: 1, line: "sel", cosmere: true, world: "sel", kind: "novel" },
  { id: "emperors-soul", title: "The Emperor's Soul", year: 2012, seq: 2, line: "sel", cosmere: true, world: "sel", kind: "novella" },

  // ── Scadrial, first era ────────────────────────────────────────────────
  { id: "final-empire", title: "The Final Empire", year: 2006, seq: 1, line: "mistborn-era-1", cosmere: true, world: "scadrial", kind: "novel" },
  { id: "well-of-ascension", title: "The Well of Ascension", year: 2007, seq: 2, line: "mistborn-era-1", cosmere: true, world: "scadrial", kind: "novel" },
  { id: "hero-of-ages", title: "The Hero of Ages", year: 2008, seq: 3, line: "mistborn-era-1", cosmere: true, world: "scadrial", kind: "novel" },

  // ── Nalthis ────────────────────────────────────────────────────────────
  { id: "warbreaker", title: "Warbreaker", year: 2009, seq: 1, line: "nalthis", cosmere: true, world: "nalthis", kind: "novel" },

  // ── Roshar ─────────────────────────────────────────────────────────────
  { id: "way-of-kings", title: "The Way of Kings", year: 2010, seq: 1, line: "stormlight", cosmere: true, world: "roshar", kind: "novel" },
  { id: "words-of-radiance", title: "Words of Radiance", year: 2014, seq: 2, line: "stormlight", cosmere: true, world: "roshar", kind: "novel" },
  { id: "edgedancer", title: "Edgedancer", year: 2016, seq: 2.5, line: "stormlight", cosmere: true, world: "roshar", kind: "novella" },
  { id: "oathbringer", title: "Oathbringer", year: 2017, seq: 3, line: "stormlight", cosmere: true, world: "roshar", kind: "novel" },
  { id: "dawnshard", title: "Dawnshard", year: 2020, seq: 3.5, line: "stormlight", cosmere: true, world: "roshar", kind: "novella" },
  { id: "rhythm-of-war", title: "Rhythm of War", year: 2020, seq: 4, line: "stormlight", cosmere: true, world: "roshar", kind: "novel" },
  { id: "wind-and-truth", title: "Wind and Truth", year: 2024, seq: 5, line: "stormlight", cosmere: true, world: "roshar", kind: "novel", note: "Closes the first five-book arc." },

  // ── Scadrial, second era ───────────────────────────────────────────────
  { id: "alloy-of-law", title: "The Alloy of Law", year: 2011, seq: 1, line: "mistborn-era-2", cosmere: true, world: "scadrial", kind: "novel" },
  { id: "shadows-of-self", title: "Shadows of Self", year: 2015, seq: 2, line: "mistborn-era-2", cosmere: true, world: "scadrial", kind: "novel" },
  { id: "bands-of-mourning", title: "The Bands of Mourning", year: 2016, seq: 3, line: "mistborn-era-2", cosmere: true, world: "scadrial", kind: "novel" },
  { id: "lost-metal", title: "The Lost Metal", year: 2022, seq: 4, line: "mistborn-era-2", cosmere: true, world: "scadrial", kind: "novel" },

  // ── Cosmere standalones ────────────────────────────────────────────────
  { id: "white-sand", title: "White Sand", year: 2016, seq: 1, line: "standalone-cosmere", cosmere: true, world: "taldain", kind: "graphic-novel" },
  { id: "shadows-for-silence", title: "Shadows for Silence in the Forests of Hell", year: 2013, seq: 2, line: "standalone-cosmere", cosmere: true, world: "threnody", kind: "short" },
  { id: "sixth-of-dusk", title: "Sixth of the Dusk", year: 2014, seq: 3, line: "standalone-cosmere", cosmere: true, world: "first-of-the-sun", kind: "novella" },
  { id: "tress", title: "Tress of the Emerald Sea", year: 2023, seq: 4, line: "standalone-cosmere", cosmere: true, world: "lumar", kind: "novel" },
  { id: "yumi", title: "Yumi and the Nightmare Painter", year: 2023, seq: 5, line: "standalone-cosmere", cosmere: true, world: "komashi", kind: "novel" },
  { id: "sunlit-man", title: "The Sunlit Man", year: 2023, seq: 6, line: "standalone-cosmere", cosmere: true, world: "canticle", kind: "novel" },
  { id: "emberdark", title: "Isles of the Emberdark", year: 2026, seq: 7, line: "standalone-cosmere", cosmere: true, world: "first-of-the-sun", kind: "novel" },

  // ── Collections ────────────────────────────────────────────────────────
  { id: "arcanum-unbounded", title: "Arcanum Unbounded", year: 2016, seq: 1, line: "collections", cosmere: true, kind: "collection", note: "Collected shorter cosmere work, with a star chart and essays between stories." },
  { id: "tailored-realities", title: "Tailored Realities", year: 2026, seq: 2, line: "collections", cosmere: true, kind: "collection", forthcoming: true },

  // ── Non-cosmere ────────────────────────────────────────────────────────
  { id: "skyward", title: "Skyward", year: 2018, seq: 1, line: "skyward", cosmere: false, kind: "novel" },
  { id: "starsight", title: "Starsight", year: 2019, seq: 2, line: "skyward", cosmere: false, kind: "novel" },
  { id: "cytonic", title: "Cytonic", year: 2021, seq: 3, line: "skyward", cosmere: false, kind: "novel" },
  { id: "defiant", title: "Defiant", year: 2023, seq: 4, line: "skyward", cosmere: false, kind: "novel" },

  { id: "blightfall", title: "Blightfall", year: 2026, seq: 1, line: "riftwake", cosmere: false, kind: "novel", forthcoming: true, note: "With Janci Patterson. A diplomatic escort that arrives at a world half swallowed by invasive forest." },
  { id: "songrise", title: "Songrise", year: 2027, seq: 2, line: "riftwake", cosmere: false, kind: "novel", forthcoming: true, note: "With Janci Patterson." },

  { id: "steelheart", title: "Steelheart", year: 2013, seq: 1, line: "reckoners", cosmere: false, kind: "novel" },
  { id: "firefight", title: "Firefight", year: 2015, seq: 2, line: "reckoners", cosmere: false, kind: "novel" },
  { id: "calamity", title: "Calamity", year: 2016, seq: 3, line: "reckoners", cosmere: false, kind: "novel" },

  { id: "rithmatist", title: "The Rithmatist", year: 2013, seq: 1, line: "other-non-cosmere", cosmere: false, kind: "novel" },
  { id: "alcatraz", title: "Alcatraz vs. the Evil Librarians", year: 2007, seq: 2, line: "other-non-cosmere", cosmere: false, kind: "novel" },
  { id: "legion", title: "Legion", year: 2012, seq: 3, line: "other-non-cosmere", cosmere: false, kind: "novella" },
  { id: "frugal-wizard", title: "The Frugal Wizard's Handbook for Surviving Medieval England", year: 2023, seq: 4, line: "other-non-cosmere", cosmere: false, kind: "novel" },

  { id: "gathering-storm", title: "The Gathering Storm", year: 2009, seq: 12, line: "wheel-of-time", cosmere: false, kind: "novel" },
  { id: "towers-of-midnight", title: "Towers of Midnight", year: 2010, seq: 13, line: "wheel-of-time", cosmere: false, kind: "novel" },
  { id: "memory-of-light", title: "A Memory of Light", year: 2013, seq: 14, line: "wheel-of-time", cosmere: false, kind: "novel" },
];

export const BOOKS_BY_ID: Record<BookId, Book> = Object.fromEntries(
  BOOKS.map((b) => [b.id, b]),
);

export function booksInLine(line: Line): Book[] {
  return BOOKS.filter((b) => b.line === line).sort((a, b) => a.seq - b.seq);
}

/** Lines that can gate cosmere revelations, in the order the shelf presents them. */
export const COSMERE_LINES = LINES.filter((l) => l.cosmere);
