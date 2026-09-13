// v1.57 coverage: shared pagination boundary controls remain keyboard-readable without native disabled.
import { test, expect } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type Metrics = {
  overflow: boolean;
  focusedOutline: string;
  buttons: Array<{
    text: string;
    disabled: boolean;
    ariaDisabled: string | null;
    dataDisabled: string | null;
    ariaLabel: string | null;
    fontSize: number;
  }>;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lgo-pagination-bar button")).map((button) => ({
      text: button.textContent?.trim() ?? "",
      disabled: button.disabled,
      ariaDisabled: button.getAttribute("aria-disabled"),
      dataDisabled: button.getAttribute("data-disabled"),
      ariaLabel: button.getAttribute("aria-label"),
      fontSize: Number.parseFloat(getComputedStyle(button).fontSize),
    }));
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
      buttons,
    };
  });
}

test.describe("shared pagination boundary controls", () => {
  test("Ops support pagination is focusable, aria-disabled and non-writing", async ({ page }) => {
    const writes: string[] = [];
    page.on("request", (request) => {
      if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
    });

    await page.goto(`${ops}/support`);
    await expect(page.getByRole("heading", { name: "Support triage" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Pagination" })).toBeVisible();

    const previous = page.getByRole("button", { name: /Trang trước/ });
    const next = page.getByRole("button", { name: /Trang sau/ });
    await expect(previous).toHaveAttribute("aria-disabled", "true");
    await expect(next).toHaveAttribute("aria-disabled", "true");
    await expect(previous).toHaveAttribute("data-disabled", "true");
    await expect(next).toHaveAttribute("data-disabled", "true");
    await previous.focus();
    await expect(previous).toBeFocused();
    await previous.click({ force: true });
    await next.focus();
    await expect(next).toBeFocused();
    await page.keyboard.press("Enter");

    const metrics = await collectMetrics(page);
    expect(metrics.focusedOutline, "keyboard focus outline").not.toBe("none");
    expect(metrics.overflow, "horizontal overflow").toBe(false);
    expect(metrics.buttons, "pagination button count").toHaveLength(2);
    for (const button of metrics.buttons) {
      expect(button.disabled, `${button.text} native disabled`).toBe(false);
      expect(button.ariaDisabled, `${button.text} aria-disabled`).toBe("true");
      expect(button.dataDisabled, `${button.text} data-disabled`).toBe("true");
      expect(button.ariaLabel, `${button.text} unavailable label`).toContain("không khả dụng");
      expect(button.fontSize, `${button.text} font-size`).toBeLessThanOrEqual(18);
    }
    expect(writes).toEqual([]);
  });
});
