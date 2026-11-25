import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { hero, workAreas } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { experienceSnapshot } from "@/data/experience";
import { siteConfig } from "@/data/site.config";
import { suggestedQuestions } from "@/lib/suggested-questions";
import { AskAboutMyWork } from "@/components/ask-about-my-work";
import { ProjectCard } from "@/components/project-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContributionGraph } from "@/components/contribution-graph";
import { ButtonLink, Container, SectionHeading, StatusBadge } from "@/components/ui";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <Container>
        {/* Hero */}
        <section aria-labelledby="hero-heading">
          <StatusBadge />
          <h1
            id="hero-heading"
            className="mt-7 text-[2.35rem] font-semibold leading-[1.07] tracking-[-0.04em] text-ink sm:text-[3.1rem]"
          >
            {hero.headline}
          </h1>
          <div className="mt-6 space-y-4 text-[17px] leading-[1.7] text-ink-2">
            <p>
              I&apos;m <strong className="font-semibold text-ink">{siteConfig.name}</strong>, {hero.intro[0].replace(/^I'm an? /, "an ")}
            </p>
            <p>{hero.intro[1]}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <ButtonLink href="/projects">
              View projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {siteConfig.resumeUrl && (
              <ButtonLink href={siteConfig.resumeUrl} variant="secondary">
                <FileText className="h-4 w-4" aria-hidden="true" /> Resume
              </ButtonLink>
            )}
            <ButtonLink href="/contact" variant="secondary">
              Contact me
            </ButtonLink>
            <span className="mx-1 hidden h-5 w-px bg-line-strong sm:block" aria-hidden="true" />
            {siteConfig.github && (
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <GitHubIcon className="h-[18px] w-[18px]" />
                <span className="sr-only">GitHub (opens in a new tab)</span>
              </a>
            )}
            {siteConfig.linkedin && (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
                <span className="sr-only">LinkedIn (opens in a new tab)</span>
              </a>
            )}
          </div>
        </section>

        {/* Ask */}
        <div className="mt-16">
          <AskAboutMyWork suggestions={suggestedQuestions} />
        </div>

        {/* What I work on */}
        <section aria-labelledby="work-heading" className="mt-24">
          <SectionHeading id="work-heading" title="What I work on" />
          <dl className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-2">
            {workAreas.map((a, i) => (
              <div
                key={a.title}
                className={`bg-surface p-5 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : i === 2 ? "border-b sm:border-b-0" : ""} border-line`}
              >
                <dt className="text-[15px] font-semibold text-ink">{a.title}</dt>
                <dd className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{a.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      {/* Featured projects */}
      <Container wide className="mt-24">
        <section aria-labelledby="featured-heading">
          <SectionHeading
            id="featured-heading"
            title="Selected work"
            lede="Research implementations and engineering projects."
            href="/projects"
            hrefLabel="All projects"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="mt-24">
        {/* Experience snapshot */}
        <section aria-labelledby="exp-heading">
          <SectionHeading id="exp-heading" title="Experience" href="/experience" hrefLabel="Full timeline" />
          <ExperienceTimeline items={experienceSnapshot} compact />
        </section>

        <div className="mt-16">
          <ContributionGraph />
        </div>

        {/* Close */}
        <section aria-labelledby="close-heading" className="mt-20">
          <h2 id="close-heading" className="text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
            If you&apos;re building something that has to work outside a demo, I&apos;d like to hear about it.
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              More about me
            </ButtonLink>
          </div>
          <p className="mt-6 text-[14.5px] text-muted">
            Or read the <Link href="/research" className="prose-link">research notes</Link>.
          </p>
        </section>
      </Container>
    </>
  );
}
