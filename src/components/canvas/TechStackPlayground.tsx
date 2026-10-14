"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, BallCollider, RapierRigidBody } from "@react-three/rapier";
import { TechItem } from "@/data/content";
import { useScrollStore } from "@/store/useScrollStore";

// Texture generator cache to create each unique tech badge texture once
const textureCache = new Map<string, THREE.CanvasTexture>();

function getOrCreateTechTexture(tech: TechItem): THREE.CanvasTexture {
  if (textureCache.has(tech.name)) {
    return textureCache.get(tech.name)!;
  }

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(tech.name, texture);

  // Function to paint the badge with tech initials as fallback
  const paintFallback = () => {
    ctx.clearRect(0, 0, size, size);

    // Deep tech metal base
    ctx.fillStyle = "#0c0d14";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.fill();

    // Circular gradient glow
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      10,
      size / 2,
      size / 2,
      size / 2 - 8
    );
    grad.addColorStop(0, tech.color + "99");
    grad.addColorStop(0.7, tech.color + "33");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
    ctx.fill();

    // Perimeter accent ring
    ctx.strokeStyle = tech.accent;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 12, 0, Math.PI * 2);
    ctx.stroke();

    // Initials text
    const initials = tech.initials || tech.name.slice(0, 3).toUpperCase();
    ctx.fillStyle = "#ffffff";
    const fontSize = initials.length > 3 ? 52 : initials.length === 3 ? 62 : 72;
    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2 - 6);

    // Bottom category / accent dot
    ctx.fillStyle = tech.accent;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2 + 56, 7, 0, Math.PI * 2);
    ctx.fill();

    texture.needsUpdate = true;
  };

  paintFallback();

  // If a logo path is specified, attempt to load and overlay it
  if (tech.logo) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = tech.logo;
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);

      // Dark background
      ctx.fillStyle = "#0c0d14";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
      ctx.fill();

      // Perimeter accent ring
      ctx.strokeStyle = tech.accent;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 12, 0, Math.PI * 2);
      ctx.stroke();

      // Draw logo centered with margin
      const logoSize = size * 0.58;
      const offset = (size - logoSize) / 2;
      ctx.drawImage(img, offset, offset, logoSize, logoSize);

      texture.needsUpdate = true;
    };
    img.onerror = () => {
      // Keep procedural fallback if logo file is absent
    };
  }

  return texture;
}

// Invisible boundary walls enclosing the spheres inside the 3D container
function InvisibleBoundaries() {
  const { width, height } = useThree((state) => state.viewport);
  const thickness = 2.0;
  const halfW = width / 2;
  const halfH = height / 2;
  const depth = 5.0;
  const halfD = depth / 2;

  return (
    <RigidBody type="fixed" colliders={false}>
      {/* Floor */}
      <CuboidCollider
        args={[halfW + 1, thickness / 2, halfD]}
        position={[0, -halfH - thickness / 2 + 0.3, 0]}
        restitution={0.68}
        friction={0.35}
      />
      {/* Ceiling */}
      <CuboidCollider
        args={[halfW + 1, thickness / 2, halfD]}
        position={[0, halfH + thickness / 2 + 0.5, 0]}
        restitution={0.4}
      />
      {/* Left Wall */}
      <CuboidCollider
        args={[thickness / 2, halfH * 2, halfD]}
        position={[-halfW - thickness / 2 + 0.2, 0, 0]}
        restitution={0.65}
        friction={0.2}
      />
      {/* Right Wall */}
      <CuboidCollider
        args={[thickness / 2, halfH * 2, halfD]}
        position={[halfW + thickness / 2 - 0.2, 0, 0]}
        restitution={0.65}
        friction={0.2}
      />
      {/* Back Wall */}
      <CuboidCollider
        args={[halfW + 1, halfH * 2, thickness / 2]}
        position={[0, 0, -halfD - thickness / 2]}
        restitution={0.6}
      />
      {/* Front Invisible Containment Pane */}
      <CuboidCollider
        args={[halfW + 1, halfH * 2, thickness / 2]}
        position={[0, 0, halfD + thickness / 2]}
        restitution={0.6}
      />
    </RigidBody>
  );
}

