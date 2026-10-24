import { ViewTransition } from "react";
import { PREVIEW_MORPH } from "@/constants/constant";
import { previewTransitionName } from "@/utils/content";
import type { SharedPreviewProps } from "@/types/types";

/** Wraps a project preview so it morphs into (or out of) the case-study hero. */
export default function SharedPreview({ slug, children }: SharedPreviewProps) {
  return (
    <ViewTransition name={previewTransitionName(slug)} share={PREVIEW_MORPH} default="none">
      {children}
    </ViewTransition>
  );
}
