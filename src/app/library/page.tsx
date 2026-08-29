import Shelf from "@/components/Shelf";

export const metadata = { title: "Library — Ars Arcanum" };

const ENTRANCES = [
  {
    title: "The Final Empire",
    who: "If you already read fantasy",
    why: "A heist crew against a god-emperor. Tight, three books, and it finishes what it starts.",
  },
  {
    title: "Elantris",
    who: "If you are new to the genre",
    why: "His first published novel and a self-contained one. Nothing else is required of you.",
  },
  {
    title: "Tress of the Emerald Sea",
    who: "If you want to test the water",
    why: "Standalone, warm, and stranger than it looks. It spoils nothing you would miss.",
  },
  {
    title: "The Way of Kings",
    who: "If you want the big one",
    why: "A thousand pages before it turns. Readers who make it past that generally do not stop.",
  },
];

export default function LibraryPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="stamp">The shelves</p>
        <h1 className="display mt-3 text-[2.6rem] sm:text-[3.2rem]">
          Four front doors,
          <br />
          none of them wrong
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
          Reading-order guides tend to hand you one queue and imply you have
          already made a mistake. These are entrances instead. Pick one, mark
          what you finish, and the rest of the site reorganises around you.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ENTRANCES.map((e) => (
          <article key={e.title} className="sheet p-5">
            <p className="stamp">{e.who}</p>
            <h2 className="mt-2 text-xl leading-snug">{e.title}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              {e.why}
            </p>
          </article>
        ))}
      </section>

      <Shelf />
    </div>
  );
}
