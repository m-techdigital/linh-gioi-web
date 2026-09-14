// v1.98 coverage: Portal and Ops workspaces expose their registered design targets.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  {
    url: portal,
    label: "Player Portal design target",
    href: "/design-reference/design-atlas-portal-v195.png",
    scope: "Player Portal"
  },
  {
    url: ops,
    label: "Ops/Admin design target",
    href: "/design-reference/design-atlas-ops-v195.png",
    scope: "Ops/Admin"
  }
];

test.describe("workspace design target attachment", () => {
  for (const item of cases) {
    test(`${item.scope} exposes registered design target`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: "Design target reference" });
      await expect(region).toBeVisible();
      await expect(region.getByText("Design Target First")).toBeVisible();
      await expect(region.getByText(item.scope, { exact: true })).toBeVisible();
      await expect(region.getByText("Base UI/UX Layout")).toBeVisible();
      await expect(region.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);

      const box = await region.boundingBox();
      expect(box?.width ?? 0, "workspace design target region width").toBeGreaterThan(240);
      expect(box?.height ?? 0, "workspace design target region height").toBeGreaterThan(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
});
