"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/utils/motion";

/**
 * Auto-advancing index for a crossfading image stack. Runs only while the
 * stack is on screen, pauses while hovered or focused and while the tab is
 * hidden, and never runs for visitors who prefer reduced motion (they see the
 * first image). `mounted` says how many images are needed so far — the first
 * until the stack is on screen, then the current one and the next — so the
 * rest aren't downloaded and decoded up front.
 */
export default function useSlideshow<T extends HTMLElement>(count: number, intervalMs: number) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [count]);

  useEffect(() => {
    if (count < 2 || paused || !inView || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStep((n) => n + 1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs, paused, inView]);

  return {
    ref,
    index: step % count,
    // One image until the stack is on screen, then the current one plus the next
    mounted: inView || step > 0 ? Math.min(step + 2, count) : 1,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
