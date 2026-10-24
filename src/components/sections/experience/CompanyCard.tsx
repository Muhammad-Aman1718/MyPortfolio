import { COPY } from "@/constants/constant";
import { cn, onPrimary } from "@/utils/style";
import Reveal from "@/components/ui/Reveal";
import RoleItem from "./RoleItem";
import type { CompanyCardProps } from "@/types/types";

/** A company named once, with its roles (newest first) on a short rail; the current one is crimson. */
export default function CompanyCard({ company }: CompanyCardProps) {
  const on = company.current;
  const { experience } = COPY;

  return (
    <li>
      <Reveal
        variant="fade-up"
        className={cn(
          "grid gap-5 rounded-3xl p-6 md:grid-cols-12 md:gap-8 md:p-8",
          onPrimary(on, "bg-primary text-on-primary", "bg-surface"),
        )}
      >
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("text-sm font-medium", onPrimary(on, "text-white", "text-subtle"))}>{company.period}</span>
              {on && <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-xs font-medium">{experience.current}</span>}
            </div>
            <h2 className="mt-3 font-display text-[24px] font-bold leading-none tracking-tight md:text-[28px]">
              {company.company}
            </h2>
            <p className={cn("mt-2 text-sm", onPrimary(on, "text-white", "text-muted"))}>{company.location}</p>
            {company.roles.length > 1 && (
              <p className={cn("mt-1 text-sm", onPrimary(on, "text-white", "text-subtle"))}>
                {company.roles.length} {experience.roles}
              </p>
            )}
          </div>
        </div>

        <ol className="flex flex-col gap-6 md:col-span-8">
          {company.roles.map((role, i) => (
            <RoleItem key={role.role} role={role} inverted={on} last={i === company.roles.length - 1} />
          ))}
        </ol>
      </Reveal>
    </li>
  );
}
