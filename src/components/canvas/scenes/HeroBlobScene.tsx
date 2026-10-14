"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScrollStore } from "@/store/useScrollStore";
import {
  ChromeBlobVertexShader,
  ChromeBlobFragmentShader,
} from "../shaders/chromeBlobShader";

export function HeroBlobScene() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Setup custom uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseFrequency: { value: 0.6 },
      uNoiseAmplitude: { value: 0.38 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uBaseColor: { value: new THREE.Color("#08080c") },
      uPurpleRim: { value: new THREE.Color("#8B5CF6") },
      uPinkRim: { value: new THREE.Color("#EC4899") },
    }),
    []
  );

  useFrame((state, delta) => {
    const scrollStore = useScrollStore.getState();
    const heroProgress = scrollStore.sectionProgress.hero;
    const transitionProgress = scrollStore.sectionProgress.transition;
    const activeSectionIndex = scrollStore.activeSectionIndex;
    const mouse = scrollStore.mouse;
    const reducedMotion = scrollStore.reducedMotion;

    // Active range: Only render when in Hero or early Transition before dissolving
    const isBlobActive =
      activeSectionIndex <= 1 &&
      (heroProgress > 0 || transitionProgress > 0) &&
      transitionProgress < 0.38;

    if (groupRef.current) {
      groupRef.current.visible = isBlobActive;
    }

    // Skip all useFrame calculations when off-screen
    if (!isBlobActive) {
      return;
    }

    // Destabilize noise amplitude during initial transition burst
    const burstDisplacement = transitionProgress > 0 ? transitionProgress * 0.9 : 0.0;

    if (materialRef.current) {
      if (!reducedMotion) {
        materialRef.current.uniforms.uTime.value += delta * (0.9 + transitionProgress * 2.0);
        materialRef.current.uniforms.uNoiseAmplitude.value = 0.38 + burstDisplacement;
      } else {
        // Minimal static displacement when reduced motion is preferred
        materialRef.current.uniforms.uNoiseAmplitude.value = 0.08;
      }
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
      materialRef.current.uniforms.uScroll.value = transitionProgress;
    }

    if (meshRef.current) {
      if (!reducedMotion) {
        // Subtle constant rotation + gentle mouse follow
        meshRef.current.rotation.y += delta * (0.2 + transitionProgress * 0.6);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          mouse.y * 0.25,
          0.05
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          -mouse.x * 0.2,
          0.05
        );

        // Smooth vertical float
        meshRef.current.position.y =
          Math.sin(state.clock.getElapsedTime() * 0.8) * 0.12 -
          transitionProgress * 4.5;
      } else {
        meshRef.current.rotation.set(0, 0, 0);
        meshRef.current.position.y = -transitionProgress * 4.5;
      }

      // Dissolve into particle explosion: scales down to 0 as particles erupt
      const blobFade = Math.max(0.0, 1.0 - transitionProgress * 2.6);
      meshRef.current.scale.setScalar(blobFade);
      meshRef.current.position.z = -transitionProgress * 5.0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic Key & Rim Lights complementing the shader */}
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, 3, -2]} intensity={3.5} color="#8B5CF6" distance={15} />
      <pointLight position={[4, -3, 2]} intensity={4.0} color="#EC4899" distance={15} />
      <ambientLight intensity={0.4} />

      {/* The Liquid-Chrome Morphing Blob */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[1.85, 48]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={ChromeBlobVertexShader}
          fragmentShader={ChromeBlobFragmentShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}
