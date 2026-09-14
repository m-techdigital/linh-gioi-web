// v1.94 coverage: high-fidelity professional UI design target is saved for visual comparison.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const targetPath = "/design-reference/public-professional-design-target-v194.png";

test.describe("public professional design target", () => {
  test("high fidelity design board is available for homepage/community comparison", async ({ page }) => {
    const response = await page.request.get(`${web}${targetPath}`);
    expect(response.status(), "professional design target response").toBe(200);

    await page.goto(`${web}${targetPath}`);
    const metrics = await page.evaluate(() => {
      const image = document.querySelector<HTMLImageElement>("img") ?? document.body.appendChild(Object.assign(document.createElement("img"), { src: location.href }));
      return new Promise<{ width: number; height: number; complete: boolean; bodyText: string }>((resolve) => {
        const done = () => resolve({ width: image.naturalWidth, height: image.naturalHeight, complete: image.complete, bodyText: document.body.textContent?.slice(0, 120) ?? "" });
        if (image.complete) done(); else image.addEventListener("load", done, { once: true });
      });
    });
    expect(metrics.complete, "professional design target loaded").toBe(true);
    expect(metrics.width, "professional design target width").toBeGreaterThanOrEqual(1600);
    expect(metrics.height, "professional design target height").toBeGreaterThanOrEqual(900);
  });
});
