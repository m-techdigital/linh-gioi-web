import {test,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {PublicHomeLanding} from '../../apps/web/src/components/PublicHomeLanding';
import {PublicSiteShell} from '../../apps/web/src/components/PublicSiteShell';

test('homepage lower section binds dedicated discovery and three distinct news artwork assets',()=>{const html=renderToStaticMarkup(createElement(PublicHomeLanding));expect(html).toContain('/game-art/marketing/discovery-world.png');for(const id of ['news-event','news-update','news-community'])expect(html).toContain(`/game-art/marketing/${id}.png`);expect(html).not.toContain('/game-art/world/dong-mon-skyline.webp');const feature=(html.match(/feature-(?:world|action|community)\.png/g)||[]).length;expect(feature).toBe(3);});
test('immersive shell renders compact marketing footer instead of the legacy generic footer',()=>{const html=renderToStaticMarkup(createElement(PublicSiteShell,{variant:'immersive'},createElement('div',null,'content')));expect(html).toContain('lgo-marketing-footer');expect(html).toContain('/game-art/marketing/wordmark-brush.png');expect(html).toContain('Bản public chưa mở');expect(html).not.toContain('lgo-brand-footer-inner');expect(html).not.toContain('Máy chủ hoạt động ổn định');});
test('default public shell keeps the existing generic footer unchanged',()=>{const html=renderToStaticMarkup(createElement(PublicSiteShell,null,createElement('div',null,'content')));expect(html).toContain('lgo-brand-footer-inner');expect(html).not.toContain('lgo-marketing-footer');});
