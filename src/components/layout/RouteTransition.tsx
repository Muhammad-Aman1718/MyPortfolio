import { ViewTransition } from "react";
import { ROUTE_TRANSITION_TYPES } from "@/constants/constant";
import type { ChildrenProps } from "@/types/types";

/**
 * Page-level route transition (React <ViewTransition>), mounted from route
 * templates so it remounts — and plays enter/exit — on every navigation.
 * Links tag direction with TRANSITION_FORWARD / TRANSITION_BACK; anything
 * untagged gets a quick depart and gentle arrive. Browsers without view
 * transitions fall back to the CSS `.page-enter` fade.
 */
export default function RouteTransition({ children }: ChildrenProps) {
  return (
    <ViewTransition enter={ROUTE_TRANSITION_TYPES} exit={ROUTE_TRANSITION_TYPES} default="none">
      <div className="page-enter">{children}</div>
    </ViewTransition>
  );
}
