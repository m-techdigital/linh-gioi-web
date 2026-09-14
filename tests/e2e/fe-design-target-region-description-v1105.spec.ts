// v1.105 coverage: Design Target First regions connect their visible note as an accessible description.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, scope: /Public Core/i },
  { surface: "Player Portal", url: portal, scope: /Player Portal/i },
  { surface: "Ops/Admin", url: ops, scope: /Ops\/Admin/i }
];

test.describe("design target region accessible description", () => {
  for (const item of cases) {
    test(`${item.surface} region describes the comparison note`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: new RegExp(`Design target reference.*${item.scope.source}`, "i") });
      await expect(region).toBeVisible();
      const descriptionId = await region.getAttribute("aria-describedby");
      expect(descriptionId, `${item.surface} region aria-describedby`).toBeTruthy();

      const note = page.locator(`#${descriptionId}`);
      await expect(note, `${item.surface} described note`).toBeVisible();
      await expect(note, `${item.surface} note mentions design comparison`).toContainText(/atlas|design|đối chiếu/i);
    });
  }
});
