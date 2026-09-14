// v1.95 coverage: full-screen design atlas references are saved for UI/UX comparison.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

const atlasTargets = [
  {
    path: "/design-reference/design-atlas-public-core-v195.png",
    label: "public core page atlas",
    minWidth: 1400,
    minHeight: 850,
  },
  {
    path: "/design-reference/design-atlas-public-service-v195.png",
    label: "public service page atlas",
    minWidth: 1400,
    minHeight: 850,
  },
  {
    path: "/design-reference/design-atlas-portal-v195.png",
    label: "player portal page atlas",
    minWidth: 1400,
    minHeight: 850,
  },
  {
    path: "/design-reference/design-atlas-ops-v195.png",
    label: "ops admin page atlas",
    minWidth: 1400,
    minHeight: 850,
  },
  {
    path: "/design-reference/design-atlas-components-v195.png",
    label: "component and state atlas",
    minWidth: 1400,
    minHeight: 850,
  },
];

test.describe("complete design atlas", () => {
  for (const target of atlasTargets) {
    test(`${target.label} target is available for comparison`, async ({ page }) => {
      const response = await page.request.get(`${web}${target.path}`);
      expect(response.status(), `${target.label} response`).toBe(200);

      await page.goto(`${web}${target.path}`);
      const metrics = await page.evaluate(() => {
        const image = document.querySelector<HTMLImageElement>("img") ?? document.body.appendChild(Object.assign(document.createElement("img"), { src: location.href }));
        return new Promise<{ width: number; height: number; complete: boolean }>((resolve) => {
          const done = () => resolve({ width: image.naturalWidth, height: image.naturalHeight, complete: image.complete });
          if (image.complete) done(); else image.addEventListener("load", done, { once: true });
        });
      });
      expect(metrics.complete, `${target.label} loaded`).toBe(true);
      expect(metrics.width, `${target.label} width`).toBeGreaterThanOrEqual(target.minWidth);
      expect(metrics.height, `${target.label} height`).toBeGreaterThanOrEqual(target.minHeight);
    });
  }
});
