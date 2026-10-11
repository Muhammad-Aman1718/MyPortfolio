"use client";

import { useState } from "react";
import Reveal from "@/components/reveal";

const allProjects = [
  { name: "Quran Companion", type: "Mobile", year: "2025", role: "Solo build", tagline: "Offline-first Quran app with 100k+ daily readers.", tags: ["React Native", "SQLite", "Reanimated"], tone: "from-lime-400/20", flagship: true },
  { name: "FleetPulse Dashboard", type: "Web", year: "2025", role: "Lead engineer", tagline: "Real-time logistics tracking that cut dispatch errors by 60%.", tags: ["Next.js", "WebSockets", "Redis"], tone: "from-emerald-400/20" },
  { name: "Ledgerly", type: "Web", year: "2024", role: "Full-stack", tagline: "Accounting automation for freelancers.", tags: ["Next.js", "tRPC", "Stripe"], tone: "from-teal-400/20" },
  { name: "BankLite", type: "Mobile", year: "2023", role: "Team lead", tagline: "Fintech app serving 250k customers at 0.3% crash rate.", tags: ["React Native", "Kotlin", "GraphQL"], tone: "from-cyan-400/20" },
  { name: "OrderFlow API", type: "Backend", year: "2023", role: "Architect", tagline: "Order-processing backbone handling 2M requests a day.", tags: ["NestJS", "PostgreSQL", "Docker"], tone: "from-green-400/20" },
  { name: "StudioSite CMS", type: "Client work", year: "2022", role: "Full-stack", tagline: "Custom CMS powering 12 agency client sites.", tags: ["React", "Node.js", "PostgreSQL"], tone: "from-lime-400/15" },
];

const filters = ["All", "Mobile", "Web", "Backend", "Client work"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = allProjects.filter((p) => filter === "All" || p.type === filter);

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <Reveal stagger>
        <p className="eyebrow">{"// projects"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
          The work
        </h1>
        <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-muted">
          {allProjects.length} projects, 2019 — 2026
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 font-[family-name:var(--font-jetbrains)] text-[13px] transition-colors duration-200 ${
              filter === f
                ? "bg-primary text-on-primary"
                : "border border-line text-muted hover:text-fg"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {visible.map((p) => (
          <article
            key={p.name}
            className={`card group cursor-pointer overflow-hidden ${
              p.flagship && filter === "All" ? "md:col-span-2" : ""
            }`}
          >
            <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.tone} to-transparent`}>
              <div className="absolute inset-5 flex items-center justify-center rounded-[12px] border border-line bg-background/60 transition-transform duration-[400ms] group-hover:scale-[1.03]">
                <span className="px-4 text-center font-[family-name:var(--font-space)] text-2xl font-semibold text-muted/60">
                  {p.name}
                </span>
              </div>
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-space)] text-xl font-semibold">{p.name}</h2>
              <p className="mt-2 text-muted">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
              <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                {p.year} · {p.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
