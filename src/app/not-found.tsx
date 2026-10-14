import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, AlertTriangle } from "lucide-react";
import { content } from "@/data/content";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 pb-10 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[450px] bg-accent-purple/20 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[400px] bg-accent-pink/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none -z-10" />

      {/* Top HUD Telemetry */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-pink animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-foreground font-semibold uppercase">
            STATUS 404 // TRAJECTORY SEVERED
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
            {content.personal.location}
          </span>
        </div>
      </div>

      {/* Center 404 Visual Content */}
      <div className="max-w-4xl mx-auto w-full my-auto flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-pink/30 bg-accent-pink/10 backdrop-blur-md mb-4">
          <AlertTriangle className="w-3.5 h-3.5 text-accent-pink" />
          <span className="text-[10px] font-mono tracking-widest text-accent-pink uppercase font-medium">
            OUT OF BOUNDS // EXCEPTION OCCURRED
          </span>
        </div>

        <span className="font-serif text-[clamp(4.5rem,14vw,10.5rem)] font-normal tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none">
          404
        </span>

        <h1 className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] font-normal tracking-tight text-foreground uppercase mt-2">
          SECTOR NOT FOUND
        </h1>

        <p className="mt-4 max-w-lg text-xs sm:text-sm font-sans text-muted leading-relaxed font-light">
          The requested route or interactive exhibit does not exist in this coordinates plane. It may have dissolved into the shader singularity or relocated.
        </p>

        {/* Action Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink text-white font-mono text-xs tracking-widest uppercase flex items-center gap-2.5 hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_10px_25px_rgba(139,92,246,0.3)]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN TO BASE</span>
          </Link>

          <Link
            href="/#work"
            className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.03] text-muted hover:text-foreground font-mono text-xs tracking-widest uppercase flex items-center gap-2.5 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-accent-purple" />
            <span>EXPLORE ARCHIVES</span>
          </Link>
        </div>
      </div>

      {/* Bottom HUD Telemetry */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/[0.08] text-[9px] font-mono tracking-widest text-muted/60 uppercase">
        <span>SECURITY PROTOCOL: PASSIVE</span>
        <span>RE-ALIGNING QUANTUM PARTICLES</span>
        <Link href="/" className="hover:text-accent-pink transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          <span>BACK TO HOMEPAGE</span>
        </Link>
      </div>
    </main>
  );
}
