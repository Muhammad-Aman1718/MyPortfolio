import Image from "next/image";
import { SITE, UI } from "@/constants/constant";
import { cn } from "@/utils/style";
import type { AvatarProps } from "@/types/types";

/**
 * Round portrait thumbnail (40–44px). `sizes` lets the browser pick a copy
 * sized for the screen's pixel density — 2–3× the shown size, so it stays
 * sharp — instead of downloading the full 1254px portrait.
 */
export default function Avatar({ className, priority = false }: AvatarProps) {
  return (
    <Image
      src={SITE.portrait}
      alt=""
      width={1254}
      height={1254}
      sizes={UI.avatarSizes}
      quality={UI.showcaseQuality}
      loading={priority ? "eager" : undefined}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}
