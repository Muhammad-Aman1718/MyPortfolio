"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

/**
 * Positions a `[data-indicator]` element over the `[data-active="true"]` child
 * of the returned ref (or over any element passed to `move`). Writes styles
 * directly — no re-render per hover. Used by the navbar, filters and tabs.
 */
export default function useIndicator<T extends HTMLElement>(activeKey: unknown) {
  const ref = useRef<T>(null);

  const move = useCallback((target?: HTMLElement | null) => {
    const root = ref.current;
    const indicator = root?.querySelector<HTMLElement>("[data-indicator]");
    if (!root || !indicator) return;
    const el = target ?? root.querySelector<HTMLElement>("[data-active='true']");
    if (!el) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.height = `${el.offsetHeight}px`;
    indicator.style.transform = `translate(${el.offsetLeft}px, ${el.offsetTop}px)`;
    indicator.style.opacity = "1";
    // Enable transitions only after the first placement so it doesn't fly in from 0,0
    if (!indicator.dataset.ready) requestAnimationFrame(() => (indicator.dataset.ready = "true"));
  }, []);

  useLayoutEffect(() => {
    move();
  }, [activeKey, move]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new ResizeObserver(() => move());
    observer.observe(root);
    Array.from(root.children).forEach((child) => {
      if (!child.hasAttribute("data-indicator")) observer.observe(child);
    });
    return () => observer.disconnect();
  }, [move]);

  return { ref, move };
}
