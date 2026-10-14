"use client";

import React, { useEffect, useRef } from "react";
import { content } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { Code2, Palette, Check, Terminal, Laptop } from "lucide-react";

export function WhatIDoSection() {
  const { services } = content;
  const glassPanelRef = useRef<HTMLDivElement>(null);
  const workstationFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prevProgress = -1;

    const applyProgress = (progress: number, isReduced: boolean) => {
      const pClamp = Math.min(Math.max(progress, 0), 1);

      // Translucent glass panel slides smoothly in from the right as user scrolls in
      if (glassPanelRef.current) {
        if (!isReduced) {
          // Slide in from 60px to 0px across 0.1 -> 0.35 section progress
          const enterRate = Math.min(1, Math.max(0, (pClamp - 0.1) / 0.25));
          const slideX = Math.max(0, (1 - enterRate) * 60);
          const opacity = Math.min(1, enterRate);

          glassPanelRef.current.style.transform = `translateX(${slideX.toFixed(1)}px)`;
          glassPanelRef.current.style.opacity = opacity.toFixed(3);
        } else {
          glassPanelRef.current.style.transform = "none";
          glassPanelRef.current.style.opacity = "1";
        }
      }

      // Workstation frame on the left
      if (workstationFrameRef.current) {
        const frameOpacity = Math.min(1, Math.max(0.4, pClamp * 2.0));
        workstationFrameRef.current.style.opacity = frameOpacity.toFixed(3);
      }
    };

    const initialStore = useScrollStore.getState();
    applyProgress(
      initialStore.sectionProgress["what-i-do"],
      initialStore.reducedMotion
    );

    const unsubscribe = useScrollStore.subscribe((state) => {
      const p = state.sectionProgress["what-i-do"];
      const isReduced = state.reducedMotion;

      if (Math.abs(p - prevProgress) < 0.002) return;
      prevProgress = p;

      applyProgress(p, isReduced);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="what-i-do"
      className="relative w-full min-h-screen flex items-center px-4 sm:px-12 lg:px-20 py-20 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Reserved for 3D Desk & Avatar Typing Scene */}
        <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[460px] lg:min-h-[600px] flex items-center justify-center pointer-events-none order-2 lg:order-1">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-accent-purple/20 blur-[90px] -z-10" />
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-accent-pink/15 blur-[70px] -z-10" />

          {/* Minimalist spatial bracket frame framing the 3D Workstation Desk */}
          <div
            ref={workstationFrameRef}
            className="w-full h-full rounded-3xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-[1px] p-5 sm:p-6 flex flex-col justify-between will-change-opacity opacity-0"
          >
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-muted uppercase">
              <span className="flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-accent-pink" />
                WORKSTATION // DESK MOUNT
              </span>
              <span className="text-accent-purple">TYPING RIG ACTIVE</span>
            </div>

            {/* Middle: Open transparent clearance for the 3D desk & avatar */}
            <div className="flex-1" />

            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-muted/60 uppercase pt-4 border-t border-white/[0.05]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-accent-purple" />
                INPUT: KEYBOARD ACTIVE
              </span>
              <span>DISPLAY: CODE PROJECTION</span>
            </div>
          </div>
        </div>

        {/* Right Column: Translucent Sliding Glass Services Panel */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div
            ref={glassPanelRef}
            className="relative rounded-3xl border border-white/[0.12] bg-surface/65 backdrop-blur-2xl p-6 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.7)] will-change-transform opacity-0"
          >
            {/* Header */}
            <div className="flex flex-col mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md w-fit mb-4">
                <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase">
                  04 // CAPABILITIES & CRAFT
                </span>
              </div>
              <h2 className="font-serif text-[clamp(2.2rem,4.5vw,4.5rem)] font-normal tracking-tight text-foreground uppercase">
                {services.title}
              </h2>
              <p className="text-sm font-sans text-muted mt-2">
                {services.subtitle}
              </p>
            </div>

            {/* Two Columns: DEVELOP & DESIGN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/[0.08]">
              {/* DEVELOP COLUMN */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground font-light">
                      {services.develop.title}
                    </h3>
                    <span className="text-[9px] font-mono tracking-widest text-accent-purple uppercase">
                      {services.develop.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-sans text-muted leading-relaxed mb-5">
                  {services.develop.description}
                </p>

                <ul className="space-y-3">
                  {services.develop.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-snug">
                      <Check className="w-3.5 h-3.5 text-accent-purple flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {services.develop.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded bg-white/[0.04] border border-white/[0.08] text-muted uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* DESIGN COLUMN */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-pink/20 border border-accent-pink/40 flex items-center justify-center text-accent-pink">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground font-light">
                      {services.design.title}
                    </h3>
                    <span className="text-[9px] font-mono tracking-widest text-accent-pink uppercase">
                      {services.design.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-sans text-muted leading-relaxed mb-5">
                  {services.design.description}
                </p>

                <ul className="space-y-3">
                  {services.design.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-snug">
                      <Check className="w-3.5 h-3.5 text-accent-pink flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {services.design.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded bg-white/[0.04] border border-white/[0.08] text-muted uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
