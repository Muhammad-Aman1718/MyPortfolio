import { COMPANIES, COPY, CORE_TOOLS } from "@/constants/constant";
import { withLogos } from "@/utils/content";
import { enter } from "@/utils/style";
import Marquee from "@/components/ui/Marquee";

/** Social proof: the teams the work shipped with, beside a ticker of tools. */
export default function ProofStrip() {
  return (
    <section className="container-site" aria-label={COPY.home.proofLabel}>
      <div
        {...enter("fade", 900)}
        className="flex flex-col gap-5 rounded-3xl bg-surface p-5 md:flex-row md:items-center md:gap-8 md:p-6"
      >
        <div className="shrink-0">
          <p className="eyebrow">{COPY.home.shippedWith}</p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
            {COMPANIES.map((company) => (
              <li key={company} className="font-display text-lg font-bold tracking-tight text-muted">
                {company}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 flex-1">
          <Marquee items={withLogos(CORE_TOOLS)} label={COPY.home.tickerLabel} />
        </div>
      </div>
    </section>
  );
}
