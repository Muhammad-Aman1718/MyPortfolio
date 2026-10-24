"use client";

import { useEffect, useState } from "react";
import { useIndicator } from "@/lib/use-indicator";

/**
 * "On this page" — the section being read is marked in the accent (its one
 * meaning: where you are now) and the bar slides to it as you scroll.
 */
export default function Toc({
  items,
  numbered = false,
}: {
  items: { id: string; title: string }[];
  numbered?: boolean;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const { ref } = useIndicator<HTMLDivElement>(active);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="font-(family-name:--font-jetbrains) text-xs text-muted">
        on this page
      </p>
      <div ref={ref} className="relative mt-4 [--ind-fallback:transparent]">
        <span
          data-indicator=""
          className="indicator left-0! w-0.5! rounded-full bg-accent"
        />
        <ol className="flex flex-col border-l border-line">
          {items.map((it, i) => (
            <li key={it.id} data-active={active === it.id}>
              <a
                href={`#${it.id}`}
                aria-current={active === it.id ? "location" : undefined}
                className={`flex gap-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                  active === it.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {numbered && (
                  <span className="font-(family-name:--font-jetbrains) text-xs leading-5 text-accent">
                    {i + 1}
                  </span>
                )}
                {it.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
