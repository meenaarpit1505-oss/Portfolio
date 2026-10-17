import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.8fr)]">
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
              <p>
                I chose Framer because it lets me ship production-quality sites fast — and lets
                clients edit them without needing a developer.
              </p>
            </div>
            <SocialLinks className="mt-6" />
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
            <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full ring-2 ring-[#FF6F61] ring-offset-4 ring-offset-background">
              <ProfilePhoto
                width={280}
                height={280}
                sizes="280px"
                priority={false}
                className="h-full w-full rounded-full"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
