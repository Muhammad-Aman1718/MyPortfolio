import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/posts";
import { research } from "@/lib/content/research";
import { projects } from "@/lib/content/projects";
import { absolute } from "@/lib/site";

/** /sitemap.xml — every public page, with articles dated by publish date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "monthly"],
    ["/about", 0.8, "monthly"],
    ["/experience", 0.8, "monthly"],
    ["/skills", 0.7, "monthly"],
    ["/projects", 0.9, "monthly"],
    ["/services", 0.8, "monthly"],
    ["/posts", 0.8, "weekly"],
    ["/contact", 0.7, "yearly"],
    ["/privacy-policy", 0.2, "yearly"],
    ["/terms-of-service", 0.2, "yearly"],
    ["/refund-policy", 0.2, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: absolute(path), lastModified: now, changeFrequency, priority })),
    ...projects.map((p) => ({ url: absolute(`/projects/${p.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...blogPosts.map((p) => ({ url: absolute(`/posts/${p.slug}`), lastModified: new Date(p.isoDate), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...research.map((r) => ({ url: absolute(`/posts/research/${r.slug}`), lastModified: new Date(r.isoDate), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
