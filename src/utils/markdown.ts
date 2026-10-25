import GithubSlugger from "github-slugger";
import { MARKDOWN_FENCE_PATTERN, MARKDOWN_HEADING_PATTERN, WORDS_PER_MINUTE } from "@/constants/constant";
import type { TocItem } from "@/types/types";

/** Lines of markdown outside fenced code blocks. */
const proseLines = (markdown: string): string[] => {
  let inFence = false;
  return markdown.split(/\r?\n/).filter((line) => {
    if (MARKDOWN_FENCE_PATTERN.test(line)) {
      inFence = !inFence;
      return false;
    }
    return !inFence;
  });
};

/** Heading text as rendered: inline markup, links and MDX escapes removed. */
const plainText = (heading: string): string =>
  heading
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\\([{}<>])/g, "$1")
    .trim();

/**
 * Table of contents from the `##` headings. Every heading is slugged in order
 * with the same algorithm rehype-slug uses, so the ids (including "-1"
 * suffixes on repeats) match the rendered anchors exactly.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  return proseLines(markdown).flatMap((line) => {
    const match = line.match(MARKDOWN_HEADING_PATTERN);
    if (!match) return [];
    const title = plainText(match[2]);
    const id = slugger.slug(title);
    return match[1].length === 2 ? [{ id, title }] : [];
  });
}

/** Whole minutes to read the prose (code blocks excluded), at least one. */
export function readingMinutes(markdown: string): number {
  const words = proseLines(markdown)
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
