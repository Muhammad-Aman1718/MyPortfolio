import Icon from "./Icon";
import type { SearchFieldProps } from "@/types/types";

/** Search input with a leading icon; the label is for screen readers. */
export default function SearchField({ value, onChange, label, placeholder }: SearchFieldProps) {
  return (
    <label className="relative block min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field h-11.5 rounded-full! pl-11 pr-4"
      />
    </label>
  );
}
