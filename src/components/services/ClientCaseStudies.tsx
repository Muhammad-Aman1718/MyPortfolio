import { COPY } from "@/constants/constant";
import { publishedClientStudies } from "@/utils/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ClientCaseStudyCard from "./ClientCaseStudyCard";

/** Client case studies; renders nothing while every entry is still a placeholder. */
export default function ClientCaseStudies() {
  const studies = publishedClientStudies();
  if (studies.length === 0) return null;
  const { caseStudies } = COPY.services;

  return (
    <section className="container-site section">
      <SectionHeader
        eyebrow={caseStudies.eyebrow}
        title={caseStudies.title}
        highlight={caseStudies.highlight}
        motion="fade"
      />
      <Reveal variant="fade-up" stagger each={0.08} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <ClientCaseStudyCard key={study.title} study={study} />
        ))}
      </Reveal>
    </section>
  );
}
