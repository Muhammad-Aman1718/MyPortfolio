"use client";

import { COPY } from "@/constants/constant";
import useToc from "@/hooks/useToc";
import { cn } from "@/utils/style";
import type { TocProps } from "@/types/types";

/** "On this page" — the section being read is marked and the bar slides to it as you scroll. */
export default function Toc({ items, numbered = false }: TocProps) {
  const { active, ref } = useToc(items);

  return (
    <nav aria-label={COPY.toc.label}>
      <p className="font-mono text-xs text-muted">{COPY.toc.heading}</p>
      <div ref={ref} className="relative mt-4 [--ind-fallback:transparent]">
        <span data-indicator="" className="indicator left-0! w-0.5! rounded-full bg-accent" />
        <ol className="flex flex-col border-l border-line">
          {items.map((item, i) => {
            const on = active === item.id;
            return (
              <li key={item.id} data-active={on}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "flex gap-2 py-1.5 pl-4 text-sm transition-colors duration-200",
                    on ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {numbered && <span className="font-mono text-xs leading-5 text-accent">{i + 1}</span>}
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
