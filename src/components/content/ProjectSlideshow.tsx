"use client";

import Image from "next/image";
import { UI } from "@/constants/constant";
import useSlideshow from "@/hooks/useSlideshow";
import { cn } from "@/utils/style";
import SlideDots from "@/components/ui/SlideDots";
import type { ProjectSlideshowProps } from "@/types/types";

/**
 * Card cover that crossfades through a project's showcase images on its own,
 * with dots along the bottom. The dots only show progress — the whole card is
 * a link, so they aren't separate buttons.
 */
export default function ProjectSlideshow({ images, sizes, priority = false }: ProjectSlideshowProps) {
  const { ref, index, mounted, pause, resume } = useSlideshow<HTMLDivElement>(images.length, UI.slideshowMs);

  return (
    <div ref={ref} className="absolute inset-0" onMouseEnter={pause} onMouseLeave={resume} onFocus={pause} onBlur={resume}>
      {/* Only the images shown so far plus the next one; the rest load when their turn comes */}
      {images.slice(0, mounted).map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={i === index ? image.alt : ""}
          aria-hidden={i !== index}
          fill
          sizes={sizes}
          quality={UI.showcaseQuality}
          loading={priority && i === 0 ? "eager" : undefined}
          fetchPriority={priority && i === 0 ? "high" : undefined}
          className={cn(
            "object-cover transition-[opacity,transform] duration-700 ease-smooth group-hover:scale-[1.03]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      {images.length > 1 && <SlideDots count={images.length} index={index} max={UI.maxDots} className="bottom-3" />}
    </div>
  );
}
