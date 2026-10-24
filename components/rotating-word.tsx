"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Slot-machine word: words are stacked in a clipped window and roll up one
 * line at a time, while the window's width eases to the next word's width so
 * the rest of the sentence slides along instead of jumping.
 * Screen readers get the full list once.
 */
export default function RotatingWord({
  words,
  interval = 2400,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  // Measure the active word so the window can animate its width
  useLayoutEffect(() => {
    const el = refs.current[i];
    if (el) setWidth(el.offsetWidth);
  }, [i]);

  return (
    <span
      className="relative inline-block h-[1.18em] overflow-hidden align-[-0.24em] transition-[width] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ width }}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span
        aria-hidden="true"
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: `translateY(-${i * 1.18}em)` }}
      >
        {words.map((w, n) => (
          <span
            key={w}
            ref={(el) => {
              refs.current[n] = el;
            }}
            className={`block w-max whitespace-nowrap leading-[1.18em] text-primary transition-opacity duration-500 ${
              n === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
