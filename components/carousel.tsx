"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Below `lg` the children become a swipeable, snap-scrolling row with
 * prev/next arrows and a counter underneath; from `lg` up it's a plain
 * two-column grid. Children size themselves (e.g. `w-[85%] sm:w-[60%] lg:w-auto`).
 */
export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const items = Array.from(el.children) as HTMLElement[];
      setCount(items.length);
      // Closest card to the track's left edge is the current one
      const left = el.scrollLeft;
      let best = 0;
      items.forEach((item, i) => {
        if (Math.abs(item.offsetLeft - el.offsetLeft - left) < Math.abs(items[best].offsetLeft - el.offsetLeft - left)) best = i;
      });
      setIndex(best);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const target = items[Math.min(Math.max(index + dir, 0), items.length - 1)];
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(dir)}
      disabled={dir === -1 ? index === 0 : index >= count - 1}
      aria-label={dir === -1 ? "Previous project" : "Next project"}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-fg transition-colors duration-200 hover:bg-primary hover:text-on-primary disabled:pointer-events-none disabled:opacity-35"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === -1 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center justify-between lg:hidden">
        <p className="text-sm font-medium text-subtle" aria-live="polite">
          <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          {arrow(-1)}
          {arrow(1)}
        </div>
      </div>
    </div>
  );
}
