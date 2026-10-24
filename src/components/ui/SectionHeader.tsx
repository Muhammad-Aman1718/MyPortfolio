"use client";

import useSectionHeader from "@/hooks/useSectionHeader";
import { cn } from "@/utils/style";
import HighlightedText from "./HighlightedText";
import SplitText from "./SplitText";
import type { SectionHeaderProps } from "@/types/types";

/**
 * Eyebrow, H2, optional description and an optional action aligned to the
 * right. `motion` picks how the title arrives so neighbouring sections don't
 * introduce themselves alike.
 */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
  action,
  motion = "words",
  className = "",
}: SectionHeaderProps) {
  const ref = useSectionHeader(motion);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={cn(
        "flex flex-col gap-5",
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <p data-h-eyebrow className="eyebrow">
          {eyebrow}
        </p>
        <h2 data-h-title className="h-section mt-3 max-w-[22ch]">
          {motion === "words" ? (
            <SplitText text={title} accent={highlight} />
          ) : (
            <HighlightedText text={title} highlight={highlight} />
          )}
        </h2>
        {description && (
          <p data-h-rest className="mt-3 max-w-[60ch] text-muted">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div data-h-rest className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
