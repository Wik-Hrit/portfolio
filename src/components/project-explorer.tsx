"use client";
import { useMemo, useState, useDeferredValue } from "react";
import { Search, X } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/types";
import { categoryLabels } from "@/data/projects";
import { ProjectCard } from "./project-card";

const filters: Array<{ id: "all" | ProjectCategory; label: string }> = [
  { id: "all", label: "All" },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({ id, label: categoryLabels[id] })),
];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const p of projects) for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, [projects]);

  const visible = useMemo(
    () =>
      projects.filter((p) => {
        if (active !== "all" && !p.categories.includes(active)) return false;
        if (!q) return true;
        const hay = [p.name, p.summary, p.problem ?? "", p.context ?? "", ...p.stack, ...p.categories.map((c) => categoryLabels[c])]
          .join(" ")
          .toLowerCase();
        return q.split(/\s+/).every((t) => hay.includes(t));
      }),
    [projects, active, q],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const on = active === f.id;
            const n = counts[f.id] ?? 0;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                disabled={n === 0}
                onClick={() => setActive(f.id)}
                className={`h-8 rounded-full border px-3.5 text-[13px] transition-colors disabled:opacity-40 ${
                  on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink"
                }`}
              >
                {f.label}
                <span className={`ml-1.5 tabular font-mono text-[11px] ${on ? "text-bg/70" : "text-muted"}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-64">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="h-9 w-full rounded-full border border-line bg-surface pl-9 pr-9 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} showProblem />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line-strong px-6 py-14 text-center">
          <p className="font-medium text-ink">No projects match “{query}”.</p>
          <p className="mt-1 text-sm text-muted">Try a technology like “PyTorch”, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="mt-4 text-sm font-medium text-accent hover:underline"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
