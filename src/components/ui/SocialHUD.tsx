"use client";

import React from "react";
import { content } from "@/data/content";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";

export function SocialHUD() {
  return (
    <aside aria-label="Social media channels" className="fixed left-6 sm:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-3">
        <a
          href={content.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          data-cursor-text="GIT"
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-accent-purple hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all bg-background/40 backdrop-blur-sm"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <a
          href={content.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          data-cursor-text="IN"
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-accent-purple hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all bg-background/40 backdrop-blur-sm"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>

        <a
          href={content.socials.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter) Profile"
          data-cursor-text="X"
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-accent-pink hover:shadow-[0_0_12px_rgba(236,72,153,0.4)] transition-all bg-background/40 backdrop-blur-sm"
        >
          <XIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Decorative vertical line with coordinate label */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 via-accent-purple/40 to-transparent" />
      <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-mono tracking-widest text-muted/60 uppercase select-none">
        {content.personal.coordinates}
      </span>
    </aside>
  );
}
