"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { content, TechItem } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { Atom, Cpu, RotateCcw, Grid, CheckCircle2 } from "lucide-react";

const TechStackPlayground = dynamic(
  () => import("@/components/canvas/TechStackPlayground"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface/20">
        <div className="w-10 h-10 rounded-full border-2 border-accent-purple border-t-transparent animate-spin" />
        <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
          INITIALIZING RAPIER PHYSICS ENGINE...
        </span>
      </div>
    ),
  }
);

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [resetSignal, setResetSignal] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [is3DMode, setIs3DMode] = useState<boolean>(true);

  // Viewport proximity & performance flags
  const [isNearViewport, setIsNearViewport] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  const reducedMotion = useScrollStore((state) => state.reducedMotion);
  const { techStack } = content;

  const categories = ["ALL", "Frontend", "3D & Creative", "Backend", "Tools & Infra"];

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isFewCores =
        typeof navigator !== "undefined" &&
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;
      const lowPower = isCoarse || isFewCores;
      setIsLowPower(lowPower);

      const isMobileDevice =
        window.matchMedia("(max-width: 768px)").matches || isCoarse;
      if (isMobileDevice || reducedMotion) {
        setIs3DMode(false);
      }
    }

    const currentSection = sectionRef.current;
    if (!currentSection || typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      setIsInViewport(true);
      return;
    }

    // Observer 1: Near viewport with rootMargin 200px to mount/unmount secondary WebGL Canvas
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    // Observer 2: Exact intersection to toggle physics pause & canvas frameloop
    const exactObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );

    nearObserver.observe(currentSection);
    exactObserver.observe(currentSection);

    return () => {
      nearObserver.disconnect();
      exactObserver.disconnect();
    };
  }, [reducedMotion]);

  const filteredTech =
    activeCategory === "ALL"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  const handleScatter = () => {
    setResetSignal((prev) => prev + 1);
  };

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full min-h-screen px-6 sm:px-12 lg:px-20 py-32 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-accent-pink/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md mb-4">
            <Atom className="w-3.5 h-3.5 text-accent-purple animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase">
              07 // PHYSICS PLAYGROUND & TOOLKIT
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5.5rem)] font-normal tracking-tight leading-none text-foreground uppercase">
            TECH STACK & TOOLS
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base font-sans text-muted leading-relaxed font-light">
            30 core technologies driving real-time 3D WebGL experiences, shaders, physical simulations, and full-stack architectures.
          </p>

          {/* Controls Bar: Category Filters + Mode Toggle */}
          <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor-text="FILTER"
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-105"
                      : "bg-white/[0.04] text-muted border border-white/[0.08] hover:text-foreground hover:bg-white/[0.08]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mode Switcher: 3D Playground vs Static Grid */}
            <div className="inline-flex items-center p-1 rounded-full border border-white/[0.1] bg-surface/60 backdrop-blur-md">
              <button
                onClick={() => setIs3DMode(true)}
                className={`px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 ${
                  is3DMode
                    ? "bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>3D PLAYGROUND</span>
              </button>
              <button
                onClick={() => setIs3DMode(false)}
                className={`px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 ${
                  !is3DMode
                    ? "bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>STATIC GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Playground Container: 3D Rapier Canvas vs Accessible Static Grid */}
        <div className="relative w-full rounded-3xl border border-white/[0.08] bg-surface/40 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {isClient && is3DMode ? (
            /* 3D RAPIER PHYSICS PLAYGROUND (Only mounted when near viewport to enforce single active WebGL context outside section) */
            <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] flex flex-col justify-between">
              {/* Top Playground HUD Header */}
              <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isInViewport ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                  <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                    RAPIER 3D // 30 KINEMATIC BODIES {isInViewport ? "(ACTIVE)" : "(PAUSED)"}
                  </span>
                </div>

                <div className="pointer-events-auto flex items-center gap-3">
                  <button
                    onClick={handleScatter}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-muted hover:text-foreground text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    data-cursor-text="SHAKE"
                  >
                    <RotateCcw className="w-3 h-3 text-accent-purple" />
                    <span>SCATTER / RE-DROP</span>
                  </button>
                </div>
              </div>

              {/* 3D Physics WebGL Surface: Mounted only when isNearViewport is true */}
              <div className="w-full h-full">
                {isNearViewport ? (
                  <TechStackPlayground
                    techList={techStack}
                    activeCategory={activeCategory}
                    onSelectTech={(tech) => setSelectedTech(tech)}
                    resetSignal={resetSignal}
                    paused={!isInViewport}
                    isLowPower={isLowPower}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface/20">
                    <div className="w-10 h-10 rounded-full border-2 border-accent-purple/30 border-t-accent-pink animate-spin" />
                    <span className="text-[10px] font-mono tracking-widest text-muted/60 uppercase">
                      STANDBY // WEBGL CONTEXT FREED
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Inspection / Telemetry HUD */}
              <div className="absolute bottom-4 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
                {selectedTech ? (
                  <div className="pointer-events-auto flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-background/85 border border-white/15 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <div
                      className="w-3.5 h-3.5 rounded-full shadow-[0_0_10px_currentColor]"
                      style={{ backgroundColor: selectedTech.accent, color: selectedTech.accent }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-semibold text-foreground uppercase">
                        {selectedTech.name}
                      </span>
                      <span className="text-[9px] font-mono text-muted uppercase">
                        {selectedTech.category} {"//"} PROFICIENCY: {selectedTech.level}%
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="text-[10px] font-mono text-muted hover:text-foreground pl-2 border-l border-white/10"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono tracking-widest text-muted/70 uppercase">
                    DRIVE CURSOR TO DISPERSE SPHERES • CLICK TO INSPECT
                  </span>
                )}

                <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest text-muted/50 uppercase">
                  <span>GRAVITY: -9.81 M/S²</span>
                  <span>RESTITUTION: 0.72</span>
                </div>
              </div>
            </div>
          ) : (
            /* STATIC GRID FALLBACK (MOBILE & PREFERS-REDUCED-MOTION) */
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-muted uppercase pb-6 mb-8 border-b border-white/[0.06]">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-pink" />
                  ACCESSIBLE STATIC MATRIX // {filteredTech.length} DISCIPLINES
                </span>
                <span className="text-accent-purple">
                  CATEGORY: {activeCategory}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {filteredTech.map((tech, idx) => (
                  <div
                    key={idx}
                    data-cursor-text={tech.name.slice(0, 6)}
                    className="group relative p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-accent-purple/40 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        {/* Initials Avatar badge */}
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-white border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                          style={{
                            backgroundColor: tech.color || "#111116",
                            borderColor: tech.accent + "66",
                          }}
                        >
                          {tech.initials || tech.name.slice(0, 2).toUpperCase()}
                        </div>

                        <span className="text-[10px] font-mono text-muted/70">
                          {tech.level}%
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-mono font-medium text-foreground group-hover:text-accent-pink transition-colors truncate">
                        {tech.name}
                      </h4>

                      <span className="text-[9px] font-mono tracking-wider text-muted/60 uppercase block mt-0.5">
                        {tech.category}
                      </span>
                    </div>

                    {/* Skill progress bar */}
                    <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-4">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${tech.level}%`,
                          backgroundColor: tech.accent,
                          boxShadow: `0 0 8px ${tech.accent}88`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] font-mono tracking-widest text-muted/60 uppercase mt-8 pt-6 border-t border-white/[0.06]">
                <span>CORE PROFICIENCIES: PRODUCTION TESTED</span>
                <span>DESKTOP VISITORS CAN TOGGLE 3D PLAYGROUND ABOVE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
