import { site } from "@/data/site";
import { EMAIL, getSocialLinks } from "@/lib/config";

export function PersonJsonLd() {
  const sameAs = getSocialLinks().map((link) => link.href);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Framer Developer",
    email: `mailto:${EMAIL}`,
    url: site.siteUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
