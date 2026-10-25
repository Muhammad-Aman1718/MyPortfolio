import "server-only";
import { cache } from "react";
import { CONTENT_DIRS } from "@/constants/constant";
import { extractToc } from "@/utils/markdown";
import { loadMdxFiles, showDrafts } from "./files";
import { paperFrontmatterSchema } from "./schemas";
import type { PaperDocument, PaperSummary } from "@/types/types";

/** Every paper on disk, validated, newest first and numbered in that order. */
const loadPapers = cache((): PaperDocument[] => {
  const papers = loadMdxFiles(CONTENT_DIRS.research, paperFrontmatterSchema).map(({ file, meta, slug }) => ({
    ...meta,
    slug,
    body: file.body,
    toc: extractToc(file.body),
  }));
  return papers
    .filter((paper) => paper.status === "published" || showDrafts())
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((paper, i) => ({ ...paper, number: i + 1 }));
});

const toSummary = ({ body, toc, ...summary }: PaperDocument): PaperSummary => summary;

/** Public papers for listings and static params (no MDX bodies). */
export const getPapers = (): PaperSummary[] => loadPapers().map(toSummary);

/** One public paper with its body, or undefined (→ 404). */
export const getPaper = (slug: string): PaperDocument | undefined => loadPapers().find((paper) => paper.slug === slug);

/** Hand-picked `relatedResearch` first, then other papers sharing the most tags. */
export function getRelatedPapers(paper: PaperSummary, count: number): PaperSummary[] {
  const others = getPapers().filter((other) => other.slug !== paper.slug);
  const picked = paper.relatedResearch.flatMap((slug) => others.filter((other) => other.slug === slug));
  const shared = (other: PaperSummary) => other.tags.filter((tag) => paper.tags.includes(tag)).length;
  const rest = others.filter((other) => !picked.includes(other)).sort((a, b) => shared(b) - shared(a));
  return [...picked, ...rest].slice(0, count);
}
