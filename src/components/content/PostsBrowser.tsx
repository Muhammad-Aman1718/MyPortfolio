"use client";

import { COPY, POSTS_TABS } from "@/constants/constant";
import usePostsBrowser from "@/hooks/usePostsBrowser";
import { fillTemplate } from "@/utils/format";
import { cn, staggerStyle } from "@/utils/style";
import FilterPills from "@/components/ui/FilterPills";
import Icon from "@/components/ui/Icon";
import SearchField from "@/components/ui/SearchField";
import FeaturedPost from "./FeaturedPost";
import PaperList from "./PaperList";
import PostRow from "./PostRow";
import type { PostsBrowserProps } from "@/types/types";

/**
 * Blog / research switcher. Tabs slide an underline; the blog has search,
 * category and topic filters, a sort toggle and "load more"; research is a
 * two-up grid of paper cards. Lists re-stagger in CSS when they change.
 */
export default function PostsBrowser({ posts, papers }: PostsBrowserProps) {
  const {
    tab,
    setTab,
    tabsRef,
    query,
    setSearch,
    setCategory,
    setSubcategory,
    clearTag,
    sortLabel,
    setSortLabel,
    clearFilters,
    filtered,
    categories,
    subcategories,
    featured,
    rows,
    shown,
    total,
    canLoadMore,
    loadMore,
  } = usePostsBrowser(posts);
  const counts = { blog: posts.length, research: papers.length };

  return (
    <>
      <div
        ref={tabsRef}
        role="tablist"
        aria-label={COPY.posts.tabsLabel}
        className="relative mt-10 flex gap-8 border-b border-line [--ind-fallback:transparent]"
      >
        <span data-indicator="" className="indicator top-auto! -bottom-px h-0.5! bg-accent" />
        {POSTS_TABS.map((name) => {
          const on = tab === name;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              id={`tab-${name}`}
              aria-selected={on}
              aria-controls={`panel-${name}`}
              data-active={on}
              onClick={() => setTab(name)}
              className={cn(
                "flex items-center gap-2 pb-3 font-display text-lg capitalize transition-colors duration-200",
                on ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {name}
              <span className="font-mono text-xs text-muted">{counts[name]}</span>
            </button>
          );
        })}
      </div>

      {tab === "blog" ? (
        <div key="blog" id="panel-blog" role="tabpanel" aria-labelledby="tab-blog" className="panel-in">
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchField
              value={query.search}
              onChange={setSearch}
              label={COPY.posts.searchLabel}
              placeholder={COPY.posts.searchPlaceholder}
            />
            <FilterPills
              options={[COPY.posts.sortNewest, COPY.posts.sortOldest]}
              value={sortLabel}
              onChange={setSortLabel}
              label={COPY.posts.sortLabel}
            />
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <FilterPills
              options={categories}
              value={query.category}
              onChange={setCategory}
              label={COPY.posts.filterLabel}
            />
            {subcategories.length > 0 && (
              <FilterPills
                options={subcategories}
                value={query.subcategory}
                onChange={setSubcategory}
                label={COPY.posts.subcategoryLabel}
              />
            )}
          </div>

          <div className="mt-5 flex min-h-8 flex-wrap items-center justify-between gap-3 text-sm text-subtle">
            <p aria-live="polite">
              {fillTemplate(COPY.posts.showing, { shown: String(shown), total: String(total) })}
            </p>
            {query.tag && (
              <button
                type="button"
                onClick={clearTag}
                aria-label={`${COPY.posts.removeTag}: ${query.tag}`}
                className="inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-3 pr-2 text-fg transition-colors duration-150 hover:bg-surface-hi"
              >
                {COPY.posts.taggedWith}: {query.tag}
                <Icon name="close" className="h-3.5 w-3.5 text-subtle" />
              </button>
            )}
          </div>

          <div
            key={`${query.category}|${query.subcategory}|${query.tag}|${query.sort}`}
            className="stagger-in mt-5 flex flex-col gap-3"
          >
            {featured && <FeaturedPost post={featured} />}

            <ul className="mt-3 flex flex-col">
              {rows.map((post, i) => (
                <li key={post.slug} style={staggerStyle(i + 1)}>
                  {/* Visible hairline between posts (the theme 'line' grey is too close to the page) */}
                  {i > 0 && <span aria-hidden="true" className="mx-3 block h-px bg-fg/15 sm:mx-6" />}
                  <PostRow post={post} />
                </li>
              ))}
            </ul>

            {total === 0 && (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="text-muted">{COPY.posts.empty}</p>
                {filtered && (
                  <button type="button" onClick={clearFilters} className="btn-secondary h-10! px-5! text-sm">
                    {COPY.posts.clearFilters}
                  </button>
                )}
              </div>
            )}

            {canLoadMore && (
              <button type="button" onClick={loadMore} className="btn-secondary mx-auto mt-4">
                {COPY.posts.loadMore}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div key="research" id="panel-research" role="tabpanel" aria-labelledby="tab-research">
          <PaperList papers={papers} />
        </div>
      )}
    </>
  );
}
