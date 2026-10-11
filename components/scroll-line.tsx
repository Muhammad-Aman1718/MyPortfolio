"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A timeline rail whose accent fill tracks scroll progress (`scrub`) or draws
 * once when it enters view. Position it absolutely inside the timeline.
 */
export default function ScrollLine({
  axis = "y",
  scrub = true,
  className = "",
}: {
  axis?: "x" | "y";
  scrub?: boolean;
  className?: string;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const track = fill?.parentElement;
    if (!fill || !track) return;
    const prop = axis === "y" ? "scaleY" : "scaleX";
    if (prefersReducedMotion()) {
      gsap.set(fill, { [prop]: 1 });
      return;
    }
    const tween = gsap.fromTo(
      fill,
      { [prop]: 0 },
      {
        [prop]: 1,
        ease: scrub ? "none" : "power2.inOut",
        duration: scrub ? undefined : 1.4,
        scrollTrigger: scrub
          ? { trigger: track, start: "top 75%", end: "bottom 55%", scrub: 0.6 }
          : { trigger: track, start: "top 85%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [axis, scrub]);

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute overflow-hidden bg-line ${className}`}>
      <span
        ref={fillRef}
        className={`absolute inset-0 ${
          axis === "y"
            ? "origin-top bg-gradient-to-b from-accent via-primary to-primary/30"
            : "origin-left bg-gradient-to-r from-accent via-primary to-primary/30"
        }`}
        style={{ transform: axis === "y" ? "scaleY(0)" : "scaleX(0)" }}
      />
    </span>
  );
}
