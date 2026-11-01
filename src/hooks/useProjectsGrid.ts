"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FILTER_ALL, PROJECT_FILTERS, UI } from "@/constants/constant";
import { loadGsap, type FlipPlugin, type Gsap } from "@/lib/gsap";
import { filterProjects } from "@/utils/content";
import { prefersReducedMotion } from "@/utils/motion";

/**
 * Filter state for the projects gallery. On change, surviving cards glide to
 * their new slots (FLIP) and new ones fade up. GSAP loads after the page when
 * there are filters to use; a click before it arrives just swaps the cards.
 */
export default function useProjectsGrid() {
  const [filter, setFilter] = useState(FILTER_ALL);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const plugins = useRef<{ gsap: Gsap; Flip: FlipPlugin } | null>(null);

  const visible = filterProjects(filter);
  const options = PROJECT_FILTERS.filter((f) => filterProjects(f).length > 0);
  const hasFilters = options.length > UI.minProjectFilters;

  useEffect(() => {
    if (!hasFilters || prefersReducedMotion()) return;
    void loadGsap().then((m) => {
      plugins.current = m;
    });
  }, [hasFilters]);

  const select = (next: string) => {
    if (next === filter) return;
    if (gridRef.current && plugins.current) {
      flipState.current = plugins.current.Flip.getState(gridRef.current.querySelectorAll("[data-flip-id]"));
    }
    setFilter(next);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !plugins.current) return;
    flipState.current = null;
    const { gsap, Flip } = plugins.current;
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

  return { filter, select, visible, options, hasFilters, gridRef, isAll: filter === FILTER_ALL };
}
