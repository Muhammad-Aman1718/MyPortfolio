import { COPY } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import { staggerStyle } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import ToolLogo from "@/components/ui/ToolLogo";
import type { SkillPanelProps } from "@/types/types";

/** One skill group: heading, context line and a grid of tool tiles. */
export default function SkillPanel({ group, index, total, id, labelledBy, hidden }: SkillPanelProps) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={hidden}
      className="panel-in rounded-3xl bg-surface p-6 sm:p-8 lg:sticky lg:top-28"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-subtle">
            {pad2(index + 1)} / {pad2(total)} · {group.items.length} {COPY.skills.tools}
          </p>
          <h2 className="mt-2 font-display text-[30px] font-bold leading-none tracking-tight sm:text-[38px]">
            {group.name}
          </h2>
          <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">{group.context}</p>
        </div>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
          aria-hidden="true"
        >
          <Icon path={group.icon} className="h-5 w-5" strokeWidth={1.7} />
        </span>
      </div>

      <ul className="stagger-in mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {group.items.map((tool, i) => (
          <li key={tool.name} style={staggerStyle(i)} className="flex items-center gap-3 rounded-2xl bg-surface-hi p-3 pr-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-background"
            >
              <ToolLogo tool={tool} size={20} className="text-[11px] text-muted" />
            </span>
            <span className="min-w-0 text-sm font-medium leading-tight">{tool.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
