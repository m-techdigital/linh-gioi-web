import { defineConfig, devices } from "@playwright/test";

const skipWebServer = Boolean(process.env.LGO_WEB_SKIP_WEBSERVER);

const webServers = [
  {
    command: "pnpm --filter @lgo-web/web dev --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000
  },
  {
    command: "pnpm --filter @lgo-web/portal dev --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 120_000
  },
  {
    command: "pnpm --filter @lgo-web/ops dev --hostname 127.0.0.1 --port 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: true,
    timeout: 120_000
  }
];

export default defineConfig({
  testDir: "./tests/e2e",
  // Historical readiness/tester/status schematic-card implementations are replaced by v1.221–v1.223.
  // These cases are retired, NOT counted as PASS; real composition and interaction tests replace them.
  testIgnore: [
    // Public design targets remain evidence artifacts but no longer render as player-facing chrome; v1.272a owns public shell consistency.
    "**/fe-public-design-target-attachment-v197.spec.ts",
    // v1.273 replaces the historical /release proof-board and compact proof-stack layouts.
    "**/fe-public-release-narrative-design-board-v174.spec.ts",
    "**/fe-release-design-target-density-v1127.spec.ts",
    "**/fe-release-vietnamese-design-match-v1142.spec.ts",
    "**/fe-release-real-ui-layout-v1200.spec.ts",
    "**/fe-release-real-ui-layout-v1220.spec.ts",
    // v1.271 replaces the historical /download proof/depth layouts with the truthful target-driven release-gate landing.
    "**/fe-download-design-target-density-v1125.spec.ts",
    "**/fe-download-vietnamese-design-match-v1140.spec.ts",
    "**/fe-download-real-ui-layout-v1218.spec.ts",
    // v1.270 replaces the historical /start proof-board/gallery/class-world layouts with the live target-driven onboarding landing.
    "**/fe-public-start-design-board-v179.spec.ts",
    "**/fe-public-start-real-onboarding-gallery-v190.spec.ts",
    "**/fe-start-design-target-density-v1124.spec.ts",
    "**/fe-start-vietnamese-design-match-v1139.spec.ts",
    "**/fe-start-real-ui-layout-v1217.spec.ts",
    // v1.269 replaces the historical /journey proof/timeline layouts with the target-driven session landing.
    "**/fe-public-journey-design-board-v180.spec.ts",
    "**/fe-journey-design-target-density-v1123.spec.ts",
    "**/fe-journey-vietnamese-design-match-v1138.spec.ts",
    "**/fe-journey-real-ui-layout-v1216.spec.ts",
    // v1.268 replaces the historical /classes proof/art layouts with the live target-driven five-path landing.
    "**/fe-public-class-art-loading-v154.spec.ts",
    "**/fe-public-class-art-typography-v155.spec.ts",
    "**/fe-classes-design-target-density-v1122.spec.ts",
    "**/fe-classes-vietnamese-design-match-v1137.spec.ts",
    "**/fe-classes-real-ui-layout-v1215.spec.ts",
    // v1.267 replaces the historical /story proof-board layouts with the live target-driven story landing.
    "**/fe-public-story-chapter-typography-v164.spec.ts",
    "**/fe-public-story-fracture-design-board-v184.spec.ts",
    "**/fe-story-design-target-density-v1121.spec.ts",
    "**/fe-story-vietnamese-design-match-v1136.spec.ts",
    "**/fe-story-real-ui-layout-v1214.spec.ts",
    // v1.266 replaces the historical /game proof-board layouts with the live target-driven world landing.
    "**/fe-public-game-world-design-board-v183.spec.ts",
    "**/fe-game-world-design-target-density-v1120.spec.ts",
    "**/fe-game-world-vietnamese-first-flow-v1135.spec.ts",
    "**/fe-game-real-ui-layout-v1213.spec.ts",
    // Owner reopened homepage: old tests asserted a split hero/design link, not actual new composition.
    "**/fe-public-home-visual-target-v193.spec.ts",
    "**/fe-homepage-detailed-design-target-v1118.spec.ts",
    "**/fe-homepage-target-fold-density-v1119.spec.ts",
    "**/fe-homepage-vietnamese-first-flow-v1134.spec.ts",

    // v1.264 replaces only this compact article; Safety and FAQ destination suites stay active.
    "**/fe-news-player-safety-support-real-ui-layout-v1190.spec.ts",
    // v1.263 replaces the old compact article only; world-loop and guide suites stay active.
    "**/fe-news-world-gameplay-loop-real-ui-layout-v1189.spec.ts",
    // v1.262 supersedes this compact article only; library and Start behavior stay covered.
    "**/fe-news-content-ia-hub-real-ui-layout-v1187.spec.ts",
    // v1.261 replaces only this compact article; community and roadmap destination suites stay active.
    "**/fe-news-community-roadmap-real-ui-layout-v1188.spec.ts",
    // v1.260 replaces both historical compact render checks for this exact tester news slug.
    "**/fe-news-closed-tester-pack-real-ui-layout-v1183.spec.ts",
    "**/fe-news-closed-tester-pack-real-ui-layout-v1196.spec.ts",
    // v1.259 replaces only this exact compact status/trust article layout.
    "**/fe-news-status-download-trust-real-ui-layout-v1182.spec.ts",
    // v1.258 replaces only the exact compact news/guide-detail article. Other articles remain active.
    "**/fe-news-guide-detail-real-ui-layout-v1181.spec.ts",
    // v1.257 replaces only the exact compact public-game-info article; other article suites remain active.
    "**/fe-news-public-game-info-real-ui-layout-v1180.spec.ts",
    // v1.256 replaces only this exact compact article; source/reading/sibling suites remain active.
    "**/fe-news-visual-responsive-real-ui-layout-v1179.spec.ts",
    // v1.255 replaces only the original compact UX article; other news and heading tests remain active.
    "**/fe-news-public-ux-real-ui-layout-v1178.spec.ts",
    // v1.254 replaces only the first compact news article; other news/article tests remain active.
    "**/fe-news-control-tower-real-ui-layout-v1177.spec.ts",
    // v1.253 replaces only the old three-card news index; article and heading tests remain active.
    "**/fe-news-real-ui-layout-v1176.spec.ts",
    // v1.252 replaces exact old compact patch-note snapshots; v1.85 heading/route tests stay active.
    "**/fe-patch-notes-real-ui-layout-v1199.spec.ts",
    "**/fe-patch-notes-real-ui-layout-v1175.spec.ts",
    // v1.251 replaces only the old compact events-page layout assertions.
    "**/fe-events-real-ui-layout-v1174.spec.ts",
    "**/fe-events-real-ui-layout-v1198.spec.ts",
    // v1.250 replaces only this compact FAQ guide; category/source/runtime tests stay active.
    "**/fe-guides-faq-search-helpfulness-real-ui-layout-v1173.spec.ts",
    // v1.249 owns only this formerly compact article; tester/privacy and real navigation stay active.
    "**/fe-guides-closed-tester-information-pack-real-ui-layout-v1172.spec.ts",
    // v1.248 replaces only this guide's compact-layout assertions. Source/route tests remain active.
    "**/fe-guides-release-readiness-hub-real-ui-layout-v1171.spec.ts",
    // v1.247 replaces this exact compact guide; HTTP/source/interaction guards remain active.
    "**/fe-guides-player-trust-release-real-ui-layout-v1170.spec.ts",
    // v1.246 replaces only the compact route-continuity guide, not its source/HTTP contracts.
    "**/fe-guides-route-continuity-conversion-real-ui-layout-v1169.spec.ts",
    // v1.245 replaces this exact compact guide; source/HTTP/reading tests remain active.
    "**/fe-guides-performance-copy-budget-real-ui-layout-v1168.spec.ts",
    // v1.244 replaces this exact compact readability guide; historical, not runtime PASS.
    "**/fe-guides-accessibility-readability-real-ui-layout-v1167.spec.ts",
    // v1.243 supersedes only the compact player-safety guide layout; historical, not PASS.
    "**/fe-guides-player-safety-support-real-ui-layout-v1166.spec.ts",
    // v1.242 supersedes only the static compact start-here guide, not a runtime PASS.
    "**/fe-guides-start-here-real-ui-layout-v1164.spec.ts",
    // v1.241 replaces only the old compact community-roadmap guide; historical != runtime PASS.
    "**/fe-guides-community-roadmap-real-ui-layout-v1163.spec.ts",
    // v1.240 replaces only the compact trust/checksum article layout; historical is not PASS.
    "**/fe-guides-release-trust-real-ui-layout-v1162.spec.ts",
    // v1.239 replaces only the compact support/community guide layout; historical is not PASS.
    "**/fe-guides-support-community-real-ui-layout-v1161.spec.ts",
    // v1.238 supersedes only the old compact download-readiness article, not a runtime PASS.
    "**/fe-guides-download-readiness-real-ui-layout-v1160.spec.ts",
    // v1.237 replaces only the old training-guide compact layout, not a runtime PASS.
    "**/fe-guides-beginner-training-loop-real-ui-layout-v1159.spec.ts",
    // v1.236 replaces only the gate-entry compact layout; published/category checks stay active.
    "**/fe-guides-gate-entry-real-ui-layout-v1158.spec.ts",
    // v1.235 replaces the clipped beginner multi-board layout; historical assertions are not PASS.
    "**/fe-guides-beginner-real-ui-layout-v1157.spec.ts",
    // v1.234 replaces exact old guides two-shelf/line-clamp layout; published-content checks remain active.
    "**/fe-guides-index-real-ui-layout-v1156.spec.ts",
    // v1.233 replaces four-column guide/CTA presentation with source-complete article navigation.
    // Only these exact historical world-loop layouts are superseded; not counted as runtime PASS.
    "**/fe-guide-world-loop-real-ui-layout-v1155.spec.ts",
    "**/fe-guides-world-gameplay-loop-real-ui-layout-v1165.spec.ts",

    // v1.232 retires exact old loop diagram/compact composition; shared onboarding/heading tests stay active.
    "**/fe-public-game-loop-design-board-v182.spec.ts",
    "**/fe-game-loop-real-ui-layout-v1154.spec.ts",
    "**/fe-game-loop-real-ui-layout-v1212.spec.ts",

    // v1.231 replaces roadmap image/compact assertions; active trust-heading/status regression stays.
    "**/fe-public-roadmap-design-board-v170.spec.ts",
    "**/fe-roadmap-real-ui-layout-v1153.spec.ts",
    "**/fe-roadmap-real-ui-layout-v1211.spec.ts",

    // v1.230 replaces diagram/compact readability checks with native focus practice; NOT PASS.
    "**/fe-public-accessibility-design-board-v178.spec.ts",
    "**/fe-accessibility-real-ui-layout-v1152.spec.ts",
    "**/fe-accessibility-real-ui-layout-v1210.spec.ts",

    // v1.229 replaces embedded performance HUD/compact assertions with live reader controls; NOT PASS.
    "**/fe-public-performance-design-board-v176.spec.ts",
    "**/fe-performance-real-ui-layout-v1151.spec.ts",
    "**/fe-performance-real-ui-layout-v1209.spec.ts",

    // v1.228 replaces mislabeled combat-board/compact onboarding cases; not counted as PASS.
    "**/fe-public-community-onboarding-design-board-v175.spec.ts",
    "**/fe-community-onboarding-real-ui-layout-v1150.spec.ts",
    "**/fe-community-onboarding-real-ui-layout-v1208.spec.ts",

    // v1.227 replaces community mockup/compact layout; v1.91 asset/gallery coverage stays active.
    "**/fe-community-real-ui-layout-v1149.spec.ts",
    "**/fe-community-real-ui-layout-v1207.spec.ts",

    // v1.226 supersedes static safety mockup assertions; not counted as PASS.
    "**/fe-public-safety-support-design-board-v172.spec.ts",
    "**/fe-support-safety-design-target-density-v1133.spec.ts",
    "**/fe-support-safety-real-ui-layout-v1148.spec.ts",
    "**/fe-support-safety-real-ui-layout-v1206.spec.ts",

    // v1.225 retires diagram-only help presentation; replaced by real map/answers/history tests, NOT PASS.
    "**/fe-public-support-help-design-board-v173.spec.ts",
    "**/fe-support-help-design-target-density-v1132.spec.ts",
    "**/fe-support-help-real-ui-layout-v1147.spec.ts",
    "**/fe-support-help-real-ui-layout-v1205.spec.ts",

    // v1.224 replaces support mockup/card-only assertions; never counted as runtime PASS.
    "**/fe-support-design-target-density-v1131.spec.ts",
    "**/fe-support-real-ui-layout-v1146.spec.ts",
    "**/fe-support-real-ui-layout-v1204.spec.ts",
    // v1.285 replaces v1.224 duplicated support-topic wall with one primary station + FAQ flow.
    "**/fe-support-real-ui-layout-v1224.spec.ts",
    "**/fe-public-status-design-board-v181.spec.ts",
    "**/fe-status-design-target-density-v1130.spec.ts",
    "**/fe-status-vietnamese-real-ui-layout-v1145.spec.ts",
    "**/fe-status-real-ui-layout-v1203.spec.ts",

    "**/fe-public-closed-tester-design-board-v177.spec.ts",
    "**/fe-tester-pack-design-target-density-v1129.spec.ts",
    "**/fe-tester-pack-vietnamese-real-ui-layout-v1144.spec.ts",
    "**/fe-release-tester-pack-real-ui-layout-v1202.spec.ts",

    "**/fe-public-release-readiness-design-board-v171.spec.ts",
    "**/fe-release-readiness-design-target-density-v1128.spec.ts",
    "**/fe-release-readiness-real-ui-layout-v1143.spec.ts",
    "**/fe-release-readiness-real-ui-layout-v1201.spec.ts"
  ],
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.LGO_WEB_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"] } }
  ],
  webServer: skipWebServer ? undefined : webServers
});
