"use client";

import useReveal from "@/hooks/useReveal";
import type { RevealProps } from "@/types/types";

/** Scroll reveal that runs once. Configured per use so sections don't all move alike. */
export default function Reveal({
  children,
  className,
  variant = "fade-up",
  stagger = false,
  targets,
  each,
  from = "start",
  grid = false,
  delay = 0,
  duration,
  start = "top 88%",
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ variant, stagger, targets, each, from, grid, delay, duration, start });

  return (
    // The wrapper tag varies, so the generic HTMLElement ref is widened here
    <Tag ref={ref as never} className={className} id={id} data-reveal="">
      {children}
    </Tag>
  );
}
