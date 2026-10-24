import Image from "next/image";
import { monogram } from "@/utils/format";
import { cn } from "@/utils/style";
import type { ToolLogoProps } from "@/types/types";

/** A tool's brand logo (Simple Icons, self-hosted in /public/logos), or its initials when it has none. */
export default function ToolLogo({ tool, size = 16, className }: ToolLogoProps) {
  if (tool.logo) {
    return (
      <Image
        src={`/logos/${tool.logo}.svg`}
        alt=""
        width={size}
        height={size}
        unoptimized
        className={className}
        style={{ width: size, height: size }}
      />
    );
  }
  return <span className={cn("font-display text-[10px] font-bold text-subtle", className)}>{monogram(tool.name)}</span>;
}
