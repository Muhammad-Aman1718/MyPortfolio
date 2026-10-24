import { COPY, CORE_TOOLS, UI } from "@/constants/constant";
import { skillStats } from "@/utils/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/** The tools reached for most, set as big editorial type, with the headline numbers. */
export default function DailyStack() {
  const { daily } = COPY.skills;

  return (
    <section className="container-site section">
      <SectionHeader eyebrow={daily.eyebrow} title={daily.title} highlight={daily.highlight} motion="fade" />
      <Reveal variant="fade" className="mt-8 rounded-3xl bg-surface p-6 sm:p-9">
        <p className="font-display text-[26px] font-bold leading-tight tracking-tight sm:text-[34px] lg:text-[42px]">
          {CORE_TOOLS.map((tool, i) => (
            <span key={tool} className={i % UI.dailyStackAccentEvery === 0 ? "text-fg" : "text-muted"}>
              {tool}
              {i < CORE_TOOLS.length - 1 && (
                <span aria-hidden="true" className="mx-2 text-primary sm:mx-3">
                  /
                </span>
              )}{" "}
            </span>
          ))}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {skillStats().map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-surface-hi p-4">
              <p className="font-display text-[28px] font-bold leading-none">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1.5 text-[13px] text-subtle">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
