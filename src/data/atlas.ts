import type { BookId } from "./books";

/**
 * The Atlas is one artifact with many states.
 *
 * Nothing here is shown because a reader flipped a global "spoilers" switch.
 * Every world, every thread, every shard declares the books that earn it, and
 * the map assembles itself from whatever the reader has actually read. Two
 * people with the same number of books behind them will see different maps.
 *
 * `revealedBy` is an OR: any one of these books opens the fact.
 */

export type Tier = "physical" | "cognitive" | "spiritual";

export interface WorldNode {
  id: string;
  name: string;
  /** Shown before the reader has earned the world's name. */
  veiledName: string;
  system: string;
  x: number;
  y: number;
  r: number;
  /** Reading any of these puts the world on the map. */
  revealedBy: BookId[];
  blurb: string;
}

export interface Thread {
  id: string;
  from: string;
  to: string;
  tier: Tier;
  label: string;
  revealedBy: BookId[];
  detail: string;
}

export interface Shard {
  id: string;
  name: string;
  world: string;
  /** Intent as the books state it. */
  intent: string;
  revealedBy: BookId[];
  tier: Tier;
}

export const WORLDS: WorldNode[] = [
  {
    id: "scadrial", name: "Scadrial", veiledName: "A world of ash", system: "Scadrian system",
    x: 300, y: 250, r: 34, revealedBy: ["final-empire", "alloy-of-law"],
    blurb: "Ash falls from the sky and mists rise at night. Later: railroads, broadsheets and revolvers over the same buried history.",
  },
  {
    id: "roshar", name: "Roshar", veiledName: "A world of storms", system: "Rosharan system",
    x: 560, y: 190, r: 38, revealedBy: ["way-of-kings", "edgedancer"],
    blurb: "Hurricane-force highstorms sweep the continent from east to west. Everything living has learned to face stone-ward.",
  },
  {
    id: "sel", name: "Sel", veiledName: "A world of glyphs", system: "Selish system",
    x: 150, y: 150, r: 30, revealedBy: ["elantris", "emperors-soul"],
    blurb: "Magic written as geometry — a line drawn wrong is a spell that fails.",
  },
  {
    id: "nalthis", name: "Nalthis", veiledName: "A world of colour", system: "Nalthian system",
    x: 470, y: 400, r: 28, revealedBy: ["warbreaker"],
    blurb: "Life is measured in Breath, and colour is the fuel that spends it.",
  },
  {
    id: "taldain", name: "Taldain", veiledName: "A world half in daylight", system: "Taldain system",
    x: 120, y: 380, r: 24, revealedBy: ["white-sand"],
    blurb: "Tidally locked between a white sun and endless dark. Sand is the medium of power.",
  },
  {
    id: "threnody", name: "Threnody", veiledName: "A world of shades", system: "Threnodite system",
    x: 690, y: 380, r: 22, revealedBy: ["shadows-for-silence"],
    blurb: "Break one of three simple rules in the forests and the dead come for you.",
  },
  {
    id: "first-of-the-sun", name: "First of the Sun", veiledName: "An archipelago", system: "Drominad system",
    x: 660, y: 470, r: 22, revealedBy: ["sixth-of-dusk", "emberdark"],
    blurb: "Islands where every creature has learned to kill efficiently, and two birds keep a trapper alive.",
  },
  {
    id: "lumar", name: "Lumar", veiledName: "A world of spore seas", system: "Lumar system",
    x: 250, y: 480, r: 24, revealedBy: ["tress"],
    blurb: "Twelve seas of coloured spores that bloom into catastrophe on contact with water.",
  },
  {
    id: "komashi", name: "Komashi", veiledName: "A world of shrines", system: "Komashi system",
    x: 780, y: 250, r: 22, revealedBy: ["yumi"],
    blurb: "Stacked stones, summoned spirits, and a land under a shroud.",
  },
  {
    id: "canticle", name: "Canticle", veiledName: "A world outrunning dawn", system: "Canticle system",
    x: 800, y: 130, r: 20, revealedBy: ["sunlit-man"],
    blurb: "The sunrise is lethal, so the cities never stop moving.",
  },
  {
    id: "yolen", name: "Yolen", veiledName: "Somewhere before all of it", system: "Yolen system",
    x: 430, y: 300, r: 18, revealedBy: ["arcanum-unbounded", "way-of-kings"],
    blurb: "Where it began. Named rarely, and never plainly.",
  },
];

