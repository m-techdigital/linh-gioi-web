// v1.102 coverage: Design Target First links share the same visible focus motion across public and workspace surfaces.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web, targetName: /Public Core design target/i },
  { surface: "Player Portal", url: portal, targetName: /Player Portal design target/i },
  { surface: "Ops/Admin", url: ops, targetName: /Ops\/Admin design target/i }
];

test.describe("design target focus motion parity", () => {
  for (const item of cases) {
    test(`${item.surface} design target link has visible focus motion`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: "Design target reference" });
      const link = region.getByRole("link", { name: item.targetName }).first();
      await expect(link).toBeVisible();

      await link.focus();
      await expect(link).toBeFocused();
      const focusStyle = await link.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return {
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          outlineOffset: style.outlineOffset,
          transform: style.transform
        };
      });
      expect(focusStyle.outlineStyle, `${item.surface} outline style`).not.toBe("none");
      expect(Number.parseFloat(focusStyle.outlineWidth), `${item.surface} outline width`).toBeGreaterThanOrEqual(2);
      expect(Number.parseFloat(focusStyle.outlineOffset), `${item.surface} outline offset`).toBeGreaterThanOrEqual(3);
      expect(focusStyle.transform, `${item.surface} focus motion`).not.toBe("none");
    });
  }
});
