/** Infinite, pausable ticker. Pure CSS; reduced motion turns it into a static wrap. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-6 px-3 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted transition-colors duration-150 hover:text-fg"
        >
          {t}
          <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden" role="region" aria-label={label}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
