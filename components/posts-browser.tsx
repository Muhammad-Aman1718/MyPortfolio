"use client";

import { useState } from "react";
import FilterPills from "./filter-pills";
import { ArrowUpRight } from "./icons";
import { useIndicator } from "@/lib/use-indicator";

const blogPosts = [
  { category: "Technical", title: "Profiling React Native cold starts: a field guide", excerpt: "Where those two seconds actually go, and how to claw them back.", date: "Jul 2026", readingTime: "9 min", featured: true },
  { category: "Case Study", title: "Shipping a Quran app to 100k daily readers", excerpt: "Offline-first architecture decisions that made it possible.", date: "Jun 2026", readingTime: "12 min" },
  { category: "Notes", title: "Why I stopped estimating in hours", excerpt: "Scope-based pricing changed my client relationships entirely.", date: "May 2026", readingTime: "5 min" },
  { category: "Tutorials", title: "GSAP ScrollTrigger in Next.js App Router, properly", excerpt: "Cleanup, hydration, and reduced-motion — the parts tutorials skip.", date: "Apr 2026", readingTime: "11 min" },
  { category: "Technical", title: "SQLite in production mobile apps", excerpt: "Migrations, sync, and the WAL settings nobody documents.", date: "Mar 2026", readingTime: "8 min" },
];

const research = [
  { title: "Offline-first data synchronization patterns in low-connectivity regions", authors: "H. Ahmed · 2026", abstract: "A comparative study of CRDT and operational-transform approaches for mobile applications operating under intermittent connectivity, with benchmarks from a production deployment serving 100k daily active users across South Asia.", tags: ["distributed systems", "mobile", "CRDTs"] },
  { title: "Perceived performance budgets for mobile onboarding flows", authors: "H. Ahmed · 2025", abstract: "User-study data on abandonment thresholds during first-launch experiences, proposing a 1.8-second perceived-readiness budget derived from 4,000 session recordings.", tags: ["UX research", "performance"] },
];

const blogFilters = ["All", "Technical", "Tutorials", "Case Study", "Notes"];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Blog / research switcher. Tabs slide an underline; panels and filtered lists re-stagger in CSS. */
export default function PostsBrowser() {
  const [tab, setTab] = useState<"blog" | "research">("blog");
  const [filter, setFilter] = useState("All");
  const { ref: tabsRef } = useIndicator<HTMLDivElement>(tab);

  const visible = blogPosts.filter((p) => filter === "All" || p.category === filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  return (
    <>
      {/* Tabs */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Content type"
        className="relative mt-10 flex gap-8 border-b border-line [--ind-fallback:transparent]"
      >
        <span data-indicator="" className="indicator !top-auto bottom-[-1px] !h-0.5 bg-accent" />
        {(["blog", "research"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            data-active={tab === t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 pb-3 font-[family-name:var(--font-space)] text-lg capitalize transition-colors duration-200 ${
              tab === t ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {t}
            <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              {t === "blog" ? blogPosts.length : research.length}
            </span>
          </button>
        ))}
      </div>

      {tab === "blog" ? (
        <div key="blog" id="panel-blog" role="tabpanel" aria-labelledby="tab-blog" className="panel-in">
          <div className="mt-6">
            <FilterPills options={blogFilters} value={filter} onChange={setFilter} label="Filter posts by category" />
          </div>

          <div key={filter} className="stagger-in mt-8 grid gap-4 md:grid-cols-2">
            {featured && (
              <article style={idx(0)} className="card card-hover ring-gradient group relative cursor-pointer overflow-hidden p-7 md:col-span-2 md:p-10">
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[80px]" aria-hidden="true" />
                <div className="relative grid gap-6 md:grid-cols-12 md:items-end">
                  <div className="md:col-span-9">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="pill">{featured.category}</span>
                      <span className="font-[family-name:var(--font-jetbrains)] text-xs text-accent">featured</span>
                    </div>
                    <h2 className="mt-5 font-[family-name:var(--font-space)] text-[26px] font-semibold leading-tight tracking-tight md:text-[36px]">
                      {featured.title}
                    </h2>
                    <p className="mt-3 max-w-[60ch] text-muted">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-end">
                    <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                      {featured.date} · {featured.readingTime} read
                    </p>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>
              </article>
            )}

            {rest.map((p, i) => (
              <article key={p.title} style={idx(i + 1)} className="card card-hover spotlight group flex cursor-pointer flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="pill">{p.category}</span>
                  <span className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    <ArrowUpRight />
                  </span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-space)] text-xl font-medium leading-snug transition-colors duration-200 group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                <p className="mt-auto pt-5 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                  {p.date} · {p.readingTime} read
                </p>
              </article>
            ))}

            {!visible.length && (
              <p className="py-10 text-center text-muted md:col-span-2">Nothing in this category yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div key="research" id="panel-research" role="tabpanel" aria-labelledby="tab-research" className="stagger-in mt-8 flex flex-col gap-4">
          {research.map((r, i) => (
            <article key={r.title} style={idx(i)} className="card grid gap-6 overflow-hidden p-7 md:grid-cols-12 md:p-10">
              <div className="md:col-span-4 md:border-r md:border-line md:pr-8">
                <p className="font-[family-name:var(--font-jetbrains)] text-xs text-accent">paper {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-[family-name:var(--font-space)] text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{r.authors}</p>
              </div>
              <div className="flex flex-col md:col-span-8">
                <p className="max-w-[75ch] text-sm leading-relaxed text-muted">
                  <span className="font-[family-name:var(--font-jetbrains)] text-accent">ABSTRACT — </span>
                  {r.abstract}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  {r.tags.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                  <span className="font-[family-name:var(--font-jetbrains)] text-[13px] text-accent sm:ml-auto">
                    Read online · PDF (1.2 MB)
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
