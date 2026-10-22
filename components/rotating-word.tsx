"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Cycles through words in place; screen readers get the full list once. */
export default function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden="true"
          className={`col-start-1 row-start-1 text-primary transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            n === i ? "translate-y-0 opacity-100 blur-0" : n === (i + words.length - 1) % words.length ? "-translate-y-1/2 opacity-0 blur-sm" : "translate-y-1/2 opacity-0 blur-sm"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
