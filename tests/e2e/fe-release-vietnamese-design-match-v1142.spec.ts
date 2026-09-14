import { test, expect, type Page } from "@playwright/test";
const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = { overflow:number; h1Size:number; heroBottom:number; boardTop:number; boardBottom:number; stagesTop:number; readinessTop:number; targetText:string; firstFlowText:string };
async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect=(s:string)=>{const n=document.querySelector<HTMLElement>(s); if(!n)return{top:-1,bottom:-1,height:0}; const r=n.getBoundingClientRect(); return{top:r.top,bottom:r.bottom,height:r.height};};
    const h1=document.querySelector<HTMLElement>('main h1');
    const target=document.querySelector<HTMLElement>('.lgo-design-target-reference');
    const hero=document.querySelector<HTMLElement>('.lgo-releasepage-stack .lgo-release-narrative-hero-card');
    const board=document.querySelector<HTMLElement>('.lgo-releasepage-stack .lgo-release-narrative-design-board');
    const stages=document.querySelector<HTMLElement>('.lgo-releasepage-stack .lgo-release-narrative-stage-board');
    const readiness=document.querySelector<HTMLElement>('.lgo-releasepage-stack .lgo-release-readiness-cta');
    return {
      overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
      h1Size: h1?Number.parseFloat(getComputedStyle(h1).fontSize):0,
      heroBottom: rect('.lgo-releasepage-stack .lgo-release-narrative-hero-card').bottom,
      boardTop: rect('.lgo-releasepage-stack .lgo-release-narrative-design-board').top,
      boardBottom: rect('.lgo-releasepage-stack .lgo-release-narrative-design-board').bottom,
      stagesTop: rect('.lgo-releasepage-stack .lgo-release-narrative-stage-board').top,
      readinessTop: rect('.lgo-releasepage-stack .lgo-release-readiness-cta').top,
      targetText: target?.textContent ?? '',
      firstFlowText: [target?.textContent??'', hero?.innerText??'', board?.innerText??'', stages?.innerText??'', readiness?.innerText??''].join('\n'),
    };
  });
}

test.describe('release Vietnamese design match v1.142', () => {
  test('/release uses Vietnamese release target copy and target-led stage flow', async ({ page, isMobile }) => {
    await page.goto(`${web}/release`);
    await expect(page.getByRole('link', { name: /Thiết kế chi tiết phát hành/i })).toBeVisible();
    await expect(page.getByText('Release detailed design target')).toHaveCount(0);
    const m=await collect(page);
    expect(m.targetText).toContain('Thiết kế chi tiết phát hành');
    for (const label of ['Hành trình phát hành', 'Từ sẵn sàng nội dung tới closed test', 'M0', 'M1', 'Bằng chứng trước lời hứa', 'Không claim open beta']) {
      expect(m.firstFlowText).toMatch(new RegExp(label, 'i'));
    }
    expect(m.firstFlowText).not.toMatch(/Release detailed design target|Release narrative|player trust|No public build|entitlement funnel|Proof before promise|Content-ready|Closed-test prerequisites|Backend contract|Owner approval|Player communication|Game reference art|accepted backend\/build entitlement|Player trust first/i);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 52 : 66);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(510);
      expect(m.boardTop).toBeLessThanOrEqual(540);
      expect(m.boardBottom).toBeLessThanOrEqual(820);
      expect(m.stagesTop).toBeLessThanOrEqual(1120);
      expect(m.readinessTop).toBeGreaterThan(m.boardTop);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(1450);
      expect(m.boardTop).toBeLessThanOrEqual(1550);
    }
  });
});
