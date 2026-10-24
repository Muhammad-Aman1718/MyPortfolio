"use client";

import useReadingProgress from "@/hooks/useReadingProgress";
import type { ReadingProgressProps } from "@/types/types";

/** Hairline at the top of the viewport that fills as the article is read. */
export default function ReadingProgress({ target }: ReadingProgressProps) {
  const ref = useReadingProgress(target);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-linear-to-r from-primary to-accent" />
    </div>
  );
}
