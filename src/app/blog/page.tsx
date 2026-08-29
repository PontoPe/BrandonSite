import Link from "next/link";
import Portrait from "@/components/Portrait";
import Aside from "@/components/Aside";
import { KIND_LABEL, POSTS } from "@/data/posts";

export const metadata = {
  title: "The Blog — Brandon Sanderson",
  description:
    "The weekly video, the announcements, and the annual state-of-things post — the channel he actually communicates through.",
};

const [lead, ...rest] = POSTS;

export default function BlogPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="stamp">The blog</p>
        <h1 className="display mt-3 text-[2.6rem] sm:text-[3.2rem]">
          He posts every
          <br />
          single week
        </h1>
        <p className="mt-6 text-[18px] leading-relaxed text-ink-soft">
          Most author blogs are a press-release dumping ground updated twice a
          year. This one is the main channel: a video every week from the same
          desk, the announcements before they reach anywhere else, and once a
          year a full public accounting of every project he has going.
        </p>
      </section>

      {/* The lead is a video, because the weekly update is the thing itself. */}
      <section>
        <article className="panel overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
            <Portrait
              src={lead.thumb ?? "/weekly-update-thumb.webp"}
              alt={`Thumbnail for the weekly update: ${lead.title}`}
              className="aspect-video lg:aspect-auto lg:min-h-[22rem]"
              sizes="(max-width: 1024px) 100vw, 680px"
              priority
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span
                  className="stamp"
                  style={{ color: "var(--brand)" }}
                >
                  {KIND_LABEL[lead.kind]}
                </span>
                <time className="text-[15px] text-ink-faint" dateTime={lead.iso}>
                  {lead.date}
                </time>
              </div>
              <h2 className="mt-3 text-[2rem] leading-tight">{lead.title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
                {lead.blurb}
              </p>
              <p className="mt-6">
                <span className="display inline-block border border-rule-strong px-4 py-2 text-[14px]">
                  Watch &#9654;
                </span>
              </p>
            </div>
          </div>
        </article>
      </section>

      <section>
        <h2 className="display ruled pb-2 text-[1.5rem]">Earlier</h2>
        <div className="mt-6 space-y-5">
          {rest.map((post) => (
            <article
              key={post.id}
              className="panel p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className="stamp"
                  style={{
                    color:
                      post.kind === "state" ? "var(--accent)" : undefined,
                  }}
                >
                  {KIND_LABEL[post.kind]}
                </span>
                <time className="text-[15px] text-ink-faint" dateTime={post.iso}>
                  {post.date}
                </time>
              </div>
              <h3 className="mt-2 text-[1.5rem] leading-tight">{post.title}</h3>
              <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                {post.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="max-w-2xl">
          <h2 className="display ruled pb-2 text-[1.5rem]">
            The state of the Sanderson
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            Once a year he publishes an accounting of every project he has
            running: where each one actually stands, what slipped, why, and what
            the next few years look like. It is unusually candid for a working
            novelist and it is the single best document about how he operates.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            In a real build this would be the page the{" "}
            <Link href="/workbench" className="text-accent underline underline-offset-4">
              progress rings
            </Link>{" "}
            read from, rather than both being kept by hand.
          </p>
        </div>
        <Aside>
          Post text here is representative of the cadence, not transcribed —
          except the weekly update and the 2025 accounting, which are real.
        </Aside>
      </section>
    </div>
  );
}
