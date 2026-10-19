import { BookCallButton } from "@/components/contact/BookCallButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-48">
      <div aria-hidden="true" className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <div aria-hidden="true" className="hero-spotlight pointer-events-none absolute left-1/2 top-44 -z-10 h-72 w-[min(900px,90vw)] -translate-x-1/2 rounded-full blur-3xl" />
      <div aria-hidden="true" className="float-orb pointer-events-none absolute -left-24 top-28 -z-10 size-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div aria-hidden="true" className="float-orb pointer-events-none absolute right-[-8rem] top-12 -z-10 size-96 rounded-full bg-fuchsia-500/15 blur-3xl [animation-delay:-3s]" />
      <Container>
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
            <span className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-[#FF6F61] ring-offset-1 ring-offset-background">
              <ProfilePhoto
                width={28}
                height={28}
                sizes="28px"
                priority={false}
                className="h-7 w-7 rounded-full"
              />
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {site.availability}
          </p>
          <h1 className="font-display text-display mx-auto max-w-4xl text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-foreground">
            Build <span className="gradient-text">what&apos;s next.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{site.subhead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookCallButton>Email me</BookCallButton>
            <MagneticButton href="/#work" variant="secondary">
              View work
            </MagneticButton>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-muted">
            {site.trustItems.map((item, index) => (
              <li key={item} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span className="hidden text-border sm:inline" aria-hidden="true">
                    &middot;
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
