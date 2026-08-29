import Aside from "@/components/Aside";
import RingGauge from "@/components/RingGauge";

export const metadata = { title: "Workbench — Ars Arcanum" };

/**
 * Percentages, not milestones.
 *
 * An earlier pass here used named stages because inventing numbers felt
 * dishonest. That was the wrong call: he publishes real percentages on
 * unfinished books, and has for years. The number is the point — it is what
 * makes the unfinished work public rather than rumoured. Figures below are as
 * reported on the author's own progress bars, August 2026.
 */
const PROGRESS = [
  { label: "Mistborn screenplay", value: 100, detail: "written himself, full time, over about five months", motif: "mist" as const },
  { label: "Ghostbloods, book one", value: 27, detail: "second draft", motif: "ember" as const },
  { label: "Songrise", value: 100, detail: "fourth draft — Riftwake book two", motif: "song" as const },
  { label: "Riftwake, book three", value: 57, detail: "first draft", motif: "rift" as const },
];

const RELEASES = [
  { title: "Isles of the Emberdark", when: "February 2026", line: "Cosmere standalone", out: true,
    note: "Came up through the secret-project route rather than the traditional one — written, funded and shipped largely outside the usual publishing path." },
  { title: "Blightfall", when: "1 September 2026", line: "Riftwake, book one · with Janci Patterson",
    note: "The Cytoverse after the war. Skyward Flight is sent on a diplomatic escort and arrives at a world half swallowed by invasive forest, ringed with drifting wreckage." },
  { title: "Tailored Realities", when: "December 2026", line: "Collection",
    note: "Gathered shorter work. Collections have historically been where the connective tissue gets spelled out." },
  { title: "Songrise", when: "Summer 2027", line: "Riftwake, book two · with Janci Patterson",
    note: "Fourth draft already done, which is why it sits at a hundred per cent while its release is still a year out." },
  { title: "Ghostbloods, book one", when: "Targeted 2028", line: "Mistborn, third era",
    note: "Fifty to seventy years after The Lost Metal — an eighties-flavoured thriller with early computers. All three books are meant to be written before the first one publishes." },
];

export default function WorkbenchPage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,40rem)_1fr] lg:items-end">
        <div>
          <p className="stamp">In progress</p>
          <h1 className="display mt-3 text-[2.6rem] sm:text-[3.2rem]">
            The work, while
            <br />
            it is still work
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-ink-soft">
            Most author sites treat the unfinished book as a rumour. Here it is
            the headline, because publishing the percentage on a book nobody can
            read yet is genuinely part of how this career runs &mdash; alongside
            the weekly video, the annual state-of-things post, and four novels
            written in secret and then handed straight to readers.
          </p>
        </div>
        <Aside className="lg:mb-3 lg:ml-6">
          I had these as vague stages at first, on the grounds that inventing
          numbers would be dishonest. Wrong instinct &mdash; the number is the
          whole point. A stage can always be argued with. Twenty-seven per cent
          cannot.
        </Aside>
      </section>

      <section>
        <h2 className="display ruled pb-2 text-[1.5rem]">Brandon&rsquo;s progress</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRESS.map((p, i) => (
            <RingGauge key={p.label} {...p} delay={i * 140} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="display ruled pb-2 text-[1.5rem]">What is coming</h2>
        <div className="mt-6 space-y-6">
          {RELEASES.map((r) => (
            <article
              key={r.title}
              className="panel p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <h3 className="text-[1.4rem] leading-tight">{r.title}</h3>
                <span
                  className="text-[16px]"
                  style={{ color: r.out ? "var(--ink-faint)" : "var(--brand)" }}
                >
                  {r.out ? `out — ${r.when.toLowerCase()}` : r.when}
                </span>
              </div>
              <p className="stamp mt-1">{r.line}</p>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                {r.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div>
          <h2 className="display ruled pb-2 text-[1.5rem]">Off the page</h2>
          <div className="mt-6 space-y-6">
            <article className="panel p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <h3 className="text-[1.4rem] leading-tight">The cosmere, adapted</h3>
                <span className="text-[16px]" style={{ color: "var(--brand)" }}>
                  January 2026
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                Apple took rights to the whole connected universe &mdash; not one
                series, all of it. Mistborn goes first as a theatrical feature,
                with Stormlight as a show after it. His own involvement is
                unusually deep for an author: architect of the universe, writing,
                producing, consulting, with approvals.
              </p>
              <p className="mt-3 text-[16px]">
                He wrote the Mistborn screenplay himself, full time, rather than
                hand it over. Which tells you which of the two jobs he thinks is
                load-bearing.
              </p>
            </article>

            <article className="panel p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <h3 className="text-[1.4rem] leading-tight">Dragonsteel Nexus</h3>
                <span className="text-[16px]" style={{ color: "var(--brand)" }}>
                  3&ndash;5 December 2026
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                The house convention, run by his own publishing operation rather
                than a licensor. Badges by drawing rather than a queue.
              </p>
            </article>

            <article className="panel p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <h3 className="text-[1.4rem] leading-tight">Unbroken</h3>
                <span className="text-[16px]" style={{ color: "var(--brand)" }}>
                  2026
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                A charity anthology on Kickstarter, in the line of Unfettered
                before it, carrying part of a story not yet published elsewhere.
              </p>
            </article>
          </div>
        </div>

        <Aside className="lg:mt-16">
          In a real build none of this page would be kept by hand. It would read
          from whatever feeds the progress bars, so the numbers here move when
          his do.
        </Aside>
      </section>
    </div>
  );
}
