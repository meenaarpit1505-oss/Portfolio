"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import { spotlightOpacity } from "@/lib/motion";
import { useCallback, type CSSProperties, type PointerEvent, type ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const { hovered, enhance, reducedMotion, bind } = useHoverFocus<HTMLElement>();

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      bind.onPointerEnter(event);
      if (!enhance) return;
      const node = event.currentTarget;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--x", `${event.clientX - rect.left}px`);
      node.style.setProperty("--y", `${event.clientY - rect.top}px`);
    },
    [bind, enhance],
  );

  return (
    <article
      tabIndex={0}
      aria-label={label}
      className={`spotlight-card ${className}`}
      data-hot={hovered ? "true" : "false"}
      style={
        {
          "--spotlight-opacity": hovered && !reducedMotion ? spotlightOpacity : 0,
        } as CSSProperties
      }
      {...bind}
      onPointerMove={onPointerMove}
    >
      {children}
    </article>
  );
}
