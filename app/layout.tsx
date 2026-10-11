import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SpotlightTracker } from "@/components/pointer-fx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hafiz — Software Engineer, Mobile & Web",
  description:
    "Senior software engineer building products people rely on. Mobile & web. Not the cheapest — the one you call when it has to work.",
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
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top" className="min-h-full flex flex-col">
        <a
          href="#content"
          className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="content" className="flex-1">{children}</main>
        <Footer />
        <SpotlightTracker />
      </body>
    </html>
  );
}
