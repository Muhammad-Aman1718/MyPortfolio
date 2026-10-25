"use client";

import Image from "next/image";
import { ARTICLE_IMAGE } from "@/constants/constant";
import useImageFallback from "@/hooks/useImageFallback";
import { canOptimizeImage } from "@/utils/image";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { ArticleImageProps } from "@/types/types";

/**
 * Responsive article image (local /public file or the R2 host). If it can't
 * load, a quiet panel with the alt text takes its place — never a broken icon.
 * Uses spans so it stays valid inside a markdown paragraph.
 */
export default function ArticleImage({
  src,
  alt,
  width = ARTICLE_IMAGE.width,
  height = ARTICLE_IMAGE.height,
  priority = false,
  className,
  sizes = ARTICLE_IMAGE.sizes,
}: ArticleImageProps) {
  const { failed, onError } = useImageFallback();

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-[14px] border border-line bg-surface p-6 text-center text-sm text-subtle",
          className,
        )}
      >
        <Icon name="info" className="h-5 w-5" />
        {alt}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={!canOptimizeImage(src)}
      onError={onError}
      className={cn("h-auto w-full rounded-[14px] bg-surface", className)}
    />
  );
}
