// v1.112 coverage: Public download/trust route keeps the shared play/download CTA marked as the active section.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("public download section navigation continuity", () => {
  test("/download/trust keeps Trạng thái chơi marked current", async ({ page }) => {
    await page.goto(`${web}/download/trust`);
    const nav = page.getByRole("navigation", { name: "Linh Giới Online public navigation" });
    await expect(nav).toBeVisible();
    const playLink = nav.getByRole("link", { name: "Trạng thái chơi" });
    await expect(playLink).toBeVisible();
    await expect(playLink).toHaveAttribute("aria-current", "page");
  });
});
