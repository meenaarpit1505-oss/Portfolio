"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, ProjectItem } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";
import { Layers, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ProjectCardImage({
  project,
  onImageLoad,
}: {
  project: ProjectItem;
  onImageLoad?: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-secondary via-surface-tertiary to-surface-secondary border border-white/[0.08] mb-4 sm:mb-6 group-hover:border-accent-purple/40 transition-all duration-500">
      {imgError ? (
        /* Styled gradient placeholder with project title when file is missing */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-surface-secondary via-surface-tertiary to-surface-secondary select-none">
          <div className="absolute inset-0 bg-accent-glow opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

          <span className="relative font-serif text-4xl sm:text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors duration-500 mb-1">
            {project.number}
          </span>
          <span className="relative font-serif text-lg sm:text-2xl text-foreground font-normal line-clamp-2 max-w-[90%] leading-snug">
            {project.title}
          </span>
          <span className="relative text-[10px] font-mono tracking-widest text-accent-pink uppercase mt-2 font-medium">
            {project.category}
          </span>
        </div>
      ) : (
        <>
          {/* Subtle placeholder while image is lazy-loading */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-surface-secondary via-surface-tertiary to-surface-secondary transition-opacity duration-500 select-none ${
              imgLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-accent-glow opacity-20" />
            <span className="font-serif text-xl sm:text-2xl text-white/25 font-light">
              {project.title}
            </span>
          </div>

          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 480px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              setImgError(true);
              onImageLoad?.();
            }}
            onLoad={() => {
              setImgLoaded(true);
              onImageLoad?.();
            }}
          />
        </>
      )}

      {/* Hover reveal overlay with "View case study" label */}
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/90 border border-white/25 backdrop-blur-md text-[11px] font-mono tracking-wider text-foreground uppercase shadow-xl transform scale-95 group-hover:scale-100 transition-all duration-300">
          <span>View case study</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-accent-pink" />
        </span>
      </div>

      {/* Top right corner arrow badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-muted group-hover:text-foreground group-hover:border-accent-pink group-hover:bg-accent-pink/20 transition-all z-10">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isActive,
  isStacked,
  onImageLoad,
}: {
  project: ProjectItem;
  isActive: boolean;
  isStacked: boolean;
  onImageLoad?: () => void;
}) {
  return (
    <Link
      id={`project-card-${project.id}`}
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      data-cursor-variant="card"
      data-cursor-text="VIEW"
      className={`group relative flex flex-col justify-between rounded-3xl border backdrop-blur-2xl p-5 sm:p-9 transition-all duration-500 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isStacked
          ? "w-full border-white/[0.1] bg-surface/60 hover:bg-surface/85 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          : `flex-shrink-0 w-[290px] xs:w-[340px] sm:w-[420px] lg:w-[480px] ${
              isActive
                ? "border-accent-purple/60 bg-surface/90 shadow-[0_25px_60px_rgba(139,92,246,0.25)] scale-[1.01] sm:scale-[1.02]"
                : "border-white/[0.1] bg-surface/60 hover:bg-surface/85 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            }`
      }`}
    >
      <div>
        {/* Card Header Telemetry */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest text-accent-purple font-semibold">
              {"//"} {project.number}
            </span>
            {project.type === "concept" ? (
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple uppercase">
                Concept project
              </span>
            ) : project.client ? (
              <span className="text-[10px] font-mono tracking-wider text-muted uppercase truncate max-w-[140px]">
                {project.client}
              </span>
            ) : null}
          </div>
          <span className="text-[11px] font-mono tracking-widest text-muted uppercase">
            {project.year}
          </span>
        </div>

        {/* 16:10 Card Image */}
        <ProjectCardImage project={project} onImageLoad={onImageLoad} />

        {/* Category & Title */}
        <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase block mb-1.5 font-medium">
          {project.category}
        </span>

        <h3 className="font-serif text-xl sm:text-3xl text-foreground font-normal leading-tight group-hover:text-accent-pink transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm font-sans text-muted mt-2 sm:mt-3 line-clamp-2 leading-relaxed font-light">
          {project.tagline}
        </p>
      </div>

      {/* Metrics Row (rendered only when real metrics exist) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-2">
          {project.metrics.map((m, mIdx) => (
            <div key={mIdx} className="flex flex-col">
              <span className="font-serif text-base sm:text-lg text-foreground font-light leading-none">
                {m.value}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-muted/70 uppercase mt-1 truncate">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tags Footer */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag, tIdx) => (
          <span
            key={tIdx}
            className="px-2.5 py-1 text-[9px] font-mono tracking-wider rounded-md bg-white/[0.03] border border-white/[0.06] text-muted group-hover:text-foreground/90 uppercase transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const storeReducedMotion = useScrollStore((state) => state.reducedMotion);
  const { projects } = content;

  // Detect mobile viewport or reduced motion
  useEffect(() => {
    setIsMounted(true);

    const updateMedia = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobileOrReduced(isMobile || prefersReduced || storeReducedMotion);
    };

    updateMedia();

    window.addEventListener("resize", updateMedia, { passive: true });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", updateMedia);

    return () => {
      window.removeEventListener("resize", updateMedia);
      motionQuery.removeEventListener("change", updateMedia);
    };
  }, [storeReducedMotion]);

  // Recalculate horizontal scroll length and refresh ScrollTrigger
  const refreshLayout = useCallback(() => {
    if (!sectionRef.current) return;

    if (isMobileOrReduced) {
      sectionRef.current.style.height = "auto";
      if (trackRef.current) {
        trackRef.current.style.transform = "";
      }
      ScrollTrigger.refresh();
      return;
    }

    if (!trackRef.current) return;

    const scrollLength = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
    sectionRef.current.style.height = `${window.innerHeight + scrollLength}px`;
    ScrollTrigger.refresh();
  }, [isMobileOrReduced]);

  // Scroll listener for horizontal translation in desktop mode
  useEffect(() => {
    if (isMobileOrReduced) return;

    let prevProgress = -1;

    const onScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;

      const scrollLength = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      if (scrollLength <= 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / scrollLength;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      useScrollStore.getState().setSectionProgress("work", clampedProgress);

      if (Math.abs(clampedProgress - prevProgress) < 0.001) return;
      prevProgress = clampedProgress;

      const translateX = clampedProgress * scrollLength;
      trackRef.current.style.transform = `translate3d(-${translateX.toFixed(1)}px, 0, 0)`;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${(clampedProgress * 100).toFixed(1)}%`;
      }

      const activeIdx = Math.min(
        projects.length - 1,
        Math.floor(clampedProgress * projects.length)
      );
      setActiveProjectIdx(activeIdx);
    };

    refreshLayout();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshLayout, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("load", refreshLayout, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshLayout);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", refreshLayout);
    };
  }, [isMobileOrReduced, projects.length, refreshLayout]);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;

    if (isMobileOrReduced) {
      const el = document.getElementById(`project-card-${projects[index].id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (!trackRef.current) return;
    const scrollLength = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
    if (scrollLength <= 0) return;

    const targetProgress = index / (projects.length - 1);
    const targetY = sectionRef.current.offsetTop + targetProgress * scrollLength;

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // Render vertical stacked list with no pinning on mobile and reduced motion
  if (isMounted && isMobileOrReduced) {
    return (
      <section
        id="work"
        ref={sectionRef}
        className="relative w-full py-16 sm:py-24 px-4 sm:px-12 lg:px-20 bg-background"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-accent-pink/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md mb-3 sm:mb-4">
                <Layers className="w-3 h-3 text-accent-pink" />
                <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase font-medium">
                  06 // Projects
                </span>
              </div>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] font-normal tracking-tight leading-none text-foreground uppercase">
                Selected Work
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                {String(projects.length).padStart(2, "0")} ARCHIVE EXHIBITS
              </span>
            </div>
          </div>

          {/* Vertical Stacked List with No Pinning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {projects.map((project: ProjectItem) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={true}
                isStacked={true}
                onImageLoad={refreshLayout}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render pinned horizontal slider on desktop with normal motion
  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Sticky Fullscreen Container that stays pinned while user scrolls through the calculated track length */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-12 lg:px-20 py-8 sm:py-14 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent-pink/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 z-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md mb-3 sm:mb-4">
              <Layers className="w-3 h-3 text-accent-pink" />
              <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase font-medium">
                06 // Projects
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] font-normal tracking-tight leading-none text-foreground uppercase">
              Selected Work
            </h2>
          </div>

          {/* Right Header Navigation & Metrics */}
          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
            <div className="flex flex-col text-left sm:text-right">
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                ARCHIVE {String(projects[activeProjectIdx].number).padStart(2, "0")} OF {String(projects.length).padStart(2, "0")}
              </span>
              <span className="text-xs font-mono text-foreground uppercase truncate max-w-[200px] sm:max-w-none">
                {projects[activeProjectIdx].category}
              </span>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToCard(Math.max(0, activeProjectIdx - 1))}
                aria-label="Previous project"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-muted hover:text-foreground transition-all focus-visible:ring-2 focus-visible:ring-accent-purple"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollToCard(Math.min(projects.length - 1, activeProjectIdx + 1))
                }
                aria-label="Next project"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-muted hover:text-foreground transition-all focus-visible:ring-2 focus-visible:ring-accent-purple"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Slider Track */}
        <div className="relative w-full my-auto py-4 sm:py-6 z-20">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-12 pl-2 sm:pl-8 pr-8 sm:pr-16 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {projects.map((project: ProjectItem, idx: number) => {
              const isActive = activeProjectIdx === idx;

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isActive={isActive}
                  isStacked={false}
                  onImageLoad={refreshLayout}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Pinned Status: Progress Bar + Scroll Label + Counter */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20 pt-2">
          {/* Small progress bar + "Scroll" label */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              Scroll
            </span>
            <div className="w-24 sm:w-36 h-1 bg-white/[0.1] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple shadow-[0_0_10px_rgba(236,72,153,0.8)] transition-all duration-75 will-change-[width]"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          {/* Counter (01 / 06) */}
          <span className="text-accent-purple font-mono text-[10px] tracking-widest font-semibold uppercase">
            {String(activeProjectIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
