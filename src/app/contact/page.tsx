import type { Metadata } from "next";
import { Mail, FileText } from "lucide-react";
import { siteConfig } from "@/data/site.config";
import { contactConfigured } from "@/lib/assistant-config";
import { Container, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Hritwik Varma about software engineering, applied AI and research opportunities.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const channels = [
    siteConfig.email && { label: siteConfig.email, sub: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
    siteConfig.linkedin && { label: "LinkedIn", sub: "Message me", href: siteConfig.linkedin, Icon: LinkedInIcon },
    siteConfig.github && { label: "GitHub", sub: `@${siteConfig.githubUsername}`, href: siteConfig.github, Icon: GitHubIcon },
    siteConfig.resumeUrl && { label: "Resume", sub: "View or download", href: siteConfig.resumeUrl, Icon: FileText },
  ].filter(Boolean) as Array<{ label: string; sub: string; href: string; Icon: React.ComponentType<{ className?: string }> }>;

  return (
    <Container>
      <PageHeader title="Let's build something interesting.">
        <div className="mt-4 space-y-3 text-[17px] leading-relaxed text-ink-2">
          <p>
            I&apos;m interested in software engineering, applied AI and opportunities where I can work on meaningful technical problems.
          </p>
          <p>If you&apos;re building something interesting, working on research or looking to connect, feel free to reach out.</p>
        </div>
      </PageHeader>

      <ul className="grid gap-3 sm:grid-cols-2">
        {channels.map(({ label, sub, href, Icon }) => {
          const ext = href.startsWith("http");
          return (
            <li key={href}>
              <a
                href={href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface p-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 group-hover:text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-medium text-ink">{label}</span>
                  <span className="block text-[13px] text-muted">{sub}</span>
                </span>
                {ext && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="form-heading" className="mt-14">
        <h2 id="form-heading" className="mb-4 text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">
          Send a message
        </h2>
        <ContactForm configured={contactConfigured()} email={siteConfig.email} />
      </section>
    </Container>
  );
}
