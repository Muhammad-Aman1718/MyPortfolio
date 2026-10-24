import { COPY, PAGE_META } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import CtaPanel from "@/components/ui/CtaPanel";
import PageHero from "@/components/ui/PageHero";
import ProjectsGrid from "@/components/content/ProjectsGrid";

export const metadata = pageMeta(PAGE_META.projects);

export default function Projects() {
  const { hero, cta } = COPY.projects;

  return (
    <>
      <PageHero {...hero} />
      <div className="container-site pb-6">
        <ProjectsGrid />
      </div>
      <CtaPanel title={cta} />
    </>
  );
}
