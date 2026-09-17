import type { MetadataRoute } from "next";
import { PUBLIC_SITE_ORIGIN, publicLastModifiedForRoute, publicRouteMatrix } from "@lgo-web/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRouteMatrix
    .filter((policy) => policy.indexability === "index")
    .map((policy) => {
      const lastModified = publicLastModifiedForRoute(policy.route);
      return {
        url: new URL(policy.route === "/" ? "/" : policy.route, PUBLIC_SITE_ORIGIN).toString(),
        ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      };
    });
}
