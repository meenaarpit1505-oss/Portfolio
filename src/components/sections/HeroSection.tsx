import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-accent)_18%,transparent),transparent_55%)]"
      />
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {site.availability}
          </p>
          <h1 className="font-display text-display font-semibold text-foreground">
            {site.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{site.subhead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={site.calendlyUrl} external>
              Book a call
            </MagneticButton>
            <MagneticButton href="/#work" variant="secondary">
              View work
            </MagneticButton>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-muted">
            {site.trustItems.map((item, index) => (
              <li key={item} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span className="hidden text-border sm:inline" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
