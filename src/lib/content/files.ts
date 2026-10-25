import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { CONTENT_MESSAGES } from "@/constants/constant";
import { fillTemplate } from "@/utils/format";
import type { RawMdxFile, ValidMdxFile } from "@/types/types";

/**
 * Every .mdx file in a folder of /content, split into frontmatter and body.
 * The literal "content" segment keeps the build's file tracing scoped to that
 * folder (a fully dynamic path would pull the whole project into the server output).
 */
export function readMdxDirectory(folder: string): RawMdxFile[] {
  const absolute = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(absolute)) return [];
  return fs
    .readdirSync(absolute)
    .filter((name) => name.endsWith(".mdx"))
    .sort()
    .map((name) => {
      const { data, content } = matter(fs.readFileSync(path.join(absolute, name), "utf8"));
      return { file: `content/${folder}/${name}`, data, body: content };
    });
}

/** The file's name without its extension — the default slug. */
export const fileSlug = (file: string): string => path.basename(file, ".mdx");

/**
 * Validates a file's frontmatter. A file marked `status: "published"` must be
 * valid — anything wrong fails the build, so a broken article never ships.
 * Anything else (an empty new file, a draft still being written) is skipped
 * with a warning in the terminal instead of taking the whole page down.
 */
export function parseFrontmatter<T extends z.ZodType>(schema: T, file: RawMdxFile): z.output<T> | undefined {
  if (!Object.keys(file.data).length && !file.body.trim()) {
    console.warn(fillTemplate(CONTENT_MESSAGES.emptyFile, { file: file.file }));
    return undefined;
  }
  const result = schema.safeParse(file.data);
  if (result.success) return result.data;

  const problems = z.prettifyError(result.error);
  if (file.data.status === "published") {
    throw new Error(fillTemplate(CONTENT_MESSAGES.invalidPublished, { file: file.file, problems }));
  }
  console.warn(fillTemplate(CONTENT_MESSAGES.skippedDraft, { file: file.file, problems }));
  return undefined;
}

/** Slugs must match their file name and be unique, so URLs stay predictable. */
function assertSlugs(files: ValidMdxFile<unknown>[]): void {
  const seen = new Map<string, string>();
  for (const { slug, file } of files) {
    const declared = file.data.slug;
    if (typeof declared === "string" && declared !== slug) {
      throw new Error(fillTemplate(CONTENT_MESSAGES.slugMismatch, { file: file.file, slug: declared, expected: slug }));
    }
    const first = seen.get(slug);
    if (first) throw new Error(fillTemplate(CONTENT_MESSAGES.duplicateSlug, { slug, first, file: file.file }));
    seen.set(slug, file.file);
  }
}

/** Every usable .mdx file in a /content folder: validated frontmatter plus its slug (the file name). */
export function loadMdxFiles<T extends z.ZodType>(folder: string, schema: T): ValidMdxFile<z.output<T>>[] {
  const files = readMdxDirectory(folder).flatMap((file) => {
    const meta = parseFrontmatter(schema, file);
    return meta === undefined ? [] : [{ file, meta, slug: fileSlug(file.file) }];
  });
  assertSlugs(files);
  return files;
}

/** Drafts are hidden unless SHOW_DRAFTS=true (local preview only). */
export const showDrafts = (): boolean => process.env.SHOW_DRAFTS === "true";
