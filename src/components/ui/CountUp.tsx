"use client";

import useCountUp from "@/hooks/useCountUp";
import { cn } from "@/utils/style";
import type { CountUpProps } from "@/types/types";

/** A number that counts up once when it scrolls into view (tabular figures). */
export default function CountUp({ value, prefix, suffix, className }: CountUpProps) {
  const { ref, final } = useCountUp({ value, prefix, suffix });
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {final}
    </span>
  );
}
