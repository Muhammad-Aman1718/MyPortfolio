"use client";

import { useEffect, useRef } from "react";
import { REVEAL_PRESETS } from "@/constants/constant";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/utils/motion";
import type { RevealOptions } from "@/types/types";

/** Scroll reveal that runs once; the preset and stagger come from `options`. */
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
    if (!el) return;
    const show = () => gsap.set(el, { visibility: "visible" });
    if (prefersReducedMotion()) {
      show();
      return;
    }

    const preset = REVEAL_PRESETS[variant];
    const nodes = targets ? Array.from(el.querySelectorAll(targets)) : stagger ? Array.from(el.children) : [el];
    if (!nodes.length) {
      show();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(nodes, preset.from, {
        ...preset.to,
        duration: duration ?? preset.duration,
        ease: preset.ease,
        delay,
        stagger: { each: each ?? preset.stagger, from, ...(grid ? { grid: "auto" as const } : {}) },
        clearProps: "transform,filter,clipPath",
        scrollTrigger: { trigger: el, start, once: true },
      });
      // Targets now carry their own hidden state; un-hide the wrapper.
      if (nodes[0] !== el || !("autoAlpha" in preset.from)) show();
    }, el);

    return () => ctx.revert();
  }, [variant, stagger, targets, each, from, grid, delay, duration, start]);

  return ref;
}
