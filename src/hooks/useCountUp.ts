"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { decimalsOf, formatCount } from "@/utils/format";
import { prefersReducedMotion } from "@/utils/motion";
import type { CountUpProps } from "@/types/types";

/**
 * Counts a number up once when it scrolls into view. Returns the final text so
 * the server renders the real value (crawlers, no-JS); numbers already on
 * screen at load stay put instead of flashing to 0.
 */
export default function useCountUp({ value, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = decimalsOf(value);
  const final = formatCount(value, decimals, prefix, suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Matches the trigger line below: anything already past it would flash to 0
    const onScreen = el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (prefersReducedMotion() || onScreen) {
      el.textContent = formatCount(value, decimals, prefix, suffix);
      return;
    }
    el.textContent = formatCount(0, decimals, prefix, suffix);
    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = formatCount(counter.n, decimals, prefix, suffix);
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, suffix, decimals]);

  return { ref, final };
}
