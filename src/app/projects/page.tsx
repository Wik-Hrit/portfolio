import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Container, PageHeader } from "@/components/ui";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Experiments, research implementations and engineering projects by Hritwik Varma.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container wide>
      <PageHeader title="Things I've Built" lede="Experiments, research implementations and engineering projects." />
      <ProjectExplorer projects={projects} />
      <p className="mt-10 max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
        Each card says how the work came about: a research internship, an academic project, a technical assignment or an
        independent build. Code and demo links appear only where they are public.
      </p>
    </Container>
  );
}
