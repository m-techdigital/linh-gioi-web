// v1.109 coverage: Design Target First focus motion respects reduced-motion preferences.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target reduced motion focus", () => {
  for (const item of cases) {
    test(`${item.surface} disables focus lift when reduced motion is requested`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      const link = region.getByRole("link", { name: /design target.*opens in a new tab/i }).first();
      await expect(link).toBeVisible();
      await link.focus();
      await expect(link).toBeFocused();
      const style = await link.evaluate((node) => {
        const computed = window.getComputedStyle(node);
        return { transform: computed.transform, transitionDuration: computed.transitionDuration };
      });
      expect(style.transform, `${item.surface} reduced-motion transform`).toBe("none");
      expect(style.transitionDuration, `${item.surface} reduced-motion transition`).toBe("0s");
    });
  }
});
