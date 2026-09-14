import { test, expect, type Page } from "@playwright/test";
const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = { overflow:number; h1Size:number; heroBottom:number; firstGatesTop:number; ownerGateTop:number; ownerGateVisibleHeight:number; trustGateTop:number; targetText:string; firstFlowText:string };
async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect=(s:string)=>{const n=document.querySelector<HTMLElement>(s); if(!n)return{top:-1,bottom:-1,height:0}; const r=n.getBoundingClientRect(); return{top:r.top,bottom:r.bottom,height:r.height};};
    const vh=(s:string)=>{const r=rect(s); return Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));};
    const h1=document.querySelector<HTMLElement>('main h1');
    const target=document.querySelector<HTMLElement>('.lgo-design-target-reference');
    const hero=document.querySelector<HTMLElement>('.lgo-downloadtrustpage-stack .lgo-download-trust-hero-card');
    const first=document.querySelector<HTMLElement>('.lgo-downloadtrustpage-stack .lgo-download-trust-first-gates');
    const trust=document.querySelector<HTMLElement>('.lgo-downloadtrustpage-stack .lgo-trust-panel');
    return {
      overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
      h1Size: h1?Number.parseFloat(getComputedStyle(h1).fontSize):0,
      heroBottom: rect('.lgo-downloadtrustpage-stack .lgo-download-trust-hero-card').bottom,
      firstGatesTop: rect('.lgo-downloadtrustpage-stack .lgo-download-trust-first-gates').top,
      ownerGateTop: rect('.lgo-downloadtrustpage-stack .lgo-owner-release-gate-board').top,
      ownerGateVisibleHeight: vh('.lgo-downloadtrustpage-stack .lgo-owner-release-gate-board'),
      trustGateTop: rect('.lgo-downloadtrustpage-stack .lgo-trust-panel').top,
      targetText: target?.textContent ?? '',
      firstFlowText: [target?.textContent??'', hero?.innerText??'', first?.innerText??'', trust?.innerText??''].join('\n'),
    };
  });
}

test.describe('download trust Vietnamese design match v1.141', () => {
  test('/download/trust uses Vietnamese trust-gate target copy and compact first-flow', async ({ page, isMobile }) => {
    await page.goto(`${web}/download/trust`);
    await expect(page.getByRole('link', { name: /Thiết kế chi tiết tin cậy tải game/i })).toBeVisible();
    await expect(page.getByText('Download trust detailed design target')).toHaveCount(0);
    const m=await collect(page);
    expect(m.targetText).toContain('Thiết kế chi tiết tin cậy tải game');
    for (const label of ['Có gói build thật', 'SHA256 hiển thị cạnh link tải', 'Nguồn gốc đọc được bởi người chơi', 'Giới hạn đã biết đặt cạnh CTA', 'Kỳ vọng hỗ trợ đã sẵn sàng', 'Phê duyệt chủ sở hữu']) {
      expect(m.firstFlowText).toContain(label);
    }
    expect(m.firstFlowText).not.toMatch(/Download trust detailed design target|No fake download|placeholder checksum|entitlement claim|Download trust \/ checksum \/ provenance|static public guidance|No public game download artifact|Release trust guide|Trust-first download|artifact|provenance|known limitations|support expectation/i);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 52 : 68);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(510);
      expect(m.trustGateTop).toBeLessThanOrEqual(520);
      expect(m.firstGatesTop).toBeGreaterThan(m.trustGateTop);
      expect(m.firstGatesTop).toBeLessThanOrEqual(1300);
      expect(m.ownerGateTop).toBeLessThanOrEqual(1300);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(1450);
      expect(m.trustGateTop).toBeLessThanOrEqual(1000);
      expect(m.firstGatesTop).toBeGreaterThan(m.trustGateTop);
      expect(m.firstGatesTop).toBeLessThanOrEqual(4300);
    }
  });
});
