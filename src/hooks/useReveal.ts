"use client";

import { useEffect, useRef } from "react";
import { REVEAL_PRESETS } from "@/constants/constant";
import { loadGsap } from "@/lib/gsap";
import { onceInView, prefersReducedMotion } from "@/utils/motion";
import type { RevealOptions } from "@/types/types";

/**
 * Scroll reveal that runs once; the preset and stagger come from `options`.
 * Content is server-rendered visible, so whatever is on screen at load paints
 * straight away (with a CSS fade, see globals.css) instead of waiting for
 * JavaScript. Only content still below the fold is hidden — out of sight — and
 * animated in when it scrolls into view.
 */
export default function useReveal<T extends HTMLElement>({
  variant,
  stagger,
  targets,
  each,
  from,
  grid,
  delay,
  duration,
  start,
}: RevealOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const preset = REVEAL_PRESETS[variant];
    const nodes = targets ? Array.from(el.querySelectorAll(targets)) : stagger ? Array.from(el.children) : [el];
    if (!nodes.length) return;

    let alive = true;
    let entered = false;
    let tween: gsap.core.Tween | undefined;
    let ctx: gsap.Context | undefined;
    const stop = onceInView(
      el,
      start,
      () => {
        entered = true;
        tween?.play();
      },
      (seenAtLoad) => {
        if (seenAtLoad) return;
        // Below the fold: GSAP takes over from the CSS fade and hides it out of sight
        void loadGsap().then(({ gsap }) => {
          if (!alive) return;
          el.style.animation = "none";
          ctx = gsap.context(() => {
            tween = gsap.fromTo(nodes, preset.from, {
              ...preset.to,
              duration: duration ?? preset.duration,
              ease: preset.ease,
              delay,
              stagger: { each: each ?? preset.stagger, from, ...(grid ? { grid: "auto" as const } : {}) },
              clearProps: "transform,filter,clipPath",
              // Scrolled in while GSAP was still loading: play straight away
              paused: !entered,
            });
          }, el);
        });
      },
    );

    return () => {
      alive = false;
      stop();
      ctx?.revert();
    };
  }, [variant, stagger, targets, each, from, grid, delay, duration, start]);

  return ref;
}
