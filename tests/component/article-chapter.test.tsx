import {test,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {GuideChapterBody} from '../../packages/ui/src/guide-article';
import {GuidanceTopicGrid} from '../../packages/ui/src/guidance';
const source={instruction:'Nội dung nguồn',outcome:'Ý nghĩa nguyên gốc',boundary:'Giới hạn nguồn'};
test('article-specific labels preserve the three original source fields',()=>{
 const html=renderToStaticMarkup(createElement(GuideChapterBody,{...source,outcomeLabel:'Ý nghĩa cho người chơi',boundaryLabel:'Phạm vi bài viết'}));
 expect(html).toContain('Ý nghĩa cho người chơi');expect(html).toContain('Phạm vi bài viết');for(const value of Object.values(source))expect(html).toContain(value);
 expect(html).not.toContain('Giới hạn hiện tại');expect(html).not.toContain('Điều cần hiểu');
});
test('existing guide labels and optional actions remain exact defaults',()=>{
 const html=renderToStaticMarkup(createElement(GuideChapterBody,{...source,action:{href:'/status',label:'Đọc trạng thái'}}));
 expect(html).toContain('Điều cần hiểu');expect(html).toContain('Giới hạn hiện tại');expect(html).toContain('href="/status"');expect(html).toContain('Đọc trạng thái');
});
test('source and labels remain escaped text; no input form or unsafe HTML',()=>{
 const html=renderToStaticMarkup(createElement(GuideChapterBody,{instruction:'<script>bad()</script>',outcome:'A & B',boundary:'<img onerror=bad()>',outcomeLabel:'<b>nhãn</b>'}));
 expect(html).toContain('&lt;script&gt;');expect(html).toContain('A &amp; B');expect(html).toContain('&lt;b&gt;nhãn&lt;/b&gt;');expect(html).not.toContain('<script');expect(html).not.toContain('<form');
});

test('article related variant is opt-in and preserves empty/default topic behavior',()=>{
 const topics=[{id:'one',title:'Tin nguồn',description:'Mô tả đầy đủ',hint:'',href:'/news/one',action:'Đọc bài viết',icon:'document' as const}];
 const html=renderToStaticMarkup(createElement(GuidanceTopicGrid,{topics,variant:'articles'}));expect(html).toContain('lgo-guidance-article-grid');expect(html).toContain('Mô tả đầy đủ');expect(html).toContain('href="/news/one"');
 expect(renderToStaticMarkup(createElement(GuidanceTopicGrid,{topics}))).not.toContain('lgo-guidance-article-grid');expect(renderToStaticMarkup(createElement(GuidanceTopicGrid,{topics:[],variant:'articles'}))).not.toContain('<article');
});
