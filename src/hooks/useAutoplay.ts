"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/utils/motion";

/**
 * Calls `onTick` every `intervalMs` — for carousels that advance on their own.
 * Pauses while hovered, focused or touched and while the tab is hidden, waits
 * a full interval after any manual step (`restart`), and never runs for
 * visitors who prefer reduced motion.
 */
export default function useAutoplay(onTick: () => void, intervalMs: number, enabled = true) {
  const [paused, setPaused] = useState(false);
  const [round, setRound] = useState(0);
  const tick = useRef(onTick);

  useEffect(() => {
    tick.current = onTick;
  });

  useEffect(() => {
    if (!enabled || paused || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) tick.current();
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [enabled, paused, intervalMs, round]);

  return {
    pause: () => setPaused(true),
    resume: () => setPaused(false),
    restart: () => setRound((r) => r + 1),
  };
}
