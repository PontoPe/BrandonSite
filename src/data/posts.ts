/**
 * The blog is not a side channel for this author — it is the main one. The
 * weekly video, the annual state-of-things post, and the announcements all land
 * here first, which is why it sits on the surface layer rather than under
 * "more".
 *
 * Entries marked `sourced` are real posts. The rest are representative of the
 * cadence for the purposes of this design study, and a real build would read
 * them from the actual feed.
 */

export type PostKind = "weekly" | "announcement" | "state" | "craft";

export interface Post {
  id: string;
  kind: PostKind;
  title: string;
  date: string;
  iso: string;
  blurb: string;
  /** Video posts lead with a thumbnail; text posts do not. */
  thumb?: string;
  sourced?: boolean;
}

export const KIND_LABEL: Record<PostKind, string> = {
  weekly: "Weekly update",
  announcement: "Announcement",
  state: "State of the Sanderson",
  craft: "On writing",
};

export const POSTS: Post[] = [
  {
    id: "ghostbloods-giveaways",
    kind: "weekly",
    title: "Ghostbloods and giveaways",
    date: "28 August 2026",
    iso: "2026-08-28",
    thumb: "/weekly-update-thumb.jpg",
    blurb:
      "Where the second draft of Ghostbloods stands, what is going out in the Blightfall giveaway, and a stack of signed copies behind him as evidence.",
    sourced: true,
  },
  {
    id: "blightfall-week",
    kind: "announcement",
    title: "Blightfall is out on Tuesday",
    date: "26 August 2026",
    iso: "2026-08-26",
    blurb:
      "The first Riftwake book, written with Janci Patterson, returns to the Cytoverse after the war. Tour dates, and what the trilogy is for.",
  },
  {
    id: "weekly-emberdark-mail",
    kind: "weekly",
    title: "Emberdark is in the post",
    date: "21 August 2026",
    iso: "2026-08-21",
    thumb: "/weekly-update-2.jpg",
    blurb:
      "Fulfilment on the Isles of the Emberdark run, plus a question about how much of a magic system a reader should be told up front.",
  },
  {
    id: "apple-cosmere",
    kind: "announcement",
    title: "The cosmere is going to Apple",
    date: "13 January 2026",
    iso: "2026-01-13",
    blurb:
      "Not one series — all of it. Mistborn first as a feature, Stormlight as a show after. Why he wrote the screenplay himself rather than hand it over, and what he kept approval over.",
  },
  {
    id: "state-2025",
    kind: "state",
    title: "State of the Sanderson 2025",
    date: "December 2025",
    iso: "2025-12-01",
    blurb:
      "The annual accounting: every project, where it actually stands, what slipped and why, and what the next three years look like from here.",
    sourced: true,
  },
  {
    id: "laws-revisited",
    kind: "craft",
    title: "The three laws, twenty years on",
    date: "November 2025",
    iso: "2025-11-14",
    blurb:
      "What he would change about the laws now, and the one he thinks people quote most and understand least.",
  },
];
