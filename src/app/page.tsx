import Link from "next/link";
import Note from "@/components/Note";
import Portrait from "@/components/Portrait";
import RingGauge from "@/components/RingGauge";
import { KIND_LABEL, POSTS } from "@/data/posts";

/**
 * Layer one: the man.
 *
 * An earlier pass opened on the cosmere chart, which put a deep-reader
 * instrument in front of someone who may only have heard the name. The
 * connected universe is a reward for reading, not the pitch — so the front
 * door is who he is, what he is doing this week, and where to start. The
 * machinery lives two layers down, and you choose to go there.
 */

const PROGRESS = [
  { label: "Mistborn screenplay", value: 100, detail: "written himself, full time" },
  { label: "Ghostbloods, book one", value: 27, detail: "second draft" },
  { label: "Songrise", value: 100, detail: "fourth draft" },
  { label: "Riftwake, book three", value: 57, detail: "first draft" },
];

const ENTRANCES = [
  { title: "The Final Empire", who: "If you already read fantasy",
    why: "A heist crew against a god-emperor who has already won. Three books, and it finishes what it starts." },
  { title: "Elantris", who: "If you are new to the genre",
    why: "The first novel he sold, and self-contained. Nothing else is required of you." },
  { title: "Tress of the Emerald Sea", who: "If you want to test the water",
    why: "Standalone, warm, and stranger than it looks. It spoils nothing you would miss." },
  { title: "The Way of Kings", who: "If you want the big one",
    why: "A thousand pages before it turns. Readers who get past that generally do not stop." },
];

