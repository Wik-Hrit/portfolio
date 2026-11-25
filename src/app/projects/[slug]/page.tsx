import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getProject, categoryLabels, kindLabels, statusLabels } from "@/data/projects";
import { experience } from "@/data/experience";
import { Container, ButtonLink } from "@/components/ui";
import { ProjectVisual } from "@/components/project-visual";
import { GitHubIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.name, description: p.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const related = experience.filter((e) => e.projects?.includes(p.slug));

  const facts: Array<[string, React.ReactNode]> = [
    ["Type", kindLabels[p.kind]],
    ["Status", statusLabels[p.status]],
    ...(p.period ? ([["When", p.period]] as Array<[string, string]>) : []),
    ...(p.context ? ([["Where", p.context]] as Array<[string, string]>) : []),
    ["Areas", p.categories.map((c) => categoryLabels[c]).join(", ")],
  ];

  return (
    <Container>
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All projects
      </Link>

      <header className="mt-6">
        <h1 className="text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.6rem]">{p.name}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{p.summary}</p>
        {(p.github || p.demo) && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {p.github && (
              <ButtonLink href={p.github} variant="secondary">
                <GitHubIcon className="h-4 w-4" /> Repository
              </ButtonLink>
            )}
            {p.demo && <ButtonLink href={p.demo}>Live demo</ButtonLink>}
          </div>
        )}
      </header>

      <div className="mt-10 overflow-hidden rounded-xl border border-line">
        <ProjectVisual kind={p.visual} className="aspect-[16/9]" />
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-y border-line py-5 text-[14px] sm:grid-cols-2">
        {facts.map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <dt className="w-16 shrink-0 text-muted">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      {p.stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[12px] text-ink-2">
              {s}
            </li>
          ))}
        </ul>
      )}

      <article className="mt-12 space-y-10">
        {p.problem && (
          <section>
            <h2 className="text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">The problem</h2>
            <p className="mt-3 text-[16px] leading-[1.75] text-ink-2">{p.problem}</p>
          </section>
        )}
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">{s.heading}</h2>
            {s.body.map((para) => (
              <p key={para.slice(0, 40)} className="mt-3 text-[16px] leading-[1.75] text-ink-2">
                {para}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="relative pl-5 text-[16px] leading-[1.7] text-ink-2 before:absolute before:left-1 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {related.length > 0 && (
        <p className="mt-12 text-[14.5px] text-muted">
          Part of:{" "}
          {related.map((e, i) => (
            <span key={e.id}>
              {i > 0 && ", "}
              <Link href="/experience" className="prose-link">
                {e.role}, {e.organisation}
              </Link>
            </span>
          ))}
        </p>
      )}

      <nav aria-label="Next project" className="mt-16 border-t border-line pt-6">
        <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-4">
          <span>
            <span className="block text-[13px] text-muted">Next project</span>
            <span className="mt-0.5 block text-[16px] font-medium text-ink group-hover:text-accent">{next.name}</span>
          </span>
          <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
        </Link>
      </nav>
    </Container>
  );
}
