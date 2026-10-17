import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { WhySection } from "@/components/sections/WhySection";
import { WorkSection } from "@/components/sections/WorkSection";
import { LogoMarquee } from "@/components/proof/LogoMarquee";
import { SHOW_LOGOS, SHOW_TESTIMONIALS } from "@/lib/config";

export default function Home() {
  return (
    <main id="main">
      <HeroSection />
      {SHOW_LOGOS ? <LogoMarquee /> : null}
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <WhySection />
      <ToolsSection />
      {SHOW_TESTIMONIALS ? <TestimonialsSection /> : null}
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
