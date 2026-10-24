/** schema.org JSON-LD builders, rendered through <JsonLd>. */
import { EXPERIENCE, PERSON_ID, SERVICES, SITE } from "@/constants/constant";
import type { Paper, Post } from "@/types/types";

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

export const blogPosting = (post: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.isoDate,
  author: { "@type": "Person", name: SITE.name, url: SITE.url },
});

export const scholarlyArticle = (paper: Paper) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: paper.title,
  abstract: paper.abstract,
  datePublished: paper.isoDate,
  author: { "@type": "Person", name: paper.authors },
  keywords: paper.tags.join(", "),
});
