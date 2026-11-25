import type { Metadata } from "next";
import { about } from "@/data/profile";
import { siteConfig } from "@/data/site.config";
import { Container, PageHeader, ButtonLink } from "@/components/ui";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: "About",
  description: "Hritwik Varma: ECE student at BIT Mesra, from signals and systems to software and applied AI.",
  alternates: { canonical: "/about" },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      <div className="text-[15.5px] leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((i) => (
      <li key={i} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-line-strong">
        {i}
      </li>
    ))}
  </ul>
);

export default function AboutPage() {
  return (
    <Container>
      <div className="mb-8">
        <Avatar size={64} />
      </div>
      <PageHeader title={about.heading} />
      <div className="-mt-4 space-y-4 text-[17px] leading-[1.75] text-ink-2">
        {about.intro.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
      </div>

      <div className="mt-14">
        <Block title="Academic background">
          <p className="font-medium text-ink">{about.academic.degree}</p>
          <p>
            {about.academic.institution} · <span className="tabular">{about.academic.period}</span>
          </p>
          <div className="mt-3">
            <List items={about.academic.notes} />
          </div>
        </Block>
        <Block title="Technical interests">
          <List items={about.interests} />
        </Block>
        <Block title="Engineering philosophy">
          <div className="space-y-4">
            {about.philosophy.map((p) => (
              <div key={p.title}>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="mt-0.5">{p.body}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block title="What I'm learning">
          <List items={about.learning} />
        </Block>
        <Block title="What I'm looking for">
          <p>{about.lookingFor}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            {siteConfig.resumeUrl && (
              <ButtonLink href={siteConfig.resumeUrl} variant="secondary">
                Resume
              </ButtonLink>
            )}
          </div>
        </Block>
        <Block title="Outside the code">
          <List items={about.personal} />
        </Block>
      </div>
    </Container>
  );
}
