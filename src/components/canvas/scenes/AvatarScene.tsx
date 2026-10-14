"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useScrollStore } from "@/store/useScrollStore";

// Safe Error Boundary for GLTF models
class ModelErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Model missing or failed to parse; fallback will render
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Subcomponent: Actual GLB Avatar loader with animation clip handling
function AvatarGLBModel({
  url,
  isTyping,
}: {
  url: string;
  isTyping: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions) return;

    // Search for Idle or Typing clips (case-insensitive)
    const clipKeys = Object.keys(actions);
    const idleKey = clipKeys.find((k) => k.toLowerCase().includes("idle")) || clipKeys[0];
    const typingKey =
      clipKeys.find((k) => k.toLowerCase().includes("typ")) ||
      clipKeys.find((k) => k.toLowerCase().includes("work")) ||
      clipKeys[1] ||
      idleKey;

    const targetKey = isTyping ? typingKey : idleKey;
    const currentAction = actions[targetKey];

    if (currentAction) {
      currentAction.reset().fadeIn(0.4).play();
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.4);
      }
    };
  }, [actions, isTyping]);

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1.5}
      position={[0, -1.2, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Subcomponent: Actual GLB Desk loader
function DeskGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[0, -0.6, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Procedural 3D Desk Placeholder
function DeskPlaceholder() {
  const screenGlowRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (screenGlowRef.current) {
      // Subtle screen scanline code flicker
      const t = state.clock.getElapsedTime();
      const flicker = 0.85 + Math.sin(t * 8.0) * 0.08 + Math.cos(t * 19.0) * 0.07;
      screenGlowRef.current.opacity = flicker;
    }
  });

  return (
    <group position={[0, -0.55, 0]}>
      {/* Sleek Minimalist Desktop Glass Surface */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.04, 1.0]} />
        <meshStandardMaterial
          color="#121218"
          roughness={0.15}
          metalness={0.85}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Cyber Desk Perimeter Edge Glow */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[2.02, 0.02, 1.02]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
      </mesh>

      {/* Sleek Matte Black T-Frame Legs */}
      <mesh position={[-0.85, -0.45, 0]}>
        <boxGeometry args={[0.06, 0.9, 0.7]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.4} metalness={0.9} />
      </mesh>
      <mesh position={[0.85, -0.45, 0]}>
        <boxGeometry args={[0.06, 0.9, 0.7]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Modern Laptop Base with glowing keyboard */}
      <group position={[0, 0.04, 0.05]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 0.015, 0.4]} />
          <meshStandardMaterial color="#181820" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Glowing Keyboard Area */}
        <mesh position={[0, 0.01, 0.04]}>
          <planeGeometry args={[0.45, 0.22]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.7} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.01, -0.11]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 0.1]} />
          <meshStandardMaterial color="#22222c" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Laptop Display Lid (angled back 110 deg) */}
        <group position={[0, 0.01, -0.19]} rotation={[-0.35, 0, 0]}>
          {/* Back Lid */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.55, 0.36, 0.012]} />
            <meshStandardMaterial color="#121218" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Code Screen */}
          <mesh position={[0, 0.18, 0.007]}>
            <planeGeometry args={[0.51, 0.32]} />
            <meshBasicMaterial
              ref={screenGlowRef}
              color="#A78BFA"
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </group>

      {/* Holographic HUD Mini Projector on corner */}
      <mesh position={[0.7, 0.03, 0.2]}>
        <cylinderGeometry args={[0.07, 0.09, 0.04, 24]} />
        <meshStandardMaterial color="#1e1e28" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0.12, 0.2]}>
        <cylinderGeometry args={[0.001, 0.08, 0.15, 24]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Procedural 3D Avatar Placeholder (Capsule body + Head + Glowing Visor + Articulated Arms)
function AvatarPlaceholder({ isTyping }: { isTyping: boolean }) {
  const avatarGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollStore = useScrollStore.getState();
    const mouse = scrollStore.mouse;
    const reducedMotion = scrollStore.reducedMotion;

    if (reducedMotion) return;

    // Natural idle breathing or focused typing bob
    if (avatarGroupRef.current) {
      if (!isTyping) {
        // Idle: gentle breath rising and falling
        avatarGroupRef.current.position.y = Math.sin(t * 1.8) * 0.04;
        avatarGroupRef.current.rotation.y = Math.sin(t * 0.9) * 0.03;
      } else {
        // Typing: slight forward lean & typing intensity
        avatarGroupRef.current.position.y = Math.sin(t * 4.0) * 0.015;
        avatarGroupRef.current.rotation.x = 0.08;
      }
    }

    // Head subtle tracking towards cursor
    if (headRef.current) {
      const targetLookX = mouse.x * 0.25;
      const targetLookY = isTyping ? -0.15 : mouse.y * 0.2;
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetLookX,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetLookY,
        0.05
      );
    }

    // Arms: Idle vs Typing state
    if (leftArmRef.current && rightArmRef.current) {
      if (!isTyping) {
        // Idle arms resting naturally at sides
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.x,
          0.15 + Math.sin(t * 1.8) * 0.04,
          0.08
        );
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.z,
          0.12,
          0.08
        );

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.x,
          0.15 - Math.sin(t * 1.8) * 0.04,
          0.08
        );
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          -0.12,
          0.08
        );
      } else {
        // Typing: arms forward over keyboard, rhythmic typing taps
        const tapLeft = Math.sin(t * 14.0) * 0.08;
        const tapRight = Math.cos(t * 14.0 + 0.8) * 0.08;

        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.x,
          -0.85 + tapLeft,
          0.1
        );
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.z,
          -0.3,
          0.1
        );

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.x,
          -0.85 + tapRight,
          0.1
        );
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          0.3,
          0.1
        );
      }
    }
  });

  return (
    <group ref={avatarGroupRef} position={[0, -0.4, 0]}>
      {/* Stylized Torso / Jacket Capsule */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.34, 0.65, 16, 32]} />
        <meshStandardMaterial
          color="#0d0d14"
          roughness={0.3}
          metalness={0.7}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Cybernetic Luminescent Spine Stripe */}
      <mesh position={[0, 0.48, -0.32]}>
        <boxGeometry args={[0.04, 0.55, 0.02]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* Chest Accent Monogram Emblem */}
      <mesh position={[0, 0.58, 0.33]}>
        <boxGeometry args={[0.1, 0.04, 0.02]} />
        <meshBasicMaterial color="#EC4899" />
      </mesh>

      {/* Head Group with Visor */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Head Mesh */}
        <mesh castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial
            color="#14141e"
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Glowing Neon Cyber Visor */}
        <mesh ref={visorRef} position={[0, 0.04, 0.22]}>
          <boxGeometry args={[0.34, 0.1, 0.08]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={3.0}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Sleek Headset Audio Cans */}
        <mesh position={[-0.27, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
          <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.27, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
          <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Left Arm Articulation */}
      <group ref={leftArmRef} position={[-0.42, 0.75, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.26, 12, 24]} />
          <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Forearm & Hand */}
        <group position={[0, -0.42, 0]}>
          <mesh position={[0, -0.16, 0.04]} castShadow>
            <capsuleGeometry args={[0.06, 0.24, 12, 24]} />
            <meshStandardMaterial color="#181824" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Cybernetic Palm */}
          <mesh position={[0, -0.32, 0.06]}>
            <boxGeometry args={[0.08, 0.08, 0.03]} />
            <meshBasicMaterial color="#8B5CF6" />
          </mesh>
        </group>
      </group>

      {/* Right Arm Articulation */}
      <group ref={rightArmRef} position={[0.42, 0.75, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.26, 12, 24]} />
          <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Forearm & Hand */}
        <group position={[0, -0.42, 0]}>
          <mesh position={[0, -0.16, 0.04]} castShadow>
            <capsuleGeometry args={[0.06, 0.24, 12, 24]} />
            <meshStandardMaterial color="#181824" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Cybernetic Palm */}
          <mesh position={[0, -0.32, 0.06]}>
            <boxGeometry args={[0.08, 0.08, 0.03]} />
            <meshBasicMaterial color="#8B5CF6" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function AvatarScene() {
  const containerRef = useRef<THREE.Group>(null);
  const avatarRigRef = useRef<THREE.Group>(null);
  const deskRigRef = useRef<THREE.Group>(null);
  const backlightRef = useRef<THREE.PointLight>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const [avatarUrl] = useState<string | null>(null);
  const [deskUrl] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useFrame((state) => {
    const scrollStore = useScrollStore.getState();
    const activeSectionIndex = scrollStore.activeSectionIndex;
    const whatIDoProgress = scrollStore.sectionProgress["what-i-do"];
    const careerProgress = scrollStore.sectionProgress.career;
    const mouse = scrollStore.mouse;
    const reducedMotion = scrollStore.reducedMotion;

    // Active range: Visible during About (sec 2) and What I Do (sec 3)
    const isSceneActive =
      (activeSectionIndex === 1 && scrollStore.sectionProgress.transition > 0.8) ||
      activeSectionIndex === 2 ||
      activeSectionIndex === 3 ||
      (activeSectionIndex === 4 && careerProgress < 0.25);

    if (containerRef.current) {
      containerRef.current.visible = isSceneActive;
    }

    // Skip frame compute when off-screen
    if (!isSceneActive) return;

    // Determine typing animation switch
    const shouldType = activeSectionIndex === 3 || whatIDoProgress > 0.15;
    if (shouldType !== isTyping) {
      setIsTyping(shouldType);
    }

    // Smoothly interpolate between About standing pose and What I Do desk pose
    // About: avatar stands at left [-2.2, -0.4, 1.2], rotation.y ~ 0.35 rad (facing content)
    // What I Do: avatar at desk [-2.1, -0.55, 1.0], desk at [-2.1, -1.05, 1.0]
    const deskBlend = Math.min(Math.max((whatIDoProgress - 0.05) / 0.5, 0), 1);

    // Responsive position check for narrow mobile screens
    const isMobile = state.viewport.width < 6.5;
    const targetX = isMobile
      ? 0.0
      : THREE.MathUtils.lerp(-2.25, -2.1, deskBlend) + (reducedMotion ? 0 : mouse.x * 0.1);
    const targetY = isMobile
      ? -0.8
      : THREE.MathUtils.lerp(-0.4, -0.55, deskBlend);
    const targetZ = THREE.MathUtils.lerp(1.2, 1.0, deskBlend);

    // Fade out as entering career section
    let masterAlpha = 1.0;
    if (activeSectionIndex === 4 || careerProgress > 0) {
      masterAlpha = Math.max(0, 1.0 - careerProgress * 4.0);
    } else if (activeSectionIndex === 1) {
      masterAlpha = Math.min(1.0, (scrollStore.sectionProgress.transition - 0.8) * 5.0);
    }

    if (containerRef.current) {
      containerRef.current.scale.setScalar(masterAlpha);
    }

    // Avatar rig positioning
    if (avatarRigRef.current) {
      avatarRigRef.current.position.x = THREE.MathUtils.lerp(
        avatarRigRef.current.position.x,
        targetX,
        0.08
      );
      avatarRigRef.current.position.y = THREE.MathUtils.lerp(
        avatarRigRef.current.position.y,
        targetY,
        0.08
      );
      avatarRigRef.current.position.z = THREE.MathUtils.lerp(
        avatarRigRef.current.position.z,
        targetZ,
        0.08
      );

      // Facing angle
      const targetRotY = isMobile
        ? 0.0
        : THREE.MathUtils.lerp(0.38, 0.12, deskBlend) + (reducedMotion ? 0 : mouse.x * 0.15);
      avatarRigRef.current.rotation.y = THREE.MathUtils.lerp(
        avatarRigRef.current.rotation.y,
        targetRotY,
        0.08
      );
    }

    // Desk rig: fades and rises smoothly into place during What I Do
    if (deskRigRef.current) {
      deskRigRef.current.visible = deskBlend > 0.02;
      deskRigRef.current.position.x = targetX;
      deskRigRef.current.position.y = THREE.MathUtils.lerp(-1.8, -0.95, deskBlend);
      deskRigRef.current.position.z = targetZ + 0.35;
      deskRigRef.current.scale.setScalar(Math.min(1.0, deskBlend * 1.2));
    }

    // Purple backlight glow positioning and pulse
    if (backlightRef.current) {
      backlightRef.current.position.set(targetX, targetY + 0.8, targetZ - 1.2);
      backlightRef.current.intensity = 4.0 + Math.sin(state.clock.getElapsedTime() * 2.0) * 0.8;
    }

    if (haloRef.current) {
      haloRef.current.position.set(targetX, targetY + 0.4, targetZ - 0.8);
      haloRef.current.scale.setScalar(1.0 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06);
    }
  });

  return (
    <group ref={containerRef} visible={false}>
      {/* Signature Purple Backlight Glow */}
      <pointLight
        ref={backlightRef}
        color="#8B5CF6"
        intensity={4.5}
        distance={12}
        decay={2}
      />

      {/* Soft Pink Accent Rim Light */}
      <pointLight position={[-4.5, 0.5, 1.5]} color="#EC4899" intensity={2.5} distance={10} />

      {/* Key Fill Light from front-right */}
      <directionalLight position={[3.0, 4.0, 4.0]} color="#ffffff" intensity={1.2} />
      <ambientLight intensity={0.45} />

      {/* Ethereal Purple Backlight Glow */}
      <mesh ref={haloRef} position={[-2.2, 0.0, 0.2]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3D Avatar Rig (GLB if available, otherwise procedural placeholder) */}
      <group ref={avatarRigRef} position={[-2.2, -0.4, 1.2]}>
        <ModelErrorBoundary
          fallback={<AvatarPlaceholder isTyping={isTyping} />}
        >
          {avatarUrl ? (
            <AvatarGLBModel url={avatarUrl} isTyping={isTyping} />
          ) : (
            <AvatarPlaceholder isTyping={isTyping} />
          )}
        </ModelErrorBoundary>
      </group>

      {/* 3D Workstation Desk Rig (GLB if available, otherwise procedural desk) */}
      <group ref={deskRigRef} position={[-2.1, -1.8, 1.35]} visible={false}>
        <ModelErrorBoundary fallback={<DeskPlaceholder />}>
          {deskUrl ? <DeskGLBModel url={deskUrl} /> : <DeskPlaceholder />}
        </ModelErrorBoundary>
      </group>
    </group>
  );
}
