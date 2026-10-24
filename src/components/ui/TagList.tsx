import { cn } from "@/utils/style";
import type { TagListProps } from "@/types/types";

/** Row of grey pills (tech stack, topics). */
export default function TagList({ tags, label, className }: TagListProps) {
  return (
    <ul className={cn("flex flex-wrap", className ?? "gap-1.5")} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="pill">
          {tag}
        </li>
      ))}
    </ul>
  );
}
