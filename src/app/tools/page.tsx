import type { Metadata } from "next";
import { skillCategories, levelLabels } from "@/data/skills";
import type { SkillLevel } from "@/data/types";
import { Container, PageHeader } from "@/components/ui";
import { BrandIcon } from "@/components/brand-icon";

export const metadata: Metadata = {
  title: "Tools",
  description: "The languages, frameworks and tools Hritwik Varma works with, and how well he knows each.",
  alternates: { canonical: "/tools" },
};

const levelStyle: Record<SkillLevel, string> = {
  used: "bg-accent",
  learning: "bg-ok",
  familiar: "bg-line-strong",
};

export default function ToolsPage() {
  return (
    <Container wide>
      <div className="max-w-[46rem]">
        <PageHeader
          title="Tools & Technologies"
          lede="Grouped by what they're for, and marked honestly: what I've used in real work, what I'm learning now, and what I only know the basics of."
        />
      </div>

      <ul className="-mt-4 mb-12 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted" aria-label="Legend">
        {(Object.keys(levelLabels) as SkillLevel[]).map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${levelStyle[l]}`} aria-hidden="true" />
            <span className="text-ink">{levelLabels[l].label}</span>
            <span className="hidden sm:inline">· {levelLabels[l].description}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-14">
        {skillCategories.map((c) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`}>
            <div className="mb-4">
              <h2 id={`cat-${c.id}`} className="text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">
                {c.title}
              </h2>
              <p className="mt-1 text-[14.5px] text-muted">{c.description}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.skills.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-3.5 rounded-xl border border-line bg-surface p-3.5 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
                >
                  <BrandIcon name={s.name} icon={s.icon} className="h-10 w-10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium text-ink">{s.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-muted">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${levelStyle[s.level]}`} aria-hidden="true" />
                      {levelLabels[s.level].label}
                    </p>
                    {s.note && <p className="mt-0.5 truncate text-[12.5px] text-muted">{s.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
