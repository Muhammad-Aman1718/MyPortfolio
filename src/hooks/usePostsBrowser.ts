"use client";

import { useState } from "react";
import { COPY, DEFAULT_POST_QUERY, FILTER_ALL, UI } from "@/constants/constant";
import { isFiltered, pickFeatured, postCategories, postSubcategories, queryPosts } from "@/utils/posts";
import useIndicator from "./useIndicator";
import useLocationSearch from "./useLocationSearch";
import type { PaperSummary, PostQuery, PostSort, PostSummary, PostsTab } from "@/types/types";

/**
 * Blog / research browser state. The tab and tag live in the URL
 * (`?tab=research`, `?tag=React%20Native`) so they can be linked — article
 * tags link here. Search, category, topic and sort narrow the blog list,
 * which shows a page at a time.
 */
export default function usePostsBrowser(allPosts: PostSummary[], allPapers: PaperSummary[]) {
  // The URL sets the starting view; once the visitor picks something, their choice wins (null = not chosen yet)
  const params = new URLSearchParams(useLocationSearch());
  // Drafts only exist in the data during local dev; they stay hidden until toggled on
  const [draftsChoice, setDrafts] = useState<boolean | null>(null);
  const drafts = draftsChoice ?? params.get("drafts") === "1";
  const isPublished = (item: { status: string }) => item.status === "published";
  const draftCount = [...allPosts, ...allPapers].filter((item) => !isPublished(item)).length;
  const posts = drafts ? allPosts : allPosts.filter(isPublished);
  const papers = drafts ? allPapers : allPapers.filter(isPublished);
  const [tabChoice, setTabState] = useState<PostsTab | null>(null);
  const tab = tabChoice ?? (params.get("tab") === "research" ? "research" : "blog");
  const [queryChoice, setQuery] = useState<PostQuery | null>(null);
  const query = queryChoice ?? { ...DEFAULT_POST_QUERY, tag: params.get("tag") ?? "" };
  const [limit, setLimit] = useState<number>(UI.postsPageSize);
  const { ref: tabsRef } = useIndicator<HTMLDivElement>(tab);

  const syncUrl = (nextTab: PostsTab, tag: string, withDrafts = drafts) => {
    const search = new URLSearchParams();
    if (nextTab === "research") search.set("tab", "research");
    if (tag) search.set("tag", tag);
    if (withDrafts) search.set("drafts", "1");
    const qs = search.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  /** Any filter change starts the list from the first page again. */
  const update = (patch: Partial<PostQuery>) => {
    const next = { ...query, ...patch };
    setQuery(next);
    setLimit(UI.postsPageSize);
    if ("tag" in patch) syncUrl(tab, next.tag);
  };

  const results = queryPosts(posts, query);
  // The featured spread belongs to the default view; searches and "oldest first" get a plain list
  const featured = !query.search.trim() && query.sort === "newest" ? pickFeatured(results) : undefined;
  const rest = results.filter((post) => post !== featured);

  return {
    tab,
    setTab: (next: PostsTab) => {
      setTabState(next);
      syncUrl(next, query.tag);
    },
    tabsRef,
    query,
    setSearch: (search: string) => update({ search }),
    setCategory: (category: string) => update({ category, subcategory: FILTER_ALL }),
    setSubcategory: (subcategory: string) => update({ subcategory }),
    clearTag: () => update({ tag: "" }),
    sortLabel: query.sort === "newest" ? COPY.posts.sortNewest : COPY.posts.sortOldest,
    setSortLabel: (label: string) => update({ sort: (label === COPY.posts.sortOldest ? "oldest" : "newest") as PostSort }),
    clearFilters: () => update({ ...DEFAULT_POST_QUERY, sort: query.sort, tag: "" }),
    filtered: isFiltered(query),
    categories: postCategories(posts),
    subcategories: postSubcategories(posts, query.category),
    featured,
    rows: rest.slice(0, limit),
    shown: Math.min(results.length, limit + (featured ? 1 : 0)),
    total: results.length,
    canLoadMore: rest.length > limit,
    loadMore: () => setLimit((current) => current + UI.postsPageSize),
    posts,
    papers,
    drafts,
    draftCount,
    toggleDrafts: () => {
      setDrafts(!drafts);
      setLimit(UI.postsPageSize);
      syncUrl(tab, query.tag, !drafts);
    },
  };
}
