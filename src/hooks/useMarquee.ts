"use client";

import { useState } from "react";

/** Pause/resume state for an auto-scrolling ticker. */
export default function useMarquee() {
  const [paused, setPaused] = useState(false);
  return { paused, togglePaused: () => setPaused((p) => !p) };
}
