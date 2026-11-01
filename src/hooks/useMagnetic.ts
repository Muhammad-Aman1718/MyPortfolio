"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type Gsap } from "@/lib/gsap";
import { canHover, prefersReducedMotion } from "@/utils/motion";

/** Pulls the element slightly toward the cursor while it hovers. */
export default function useMagnetic<T extends HTMLElement>(strength: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;
    // GSAP arrives with the first hover; until then the element just doesn't follow the cursor
    let gsap: Gsap | undefined;
    let xTo: gsap.QuickToFunc | undefined;
    let yTo: gsap.QuickToFunc | undefined;
    const enter = () => {
      void loadGsap().then((m) => {
        if (gsap) return;
        gsap = m.gsap;
        xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      });
    };
    const move = (e: PointerEvent) => {
      if (!xTo || !yTo) return;
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const leave = () => {
      xTo?.(0);
      yTo?.(0);
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap?.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}
