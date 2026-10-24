"use client";

import { useId, useState } from "react";

/** Numbered accordion; one answer open at a time. */
export default function FaqList({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className="rounded-[20px] bg-surface">
            <button
              type="button"
              id={`${id}-q${i}`}
              aria-expanded={on}
              aria-controls={`${id}-a${i}`}
              onClick={() => setOpen(on ? -1 : i)}
              className="flex w-full items-center gap-5 px-6 py-5 text-left"
            >
              <span className="text-sm font-medium text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-(family-name:--font-space) text-lg font-bold tracking-tight">
                {f.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-300 ${
                  on
                    ? "rotate-45 bg-primary text-on-primary"
                    : "bg-surface-hi text-fg"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              data-open={on}
              className="accordion-panel"
            >
              <div>
                <p className="px-6 pb-6 pl-[3.6rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
