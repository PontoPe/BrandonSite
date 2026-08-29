import Atlas from "@/components/Atlas";
import ReadingPanel from "@/components/ReadingPanel";

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="label">Plate I</p>
        <h1 className="prose-serif mt-2 text-4xl leading-[1.1] sm:text-5xl">
          There is no correct order.
          <br />
          So the map is built from yours.
        </h1>
        <p className="prose-serif mt-5 text-[17px] leading-relaxed text-ink-soft">
          Twenty-odd novels across ten worlds, quietly sharing one universe. A
          reader might arrive through a heist on a world of ash, or a war on a
          world of storms, or a single strange standalone someone pressed into
          their hands — and each route reveals the connections in a different
          sequence.
        </p>
        <p className="prose-serif mt-4 text-[17px] leading-relaxed text-ink-soft">
          So nothing here is gated behind a global spoiler switch. Every world,
          thread and power on this chart names the books that earn it. Mark what
          you have read; the map assembles itself from that, and stays quiet
          about everything else.
        </p>
      </section>

      <section>
        <Atlas />
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-2xl">
          <p className="label">The first law, as an interface</p>
          <h2 className="prose-serif mt-2 text-2xl">
            Understanding has to be earned in order.
          </h2>
          <p className="prose-serif mt-4 text-[16px] leading-relaxed text-ink-soft">
            Sanderson&rsquo;s first law says a magic system can only resolve
            conflict as satisfyingly as the reader understands it. The same holds
            for a universe this size: a revelation delivered early is not a
            revelation, it is an inconvenience. The chart above enforces that.
          </p>
          <p className="prose-serif mt-4 text-[16px] leading-relaxed text-ink-soft">
            Depth is not a setting. It is a consequence — of which books are on
            the shelf behind you, and of nothing else.
          </p>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="max-h-[70vh] overflow-y-auto rounded-sm border border-rule bg-stock-raised p-5">
            <ReadingPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
