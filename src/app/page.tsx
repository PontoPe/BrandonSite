import Atlas from "@/components/Atlas";
import Note from "@/components/Note";
import ReadingPanel from "@/components/ReadingPanel";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-end">
        <div>
          <p className="stamp">Plate I &middot; the silver sea</p>
          <h1 className="mt-3 text-[2.75rem] leading-[1.06] sm:text-[3.4rem]">
            There is no correct order.
            <em className="block italic">So the map is built from yours.</em>
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-ink-soft">
            Twenty-odd novels across ten worlds, quietly sharing one universe. A
            reader might arrive through a heist on a world of ash, or a war on a
            world of storms, or one strange standalone somebody pressed into
            their hands &mdash; and each route uncovers the connections in a
            different sequence.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">
            So nothing is gated behind a spoiler switch. Every world, thread and
            power on the chart names the books that earn it. Mark what you have
            read; the chart inks itself in from that, and stays quiet about the
            rest.
          </p>
        </div>

        <Note className="lg:mb-3 lg:ml-6">
          Drawn from what I have seen myself, or been told by someone I had
          reason to believe. The blank spaces are honest &mdash; I would rather
          leave a world unnamed than name it wrongly.
        </Note>
      </section>

      <section>
        <Atlas />
      </section>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="max-w-2xl">
          <p className="stamp">The first law, as an interface</p>
          <h2 className="mt-2 text-[2rem] leading-tight">
            Understanding has to be earned in order.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            Sanderson&rsquo;s first law holds that a magic system can resolve
            conflict only as satisfyingly as the reader understands it. The same
            is true of a universe this size: a revelation delivered early is not
            a revelation, it is an inconvenience. The chart above enforces that
            rather than trusting anyone to look away.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Depth is not a setting. It is a consequence &mdash; of which books
            are on the shelf behind you, and of nothing else.
          </p>

          <Note side="left" className="mt-8">
            Second law: what a thing cannot do is more interesting than what it
            can. A site that shows you everything at once has no limitations, and
            so nothing to be curious about.
          </Note>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="sheet tilt-l max-h-[72vh] overflow-y-auto p-5">
            <ReadingPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
