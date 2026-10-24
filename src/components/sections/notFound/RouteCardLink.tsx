import Link from "next/link";
import { delayStyle } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { RouteCardLinkProps } from "@/types/types";

/** A likely destination on the 404 page. */
export default function RouteCardLink({ route, delay }: RouteCardLinkProps) {
  return (
    <Link
      href={route.href}
      data-enter="rise"
      style={delayStyle(delay)}
      className="group flex items-center justify-between gap-4 rounded-[20px] bg-surface p-5 transition-colors duration-200 hover:bg-surface-hi"
    >
      <span>
        <span className="block font-display text-lg font-bold">{route.label}</span>
        <span className="text-sm text-subtle">{route.note}</span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hi transition-[background-color,transform] duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-on-primary">
        <Icon name="arrowUpRight" />
      </span>
    </Link>
  );
}
