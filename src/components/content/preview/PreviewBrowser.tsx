import { PREVIEW_BARS } from "@/constants/constant";
import { slugify } from "@/utils/format";
import { cn } from "@/utils/style";
import PreviewChrome from "./PreviewChrome";
import type { PreviewProps } from "@/types/types";

/** Dashboard-in-a-browser mock-up for web projects. */
export default function PreviewBrowser({ name }: PreviewProps) {
  return (
    <div className="flex h-[78%] w-[86%] flex-col overflow-hidden rounded-xl bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <PreviewChrome label={`${slugify(name)}.app`} />
      <div className="flex flex-1 gap-3 p-3">
        <div className="hidden w-1/5 flex-col gap-1.5 sm:flex">
          <span className="h-1.5 w-3/4 rounded-full bg-primary" />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-fg/10"
              style={{ width: `${90 - i * 12}%` }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-fg/5 p-2">
                <span className="block h-1 w-1/2 rounded-full bg-fg/15" />
                <span
                  className={cn(
                    "mt-1.5 block h-2 w-3/4 rounded-full",
                    i === 0 ? "bg-primary" : "bg-fg/25",
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-md bg-fg/3 p-2">
            {PREVIEW_BARS.map((height, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px] bg-fg/20 last:bg-primary"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
