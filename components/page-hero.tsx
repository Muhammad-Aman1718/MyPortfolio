import SplitText from "./split-text";

/**
 * Inner-page opener: quiet eyebrow, a large two-tone H1 (highlighted words go
 * crimson), an intro line and optional actions. Animates in pure CSS on load.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Words of the title (exact match) set in crimson */
  highlight?: string[];
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-site page-top pb-10 md:pb-14">
      <p data-enter="rise" className="eyebrow">
        {eyebrow}
      </p>
      <h1 className="h-display mt-4 max-w-[16ch] text-[40px] font-bold sm:text-[52px] md:text-[64px] lg:text-[76px]">
        <SplitText
          text={title}
          enter="rise"
          step={60}
          delay={100}
          accent={highlight}
        />
      </h1>
      {(description || children) && (
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {description && (
            <p
              data-enter="rise"
              style={{ "--d": 500 } as React.CSSProperties}
              className="max-w-[58ch] leading-relaxed text-muted md:text-lg"
            >
              {description}
            </p>
          )}
          {children && (
            <div
              data-enter="pop"
              style={{ "--d": 650 } as React.CSSProperties}
              className="flex shrink-0 flex-wrap gap-3"
            >
              {children}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
