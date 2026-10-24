"use client";

import { useEffect } from "react";
import { canHover } from "@/utils/motion";

/**
 * One delegated listener drives every `.spotlight` element's cursor glow —
 * cheaper than a handler per card and no React state involved.
 */
export default function useSpotlightTracker(): void {
  useEffect(() => {
    if (!canHover()) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}
