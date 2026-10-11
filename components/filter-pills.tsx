"use client";

import { useIndicator } from "@/lib/use-indicator";

/** Single-select filter chips; the filled pill slides between options. */
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
    <div ref={ref} role="group" aria-label={label} className="relative flex flex-wrap gap-2 [--ind-fallback:var(--primary)]">
      <span data-indicator="" className="indicator rounded-full bg-primary shadow-[0_6px_20px_-6px_rgba(234,0,68,0.6)]" />
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            data-active={on}
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={`relative z-[1] rounded-full border px-4 py-2 font-[family-name:var(--font-jetbrains)] text-[13px] transition-colors duration-300 ${
              on ? "border-transparent text-on-primary" : "border-line text-muted hover:border-fg/25 hover:text-fg"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
