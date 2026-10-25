"use client";

import { useState } from "react";

/** Tracks whether an image failed to load, so a placeholder can replace the broken-image icon. */
export default function useImageFallback() {
  const [failed, setFailed] = useState(false);
  return { failed, onError: () => setFailed(true) };
}
