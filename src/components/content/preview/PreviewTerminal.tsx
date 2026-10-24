import { TERMINAL_LINES } from "@/constants/constant";
import { fillTemplate, slugify } from "@/utils/format";
import { cn } from "@/utils/style";
import PreviewChrome from "./PreviewChrome";
import type { PreviewProps } from "@/types/types";

/** Health-check terminal mock-up for backend projects. */
export default function PreviewTerminal({ name }: PreviewProps) {
  const slug = slugify(name);

  return (
    <div className="flex h-[74%] w-[84%] flex-col overflow-hidden rounded-xl bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <PreviewChrome label="zsh — prod" />
      <div className="flex flex-1 flex-col gap-1.5 p-4 font-mono text-[11px] leading-tight">
        {TERMINAL_LINES.map((line) => (
          <p key={line.text} className={cn("truncate", line.tone)}>
            {fillTemplate(line.text, { slug })}
          </p>
        ))}
        <span className="mt-1 h-3 w-1.5 animate-pulse bg-primary" />
      </div>
    </div>
  );
}
