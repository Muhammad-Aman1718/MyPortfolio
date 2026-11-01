import Image from "next/image";
import { COPY, UI } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import TagList from "@/components/ui/TagList";
import ToolLogo from "@/components/ui/ToolLogo";
import type { ClientCaseStudyCardProps } from "@/types/types";

/** One client project: problem, build, role and result, with store badges when it's live. */
export default function ClientCaseStudyCard({ study }: ClientCaseStudyCardProps) {
  const copy = COPY.services.caseStudies;
  const cover = study.screenshots?.[0];
  const facts = [
    { label: copy.problem, value: study.problem },
    { label: copy.built, value: study.built },
    { label: copy.role, value: study.role },
    { label: copy.result, value: study.result },
  ].filter((fact) => fact.value);
  const stores = [
    { href: study.appStoreUrl, label: copy.appStore, logo: "appstore" },
    { href: study.playStoreUrl, label: copy.playStore, logo: "googleplay" },
  ].filter((store) => store.href);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-surface">
      {cover && (
        <div className="relative aspect-16/10">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            quality={UI.showcaseQuality}
            sizes="(min-width: 1024px) 400px, 94vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="eyebrow">{study.clientType}</p>
        <h3 className="mt-3 font-display text-[24px] font-bold leading-tight tracking-tight">{study.title}</h3>
        <dl className="mt-5 flex flex-col gap-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.08em] text-subtle">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <TagList tags={study.stack} label={copy.stack} className="mt-6 gap-1.5" />
        {stores.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {stores.map((store) => (
              <a
                key={store.label}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-surface-hi px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-surface-hover"
              >
                <ToolLogo tool={{ name: store.label, logo: store.logo }} size={16} />
                {store.label}
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
