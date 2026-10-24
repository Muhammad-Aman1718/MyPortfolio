"use client";

import useAccordion from "@/hooks/useAccordion";
import { pad2 } from "@/utils/format";
import { cn } from "@/utils/style";
import Icon from "./Icon";
import type { FaqListProps } from "@/types/types";

/** Numbered accordion; one answer open at a time. */
export default function FaqList({ items }: FaqListProps) {
  const { isOpen, toggle, questionId, answerId } = useAccordion();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const on = isOpen(i);
        return (
          <li key={faq.q} className="rounded-[20px] bg-surface">
            <button
              type="button"
              id={questionId(i)}
              aria-expanded={on}
              aria-controls={answerId(i)}
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-5 px-6 py-5 text-left"
            >
              <span className="text-sm font-medium text-subtle">{pad2(i + 1)}</span>
              <span className="flex-1 font-display text-lg font-bold tracking-tight">{faq.q}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-300",
                  on ? "rotate-45 bg-primary text-on-primary" : "bg-surface-hi text-fg",
                )}
              >
                <Icon name="plus" strokeWidth={2} />
              </span>
            </button>
            <div id={answerId(i)} role="region" aria-labelledby={questionId(i)} data-open={on} className="accordion-panel">
              <div>
                <p className="px-6 pb-6 pl-[3.6rem] leading-relaxed text-muted">{faq.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
