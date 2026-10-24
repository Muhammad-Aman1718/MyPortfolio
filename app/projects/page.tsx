import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/page-hero";
import ProjectsGrid from "@/components/projects-grid";
import CtaPanel from "@/components/cta-panel";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Mobile apps by Muhammad Aman — React Native, iOS and Android projects with case studies on the problem, the build and the result.",
  path: "/projects",
});

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work."
        highlight={["work."]}
        description="Mobile apps, web products and the backends behind them — each with a case study on the problem, the build and the result."
      />
      <div className="container-site pb-6">
        <ProjectsGrid />
      </div>
      <CtaPanel title="Want something like this built?" />
    </>
  );
}
