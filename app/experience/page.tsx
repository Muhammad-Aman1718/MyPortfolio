import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import { experience } from "@/lib/data";

export const metadata: Metadata = { title: "Experience — Hafiz" };

export default function Experience() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <Reveal stagger>
        <p className="eyebrow">{"// experience"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
          Eight years, shipped and measured
        </h1>
        <p className="mt-4 max-w-[60ch] text-muted">
          Every bullet below is an outcome, not a responsibility.
        </p>
        <a href="/hafiz-resume.pdf" download className="btn-secondary mt-8">
          Download resume
        </a>
      </Reveal>

      <div className="mt-16 border-l-2 border-line pl-8">
        {experience.map((e) => (
          <Reveal key={e.company} className="relative pb-16 last:pb-0">
            <span
              className={`absolute -left-[39px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ${
                e.current ? "pulse-dot" : ""
              }`}
            />
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{e.years}</p>
              {e.current && <span className="pill !text-[11px]">current</span>}
            </div>
            <h2 className="mt-2 font-[family-name:var(--font-space)] text-2xl font-semibold">{e.role}</h2>
            <p className="mt-1 text-muted">
              {e.company} · {e.location}
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-muted marker:text-accent">
              {e.bullets.map((b) => (
                <li key={b} className="max-w-[68ch]">{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
