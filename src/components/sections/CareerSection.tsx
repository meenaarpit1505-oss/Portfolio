"use client";

import React, { useEffect, useRef, useState } from "react";
import { content, CareerItem } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { Briefcase, MapPin, Sparkles, Calendar, ChevronRight, Zap } from "lucide-react";

export function CareerSection() {
  const containerRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const { career } = content;

  useEffect(() => {
    let prevProgress = -1;

    const applyProgress = (progress: number) => {
      // Progress of career section inside viewport
      const pClamp = Math.min(Math.max(progress, 0), 1);
      if (lineProgressRef.current) {
        // Line grows from 0% to 100% as user progresses
        const heightPct = Math.min(100, Math.max(0, (pClamp - 0.05) * 125));
        lineProgressRef.current.style.height = `${heightPct}%`;
      }
    };

    const initialStore = useScrollStore.getState();
    applyProgress(initialStore.sectionProgress.career);

    const unsubscribe = useScrollStore.subscribe((state) => {
      const p = state.sectionProgress.career;
      if (Math.abs(p - prevProgress) < 0.002) return;
      prevProgress = p;
      applyProgress(p);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="career"
      ref={containerRef}
      className="relative w-full min-h-screen px-4 sm:px-12 lg:px-20 py-20 sm:py-32 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-purple/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[300px] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md mb-4">
            <Briefcase className="w-3 h-3 text-accent-purple" />
            <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase">
              05 // CAREER TIMELINE & TRACK RECORD
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,5.5rem)] font-normal tracking-tight leading-none text-foreground uppercase">
            {career.title}
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base font-sans text-muted leading-relaxed font-light">
            {career.subtitle}
          </p>
        </div>

        {/* Timeline Layout with animated glowing track */}
        <div className="relative pl-6 sm:pl-12 lg:pl-16">
          {/* Background Static Line */}
          <div className="absolute left-[9px] sm:left-[23px] lg:left-[31px] top-4 bottom-8 w-[2px] bg-white/[0.08]" />

          {/* Active Glowing Scroll-Drawn Line */}
          <div
            ref={lineProgressRef}
            className="absolute left-[9px] sm:left-[23px] lg:left-[31px] top-4 w-[2px] bg-gradient-to-b from-accent-purple via-accent-pink to-accent-purple shadow-[0_0_12px_rgba(236,72,153,0.7)] transition-all duration-75 will-change-[height]"
            style={{ height: "0%" }}
          />

          <div className="space-y-12 sm:space-y-16">
            {career.items.map((item: CareerItem, idx: number) => {
              const isSelected = selectedIdx === idx;

              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedIdx(isSelected ? null : idx)}
                >
                  {/* Timeline Glowing Node Dot */}
                  <div
                    className={`absolute -left-[24px] sm:-left-[40px] lg:-left-[48px] top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? "border-accent-pink bg-accent-pink shadow-[0_0_20px_rgba(236,72,153,0.9)] scale-110"
                        : "border-accent-purple/60 bg-background group-hover:border-accent-pink group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                    }`}
                  >
                    <div
                      className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full transition-colors ${
                        isSelected ? "bg-white" : "bg-accent-purple group-hover:bg-accent-pink"
                      }`}
                    />
                  </div>

                  {/* Career Card */}
                  <div
                    className={`rounded-2xl sm:rounded-3xl border backdrop-blur-xl p-5 sm:p-8 transition-all duration-300 ${
                      isSelected
                        ? "border-accent-purple/50 bg-surface/90 shadow-[0_20px_50px_rgba(139,92,246,0.18)] translate-x-1"
                        : "border-white/[0.08] bg-surface/50 hover:bg-surface/75 hover:border-white/20 hover:translate-x-1"
                    }`}
                  >
                    {/* Top Meta Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[10px] font-mono tracking-widest text-accent-purple font-semibold uppercase">
                          PHASE {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/20 font-mono">/</span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">
                          {item.role}
                        </h3>
                        <span className="text-sm font-sans font-medium text-accent-pink">
                          @{item.company}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-muted">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-foreground/90">
                          <Calendar className="w-3 h-3 text-accent-purple" />
                          {item.year}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted/70">
                          <MapPin className="w-3 h-3 text-muted/50" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Role Description */}
                    <p className="text-sm sm:text-base font-sans text-muted leading-relaxed font-light mb-6">
                      {item.description}
                    </p>

                    {/* Key Highlights / Achievements */}
                    <div className="space-y-2.5 mb-6 bg-white/[0.015] rounded-2xl p-4 sm:p-5 border border-white/[0.04]">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-3.5 h-3.5 text-accent-pink" />
                        <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                          KEY DELIVERABLES & IMPACT
                        </span>
                      </div>
                      {item.highlights.map((hl: string, hIdx: number) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 leading-snug">
                          <Sparkles className="w-3.5 h-3.5 text-accent-purple flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills Tech Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-lg bg-white/[0.03] border border-white/[0.08] text-muted-dark group-hover:text-muted group-hover:border-white/15 transition-all uppercase"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-accent-purple/80 uppercase">
                        <span>{item.period}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
