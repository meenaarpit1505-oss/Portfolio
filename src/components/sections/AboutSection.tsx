"use client";

import React, { useEffect, useRef } from "react";
import { content } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { User, CheckCircle2, ShieldCheck, Activity } from "lucide-react";

export function AboutSection() {
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const hudFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prevProgress = -1;

    const applyProgress = (progress: number, isReduced: boolean) => {
      // Progress across viewport
      const pClamp = Math.min(Math.max(progress, 0), 1);

      // Smooth fade-in and subtle upward glide for About text
      if (aboutTextRef.current) {
        if (!isReduced) {
          // Responsive fade: start appearing at 0.1, fully visible by 0.35
          const textOpacity = Math.min(1, Math.max(0, (pClamp - 0.1) / 0.25));
          const textY = Math.max(0, (1 - textOpacity) * 35);
          aboutTextRef.current.style.opacity = textOpacity.toFixed(3);
          aboutTextRef.current.style.transform = `translateY(${textY.toFixed(1)}px)`;
        } else {
          aboutTextRef.current.style.opacity = "1";
          aboutTextRef.current.style.transform = "none";
        }
      }

      // Spatial HUD frame subtle illumination
      if (hudFrameRef.current) {
        const frameOpacity = Math.min(1, Math.max(0.4, pClamp * 2.0));
        hudFrameRef.current.style.opacity = frameOpacity.toFixed(3);
      }
    };

    const initialStore = useScrollStore.getState();
    applyProgress(
      initialStore.sectionProgress.about,
      initialStore.reducedMotion
    );

    const unsubscribe = useScrollStore.subscribe((state) => {
      const p = state.sectionProgress.about;
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
      id="about"
      className="relative w-full min-h-screen flex items-center px-4 sm:px-12 lg:px-20 py-20 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Reserved for 3D Avatar (Rendered in Canvas, framed by subtle HUD brackets) */}
        <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[480px] lg:min-h-[620px] flex items-center justify-center pointer-events-none">
          {/* Ethereal Purple Backlight Glow */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent-purple/25 blur-[100px] -z-10" />
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-accent-pink/15 blur-[70px] -z-10" />

          {/* Minimalist spatial bracket frame framing the 3D Avatar */}
          <div
            ref={hudFrameRef}
            className="w-full h-full rounded-3xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-[1px] p-5 sm:p-6 flex flex-col justify-between will-change-opacity opacity-0"
          >
            {/* Top Frame Telemetry */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-muted uppercase">
              <span className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-accent-purple" />
                AVATAR // IDLE STATE
              </span>
              <span className="text-accent-pink/80">3D SANCTUARY</span>
            </div>

            {/* Middle: Open transparent clearance for the 3D model */}
            <div className="flex-1" />

            {/* Bottom Frame Telemetry */}
            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-muted/60 uppercase pt-4 border-t border-white/[0.05]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                KINEMATICS: RESTING
              </span>
              <span>LIGHTING: PURPLE RIM</span>
            </div>
          </div>
        </div>

        {/* Right Column: About Content (Fades in smoothly via scroll store) */}
        <div
          ref={aboutTextRef}
          className="lg:col-span-7 flex flex-col justify-center will-change-transform opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md w-fit mb-6">
            <User className="w-3 h-3 text-accent-purple" />
            <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase">
              03 // ABOUT THE CREATOR
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.2rem,5vw,5.2rem)] font-normal tracking-tight leading-[0.96] text-foreground uppercase">
            {content.personal.bio.headline}
          </h2>

          <p className="mt-6 sm:mt-8 text-sm sm:text-lg font-sans text-foreground/90 font-light leading-relaxed">
            {content.personal.bio.lead}
          </p>

          <div className="mt-6 space-y-4 text-xs sm:text-base font-sans text-muted leading-relaxed font-light">
            {content.personal.bio.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Traits / Pillars */}
          <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 gap-3 pt-6 border-t border-white/[0.08]">
            {content.personal.bio.traits.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-pink flex-shrink-0" />
                <span className="text-xs font-mono tracking-wider text-foreground/80 uppercase">
                  {trait}
                </span>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/[0.08]">
            {content.personal.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl text-foreground font-light">
                  {stat.value}
                  <span className="text-accent-purple text-xl font-mono">
                    {stat.suffix}
                  </span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-muted uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
