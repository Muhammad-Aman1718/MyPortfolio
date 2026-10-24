"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` px. Pass a function to
 * compute the threshold from the viewport (it's re-read on every scroll).
 */
export default function useScrolledPast(threshold: number | (() => number)): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const limit = () => (typeof threshold === "function" ? threshold() : threshold);
    const onScroll = () => setPast(window.scrollY > limit());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
