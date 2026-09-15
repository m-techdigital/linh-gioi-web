import { test, expect } from '@playwright/test';
const origin=process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';

test.describe('world loop reading journey, not gameplay v1.232',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/game/loop');await expect(page.getByRole('heading',{level:1,name:'Vòng lặp gameplay thế giới',exact:true})).toBeVisible();});
 test('world illustration and four real reading choices replace a static game diagram',async({page,isMobile})=>{
  const vista=page.locator('.lgo-loop-vista');await expect(vista).toBeVisible();await expect(page.locator('main img[src*=design-boards],main img[src*=design-reference]')).toHaveCount(0);
  const steps=page.locator('#loop-reading .lgo-progress-step');await expect(steps).toHaveCount(4);
  const m=await page.evaluate(()=>{const copy=document.querySelector('.lgo-world-loop-experience .lgo-release-hero-copy')!.getBoundingClientRect();const vista=document.querySelector('.lgo-loop-vista')!.getBoundingClientRect();const steps=[...document.querySelectorAll('#loop-reading .lgo-progress-step')].map(e=>e.getBoundingClientRect().toJSON());const img=document.querySelector('.lgo-loop-vista img') as HTMLImageElement;return {copy:copy.toJSON(),vista:vista.toJSON(),steps,loaded:img.complete&&img.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile){expect(m.vista.top).toBeGreaterThanOrEqual(m.copy.bottom);expect(m.steps[1]!.top).toBeGreaterThan(m.steps[0]!.top);}else{expect(m.vista.left).toBeGreaterThanOrEqual(m.copy.right);expect(new Set(m.steps.map(s=>Math.round(s.top))).size).toBe(1);}
  await page.screenshot({path:test.info().outputPath('loop-layout.png'),fullPage:true});
 });
 test('choosing each stage exposes its matching source boundary and guide destination',async({page})=>{
  const journey=page.locator('#loop-reading .lgo-reading-journey');const buttons=journey.locator('.lgo-progress-step button');await expect(buttons).toHaveCount(4);
  const paths=['/game','/guides/world-gameplay-loop-guide','/guides/beginner','/download/trust'];
  const boundaries=['No public game client download','No persisted dialogue','No HP, damage','No fake download CTA'];
  for(let i=0;i<4;i++){
   await buttons.nth(i).focus();await page.keyboard.press('Enter');await expect(buttons.nth(i)).toHaveAttribute('aria-pressed','true');
   await expect(journey.locator('[aria-pressed=true]')).toHaveCount(1);await expect(journey.locator('.lgo-reading-journey-panel')).toContainText(boundaries[i]!);
   await expect(journey.locator('.lgo-reading-journey-panel a')).toHaveAttribute('href',paths[i]!);expect((await page.request.get(origin+paths[i])).status()).toBe(200);
   await expect(journey.getByRole('status')).toContainText(`${i+1}/4`);
  }
  await journey.locator('.lgo-reading-journey-panel a').click();await expect(page).toHaveURL(origin+'/download/trust');
 });
 test('previous next and reload only change the local reading position',async({page})=>{
  const journey=page.locator('#loop-reading .lgo-reading-journey');await expect(journey).toBeVisible();const previous=journey.getByRole('button',{name:'Bước trước',exact:true}),next=journey.getByRole('button',{name:'Bước tiếp',exact:true});
  await expect(previous).toBeDisabled();const requests:string[]=[];page.on('request',r=>{if(['xhr','fetch'].includes(r.resourceType())||r.method()!=='GET')requests.push(r.url());});
  for(let i=0;i<3;i++)await next.click();await expect(next).toBeDisabled();await expect(journey.locator('[data-state=complete]')).toHaveCount(0);await expect(journey).toContainText('không lưu tiến trình nhân vật');
  await previous.click();await expect(journey.getByRole('status')).toContainText('3/4');expect(requests).toEqual([]);
  await page.reload();await expect(journey.getByRole('status')).toContainText('1/4');await expect(previous).toBeDisabled();
 });
 test('beginner questions disclose full guidance and safe route links',async({page})=>{
  const questions=page.locator('#loop-questions .lgo-question-list details');await expect(questions).toHaveCount(4);
  const first=questions.first(),summary=first.locator('summary');await summary.focus();await page.keyboard.press('Space');await expect(first).toHaveAttribute('open','');
  const answer=first.locator('.lgo-question-answer');await expect(answer).toBeVisible();expect(await answer.evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  await expect(answer).toContainText('public artifact');await expect(answer.getByRole('link')).toHaveAttribute('href','/game/loop');
 });
 test('no game controls, scores, inventory or account system are implied',async({page})=>{
  const hub=page.locator('.lgo-world-loop-experience');await expect(hub).toBeVisible();
  await expect(hub).toContainText('Đang đọc, không phải đang chơi');await expect(hub).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
  await expect(hub.locator('canvas,video,iframe,form,input,textarea,[role=progressbar]')).toHaveCount(0);
  await expect(hub.getByRole('button',{name:/Tấn công|Nhận thưởng|Dùng skill|Đăng nhập|Chơi ngay/i})).toHaveCount(0);
  await expect(hub).toContainText('không có mô phỏng combat');
 });
 test('selected stage and expanded questions have visible focus and main accessibility',async({page})=>{
  const journey=page.locator('#loop-reading .lgo-reading-journey');await expect(journey).toBeVisible();const third=journey.locator('.lgo-progress-step button').nth(2);
  await third.focus();await page.keyboard.press('Space');expect(await third.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.screenshot({path:test.info().outputPath('loop-training-selected.png'),fullPage:true});
  await expect(page.locator('main h1')).toHaveCount(1);
  for(const summary of await page.locator('#loop-questions summary').all())await summary.click();
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
 });
});
