import Icon from "@/components/ui/Icon";
import type { FieldErrorProps } from "@/types/types";

/** Error text under its field: icon + words, never colour alone. */
export default function FieldError({ id, message }: FieldErrorProps) {
  return (
    <span id={id} aria-live="polite" className="min-h-0 text-xs">
      {message && (
        <span className="flex items-start gap-1.5 text-error">
          <Icon name="alert" className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {message}
        </span>
      )}
    </span>
  );
}
