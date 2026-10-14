import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TransitionSection } from "@/components/sections/TransitionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* 1. Hero: Liquid Chrome Blob & Layered Giant Serif Headline */}
      <HeroSection />

      {/* 2. Transition: Particle Burst Zone */}
      <TransitionSection />

      {/* 3. About: 3D Avatar & Editorial Story */}
      <AboutSection />

      {/* 4. What I Do: Workstation Desk Rig & Dual Column Services */}
      <WhatIDoSection />

      {/* 5. Career: Scroll-drawn Timeline */}
      <CareerSection />

      {/* 6. Work: Selected Projects Gallery */}
      <WorkSection />

      {/* 7. Tech Stack: Rapier Physics Playground */}
      <TechStackSection />

      {/* 8. Contact: Bold Outro, Email, Form & Footer */}
      <ContactSection />
    </main>
  );
}
