/**
 * Public profile and feature flags.
 *
 * Fill these in when you have real assets/links:
 * - SOCIALS: icons with an empty URL are hidden
 * - Profile photo: add the file at /public/arpit.jpg
 */
export const SHOW_TESTIMONIALS = false;
export const SHOW_LOGOS = false;

export const EMAIL = "meenaarpit907@gmail.com";

export const BOOKING_URL =
  `mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio&body=Hi%20Arpit%2C%0A%0AProject%20type%3A%20%0ABudget%3A%20%0ATimeline%3A%20%0ADetails%3A%20`;

export const PROFILE_PHOTO = "/arpit.jpg";

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/arpit-meena-018a19341/",
  x: "",
  github: "https://github.com/meenaarpit1505-oss",
  contra: "",
} as const;

export type SocialKey = keyof typeof SOCIALS;

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  x: "X",
  github: "GitHub",
  contra: "Contra",
};

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

export const LAUNCH_OFFER = {
  enabled: true,
  price: 600,
  spotsLeft: 3,
} as const;

export function getSocialLinks(): SocialLink[] {
  return (Object.keys(SOCIALS) as SocialKey[])
    .map((key) => ({
      key,
      label: SOCIAL_LABELS[key],
      href: SOCIALS[key].trim(),
    }))
    .filter((item) => item.href.length > 0);
}

export function isMailtoHref(href = BOOKING_URL): boolean {
  return href.trim().toLowerCase().startsWith("mailto:");
}

export function isExternalBooking(): boolean {
  const href = BOOKING_URL.trim();
  if (!href || isMailtoHref(href)) return false;
  return href.startsWith("http://") || href.startsWith("https://");
}

export function getBookingHref(): string {
  if (BOOKING_URL.trim().length > 0) return BOOKING_URL.trim();
  return "/#contact";
}

export function getLaunchOfferHref(): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent("Launch offer – landing page")}`;
}

export function isLaunchOfferVisible(): boolean {
  return LAUNCH_OFFER.enabled && LAUNCH_OFFER.spotsLeft > 0;
}
