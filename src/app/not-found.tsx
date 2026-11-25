import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <p className="font-mono text-[13px] text-muted">404</p>
      <h1 className="mt-3 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">This page didn&apos;t make it past retrieval.</h1>
      <p className="mt-4 max-w-[55ch] text-[17px] leading-relaxed text-ink-2">
        The link may be old, or the page may have moved. Everything that exists is reachable from the menu.
      </p>
      <div className="mt-8 flex flex-wrap gap-2.5">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          See projects
        </ButtonLink>
      </div>
      <p className="mt-10 text-[14.5px] text-muted">
        Looking for something specific? <Link href="/contact" className="prose-link">Ask me directly</Link>.
      </p>
    </Container>
  );
}
