import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { Container, PageHeader } from "@/components/ui";
import { ExperienceTimeline } from "@/components/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Research internships at IIT Guwahati and IIT Roorkee, academic projects, responsibilities and competitions.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        title="Where I've Worked & What I've Explored"
        lede="Research internships, academic projects and the responsibilities alongside them, newest first."
      />
      <ExperienceTimeline items={experience} />
    </Container>
  );
}
