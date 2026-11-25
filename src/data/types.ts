export type ProjectCategory =
  | "ai"
  | "ml"
  | "software"
  | "research"
  | "data"
  | "hardware";

/** How the work came about. Shown on every card so research, coursework and own builds never blur. */
export type ProjectKind =
  | "research-internship"
  | "academic"
  | "independent"
  | "assignment"
  | "competition"
  | "ongoing-research";

export type ProjectStatus = "complete" | "in-progress" | "ongoing" | "submitted";

/** Which authored schematic draws the project's visual. */
export type ProjectVisual =
  | "pipeline"
  | "reservoir"
  | "waveform"
  | "retrieval"
  | "tokens"
  | "constellation"
  | "circuit"
  | "grid"
  | "bars"
  | "graph"
  | "beam";

export type CaseSection = {
  heading: string;
  /** Paragraphs. Keep to verified facts. */
  body: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** One line, shown on cards. */
  summary: string;
  /** The problem the project addresses. */
  problem: string | null;
  categories: ProjectCategory[];
  kind: ProjectKind;
  status: ProjectStatus;
  /** Free-text period, e.g. "Nov 2026". null hides it. */
  period: string | null;
  stack: string[];
  /** Only real URLs. null hides the button. */
  github: string | null;
  demo: string | null;
  visual: ProjectVisual;
  featured?: boolean;
  /** Where it was done, e.g. "IIT Guwahati". */
  context?: string;
  /** Detailed write-up sections for the project page. */
  sections: CaseSection[];
  /** Short facts used by the Ask assistant. */
  facts?: string[];
};

export type ExperienceGroup = "research" | "academic" | "leadership" | "competition" | "learning";

export type Experience = {
  id: string;
  organisation: string;
  role: string;
  group: ExperienceGroup;
  /** Display period. null when not yet verified; the timeline then shows the group label. */
  period: string | null;
  /** Used only for ordering, never displayed. */
  sortKey: string;
  location?: string;
  description: string;
  contributions: string[];
  technologies: string[];
  /** Slugs of related projects. */
  projects?: string[];
};

export type SkillLevel = "used" | "learning" | "familiar";

export type Skill = {
  name: string;
  level: SkillLevel;
  /** simple-icons export name, e.g. "siPython". */
  icon?: string;
  /** Where it was actually used. */
  note?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: "research" | "writing" | "note";
  /** ISO date. */
  date: string;
  status: "published" | "planned";
  related?: string[];
  blocks: ArticleBlock[];
};
