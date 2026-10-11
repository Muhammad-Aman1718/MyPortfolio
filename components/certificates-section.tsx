import Reveal from "./reveal";
import SectionHeader from "./section-header";
import { certificates } from "@/lib/data";

/** Certifications — card grid with issuer, year, and verification link. */
export default function CertificatesSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
      <SectionHeader
        eyebrow="certifications"
        title="Certified, verified"
        description="Credentials that back the work — every one links to its verification page."
      />
      <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((c) => (
          <a
            key={c.id}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="card group flex flex-col p-6"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-secondary">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M9 14.5 7.5 22l4.5-2.5L16.5 22 15 14.5" />
                </svg>
              </span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted transition-colors duration-150 group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-space)] text-base font-medium leading-snug">
              {c.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{c.issuer}</p>
            <p className="mt-auto pt-4 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              {c.year} · {c.id}
            </p>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
