import { UI } from "@/constants/constant";
import { cn } from "@/utils/style";
import type { SlideDotsProps } from "@/types/types";

/**
 * Progress dots that never show more than `max` at once: with more slides,
 * the row slides along so the current dot stays centred (Instagram-style),
 * and the dots at the window's edges shrink to hint there are more.
 * With `onSelect` the dots are buttons; without it they're decorative.
 */
export default function SlideDots({ count, index, max, slot = UI.dotSlotPx, onSelect, labelFor, className }: SlideDotsProps) {
  const visible = Math.min(count, max);
  const start = Math.min(Math.max(index - Math.floor(visible / 2), 0), count - visible);
  const edge = (i: number) => count > visible && i !== index && (i === start || i === start + visible - 1);

  return (
    <div aria-hidden={onSelect ? undefined : true} className={cn("absolute inset-x-0 flex justify-center", className)}>
      <div className="overflow-hidden" style={{ width: visible * slot }}>
        <div className="flex transition-transform duration-500 ease-smooth" style={{ transform: `translateX(${-start * slot}px)` }}>
          {Array.from({ length: count }, (_, i) => {
            const dot = (
              <span
                className={cn(
                  "block h-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all duration-500 ease-smooth",
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/55",
                  edge(i) && "scale-75",
                )}
              />
            );
            return onSelect ? (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={labelFor?.(i)}
                aria-current={i === index}
                tabIndex={i < start || i >= start + visible ? -1 : 0}
                className="flex h-6 shrink-0 items-center justify-center"
                style={{ width: slot }}
              >
                {dot}
              </button>
            ) : (
              <span key={i} className="flex shrink-0 justify-center" style={{ width: slot }}>
                {dot}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
