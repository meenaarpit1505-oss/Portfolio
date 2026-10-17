import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { HoverLink, RollText } from "@/components/ui/RollText";
import { site } from "@/data/site";
import { ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.725-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ContraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

function FramerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M6 3h12v6H12L6 3zm0 6h6l6 6H12v6l-6-6V9z" />
    </svg>
  );
}

const icons: Record<string, (props: { className?: string }) => ReactNode> = {
  LinkedIn: ({ className }) => <LinkedinIcon className={className} />,
  X: ({ className }) => <XIcon className={className} />,
  GitHub: ({ className }) => <GithubIcon className={className} />,
  Contra: ({ className }) => <ContraIcon className={className} />,
  "Framer Marketplace": ({ className }) => <FramerIcon className={className} />,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            {site.socials.map((social) => {
              const Icon = icons[social.label];
              return (
                <li key={social.label}>
                  <HoverLink
                    href={social.href}
                    external
                    ariaLabel={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-hover hover:text-foreground"
                  >
                    <RollText className="h-4 w-4 items-center justify-center">
                      {Icon ? <Icon className="h-4 w-4" /> : social.label}
                    </RollText>
                  </HoverLink>
                </li>
              );
            })}
          </ul>
          <HoverLink
            href="#hero"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <RollText>Back to top</RollText>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>
      </Container>
    </footer>
  );
}
