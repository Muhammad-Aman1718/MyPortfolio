import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/** Body text. next/font needs literal options at module scope, so the fonts live here. */
export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

/** Display headings (`font-display`). */
export const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Code and meta text (`font-mono`). */
export const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${space.variable} ${jetbrains.variable}`;
