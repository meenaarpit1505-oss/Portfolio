import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolLogo } from "@/components/ui/ToolLogo";
import { tools } from "@/data/site";

export function ToolsSection() {
  return (
    <section id="tools" className="section" aria-labelledby="tools-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="tools-heading"
            eyebrow="Tools"
            title="What I build with"
            description="Logos only — the stack behind typical Framer and frontend work."
          />
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {tools.map((tool) => (
            <li key={tool.name}>
              <ToolLogo name={tool.name} logo={tool.logo} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
