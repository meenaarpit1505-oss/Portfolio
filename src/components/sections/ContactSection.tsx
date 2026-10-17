import { AvailabilityBadge } from "@/components/contact/AvailabilityBadge";
import { BookCallButton } from "@/components/contact/BookCallButton";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-[2.25rem]"
            >
              Have a project in mind? Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-md text-base text-muted">
              Replies within 24 hours (IST).
            </p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <AvailabilityBadge />
              <BookCallButton>Email me about your project</BookCallButton>
              <CopyEmailButton />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
