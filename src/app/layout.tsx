import "./globals.css";
import { COPY, JS_FLAG_SCRIPT } from "@/constants/constant";
import { fontVariables } from "@/lib/fonts";
import { rootMetadata, rootViewport } from "@/lib/seo";
import { identityGraph } from "@/lib/structuredData";
import ContactDock from "@/components/layout/ContactDock";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import JsonLd from "@/components/ui/JsonLd";
import SpotlightTracker from "@/components/ui/SpotlightTracker";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />
        <JsonLd data={identityGraph()} />
      </head>
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before React hydrates */}
      <body id="top" className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#content"
          className="sr-only z-60 rounded-md bg-primary px-4 py-2 text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {COPY.layout.skipToContent}
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
