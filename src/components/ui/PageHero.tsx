import { enter } from "@/utils/style";
import SplitText from "./SplitText";
import type { PageHeroProps } from "@/types/types";

/**
 * Inner-page opener: quiet eyebrow, a large two-tone H1, an intro line and
 * optional actions. Animates in pure CSS on load.
 */
export default function PageHero({ eyebrow, title, highlight, description, children }: PageHeroProps) {
  return (
    <header className="container-site page-top pb-10 md:pb-14">
      <p {...enter("rise")} className="eyebrow">
        {eyebrow}
      </p>
      <h1 className="h-display mt-4 max-w-[16ch] text-[40px] font-bold sm:text-[52px] md:text-[64px] lg:text-[76px]">
        <SplitText text={title} enter="rise" step={60} delay={100} accent={highlight} />
      </h1>
      {(description || children) && (
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {description && (
            <p {...enter("rise", 500)} className="max-w-[58ch] leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          )}
          {children && (
            <div {...enter("pop", 650)} className="flex shrink-0 flex-wrap gap-3">
              {children}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
