"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FILTER_ALL, PROJECT_FILTERS } from "@/constants/constant";
import { Flip, gsap } from "@/lib/gsap";
import { filterProjects } from "@/utils/content";
import { prefersReducedMotion } from "@/utils/motion";

/**
 * Filter state for the projects gallery. On change, surviving cards glide to
 * their new slots (FLIP) and new ones fade up.
 */
export default function useProjectsGrid() {
  const [filter, setFilter] = useState(FILTER_ALL);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = filterProjects(filter);
  const options = PROJECT_FILTERS.filter((f) => filterProjects(f).length > 0);

  const select = (next: string) => {
    if (next === filter) return;
    if (gridRef.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip-id]"));
    }
    setFilter(next);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    const timeline = Flip.from(state, {
      duration: 0.65,
      ease: "power3.inOut",
      nested: true,
      prune: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 24, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, delay: 0.2, stagger: 0.06, ease: "power3.out" },
        ),
    });
    return () => {
      timeline.kill();
    };
  }, [filter]);

  return { filter, select, visible, options, gridRef, isAll: filter === FILTER_ALL };
}
