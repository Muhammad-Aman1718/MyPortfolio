"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/utils/motion";

/** Cycles through `count` words and measures the active one's width. */
export default function useRotatingWord(count: number, interval: number) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = setInterval(() => setIndex((n) => (n + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  // Measure the active word so the window can animate its width
  useLayoutEffect(() => {
    const el = refs.current[index];
    if (el) setWidth(el.offsetWidth);
  }, [index]);

  const setWordRef = (n: number) => (el: HTMLSpanElement | null) => {
    refs.current[n] = el;
  };

  return { index, width, setWordRef };
}
