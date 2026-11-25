import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skillCategories, levelLabels } from "@/data/skills";
import { about, hero } from "@/data/profile";
import { siteConfig } from "@/data/site.config";

/**
 * The assistant's knowledge base is built from the same data files the site renders,
 * so it can never know something the site does not say.
 */

export type KnowledgeChunk = {
  id: string;
  title: string;
  href: string;
  text: string;
};

function projectChunk(p: (typeof projects)[number]): KnowledgeChunk {
  const parts = [
    `${p.name}. ${p.summary}`,
    p.problem ? `Problem: ${p.problem}` : "",
    p.context ? `Context: ${p.context}.` : "",
    p.period ? `Period: ${p.period}.` : "",
    `Status: ${p.status}. Kind: ${p.kind}.`,
    p.stack.length ? `Stack: ${p.stack.join(", ")}.` : "",
    p.github ? `Repository: ${p.github}` : "No public repository listed.",
    p.demo ? `Live demo: ${p.demo}` : "No live demo listed.",
    ...(p.facts ?? []),
    ...p.sections.map((s) => `${s.heading}: ${s.body.join(" ")} ${(s.bullets ?? []).join("; ")}`),
  ];
  return { id: `project:${p.slug}`, title: p.name, href: `/projects/${p.slug}`, text: parts.filter(Boolean).join("\n") };
}

function experienceChunk(e: (typeof experience)[number]): KnowledgeChunk {
  return {
    id: `experience:${e.id}`,
    title: `${e.role}, ${e.organisation}`,
    href: "/experience",
    text: [
      `${e.role} at ${e.organisation}.`,
      e.period ? `Period: ${e.period}.` : "Dates not listed.",
      e.description,
      ...e.contributions,
      e.technologies.length ? `Technologies: ${e.technologies.join(", ")}.` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export function buildKnowledge(): KnowledgeChunk[] {
  const profile: KnowledgeChunk = {
    id: "profile",
    title: "About Hritwik",
    href: "/about",
    text: [
      `${siteConfig.name}. ${siteConfig.positioning}.`,
      `${about.academic.degree}, ${about.academic.institution}, ${about.academic.period}. Expected graduation 2027.`,
      ...hero.intro,
      `Philosophy: ${hero.philosophy}`,
      `Interests: ${about.interests.join("; ")}.`,
      `Currently learning: ${about.learning.join("; ")}.`,
      `Looking for: ${about.lookingFor}`,
      ...about.personal,
      `Contact: ${siteConfig.email}. GitHub: ${siteConfig.github}. LinkedIn: ${siteConfig.linkedin}.`,
    ].join("\n"),
  };
  const skills: KnowledgeChunk = {
    id: "skills",
    title: "Tools and technologies",
    href: "/tools",
    text: skillCategories
      .map(
        (c) =>
          `${c.title}: ` +
          c.skills.map((s) => `${s.name} (${levelLabels[s.level].label}${s.note ? `, ${s.note}` : ""})`).join(", "),
      )
      .join("\n"),
  };
  return [profile, skills, ...projects.map(projectChunk), ...experience.map(experienceChunk)];
}

const STOP = new Set(
  "a an and are as at be by can did do does for from has have how i in is it its me my of on or so tell that the this to was were what when where which who why with you your about".split(
    " ",
  ),
);

export function tokenize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** BM25 over a small corpus. No vector database needed at this size. */
export function retrieve(query: string, chunks: KnowledgeChunk[], k = 5) {
  const docs = chunks.map((c) => tokenize(`${c.title} ${c.text}`));
  const avg = docs.reduce((n, d) => n + d.length, 0) / docs.length;
  const q = Array.from(new Set(tokenize(query)));
  const df = new Map<string, number>();
  for (const t of q) df.set(t, docs.filter((d) => d.includes(t)).length);
  const scored = chunks.map((c, i) => {
    const d = docs[i];
    let score = 0;
    for (const t of q) {
      const f = d.filter((x) => x === t || (t.length > 4 && x.startsWith(t.slice(0, -1)))).length;
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (chunks.length - n + 0.5) / (n + 0.5));
      score += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.length / avg))));
    }
    return { chunk: c, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
