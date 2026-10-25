import { z } from "zod";

/**
 * Frontmatter validation. Schemas are strict, so a misspelt key fails the
 * build with the file name instead of being silently ignored.
 */

/** YAML turns unquoted dates into Date objects; both forms end up as YYYY-MM-DD. */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value.trim()))
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use a date like 2026-07-14"));

const text = z.string().trim().min(1);

/** Local file under /public ("/images/…") or an https URL (e.g. a Cloudflare R2 custom domain). */
const imageSource = z
  .string()
  .trim()
  .refine((value) => value.startsWith("/") || value.startsWith("https://"), "use /images/… or an https:// URL");

const httpsUrl = z.url({ protocol: /^https$/ });

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use lowercase words joined by hyphens");

const textList = z.array(text).default([]);

const metric = z.object({
  value: z.number(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label: text,
});

export const postFrontmatterSchema = z
  .object({
    title: text,
    slug: slug.optional(),
    excerpt: text,
    publishedAt: isoDate,
    updatedAt: isoDate.optional(),
    author: text.optional(),
    category: text,
    subcategory: text.optional(),
    tags: textList,
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().optional(),
    coverImage: imageSource.optional(),
    coverImageAlt: text.optional(),
    readingTime: z.number().int().positive().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    seoTitle: text.optional(),
    seoDescription: text.optional(),
    canonicalUrl: httpsUrl.optional(),
    ogImage: imageSource.optional(),
    series: text.optional(),
    seriesOrder: z.number().int().optional(),
    relatedPosts: z.array(slug).default([]),
    allowComments: z.boolean().default(false),
  })
  .strict()
  .refine((post) => !post.coverImage || post.coverImageAlt, {
    message: "coverImageAlt is required when coverImage is set",
    path: ["coverImageAlt"],
  });

export const paperFrontmatterSchema = z
  .object({
    title: text,
    slug: slug.optional(),
    authors: z.union([text.transform((name) => [name]), z.array(text).min(1)]),
    publishedAt: isoDate,
    year: z.union([z.string(), z.number()]).transform(String),
    venue: text,
    abstract: text,
    tags: textList,
    status: z.enum(["draft", "published"]).default("draft"),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/, "use the bare DOI, e.g. 10.1145/1234567").optional(),
    paperUrl: httpsUrl.optional(),
    pdfUrl: httpsUrl.optional(),
    coverImage: imageSource.optional(),
    coverImageAlt: text.optional(),
    findings: z.array(metric).default([]),
    bibtex: text,
    seoTitle: text.optional(),
    seoDescription: text.optional(),
    relatedResearch: z.array(slug).default([]),
  })
  .strict()
  .refine((paper) => !paper.coverImage || paper.coverImageAlt, {
    message: "coverImageAlt is required when coverImage is set",
    path: ["coverImageAlt"],
  });
