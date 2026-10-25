import type { MetadataRoute } from "next";
import { PROJECTS, SITEMAP_DETAIL, SITEMAP_PAGES } from "@/constants/constant";
import { getPosts } from "@/lib/content/posts";
import { getPapers } from "@/lib/content/research";
import { absoluteUrl } from "@/utils/content";

/** /sitemap.xml — every public page; articles dated by their last update. Drafts never appear, even in a draft preview. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...SITEMAP_PAGES.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...PROJECTS.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: SITEMAP_DETAIL.changeFrequency,
      priority: SITEMAP_DETAIL.project,
    })),
    ...getPosts()
      .filter((p) => p.status === "published")
      .map((p) => ({
      url: absoluteUrl(`/posts/${p.slug}`),
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: SITEMAP_DETAIL.changeFrequency,
      priority: SITEMAP_DETAIL.article,
    })),
    ...getPapers()
      .filter((r) => r.status === "published")
      .map((r) => ({
      url: absoluteUrl(`/posts/research/${r.slug}`),
      lastModified: new Date(r.publishedAt),
      changeFrequency: SITEMAP_DETAIL.changeFrequency,
      priority: SITEMAP_DETAIL.article,
    })),
  ];
}
