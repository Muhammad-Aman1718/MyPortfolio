import { COPY, UI } from "@/constants/constant";
import { cn, onPrimary } from "@/utils/style";
import type { RoleItemProps } from "@/types/types";

/** One role on the company's rail: title, years, two highlights and the main tags. */
export default function RoleItem({ role, inverted, last }: RoleItemProps) {
  const extraTags = role.tags.length - UI.roleTags;
  const tagClass = cn(
    "rounded-full px-3 py-1 text-xs font-medium",
    onPrimary(inverted, "bg-black/20 text-white", "bg-surface-hi text-muted"),
  );

  return (
    <li className="relative pl-6">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-2 h-2.5 w-2.5 rounded-full",
          inverted ? "bg-white" : role.current ? "bg-primary" : "bg-subtle",
        )}
      />
      {!last && (
        <span
          aria-hidden="true"
          className={cn("absolute -bottom-6 left-[4.5px] top-6 w-px", onPrimary(inverted, "bg-white/50", "bg-line-strong"))}
        />
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">{role.role}</h3>
        <span className={cn("text-sm font-medium", onPrimary(inverted, "text-white", "text-subtle"))}>{role.years}</span>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {role.bullets.slice(0, UI.roleBullets).map((bullet) => (
          <li
            key={bullet}
            className={cn("max-w-[68ch] text-[15px] leading-relaxed", onPrimary(inverted, "text-white", "text-muted"))}
          >
            {bullet}
          </li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={COPY.experience.technologies}>
        {role.tags.slice(0, UI.roleTags).map((tag) => (
          <li key={tag} className={tagClass}>
            {tag}
          </li>
        ))}
        {extraTags > 0 && <li className={tagClass}>+{extraTags}</li>}
      </ul>
    </li>
  );
}
