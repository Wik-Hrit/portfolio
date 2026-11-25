import Link from "next/link";
import type { Experience } from "@/data/types";
import { groupLabels } from "@/data/experience";
import { getProject } from "@/data/projects";

export function ExperienceTimeline({ items, compact = false }: { items: Experience[]; compact?: boolean }) {
  return (
    <ol className="relative">
      {items.map((e, i) => (
        <li key={e.id} className="relative grid gap-x-8 pb-10 pl-7 last:pb-0 sm:grid-cols-[10rem_1fr] sm:pl-0">
          {/* rail */}
          <span
            aria-hidden="true"
            className={`absolute left-[5px] top-2 w-px bg-line-strong sm:left-[calc(10rem+15px)] ${i === items.length - 1 ? "h-0" : "bottom-0"}`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 sm:left-[calc(10rem+10px)] ${
              e.group === "research" ? "border-accent bg-surface" : "border-line-strong bg-bg"
            }`}
          />
          <div className="mb-1 text-[13px] text-muted sm:mb-0 sm:pt-px sm:text-right sm:pr-6">
            {e.period ? <span className="tabular">{e.period}</span> : <span>{groupLabels[e.group]}</span>}
          </div>
          <div className="sm:pl-6">
            <h3 className="text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink">
              {e.role}
              <span className="font-normal text-muted"> · {e.organisation}</span>
            </h3>
            <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{e.description}</p>
            {!compact && e.contributions.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {e.contributions.map((c) => (
                  <li key={c} className="relative pl-4 text-[14.5px] leading-relaxed text-ink-2 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-line-strong">
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {!compact && e.technologies.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                {e.technologies.map((t) => (
                  <li key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11.5px] text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {!compact && e.projects && e.projects.length > 0 && (
              <p className="mt-3 text-[13.5px] text-muted">
                Related:{" "}
                {e.projects.map((slug, j) => {
                  const p = getProject(slug);
                  if (!p) return null;
                  return (
                    <span key={slug}>
                      {j > 0 && ", "}
                      <Link href={`/projects/${slug}`} className="prose-link">
                        {p.name}
                      </Link>
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
