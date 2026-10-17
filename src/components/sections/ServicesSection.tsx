import { FigmaIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/data/site";
import { Boxes, Globe, LayoutTemplate, RefreshCw } from "lucide-react";

const icons = {
  layout: LayoutTemplate,
  globe: Globe,
  figma: FigmaIcon,
  refresh: RefreshCw,
  component: Boxes,
} as const;

export function ServicesSection() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="What I can take off your plate"
            description="Fixed-scope Framer work. Prices below are starting points — I’ll quote a clear fee after a short call."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <SpotlightCard
                  label={service.title}
                  className="card-lift flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-card"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{service.description}</p>
                  <p className="mt-5 text-sm font-medium text-foreground">
                    from ${service.priceFrom.toLocaleString("en-US")}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