// Cursor-driven kinematic pusher: an invisible physics ball that translates with cursor
function CursorKinematicPusher() {
  const pusherRef = useRef<RapierRigidBody>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!pusherRef.current) return;

    // Convert normalized mouse pointer (-1 to 1) to viewport coordinates
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;

    pusherRef.current.setNextKinematicTranslation({
      x: targetX,
      y: targetY,
      z: 0,
    });

    if (glowRingRef.current) {
      glowRingRef.current.rotation.z += 0.02;
    }
  });

  return (
    <RigidBody
      ref={pusherRef}
      type="kinematicPosition"
      colliders={false}
      position={[0, 0, 0]}
    >
      <BallCollider args={[1.2]} restitution={1.35} />

      {/* Visual Cursor Forcefield Ring */}
      <mesh ref={glowRingRef} position={[0, 0, 0]}>
        <ringGeometry args={[0.65, 1.1, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </RigidBody>
  );
}

// Individual Tech Sphere with Rapier dynamic physics body
interface TechSphereProps {
  tech: TechItem;
  initialPos: [number, number, number];
  isHighlighted: boolean;
  isFilteredOut: boolean;
  onSelect: (tech: TechItem) => void;
  resetSignal: number;
}

function TechSphere({
  tech,
  initialPos,
  isHighlighted,
  isFilteredOut,
  onSelect,
  resetSignal,
}: TechSphereProps) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => getOrCreateTechTexture(tech), [tech]);
  const radius = (tech.radius || 0.9) * 0.58;

  // React to reset signal: give spheres an energetic upward scatter impulse
  useEffect(() => {
    if (bodyRef.current && resetSignal > 0) {
      bodyRef.current.applyImpulse(
        {
          x: (Math.random() - 0.5) * 5.0,
          y: 6.0 + Math.random() * 4.5,
          z: (Math.random() - 0.5) * 3.0,
        },
        true
      );
    }
  }, [resetSignal]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    useScrollStore.getState().setCursor({
      hovered: true,
      cursorText: tech.name.slice(0, 8).toUpperCase(),
      variant: "hover",
    });

    if (bodyRef.current) {
      // Subtle buoyant nudge on cursor hover
      bodyRef.current.applyImpulse(
        {
          x: (Math.random() - 0.5) * 0.8,
          y: 2.2,
          z: (Math.random() - 0.5) * 0.8,
        },
        true
      );
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    useScrollStore.getState().setCursor({
      hovered: false,
      cursorText: null,
      variant: "default",
    });
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(tech);
    if (bodyRef.current) {
      bodyRef.current.applyImpulse(
        {
          x: (Math.random() - 0.5) * 4.0,
          y: 5.5,
          z: (Math.random() - 0.5) * 3.0,
        },
        true
      );
    }
  };

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={initialPos}
      restitution={0.72}
      friction={0.3}
      linearDamping={0.4}
      angularDamping={0.5}
      mass={1.2}
    >
      <BallCollider args={[radius]} />

      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.65}
          envMapIntensity={1.4}
          emissive={
            hovered || isHighlighted
              ? tech.accent
              : isFilteredOut
              ? "#000000"
              : tech.color
          }
          emissiveIntensity={hovered || isHighlighted ? 0.9 : isFilteredOut ? 0 : 0.15}
          transparent={isFilteredOut}
          opacity={isFilteredOut ? 0.25 : 1.0}
        />
      </mesh>
    </RigidBody>
  );
}

interface TechStackPlaygroundProps {
  techList: TechItem[];
  activeCategory: string;
  onSelectTech: (tech: TechItem) => void;
  resetSignal: number;
  paused?: boolean;
  isLowPower?: boolean;
}

export default function TechStackPlayground({
  techList,
  activeCategory,
  onSelectTech,
  resetSignal,
  paused = false,
  isLowPower = false,
}: TechStackPlaygroundProps) {
  // Pre-generate stable starting positions staggered in the upper half of the box
  const initialPositions = useMemo(() => {
    return techList.map((_, i) => {
      const col = (i % 6) - 2.5;
      const row = Math.floor(i / 6);
      return [
        col * 1.6 + (Math.random() - 0.5) * 0.4,
        2.5 + row * 1.4 + Math.random() * 0.3,
        (Math.random() - 0.5) * 1.5,
      ] as [number, number, number];
    });
  }, [techList]);

  return (
    <div className="w-full h-full relative">
      <Canvas
        frameloop={paused ? "never" : "always"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 13.5], fov: 42 }}
        gl={{
          alpha: true,
          antialias: !isLowPower,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 8, 8]} intensity={1.2} />
        <pointLight position={[-6, 4, 3]} color="#8B5CF6" intensity={3.0} distance={15} />
        <pointLight position={[6, -3, 3]} color="#EC4899" intensity={2.5} distance={15} />

        <Suspense fallback={null}>
          <Physics paused={paused} gravity={[0, -9.81, 0]}>
            {/* Invisible boundaries containing the playground */}
            <InvisibleBoundaries />

            {/* Cursor-driven kinematic pusher collider */}
            {!paused && <CursorKinematicPusher />}

            {/* Dynamic Tech Stack Spheres */}
            {techList.map((tech, idx) => {
              const isFilteredOut =
                activeCategory !== "ALL" && tech.category !== activeCategory;
              const isHighlighted =
                activeCategory !== "ALL" && tech.category === activeCategory;

              return (
                <TechSphere
                  key={tech.name}
                  tech={tech}
                  initialPos={initialPositions[idx]}
                  isHighlighted={isHighlighted}
                  isFilteredOut={isFilteredOut}
                  onSelect={onSelectTech}
                  resetSignal={resetSignal}
                />
              );
            })}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
