import { siteConfig } from "./site.config";

/** Social links shown in the sidebar and on the contact page. Entries with a null href are dropped. */
export type SocialLink = { id: "github" | "linkedin" | "x" | "email" | "resume"; label: string; href: string; external: boolean };

const all: Array<Omit<SocialLink, "href"> & { href: string | null }> = [
  { id: "github", label: "GitHub", href: siteConfig.github, external: true },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.linkedin, external: true },
  { id: "x", label: "X", href: siteConfig.x, external: true },
  { id: "email", label: "Email", href: siteConfig.email ? `mailto:${siteConfig.email}` : null, external: false },
  { id: "resume", label: "Resume", href: siteConfig.resumeUrl, external: true },
];

export const socialLinks: SocialLink[] = all.filter((l): l is SocialLink => Boolean(l.href));
