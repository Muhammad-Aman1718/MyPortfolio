"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FILTER_ALL } from "@/constants/constant";
import { filterPosts } from "@/utils/content";
import useIndicator from "./useIndicator";
import type { PostsTab } from "@/types/types";

/**
 * Blog / research tab (kept in `?tab=` so it can be linked and restored) and
 * the blog category filter.
 */
export default function usePostsBrowser() {
  const params = useSearchParams();
  const [tab, setTabState] = useState<PostsTab>(params.get("tab") === "research" ? "research" : "blog");
  const [filter, setFilter] = useState(FILTER_ALL);
  const { ref: tabsRef } = useIndicator<HTMLDivElement>(tab);

  const setTab = (next: PostsTab) => {
    setTabState(next);
    window.history.replaceState(null, "", next === "research" ? "?tab=research" : window.location.pathname);
  };

  const visible = filterPosts(filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  return { tab, setTab, filter, setFilter, tabsRef, visible, featured, rest };
}
