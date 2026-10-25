import "server-only";
import { cache } from "react";
import { CONTENT_DIRS, SITE } from "@/constants/constant";
import { extractToc, readingMinutes } from "@/utils/markdown";
import { loadMdxFiles, showDrafts } from "./files";
import { postFrontmatterSchema } from "./schemas";
import type { PostDocument, PostSummary, SeriesInfo } from "@/types/types";

/** Every post on disk, validated and newest first. Read once per build/request. */
const loadPosts = cache((): PostDocument[] => {
  const posts = loadMdxFiles(CONTENT_DIRS.posts, postFrontmatterSchema).map(({ file, meta, slug }): PostDocument => {
    const { author, readingTime, ...rest } = meta;
    return {
      ...rest,
      slug,
      author: author ?? SITE.name,
      readingTime,
      readingMinutes: readingTime ?? readingMinutes(file.body),
      body: file.body,
      toc: extractToc(file.body),
    };
  });
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

const isPublic = (post: PostDocument): boolean => post.status === "published" || showDrafts();

const toSummary = ({ body, toc, ...summary }: PostDocument): PostSummary => summary;

/** Public posts for listings and static params (no MDX bodies). */
export const getPosts = (): PostSummary[] => loadPosts().filter(isPublic).map(toSummary);

/** One public post with its body, or undefined (→ 404). */
export const getPost = (slug: string): PostDocument | undefined =>
  loadPosts().find((post) => post.slug === slug && isPublic(post));

/**
 * Related posts: hand-picked `relatedPosts` first, then the closest matches by
 * shared tags, subcategory and category (newer wins ties).
 */
export function getRelatedPosts(post: PostSummary, count: number): PostSummary[] {
  const others = getPosts().filter((other) => other.slug !== post.slug);
  const picked = post.relatedPosts.flatMap((slug) => others.filter((other) => other.slug === slug));
  const score = (other: PostSummary) =>
    other.tags.filter((tag) => post.tags.includes(tag)).length * 2 +
    Number(Boolean(post.subcategory) && other.subcategory === post.subcategory) +
    Number(other.category === post.category);
  const rest = others
    .filter((other) => !picked.includes(other))
    .map((other) => ({ other, score: score(other) }))
    .sort((a, b) => b.score - a.score)
    .map(({ other }) => other);
  return [...picked, ...rest].slice(0, count);
}

/** The post's series in reading order, or undefined when it isn't part of one. */
export function getSeries(post: PostSummary): SeriesInfo | undefined {
  if (!post.series) return undefined;
  const posts = getPosts()
    .filter((other) => other.series === post.series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0) || a.publishedAt.localeCompare(b.publishedAt));
  if (posts.length < 2) return undefined;
  return { name: post.series, posts, index: posts.findIndex((other) => other.slug === post.slug) };
}
