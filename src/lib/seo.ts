import type { Metadata, Viewport } from "next";
import { OG_IMAGE, SITE, SITE_TITLE, THEME } from "@/constants/constant";
import type { ArticleMetaInput, PageMetaInput } from "@/types/types";

/** Site-wide metadata for the root layout (title template, OG, robots). */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE_TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: SITE.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: SITE_TITLE,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const rootViewport: Viewport = {
  themeColor: THEME.background,
  colorScheme: "dark",
};

/**
 * Per-page metadata: title (the root layout's template appends the name),
 * description, canonical URL and matching Open Graph / Twitter fields.
 */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const full = `${title} | ${SITE.name}`;
  // A page-level openGraph object replaces the layout's, so the shared card is re-attached here
  const image = { url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: SITE_TITLE };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: SITE.name, title: full, description, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}

/** Metadata for an article-style page (posts, papers, case studies). */
export function articleMeta({ title, description, path, publishedTime }: ArticleMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: "article", url: path, publishedTime, authors: [SITE.name] },
  };
}
