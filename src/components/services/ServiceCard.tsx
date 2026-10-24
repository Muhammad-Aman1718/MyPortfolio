import Link from "next/link";
import { COPY } from "@/constants/constant";
import { serviceContactHref } from "@/utils/contact";
import { priceOf } from "@/utils/format";
import { cn, onPrimary } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { ServiceCardProps } from "@/types/types";

/** One engagement with its price and what's included; the featured one is solid crimson. */
export default function ServiceCard({ service }: ServiceCardProps) {
  const on = service.featured;
  const { services } = COPY;

  return (
    <article className={cn("flex flex-col rounded-3xl p-7 md:p-8", onPrimary(on, "bg-primary text-on-primary", "bg-surface"))}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-sm font-medium", onPrimary(on, "text-white", "text-subtle"))}>{service.engagement}</span>
        {on && <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-xs font-medium">{services.featuredBadge}</span>}
      </div>
      <h2 className="mt-6 font-display text-[26px] font-bold leading-tight tracking-tight">{service.name}</h2>
      <p className={cn("mt-3 leading-relaxed", onPrimary(on, "text-white", "text-muted"))}>{service.description}</p>
      <p className="mt-6 font-display text-4xl font-bold tracking-tight">
        {priceOf(service.from)}
        <span className={cn("ml-2 align-middle text-sm font-medium tracking-normal", onPrimary(on, "text-white", "text-subtle"))}>
          {services.starting}
        </span>
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span className={onPrimary(on, "text-white", "text-primary")}>
              <Icon name="check" className="h-4 w-4 shrink-0" strokeWidth={2} />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={serviceContactHref(service.name)}
          className={onPrimary(on, "btn-inverse w-full justify-center", "btn-secondary w-full")}
        >
          {services.discuss} <Icon name="arrowRight" />
        </Link>
      </div>
    </article>
  );
}
