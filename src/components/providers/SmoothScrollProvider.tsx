"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore, SECTIONS, SectionId } from "@/store/useScrollStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Suppress dev overlay false-positives caused by external browser automation / inspector attributes
  if (process.env.NODE_ENV === "development") {
    const origConsoleError = console.error;
    console.error = (...args: any[]) => {
      const msg = args.map((a) => (typeof a === "string" ? a : a?.message || "")).join(" ");
      if (
        msg.includes("data-cursor-ref") ||
        (msg.includes("hydration") && msg.includes("data-cursor"))
      ) {
        return;
      }
      origConsoleError.apply(console, args);
    };
  }
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const setScroll = useScrollStore((state) => state.setScroll);
  const setSectionProgress = useScrollStore((state) => state.setSectionProgress);
  const setActiveSection = useScrollStore((state) => state.setActiveSection);
  const setMouse = useScrollStore((state) => state.setMouse);
  const updateMouseLerp = useScrollStore((state) => state.updateMouseLerp);
  const setReducedMotion = useScrollStore((state) => state.setReducedMotion);

  useEffect(() => {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = motionMediaQuery.matches;
    setReducedMotion(prefersReducedMotion);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionMediaQuery.addEventListener("change", handleMotionChange);

    const computeSections = (scrollY: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScroll(scrollY, progress);

      const viewportHeight = window.innerHeight;

      SECTIONS.forEach((secId, idx) => {
        const el = document.getElementById(secId);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = el.offsetHeight;

        const sectionStart = top;
        const currentProgress = (scrollY + viewportHeight - sectionStart) / (height + viewportHeight);
        setSectionProgress(secId, Math.min(Math.max(currentProgress, 0), 1));

        if (scrollY >= top - viewportHeight * 0.4 && scrollY < top + height - viewportHeight * 0.4) {
          setActiveSection(secId as SectionId, idx);
        }
      });
    };

    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      // Initialize Lenis smooth scroll only when reduced motion is NOT requested
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      (window as any).__lenis = lenis;

      lenis.on("scroll", (e) => {
        ScrollTrigger.update();
        computeSections(e.scroll);
      });

      // Also listen to window scroll to guarantee computeSections triggers on any native scroll
      const handleNativeScroll = () => {
        computeSections(window.scrollY);
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });

      updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    } else {
      // Passive native scroll for reduced motion
      const handleNativeScroll = () => {
        computeSections(window.scrollY);
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
    }

    // Track mouse with smooth lerp
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 0 && window.innerHeight > 0) {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        setMouse(targetX, targetY);

        if (prefersReducedMotion) {
          updateMouseLerp(targetX, targetY);
        }
      }
    };

    const lerpMouseLoop = () => {
      if (!prefersReducedMotion) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        updateMouseLerp(currentX, currentY);
        animationFrameId = requestAnimationFrame(lerpMouseLoop);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(lerpMouseLoop);
    }

    // Initial section layout compute on mount
    const computeInitialTimeout = setTimeout(() => {
      computeSections(window.scrollY);
    }, 100);

    return () => {
      clearTimeout(computeInitialTimeout);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (updateTicker) gsap.ticker.remove(updateTicker);
      if (lenis) lenis.destroy();
    };
  }, [setScroll, setSectionProgress, setActiveSection, setMouse, updateMouseLerp, setReducedMotion]);

  return <>{children}</>;
}
