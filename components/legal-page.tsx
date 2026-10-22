import Link from "next/link";
import PageHero from "./page-hero";
import { ArrowIcon } from "./icons";
import { site } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/**
 * Shared shell for policy pages: sticky contents on the left, the policy in a
 * readable column on the right, and a contact card to close.
 */
export default function LegalPage({
  eyebrow,
  title,
  highlight,
  updated,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  updated: string;
  summary: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={`Last updated ${updated}.`} />

      <div className="container-site grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <nav aria-label="On this page" className="rounded-[24px] bg-surface p-6 lg:sticky lg:top-28">
            <p className="eyebrow">On this page</p>
            <ol className="mt-4 flex flex-col gap-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-3 rounded-[12px] px-3 py-2 text-sm text-muted transition-colors duration-150 hover:bg-surface-hi hover:text-fg"
                  >
                    <span className="text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="flex flex-col gap-4 lg:col-span-8">
          <div className="rounded-[24px] bg-surface-hi p-7 text-lg leading-relaxed md:p-9">{summary}</div>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 rounded-[24px] bg-surface p-7 md:p-9">
              <p className="text-sm font-medium text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-[family-name:var(--font-space)] text-2xl font-bold tracking-tight">{s.title}</h2>
              <div className="legal-body mt-4 flex flex-col gap-4 leading-relaxed text-muted">{s.body}</div>
            </section>
          ))}

          <div className="flex flex-col gap-6 rounded-[24px] bg-primary p-7 text-on-primary md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="font-[family-name:var(--font-space)] text-2xl font-bold">Questions about this policy?</p>
              <p className="mt-1 text-white">
                Email{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>{" "}
                — I reply within a few working days.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-background px-6 font-medium text-fg transition-colors duration-200 hover:bg-surface md:self-auto"
            >
              Contact {ArrowIcon}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
