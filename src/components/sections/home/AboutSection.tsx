import Link from "next/link";
import { COPY, STATS } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import WorkHistory from "./WorkHistory";

/** The story and numbers beside the work history. */
export default function AboutSection() {
  const { about } = COPY.home;

  return (
    <section className="container-site section">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="rounded-3xl bg-surface p-7 md:p-9">
            <SectionHeader eyebrow={about.eyebrow} title={about.title} highlight={about.highlight} motion="blur" />
            <p className="mt-5 max-w-[60ch] leading-relaxed text-muted">{about.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="btn-secondary h-11! text-sm">
                {about.more} <Icon name="arrowRight" />
              </Link>
              <Link href="/experience" className="btn-secondary h-11! text-sm">
                {about.experience} <Icon name="arrowRight" />
              </Link>
            </div>
          </div>

          <Reveal variant="scale" stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} animated />
            ))}
          </Reveal>
        </div>

        <WorkHistory />
      </div>
    </section>
  );
}
