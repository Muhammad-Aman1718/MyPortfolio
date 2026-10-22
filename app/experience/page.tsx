import Link from "next/link";
import Reveal from "@/components/reveal";
import PageHero from "@/components/page-hero";
import CtaPanel from "@/components/cta-panel";
import JsonLd from "@/components/json-ld";
import { ArrowIcon } from "@/components/icons";
import { experience, experienceByCompany } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Experience",
  description:
    "Work experience of Muhammad Aman — Mobile App Developer at SIGMAKODE, Full-Stack Developer at TECHLOSET and Frontend Developer at CodeeTechs, Faisalabad.",
  path: "/experience",
});

export default function Experience() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            "@id": `${site.url}/#person`,
            name: site.name,
            hasOccupation: experience.map((e) => ({
              "@type": "Occupation",
              name: e.role,
              occupationLocation: { "@type": "City", name: e.location },
              skills: e.tags.join(", "),
            })),
          },
        }}
      />

      <PageHero
        eyebrow="Experience"
        title="Where I've built."
        highlight={["built."]}
        description="Full-stack engineering meets cross-platform app development — the teams I've shipped with and what I did there."
      >
        <Link href="/contact" className="btn-primary">
          Hire me {ArrowIcon}
        </Link>
      </PageHero>

      <div className="container-site pb-6">
        <ol className="flex flex-col gap-4">
          {experienceByCompany.map((c) => {
            const on = c.current;
            return (
              <li key={c.company}>
                <Reveal
                  variant="fade-up"
                  className={`grid gap-6 rounded-[24px] p-6 sm:p-7 md:grid-cols-12 md:gap-10 md:p-10 ${
                    on ? "bg-primary text-on-primary" : "bg-surface"
                  }`}
                >
                  {/* Company — named once, however many roles */}
                  <div className="md:col-span-4">
                    <div className="md:sticky md:top-28">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-medium ${on ? "text-white" : "text-subtle"}`}>{c.period}</span>
                        {on && <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-xs font-medium">Current</span>}
                      </div>
                      <h2 className="mt-3 font-[family-name:var(--font-space)] text-[26px] font-bold leading-none tracking-tight md:text-[32px]">
                        {c.company}
                      </h2>
                      <p className={`mt-2 text-sm ${on ? "text-white" : "text-muted"}`}>{c.location}</p>
                      {c.roles.length > 1 && (
                        <p className={`mt-1 text-sm ${on ? "text-white" : "text-subtle"}`}>{c.roles.length} roles</p>
                      )}
                    </div>
                  </div>

                  {/* Roles, newest first, on a short rail */}
                  <ol className="flex flex-col gap-8 md:col-span-8">
                    {c.roles.map((e, ri) => (
                      <li key={e.role} className="relative pl-6">
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-2 h-2.5 w-2.5 rounded-full ${on ? "bg-white" : e.current ? "bg-primary" : "bg-subtle"}`}
                        />
                        {ri < c.roles.length - 1 && (
                          <span aria-hidden="true" className={`absolute bottom-[-2rem] left-[4.5px] top-6 w-px ${on ? "bg-white/50" : "bg-line-strong"}`} />
                        )}
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="font-[family-name:var(--font-space)] text-xl font-bold tracking-tight md:text-2xl">{e.role}</h3>
                          <span className={`text-sm font-medium ${on ? "text-white" : "text-subtle"}`}>{e.years}</span>
                        </div>
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {e.bullets.map((b) => (
                            <li key={b} className={`max-w-[68ch] leading-relaxed ${on ? "text-white" : "text-muted"}`}>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                          {e.tags.map((t) => (
                            <li
                              key={t}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${on ? "bg-black/20 text-white" : "bg-surface-hi text-muted"}`}
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      <CtaPanel title="Need a developer on your team?" />
    </>
  );
}
