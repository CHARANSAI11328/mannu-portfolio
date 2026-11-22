import { MetadataRoute } from "next";
import { getPublishedCmsData } from "@/lib/cms/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mansoorfitness.com";
  const cms = getPublishedCmsData();

  const programUrls = (cms.programs || [])
    .filter((p) => p.is_published)
    .map((p) => ({
      url: `${baseUrl}/programs/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    ...programUrls,
  ];
}
