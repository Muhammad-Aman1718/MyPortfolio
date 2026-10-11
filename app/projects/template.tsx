import RouteTransition from "@/components/route-transition";

/** Remounts between the list and its detail pages (the root template doesn't). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
