import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { publishedArticles, getArticle, readingTime } from "@/data/articles";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui";
import { ReadingProgress } from "@/components/reading-progress";

export function generateStaticParams() {
  return publishedArticles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

const categoryLabel = { research: "Research", writing: "Technical writing", note: "Learning note" } as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/research/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.summary, publishedTime: a.date, authors: [siteConfig.name] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const date = new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <Container>
        <Link href="/research" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Research & Writing
        </Link>
        <article id="article-body" className="mt-6">
          <header className="border-b border-line pb-8">
            <h1 className="text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-[2.5rem]">{a.title}</h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{a.summary}</p>
            <p className="tabular mt-5 text-[13.5px] text-muted">
              {categoryLabel[a.category]} · <time dateTime={a.date}>{date}</time> · {readingTime(a)} min read
            </p>
          </header>
          <div className="mt-8 max-w-[68ch]">
            {a.blocks.map((b, i) => {
              switch (b.type) {
                case "h2":
                  return (
                    <h2 key={i} className="mb-3 mt-10 text-[1.25rem] font-semibold tracking-[-0.015em] text-ink">
                      {b.text}
                    </h2>
                  );
                case "p":
                  return (
                    <p key={i} className="mt-4 text-[16.5px] leading-[1.75] text-ink-2">
                      {b.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={i} className="mt-4 space-y-3">
                      {b.items.map((it) => (
                        <li key={it} className="relative pl-5 text-[16.5px] leading-[1.7] text-ink-2 before:absolute before:left-1 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                case "code":
                  return (
                    <pre key={i} className="mt-5 overflow-x-auto rounded-lg border border-line bg-surface-2 p-4 font-mono text-[13.5px] leading-relaxed text-ink">
                      <code>{b.code}</code>
                    </pre>
                  );
                case "note":
                  return (
                    <p key={i} className="mt-6 rounded-lg border border-line bg-accent-soft/60 px-4 py-3 text-[15px] leading-relaxed text-ink">
                      {b.text}
                    </p>
                  );
              }
            })}
          </div>
          {a.related && a.related.length > 0 && (
            <footer className="mt-12 border-t border-line pt-6 text-[14.5px] text-muted">
              Related projects:{" "}
              {a.related.map((slug, i) => {
                const p = getProject(slug);
                return p ? (
                  <span key={slug}>
                    {i > 0 && ", "}
                    <Link href={`/projects/${slug}`} className="prose-link">
                      {p.name}
                    </Link>
                  </span>
                ) : null;
              })}
            </footer>
          )}
        </article>
      </Container>
    </>
  );
}
