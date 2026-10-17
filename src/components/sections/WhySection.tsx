import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { reasons } from "@/data/site";
import { Gauge, MessageCircle, Target, Zap } from "lucide-react";

const icons = {
  zap: Zap,
  target: Target,
  gauge: Gauge,
  message: MessageCircle,
} as const;

export function WhySection() {
  return (
    <section id="why" className="section" aria-labelledby="why-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow="Why work with me"
            title="Straightforward, async-friendly, and built to last"
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon];
            return (
              <Reveal key={reason.title} delay={index * 0.05}>
                <SpotlightCard
                  label={reason.title}
                  className="h-full rounded-xl border border-border bg-surface p-6"
                >
                  <Icon className="mb-4 h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{reason.description}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
