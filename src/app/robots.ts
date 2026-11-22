import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mansoorfitness.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/programs/", "/privacy", "/terms"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
