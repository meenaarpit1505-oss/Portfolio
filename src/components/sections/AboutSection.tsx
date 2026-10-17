import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <Reveal>
            <SectionHeading
              id="about-heading"
              eyebrow="About"
              title={site.about.headline}
            />
            <div className="mt-6 space-y-4 text-base text-muted">
              {site.about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {site.about.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-border bg-surface p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src={site.about.photo}
                alt={site.about.photoAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 360px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
