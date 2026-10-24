"use client";

import Link from "next/link";
import { COPY } from "@/constants/constant";
import useServicesStack from "@/hooks/useServicesStack";
import { pad2 } from "@/utils/format";
import { cn, onPrimary } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { ServicesStackProps } from "@/types/types";

/**
 * Sticky stacking cards: each card pins a little lower than the last, so they
 * pile up as you scroll. The card on top of the pile turns solid crimson.
 */
export default function ServicesStack({ services }: ServicesStackProps) {
  const { listRef, active } = useServicesStack();

  return (
    <ol ref={listRef} className="flex flex-col gap-4 md:gap-6">
      {services.map((service, i) => {
        const on = i === active;
        const soft = onPrimary(on, "text-white", "text-subtle");
        return (
          <li
            key={service.name}
            style={{ top: `calc(7rem + ${i * 1.25}rem)` }}
            className={cn(
              "sticky flex min-h-75 flex-col justify-between rounded-3xl p-7 transition-colors duration-500 md:p-9",
              onPrimary(on, "bg-primary text-on-primary", "bg-surface text-fg"),
            )}
          >
            <div className="flex items-start justify-between gap-6">
              <span className={cn("text-sm font-medium transition-colors duration-500", soft)}>{pad2(i + 1)}</span>
              <span className={cn("text-sm transition-colors duration-500", soft)}>{service.from}</span>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
                {service.name}
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-[46ch] leading-relaxed transition-colors duration-500",
                  onPrimary(on, "text-white", "text-muted"),
                )}
              >
                {service.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.name} ${COPY.services.includes}`}>
                {service.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors duration-500",
                      onPrimary(on, "bg-black/15 text-white", "bg-surface-hi text-muted"),
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className={cn(
                  "mt-7 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300",
                  onPrimary(on, "text-white underline-offset-4 hover:underline", "text-fg hover:text-muted"),
                )}
              >
                {COPY.services.included} <Icon name="arrowUpRight" />
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
