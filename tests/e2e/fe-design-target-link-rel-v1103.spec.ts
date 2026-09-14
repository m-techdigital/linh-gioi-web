// v1.103 coverage: Design Target First links that open new tabs include explicit noopener noreferrer protection.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web },
  { surface: "Player Portal", url: portal },
  { surface: "Ops/Admin", url: ops }
];

test.describe("design target new-tab rel safety", () => {
  for (const item of cases) {
    test(`${item.surface} design target links use noopener noreferrer`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: "Design target reference" });
      await expect(region).toBeVisible();
      const links = region.getByRole("link", { name: /design target.*opens in a new tab/i });
      await expect(links).toHaveCount(2);

      for (const link of await links.all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        const rel = (await link.getAttribute("rel")) ?? "";
        expect(rel.split(/\s+/), `${item.surface} rel contains noopener`).toContain("noopener");
        expect(rel.split(/\s+/), `${item.surface} rel contains noreferrer`).toContain("noreferrer");
      }
    });
  }
});
