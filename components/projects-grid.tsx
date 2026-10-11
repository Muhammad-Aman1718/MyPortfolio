"use client";

import { useLayoutEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Reveal from "./reveal";
import FilterPills from "./filter-pills";
import ProjectPreview from "./project-preview";
import { ArrowIcon, ArrowUpRight } from "./icons";
import { forward } from "./route-transition";
import { allProjects } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(Flip);

const filters = ["All", "Mobile", "Web", "Backend", "Client work"];

/**
 * Filterable grid — on filter change, surviving cards glide to their new slots
 * (FLIP) and new ones fade up. Each card opens its case study; its preview is
 * a shared element that morphs into the case-study hero.
 */
export default function ProjectsGrid() {
  const [filter, setFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const visible = allProjects.filter((p) => filter === "All" || p.type === filter);

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
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <FilterPills options={filters} value={filter} onChange={select} label="Filter projects by type" />
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted" aria-live="polite">
          showing {visible.length} / {allProjects.length}
        </p>
      </div>

      <div ref={gridRef}>
        <Reveal variant="clip-up" stagger each={0.08} start="top 92%" className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((p) => {
            const wide = p.flagship && filter === "All";
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                transitionTypes={forward}
                data-flip-id={p.slug}
                className={`card card-hover group overflow-hidden ${wide ? "md:col-span-2 md:grid md:grid-cols-12" : ""}`}
              >
                <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                  <div className={`relative overflow-hidden border-b border-line ${wide ? "aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[340px] md:border-b-0 md:border-r" : "aspect-[16/9]"}`}>
                    <ProjectPreview name={p.name} type={p.type} tone={p.tone} className="absolute inset-0" />
                  </div>
                </ViewTransition>
                {p.flagship && <span className="pill absolute left-4 top-4">flagship</span>}
                <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-line bg-surface/80 text-accent opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <ArrowUpRight />
                </span>
                <div className={`flex flex-col p-6 ${wide ? "justify-center md:col-span-5 md:p-10" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="pill-ghost">{p.type}</span>
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                      {p.year} · {p.role}
                    </span>
                  </div>
                  <h2 className={`mt-4 font-[family-name:var(--font-space)] font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent ${wide ? "text-2xl md:text-3xl" : "text-xl"}`}>
                    {p.name}
                  </h2>
                  <p className="mt-2 text-muted">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                  <span className="arrow-link mt-5 text-sm">Read case study {ArrowIcon}</span>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </>
  );
}
