import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import PageHero from "@/components/page-hero";
import FaqList from "@/components/faq-list";
import CtaPanel from "@/components/cta-panel";
import JsonLd from "@/components/json-ld";
import { ArrowIcon } from "@/components/icons";
import { services, faqs } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Hire Muhammad Aman for React Native app development, native iOS and Android features, and app performance rescue — fixed scope, weekly builds.",
  path: "/services",
});

const steps = [
  { title: "Discover", text: "A call to understand the problem, constraints, and what success means." },
  { title: "Scope", text: "Architecture, timeline and a fixed estimate you can hold me to." },
  { title: "Build", text: "Weekly demos, honest progress reports, production-quality code." },
  { title: "Support", text: "Launch help and a support window included in every engagement." },
];

const CheckIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Services() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name },
              areaServed: "Worldwide",
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Services"
        title="What I can build for you."
        highlight={["build", "for", "you."]}
        description="Three ways to work together — each scoped up front, with a clear price and a working build every week."
      />

      {/* Engagements — the featured one is the solid crimson card */}
      <div className="container-site pb-6">
        <Reveal variant="fade-up" stagger each={0.08} start="top 95%" className="grid gap-4 lg:grid-cols-3">
          {services.map((s) => {
            const on = s.featured;
            return (
              <article
                key={s.name}
                className={`flex flex-col rounded-[24px] p-7 md:p-8 ${on ? "bg-primary text-on-primary" : "bg-surface"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-sm font-medium ${on ? "text-white" : "text-subtle"}`}>{s.engagement}</span>
                  {on && <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-xs font-medium">Most requested</span>}
                </div>
                <h2 className="mt-6 font-[family-name:var(--font-space)] text-[26px] font-bold leading-tight tracking-tight">{s.name}</h2>
                <p className={`mt-3 leading-relaxed ${on ? "text-white" : "text-muted"}`}>{s.description}</p>
                <p className="mt-6 font-[family-name:var(--font-space)] text-4xl font-bold tracking-tight">
                  {s.from.replace("from ", "")}
                  <span className={`ml-2 align-middle text-sm font-medium tracking-normal ${on ? "text-white" : "text-subtle"}`}>starting</span>
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className={on ? "text-white" : "text-primary"}>{CheckIcon}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href={`/contact?service=${encodeURIComponent(s.name)}`}
                    className={
                      on
                        ? "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-background font-medium text-fg transition-colors duration-200 hover:bg-surface"
                        : "btn-secondary w-full"
                    }
                  >
                    Discuss this {ArrowIcon}
                  </Link>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>

      {/* Process */}
      <section className="container-site section">
        <SectionHeader eyebrow="Process" title="How a project runs." highlight={["runs."]} motion="fade" />
        <Reveal as="ol" variant="scale" stagger each={0.08} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex min-h-[200px] flex-col justify-between rounded-[24px] bg-surface p-6">
              <span className="font-[family-name:var(--font-space)] text-5xl font-bold leading-none tracking-tight text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-[family-name:var(--font-space)] text-xl font-bold">{s.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{s.text}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-site section">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader eyebrow="FAQ" title="Before you ask." highlight={["ask."]} motion="fade" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaPanel email={false} />
    </>
  );
}
