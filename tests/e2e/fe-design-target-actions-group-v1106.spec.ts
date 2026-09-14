// v1.106 coverage: Design Target First action links are exposed as a named group per surface.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target action link group", () => {
  for (const item of cases) {
    test(`${item.surface} target links are in a named action group`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const group = region.getByRole("group", { name: new RegExp(`Design targets.*${item.scope.source}`, "i") });
      await expect(group).toBeVisible();
      await expect(group.getByRole("link", { name: /design target.*opens in a new tab/i })).toHaveCount(2);
    });
  }
});
