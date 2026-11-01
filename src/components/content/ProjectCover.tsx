import ProjectPreview from "./ProjectPreview";
import ProjectSlideshow from "./ProjectSlideshow";
import type { ProjectCoverProps } from "@/types/types";

/**
 * A project card's visual: its showcase images as a self-advancing slideshow
 * when it has them, otherwise the stylised mock-up for its type. Fills its
 * (positioned) box.
 */
export default function ProjectCover({ project, sizes, priority = false }: ProjectCoverProps) {
  if (!project.images?.length) {
    return <ProjectPreview name={project.name} type={project.type} className="absolute inset-0" />;
  }
  return <ProjectSlideshow images={project.images} sizes={sizes} priority={priority} />;
}
