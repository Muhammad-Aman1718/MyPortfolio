import { COPY } from "@/constants/constant";
import { experienceByCompany } from "@/utils/content";
import { pad2 } from "@/utils/format";
import { cn, onPrimary } from "@/utils/style";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/** Companies oldest to newest; the current one is the crimson card. */
export default function JourneySection() {
  const { journey } = COPY.about;
  const story = [...experienceByCompany].reverse();

  return (
    <section className="container-site section">
      <SectionHeader eyebrow={journey.eyebrow} title={journey.title} highlight={journey.highlight} />
      <Reveal as="ol" variant="fade-up" stagger each={0.08} className="mt-10 grid gap-3 md:grid-cols-3">
        {story.map((company, i) => {
          const on = company.current;
          return (
            <li
              key={company.company}
              className={cn(
                "flex min-h-50 flex-col justify-between gap-8 rounded-3xl p-6",
                onPrimary(on, "bg-primary text-on-primary", "bg-surface"),
              )}
            >
              <span className={cn("text-sm font-medium", onPrimary(on, "text-white", "text-subtle"))}>
                {pad2(i + 1)} · {company.period}
              </span>
              <span>
                <span className="block font-display text-2xl font-bold leading-tight">{company.company}</span>
                {/* Roles at the same company, earliest first */}
                <span className="mt-3 flex flex-col gap-1.5">
                  {[...company.roles].reverse().map((role) => (
                    <span
                      key={role.role}
                      className={cn("flex flex-wrap justify-between gap-x-3 text-sm", onPrimary(on, "text-white", "text-muted"))}
                    >
                      <span className="font-medium">{role.role}</span>
                      <span className={onPrimary(on, "text-white", "text-subtle")}>{role.years}</span>
                    </span>
                  ))}
                </span>
              </span>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
