"use client";

import { useEffect, useRef, useState } from "react";
import type { CarouselDirection } from "@/types/types";

/** Snap-scroll carousel: tracks the current card and scrolls by one on demand. */
export default function useCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  // Where a smooth scroll is heading, so quick repeat clicks count from there, not from where it started
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const items = Array.from(el.children) as HTMLElement[];
      setCount(items.length);
      // The card closest to the track's left edge is the current one
      const offset = (item: HTMLElement) => Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft);
      const current = items.reduce((best, item, i) => (offset(item) < offset(items[best]) ? i : best), 0);
      setIndex(current);
      if (current === targetRef.current) targetRef.current = null;
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (direction: CarouselDirection) => {
    const el = trackRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const target = items[Math.min(Math.max(index + direction, 0), items.length - 1)];
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const canGo = (direction: CarouselDirection) => (direction === -1 ? index > 0 : index < count - 1);

  /** Scrolls straight to one item (dots). */
  const goTo = (target: number) => {
    const el = trackRef.current;
    const item = el?.children[target] as HTMLElement | undefined;
    if (!el || !item) return;
    targetRef.current = target;
    el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  /** One step back or forward, wrapping from the last item to the first and back. */
  const step = (direction: CarouselDirection) => {
    if (!count) return;
    goTo(((targetRef.current ?? index) + direction + count) % count);
  };

  return { trackRef, index, count, go, canGo, goTo, step };
}
