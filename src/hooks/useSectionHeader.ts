"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type Gsap } from "@/lib/gsap";
import { onceInView, prefersReducedMotion } from "@/utils/motion";
import type { HeaderMotion, ScopedSelector } from "@/types/types";

/** How each header motion brings the title in (after the eyebrow slides). */
const titleTween = (tl: gsap.core.Timeline, q: ScopedSelector, motion: HeaderMotion) => {
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
};

/** Eyebrow → title → description/action, played once when the header scrolls in. */
export default function useSectionHeader(motion: HeaderMotion) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let alive = true;
    let entered = false;
    let tl: gsap.core.Timeline | undefined;
    let ctx: gsap.Context | undefined;
    const build = (gsap: Gsap) => {
      const q = gsap.utils.selector(el);
      el.style.animation = "none";
      ctx = gsap.context(() => {
        // Scrolled in while GSAP was still loading: play straight away
        tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: !entered });
        tl.fromTo(q("[data-h-eyebrow]"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.6 });
        titleTween(tl, q, motion);
        const rest = q("[data-h-rest]");
        if (rest.length) tl.fromTo(rest, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.55");
        tl.set(q("[data-h-title], [data-h-eyebrow], [data-h-rest], .mask-line > span"), {
          clearProps: "transform,filter,clipPath",
        });
      }, el);
    };
    const stop = onceInView(
      el,
      "top 88%",
      () => {
        entered = true;
        tl?.play();
      },
      (seenAtLoad) => {
        // On screen at load it's already painted (CSS fade); only headers below the fold get the timeline
        if (seenAtLoad) return;
        void loadGsap().then(({ gsap }) => {
          if (alive) build(gsap);
        });
      },
    );
    return () => {
      alive = false;
      stop();
      ctx?.revert();
    };
  }, [motion]);

  return ref;
}
