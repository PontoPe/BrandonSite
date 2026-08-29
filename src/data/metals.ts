import type { BookId } from "./books";

/**
 * The Metallic Arts, as the books hand them over — eight metals at first, then
 * more as the world's own scholars work them out. The same revelation engine
 * that drives the Atlas drives this plate: a metal appears when a book you have
 * read names it.
 */
export interface Metal {
  id: string;
  name: string;
  symbol: string;
  group: "Physical" | "Mental" | "Temporal" | "Enhancement";
  /** Pushing metals expend; pulling metals draw in. */
  axis: "push" | "pull";
  /** Internal metals act on the burner; external metals act on the world. */
  reach: "internal" | "external";
  allomancy: string;
  feruchemy: string;
  revealedBy: BookId[];
}

export const METALS: Metal[] = [
  { id: "iron", name: "Iron", symbol: "Fe", group: "Physical", axis: "pull", reach: "external", allomancy: "Pull on nearby metal", feruchemy: "Stores physical weight", revealedBy: ["final-empire"] },
  { id: "steel", name: "Steel", symbol: "St", group: "Physical", axis: "push", reach: "external", allomancy: "Push on nearby metal", feruchemy: "Stores physical speed", revealedBy: ["final-empire"] },
  { id: "tin", name: "Tin", symbol: "Sn", group: "Physical", axis: "pull", reach: "internal", allomancy: "Sharpen the senses", feruchemy: "Stores senses", revealedBy: ["final-empire"] },
  { id: "pewter", name: "Pewter", symbol: "Pw", group: "Physical", axis: "push", reach: "internal", allomancy: "Strengthen the body", feruchemy: "Stores physical strength", revealedBy: ["final-empire"] },

  { id: "zinc", name: "Zinc", symbol: "Zn", group: "Mental", axis: "pull", reach: "external", allomancy: "Inflame another's emotions", feruchemy: "Stores mental speed", revealedBy: ["final-empire"] },
  { id: "brass", name: "Brass", symbol: "Bs", group: "Mental", axis: "push", reach: "external", allomancy: "Dampen another's emotions", feruchemy: "Stores warmth", revealedBy: ["final-empire"] },
  { id: "copper", name: "Copper", symbol: "Cu", group: "Mental", axis: "pull", reach: "internal", allomancy: "Hide allomancy from detection", feruchemy: "Stores memories", revealedBy: ["final-empire"] },
  { id: "bronze", name: "Bronze", symbol: "Bz", group: "Mental", axis: "push", reach: "internal", allomancy: "Sense nearby allomancy", feruchemy: "Stores wakefulness", revealedBy: ["final-empire"] },

  { id: "gold", name: "Gold", symbol: "Au", group: "Temporal", axis: "pull", reach: "internal", allomancy: "See who you might have been", feruchemy: "Stores health", revealedBy: ["well-of-ascension"] },
  { id: "electrum", name: "Electrum", symbol: "Ee", group: "Temporal", axis: "push", reach: "internal", allomancy: "See your own moments ahead", feruchemy: "Stores determination", revealedBy: ["hero-of-ages"] },
  { id: "cadmium", name: "Cadmium", symbol: "Cd", group: "Temporal", axis: "pull", reach: "external", allomancy: "Slow time in a bubble", feruchemy: "Stores breath", revealedBy: ["alloy-of-law", "hero-of-ages"] },
  { id: "bendalloy", name: "Bendalloy", symbol: "Be", group: "Temporal", axis: "push", reach: "external", allomancy: "Quicken time in a bubble", feruchemy: "Stores energy", revealedBy: ["alloy-of-law", "hero-of-ages"] },

  { id: "chromium", name: "Chromium", symbol: "Cr", group: "Enhancement", axis: "pull", reach: "external", allomancy: "Strip another's metal reserves", feruchemy: "Stores fortune", revealedBy: ["alloy-of-law", "hero-of-ages"] },
  { id: "nicrosil", name: "Nicrosil", symbol: "Ns", group: "Enhancement", axis: "push", reach: "external", allomancy: "Flare another's metal reserves", feruchemy: "Stores investiture", revealedBy: ["alloy-of-law", "hero-of-ages"] },
  { id: "aluminum", name: "Aluminum", symbol: "Al", group: "Enhancement", axis: "pull", reach: "internal", allomancy: "Empty your own reserves", feruchemy: "Stores identity", revealedBy: ["well-of-ascension"] },
  { id: "duralumin", name: "Duralumin", symbol: "Du", group: "Enhancement", axis: "push", reach: "internal", allomancy: "Spend a reserve all at once", feruchemy: "Stores connection", revealedBy: ["well-of-ascension"] },
];

export const METAL_GROUPS = ["Physical", "Mental", "Temporal", "Enhancement"] as const;
