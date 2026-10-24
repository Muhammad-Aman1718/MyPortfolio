"use client";

import useSelect from "@/hooks/useSelect";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { SelectFieldProps } from "@/types/types";

/**
 * Dropdown styled like the inputs. It opens as a list under the field on every
 * screen (no phone picker sheet). A hidden input carries the value into the form.
 */
export default function SelectField({ name, options, placeholder, labelledBy, defaultValue = "" }: SelectFieldProps) {
  const {
    value,
    open,
    active,
    setActive,
    rootRef,
    buttonRef,
    listRef,
    listId,
    optionId,
    toggle,
    choose,
    onButtonKeyDown,
    onListKeyDown,
  } = useSelect(options, defaultValue);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        className="field field-input flex items-center justify-between gap-3 pr-4 text-left"
      >
        <span className={cn("truncate", !value && "text-muted")}>{value || placeholder}</span>
        <Icon
          name="chevronDown"
          className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelledBy}
          aria-activedescendant={optionId(active)}
          onKeyDown={onListKeyDown}
          className="panel-in absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-line-strong/60 bg-surface-hi p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] outline-none"
        >
          {options.map((option, i) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-100",
                  i === active ? "bg-fg/8 text-fg" : "text-muted",
                  selected && "text-primary",
                )}
              >
                {option}
                {selected && <Icon name="check" className="h-4 w-4 shrink-0" strokeWidth={2} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
