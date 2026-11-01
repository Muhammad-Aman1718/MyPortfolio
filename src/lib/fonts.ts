import localFont from "next/font/local";

/*
 * Self-hosted (latin, variable) so the build never downloads from Google Fonts —
 * a failed download there breaks the whole build. next/font/local needs literal
 * options at module scope, so the fonts live here.
 */

/** Body text. */
export const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

/** Display headings (`font-display`). */
export const space = localFont({
  src: "../fonts/space-grotesk-latin.woff2",
  variable: "--font-space",
  weight: "500 700",
  display: "swap",
});

/**
 * Code and meta text (`font-mono`). Not preloaded: it's small print and code
 * blocks, so it shouldn't compete with each page's main image and fonts.
 */
export const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains",
  weight: "400 500",
  display: "swap",
  preload: false,
});

export const fontVariables = `${inter.variable} ${space.variable} ${jetbrains.variable}`;
