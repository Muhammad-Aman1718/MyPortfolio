import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import ScrollLine from "@/components/scroll-line";
import SplitText from "@/components/split-text";
import { DownloadIcon } from "@/components/icons";
import { experience } from "@/lib/data";

export const metadata: Metadata = { title: "Experience — Hafiz" };

export default function Experience() {
  return (
    <div className="container-site page-top pb-16">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-enter="rise" className="eyebrow">{"// experience"}</p>
          <h1 className="h-display mt-4 max-w-[16ch] text-[40px] md:text-[60px]">
            <SplitText text="Eight years, shipped and measured" enter="skew" step={55} delay={100} />
          </h1>
          <p data-enter="rise" style={{ "--d": 600 } as React.CSSProperties} className="mt-4 max-w-[60ch] text-muted">
            Every bullet below is an outcome, not a responsibility.
          </p>
        </div>
        <div data-enter="pop" style={{ "--d": 750 } as React.CSSProperties}>
          <a href="/hafiz-resume.pdf" download className="btn-secondary">
            Download resume {DownloadIcon}
          </a>
        </div>
      </header>

      {/* Rail fills with scroll; each role's meta column stays pinned while its details pass */}
      <div className="relative mt-12 md:mt-14">
        <ScrollLine className="bottom-0 left-[5px] top-2 w-px md:left-[calc(33.333%-1px)]" />
        {experience.map((e) => (
          <article key={e.company} className="relative grid gap-4 pb-12 pl-9 last:pb-0 md:grid-cols-3 md:gap-0 md:pl-0">
            <span
              className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-background md:left-[calc(33.333%-6px)] ${
                e.current ? "pulse-dot !bg-primary" : ""
              }`}
            />
            <Reveal variant="fade" className="md:pr-10">
              <div className="md:sticky md:top-28">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-accent">{e.years}</p>
                  {e.current && <span className="pill !text-xs">current</span>}
                </div>
                <p className="mt-2 font-medium">{e.company}</p>
                <p className="mt-0.5 text-sm text-muted">{e.location}</p>
              </div>
            </Reveal>
            <div className="md:col-span-2 md:pl-12">
              <Reveal variant="slide-right">
                <h2 className="font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[28px]">
                  {e.role}
                </h2>
              </Reveal>
              <Reveal as="ul" variant="fade-up" stagger each={0.08} delay={0.15} className="mt-5 flex flex-col gap-3">
                {e.bullets.map((b) => (
                  <li key={b} className="card flex max-w-[68ch] gap-3 p-4 text-fg/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </Reveal>
              <Reveal variant="scale" stagger each={0.05} delay={0.3} className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
