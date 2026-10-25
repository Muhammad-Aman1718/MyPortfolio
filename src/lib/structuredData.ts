/** schema.org JSON-LD builders, rendered through <JsonLd>. */
import { EXPERIENCE, PERSON_ID, SERVICES, SITE } from "@/constants/constant";
import { absoluteUrl } from "@/utils/content";
import type { PaperSummary, PostSummary } from "@/types/types";

/** Who and what this site is (sitewide, in the root layout). */
export const identityGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      url: SITE.url,
      email: `mailto:${SITE.email}`,
      jobTitle: SITE.role,
      worksFor: { "@type": "Organization", name: SITE.employer },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressCountry: SITE.location.countryCode,
      },
      knowsAbout: SITE.knowsAbout,
      sameAs: SITE.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
});

export const experienceProfile = () => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    hasOccupation: EXPERIENCE.map((e) => ({
      "@type": "Occupation",
      name: e.role,
      occupationLocation: { "@type": "City", name: e.location },
      skills: e.tags.join(", "),
    })),
  },
});

export const serviceList = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@type": "Person", "@id": PERSON_ID, name: SITE.name },
      areaServed: "Worldwide",
    },
  })),
});

export const blogPosting = (post: PostSummary) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.seoTitle ?? post.title,
  description: post.seoDescription ?? post.excerpt,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  url: absoluteUrl(`/posts/${post.slug}`),
  mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
  author:
    post.author === SITE.name
      ? { "@type": "Person", "@id": PERSON_ID, name: SITE.name, url: SITE.url }
      : { "@type": "Person", name: post.author },
  publisher: { "@id": PERSON_ID },
  articleSection: post.category,
  keywords: post.tags.join(", "),
  timeRequired: `PT${post.readingMinutes}M`,
  ...(post.coverImage && { image: absoluteUrl(post.coverImage) }),
  ...(post.series && { isPartOf: { "@type": "CreativeWorkSeries", name: post.series } }),
});

export const scholarlyArticle = (paper: PaperSummary) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: paper.seoTitle ?? paper.title,
  abstract: paper.abstract,
  datePublished: paper.publishedAt,
  url: absoluteUrl(`/posts/research/${paper.slug}`),
  author: paper.authors.map((name) => ({ "@type": "Person", name })),
  keywords: paper.tags.join(", "),
  ...(paper.doi && { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi } }),
  ...((paper.paperUrl || paper.pdfUrl) && { sameAs: paper.paperUrl ?? paper.pdfUrl }),
  ...(paper.coverImage && { image: absoluteUrl(paper.coverImage) }),
});
