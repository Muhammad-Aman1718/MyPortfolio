/**
 * Who the site belongs to and where to reach them — the single source for
 * names, URLs and contact details (metadata, JSON-LD, footer, contact page).
 */
export const site = {
  name: "Muhammad Aman",
  shortName: "Aman",
  url: "https://muhammad-aman.com",
  email: "contact@muhammad-aman.com",
  role: "Full-Stack & Mobile App Developer",
  location: { city: "Faisalabad", country: "Pakistan", countryCode: "PK", timezone: "UTC+5" },
  whatsapp: {
    display: "+92 328 1199135",
    href: "https://wa.me/923281199135?text=Hello%20Muhammad%20Aman%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  },
  description:
    "Muhammad Aman is a full-stack and React Native developer in Faisalabad, Pakistan, building scalable web applications and cross-platform mobile apps with Next.js, React Native and TypeScript.",
  keywords: [
    "Muhammad Aman",
    "full-stack developer",
    "React Native developer",
    "mobile app developer",
    "Next.js developer",
    "TypeScript",
    "web developer Pakistan",
    "Faisalabad",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-aman1718/" },
    { label: "GitHub", href: "https://github.com/Muhammad-Aman1718" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
} as const;

/** Absolute URL for a site path — canonical links, sitemap, structured data. */
export const absolute = (path = "/") => new URL(path, site.url).toString();
