"use client";

import { BLOG_FILTERS, COPY, POSTS_TABS, RESEARCH } from "@/constants/constant";
import usePostsBrowser from "@/hooks/usePostsBrowser";
import { postsTabCount } from "@/utils/content";
import { cn, staggerStyle } from "@/utils/style";
import FilterPills from "@/components/ui/FilterPills";
import FeaturedPost from "./FeaturedPost";
import PaperCard from "./PaperCard";
import PostRow from "./PostRow";

/**
 * Blog / research switcher. Tabs slide an underline; panels and filtered lists
 * re-stagger in CSS. The blog is an editorial list, deliberately unlike the
 * research tab's two-up paper cards.
 */
export default function PostsBrowser() {
  const { tab, setTab, filter, setFilter, tabsRef, visible, featured, rest } = usePostsBrowser();

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
              <span className="font-mono text-xs text-muted">{postsTabCount(name)}</span>
            </button>
          );
        })}
      </div>

      {tab === "blog" ? (
        <div key="blog" id="panel-blog" role="tabpanel" aria-labelledby="tab-blog" className="panel-in">
          <div className="mt-6">
            <FilterPills options={BLOG_FILTERS} value={filter} onChange={setFilter} label={COPY.posts.filterLabel} />
          </div>

          <div key={filter} className="stagger-in mt-8 flex flex-col gap-3">
            {featured && <FeaturedPost post={featured} />}

            <ul className="mt-3 flex flex-col">
              {rest.map((post, i) => (
                <li key={post.slug} style={staggerStyle(i + 1)}>
                  {/* Visible hairline between posts (the theme 'line' grey is too close to the page) */}
                  {i > 0 && <span aria-hidden="true" className="mx-3 block h-px bg-fg/15 sm:mx-6" />}
                  <PostRow post={post} />
                </li>
              ))}
            </ul>

            {!visible.length && <p className="py-10 text-center text-muted">{COPY.posts.empty}</p>}
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
          {RESEARCH.map((paper, i) => (
            <PaperCard key={paper.slug} paper={paper} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
