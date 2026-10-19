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
            title="Selected work, built to move"
            description="A curated set of digital experiences where strategy, systems, and sharp interaction design meet."
          />
        </Reveal>
        <div className="mt-10">
          <BentoWorkGrid />
        </div>
      </Container>
    </section>
  );
}
