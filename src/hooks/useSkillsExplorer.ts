"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { TAB_KEY_STEPS } from "@/constants/constant";

/** Tabs state for the skills explorer, with arrow-key navigation (WAI-ARIA tabs). */
export default function useSkillsExplorer(count: number) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = (i: number) => `${id}-panel-${i}`;

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const step = TAB_KEY_STEPS[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (i + step + count) % count;
    setActive(next);
    document.getElementById(tabId(next))?.focus();
  };

  return { active, select: setActive, onKeyDown, tabId, panelId };
}
