import { CALLOUT_STYLES } from "@/constants/constant";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { CalloutProps } from "@/types/types";

/** `<Callout type="tip" title="…">` — info (default), tip, warning or danger. */
export default function Callout({ type = "info", title, children }: CalloutProps) {
  const style = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info;
  return (
    <aside role="note" aria-label={title ?? style.label} className={cn("card flex gap-3 border p-5 md:p-6", style.className)}>
      <Icon name={style.icon} className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", style.accentClassName)} />
      <div className="min-w-0">
        {title && <p className={cn("font-mono text-xs", style.accentClassName)}>{title}</p>}
        <div className={cn("callout-body leading-[1.7] text-fg/85", title && "mt-2")}>{children}</div>
      </div>
    </aside>
  );
}
