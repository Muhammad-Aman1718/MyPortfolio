import RouteTransition from "@/components/layout/RouteTransition";
import type { ChildrenProps } from "@/types/types";

/** Remounts between the list and its detail pages (the root template doesn't). */
export default function Template({ children }: ChildrenProps) {
  return <RouteTransition>{children}</RouteTransition>;
}
