import {test,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ReadingCatalog,type ReadingCatalogEntry} from '../../packages/ui/src/reading-catalog';
import {FeaturedReading} from '../../packages/ui/src/featured-reading';
import {LocalContentRepository} from '../../packages/content/src/repository';
import type {ContentEntry} from '../../packages/content/src/types';
const copy={searchLabel:'Tìm trong bản tin',placeholder:'Ví dụ: FAQ, cộng đồng…',groupLabel:'Chọn nhóm bài viết',itemLabel:'Tin tức',actionLabel:'Đọc bài viết',countLabel:'bài viết',emptyTitle:'Chưa có bài tin công khai',emptyDescription:'Chưa có bài đã công bố. Không tạo tin mẫu.',noMatchDescription:'Thử từ khóa ngắn hơn hoặc xóa bộ lọc để xem lại bản tin.'};
const item:ReadingCatalogEntry={id:'sample',title:'Một bài viết',description:'Mô tả đầy đủ',href:'/news/sample',groupId:'news',publication:{iso:'2026-09-05T00:00:00.000Z',label:'05/09/2026'}};
const render=(entries:readonly ReadingCatalogEntry[])=>renderToStaticMarkup(createElement(ReadingCatalog,{entries,groups:[],label:'Bản tin',copy}));
test('news copy and supplied publication metadata replace guide labels without adding a useless category filter',()=>{
 const html=render([item]);expect(html).toContain('Tìm trong bản tin');expect(html).toContain('Đọc bài viết: Một bài viết');expect(html).toContain('1/1 bài viết');expect(html).toContain(`dateTime="${item.publication!.iso}"`);expect(html).toContain('Ngày đăng');expect(html).not.toContain('lgo-reading-catalog-filters');expect(html).not.toContain('Đọc hướng dẫn');
});
test('empty news data renders an honest empty state without fictional records or dates',()=>{
 const html=render([]);expect(html).toContain('Chưa có bài tin công khai');expect(html).toContain('Không tạo tin mẫu');expect(html).not.toContain('<article');expect(html).not.toContain('<time');
});
test('existing guide defaults and category controls remain available without news metadata',()=>{
 const {publication,...guide}=item;const html=renderToStaticMarkup(createElement(ReadingCatalog,{entries:[{...guide,groupId:'beginner'}],groups:[{id:'beginner',label:'Nhập môn',icon:'document'}],label:'Hướng dẫn'}));
 expect(html).toContain('Tìm trong thư viện');expect(html).toContain('Đọc hướng dẫn');expect(html).toContain('1/1 bài hướng dẫn');expect(html).toContain('lgo-reading-catalog-filters');expect(html).not.toContain('<time');
});
test('source strings and customized labels remain escaped text rather than HTML',()=>{
 const html=render([{...item,title:'<script>unsafe</script>',description:'<img onerror=bad()> & literal'}]);expect(html).toContain('&lt;script&gt;unsafe&lt;/script&gt;');expect(html).toContain('&lt;img onerror=bad()&gt; &amp; literal');expect(html).not.toContain('<script');
});
test('featured cover supports a news link label while preserving the guide default',()=>{
 const props={title:'Bài nguồn',description:'Mô tả',href:'/news/sample',image:{src:'/illustration.webp',width:100,height:100,alt:'Minh họa'}};
 const html=renderToStaticMarkup(createElement(FeaturedReading,{...props,actionLabel:'Mở bài viết'}));expect(html).toContain('Mở bài viết');expect(html).not.toContain('Mở bài hướng dẫn');expect(renderToStaticMarkup(createElement(FeaturedReading,props))).toContain('Mở bài hướng dẫn');
});
test('existing repository returns all published news in source order and excludes draft scheduled and non-news content',()=>{
 const base:ContentEntry={slug:'source-a',title:'Tiêu đề',summary:'Mô tả',body:'Nội dung',category:'news',status:'published',publishedAt:'2099-01-01T00:00:00.000Z',tags:[]};
 const source=[base,{...base,slug:'draft',status:'draft' as const},{...base,slug:'scheduled',status:'scheduled' as const},{...base,slug:'patch',category:'patch-notes' as const},{...base,slug:'source-b'}];
 expect(new LocalContentRepository(source).list('news').map(e=>e.slug)).toEqual(['source-a','source-b']);expect(source).toHaveLength(5);
});
