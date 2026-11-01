"use client";

import { useState } from "react";

/**
 * How many slides a carousel needs loaded: every slide reached so far plus the
 * next one. It only grows, so going back never unloads an image, while slides
 * nobody has reached yet aren't downloaded during page load.
 */
export default function useLoadedSlides(index: number, count: number): number {
  const [loaded, setLoaded] = useState(Math.min(2, count));
  const needed = Math.min(index + 2, count);
  // Adjusting state while rendering (React's pattern for state derived from props)
  if (needed > loaded) setLoaded(needed);
  return Math.max(loaded, needed);
}
