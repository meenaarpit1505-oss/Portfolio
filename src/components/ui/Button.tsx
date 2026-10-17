import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong shadow-sm",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-border-hover hover:bg-surface",
} as const;

const shared =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
}) {
  const classNames = `${shared} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="button" className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="button" className={classNames}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      data-cursor="button"
      className={`${shared} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
