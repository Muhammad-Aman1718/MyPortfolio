"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Tool } from "@/lib/data";

type Group = { name: string; context: string; icon: string; items: Tool[] };

const monogram = (t: string) =>
  t
    .split(/[\s./-]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Tabbed skills index: a numbered list of groups (the active one goes crimson)
 * beside a panel of that group's tools. On phones the list becomes a swipeable
 * tab row above the panel.
 */
export default function SkillsExplorer({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  const select = (i: number) => setActive(i);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    // Arrow keys move between tabs (WAI-ARIA tabs pattern)
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const n = (i + next + groups.length) % groups.length;
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div
        role="tablist"
        aria-label="Skill groups"
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((grp, i) => {
          const on = i === active;
          return (
            <button
              key={grp.name}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex shrink-0 items-center gap-4 rounded-full px-5 py-3 text-left transition-colors duration-300 lg:rounded-[20px] lg:px-6 lg:py-5 ${
                on ? "bg-primary text-on-primary" : "bg-surface text-fg hover:bg-surface-hi"
              }`}
            >
              <span className={`hidden text-sm font-medium lg:inline ${on ? "text-white" : "text-subtle"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-[family-name:var(--font-space)] text-[15px] font-bold tracking-tight lg:flex-1 lg:text-2xl">{grp.name}</span>
              <span
                className={`hidden h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-bold lg:flex ${
                  on ? "bg-black/20 text-white" : "bg-surface-hi text-muted"
                }`}
              >
                {grp.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-7">
        {/* Every panel is in the HTML (inactive ones `hidden`), so crawlers see the full skill list */}
        {groups.map((g, gi) => (
        <div
          key={g.name}
          id={`${id}-panel-${gi}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${gi}`}
          hidden={gi !== active}
          className="panel-in rounded-[24px] bg-surface p-6 sm:p-8 lg:sticky lg:top-28"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-medium text-subtle">
                {String(gi + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")} · {g.items.length} tools
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-space)] text-[30px] font-bold leading-none tracking-tight sm:text-[38px]">{g.name}</h2>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">{g.context}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={g.icon} />
              </svg>
            </span>
          </div>

          <ul className="stagger-in mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {g.items.map((t, i) => (
              <li
                key={t.name}
                style={{ "--i": i } as React.CSSProperties}
                className="flex items-center gap-3 rounded-[16px] bg-surface-hi p-3 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-background font-[family-name:var(--font-space)] text-[11px] font-bold text-muted"
                >
                  {/* Brand logo from Simple Icons (self-hosted in /public/logos); monogram when none exists */}
                  {t.logo ? (
                    <Image src={`/logos/${t.logo}.svg`} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
                  ) : (
                    monogram(t.name)
                  )}
                </span>
                <span className="min-w-0 text-sm font-medium leading-tight">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
        ))}
      </div>
    </div>
  );
}
