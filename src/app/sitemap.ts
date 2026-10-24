import type { MetadataRoute } from "next";
import { BLOG_POSTS, PROJECTS, RESEARCH, SITEMAP_DETAIL, SITEMAP_PAGES } from "@/constants/constant";
import { absoluteUrl } from "@/utils/content";

/** /sitemap.xml — every public page, with articles dated by publish date. */
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
    ...BLOG_POSTS.map((p) => ({
      url: absoluteUrl(`/posts/${p.slug}`),
      lastModified: new Date(p.isoDate),
      changeFrequency: SITEMAP_DETAIL.changeFrequency,
      priority: SITEMAP_DETAIL.article,
    })),
    ...RESEARCH.map((r) => ({
      url: absoluteUrl(`/posts/research/${r.slug}`),
      lastModified: new Date(r.isoDate),
      changeFrequency: SITEMAP_DETAIL.changeFrequency,
      priority: SITEMAP_DETAIL.article,
    })),
  ];
}
