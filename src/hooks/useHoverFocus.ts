"use client";

import { useMotionCaps } from "@/components/providers/MotionProvider";
import { useMemo, useState, type FocusEvent, type PointerEvent } from "react";

export function useHoverFocus<T extends HTMLElement = HTMLElement>() {
  const caps = useMotionCaps();
  const [hovered, setHovered] = useState(false);

  const bind = useMemo(
    () => ({
      onPointerEnter: (event: PointerEvent<T>) => {
        if (event.pointerType === "touch") return;
        if (caps.finePointer) setHovered(true);
      },
      onPointerLeave: () => setHovered(false),
      onFocus: (event: FocusEvent<T>) => {
        if (event.currentTarget.matches(":focus-visible")) setHovered(true);
      },
      onBlur: () => setHovered(false),
    }),
    [caps.finePointer],
  );

  return {
    ...caps,
    hovered: caps.reducedMotion ? false : hovered,
    bind,
  };
}
