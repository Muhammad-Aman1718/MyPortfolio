import { COPY } from "@/constants/constant";
import { projectFacts } from "@/utils/content";
import { enter } from "@/utils/style";
import SplitText from "@/components/ui/SplitText";
import type { ProjectProps } from "@/types/types";

/** Case-study header: the title rises word by word; the facts arrive after it. */
export default function ProjectHeader({ project }: ProjectProps) {
  return (
    <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        <p {...enter("rise")} className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          <span className="pill-ghost">{project.type}</span>
          <span>{project.year}</span>
          <span className="text-fg/30" aria-hidden="true">
            ·
          </span>
          <span>{COPY.project.caseStudy}</span>
        </p>
        <h1 className="h-display mt-5 text-[42px] md:text-[64px]">
          <SplitText text={project.name} enter="mask" step={70} delay={80} />
        </h1>
        <p {...enter("rise", 380)} className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>
      <dl {...enter("rise", 500)} className="card grid grid-cols-2 gap-px overflow-hidden bg-line lg:col-span-5">
        {projectFacts(project).map((fact) => (
          <div key={fact.label} className="bg-surface p-4">
            <dt className="font-mono text-xs text-muted">{fact.label}</dt>
            <dd className="mt-1 text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
