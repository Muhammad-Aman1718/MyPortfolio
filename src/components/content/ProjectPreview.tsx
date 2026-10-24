import { cn } from "@/utils/style";
import PreviewBrowser from "./preview/PreviewBrowser";
import PreviewPhone from "./preview/PreviewPhone";
import PreviewTerminal from "./preview/PreviewTerminal";
import type { ProjectPreviewProps } from "@/types/types";

/**
 * Stylised product mock-up per project type — stands in for screenshots and
 * gives each card a real visual instead of its name in a box. Pure markup.
 */
export default function ProjectPreview({ name, type, className = "relative" }: ProjectPreviewProps) {
  const Preview = type === "Mobile" ? PreviewPhone : type === "Backend" ? PreviewTerminal : PreviewBrowser;

  return (
    <div className={cn("flex items-center justify-center overflow-hidden bg-surface", className)}>
      <div
        aria-hidden="true"
        className="relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-smooth group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
      >
        <Preview name={name} />
      </div>
    </div>
  );
}
