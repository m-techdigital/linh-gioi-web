// v1.97 coverage: public routes expose their registered design target for runtime comparison.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

const cases = [
  {
    route: "/",
    label: "Public Core design target",
    href: "/design-reference/design-atlas-public-core-v195.png"
  },
  {
    route: "/support",
    label: "Public Service design target",
    href: "/design-reference/design-atlas-public-service-v195.png"
  }
];

test.describe("public design target attachment", () => {
  for (const item of cases) {
    test(`${item.route} exposes ${item.label}`, async ({ page }) => {
      await page.goto(`${web}${item.route}`);
      const region = page.getByRole("region", { name: "Design target reference" });
      await expect(region).toBeVisible();
      await expect(region.getByText("Design Target First")).toBeVisible();
      const link = region.getByRole("link", { name: item.label });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", item.href);
      await expect(region.getByText("Base UI/UX Layout")).toBeVisible();

      const box = await region.boundingBox();
      expect(box?.width ?? 0, "design target region has visible width").toBeGreaterThan(240);
      expect(box?.height ?? 0, "design target region has visible height").toBeGreaterThan(44);
    });
  }
});
