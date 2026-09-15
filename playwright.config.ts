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
    // v1.224 replaces support mockup/card-only assertions; never counted as runtime PASS.
    "**/fe-support-design-target-density-v1131.spec.ts",
    "**/fe-support-real-ui-layout-v1146.spec.ts",
    "**/fe-support-real-ui-layout-v1204.spec.ts",
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
