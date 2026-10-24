import { cn } from "@/utils/style";
import type { PreviewProps } from "@/types/types";

/** Phone mock-up for mobile projects. */
export default function PreviewPhone({ name }: PreviewProps) {
  return (
    <div className="flex aspect-9/18 h-[82%] flex-col overflow-hidden rounded-[26px] bg-background p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-fg/15" />
      <div className="rounded-[14px] bg-primary p-3">
        <p className="font-display text-[11px] font-semibold leading-tight text-fg">
          {name}
        </p>
        <div className="mt-2 h-1 w-2/3 rounded-full bg-fg/30" />
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-[10px] bg-fg/4 p-2"
          >
            <span
              className={cn(
                "h-5 w-5 shrink-0 rounded-md",
                i === 0 ? "bg-primary" : "bg-fg/10",
              )}
            />
            <span className="flex flex-1 flex-col gap-1">
              <span className="h-1 w-4/5 rounded-full bg-fg/20" />
              <span className="h-1 w-1/2 rounded-full bg-fg/10" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around pt-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i === 0 ? "bg-primary" : "bg-fg/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
