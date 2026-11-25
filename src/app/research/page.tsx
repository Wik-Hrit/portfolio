import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles, publishedArticles, researchAreas, readingTime } from "@/data/articles";
import { getProject } from "@/data/projects";
import { Container, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research & Writing",
  description: "Research areas, technical writing and learning notes by Hritwik Varma.",
  alternates: { canonical: "/research" },
};

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ResearchPage() {
  const notes = publishedArticles.filter((a) => a.category === "note");
  const writing = publishedArticles.filter((a) => a.category !== "note");
  const planned = articles.filter((a) => a.status === "planned");

  return (
    <Container>
      <PageHeader
        title="Research, Experiments & Notes"
        lede="What I've studied beyond implementing it. None of this is peer-reviewed; research listed here was done as an intern or student inside a lab or department."
      />

      <section aria-labelledby="research-heading">
        <SectionHeading id="research-heading" title="Research" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {researchAreas.map((r) => {
            const p = getProject(r.project);
            return (
              <li key={r.title}>
                <Link
                  href={`/projects/${r.project}`}
                  className="group block h-full rounded-xl border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
                >
                  <h3 className="flex items-start justify-between gap-3 text-[15.5px] font-semibold leading-snug text-ink">
                    {r.title}
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{r.body}</p>
                  {p?.context && <p className="mt-3 text-[12.5px] text-muted">{p.context}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="writing-heading" className="mt-20">
        <SectionHeading id="writing-heading" title="Technical writing" lede="Longer pieces on how systems work and where they fail." />
        {writing.length > 0 && <ArticleList items={writing} />}
        {planned.length > 0 && (
          <div className={writing.length ? "mt-8" : ""}>
            <p className="mb-2 text-[13px] font-medium text-muted">In progress</p>
            <ul className="divide-y divide-line border-y border-line">
              {planned.map((a) => (
                <li key={a.slug} className="flex items-baseline justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-[15px] text-ink-2">{a.title}</p>
                    <p className="mt-0.5 text-[13.5px] text-muted">{a.summary}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 text-[11.5px] text-muted">Drafting</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby="notes-heading" className="mt-20">
        <SectionHeading id="notes-heading" title="Learning notes" lede="Shorter notes written while learning something." />
        {notes.length ? <ArticleList items={notes} /> : <p className="text-muted">No notes yet.</p>}
      </section>
    </Container>
  );
}

function ArticleList({ items }: { items: typeof publishedArticles }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((a) => (
        <li key={a.slug}>
          <Link href={`/research/${a.slug}`} className="group grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
            <span>
              <span className="block text-[16px] font-medium text-ink group-hover:text-accent">{a.title}</span>
              <span className="mt-0.5 block text-[14px] text-muted">{a.summary}</span>
            </span>
            <span className="tabular text-[13px] text-muted sm:pt-0.5 sm:text-right">
              {fmt(a.date)} · {readingTime(a)} min
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
