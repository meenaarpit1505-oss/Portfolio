"use client";

import React, { useEffect, useRef } from "react";
import { useScrollStore } from "@/store/useScrollStore";
import { content } from "@/data/content";

export function TransitionSection() {
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const reticle1Ref = useRef<HTMLDivElement>(null);
  const reticle2Ref = useRef<HTMLDivElement>(null);
  const headlineLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let prevProgress = -1;

    const applyProgress = (progress: number, isReduced: boolean) => {
      const pClamp = Math.min(Math.max(progress, 0), 1);
      const sinCurve = Math.sin(pClamp * Math.PI);

      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.opacity = (sinCurve * 0.75).toFixed(3);
      }

      if (reticle1Ref.current) {
        if (!isReduced) {
          const r1Scale = (0.8 + pClamp * 1.5).toFixed(3);
          const r1Rot = (pClamp * 90).toFixed(1);
          reticle1Ref.current.style.transform = `scale(${r1Scale}) rotate(${r1Rot}deg)`;
          reticle1Ref.current.style.opacity = (sinCurve * 0.55).toFixed(3);
        } else {
          reticle1Ref.current.style.transform = "none";
          reticle1Ref.current.style.opacity = (sinCurve * 0.3).toFixed(3);
        }
      }

      if (reticle2Ref.current) {
        if (!isReduced) {
          const r2Scale = (0.6 + pClamp * 1.2).toFixed(3);
          const r2Rot = (-pClamp * 120).toFixed(1);
          reticle2Ref.current.style.transform = `scale(${r2Scale}) rotate(${r2Rot}deg)`;
          reticle2Ref.current.style.opacity = (sinCurve * 0.65).toFixed(3);
        } else {
          reticle2Ref.current.style.transform = "none";
          reticle2Ref.current.style.opacity = (sinCurve * 0.3).toFixed(3);
        }
      }

      if (headlineLayerRef.current) {
        if (!isReduced) {
          const textScale = (1 + sinCurve * 0.12).toFixed(3);
          const textY = ((pClamp - 0.5) * -30).toFixed(1);
          headlineLayerRef.current.style.transform = `scale(${textScale}) translateY(${textY}px)`;
          headlineLayerRef.current.style.opacity = Math.max(0.2, 1 - sinCurve * 0.55).toFixed(3);
        } else {
          headlineLayerRef.current.style.transform = "none";
          headlineLayerRef.current.style.opacity = "1";
        }
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${(pClamp * 100).toFixed(1)}%`;
      }

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(pClamp * 100)}%`;
      }
    };

    // Initialize with current store values without React re-render
    const initialStore = useScrollStore.getState();
    applyProgress(
      initialStore.sectionProgress.transition,
      initialStore.reducedMotion
    );

    // Subscribe to store updates directly
    const unsubscribe = useScrollStore.subscribe((state) => {
      const p = state.sectionProgress.transition;
      const isReduced = state.reducedMotion;

      if (Math.abs(p - prevProgress) < 0.001) return;
      prevProgress = p;

      applyProgress(p, isReduced);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="transition"
      className="relative w-full h-[175vh] select-none"
      aria-label="Scene Transition"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-12 py-16 sm:py-20 overflow-hidden pointer-events-none">
        {/* Ambient radial glow */}
        <div
          ref={ambientGlowRef}
          className="absolute inset-0 bg-radial-gradient from-accent-purple/15 via-transparent to-transparent pointer-events-none opacity-0"
        />

        {/* HUD Top Bar: Exactly two small HUD labels */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center pt-14 sm:pt-6 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              {content.transition.badge}
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-muted uppercase">
            {content.transition.hudLabel}
          </div>
        </div>

        {/* Center: Reticles & Kinetic Headline */}
        <div className="relative w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center text-center px-2">
          <div
            ref={reticle1Ref}
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-dashed border-accent-purple/20 pointer-events-none opacity-0 will-change-transform"
          />
          <div
            ref={reticle2Ref}
            className="absolute w-40 h-40 sm:w-64 sm:h-64 rounded-full border border-accent-pink/30 pointer-events-none opacity-0 will-change-transform"
          />

          <div
            ref={headlineLayerRef}
            className="relative z-10 flex flex-col items-center will-change-transform"
          >
            <h2 className="font-serif text-[clamp(2.2rem,6.5vw,6.5rem)] font-normal tracking-tight leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60 uppercase drop-shadow-[0_0_35px_rgba(139,92,246,0.3)]">
              {content.transition.headline}
            </h2>

            <p className="mt-4 sm:mt-6 max-w-lg text-xs sm:text-base font-sans text-muted leading-relaxed font-light px-4">
              {content.transition.statement}
            </p>
          </div>

          {/* Progress Bar indicator */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-accent-purple via-accent-pink to-white w-0"
              />
            </div>
            <span
              ref={progressTextRef}
              className="text-[9px] font-mono tracking-widest text-muted/70 uppercase"
            >
              0%
            </span>
          </div>
        </div>

        {/* Empty bottom spacer to balance justify-between */}
        <div className="h-4" />
      </div>
    </section>
  );
}
