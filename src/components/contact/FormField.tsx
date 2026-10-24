import FieldError from "./FieldError";
import type { FormFieldProps } from "@/types/types";

/**
 * Label + control, with a required marker or optional hint, and the field's
 * error underneath. Custom controls (the dropdown) pass `labelId` and point
 * `aria-labelledby` at it: a wrapping <label> would re-click their button.
 */
export default function FormField({ label, labelId, field, error, required, optional, children }: FormFieldProps) {
  const Wrapper = labelId ? "div" : "label";
  const control = (
    <Wrapper className="flex flex-col gap-2 text-[13px] text-muted">
      <span id={labelId}>
        {label}
        {required && (
          <span className="text-primary" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {optional && <span className="text-xs text-subtle"> {optional}</span>}
      </span>
      {children}
    </Wrapper>
  );

  if (!field) return control;
  return (
    <div className="flex flex-col gap-1.5">
      {control}
      <FieldError id={`${field}-error`} message={error ?? ""} />
    </div>
  );
}
