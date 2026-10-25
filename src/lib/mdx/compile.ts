import "server-only";
import { cache } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeCodeBlocks from "./highlight";

/**
 * Compiles an article's MDX on the server during static generation.
 * GFM adds tables, footnotes and task lists; headings get stable ids
 * (the same slugs the table of contents uses); code is highlighted.
 * MDX executes its source, so only compile files authored in this repo.
 */
export const compileMdx = cache(async (source: string) => {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeCodeBlocks],
  });
  return Content;
});
