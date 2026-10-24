"use client";

import { useIndicator } from "@/lib/use-indicator";

/** Single-select filter chips; the filled crimson pill slides between options. */
export default function FilterPills({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const { ref } = useIndicator<HTMLDivElement>(value);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className="relative flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1.5 [--ind-fallback:var(--primary)] scrollbar-none"
    >
      <span data-indicator="" className="indicator rounded-full bg-primary" />
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            data-active={on}
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={`relative z-1 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              on ? "text-on-primary" : "text-muted hover:text-fg"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
