// v1.108 coverage: Design Target First visible new-tab cue is spaced from the label on public and workspace surfaces.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target new-tab cue spacing", () => {
  for (const item of cases) {
    test(`${item.surface} design target links keep cue spacing`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const links = region.getByRole("link", { name: /design target.*opens in a new tab/i });
      await expect(links).toHaveCount(2);

      for (const link of await links.all()) {
        const gap = await link.evaluate((node) => Number.parseFloat(window.getComputedStyle(node).columnGap));
        expect(gap, `${item.surface} link cue gap`).toBeGreaterThanOrEqual(6);
      }
    });
  }
});