export default function Home() {
  return (
    <div className="space-y-20">
      {/* ---- The jacket ---- */}
      <section className="ink-panel -mx-5 px-5 py-14 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,32rem)_1fr] lg:items-center">
            <div>
              <p className="stamp">Novelist &middot; Utah</p>
              <h1 className="display mt-4 text-[3rem] leading-[0.94] sm:text-[4.5rem]">
                Brandon
                <br />
                Sanderson
              </h1>
              <p
                className="mt-7 text-[1.75rem] italic leading-tight sm:text-[2.1rem]"
                style={{ color: "var(--panel-fg)" }}
              >
                He finishes things.
              </p>
              <p
                className="mt-5 max-w-xl text-[17px] leading-relaxed"
                style={{ color: "var(--panel-dim)" }}
              >
                In a genre with a reputation for unfinished series, that is the
                whole reputation. He was handed someone else&rsquo;s unfinishable
                one &mdash; The Wheel of Time, after Robert Jordan died &mdash;
                and closed it in three volumes. He has not been late since.
              </p>
            </div>

            {/* The studio shot is lit dark, so it sits on the jacket without a
                frame — the panel and the photograph share a ground. */}
            <Portrait
              src="/brandon-desk.jpg"
              alt="Brandon Sanderson at his desk, hands folded, leatherbound volumes stacked beside him."
              className="feather aspect-[16/10] w-full lg:aspect-[4/3]"
              priority
            />
          </div>

          <div
            className="mt-14 border-t pt-10"
            style={{ borderColor: "var(--panel-rule)" }}
          >
            <p className="stamp">What he is working on, right now</p>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {PROGRESS.map((p) => (
                <RingGauge key={p.label} {...p} />
              ))}
            </div>
            <p
              className="hand mt-6 text-[15px]"
              style={{ color: "var(--panel-dim)" }}
            >
              Published percentages on books nobody can read yet. He has done
              this for years.
            </p>
          </div>
        </div>
      </section>

      {/* ---- This week ---- */}
      <section>
        <h2 className="display ruled pb-2 text-[1.5rem]">This week</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <article className="sheet tilt-l p-6 lg:col-span-2">
            <p className="hand text-[16px]" style={{ color: "var(--brand)" }}>
              1 September 2026 &mdash; three days away
            </p>
            <h3 className="mt-2 text-[1.8rem] leading-tight">Blightfall</h3>
            <p className="stamp mt-1">Riftwake, book one &middot; with Janci Patterson</p>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              The Cytoverse after the war. Skyward Flight is sent out on what
              should be a routine diplomatic escort and arrives at a world half
              swallowed by invasive forest, ringed with drifting wreckage. First
              of three.
            </p>
          </article>

          <article className="sheet tilt-r p-6">
            <p className="hand text-[16px]" style={{ color: "var(--brand)" }}>
              January 2026
            </p>
            <h3 className="mt-2 text-[1.4rem] leading-tight">
              Apple took the whole cosmere
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              Not one series &mdash; all of it. Mistborn first as a feature, then
              Stormlight as a show. He wrote the Mistborn screenplay himself,
              full time, rather than hand it over.
            </p>
          </article>
        </div>
      </section>

      {/* ---- The weekly ---- */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3 ruled pb-2">
          <h2 className="display text-[1.5rem]">Every week, same desk</h2>
          <Link href="/blog" className="text-[16px] text-accent underline underline-offset-4">
            All posts &rarr;
          </Link>
        </div>
        <article className="sheet tilt-r mt-6 overflow-hidden">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <Portrait
              src={POSTS[0].thumb ?? "/weekly-update-thumb.webp"}
              alt={`Thumbnail for the weekly update: ${POSTS[0].title}`}
              className="aspect-video lg:aspect-auto lg:min-h-[20rem]"
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="stamp" style={{ color: "var(--brand)" }}>
                  {KIND_LABEL[POSTS[0].kind]}
                </span>
                <time className="hand text-[15px] text-ink-faint" dateTime={POSTS[0].iso}>
                  {POSTS[0].date}
                </time>
              </div>
              <h3 className="mt-3 text-[1.9rem] leading-tight">{POSTS[0].title}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
                {POSTS[0].blurb}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* ---- Who he is ---- */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,38rem)_1fr]">
        <div>
          <h2 className="display ruled pb-2 text-[1.5rem]">Who he is</h2>
          <p className="mt-6 text-[18px] leading-relaxed text-ink-soft">
            He wrote a shelf of novels nobody bought before Elantris sold in
            2005. Since then he has published at a rate that makes other
            novelists uneasy, and he has done it while giving the method away:
            his university lectures go up free, his chapters come with
            annotations, and his three laws of magic are argued over by a
            generation of writers who have never met him.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">
            In 2022 he admitted he had written four novels in secret during
            lockdown, put them on Kickstarter, and raised $41.7 million &mdash;
            the largest campaign in the platform&rsquo;s history. He now runs his
            own publisher, Dragonsteel, out of Utah, with its own warehouse and
            its own convention.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">
            The prose is plain and fast, and critics say so. That is a trade, not
            an oversight: it gets out of the way so structure and system can
            carry the weight.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">
            He is also unusually reachable for someone at this scale: a video a
            week from the same desk, and an annual post that accounts for every
            project he has running, including the ones that slipped.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[17px]">
            <Link href="/workshop" className="text-accent underline underline-offset-4">
              How he builds a book &rarr;
            </Link>
            <Link href="/blog" className="text-accent underline underline-offset-4">
              Read the blog &rarr;
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          <Portrait
            src="/brandon-portrait.jpg"
            alt="Brandon Sanderson seated, in a dark jacket and a graphic t-shirt."
            className="aspect-[4/5] w-full"
            caption="Utah, where the whole operation is run from."
          />
          <Note>
            Worth saying plainly: the reason to start here rather than with the
            shared universe is that not one of these books requires the others.
            The connections are a reward, not a prerequisite.
          </Note>
        </div>
      </section>

      {/* ---- Where to start ---- */}
      <section>
        <h2 className="display ruled pb-2 text-[1.5rem]">Where to start</h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Reading-order guides tend to hand you one queue and imply you have
          already made a mistake. These are four front doors, and none of them is
          wrong.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRANCES.map((e, i) => (
            <article
              key={e.title}
              className={`sheet p-5 ${i % 2 ? "tilt-r" : "tilt-l"}`}
            >
              <p className="stamp">{e.who}</p>
              <h3 className="mt-2 text-[1.25rem] leading-snug">{e.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {e.why}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[17px]">
          <Link href="/library" className="text-accent underline underline-offset-4">
            All of it, by series &rarr;
          </Link>
        </p>
      </section>

      {/* ---- The way down ---- */}
      <section className="ink-panel -mx-5 px-5 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,36rem)_1fr] lg:items-center">
          <div>
            <p className="stamp">Once you are further in</p>
            <h2 className="display mt-3 text-[2rem] sm:text-[2.6rem]">
              Most of them
              <br />
              share a universe
            </h2>
            <p
              className="mt-5 max-w-xl text-[17px] leading-relaxed"
              style={{ color: "var(--panel-dim)" }}
            >
              You will start noticing a man who turns up in books that have
              nothing to do with each other. There is a chart for that &mdash;
              and it stays blank until your reading has earned it, so it is safe
              to open now.
            </p>
            <p className="mt-6">
              <Link
                href="/cosmere"
                className="display inline-block border px-5 py-3 text-[15px] transition"
                style={{
                  borderColor: "var(--panel-dim)",
                  color: "var(--panel-fg)",
                }}
              >
                Open the chart &darr;
              </Link>
            </p>
          </div>
          <p
            className="hand text-[16px] lg:justify-self-end lg:text-right"
            style={{ color: "var(--panel-dim)" }}
          >
            Nothing below this line is required.
            <br />
            It is for the second read, not the first.
          </p>
        </div>
      </section>
    </div>
  );
}
