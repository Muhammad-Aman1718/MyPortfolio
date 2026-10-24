import { cn } from "@/utils/style";
import ToolLogo from "./ToolLogo";
import type { ToolChipProps } from "@/types/types";

/** Pill with a round logo bubble and the tool's name (hero stack, tool ticker). */
export default function ToolChip({ tool, className }: ToolChipProps) {
  return (
    <li className={cn("tool-chip", className)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background">
        <ToolLogo tool={tool} />
      </span>
      {tool.name}
    </li>
  );
}
