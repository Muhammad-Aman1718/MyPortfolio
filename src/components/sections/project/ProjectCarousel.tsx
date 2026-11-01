"use client";

import Image from "next/image";
import { COPY, UI } from "@/constants/constant";
import useAutoplay from "@/hooks/useAutoplay";
import useCarousel from "@/hooks/useCarousel";
import useLoadedSlides from "@/hooks/useLoadedSlides";
import { fillTemplate } from "@/utils/format";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import SlideDots from "@/components/ui/SlideDots";
import type { CarouselDirection, ProjectCarouselProps } from "@/types/types";

/**
 * Case-study hero: the showcase images one at a time. It advances on its own
 * (pausing on hover, focus or touch); chevrons on either side wrap around,
 * up to five dots slide along with the current image, and touch screens swipe.
 */
export default function ProjectCarousel({ images, name }: ProjectCarouselProps) {
  const { trackRef, index, goTo, step } = useCarousel();
  const loaded = useLoadedSlides(index, images.length);
  const { pause, resume, restart } = useAutoplay(() => step(1), UI.carouselAutoplayMs, images.length > 1);
  const { project } = COPY;

  const move = (direction: CarouselDirection) => {
    step(direction);
    restart();
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} — ${project.galleryLabel}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          move(e.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="relative mx-auto mt-10 w-full max-w-[min(880px,calc((100svh-240px)*1.6))] overflow-hidden rounded-[20px] border border-line bg-surface"
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <figure
            key={image.src}
            aria-roledescription="slide"
            aria-label={fillTemplate(project.slideLabel, { index: String(i + 1), total: String(images.length) })}
            className="relative aspect-16/10 w-full shrink-0 snap-center"
          >
            {/* Slides past the next one stay empty until reached, so they don't compete with the first */}
            {i < loaded && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={UI.showcaseQuality}
                sizes="(min-width: 960px) 880px, 94vw"
                // The first slide is the page's largest paint: fetch it first
                loading={i === 0 ? "eager" : undefined}
                fetchPriority={i === 0 ? "high" : undefined}
                className="object-cover"
              />
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => move(direction)}
              aria-label={direction === -1 ? project.previousImage : project.nextImage}
              className={cn(
                "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-fg shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur transition-colors duration-200 hover:bg-primary hover:text-on-primary md:h-12 md:w-12",
                direction === -1 ? "left-2.5 md:left-5" : "right-2.5 md:right-5",
              )}
            >
              <Icon name={direction === -1 ? "chevronLeft" : "chevronRight"} className="h-5 w-5" strokeWidth={2} />
            </button>
          ))}

          <SlideDots
            count={images.length}
            index={index}
            max={UI.carouselMaxDots}
            slot={UI.carouselDotSlotPx}
            onSelect={(i) => {
              goTo(i);
              restart();
            }}
            labelFor={(i) => fillTemplate(project.goToImage, { index: String(i + 1) })}
            className="bottom-2 md:bottom-4"
          />
        </>
      )}
    </div>
  );
}
