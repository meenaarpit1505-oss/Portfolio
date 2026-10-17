import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[80vh] items-center pt-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">404</p>
          <h1 className="mt-4 font-display text-display font-semibold">Page not found</h1>
          <p className="mt-4 text-base text-muted">
            That URL doesn’t exist. Head home or browse selected work.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Go home</ButtonLink>
            <MagneticButton href="/#work" variant="secondary">
              View work
            </MagneticButton>
          </div>
        </div>
      </Container>
    </main>
  );
}
