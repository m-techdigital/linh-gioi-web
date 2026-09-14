// v1.110 coverage: Design Target First links use a consistent default transition across public and workspace surfaces.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target transition parity", () => {
  for (const item of cases) {
    test(`${item.surface} design target links expose a default transition`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const link = region.getByRole("link", { name: /design target.*opens in a new tab/i }).first();
      await expect(link).toBeVisible();
      const transitionDuration = await link.evaluate((node) => window.getComputedStyle(node).transitionDuration);
      const seconds = transitionDuration.split(",").map((value) => value.trim()).map((value) => value.endsWith("ms") ? Number.parseFloat(value) / 1000 : Number.parseFloat(value));
      expect(Math.max(...seconds), `${item.surface} transition duration`).toBeGreaterThanOrEqual(0.15);
    });
  }
});
