"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useScrollStore } from "@/store/useScrollStore";

export function SceneLoader() {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const currentRef = useRef(0);
  const hasFinishedRef = useRef(false);

  const setIsLoaded = useScrollStore((state) => state.setIsLoaded);
  const setLoadingProgress = useScrollStore((state) => state.setLoadingProgress);

  useEffect(() => {
    let animId: number;

    const tick = () => {
      // Real target: use progress while active, 100 when inactive
      const rawTarget = active ? progress : 100;
      // Never go backwards
      const target = Math.max(currentRef.current, Math.min(rawTarget, 100));

      const delta = target - currentRef.current;
      if (delta > 0.05) {
        // Smoothly interpolate towards target
        currentRef.current += Math.max(0.5, delta * 0.15);
        if (currentRef.current > target) {
          currentRef.current = target;
        }
      } else {
        currentRef.current = target;
      }

      const intVal = Math.min(100, Math.floor(currentRef.current));
      setDisplayProgress(intVal);
      setLoadingProgress(intVal);

      // Once loading is fully complete and display reaches 100
      if (intVal >= 100 && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        setIsLoaded(true);

        // Initiate fade-out after brief pause
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
          }, 700);
        }, 150);
      } else if (!hasFinishedRef.current) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, progress, setIsLoaded, setLoadingProgress]);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading 3D assets: ${displayProgress}% complete`}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background transition-opacity duration-700 pointer-events-none select-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-accent-glow blur-3xl pointer-events-none" />

      {/* Central HUD Loading Element */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Animated SVG Ring */}
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#loader-gradient)"
              strokeWidth="2"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * displayProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-150 ease-out"
            />
            <defs>
              <linearGradient
                id="loader-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground">
              {displayProgress}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-muted -mt-1">
              %
            </span>
          </div>
        </div>

        {/* Loading HUD Caption */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono tracking-hud text-foreground uppercase">
            INITIALIZING 3D ENVIRONMENT
          </span>
          <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
            SHADERS // GEOMETRY // CACHE
          </span>
        </div>
      </div>
    </div>
  );
}
