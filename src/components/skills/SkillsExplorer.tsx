"use client";

import { COPY } from "@/constants/constant";
import useSkillsExplorer from "@/hooks/useSkillsExplorer";
import { pad2 } from "@/utils/format";
import { cn, onPrimary } from "@/utils/style";
import SkillPanel from "./SkillPanel";
import type { SkillsExplorerProps } from "@/types/types";

/**
 * Tabbed skills index: a numbered list of groups (the active one goes crimson)
 * beside a panel of that group's tools. On phones the list becomes a swipeable
 * tab row above the panel.
 */
export default function SkillsExplorer({ groups }: SkillsExplorerProps) {
  const { active, select, onKeyDown, tabId, panelId } = useSkillsExplorer(groups.length);

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div
        role="tablist"
        aria-label={COPY.skills.groupsLabel}
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((group, i) => {
          const on = i === active;
          return (
            <button
              key={group.name}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={panelId(i)}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "group flex shrink-0 items-center gap-4 rounded-full px-5 py-3 text-left transition-colors duration-300 lg:rounded-[20px] lg:px-6 lg:py-5",
                onPrimary(on, "bg-primary text-on-primary", "bg-surface text-fg hover:bg-surface-hi"),
              )}
            >
              <span className={cn("hidden text-sm font-medium lg:inline", onPrimary(on, "text-white", "text-subtle"))}>
                {pad2(i + 1)}
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight lg:flex-1 lg:text-2xl">{group.name}</span>
              <span
                className={cn(
                  "hidden h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-bold lg:flex",
                  onPrimary(on, "bg-black/20 text-white", "bg-surface-hi text-muted"),
                )}
              >
                {group.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-7">
        {/* Every panel is in the HTML (inactive ones `hidden`), so crawlers see the full skill list */}
        {groups.map((group, i) => (
          <SkillPanel
            key={group.name}
            group={group}
            index={i}
            total={groups.length}
            id={panelId(i)}
            labelledBy={tabId(i)}
            hidden={i !== active}
          />
        ))}
      </div>
    </div>
  );
}
