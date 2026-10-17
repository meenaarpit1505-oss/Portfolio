import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { HoverLink, RollText } from "@/components/ui/RollText";
import { getSocialLinks, type SocialKey } from "@/lib/config";
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
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

const icons: Record<SocialKey, (props: { className?: string }) => ReactNode> = {
  linkedin: ({ className }) => <LinkedinIcon className={className} />,
  x: ({ className }) => <XIcon className={className} />,
  github: ({ className }) => <GithubIcon className={className} />,
  contra: ({ className }) => <ContraIcon className={className} />,
};

export function SocialLinks({
  className = "",
}: {
  className?: string;
}) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((social) => {
        const Icon = icons[social.key];
        return (
          <li key={social.key}>
            <HoverLink
              href={social.href}
              external
              ariaLabel={social.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <RollText className="h-4 w-4 items-center justify-center">
                <Icon className="h-4 w-4" />
              </RollText>
            </HoverLink>
          </li>
        );
      })}
    </ul>
  );
}
