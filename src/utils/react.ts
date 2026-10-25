import { isValidElement } from "react";
import type { ReactNode } from "react";

/** Plain text of rendered children (for labels built from a heading's content). */
export const headingText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return headingText(node.props.children);
  return "";
};
