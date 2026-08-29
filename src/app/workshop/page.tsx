export const metadata = { title: "Workshop — Ars Arcanum" };

const LAWS = [
  {
    n: "First",
    statement:
      "An author's ability to resolve conflict with magic is directly proportional to how well the reader understands that magic.",
    gloss:
      "A power the reader cannot reason about cannot satisfy them when it saves the day — it can only relieve them. Soft magic is not forbidden; it just has to stay out of the solution.",
    site:
      "This is why the Atlas will not show you a connection you have not read. A revelation handed over early is not a revelation.",
  },
  {
    n: "Second",
    statement: "Limitations are more interesting than powers.",
    gloss:
      "What the magic costs, and what it cannot do, is where the story lives. A man who can push on metal is a curiosity; a man who can only push on metal, and is standing in a room with none, is a scene.",
    site:
      "Every cell in the Metallic Arts plate leads with reach and cost rather than spectacle.",
  },
  {
    n: "Third",
    statement: "Expand what you have before you add something new.",
    gloss:
      "Change one thing and you have changed the world. Depth beats breadth — a second implication of an existing rule is usually worth more than a second rule.",
    site:
      "One mechanism runs this whole site: a fact declares the books that earn it. The Atlas, the shelves and the metals table are all that same rule, expanded.",
  },
];

const STRUCTURE = [
  {
    term: "Promise",
    body: "The opening tells you what kind of book this is and what it will eventually pay off. Break the promise and no amount of craft later repairs it.",
  },
  {
    term: "Progress",
    body: "The middle is a sense of movement toward that payoff — not merely events, but the reader's growing conviction that the ending is being built.",
  },
  {
    term: "Payoff",
    body: "The convergence. Threads that looked independent turn out to have been aimed at the same point the whole time.",
  },
  {
    term: "The avalanche",
    body: "Readers named the effect before the craft vocabulary caught up: the last stretch of the book where every thread arrives at once and the pace stops being negotiable. It is engineered, not discovered — the convergence is planned from the outline backwards.",
  },
];

export default function WorkshopPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <p className="label">Craft</p>
        <h1 className="prose-serif mt-2 text-4xl leading-tight">
          He gives the method away
        </h1>
        <p className="prose-serif mt-5 text-[17px] leading-relaxed text-ink-soft">
          The lectures are free, the annotations are published chapter by
          chapter, the deleted scenes go up, and the laws have been stated
          plainly enough that a generation of writers argues about them. He may
          turn out to be as influential as a teacher as he is as a novelist —
          which makes this a pillar of the site, not a footer link.
        </p>
        <p className="prose-serif mt-4 text-[17px] leading-relaxed text-ink-soft">
          They are also, read sideways, a decent theory of interface design.
        </p>
      </section>

      <section className="space-y-px bg-rule">
        {LAWS.map((law) => (
          <article key={law.n} className="bg-stock-raised p-6">
            <p className="label">{law.n} law</p>
            <blockquote className="prose-serif mt-3 max-w-3xl border-l-2 border-accent pl-4 text-[19px] leading-snug">
              {law.statement}
            </blockquote>
            <p className="prose-serif mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {law.gloss}
            </p>
            <p className="mt-3 max-w-2xl border-t border-rule pt-3 text-[13px] leading-relaxed text-ink-faint">
              <span className="label">Applied here — </span>
              {law.site}
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="prose-serif border-b border-rule pb-2 text-2xl">
          The shape of a book
        </h2>
        <dl className="mt-4 grid gap-px bg-rule sm:grid-cols-2">
          {STRUCTURE.map((s) => (
            <div key={s.term} className="bg-stock-raised p-5">
              <dt className="prose-serif text-lg">{s.term}</dt>
              <dd className="prose-serif mt-2 text-[15px] leading-relaxed text-ink-soft">
                {s.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="max-w-3xl">
        <h2 className="prose-serif text-2xl">On the prose</h2>
        <p className="prose-serif mt-3 text-[16px] leading-relaxed text-ink-soft">
          The sentences are plain, quick and cinematic, and critics have never
          been shy about it. That is a trade rather than an oversight: the prose
          is built to disappear so that structure and system can carry the
          weight. A site for this work should make the same trade — clarity over
          atmosphere, legibility over mood. Anything else would be a design that
          contradicts its own subject.
        </p>
      </section>
    </div>
  );
}
