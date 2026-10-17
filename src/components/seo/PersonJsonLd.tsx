import { site } from "@/data/site";
import { EMAIL, SITE_URL, getSocialLinks } from "@/lib/config";

export function PersonJsonLd() {
  const sameAs = getSocialLinks().map((link) => link.href);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Framer Developer",
    email: `mailto:${EMAIL}`,
    url: SITE_URL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
