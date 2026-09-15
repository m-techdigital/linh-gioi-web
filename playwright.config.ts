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
  // Historical readiness/tester schematic-card implementations are replaced by v1.221/v1.222.
  // These cases are retired, NOT counted as PASS; real composition and interaction tests replace them.
  testIgnore: [
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
