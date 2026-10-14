"use client";

import React, { useState, useEffect } from "react";
import { content } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollStore((state) => state.activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    useScrollStore.getState().scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-background/70 backdrop-blur-md border-b border-white/[0.06]"
          : "py-7 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <button
          onClick={() => scrollTo("hero")}
          aria-label={`${content.personal.name} — Return to top`}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded-lg py-1"
          data-cursor-text="TOP"
        >
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs font-semibold text-foreground group-hover:border-accent-purple group-hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all flex-shrink-0">
            {content.personal.monogram}
          </span>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-foreground uppercase group-hover:text-accent-pink transition-colors truncate max-w-[140px] xs:max-w-none">
              {content.personal.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-muted uppercase">
              {content.personal.roleShort}
            </span>
          </div>
        </button>

        {/* Right: Nav Links */}
        <nav aria-label="Main Navigation" className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={() => scrollTo("about")}
            data-cursor-text="ABOUT"
            aria-label="Scroll to About section"
            className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 relative py-2.5 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded ${
              activeSection === "about"
                ? "text-foreground font-semibold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>ABOUT</span>
            {activeSection === "about" && (
              <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-purple to-accent-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            )}
          </button>

          <button
            onClick={() => scrollTo("work")}
            data-cursor-text="WORK"
            aria-label="Scroll to Work section"
            className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 relative py-2.5 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded ${
              activeSection === "work"
                ? "text-foreground font-semibold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>WORK</span>
            {activeSection === "work" && (
              <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-purple to-accent-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            )}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            data-cursor-text="CONTACT"
            aria-label="Scroll to Contact section"
            className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 relative py-2.5 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded ${
              activeSection === "contact"
                ? "text-foreground font-semibold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>CONTACT</span>
            {activeSection === "contact" && (
              <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-purple to-accent-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            )}
          </button>

          {/* Availability pill */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              {content.personal.availabilityShort}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
