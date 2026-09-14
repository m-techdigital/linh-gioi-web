// v1.107 coverage: Design Target First new-tab links include a visible cue, not only an accessible-name suffix.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target visible new-tab cue", () => {
  for (const item of cases) {
    test(`${item.surface} design target links show a visible external cue`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const links = region.getByRole("link", { name: /design target.*opens in a new tab/i });
      await expect(links).toHaveCount(2);

      for (const link of await links.all()) {
        await expect(link.locator(".lgo-design-target-reference-link-cue"), `${item.surface} visible cue`).toHaveText("↗");
        await expect(link.locator(".lgo-design-target-reference-link-cue"), `${item.surface} cue visible`).toBeVisible();
      }
    });
  }
});
