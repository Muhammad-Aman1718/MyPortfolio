"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { TAB_KEY_STEPS } from "@/constants/constant";

/**
 * State for a custom dropdown (WAI-ARIA listbox). It opens as a list under the
 * button on every screen, where a native <select> would open the phone's
 * picker. Arrow keys move, Enter/Space choose, Escape or an outside tap closes.
 */
export default function useSelect(options: readonly string[], defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;

  const openList = () => {
    setActive(Math.max(options.indexOf(value), 0));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const choose = (i: number) => {
    setValue(options[i]);
    close();
  };

  // Focus the list when it opens, close on a tap or click outside
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  const onButtonKeyDown = (e: KeyboardEvent) => {
    if (TAB_KEY_STEPS[e.key] && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      e.preventDefault();
      openList();
    }
  };

  const onListKeyDown = (e: KeyboardEvent) => {
    const step = TAB_KEY_STEPS[e.key];
    if (step) {
      e.preventDefault();
      setActive((i) => (i + step + options.length) % options.length);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return {
    value,
    open,
    active,
    setActive,
    rootRef,
    buttonRef,
    listRef,
    listId,
    optionId,
    toggle: () => (open ? close() : openList()),
    choose,
    onButtonKeyDown,
    onListKeyDown,
  };
}
