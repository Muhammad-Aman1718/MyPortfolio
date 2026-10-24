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
  const [tab, setTabState] = useState<Tab>(
    params.get("tab") === "research" ? "research" : "blog",
  );
  const setTab = (t: Tab) => {
    setTabState(t);
    window.history.replaceState(
      null,
      "",
      t === "research" ? "?tab=research" : window.location.pathname,
    );
  };
  const [filter, setFilter] = useState("All");
  const { ref: tabsRef } = useIndicator<HTMLDivElement>(tab);

  const visible = blogPosts.filter(
    (p) => filter === "All" || p.category === filter,
  );
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
        <span
          data-indicator=""
          className="indicator top-auto! -bottom-px h-0.5! bg-accent"
        />
        {(["blog", "research"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            data-active={tab === t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 pb-3 font-(family-name:--font-space) text-lg capitalize transition-colors duration-200 ${
              tab === t ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {t}
            <span className="font-(family-name:--font-jetbrains) text-xs text-muted">
              {t === "blog" ? blogPosts.length : research.length}
            </span>
          </button>
        ))}
      </div>

      {tab === "blog" ? (
        <div
          key="blog"
          id="panel-blog"
          role="tabpanel"
          aria-labelledby="tab-blog"
          className="panel-in"
        >
          <div className="mt-6">
            <FilterPills
              options={blogFilters}
              value={filter}
              onChange={setFilter}
              label="Filter posts by category"
            />
          </div>

          {/* Editorial list — a featured spread, then magazine rows with a date column.
              Deliberately unlike the research tab's two-up paper cards. */}
          <div key={filter} className="stagger-in mt-8 flex flex-col gap-3">
            {featured && (
              <Link
                href={`/posts/${featured.slug}`}
                transitionTypes={forward}
                style={idx(0)}
                className="group grid overflow-hidden rounded-3xl bg-surface transition-colors duration-300 hover:bg-surface-hi md:grid-cols-12"
              >
                {/* Cover panel — solid primary, the read time as the big number */}
                <div className="flex flex-col justify-between gap-6 bg-primary p-6 text-on-primary md:col-span-3 md:p-7">
                  <span className="flex items-center justify-between gap-3 text-sm font-medium">
                    <span className="rounded-full bg-black/20 px-3 py-1">
                      Featured
                    </span>
                    {featured.category}
                  </span>
                  <span>
                    <span className="block font-(family-name:--font-space) text-[48px] font-bold leading-none tracking-tight md:text-[56px]">
                      {parseInt(featured.readingTime, 10)}
                      <span className="ml-1 text-xl md:text-2xl">min</span>
                    </span>
                    <span className="mt-2 block text-sm">
                      read · {featured.date}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 md:col-span-9 md:p-8">
                  <h2 className="font-(family-name:--font-space) text-[24px] font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary md:text-[30px]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-background/60 px-5 py-2.5 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                    Read article {ArrowIcon}
                  </span>
                </div>
              </Link>
            )}

            <ul className="mt-3 flex flex-col">
              {rest.map((p, i) => {
                const d = new Date(p.isoDate);
                return (
                  <li key={p.slug} style={idx(i + 1)}>
                    {/* Visible hairline between posts (the theme 'line' grey is too close to the page) */}
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="mx-3 block h-px bg-fg/15 sm:mx-6"
                      />
                    )}
                    <Link
                      href={`/posts/${p.slug}`}
                      transitionTypes={forward}
                      className="group my-1.5 grid grid-cols-[auto_1fr] items-start gap-5 rounded-[20px] px-3 py-5 transition-colors duration-300 hover:bg-surface sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:px-6"
                    >
                      {/* Date column */}
                      <span className="flex w-14 flex-col items-center rounded-[14px] bg-surface py-2.5 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary sm:w-16">
                        <span className="font-(family-name:--font-space) text-2xl font-bold leading-none sm:text-[28px]">
                          {String(d.getUTCDate()).padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[11px] font-medium uppercase tracking-wider">
                          {d.toLocaleString("en", {
                            month: "short",
                            timeZone: "UTC",
                          })}
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                          <span className="font-medium text-primary">
                            {p.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          {p.readingTime} read
                        </span>
                        <span className="mt-2 block font-(family-name:--font-space) text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                          {p.title}
                        </span>
                        <span className="mt-1.5 block leading-relaxed text-muted">
                          {p.excerpt}
                        </span>
                      </span>
                      <span className="hidden h-11 w-11 items-center justify-center self-center rounded-full bg-surface text-muted transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-on-primary sm:flex">
                        <ArrowUpRight />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {!visible.length && (
              <p className="py-10 text-center text-muted">
                Nothing in this category yet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          key="research"
          id="panel-research"
          role="tabpanel"
          aria-labelledby="tab-research"
          className="stagger-in mt-8 grid gap-4 lg:grid-cols-2"
        >
          {/* Paper cards: meta line, title, a clamped abstract, then the findings as big numbers */}
          {research.map((r, i) => (
            <Link
              key={r.slug}
              href={`/posts/research/${r.slug}`}
              transitionTypes={forward}
              style={idx(i)}
              className="group flex flex-col rounded-3xl bg-surface p-7 transition-colors duration-300 hover:bg-surface-hi md:p-9"
            >
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-on-primary">
                  Paper {String(i + 1).padStart(2, "0")}
                </span>
                {r.venue} · {r.year}
              </p>
              <h2 className="mt-5 font-(family-name:--font-space) text-2xl font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary md:text-[28px]">
                {r.title}
              </h2>
              <p className="mt-4 line-clamp-3 leading-relaxed text-muted">
                {r.abstract}
              </p>

              <dl className="mt-7 grid grid-cols-3 gap-2">
                {r.findings.slice(0, 3).map((f) => (
                  <div
                    key={f.label}
                    className="rounded-2xl bg-background/60 p-3.5"
                  >
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="block font-(family-name:--font-space) text-2xl font-bold leading-none">
                        {f.prefix}
                        {f.value}
                        {f.suffix}
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-xs leading-snug text-subtle">
                        {f.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <span className="flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-4 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  Read paper {ArrowIcon}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
