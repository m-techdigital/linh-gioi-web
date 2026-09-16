import { test, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExperienceHero, LinkButton } from '../../packages/ui/src/primitives';
const icon = createElement('svg', { viewBox:'0 0 24 24', 'data-test-icon':'true' });
test('default link markup stays exactly unchanged', () => {
  expect(renderToStaticMarkup(createElement(LinkButton, { href:'/game', tone:'jade' }, 'Thế giới'))).toBe('<a href="/game" class="lgo-link-button lgo-tone-jade">Thế giới</a>');
});
test('rich action keeps a real anchor and renders separate icon label and description', () => {
  const s=renderToStaticMarkup(createElement(LinkButton,{href:'/game',tone:'spirit',variant:'ornate',icon,description:'Thế giới và nhân vật'},'Khám phá Linh Giới'));
  expect(s).toContain('lgo-action-link');expect(s).toContain('lgo-action-link-icon');expect(s).toContain('lgo-action-link-label');expect(s).toContain('lgo-action-link-description');expect(s).toContain('Thế giới và nhân vật');expect(s).not.toContain('<button');
});
test('icon is decorative and never creates a second interactive control', () => {
  const s=renderToStaticMarkup(createElement(LinkButton,{href:'/classes',variant:'ornate',icon,description:'Tìm con đường riêng'},'Chọn Lộ của bạn'));
  expect(s).toContain('class="lgo-action-link-icon" aria-hidden="true"');expect((s.match(/<a /g)||[])).toHaveLength(1);expect(s).not.toContain('tabindex="0"');
});
test('hero consumes optional metadata through the existing shared action owner', () => {
  const s=renderToStaticMarkup(createElement(ExperienceHero,{badge:'2D',kicker:'Linh Giới',title:'Trang chủ',lead:'Nội dung',actions:[{href:'/story',label:'Bắt đầu câu chuyện',tone:'gold',variant:'ornate',icon,description:'Đọc mở đầu hành trình'}]}));
  expect(s).toContain('lgo-action-link-description');expect(s).toContain('Đọc mở đầu hành trình');expect(s).toContain('href="/story"');
});
test('supplied anchor semantics stay intact and text is escaped', () => {
  const s=renderToStaticMarkup(createElement(LinkButton,{href:'/game',variant:'ornate',description:'<script>no</script>','aria-label':'Đọc thế giới','data-purpose':'reader'},'Nội dung'));
  expect(s).toContain('aria-label="Đọc thế giới"');expect(s).toContain('data-purpose="reader"');expect(s).toContain('&lt;script&gt;no&lt;/script&gt;');expect(s).not.toContain('<script>');
});

test('hero can render a separate motto without requiring badge or lead', () => {
  const s=renderToStaticMarkup(createElement(ExperienceHero,{kicker:'Linh Giới',title:'Trang chủ',motto:'Kiếp này rộng lớn hơn'}));
  expect(s).toContain('class="lgo-hero-motto">Kiếp này rộng lớn hơn</p>');expect(s).not.toContain('lgo-status-badge');expect(s).not.toContain('lgo-hero-lead');
});
