import type { Metadata } from "next";
import ProjectsGrid from "@/components/projects-grid";
import { allProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects — Hafiz" };

export default function Projects() {
  return (
    <div className="container-site page-top pb-16">
      <header className="relative">
        {/* Oversized ghost count sits behind the title */}
        <span
          aria-hidden="true"
          data-enter="fade"
          style={{ "--d": 300 } as React.CSSProperties}
          className="pointer-events-none absolute -top-6 right-0 select-none font-[family-name:var(--font-space)] text-[120px] font-semibold leading-none tracking-tighter text-fg/[0.04] md:-top-10 md:text-[220px]"
        >
          {String(allProjects.length).padStart(2, "0")}
        </span>
        <p data-enter="rise" className="eyebrow">{"// projects"}</p>
        <h1 data-enter="zoom" style={{ "--d": 100 } as React.CSSProperties} className="h-display mt-4 text-[48px] md:text-[80px]">
          The work
        </h1>
        <p data-enter="rise" style={{ "--d": 350 } as React.CSSProperties} className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-muted">
          {allProjects.length} projects, 2019 — 2026
        </p>
      </header>

      <ProjectsGrid />
    </div>
  );
}
