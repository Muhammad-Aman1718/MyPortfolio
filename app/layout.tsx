import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SpotlightTracker } from "@/components/pointer-fx";
import ContactDock from "@/components/contact-dock";
import JsonLd from "@/components/json-ld";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#111112",
  colorScheme: "dark",
};

/** Who and what this site is, for search engines (sitewide). */
const identity = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.role,
      worksFor: { "@type": "Organization", name: "SIGMAKODE" },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressCountry: site.location.countryCode,
      },
      knowsAbout: [
        "React Native",
        "Expo",
        "TypeScript",
        "Swift",
        "Kotlin",
        "iOS development",
        "Android development",
        "Mobile app development",
      ],
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${space.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Lets CSS hide scroll-reveal content before first paint only when JS will animate it */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={identity} />
      </head>
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before React hydrates */}
      <body
        id="top"
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <a
          href="#content"
          className="sr-only z-60 rounded-md bg-primary px-4 py-2 text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ContactDock />
        <SpotlightTracker />
      </body>
    </html>
  );
}
