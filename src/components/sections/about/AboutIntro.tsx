import Link from "next/link";
import { ABOUT_FACTS, COPY, SITE, STATS } from "@/constants/constant";
import FactList from "@/components/ui/FactList";
import Icon from "@/components/ui/Icon";
import Portrait from "@/components/ui/Portrait";
import Reveal from "@/components/ui/Reveal";
import StatCard from "@/components/ui/StatCard";

/** Portrait and quick facts beside the story and the numbers. */
export default function AboutIntro() {
  const { about } = COPY;

  return (
    <section className="container-site pb-6">
      <div className="grid gap-6 lg:grid-cols-12">
        <div data-enter="left" className="flex flex-col gap-3 lg:col-span-5">
          <div className="relative flex aspect-square items-end overflow-hidden rounded-3xl p-7 sm:aspect-4/3 lg:aspect-4/5">
            <Portrait className="absolute! inset-0" sizes="(min-width: 1024px) 40vw, 92vw" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent"
            />
            <p className="relative">
              <span className="block font-display text-2xl font-bold">{SITE.name}</span>
              <span className="text-sm text-white/80">{SITE.role}</span>
            </p>
          </div>
          <FactList facts={ABOUT_FACTS} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <Reveal variant="fade" stagger each={0.08} start="top 95%" className="rounded-3xl bg-surface p-7 md:p-10">
            <p className="text-xl leading-relaxed md:text-2xl">{about.lead}</p>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "mt-6 leading-relaxed text-muted" : "mt-4 leading-relaxed text-muted"}>
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {about.primaryCta} <Icon name="arrowRight" />
              </Link>
              <Link href="/experience" className="btn-secondary">
                {about.secondaryCta}
              </Link>
            </div>
          </Reveal>

          <Reveal variant="scale" stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
