import { MetadataRoute } from "next";
import { content } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = content.metadata.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
