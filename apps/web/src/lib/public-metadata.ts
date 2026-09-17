import { PUBLIC_SITE_ORIGIN, publicMetadataForRoute } from "@lgo-web/content";
import type { Metadata } from "next";

export const publicMetadataBase = new URL(PUBLIC_SITE_ORIGIN);

export function metadataForRoute(pathname: string): Metadata {
  const source = publicMetadataForRoute(pathname);
  return {
    title: source.title,
    description: source.description,
    alternates: { canonical: source.canonical },
    robots: source.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: source.title,
      description: source.description,
      url: source.canonical,
      type: source.openGraphType,
      ...(source.publishedAt && source.openGraphType === "article" ? { publishedTime: source.publishedAt } : {}),
    },
  };
}
