"use client";

import { useState } from "react";
import Image from "next/image";

type Item = string | { name: string; logo?: string };

/**
 * Infinite ticker. Pauses on hover/focus and has an explicit pause control
 * (ui-ux-pro-max: auto-rotation-controls); reduced motion renders a static wrap.
 * Items may carry a Simple Icons logo slug (served from /public/logos).
 */
export default function Marquee({ items, label }: { items: Item[]; label: string }) {
  const [paused, setPaused] = useState(false);
  const list = items.map((t) => (typeof t === "string" ? { name: t } : t));

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-2 pr-2">
      {list.map((t) => (
        <li
          key={t.name}
          className="flex items-center gap-2 rounded-full bg-surface-hi/60 py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background">
            {t.logo ? (
              <Image src={`/logos/${t.logo}.svg`} alt="" width={16} height={16} unoptimized className="h-4 w-4" />
            ) : (
              <span className="text-[10px] font-bold text-subtle">{t.name.slice(0, 2).toUpperCase()}</span>
            )}
          </span>
          {t.name}
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
        className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hi text-muted transition-colors duration-150 hover:bg-[#363636] hover:text-fg motion-reduce:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
        </svg>
      </button>
    </div>
  );
}
