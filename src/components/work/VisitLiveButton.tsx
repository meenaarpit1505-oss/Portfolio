import { MagneticButton } from "@/components/ui/MagneticButton";

export function VisitLiveButton({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <MagneticButton href={href} external className={className}>
      Visit live site
    </MagneticButton>
  );
}
