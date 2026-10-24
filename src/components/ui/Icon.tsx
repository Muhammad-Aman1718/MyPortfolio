import { ICONS } from "@/constants/constant";
import type { IconProps } from "@/types/types";

/** Inline SVG from the shared icon set (24×24, currentColor). */
export default function Icon({ name, path, className = "h-4 w-4", strokeWidth = 1.8, pathClassName }: IconProps) {
  const glyph = name ? ICONS[name] : { path: path ?? "", filled: false };
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={glyph.filled ? "currentColor" : "none"}
      stroke={glyph.filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={glyph.path} className={pathClassName} />
    </svg>
  );
}
