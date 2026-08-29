import MetalTable from "@/components/MetalTable";
import ReadingPanel from "@/components/ReadingPanel";

export const metadata = { title: "Systems — Ars Arcanum" };

export default function SystemsPage() {
  return (
    <div className="space-y-10">
      <section className="max-w-3xl">
        <p className="label">Plates</p>
        <h1 className="prose-serif mt-2 text-4xl leading-tight">
          Magic that behaves like engineering
        </h1>
        <p className="prose-serif mt-5 text-[17px] leading-relaxed text-ink-soft">
          Every one of these books ends in a chart. The Ars Arcanum is an
          appendix written by an in-world scholar, and it is the honest visual
          language for this work — technical, annotated, revised as knowledge
          improves. Not scrollwork and dragons.
        </p>
        <p className="prose-serif mt-4 text-[17px] leading-relaxed text-ink-soft">
          The second law says limitations matter more than powers, so each cell
          leads with cost and reach rather than spectacle.
        </p>
      </section>

      <MetalTable />

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-2xl">
          <h2 className="prose-serif text-2xl">More plates to come</h2>
          <p className="prose-serif mt-3 text-[16px] leading-relaxed text-ink-soft">
            The Double Eye and its ten orders, each with two Surges and an oath
            ladder. The Aons, which are drawn rather than cast, and fail when a
            line is wrong. Breath, and what a colour costs to use. All of them
            behave the same way as the table above — they fill in as you read.
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
