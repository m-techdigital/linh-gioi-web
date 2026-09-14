// v1.104 coverage: Design Target First regions expose their surface scope in the accessible region name.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target region scoped accessible name", () => {
  for (const item of cases) {
    test(`${item.surface} region includes its design scope`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: /Design target reference/i });
      await expect(region).toBeVisible();
      await expect(page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") })).toBeVisible();
    });
  }
});
