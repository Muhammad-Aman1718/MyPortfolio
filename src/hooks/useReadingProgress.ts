"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Scrubs a bar's scaleX from 0 → 1 as `target` scrolls through the viewport. */
export default function useReadingProgress(target: string) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const el = document.querySelector(target);
    if (!bar || !el) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.3 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target]);

  return ref;
}
