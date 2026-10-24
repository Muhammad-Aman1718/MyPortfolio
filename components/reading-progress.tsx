"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Hairline at the top of the viewport that fills as the article is read (transform-only, scrubbed). */
export default function ReadingProgress({ target }: { target: string }) {
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
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-linear-to-r from-primary to-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
