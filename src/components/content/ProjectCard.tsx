import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import SharedPreview from "@/components/ui/SharedPreview";
import ProjectPreview from "./ProjectPreview";
import type { ProjectCardProps } from "@/types/types";

/** Gallery card: a big product preview with the details underneath; `wide` spans both columns. */
export default function ProjectCard({ project, index, wide }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      data-flip-id={project.slug}
      className={cn("group flex flex-col gap-5", wide && "md:col-span-2")}
    >
      <div className="relative">
        <SharedPreview slug={project.slug}>
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl bg-surface transition-transform duration-500 ease-smooth group-hover:-translate-y-1",
              wide ? "aspect-4/3 sm:aspect-video lg:aspect-21/9" : "aspect-4/3",
            )}
          >
            <ProjectPreview name={project.name} type={project.type} className="absolute inset-0" />
          </div>
        </SharedPreview>
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
            {project.flagship && `${COPY.projects.featured} · `}
            {project.type}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
            <Icon name="arrowUpRight" />
          </span>
        </div>
      </div>

      <div className={cn("flex gap-4 px-1", wide ? "md:items-end md:justify-between" : "flex-col")}>
        <div className="flex gap-4">
          <span className="pt-1 text-sm font-medium text-subtle">{pad2(index)}</span>
          <div>
            <h2
              className={cn(
                "font-display font-bold tracking-tight transition-colors duration-200 group-hover:text-primary",
                wide ? "text-2xl md:text-[34px]" : "text-2xl",
              )}
            >
              {project.name}
            </h2>
            <p className="mt-1.5 max-w-[52ch] leading-relaxed text-muted">{project.tagline}</p>
          </div>
        </div>
        <p className={cn("text-sm text-subtle", wide ? "pl-9 md:shrink-0 md:pl-0 md:text-right" : "pl-9")}>
          {project.role} · {project.year}
          <span className="block text-subtle/90">{project.tags.join(" · ")}</span>
        </p>
      </div>
    </Link>
  );
}
