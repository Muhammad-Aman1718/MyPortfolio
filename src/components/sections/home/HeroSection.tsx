import Link from "next/link";
import { COPY, HERO_PLATFORMS, HERO_STACK, SITE } from "@/constants/constant";
import { enter } from "@/utils/style";
import Magnetic from "@/components/ui/Magnetic";
import ToolChip from "@/components/ui/ToolChip";
import ToolLogo from "@/components/ui/ToolLogo";

/** Centred hero: platform badge, the promise, intro, actions and the stack. */
export default function HeroSection() {
  const { home } = COPY;

  return (
    <section className="container-site flex flex-col items-center pb-14 pt-32 text-center md:pb-20 md:pt-40">
      <p
        {...enter("rise")}
        className="inline-flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-muted"
      >
        <span className="flex gap-1" aria-hidden="true">
          {HERO_PLATFORMS.map((platform) => (
            <span key={platform.name} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-hi">
              <ToolLogo tool={platform} size={14} />
            </span>
          ))}
        </span>
        {home.badge}
      </p>

      <h1 className="h-display mt-7 max-w-[15ch] text-[44px] font-bold sm:text-[64px] lg:text-[84px]">
        <span className="sr-only">
          {SITE.name}, {SITE.role} —{" "}
        </span>
        <span className="mask-line">
          <span {...enter("mask", 120)}>{home.titleLead}</span>
        </span>{" "}
        <span className="mask-line">
          <span {...enter("mask", 240)}>
            <em>{home.titleAccent}</em>
          </span>
        </span>
      </h1>

      <p {...enter("rise", 450)} className="mt-6 max-w-[54ch] leading-relaxed text-muted md:text-lg">
        {home.intro}
      </p>

      <div {...enter("pop", 600)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Magnetic>
          <Link href="/contact" className="btn-primary">
            {home.primaryCta}
          </Link>
        </Magnetic>
        <a href="#work" className="btn-secondary">
          {home.secondaryCta}
        </a>
      </div>

      <div {...enter("rise", 750)} className="mt-12 flex flex-col items-center gap-3">
        <span className="eyebrow">{home.builtWith}</span>
        <ul className="flex flex-wrap justify-center gap-2">
          {HERO_STACK.map((tool) => (
            <ToolChip key={tool.name} tool={tool} className="bg-surface hover:bg-surface-hi" />
          ))}
        </ul>
      </div>
    </section>
  );
}
