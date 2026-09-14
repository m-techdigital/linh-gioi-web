// v1.100 coverage: every surface exposes the shared component/state design target.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  { surface: "Public", url: web },
  { surface: "Player Portal", url: portal },
  { surface: "Ops/Admin", url: ops }
];

const componentHref = "/design-reference/design-atlas-components-v195.png";

test.describe("component/state design target attachment", () => {
  for (const item of cases) {
    test(`${item.surface} exposes and serves Component/state target`, async ({ page }) => {
      await page.goto(item.url);
      const region = page.getByRole("region", { name: "Design target reference" });
      await expect(region).toBeVisible();
      const link = region.getByRole("link", { name: "Component/state design target" });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", componentHref);

      const response = await page.request.get(new URL(componentHref, item.url).toString());
      expect(response.status(), `${item.surface} component target response`).toBe(200);
      expect(response.headers()["content-type"] ?? "", `${item.surface} component target content-type`).toContain("image/png");

      await page.goto(new URL(componentHref, item.url).toString());
      const metrics = await page.evaluate(() => {
        const image = document.querySelector<HTMLImageElement>("img") ?? document.body.appendChild(Object.assign(document.createElement("img"), { src: location.href }));
        return new Promise<{ width: number; height: number; complete: boolean }>((resolve) => {
          const done = () => resolve({ width: image.naturalWidth, height: image.naturalHeight, complete: image.complete });
          if (image.complete) done(); else image.addEventListener("load", done, { once: true });
        });
      });
      expect(metrics.complete, `${item.surface} component target loaded`).toBe(true);
      expect(metrics.width, `${item.surface} component target width`).toBeGreaterThanOrEqual(1600);
      expect(metrics.height, `${item.surface} component target height`).toBeGreaterThanOrEqual(900);
    });
  }
});
