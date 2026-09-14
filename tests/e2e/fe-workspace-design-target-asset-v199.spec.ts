// v1.99 coverage: workspace design-target links resolve to real PNG assets in each app runtime.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const cases = [
  {
    url: portal,
    label: "Player Portal design target",
    href: "/design-reference/design-atlas-portal-v195.png",
    minWidth: 1600,
    minHeight: 900
  },
  {
    url: ops,
    label: "Ops/Admin design target",
    href: "/design-reference/design-atlas-ops-v195.png",
    minWidth: 1600,
    minHeight: 900
  }
];

test.describe("workspace design target assets", () => {
  for (const item of cases) {
    test(`${item.label} link resolves inside its workspace runtime`, async ({ page }) => {
      await page.goto(item.url);
      const link = page.getByRole("region", { name: "Design target reference" }).getByRole("link", { name: item.label });
      await expect(link).toHaveAttribute("href", item.href);

      const response = await page.request.get(new URL(item.href, item.url).toString());
      expect(response.status(), `${item.label} response`).toBe(200);
      expect(response.headers()["content-type"] ?? "", `${item.label} content-type`).toContain("image/png");

      await page.goto(new URL(item.href, item.url).toString());
      const metrics = await page.evaluate(() => {
        const image = document.querySelector<HTMLImageElement>("img") ?? document.body.appendChild(Object.assign(document.createElement("img"), { src: location.href }));
        return new Promise<{ width: number; height: number; complete: boolean }>((resolve) => {
          const done = () => resolve({ width: image.naturalWidth, height: image.naturalHeight, complete: image.complete });
          if (image.complete) done(); else image.addEventListener("load", done, { once: true });
        });
      });
      expect(metrics.complete, `${item.label} loaded`).toBe(true);
      expect(metrics.width, `${item.label} width`).toBeGreaterThanOrEqual(item.minWidth);
      expect(metrics.height, `${item.label} height`).toBeGreaterThanOrEqual(item.minHeight);
    });
  }
});
