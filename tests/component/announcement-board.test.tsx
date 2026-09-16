import { expect, test } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnnouncementBoard, type AnnouncementBoardItem } from '../../packages/ui/src/announcement-board';
import { LocalContentRepository } from '../../packages/content/src/repository';
import type { ContentEntry } from '../../packages/content/src/types';
const render=(items:readonly AnnouncementBoardItem[])=>renderToStaticMarkup(createElement(AnnouncementBoard,{items,label:'Bảng thông báo thử',boundary:'Chỉ đọc, không đăng ký.',emptyTitle:'Chưa có thông báo',emptyDescription:'Không tạo dữ liệu mẫu.'}));
const entry:AnnouncementBoardItem={id:'sample-notice',title:'Chủ đề mẫu',summary:'Mô tả đầy đủ.',body:'Nội dung đầy đủ.',publication:{iso:'2026-09-05T05:00:00.000Z',label:'05/09/2026'}};
test('empty published selection has an explicit empty state and no invented cards or dates',()=>{
  const html=render([]);expect(html).toContain('Chưa có thông báo');expect(html).toContain('Không tạo dữ liệu mẫu.');expect(html).not.toContain('<article');expect(html).not.toContain('<time');expect(html).not.toContain('<details');
});
test('multiple independent native disclosures preserve order and exact caller supplied date semantics',()=>{
  const html=render([entry,{...entry,id:'second',title:'Chủ đề hai'}]);expect(html.match(/<article /g)).toHaveLength(2);expect(html.match(/<details /g)).toHaveLength(2);
  expect(html.indexOf('Chủ đề mẫu')).toBeLessThan(html.indexOf('Chủ đề hai'));expect(html).toContain(`dateTime="${entry.publication.iso}"`);expect(html).toContain('Không phải ngày tổ chức');expect(html).not.toContain('<details open');
});
test('authored strings are text, not executable markup, in headings summary and full body',()=>{
  const html=render([{...entry,title:'<script>not-code</script>',summary:'<b>literal</b>',body:'<img src=x onerror=bad()> & raw'}]);expect(html).toContain('&lt;script&gt;not-code&lt;/script&gt;');expect(html).toContain('&lt;b&gt;literal&lt;/b&gt;');expect(html).toContain('&lt;img src=x onerror=bad()&gt; &amp; raw');expect(html).not.toContain('<script');expect(html).not.toContain('<img');
});
test('existing repository excludes drafts scheduled items and other categories without using the date as a schedule',()=>{
 const base:ContentEntry={slug:'published',category:'events',status:'published',title:'Đã công bố',summary:'Mô tả',body:'Nội dung',publishedAt:'2099-01-01T00:00:00.000Z',tags:[]};
 const source=[base,{...base,slug:'draft',status:'draft' as const},{...base,slug:'scheduled',status:'scheduled' as const},{...base,slug:'news',category:'news' as const}];
 expect(new LocalContentRepository(source).list('events').map(item=>item.slug)).toEqual(['published']);expect(source).toHaveLength(4);
});
