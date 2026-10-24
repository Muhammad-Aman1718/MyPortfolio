"use client";

import useSpotlightTracker from "@/hooks/useSpotlightTracker";

/** Mount once: drives the cursor glow on every `.spotlight` card. Renders nothing. */
export default function SpotlightTracker() {
  useSpotlightTracker();
  return null;
}
