import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { categoryLabels, kindLabels, statusLabels } from "@/data/projects";
import { ProjectVisual } from "./project-visual";
import { GitHubIcon } from "./icons";

export function ProjectCard({ project, showProblem = false }: { project: Project; showProblem?: boolean }) {
  const p = project;
  const statusTone = p.status === "in-progress" || p.status === "ongoing" ? "text-ok" : "text-muted";
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift">
      <div className="relative aspect-[16/9] border-b border-line">
        <ProjectVisual kind={p.visual} className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted">
          <span>{kindLabels[p.kind]}</span>
          <span aria-hidden="true">·</span>
          <span>{categoryLabels[p.categories[0]]}</span>
          <span aria-hidden="true">·</span>
          <span className={statusTone}>{statusLabels[p.status]}</span>
        </div>
        <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-ink">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p.summary}</p>
        {showProblem && p.problem && (
          <p className="mt-3 line-clamp-3 border-t border-line pt-3 text-[13.5px] leading-relaxed text-ink-2">
            <span className="font-medium text-ink">Problem. </span>
            {p.problem}
          </p>
        )}
        {p.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {p.stack.slice(0, 5).map((s) => (
              <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11.5px] text-ink-2">
                {s}
              </li>
            ))}
            {p.stack.length > 5 && <li className="px-1 py-0.5 font-mono text-[11.5px] text-muted">+{p.stack.length - 5}</li>}
          </ul>
        )}
        <div className="relative z-10 mt-auto flex items-center gap-4 pt-5 text-sm">
          <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 font-medium text-ink hover:text-accent">
            Details <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden="true" />
          </Link>
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <GitHubIcon className="h-3.5 w-3.5" /> Code<span className="sr-only"> for {p.name} (opens in a new tab)</span>
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              Live demo<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
