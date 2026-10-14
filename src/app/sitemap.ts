import { MetadataRoute } from "next";
import { content } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = content.metadata.siteUrl;

  const projectRoutes: MetadataRoute.Sitemap = content.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
