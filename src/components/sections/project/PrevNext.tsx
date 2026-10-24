import Link from "next/link";
import { COPY, TRANSITION_BACK, TRANSITION_FORWARD } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import type { PrevNextProps } from "@/types/types";

/** Previous / next project — direction-tagged so the slide matches the arrow. */
export default function PrevNext({ prev, next }: PrevNextProps) {
  const { project } = COPY;

  return (
    <nav aria-label={project.moreLabel} className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      <Link
        href={`/projects/${prev.slug}`}
        transitionTypes={TRANSITION_BACK}
        className="card card-hover group flex flex-col gap-1 p-5"
      >
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">
            <Icon name="arrowRight" />
          </span>
          {project.previous}
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">{prev.name}</span>
      </Link>
      <Link
        href={`/projects/${next.slug}`}
        transitionTypes={TRANSITION_FORWARD}
        className="card card-hover group flex flex-col items-end gap-1 p-5 text-right"
      >
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          {project.next}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrowRight" />
          </span>
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">{next.name}</span>
      </Link>
    </nav>
  );
}
