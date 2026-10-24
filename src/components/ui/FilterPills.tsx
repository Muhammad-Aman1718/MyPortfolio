"use client";

import useIndicator from "@/hooks/useIndicator";
import { cn } from "@/utils/style";
import type { FilterPillsProps } from "@/types/types";

/** Single-select filter chips; the filled pill slides between options. */
export default function FilterPills({ options, value, onChange, label }: FilterPillsProps) {
  const { ref } = useIndicator<HTMLDivElement>(value);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className="relative flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1.5 scrollbar-none [--ind-fallback:var(--primary)]"
    >
      <span data-indicator="" className="indicator rounded-full bg-primary" />
      {options.map((option) => {
        const on = option === value;
        return (
          <button
            key={option}
            type="button"
            data-active={on}
            aria-pressed={on}
            onClick={() => onChange(option)}
            className={cn(
              "relative z-1 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
              on ? "text-on-primary" : "text-muted hover:text-fg",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
