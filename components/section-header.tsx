"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./split-text";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type HeaderMotion = "words" | "wipe" | "fade" | "blur";

/**
 * Mono eyebrow, H2, optional description and an optional action aligned to the
 * right (keeps "view all" links out of their own row). `motion` picks how the
 * title arrives so neighbouring sections don't introduce themselves alike.
 */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
  action,
  motion = "words",
  className = "",
}: {
  eyebrow: string;
  title: string;
  /** Words of the title (exact match) set in crimson — the two-tone heading */
  highlight?: string[];
  description?: string;
  center?: boolean;
  action?: React.ReactNode;
  motion?: HeaderMotion;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { visibility: "visible" });
      return;
    }
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(q("[data-h-eyebrow]"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.6 });
      if (motion === "words") {
        tl.fromTo(q(".mask-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }, "<0.05");
      } else if (motion === "wipe") {
        tl.fromTo(
          q("[data-h-title]"),
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
          "<0.05",
        );
      } else if (motion === "blur") {
        tl.fromTo(q("[data-h-title]"), { autoAlpha: 0, filter: "blur(8px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.9 }, "<0.05");
      } else {
        tl.fromTo(q("[data-h-title]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "<0.05");
      }
      const rest = q("[data-h-rest]");
      if (rest.length) tl.fromTo(rest, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.55");
      tl.set(q("[data-h-title], [data-h-eyebrow], [data-h-rest], .mask-line > span"), { clearProps: "transform,filter,clipPath" });
      gsap.set(el, { visibility: "visible" });
    }, el);
    return () => ctx.revert();
  }, [motion]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={`flex flex-col gap-5 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <p data-h-eyebrow className="eyebrow">{eyebrow}</p>
        <h2 data-h-title className="h-section mt-3 max-w-[22ch]">
          {motion === "words" ? (
            <SplitText text={title} accent={highlight} />
          ) : (
            title.split(" ").map((w, i) => (
              <span key={i}>
                {i > 0 && " "}
                {highlight?.includes(w) ? <em>{w}</em> : w}
              </span>
            ))
          )}
        </h2>
        {description && (
          <p data-h-rest className="mt-3 max-w-[60ch] text-muted">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div data-h-rest className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
