import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Le système de livraison gouverné`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#05060a",
    categories: ["developer", "productivity"],
  };
}
