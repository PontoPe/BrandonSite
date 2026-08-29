export const metadata = { title: "Workbench — Ars Arcanum" };

/**
 * The progress bar is the single most recognisable piece of UI in this author's
 * public life, and it is earned rather than decorative. Rather than invent
 * percentages, each bar is driven by a named milestone — which is what the
 * public updates actually report.
 */
const STAGES = ["Outlining", "Drafting", "Revision", "Production", "Out"] as const;
type Stage = (typeof STAGES)[number];

interface Project {
  title: string;
  line: string;
  stage: Stage;
  when: string;
  note: string;
}

const PROJECTS: Project[] = [
  {
    title: "Isles of the Emberdark",
    line: "Cosmere standalone",
    stage: "Out",
    when: "February 2026",
    note: "Grew out of the secret-project route rather than the traditional one — written, funded and shipped largely outside the usual publishing path.",
  },
  {
    title: "Tailored Realities",
    line: "Collection",
    stage: "Production",
    when: "December 2026",
    note: "Gathered shorter work. Collections have historically been where the connective tissue gets spelled out.",
  },
  {
    title: "Ghostbloods, Book One",
    line: "Mistborn, third era",
    stage: "Revision",
    when: "Targeted 2028",
    note: "First draft finished in January 2026. Set roughly fifty to seventy years after The Lost Metal — an eighties-flavoured thriller with early computers. All three books are intended to be written before the first one publishes.",
  },
  {
    title: "The Stormlight Archive, back five",
    line: "Roshar",
    stage: "Outlining",
    when: "After the break",
    note: "Wind and Truth closed the first arc in 2024. The second five are meant to sit on the far side of a deliberate pause.",
  },
];

const EVENTS = [
  {
    label: "Unbroken",
    detail:
      "A charity anthology on Kickstarter, in the line of Unfettered before it, carrying part of a forthcoming story.",
    when: "2026",
  },
  {
    label: "Dragonsteel Nexus",
    detail:
      "The house convention, run by his own publishing operation. Badges by drawing rather than a queue.",
    when: "3–5 December 2026",
  },
];

function Bar({ stage }: { stage: Stage }) {
  const index = STAGES.indexOf(stage);
  return (
    <div>
      <div className="flex gap-px" role="img" aria-label={`Stage: ${stage}`}>
        {STAGES.map((s, i) => (
          <span
            key={s}
            className="h-2 flex-1"
            style={{
              background:
                i < index
                  ? "var(--accent)"
                  : i === index
                    ? "var(--accent-bright)"
                    : "var(--stock-sunk)",
            }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between">
        {STAGES.map((s) => (
          <span
            key={s}
            className="stamp"
            style={{
              fontSize: "0.5625rem",
              color: s === stage ? "var(--accent)" : undefined,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WorkbenchPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="stamp">In progress</p>
        <h1 className="mt-2 text-4xl leading-tight">
          The work, while it is still work
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
          Most author sites treat the unfinished book as a rumour. Here it is the
          headline, because radical visibility into the drafting is genuinely
          part of how this career runs — public progress, an annual state-of-things
          post, four novels written in secret and then handed straight to readers.
        </p>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Bars advance by named milestone rather than invented percentages,
          because a milestone is a thing that can be reported honestly.
        </p>
      </section>

      <section className="space-y-6">
        {PROJECTS.map((p) => (
          <article key={p.title} className="sheet p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-xl">{p.title}</h2>
              <span className="stamp">{p.when}</span>
            </div>
            <p className="stamp mt-1">{p.line}</p>
            <div className="mt-4 max-w-xl">
              <Bar stage={p.stage} />
            </div>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {p.note}
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="border-b border-rule pb-2 text-2xl">
          Off the page
        </h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <li key={e.label} className="sheet p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg">{e.label}</h3>
                <span className="stamp">{e.when}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {e.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="stamp max-w-2xl leading-relaxed">
        Status as publicly reported, August 2026. In a real build this page would
        read from the same source as the annual update rather than being kept by
        hand.
      </p>
    </div>
  );
}
