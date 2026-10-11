"use client";

import { useState } from "react";
import Reveal from "@/components/reveal";

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

export default function Posts() {
  const [tab, setTab] = useState<"blog" | "research">("blog");
  const [filter, setFilter] = useState("All");

  const visible = blogPosts.filter((p) => filter === "All" || p.category === filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <Reveal stagger>
        <p className="eyebrow">{"// writing"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
          Posts &amp; research
        </h1>
        <p className="mt-4 max-w-[60ch] text-muted">
          Notes from production: mobile performance, architecture decisions, and the business of
          building software well.
        </p>
      </Reveal>

      {/* Tabs */}
      <div className="mt-10 flex gap-6 border-b border-line">
        {(["blog", "research"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-3 font-[family-name:var(--font-space)] text-lg capitalize transition-colors duration-200 ${
              tab === t ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "blog" ? (
        <>
          <div className="mt-8 flex flex-wrap gap-2">
            {blogFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 font-[family-name:var(--font-jetbrains)] text-[13px] transition-colors duration-200 ${
                  filter === f
                    ? "bg-primary text-on-primary"
                    : "border border-line text-muted hover:text-fg"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {featured && (
            <article className="card mt-10 cursor-pointer p-8 md:p-10">
              <span className="pill">{featured.category}</span>
              <h2 className="mt-4 font-[family-name:var(--font-space)] text-[24px] font-semibold leading-snug md:text-[32px]">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-[68ch] text-muted">{featured.excerpt}</p>
              <p className="mt-5 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                {featured.date} · {featured.readingTime} read
              </p>
            </article>
          )}

          <div className="mt-4 flex flex-col">
            {rest.map((p) => (
              <article
                key={p.title}
                className="group cursor-pointer border-b border-line py-6 transition-colors duration-150 hover:bg-surface"
              >
                <span className="pill">{p.category}</span>
                <h2 className="mt-3 font-[family-name:var(--font-space)] text-xl font-medium transition-colors duration-150 group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-1 max-w-[68ch] text-sm text-muted">{p.excerpt}</p>
                <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                  {p.date} · {p.readingTime} read
                </p>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 flex flex-col gap-6">
          {research.map((r) => (
            <article key={r.title} className="card border-t-2 !border-t-accent p-8 md:p-10">
              <h2 className="font-[family-name:var(--font-space)] text-xl font-semibold md:text-2xl">
                {r.title}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                {r.authors}
              </p>
              <p className="mt-4 max-w-[75ch] text-sm leading-relaxed text-muted">
                <span className="font-[family-name:var(--font-jetbrains)] text-accent">ABSTRACT — </span>
                {r.abstract}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {r.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
                <span className="ml-auto font-[family-name:var(--font-jetbrains)] text-[13px] text-accent">
                  Read online · PDF (1.2 MB)
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
