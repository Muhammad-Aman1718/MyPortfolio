import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import SharedPreview from "@/components/ui/SharedPreview";
import ProjectPreview from "@/components/content/ProjectPreview";
import type { ProjectTileProps } from "@/types/types";

/** Compact project card for the home carousel. */
export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      className="group flex w-[85%] shrink-0 snap-start flex-col gap-4 sm:w-[60%] lg:w-auto"
    >
      <SharedPreview slug={project.slug}>
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-surface">
          <ProjectPreview name={project.name} type={project.type} className="absolute inset-0" />
        </div>
      </SharedPreview>
      <div className="flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-sm text-subtle">
            {project.type} · {project.role} · {project.year}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface px-4 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
          {COPY.home.work.view} <Icon name="arrowUpRight" />
        </span>
      </div>
    </Link>
  );
}
