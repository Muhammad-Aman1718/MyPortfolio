"use client";

import { useEffect, useState } from "react";
import useIndicator from "./useIndicator";
import type { TocItem } from "@/types/types";

/** Tracks which section is being read and slides the indicator bar to it. */
export default function useToc(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id);
  const { ref } = useIndicator<HTMLDivElement>(active);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return { active, ref };
}
