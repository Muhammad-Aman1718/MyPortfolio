import Reveal from "./reveal";
import SectionHeader from "./section-header";
import { ArrowUpRight } from "./icons";
import { certificates } from "@/lib/data";

/** Certifications — compact verification rows that flip up into place. */
export default function CertificatesSection() {
  return (
    <section className="container-site section">
      <SectionHeader
        eyebrow="certifications"
        title="Certified, verified"
        description="Credentials that back the work — every one links to its verification page."
        motion="wipe"
      />
      <Reveal variant="slide-left" stagger each={0.08} className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
        {certificates.map((c) => (
          <a
            key={c.id}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="card card-hover spotlight group flex items-center gap-4 p-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-secondary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="9" r="6" />
                <path d="M9 14.5 7.5 22l4.5-2.5L16.5 22 15 14.5" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-[family-name:var(--font-space)] font-medium leading-snug">{c.name}</span>
              <span className="mt-1 block text-sm text-muted">
                {c.issuer}
                <span className="font-[family-name:var(--font-jetbrains)] text-xs"> · {c.year} · {c.id}</span>
              </span>
            </span>
            <span className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
              <ArrowUpRight />
              <span className="sr-only">(verify, opens in new tab)</span>
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
