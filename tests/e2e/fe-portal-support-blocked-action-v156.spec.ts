// v1.56 coverage: Portal support blocked action remains keyboard-readable and non-operational.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type Metrics = {
  overflow: boolean;
  focusedOutline: string;
  buttonFont: number;
  describedBy: string | null;
  helpText: string | null;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const button = document.querySelector<HTMLButtonElement>("main button");
    const active = document.activeElement as HTMLElement | null;
    const describedBy = button?.getAttribute("aria-describedby") ?? null;
    const helpText = describedBy ? document.getElementById(describedBy)?.textContent ?? null : null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
      buttonFont: button ? Number.parseFloat(getComputedStyle(button).fontSize) : 0,
      describedBy,
      helpText,
    };
  });
}

test.describe("Portal support blocked action", () => {
  test("new support case action is focusable, explained and cannot write", async ({ page }) => {
    const writes: string[] = [];
    page.on("request", (request) => {
      if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
    });

    await page.goto(`${portal}/support`);
    await expect(page.getByRole("heading", { name: "Hỗ trợ người chơi" })).toBeVisible();
    await expect(page.getByText("Support fixture only")).toBeVisible();

    const button = page.getByRole("button", { name: "Mở case mới chưa khả dụng" });
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).toHaveAttribute("data-disabled", "true");
    await expect(button).toHaveAttribute("aria-describedby", /blocked-action/);
    await button.focus();
    await expect(button).toBeFocused();
    await button.click({ force: true });
    await page.keyboard.press("Enter");

    const metrics = await collectMetrics(page);
    expect(metrics.focusedOutline, "keyboard focus outline").not.toBe("none");
    expect(metrics.helpText, "blocked reason copy").toContain("NO_ACCEPTED_BACKEND_CONTRACT");
    expect(metrics.overflow, "horizontal overflow").toBe(false);
    expect(metrics.buttonFont, "button font-size cap").toBeLessThanOrEqual(18);
    expect(writes).toEqual([]);
  });
});
