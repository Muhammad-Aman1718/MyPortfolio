import Link from "next/link";
import { COPY, SITE } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import Icon from "@/components/ui/Icon";
import InlineText from "@/components/ui/InlineText";
import PageHero from "@/components/ui/PageHero";
import LegalBlock from "./LegalBlock";
import type { LegalPageProps } from "@/types/types";

/**
 * Shared shell for policy pages: sticky contents on the left, the policy in a
 * readable column on the right, and a contact card to close.
 */
export default function LegalPage({ content }: LegalPageProps) {
  const { title, highlight, updated, summary, sections } = content;

  return (
    <>
      <PageHero
        eyebrow={COPY.legal.eyebrow}
        title={title}
        highlight={highlight}
        description={`${COPY.legal.lastUpdated} ${updated}.`}
      />

      <div className="container-site grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <nav aria-label={COPY.legal.onThisPage} className="rounded-3xl bg-surface p-6 lg:sticky lg:top-28">
            <p className="eyebrow">{COPY.legal.onThisPage}</p>
            <ol className="mt-4 flex flex-col gap-1">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-xl px-3 py-2 text-sm text-muted transition-colors duration-150 hover:bg-surface-hi hover:text-fg"
                  >
                    <span className="text-subtle">{pad2(i + 1)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="flex flex-col gap-4 lg:col-span-8">
          <div className="legal-body rounded-3xl bg-surface-hi p-7 text-lg leading-relaxed md:p-9">
            <p>
              <InlineText text={summary} />
            </p>
          </div>
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 rounded-3xl bg-surface p-7 md:p-9">
              <p className="text-sm font-medium text-subtle">{pad2(i + 1)}</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">{section.title}</h2>
              <div className="legal-body mt-4 flex flex-col gap-4 leading-relaxed text-muted">
                {section.blocks.map((block, j) => (
                  <LegalBlock key={j} block={block} />
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-col gap-6 rounded-3xl bg-primary p-7 text-on-primary md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="font-display text-2xl font-bold">{COPY.legal.questions}</p>
              <p className="mt-1 text-white">
                {COPY.legal.emailLead}{" "}
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                  {SITE.email}
                </a>{" "}
                {COPY.legal.replyNote}
              </p>
            </div>
            <Link href="/contact" className="btn-inverse shrink-0 self-start px-6 md:self-auto">
              {COPY.legal.contact} <Icon name="arrowRight" />
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
