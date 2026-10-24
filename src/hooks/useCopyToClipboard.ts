"use client";

import { useEffect, useRef, useState } from "react";
import { UI } from "@/constants/constant";

/** Copies text and flips `copied` on briefly for feedback. */
export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), UI.copyFeedbackMs);
    } catch {
      /* clipboard blocked — leave the label unchanged */
    }
  };

  return { copied, copy };
}
