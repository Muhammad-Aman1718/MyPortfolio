import { FILTER_ALL } from "@/constants/constant";
import type { PostQuery, PostSummary } from "@/types/types";

/** Case- and accent-insensitive form for matching ("Café" matches "cafe"). */
const normalise = (text: string): string =>
  text.toLocaleLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").trim();

/** Every word of the search appears in the title, excerpt, category or tags. */
export function matchesSearch(post: PostSummary, search: string): boolean {
  const terms = normalise(search).split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = normalise([post.title, post.excerpt, post.category, post.subcategory ?? "", ...post.tags].join(" "));
  return terms.every((term) => haystack.includes(term));
}

const byDate = (sort: PostQuery["sort"]) => (a: PostSummary, b: PostSummary) =>
  sort === "newest" ? b.publishedAt.localeCompare(a.publishedAt) : a.publishedAt.localeCompare(b.publishedAt);

/** Posts matching every active filter, in the chosen order. */
export function queryPosts(posts: PostSummary[], query: PostQuery): PostSummary[] {
  return posts
    .filter((post) => query.category === FILTER_ALL || post.category === query.category)
    .filter((post) => query.subcategory === FILTER_ALL || post.subcategory === query.subcategory)
    .filter((post) => !query.tag || post.tags.includes(query.tag))
    .filter((post) => matchesSearch(post, query.search))
    .sort(byDate(query.sort));
}

/** The lead featured post: lowest featuredOrder, then newest. Undefined when none is featured. */
export const pickFeatured = (posts: PostSummary[]): PostSummary | undefined =>
  posts
    .filter((post) => post.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER) ||
        b.publishedAt.localeCompare(a.publishedAt),
    )[0];

/** "All" plus the distinct values, most used first. */
const optionsByCount = (values: string[]): string[] => {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  const sorted = [...counts].sort(([a, x], [b, y]) => y - x || a.localeCompare(b)).map(([value]) => value);
  return [FILTER_ALL, ...sorted];
};

/** Category filter options, derived from the posts themselves. */
export const postCategories = (posts: PostSummary[]): string[] => optionsByCount(posts.map((post) => post.category));

/** Topic options within a category; empty when the category has none (or "All" is selected). */
export function postSubcategories(posts: PostSummary[], category: string): string[] {
  if (category === FILTER_ALL) return [];
  const values = posts.flatMap((post) => (post.category === category && post.subcategory ? [post.subcategory] : []));
  return values.length ? optionsByCount(values) : [];
}

/** True when anything narrows the list. */
export const isFiltered = (query: PostQuery): boolean =>
  Boolean(query.search.trim() || query.tag) || query.category !== FILTER_ALL || query.subcategory !== FILTER_ALL;
