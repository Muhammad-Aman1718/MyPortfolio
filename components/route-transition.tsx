import { ViewTransition } from "react";

/**
 * Page-level route transition (React <ViewTransition>), mounted from route
 * templates so it remounts — and plays enter/exit — on every navigation.
 * Links tag direction: `nav-forward` (into detail) / `nav-back` (to a list);
 * anything untagged gets a quick depart + gentle arrive. Browsers without
 * view transitions fall back to the CSS `.page-enter` fade.
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const types = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-fade" };
  return (
    <ViewTransition enter={types} exit={types} default="none">
      <div className="page-enter">{children}</div>
    </ViewTransition>
  );
}

/** Forward links: carry the type that slides in from the right and morphs shared previews. */
export const forward = ["nav-forward"];
/** Back links: slide the other way; previews don't morph back into (possibly still hidden) list cards. */
export const back = ["nav-back"];
