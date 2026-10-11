"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FilterPills from "./filter-pills";
import { ArrowIcon, ArrowUpRight } from "./icons";
import { forward } from "./route-transition";
import { useIndicator } from "@/lib/use-indicator";
import { blogPosts } from "@/lib/content/posts";
import { research } from "@/lib/content/research";

const blogFilters = ["All", "Technical", "Tutorials", "Case Study", "Notes"];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

type Tab = "blog" | "research";

/**
 * Blog / research switcher. Tabs slide an underline; panels and filtered lists
 * re-stagger in CSS. The tab lives in `?tab=` so it can be linked and restored.
 */
export default function PostsBrowser() {
  const params = useSearchParams();
  const [tab, setTabState] = useState<Tab>(params.get("tab") === "research" ? "research" : "blog");
  const setTab = (t: Tab) => {
    setTabState(t);
    window.history.replaceState(null, "", t === "research" ? "?tab=research" : window.location.pathname);
  };
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
              <Link
                href={`/posts/${featured.slug}`}
                transitionTypes={forward}
                style={idx(0)}
                className="card card-hover ring-gradient group relative overflow-hidden p-7 md:col-span-2 md:p-10"
              >
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
              </Link>
            )}

            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                transitionTypes={forward}
                style={idx(i + 1)}
                className="card card-hover spotlight group flex flex-col p-6"
              >
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
              </Link>
            ))}

            {!visible.length && (
              <p className="py-10 text-center text-muted md:col-span-2">Nothing in this category yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div key="research" id="panel-research" role="tabpanel" aria-labelledby="tab-research" className="stagger-in mt-8 flex flex-col gap-4">
          {research.map((r, i) => (
            <Link
              key={r.slug}
              href={`/posts/research/${r.slug}`}
              transitionTypes={forward}
              style={idx(i)}
              className="card card-hover group grid gap-6 overflow-hidden p-7 md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-4 md:border-r md:border-line md:pr-8">
                <p className="font-[family-name:var(--font-jetbrains)] text-xs text-accent">paper {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-[family-name:var(--font-space)] text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                  {r.authors} · {r.year}
                </p>
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
                  <span className="arrow-link text-sm sm:ml-auto">Read paper {ArrowIcon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
