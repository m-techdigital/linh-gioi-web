import {test,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ArtWordmark} from '../../packages/ui/src/art-wordmark';
const props={src:'/art.png',width:422,height:169,label:'Linh Giới Online',fallback:'Linh Giới'};
test('server markup contains live fallback before image hydration',()=>{const s=renderToStaticMarkup(createElement(ArtWordmark,props));expect(s).toContain('data-fallback="true"');expect(s).toContain('lgo-art-wordmark-fallback');});
test('reserved ratio comes from the exact source dimensions, not a font-size approximation',()=>{const s=renderToStaticMarkup(createElement(ArtWordmark,props));expect(s).toContain('aspect-ratio:422 / 169');expect(s).toContain('width="422"');expect(s).toContain('height="169"');});
test('image and visual fallback are decorative while the accessible label remains text',()=>{const s=renderToStaticMarkup(createElement(ArtWordmark,props));expect((s.match(/aria-hidden="true"/g)||[])).toHaveLength(2);expect(s).toContain('class="lgo-art-wordmark-label">Linh Giới Online</span>');expect(s).toContain('alt=""');});
test('labels remain escaped and the component adds no action or remote tracking',()=>{const s=renderToStaticMarkup(createElement(ArtWordmark,{...props,label:'<script>name</script>'}));expect(s).toContain('&lt;script&gt;');expect(s).not.toContain('<script>');expect(s).not.toContain('<button');expect(s).not.toContain('<form');});
