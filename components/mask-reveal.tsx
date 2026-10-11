"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Signature hero interaction: each line slides up from behind a clip mask —
 * cinematic reveal on load. Falls back to static text for reduced motion.
 */
export default function MaskReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { yPercent: 0, y: 0 });
      return;
    }
    // y: 0 in both states cancels the pixel offset GSAP folds in from the
    // SSR-visible translate-y-[115%] class; yPercent drives the reveal.
    const tween = gsap.fromTo(
      el,
      { yPercent: 115, y: 0 },
      { yPercent: 0, y: 0, duration: 1.1, delay, ease: "power4.out" }
    );
    return () => {
      tween.kill();
    };
  }, [delay]);

  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <span ref={ref} className="inline-block translate-y-[115%] will-change-transform">
        {text}
      </span>
    </span>
  );
}
