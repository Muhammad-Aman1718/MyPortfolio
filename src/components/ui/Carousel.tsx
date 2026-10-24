"use client";

import { COPY } from "@/constants/constant";
import useCarousel from "@/hooks/useCarousel";
import { pad2 } from "@/utils/format";
import { cn } from "@/utils/style";
import Icon from "./Icon";
import type { CarouselProps } from "@/types/types";

/**
 * Below `lg` the children become a swipeable, snap-scrolling row with prev/next
 * arrows and a counter; from `lg` up it's a plain grid. Children size
 * themselves (e.g. `w-[85%] sm:w-[60%] lg:w-auto`).
 */
export default function Carousel({ children, label, desktopCols = "lg:grid-cols-2" }: CarouselProps) {
  const { trackRef, index, count, go, canGo } = useCarousel();

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} className={cn("carousel-track", desktopCols)}>
        {children}
      </div>
      <div className="mt-6 flex items-center justify-between lg:hidden">
        <p className="text-sm font-medium text-subtle" aria-live="polite">
          <span className="text-fg">{pad2(index + 1)}</span> / {pad2(count)}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!canGo(-1)}
            aria-label={COPY.carousel.previous}
            className="carousel-arrow"
          >
            <Icon name="chevronLeft" className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canGo(1)}
            aria-label={COPY.carousel.next}
            className="carousel-arrow"
          >
            <Icon name="chevronRight" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
