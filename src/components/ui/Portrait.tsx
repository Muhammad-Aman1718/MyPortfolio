import Image from "next/image";
import { SITE } from "@/constants/constant";
import { cn } from "@/utils/style";
import type { PortraitProps } from "@/types/types";

/** Red-lit studio portrait filling its box; sizing and radius come from the caller. */
export default function Portrait({ className, sizes = "(min-width: 1024px) 40vw, 90vw", priority = false }: PortraitProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <Image
        src={SITE.portrait}
        alt={`${SITE.name}, ${SITE.role}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}
