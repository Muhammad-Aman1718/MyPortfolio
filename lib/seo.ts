import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata: title (the root layout's template appends the name),
 * description, canonical URL and matching Open Graph / Twitter fields.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const full = `${title} | ${site.name}`;
  // A page-level openGraph object replaces the layout's, so the shared card is re-attached here
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} — ${site.role}`,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: full,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [image.url],
    },
  };
}
