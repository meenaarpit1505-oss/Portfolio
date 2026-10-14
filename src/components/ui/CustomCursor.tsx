"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/store/useScrollStore";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursor = useScrollStore((state) => state.cursor);
  const setCursor = useScrollStore((state) => state.setCursor);
  const isLoaded = useScrollStore((state) => state.isLoaded);

  useEffect(() => {
    // Detect touch device
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches)
    ) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible && isLoaded) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      if (isLoaded) setIsVisible(true);
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      if (interactive) {
        const cursorText = interactive.getAttribute("data-cursor-text") || null;
        const variant = (interactive.getAttribute("data-cursor-variant") as any) || "hover";
        setCursor({ hovered: true, cursorText, variant });
      } else {
        setCursor({ hovered: false, cursorText: null, variant: "default" });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isLoaded, setCursor]);

  // Completely hidden on touch devices or until the 3D environment is loaded
  if (isTouchDevice || !isLoaded) return null;

  const isHovered = cursor.hovered;
  const isCard = cursor.variant === "card";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible && isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Central crisp dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-foreground transition-transform duration-75 ease-out ${
          isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing smooth hollow ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out border backdrop-blur-[1px] ${
          isCard
            ? "w-20 h-20 -ml-10 -mt-10 bg-accent-purple/20 border-accent-pink/60 shadow-[0_0_25px_rgba(236,72,153,0.3)]"
            : isHovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-white/10 border-accent-purple/80 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            : "w-8 h-8 -ml-4 -mt-4 bg-transparent border-white/30"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursor.cursorText && (
          <span
            ref={textRef}
            className="text-[9px] font-mono tracking-widest text-foreground uppercase px-1 select-none animate-fadeIn"
          >
            {cursor.cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
