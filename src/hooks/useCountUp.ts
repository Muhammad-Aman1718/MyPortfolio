"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { decimalsOf, formatCount } from "@/utils/format";
import { onceInView, prefersReducedMotion } from "@/utils/motion";
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
    if (prefersReducedMotion()) return;
    let alive = true;
    let skip = false;
    let tween: gsap.core.Tween | undefined;
    const stop = onceInView(
      el,
      "top 90%",
      () => {
        if (skip) return;
        void loadGsap().then(({ gsap }) => {
          if (!alive) return;
          const counter = { n: 0 };
          tween = gsap.to(counter, {
            n: value,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = formatCount(counter.n, decimals, prefix, suffix);
            },
          });
        });
      },
      (seenAtLoad) => {
        // Already on screen at load: keep the real value instead of flashing to 0.
        // Off screen: drop to 0 out of sight, ready to count up (and fetch GSAP meanwhile).
        if (seenAtLoad) skip = true;
        else {
          el.textContent = formatCount(0, decimals, prefix, suffix);
          void loadGsap();
        }
      },
    );
    return () => {
      alive = false;
      stop();
      tween?.kill();
    };
  }, [value, prefix, suffix, decimals]);

  return { ref, final };
}
