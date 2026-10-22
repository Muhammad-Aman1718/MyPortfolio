"use client";

import { useLayoutEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Reveal from "./reveal";
import FilterPills from "./filter-pills";
import ProjectPreview from "./project-preview";
import { ArrowUpRight } from "./icons";
import { forward } from "./route-transition";
import { allProjects } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(Flip);

const filters = ["All", "Mobile", "Web", "Backend", "Client work"];

/**
 * Filterable gallery — big product previews with the details underneath. On
 * filter change, surviving cards glide to their new slots (FLIP) and new ones
 * fade up. Each preview is a shared element that morphs into the case-study hero.
 */
export default function ProjectsGrid() {
  const [filter, setFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const visible = allProjects.filter((p) => filter === "All" || p.type === filter);
  const count = (f: string) => (f === "All" ? allProjects.length : allProjects.filter((p) => p.type === f).length);

  const select = (f: string) => {
    if (f === filter) return;
    if (gridRef.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip-id]"));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    const tl = Flip.from(state, {
      duration: 0.65,
      ease: "power3.inOut",
      nested: true,
      prune: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, y: 24, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, delay: 0.2, stagger: 0.06, ease: "power3.out" }),
    });
    return () => {
      tl.kill();
    };
  }, [filter]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills
          options={filters.filter((f) => count(f) > 0)}
          value={filter}
          onChange={select}
          label="Filter projects by type"
        />
        <p className="text-sm text-subtle" aria-live="polite">
          Showing <span className="font-medium text-fg">{visible.length}</span> of {allProjects.length}
        </p>
      </div>

      <div ref={gridRef}>
        <Reveal variant="fade-up" stagger each={0.08} start="top 92%" className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {visible.map((p) => {
            const wide = p.flagship && filter === "All";
            const n = allProjects.indexOf(p) + 1;
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                transitionTypes={forward}
                data-flip-id={p.slug}
                className={`group flex flex-col gap-5 ${wide ? "md:col-span-2" : ""}`}
              >
                <div className="relative">
                  <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                    <div
                      className={`relative overflow-hidden rounded-[24px] bg-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 ${
                        wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"
                      }`}
                    >
                      <ProjectPreview name={p.name} type={p.type} className="absolute inset-0" />
                    </div>
                  </ViewTransition>
                  <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                      {p.flagship ? "Featured · " : ""}
                      {p.type}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>

                <div className={`flex gap-4 px-1 ${wide ? "md:items-end md:justify-between" : "flex-col"}`}>
                  <div className="flex gap-4">
                    <span className="pt-1 text-sm font-medium text-subtle">{String(n).padStart(2, "0")}</span>
                    <div>
                      <h2
                        className={`font-[family-name:var(--font-space)] font-bold tracking-tight transition-colors duration-200 group-hover:text-primary ${
                          wide ? "text-2xl md:text-[34px]" : "text-2xl"
                        }`}
                      >
                        {p.name}
                      </h2>
                      <p className="mt-1.5 max-w-[52ch] leading-relaxed text-muted">{p.tagline}</p>
                    </div>
                  </div>
                  <p className={`text-sm text-subtle ${wide ? "pl-9 md:shrink-0 md:pl-0 md:text-right" : "pl-9"}`}>
                    {p.role} · {p.year}
                    <span className="block text-subtle/90">{p.tags.join(" · ")}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </>
  );
}
