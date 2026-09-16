import {test,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {PublishedArticle,type PublishedArticleCopy} from '../../packages/ui/src/published-article';
const entry={slug:'sample',title:'Tiêu đề nguồn',summary:'Mô tả nguồn',body:'Nội dung nguồn',publishedAt:'2026-09-05T06:00:00.000Z'};
const sections=[{heading:'Phần nguồn',body:'Thân phần',playerImpact:'Ý nghĩa nguyên gốc',nonClaim:'Giới hạn nguyên gốc'}];
const copy:PublishedArticleCopy={breadcrumb:'Điểm đọc',kicker:'Bối cảnh bài viết',contentsLabel:'Mục lục mẫu',introLabel:'Phạm vi nguồn',coverAlt:'Tranh minh họa',coverEyebrow:'Một thế giới',coverTitle:'Đọc đúng bối cảnh',coverNote:'Không phải ảnh vận hành'};
const render=(patch:Partial<Parameters<typeof PublishedArticle>[0]>={})=>renderToStaticMarkup(createElement(PublishedArticle,{entry,sections,related:[],copy,chapterLinks:[[{href:'/status',label:'Xem trạng thái',className:'lgo-news-article-action'}]],...patch}));
test('shared frame preserves every source field and real publication metadata',()=>{
 const html=render();for(const value of [entry.title,entry.summary,entry.body,sections[0]!.heading,sections[0]!.body,sections[0]!.playerImpact,sections[0]!.nonClaim])expect(html).toContain(value);
 expect(html).toContain('dateTime="2026-09-05T06:00:00.000Z"');expect(html).toContain('05/09/2026');expect(html).toContain('Ngày đăng nội dung');expect(html).toContain('id="news-sample-part-01"');expect(html).toContain('id="news-sample-contents"');
});
test('caller editorial labels and real chapter links do not create alternative source data',()=>{
 const html=render();for(const value of Object.values(copy))expect(html).toContain(value);
 expect(html).toContain('href="/status"');expect(html).toContain('Xem trạng thái');expect(html).toContain('Ý nghĩa cho người chơi');expect(html).toContain('Phạm vi bài viết');
});
test('no related entries produces no fictional related section or article',()=>{
 expect(render()).not.toContain('id="news-related-heading"');
 const html=render({related:[{...entry,slug:'second',title:'Bài liên quan',summary:'Mô tả liên quan'}]});expect(html).toContain('id="news-related-heading"');expect(html).toContain('href="/news/second"');expect(html).toContain('Mô tả liên quan');expect(html).toContain('lgo-guidance-article-grid');
});
test('authored text and labels are escaped and no intake or operational control appears',()=>{
 const html=render({entry:{...entry,title:'<script>bad()</script>',body:'<img onerror=bad()>'},copy:{...copy,breadcrumb:'A & B'}});
 expect(html).toContain('&lt;script&gt;bad()&lt;/script&gt;');expect(html).toContain('&lt;img onerror=bad()&gt;');expect(html).toContain('A &amp; B');expect(html).not.toContain('<script');expect(html).not.toContain('<form');expect(html).not.toContain('<input');expect(html).not.toContain('dangerouslySetInnerHTML');
});
