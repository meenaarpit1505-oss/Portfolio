import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";
import Image from "next/image";

function Stars() {
  return (
    <p className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      ))}
    </p>
  );
}

export function TestimonialWall() {
  const featured = testimonials.find((item) => item.featured) ?? testimonials[0];
  const rest = testimonials.filter((item) => item.name !== featured.name);

  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Testimonials"
            title="What collaborators say"
          />
        </Reveal>

        <figure className="mt-10 rounded-xl border border-border bg-surface p-6 shadow-card sm:p-10">
          <Stars />
          <blockquote className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Image
              src={featured.photo}
              alt={`Portrait of ${featured.name}`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-border"
            />
            <div>
              <p className="text-sm font-semibold">{featured.name}</p>
              <p className="text-xs text-muted">
                {featured.role}, {featured.company}
              </p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {rest.map((item) => (
            <figure
              key={item.name}
              className="mb-4 break-inside-avoid rounded-xl border border-border bg-surface p-5"
            >
              <Stars />
              <blockquote className="mt-4 text-sm leading-relaxed text-muted">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Image
                  src={item.photo}
                  alt={`Portrait of ${item.name}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-border"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.role}, {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