export const THREADS: Thread[] = [
  // ── Cognitive: the universe is one universe ─────────────────────────────
  {
    id: "hoid-roshar", from: "yolen", to: "roshar", tier: "cognitive",
    label: "A storyteller, present",
    revealedBy: ["way-of-kings"],
    detail: "The same man turns up wherever something important is about to happen. On Roshar he tells stories for his supper.",
  },
  {
    id: "hoid-scadrial", from: "yolen", to: "scadrial", tier: "cognitive",
    label: "A storyteller, present",
    revealedBy: ["final-empire"],
    detail: "An informant in the alleys of Luthadel who knows more than he should.",
  },
  {
    id: "hoid-nalthis", from: "yolen", to: "nalthis", tier: "cognitive",
    label: "A storyteller, present",
    revealedBy: ["warbreaker"],
    detail: "A street performer with an unusual instrument and a very old grudge.",
  },
  {
    id: "hoid-sel", from: "yolen", to: "sel", tier: "cognitive",
    label: "A storyteller, present",
    revealedBy: ["elantris"],
    detail: "A royal messenger who arrives, delivers, and is not seen again.",
  },
  {
    id: "hoid-lumar", from: "yolen", to: "lumar", tier: "cognitive",
    label: "A storyteller, narrating",
    revealedBy: ["tress"],
    detail: "This time he is not in the corner of the scene. He is holding the pen.",
  },
  {
    id: "worldhop-nalthis-roshar", from: "nalthis", to: "roshar", tier: "cognitive",
    label: "A traveller between worlds",
    revealedBy: ["words-of-radiance"],
    detail: "A woman from a world of colour arrives on a world of storms, carrying a sword that talks.",
  },
  {
    id: "worldhop-scadrial-roshar", from: "scadrial", to: "roshar", tier: "cognitive",
    label: "Agents abroad",
    revealedBy: ["oathbringer", "lost-metal"],
    detail: "An organisation with interests on more than one planet, and the resources to move between them.",
  },
  {
    id: "worldhop-taldain", from: "taldain", to: "scadrial", tier: "cognitive",
    label: "An interested party",
    revealedBy: ["bands-of-mourning", "lost-metal"],
    detail: "Something from a tidally locked world takes an interest in Scadrial's affairs.",
  },
  {
    id: "worldhop-canticle", from: "canticle", to: "roshar", tier: "cognitive",
    label: "A fugitive's origin",
    revealedBy: ["sunlit-man"],
    detail: "The man running from the sunrise did not start on that world.",
  },
  {
    id: "worldhop-komashi", from: "komashi", to: "yolen", tier: "cognitive",
    label: "A narrator, again",
    revealedBy: ["yumi"],
    detail: "Told by the same voice, from a different chair.",
  },

  // ── Spiritual: the structure beneath ────────────────────────────────────
  {
    id: "shattering-scadrial", from: "yolen", to: "scadrial", tier: "spiritual",
    label: "Two powers, opposed",
    revealedBy: ["hero-of-ages"],
    detail: "The world was made by a bargain between two forces, and the bargain had a term.",
  },
  {
    id: "shattering-roshar", from: "yolen", to: "roshar", tier: "spiritual",
    label: "Three powers, one broken",
    revealedBy: ["oathbringer"],
    detail: "Roshar holds more of the old power than anywhere else — and one of its holders is dead.",
  },
  {
    id: "shattering-sel", from: "yolen", to: "sel", tier: "spiritual",
    label: "Two powers, both dead",
    revealedBy: ["arcanum-unbounded"],
    detail: "Sel's magic is strange because what powered it was killed, and the remains had nowhere to go.",
  },
  {
    id: "cognitive-realm", from: "yolen", to: "nalthis", tier: "spiritual",
    label: "The realm between",
    revealedBy: ["arcanum-unbounded", "rhythm-of-war"],
    detail: "There is a place behind reality where distance is measured in attention rather than miles. That is the road between worlds.",
  },
];

export const SHARDS: Shard[] = [
  { id: "preservation", name: "Preservation", world: "scadrial", intent: "To keep what is.", revealedBy: ["hero-of-ages"], tier: "spiritual" },
  { id: "ruin", name: "Ruin", world: "scadrial", intent: "To end what is.", revealedBy: ["hero-of-ages"], tier: "spiritual" },
  { id: "harmony", name: "Harmony", world: "scadrial", intent: "Both, held at once.", revealedBy: ["hero-of-ages"], tier: "spiritual" },
  { id: "honor", name: "Honor", world: "roshar", intent: "To bind oneself by oath.", revealedBy: ["way-of-kings"], tier: "spiritual" },
  { id: "cultivation", name: "Cultivation", world: "roshar", intent: "To grow, and to prune.", revealedBy: ["oathbringer"], tier: "spiritual" },
  { id: "odium", name: "Odium", world: "roshar", intent: "Passion, unmoored from restraint.", revealedBy: ["words-of-radiance"], tier: "spiritual" },
  { id: "devotion", name: "Devotion", world: "sel", intent: "To give oneself over.", revealedBy: ["arcanum-unbounded"], tier: "spiritual" },
  { id: "dominion", name: "Dominion", world: "sel", intent: "To hold and to rule.", revealedBy: ["arcanum-unbounded"], tier: "spiritual" },
  { id: "endowment", name: "Endowment", world: "nalthis", intent: "To give gifts, and to expect their use.", revealedBy: ["arcanum-unbounded"], tier: "spiritual" },
  { id: "autonomy", name: "Autonomy", world: "taldain", intent: "To stand alone, and to make others stand alone.", revealedBy: ["arcanum-unbounded"], tier: "spiritual" },
];

export const WORLDS_BY_ID = Object.fromEntries(WORLDS.map((w) => [w.id, w]));
