import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { DOC_PAGES } from "../lib/docs";
import { CAPABILITY_GROUPS } from "../lib/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/docs", "/capabilities", "/guides", "/changelog"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const docRoutes = DOC_PAGES.map((p) => ({
    url: `${SITE_URL}/docs/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const capabilityRoutes = CAPABILITY_GROUPS.flatMap((g) => g.items).map((c) => ({
    url: `${SITE_URL}/capabilities/${c.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes, ...capabilityRoutes];
}
