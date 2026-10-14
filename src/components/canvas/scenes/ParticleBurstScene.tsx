"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useScrollStore } from "@/store/useScrollStore";
import {
  ParticleVertexShader,
  ParticleFragmentShader,
} from "../shaders/particleShader";

interface ParticleBurstSceneProps {
  isLowPower?: boolean;
}

export function ParticleBurstScene({ isLowPower = false }: ParticleBurstSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const wasDolliedRef = useRef(false);
  const { gl } = useThree();

  // Scale particle count based on hardware capability
  const particleCount = useMemo(() => {
    return isLowPower ? 12000 : 32000;
  }, [isLowPower]);

  // Construct particle buffer attributes once
  const { positions, directions, speeds, sizes, offsets, colorMixes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const dir = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    const sz = new Float32Array(particleCount);
    const off = new Float32Array(particleCount);
    const col = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Uniform spherical distribution with Fibonacci or random spherical coords
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);

      const dx = sinPhi * Math.cos(theta);
      const dy = sinPhi * Math.sin(theta);
      const dz = Math.cos(phi);

      // Base radius matches hero blob (~1.8) with random depth jitter
      const radius = 1.6 + Math.random() * 0.45;

      pos[i3] = dx * radius;
      pos[i3 + 1] = dy * radius;
      pos[i3 + 2] = dz * radius;

      // Direction: radial outward vector + slight tangential vortex swirl
      const swirlFactor = 0.25;
      const tangX = -dy * swirlFactor;
      const tangY = dx * swirlFactor;
      const normDir = new THREE.Vector3(dx + tangX, dy + tangY, dz + (Math.random() - 0.5) * 0.2).normalize();

      dir[i3] = normDir.x;
      dir[i3 + 1] = normDir.y;
      dir[i3 + 2] = normDir.z;

      // Speed variation (fast core sparks + drifting cloud dust)
      spd[i] = 0.6 + Math.random() * 1.5;

      // Particle size
      sz[i] = 3.5 + Math.random() * 5.5;

      // Phase offset
      off[i] = Math.random();

      // Color distribution (purple #8B5CF6 -> pink #EC4899 -> radiant core)
      col[i] = Math.random();
    }

    return {
      positions: pos,
      directions: dir,
      speeds: spd,
      sizes: sz,
      offsets: off,
      colorMixes: col,
    };
  }, [particleCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPixelRatio: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorPurple: { value: new THREE.Color("#8B5CF6") },
      uColorPink: { value: new THREE.Color("#EC4899") },
      uColorCore: { value: new THREE.Color("#FFFFFF") },
    }),
    []
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uPixelRatio.value = gl.getPixelRatio();
    }
  }, [gl]);

  useFrame((state, delta) => {
    const scrollStore = useScrollStore.getState();
    const transitionProgress = scrollStore.sectionProgress.transition;
    const activeSectionIndex = scrollStore.activeSectionIndex;
    const aboutProgress = scrollStore.sectionProgress.about;
    const mouse = scrollStore.mouse;
    const reducedMotion = scrollStore.reducedMotion;

    // Active range: Only render while transition is underway
    const isParticleActive =
      (activeSectionIndex <= 1 && transitionProgress > 0.02) ||
      (activeSectionIndex === 2 && transitionProgress < 0.98 && aboutProgress < 0.3);

    if (pointsRef.current) {
      pointsRef.current.visible = isParticleActive;
    }

    // Skip all useFrame work when outside the active range
    if (!isParticleActive) {
      if (wasDolliedRef.current) {
        state.camera.position.set(0, 0, 8.2);
        state.camera.rotation.set(0, 0, 0);
        wasDolliedRef.current = false;
      }
      return;
    }

    wasDolliedRef.current = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uProgress.value = transitionProgress;
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }

    // Subtle rotation of the entire particle cloud
    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.z += delta * 0.05;
    }

    // Camera Fly-Through Dolly Choreography
    if (!reducedMotion) {
      let targetZ = 8.2;
      let targetY = 0.0;
      let targetX = 0.0;

      if (transitionProgress > 0.02 && transitionProgress < 0.95) {
        const dollyFactor = Math.sin(transitionProgress * Math.PI);
        targetZ = THREE.MathUtils.lerp(8.2, 2.0, dollyFactor);
        targetY = -dollyFactor * 0.4;
        targetX = mouse.x * 0.35 * (1.0 + dollyFactor * 0.5);
      } else if (aboutProgress > 0) {
        targetZ = THREE.MathUtils.lerp(8.2, 7.2, aboutProgress);
      }

      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouse.y * 0.2, 0.08);
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);

      state.camera.rotation.z = THREE.MathUtils.lerp(
        state.camera.rotation.z,
        -mouse.x * 0.04 * (transitionProgress > 0 ? 1.5 : 0.5),
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aDirection"
          args={[directions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 1]}
        />
        <bufferAttribute
          attach="attributes-aColorMix"
          args={[colorMixes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={ParticleVertexShader}
        fragmentShader={ParticleFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest
      />
    </points>
  );
}
