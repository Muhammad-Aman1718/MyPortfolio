import Image from "next/image";
import { SITE } from "@/constants/constant";
import { cn } from "@/utils/style";
import type { AvatarProps } from "@/types/types";

/**
 * Round portrait thumbnail. The full portrait is served as-is (unoptimized):
 * the browser scales the original down, which stays sharp where a tiny
 * optimised copy went blurry.
 */
export default function Avatar({ className, priority = false }: AvatarProps) {
  return (
    <Image
      src={SITE.portrait}
      alt=""
      width={1254}
      height={1254}
      unoptimized
      priority={priority}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}
