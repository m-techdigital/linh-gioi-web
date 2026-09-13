// v1.60 coverage: fixture form controls stay non-mutating but remain keyboard-readable with aria-disabled.
import { test, expect, type Locator, type Page } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type ControlMetrics = {
  pageOverflow: number;
  controls: Array<{
    tag: string;
    label: string;
    disabled: boolean;
    ariaDisabled: string | null;
    dataDisabled: string | null;
    tabIndex: number;
    focused: boolean;
    readOnly: boolean;
    value: string;
    checked: boolean | null;
    outlineStyle: string;
    fontSize: number;
  }>;
};

async function collectControlMetrics(page: Page): Promise<ControlMetrics> {
  return page.evaluate(() => ({
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    controls: Array.from(document.querySelectorAll<HTMLElement>("main input, main select, main [role='combobox'], main [role='checkbox']")).map((control) => {
      const label = control instanceof HTMLInputElement || control instanceof HTMLSelectElement
        ? control.labels?.[0]?.textContent?.replace(/\s+/g, " ").trim() ?? ""
        : (control.getAttribute("aria-labelledby") ?? "").split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ").replace(/\s+/g, " ").trim();
      return {
      tag: control.tagName,
      label,
      disabled: control instanceof HTMLInputElement || control instanceof HTMLSelectElement ? control.disabled : false,
      ariaDisabled: control.getAttribute("aria-disabled"),
      dataDisabled: control.getAttribute("data-disabled"),
      tabIndex: control.tabIndex,
      focused: document.activeElement === control,
      readOnly: "readOnly" in control ? Boolean(control.readOnly) : control.getAttribute("aria-readonly") === "true",
      value: control instanceof HTMLInputElement || control instanceof HTMLSelectElement ? control.value : control.getAttribute("data-value") ?? control.textContent?.trim() ?? "",
      checked: control instanceof HTMLInputElement && control.type === "checkbox" ? control.checked : control.getAttribute("aria-checked") === null ? null : control.getAttribute("aria-checked") === "true",
      outlineStyle: getComputedStyle(control).outlineStyle,
      fontSize: Number.parseFloat(getComputedStyle(control).fontSize),
    };})
  }));
}

async function expectFixtureControlReadable(control: Locator) {
  await expect(control).toBeVisible();
  await expect(control).not.toHaveAttribute("disabled", /.+/);
  await expect(control).toHaveAttribute("aria-disabled", "true");
  await expect(control).toHaveAttribute("data-disabled", "true");
  await control.focus();
  await expect(control).toBeFocused();
}

test.describe("shared fixture form controls", () => {
  test("Portal auth fixture controls are focusable aria-disabled controls", async ({ page }) => {
    await page.goto(`${portal}/login`);
    await expect(page.getByRole("heading", { name: "Đăng nhập Linh Giới" })).toBeVisible();

    const email = page.getByLabel("Email / tài khoản");
    const password = page.getByLabel("Mật khẩu");
    const remember = page.getByRole("checkbox", { name: "Ghi nhớ thiết bị" });

    await expectFixtureControlReadable(email);
    await expectFixtureControlReadable(password);
    await expectFixtureControlReadable(remember);

    const beforePassword = await password.inputValue();
    await password.press("ControlOrMeta+A");
    await password.pressSequentially("changed");
    await expect(password).toHaveValue(beforePassword);

    const checkedBefore = await remember.getAttribute("aria-checked");
    await remember.press("Space");
    await expect(remember).toHaveAttribute("aria-checked", checkedBefore ?? "false");

    const metrics = await collectControlMetrics(page);
    expect(metrics.pageOverflow, "Portal login page overflow").toBeLessThanOrEqual(0);
    expect(metrics.controls, "Portal login fixture controls").toEqual(expect.arrayContaining([
      expect.objectContaining({ label: "Email / tài khoản", disabled: false, ariaDisabled: "true", dataDisabled: "true", focused: false }),
      expect.objectContaining({ label: "Mật khẩu", disabled: false, ariaDisabled: "true", dataDisabled: "true", readOnly: true }),
      expect.objectContaining({ label: "Ghi nhớ thiết bị", disabled: false, ariaDisabled: "true", dataDisabled: "true" }),
    ]));
    for (const control of metrics.controls) expect(control.fontSize, `${control.label} font-size`).toBeLessThanOrEqual(18);
  });

  test("Ops fixture select controls are focusable aria-disabled controls and do not mutate", async ({ page }) => {
    await page.goto(`${ops}/support/case-001`);
    await expect(page.getByRole("heading", { name: "Support review · case-001" })).toBeVisible();

    const assignment = page.getByRole("combobox", { name: "Assignee" });
    await expectFixtureControlReadable(assignment);
    const beforeValue = await assignment.getAttribute("data-value");
    await assignment.press("ArrowDown");
    await assignment.press("Enter");
    await expect(assignment).toHaveAttribute("data-value", beforeValue ?? "");

    const metrics = await collectControlMetrics(page);
    expect(metrics.pageOverflow, "Ops support review page overflow").toBeLessThanOrEqual(0);
    expect(metrics.controls).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: "Assignee", tag: "DIV", disabled: false, ariaDisabled: "true", dataDisabled: "true", value: beforeValue })
    ]));
    for (const control of metrics.controls) expect(control.fontSize, `${control.label} font-size`).toBeLessThanOrEqual(18);
  });
});
