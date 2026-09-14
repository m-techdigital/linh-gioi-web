import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  hubTop: number;
  ownerTop: number;
  targetText: string;
  firstFlowText: string;
};

async function collect(page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const h1 = document.querySelector<HTMLElement>("main h1");
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const hero = document.querySelector<HTMLElement>(".lgo-releasereadinesspage-stack .lgo-release-readiness-hero-card");
    const board = document.querySelector<HTMLElement>(".lgo-releasereadinesspage-stack .lgo-release-readiness-design-board");
    const hub = document.querySelector<HTMLElement>(".lgo-releasereadinesspage-stack .lgo-release-readiness-hub-board");
    const owner = document.querySelector<HTMLElement>(".lgo-releasereadinesspage-stack .lgo-owner-release-gate-board");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-hero-card").bottom,
      boardTop: rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-design-board").top,
      boardBottom: rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-design-board").bottom,
      hubTop: rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-hub-board").top,
      ownerTop: rect(".lgo-releasereadinesspage-stack .lgo-owner-release-gate-board").top,
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", board?.innerText ?? "", hub?.innerText ?? "", owner?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("release readiness Vietnamese design match v1.143", () => {
  test("/release/readiness uses Vietnamese readiness target copy and target-led owner gate flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/readiness`);
    await expect(page.getByRole("heading", { name: "Sẵn sàng phát hành" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Thiết kế chi tiết sẵn sàng phát hành" })).toBeVisible();
    await expect(page.getByText("Release readiness detailed design target")).toHaveCount(0);

    const metrics = await collect(page);
    expect(metrics.targetText).toContain("Public Release Readiness");
    expect(metrics.targetText).toContain("Thiết kế chi tiết sẵn sàng phát hành");
    const normalizedText = metrics.firstFlowText.toLocaleLowerCase("vi-VN");
    expect(normalizedText).toContain("cổng readiness");
    expect(normalizedText).toContain("cổng owner");
    expect(metrics.firstFlowText).toContain("NO_ACCEPTED_BACKEND_CONTRACT");
    expect(normalizedText).toContain("không mở funnel giả");
    expect(metrics.firstFlowText, "old hero should not remain above the fold").not.toContain("Release readiness: đọc gate");

    expect(metrics.overflow, "release readiness horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "release readiness h1 scale").toBeLessThanOrEqual(isMobile ? 48 : 54);
    expect(metrics.boardTop, "readiness board follows hero").toBeGreaterThan(metrics.heroBottom - 80);
    expect(metrics.hubTop, "readiness hub follows board").toBeGreaterThan(metrics.boardTop);
    expect(metrics.ownerTop, "owner gates follow hub").toBeGreaterThan(metrics.hubTop);
    expect(metrics.ownerTop - metrics.hubTop, "owner gates stay close to readiness hub").toBeLessThanOrEqual(isMobile ? 1100 : 620);

    if (!isMobile) {
      expect(metrics.heroBottom, "desktop compact readiness hero").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board enters first fold").toBeLessThanOrEqual(450);
      expect(metrics.boardBottom, "desktop board remains compact").toBeLessThanOrEqual(680);
      expect(metrics.hubTop, "desktop hub begins near first fold").toBeLessThanOrEqual(760);
    } else {
      expect(metrics.heroBottom, "mobile hero remains readable without excessive height").toBeLessThanOrEqual(980);
      expect(metrics.boardTop, "mobile board follows without excessive blank gap").toBeLessThanOrEqual(1080);
    }
  });
});
