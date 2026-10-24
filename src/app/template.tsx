import RouteTransition from "@/components/layout/RouteTransition";
import type { ChildrenProps } from "@/types/types";

/** Remounts per top-level route, so each navigation plays its page transition. */
export default function Template({ children }: ChildrenProps) {
  return <RouteTransition>{children}</RouteTransition>;
}
