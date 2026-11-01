"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The page's query string in the browser, "" on the server and during
 * hydration. Unlike `useSearchParams` it doesn't force a static page to drop
 * the component from its HTML, so the server-rendered default view stays put.
 */
export default function useLocationSearch(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}
