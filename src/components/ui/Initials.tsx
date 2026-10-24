import { initials } from "@/utils/format";
import { cn } from "@/utils/style";
import type { InitialsProps } from "@/types/types";

/** Round monogram standing in for a person's photo; size comes from the caller. */
export default function Initials({ name, className }: InitialsProps) {
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-surface-hi font-display font-bold", className)}>
      {initials(name)}
    </span>
  );
}
