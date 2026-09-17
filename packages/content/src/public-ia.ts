import { contentEntries } from "./fixtures";
import type { ContentEntry } from "./types";

export type PublicRouteOwner = "product" | "guide" | "news" | "support" | "archive";
export type PublicDiscovery = "primary" | "secondary" | "archive";
export type PublicIndexability = "index" | "noindex";
export type PublicLanguageProfile = "player" | "trust" | "archive";

export type PublicRoutePolicy = {
  route: string;
  owner: PublicRouteOwner;
  discovery: PublicDiscovery;
  indexability: PublicIndexability;
  language: PublicLanguageProfile;
};

const route = (
  path: string,
  owner: PublicRouteOwner,
  discovery: PublicDiscovery = "secondary",
  indexability: PublicIndexability = "index",
  language: PublicLanguageProfile = "player",
): PublicRoutePolicy => ({ route: path, owner, discovery, indexability, language });

const productRoutes: PublicRoutePolicy[] = [
  route("/", "product", "primary"),
  route("/game", "product", "primary"),
  route("/classes", "product", "primary"),
  route("/story", "product", "primary"),
  route("/game/loop", "product", "primary"),
  route("/journey", "product"),
  route("/start", "product", "primary"),
  route("/download", "product", "primary", "index", "trust"),
  route("/download/trust", "product", "secondary", "index", "trust"),
  route("/release", "product", "secondary", "index", "trust"),
  route("/release/readiness", "product", "secondary", "index", "trust"),
  route("/release/tester-pack", "product", "secondary", "index", "trust"),
  route("/status", "product", "secondary", "index", "trust"),
  route("/community", "product", "primary"),
  route("/community/onboarding", "product"),
  route("/roadmap", "product"),
];

const supportRoutes: PublicRoutePolicy[] = [
  route("/support", "support", "primary"),
  route("/support/help", "support"),
  route("/support/safety", "support"),
  route("/accessibility", "support"),
  route("/performance", "support"),
];

const guideRoutes = [
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
] as const;

const guidePolicies = guideRoutes.map((path, index) => route(path, "guide", index === 0 ? "primary" : "secondary"));

export const currentNewsPolicy: Record<string, "player" | "archive"> = {
  "web-program-control-tower": "archive",
  "public-ux-content-polish-started": "archive",
  "visual-responsive-polish-started": "archive",
  "public-game-info-depth-started": "archive",
  "news-guide-detail-pages-started": "archive",
  "status-download-trust-polish-started": "archive",
  "closed-tester-information-pack-started": "archive",
  "community-roadmap-onboarding-started": "archive",
  "content-ia-hub-polish-started": "archive",
  "world-gameplay-loop-depth-started": "archive",
  "player-safety-support-faq-polish-started": "archive",
  "accessibility-readability-polish-started": "archive",
  "performance-copy-asset-budget-polish-started": "archive",
  "route-continuity-conversion-polish-started": "archive",
  "player-trust-release-narrative-started": "archive",
  "release-readiness-hub-polish-started": "archive",
  "faq-search-helpfulness-polish-started": "archive",
};

const publishedNews = () => contentEntries.filter((entry) => entry.category === "news" && entry.status === "published");

export function playerNewsEntries(): ContentEntry[] {
  return publishedNews().filter((entry) => currentNewsPolicy[entry.slug] === "player");
}

export function archiveNewsEntries(): ContentEntry[] {
  return publishedNews().filter((entry) => currentNewsPolicy[entry.slug] === "archive");
}

const archiveRoutes: PublicRoutePolicy[] = [
  route("/events", "archive", "archive", "noindex", "archive"),
  route("/patch-notes", "archive", "archive", "noindex", "archive"),
  ...publishedNews().map((entry) => route(
    `/news/${entry.slug}`,
    currentNewsPolicy[entry.slug] === "player" ? "news" : "archive",
    currentNewsPolicy[entry.slug] === "player" ? "secondary" : "archive",
    currentNewsPolicy[entry.slug] === "player" ? "index" : "noindex",
    currentNewsPolicy[entry.slug] === "player" ? "player" : "archive",
  )),
];

export const publicRouteMatrix: readonly PublicRoutePolicy[] = [
  ...productRoutes,
  ...supportRoutes,
  ...guidePolicies,
  route("/news", "news", "primary"),
  ...archiveRoutes,
];

export function routePolicy(pathname: string): PublicRoutePolicy | undefined {
  return publicRouteMatrix.find((entry) => entry.route === pathname);
}

export const publicLanguageContract = {
  archiveOnlyTerms: [
    "WEB v",
    "PROVISIONAL_WEB_FIXTURE",
    "fixture",
    "runtime",
    "e2e",
    "source-owned",
    "source-ready",
    "owner approval",
    "monorepo",
    "Turborepo",
    "pnpm",
  ],
  trustTerms: ["checksum", "SHA256", "artifact"],
  preferredTerms: {
    backend: "hệ thống máy chủ hoặc dịch vụ vận hành chưa được kết nối",
    production: "môi trường vận hành chính thức",
    fixture: "dữ liệu minh họa nội bộ",
    runtime: "môi trường chạy",
  },
} as const;
