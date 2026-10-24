import Link from "next/link";
import { COPY } from "@/constants/constant";
import { experienceByCompany, totalRoles } from "@/utils/content";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";

/** Short timeline: a rail and node per company, its roles as small rows. */
export default function WorkHistory() {
  const { about } = COPY.home;

  return (
    <div className="flex flex-col rounded-3xl bg-surface p-7 lg:col-span-5">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{about.historyLabel}</p>
        <span className="text-sm text-subtle">
          {totalRoles()} {about.rolesLabel}
        </span>
      </div>
      <ol className="mt-6 flex flex-col">
        {experienceByCompany.map((company, i) => (
          <li key={company.company} className="relative pb-7 pl-8 last:pb-0">
            {i < experienceByCompany.length - 1 && (
              <span aria-hidden="true" className="absolute bottom-0 left-1.75 top-5 w-px bg-line" />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1 h-3.75 w-3.75 rounded-full border-2",
                company.current ? "border-primary bg-background" : "border-line-strong bg-surface",
              )}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-display text-lg font-bold leading-none">{company.company}</p>
              {company.current && (
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {about.current}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-subtle">
              {company.period} · {company.location.split(",")[0]}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {company.roles.map((role) => (
                <li
                  key={role.role}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-xl bg-surface-hi/60 px-3.5 py-2.5 text-sm"
                >
                  <span className="font-medium">{role.role}</span>
                  <span className="text-xs text-subtle">{role.years}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <Link href="/experience" className="arrow-link mt-auto pt-7 text-sm">
        {about.fullExperience} <Icon name="arrowRight" />
      </Link>
    </div>
  );
}
