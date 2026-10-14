"use client";

import React, { useRef } from "react";
import { content } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { ArrowDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    useScrollStore.getState().scrollToSection("transition");
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-12 py-20 sm:py-24 select-none overflow-hidden"
    >
      {/* HUD: Top Edge Corners */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-start pt-14 sm:pt-6 z-20 pointer-events-none">
        {/* Top-Left HUD */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-foreground font-semibold uppercase">
              TRANSMISSION // 01
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-muted uppercase">
            ARCH // REAL-TIME 3D EXPERIENCES
          </span>
        </div>

        {/* Top-Right HUD */}
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-foreground uppercase">
            {content.personal.location}
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-muted uppercase hidden xs:inline">
            LAT {content.personal.coordinates}
          </span>
        </div>
      </div>

      {/* Center Hero Typography Area */}
      <div className="relative w-full max-w-7xl mx-auto my-auto flex flex-col items-center justify-center text-center pointer-events-none py-6 sm:py-0">
        {/* Back Layer Text: Partially masked or sitting under the 3D chrome blob */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[11px] sm:text-sm font-mono tracking-widest text-accent-pink uppercase mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {content.personal.role}
          </span>

          {/* "HI, I'M" - First layer of giant serif text */}
          <h1 className="font-serif text-[clamp(2.8rem,9vw,9.5rem)] font-normal tracking-tight leading-[0.9] text-white/40 uppercase">
            HI, I&apos;M
          </h1>
        </div>

        {/* Spacer for 3D Blob visual depth */}
        <div className="h-12 sm:h-28" />

        {/* Front Layer Text: Sitting crisp in front of the blob */}
        <div className="relative z-20 flex flex-col items-center">
          <h2 className="font-serif text-[clamp(3.2rem,11.5vw,12.5rem)] font-normal tracking-tight leading-[0.88] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] uppercase px-2">
            {content.personal.name}
          </h2>

          <p className="mt-6 sm:mt-8 max-w-xl text-xs sm:text-base font-sans text-muted leading-relaxed font-light px-4">
            {content.personal.subtitle}
          </p>

          {/* Interactive CTA button */}
          <div className="mt-8 pointer-events-auto flex items-center gap-4">
            <button
              onClick={scrollToNext}
              aria-label="Enter experience and explore portfolio"
              data-cursor-text="EXPLORE"
              className="group px-7 py-3.5 min-h-[48px] rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md hover:border-accent-purple/80 hover:bg-accent-purple/10 focus-visible:ring-2 focus-visible:ring-accent-purple transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <span className="text-xs font-mono tracking-widest uppercase text-foreground group-hover:text-accent-pink transition-colors">
                ENTER EXPERIENCE
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-accent-purple group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* HUD: Bottom Edge Corners */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-end pb-4 z-20 pointer-events-none">
        {/* Bottom-Left HUD */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-widest text-foreground uppercase">
            STATUS: REAL-TIME WEBGL
          </span>
          <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
            DISPLACEMENT // NOISE FBM V3
          </span>
        </div>

        {/* Bottom-Right HUD */}
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase">
            {content.personal.availability}
          </span>
          <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
            FRAMELOOP: DEMAND // 60 FPS
          </span>
        </div>
      </div>
    </section>
  );
}
