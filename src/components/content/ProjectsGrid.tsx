"use client";

import { COPY, PROJECTS } from "@/constants/constant";
import useProjectsGrid from "@/hooks/useProjectsGrid";
import { projectNumber } from "@/utils/content";
import FilterPills from "@/components/ui/FilterPills";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";

/**
 * Filterable gallery. Surviving cards glide to their new slots on filter
 * change, and each preview morphs into the case-study hero.
 */
export default function ProjectsGrid() {
  const { filter, select, visible, options, gridRef, isAll } = useProjectsGrid();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills options={options} value={filter} onChange={select} label={COPY.projects.filterLabel} />
        <p className="text-sm text-subtle" aria-live="polite">
          {COPY.projects.showing} <span className="font-medium text-fg">{visible.length}</span> {COPY.projects.of}{" "}
          {PROJECTS.length}
        </p>
      </div>

      <div ref={gridRef}>
        <Reveal
          variant="fade-up"
          stagger
          each={0.08}
          start="top 92%"
          className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2"
        >
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projectNumber(project.slug)}
              wide={Boolean(project.flagship && isAll)}
            />
          ))}
        </Reveal>
      </div>
    </>
  );
}
