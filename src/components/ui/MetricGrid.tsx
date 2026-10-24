import { cn } from "@/utils/style";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import type { MetricGridProps } from "@/types/types";

/** Outcome numbers in a hairline grid; each counts up as it enters. */
export default function MetricGrid({ metrics, size = "md" }: MetricGridProps) {
  return (
    <Reveal
      variant="fade-up"
      stagger
      className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
    >
      {metrics.map((metric) => (
        <div key={metric.label} className={size === "lg" ? "bg-surface p-6" : "bg-surface p-5"}>
          <CountUp
            value={metric.value}
            prefix={metric.prefix}
            suffix={metric.suffix}
            className={cn(
              "block font-display font-semibold tracking-tight text-primary",
              size === "lg" ? "text-4xl md:text-5xl" : "text-3xl",
            )}
          />
          <p className={cn("text-sm text-muted", size === "lg" ? "mt-2" : "mt-1.5")}>{metric.label}</p>
        </div>
      ))}
    </Reveal>
  );
}
