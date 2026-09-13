// v1.66 coverage: shared pagination boundary buttons expose a visible unavailable reason via aria-describedby.
import { test, expect, type Page } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type PaginationMetrics = {
  pageOverflow: number;
  buttons: Array<{
    text: string;
    ariaDisabled: string | null;
    dataDisabled: string | null;
    ariaLabel: string | null;
    describedBy: string | null;
    describedText: string;
    tabIndex: number;
    fontSize: number;
  }>;
};

async function collectPaginationMetrics(page: Page): Promise<PaginationMetrics> {
  return page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lgo-pagination-bar button")).map((button) => {
      const describedBy = button.getAttribute("aria-describedby");
      return {
        text: button.textContent?.trim() ?? "",
        ariaDisabled: button.getAttribute("aria-disabled"),
        dataDisabled: button.getAttribute("data-disabled"),
        ariaLabel: button.getAttribute("aria-label"),
        describedBy,
        describedText: describedBy ? document.getElementById(describedBy)?.textContent?.trim() ?? "" : "",
        tabIndex: button.tabIndex,
        fontSize: Number.parseFloat(getComputedStyle(button).fontSize),
      };
    });
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      buttons,
    };
  });
}

async function expectPaginationBoundaryReason(page: Page) {
  await page.goto(`${ops}/support`);
  await expect(page.getByRole("heading", { name: "Support triage" })).toBeVisible();
  const metrics = await collectPaginationMetrics(page);
  expect(metrics.pageOverflow, "Ops support horizontal overflow").toBeLessThanOrEqual(0);
  expect(metrics.buttons, "pagination boundary buttons").toHaveLength(2);
  for (const button of metrics.buttons) {
    expect(button.ariaDisabled, `${button.text} aria-disabled`).toBe("true");
    expect(button.dataDisabled, `${button.text} data-disabled`).toBe("true");
    expect(button.tabIndex, `${button.text} keyboard focusable`).toBe(0);
    expect(button.ariaLabel, `${button.text} aria label`).toContain("không khả dụng trong fixture hiện tại");
    expect(button.describedBy, `${button.text} aria-describedby`).toBeTruthy();
    expect(button.describedText, `${button.text} visible reason text`).toContain("Pagination unavailable");
    expect(button.describedText, `${button.text} fixture reason text`).toContain("không khả dụng trong fixture hiện tại");
    expect(button.fontSize, `${button.text} font-size`).toBeLessThanOrEqual(18);
  }
}

test.describe("shared pagination boundary reason", () => {
  test("Ops support pagination boundary buttons keep focus and expose visible unavailable reason", async ({ page, isMobile }) => {
    await expectPaginationBoundaryReason(page);
    if (isMobile) {
      const previous = page.getByRole("button", { name: /Trang trước/ });
      await previous.focus();
      await expect(previous).toBeFocused();
    }
  });
});
