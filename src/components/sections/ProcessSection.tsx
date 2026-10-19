import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/site";

export function ProcessSection() {
  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="Process"
            title="From brief to live site"
            description="A simple path with named steps, so you always know what’s next."
          />
        </Reveal>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05}>
              <li className="relative h-full rounded-xl border border-border bg-surface p-6">
                <p className="process-node font-display text-sm font-semibold text-accent"><span>{step.number}</span></p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {step.timeline}
                </p>
                <p className="mt-3 text-sm text-muted">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
