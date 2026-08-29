import Shelf from "@/components/Shelf";

export const metadata = { title: "Library — Ars Arcanum" };

export default function LibraryPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="stamp">The shelves</p>
        <h1 className="display mt-3 text-[2.6rem] sm:text-[3.2rem]">
          Everything,
          <br />
          by series
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
          Grouped by line, never sequenced overall, because there is no single
          route through them. Mark what you finish &mdash; it is what the deeper
          layers of this site read from.
        </p>
      </section>

      <Shelf />
    </div>
  );
}
