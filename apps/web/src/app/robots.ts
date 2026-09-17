import type { MetadataRoute } from "next";
import { PUBLIC_SITE_ORIGIN } from "@lgo-web/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    host: PUBLIC_SITE_ORIGIN,
    sitemap: `${PUBLIC_SITE_ORIGIN}/sitemap.xml`,
  };
}
