import { cn } from "@/utils/style";
import type { FactListProps } from "@/types/types";

/** Label/value tiles (quick facts, project details). */
export default function FactList({ facts, className }: FactListProps) {
  return (
    <dl className={cn("grid grid-cols-2 gap-3", className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-[20px] bg-surface p-4">
          <dt className="text-xs text-subtle">{fact.label}</dt>
          <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
