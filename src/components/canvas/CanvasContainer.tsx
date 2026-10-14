"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SceneLoader } from "./SceneLoader";
import { HeroBlobScene } from "./scenes/HeroBlobScene";
import { ParticleBurstScene } from "./scenes/ParticleBurstScene";
import { AvatarScene } from "./scenes/AvatarScene";

export function CanvasContainer() {
  const [mounted, setMounted] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isFewCores =
        typeof navigator !== "undefined" &&
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

      setIsLowPower(isCoarse || isFewCores);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SceneLoader />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          dpr={isLowPower ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, 8.2], fov: 45, near: 0.1, far: 100 }}
          gl={{
            powerPreference: "high-performance",
            antialias: !isLowPower,
            alpha: true,
            stencil: false,
            depth: true,
          }}
        >
          <Suspense fallback={null}>
            {/* Active 3D Scenes */}
            <HeroBlobScene />
            <ParticleBurstScene isLowPower={isLowPower} />
            <AvatarScene />

            {/* Post-processing: Dreamy bloom glow on chrome highlights and colored rims */}
            <EffectComposer multisampling={isLowPower ? 0 : 4}>
              <Bloom
                luminanceThreshold={0.55}
                luminanceSmoothing={0.85}
                intensity={1.25}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default CanvasContainer;
