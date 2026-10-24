import { COPY } from "@/constants/constant";
import TagList from "@/components/ui/TagList";
import type { StackListProps } from "@/types/types";

/** "stack" label over the project's tech pills. */
export default function StackList({ stack, className }: StackListProps) {
  return (
    <div className={className}>
      <p className="font-mono text-xs text-muted">{COPY.project.stack}</p>
      <TagList tags={stack} className="mt-4 gap-1.5" />
    </div>
  );
}
