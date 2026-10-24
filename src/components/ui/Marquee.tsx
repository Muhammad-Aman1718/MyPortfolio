"use client";

import { COPY } from "@/constants/constant";
import useMarquee from "@/hooks/useMarquee";
import Icon from "./Icon";
import ToolChip from "./ToolChip";
import type { MarqueeProps } from "@/types/types";

/**
 * Infinite ticker of tool chips. Pauses on hover/focus and has an explicit
 * pause control; reduced motion renders a static wrap.
 */
export default function Marquee({ items, label }: MarqueeProps) {
  const { paused, togglePaused } = useMarquee();

  return (
    <div className="relative flex items-center" role="region" aria-label={label}>
      <div className="marquee flex-1 overflow-hidden" data-paused={paused}>
        <div className="marquee-track">
          {[false, true].map((hidden) => (
            <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-2 pr-2">
              {items.map((tool) => (
                <ToolChip key={tool.name} tool={tool} className="bg-surface-hi/60" />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={togglePaused}
        aria-pressed={paused}
        aria-label={COPY.marquee.pause}
        className="icon-button ml-3 h-10 w-10 bg-surface-hi text-muted hover:text-fg motion-reduce:hidden"
      >
        <Icon name={paused ? "play" : "pause"} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
