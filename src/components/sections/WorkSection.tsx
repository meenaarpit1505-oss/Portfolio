import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoWorkGrid } from "@/components/work/BentoWorkGrid";

export function WorkSection() {
  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Recent Framer projects"
            description="Four Framer builds that show the kind of work I take on. Marked as placeholders until live clients are published."
          />
        </Reveal>
        <div className="mt-10">
          <BentoWorkGrid />
        </div>
      </Container>
    </section>
  );
}
