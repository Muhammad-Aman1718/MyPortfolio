"use client";

import { useId, useState } from "react";

/** One-open-at-a-time accordion state with stable ids for ARIA wiring. */
export default function useAccordion(initial = 0) {
  const [open, setOpen] = useState(initial);
  const id = useId();

  return {
    isOpen: (i: number) => open === i,
    toggle: (i: number) => setOpen((current) => (current === i ? -1 : i)),
    questionId: (i: number) => `${id}-q${i}`,
    answerId: (i: number) => `${id}-a${i}`,
  };
}
