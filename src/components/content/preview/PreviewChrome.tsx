import type { PreviewChromeProps } from "@/types/types";

/** Window title bar: three dots and an address pill. */
export default function PreviewChrome({ label }: PreviewChromeProps) {
  return (
    <div className="flex items-center gap-1.5 bg-surface-hi/60 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-fg/15" />
      <span className="h-2 w-2 rounded-full bg-fg/15" />
      <span className="h-2 w-2 rounded-full bg-primary/70" />
      <span className="ml-3 truncate rounded-full bg-fg/6 px-3 py-0.5 font-mono text-[10px] text-muted">
        {label}
      </span>
    </div>
  );
}
