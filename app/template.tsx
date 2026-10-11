import RouteTransition from "@/components/route-transition";

/** Remounts per top-level route, so each navigation plays its page transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
