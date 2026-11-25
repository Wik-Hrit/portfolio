import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";
import { projects } from "@/data/projects";
import { publishedArticles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const pages = ["", "/projects", "/experience", "/research", "/about", "/tools", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...publishedArticles.map((a) => ({ url: `${base}/research/${a.slug}`, lastModified: a.date, priority: 0.5 })),
  ];
}
