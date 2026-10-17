"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { getBookingHref, isExternalBooking } from "@/lib/config";
import type { ReactNode } from "react";

export function BookCallButton({
  children = "Email me",
  className = "",
  variant = "primary",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const external = isExternalBooking();

  return (
    <MagneticButton
      href={getBookingHref()}
      external={external}
      className={className}
      variant={variant}
    >
      {children}
    </MagneticButton>
  );
}
