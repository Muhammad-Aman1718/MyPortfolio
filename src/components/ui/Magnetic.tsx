"use client";

import useMagnetic from "@/hooks/useMagnetic";
import type { MagneticProps } from "@/types/types";

/** Pulls its child slightly toward the cursor. Used on primary CTAs only. */
export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
