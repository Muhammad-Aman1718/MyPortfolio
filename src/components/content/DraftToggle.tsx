import { COPY } from "@/constants/constant";
import { fillTemplate } from "@/utils/format";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { DraftToggleProps } from "@/types/types";

/** Local-only bar on /posts: how many drafts exist and a switch to show them in the lists. */
export default function DraftToggle({ count, on, onToggle }: DraftToggleProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-error/40 bg-error/5 px-4 py-3 text-sm">
      <span className="flex items-center gap-2 text-muted">
        <Icon name="info" className="h-4 w-4 text-error" />
        {fillTemplate(COPY.posts.draftsNotice, { count: String(count) })}
      </span>
      <button
        type="button"
        aria-pressed={on}
        onClick={onToggle}
        className={cn(
          "rounded-full px-4 py-1.5 font-medium transition-colors duration-150",
          on ? "bg-error text-on-primary hover:bg-error/85" : "bg-surface-hi text-fg hover:bg-surface-hover",
        )}
      >
        {on ? COPY.posts.hideDrafts : COPY.posts.showDrafts}
      </button>
    </div>
  );
}
