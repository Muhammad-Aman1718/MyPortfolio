import { cn } from "@/utils/style";
import CountUp from "./CountUp";
import type { StatCardProps } from "@/types/types";

/** Big number + label tile; `animated` counts the number up on scroll. */
export default function StatCard({ stat, animated = false, className }: StatCardProps) {
  const numberClass = "block font-display text-[34px] font-bold leading-none tracking-tight";

  return (
    <div className={cn("rounded-[20px] bg-surface p-5", className)}>
      {animated ? (
        <CountUp value={stat.value} suffix={stat.suffix} className={numberClass} />
      ) : (
        <p className={numberClass}>
          {stat.value}
          {stat.suffix}
        </p>
      )}
      <p className="mt-2 text-[13px] text-subtle">{stat.label}</p>
    </div>
  );
}
