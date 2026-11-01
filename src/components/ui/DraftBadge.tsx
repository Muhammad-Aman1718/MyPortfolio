import { COPY } from "@/constants/constant";
import { cn } from "@/utils/style";
import type { DraftBadgeProps } from "@/types/types";

/** "Draft" pill on unpublished posts and papers (they only appear during local preview). */
export default function DraftBadge({ label = COPY.posts.draftBadge, className }: DraftBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-error/60 bg-error/10 px-2.5 py-0.5 text-xs font-medium text-error",
        className,
      )}
    >
      {label}
    </span>
  );
}
