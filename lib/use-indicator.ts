"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

/**
 * Positions a `[data-indicator]` element over the `[data-active="true"]` child
 * of the returned ref (or over any element passed to `move`). Writes styles
 * directly — no re-render per hover. Used by the navbar, filters and tabs.
 */
export function useIndicator<T extends HTMLElement>(activeKey: unknown) {
  const ref = useRef<T>(null);

  const move = useCallback((target?: HTMLElement | null) => {
    const root = ref.current;
    const ind = root?.querySelector<HTMLElement>("[data-indicator]");
    if (!root || !ind) return;
    const el = target ?? root.querySelector<HTMLElement>("[data-active='true']");
    if (!el) {
      ind.style.opacity = "0";
      return;
    }
    ind.style.width = `${el.offsetWidth}px`;
    ind.style.height = `${el.offsetHeight}px`;
    ind.style.transform = `translate(${el.offsetLeft}px, ${el.offsetTop}px)`;
    ind.style.opacity = "1";
    // Enable transitions only after the first placement so it doesn't fly in from 0,0
    if (!ind.dataset.ready) requestAnimationFrame(() => (ind.dataset.ready = "true"));
  }, []);

  useLayoutEffect(() => {
    move();
  }, [activeKey, move]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ro = new ResizeObserver(() => move());
    ro.observe(root);
    Array.from(root.children).forEach((c) => {
      if (!c.hasAttribute("data-indicator")) ro.observe(c);
    });
    return () => ro.disconnect();
  }, [move]);

  return { ref, move };
}
