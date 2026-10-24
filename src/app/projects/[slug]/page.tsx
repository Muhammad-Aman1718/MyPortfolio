import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPY } from "@/constants/constant";
import { articleMeta } from "@/lib/seo";
import { getProject, neighbours, projects, tocItems } from "@/utils/content";
import { fillTemplate } from "@/utils/format";
import BackLink from "@/components/ui/BackLink";
import CtaPanel from "@/components/ui/CtaPanel";
import MetricGrid from "@/components/ui/MetricGrid";
import SharedPreview from "@/components/ui/SharedPreview";
import Toc from "@/components/ui/Toc";
import Prose from "@/components/content/Prose";
import ProjectPreview from "@/components/content/ProjectPreview";
import PrevNext from "@/components/sections/project/PrevNext";
import ProjectHeader from "@/components/sections/project/ProjectHeader";
import ProjectQuote from "@/components/sections/project/ProjectQuote";
import StackList from "@/components/sections/project/StackList";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return articleMeta({
    title: `${project.name} — ${COPY.project.caseStudyTitle}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = neighbours(projects, projects.indexOf(project));

  return (
    <>
      <article className="container-site page-top">
        <BackLink href="/projects" label={COPY.project.all} />

        <ProjectHeader project={project} />

        {/* Hero — the same preview the card showed, morphed into place on forward navigation */}
        <SharedPreview slug={project.slug}>
          <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-[20px] border border-line sm:aspect-video lg:aspect-21/9">
            <ProjectPreview name={project.name} type={project.type} className="absolute inset-0" />
          </div>
        </SharedPreview>

        <MetricGrid metrics={project.metrics} size="lg" />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 flex flex-col gap-10">
              <Toc items={tocItems(project.sections)} />
              <StackList stack={project.stack} />
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <Prose sections={project.sections} />
            {project.quote && <ProjectQuote quote={project.quote} />}
            {/* The sidebar is desktop-only */}
            <StackList stack={project.stack} className="mt-12 lg:hidden" />
          </div>
        </div>

        <PrevNext prev={prev} next={next} />
      </article>

      <CtaPanel description={fillTemplate(COPY.project.ctaDescription, { name: project.name })} />
    </>
  );
}
