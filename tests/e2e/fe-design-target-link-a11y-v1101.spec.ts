// v1.101 coverage: Design Target First links that open new tabs expose that behavior in their accessible names.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  {
    surface: "Public",
    url: web,
    targetNames: ["Public Core design target", "Component/state design target"]
  },
  {
    surface: "Player Portal",
    url: portal,
    targetNames: ["Player Portal design target", "Component/state design target"]
  },
  {
    surface: "Ops/Admin",
    url: ops,
    targetNames: ["Ops/Admin design target", "Component/state design target"]
  }
];

test.describe("design target link new-tab accessibility", () => {
  for (const item of cases) {
    test(`${item.surface} design target links announce new-tab behavior`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: "Design target reference" });
      await expect(region).toBeVisible();

      for (const targetName of item.targetNames) {
        const link = region.getByRole("link", { name: new RegExp(`${targetName}.*mở trong tab mới`, "i") });
        await expect(link, `${item.surface} ${targetName} accessible new-tab name`).toBeVisible();
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noreferrer/);
      }
    });
  }
});
