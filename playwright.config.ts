import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

type ActiveSuiteManifest = {
  active: { browser_specs: string[] };
  superseded: { browser_specs: Record<string, { reason: string }> };
};

const ACTIVE_SUITE_MANIFEST = path.resolve(__dirname, "tools/web_active_suite_manifest_v1298.json");
const activeSuite = JSON.parse(fs.readFileSync(ACTIVE_SUITE_MANIFEST, "utf8")) as ActiveSuiteManifest;
const activeBrowserSpecs = activeSuite.active.browser_specs.map(name => `**/${name}`);
const supersededBrowserSpecs = Object.keys(activeSuite.superseded.browser_specs).map(name => `**/${name}`);

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
  testMatch: activeBrowserSpecs,
  testIgnore: supersededBrowserSpecs,
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
