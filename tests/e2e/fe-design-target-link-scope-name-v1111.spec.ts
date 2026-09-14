// v1.111 coverage: every Design Target First link accessible name carries the active surface scope.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scopeText: "Public Core", scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scopeText: "Player Portal", scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scopeText: "Ops/Admin", scope: /Ops\/Admin/i }
];

test.describe("design target link scoped accessible names", () => {
  for (const item of cases) {
    test(`${item.surface} target links include the surface scope in their accessible names`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const links = region.getByRole("link", { name: /design target.*opens in a new tab/i });
      await expect(links).toHaveCount(2);
      for (const link of await links.all()) {
        await expect(link, `${item.surface} scoped link name`).toHaveAccessibleName(new RegExp(`${item.scopeText.replace("/", "\\/")}.*opens in a new tab`, "i"));
      }
    });
  }
});
