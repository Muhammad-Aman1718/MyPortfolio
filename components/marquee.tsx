"use client";

import { useState } from "react";

/**
 * Infinite ticker. Pauses on hover/focus and has an explicit pause control
 * (ui-ux-pro-max: auto-rotation-controls); reduced motion renders a static wrap.
 */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-6 px-3 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted transition-colors duration-150 hover:text-fg"
        >
          {t}
          <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative flex items-center" role="region" aria-label={label}>
      <div className="marquee flex-1 overflow-hidden" data-paused={paused}>
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label="Pause technology ticker"
        className="mx-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg motion-reduce:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
        </svg>
      </button>
    </div>
  );
}
