import type { MetadataRoute } from "next";
import { localContentRepository } from "@lgo-web/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://linhgioi.vn";
  const staticRoutes = [
    "",
    "/start",
    "/accessibility",
    "/performance",
    "/journey",
    "/release",
    "/release/readiness",
    "/release/tester-pack",
    "/support/help",
    "/game",
    "/game/loop",
    "/roadmap",
    "/news",
    "/events",
    "/community",
    "/community/onboarding",
    "/guides",
    "/guides/beginner",
    "/guides/gate-entry-guide",
    "/guides/beginner-training-loop-guide",
    "/guides/download-readiness-guide",
    "/guides/support-and-community-guide",
    "/guides/release-trust-and-checksum-guide",
    "/guides/community-roadmap-onboarding-guide",
    "/guides/start-here-content-hub-guide",
    "/guides/world-gameplay-loop-guide",
    "/guides/player-safety-support-guide",
    "/guides/accessibility-readability-guide",
    "/guides/performance-copy-budget-guide",
    "/guides/route-continuity-conversion-guide",
    "/guides/player-trust-release-guide",
    "/guides/release-readiness-hub-guide",
    "/guides/closed-tester-information-pack-guide",
    "/guides/faq-search-helpfulness-guide",
    "/patch-notes",
    "/download",
    "/download/trust",
    "/support",
    "/support/safety",
    "/status"
  ];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-09-05") })),
    ...localContentRepository.list("news").map((entry) => ({ url: `${base}/news/${entry.slug}`, lastModified: new Date(entry.publishedAt) }))
  ];
}
