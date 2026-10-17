import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "@/components/ui/Container";
import { HoverLink, RollText } from "@/components/ui/RollText";
import { site } from "@/data/site";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <SocialLinks />
          <HoverLink
            href="#hero"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <RollText>Back to top</RollText>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>
      </Container>
    </footer>
  );
}
