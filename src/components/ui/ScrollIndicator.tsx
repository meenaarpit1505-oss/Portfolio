"use client";

import React from "react";
import { useScrollStore } from "@/store/useScrollStore";

export function ScrollIndicator() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <aside aria-label="Page scroll progress" className="fixed right-6 sm:right-10 bottom-10 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-none select-none">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
          {String(activeSectionIndex + 1).padStart(2, "0")} / 08
        </span>
        <div className="w-12 h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-accent-purple to-accent-pink transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-foreground font-semibold">
          {percentage}%
        </span>
      </div>

      <div className="flex items-center gap-2 group pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest text-muted uppercase group-hover:text-accent-pink transition-colors">
          SCROLL
        </span>
        <span className="text-xs text-accent-purple animate-bounce">↓</span>
      </div>
    </aside>
  );
}
