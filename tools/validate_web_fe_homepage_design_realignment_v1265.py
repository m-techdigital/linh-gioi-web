#!/usr/bin/env python3
"""Source ownership/provenance only. Never a substitute for rendered design comparison."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
def main():
 errors=[]
 def check(name,needles):
  p=ROOT/name
  if not p.is_file():errors.append('missing '+name);return
  s=p.read_text()
  for n in needles:
   if n not in s:errors.append(name+' missing '+n)
 check('apps/web/src/app/page.tsx',['PublicHomeLanding','variant="immersive"','marketing-layout.css'])
 check('apps/web/src/components/PublicHomeLanding.tsx',['<ExperienceHero','motto="KIẾP NÀY, THẾ GIỚI RỘNG LỚN HƠN BẠN NGHĨ"','<IllustratedLink','<MediaMosaic','localContentRepository.list("news")','entry.publishedAt','entry.summary','/game','/classes','/story'])
 check('apps/web/src/components/PublicSiteShell.tsx',['variant !== "immersive"','lgo-public-shell-immersive'])
 check('packages/ui/src/marketing-layout.css',['.lgo-immersive-art','position:absolute','grid-template-columns:repeat(3','min-height:44px','forced-colors','prefers-reduced-motion'])
 check('tests/e2e/fe-homepage-design-realignment-v1265.spec.ts',['typography follow','three real illustrated','wordmark rendered bounds','violations).toEqual([])','width:320','real existing destinations'])
 check('apps/web/src/components/PublicNavigation.tsx',['const immersiveItems','label: "Lộ phái"','label: "Tính năng"','href: "/game/loop"','variant === "immersive" ? immersiveItems : primaryItems'])
 check('packages/ui/src/primitives.tsx',['motto?: ReactNode','motto ? <p className="lgo-hero-motto">{motto}</p> : null','badge ? <StatusBadge'])
 check('tests/e2e/fe-homepage-final-density-v1265.spec.ts',['six truthful target-rhythm routes','toHaveCount(6)','lgo-status-badge','lgo-hero-lead','toHaveCount(0)'])
 check('packages/ui/src/art-wordmark.tsx',['export function ArtWordmark','onError','node?.complete','lgo-art-wordmark-label'])
 check('tests/e2e/fe-homepage-native-art-v1265.spec.ts',['toBeLessThanOrEqual(1.02)','toBeLessThanOrEqual(1.06)','forced colors','load failure','news titles'])
 check('tools/validate_homepage_native_art.mjs',['OPAQUE_SOURCE_PIXELS','TRANSPARENT_UI_REGIONS','negativeControlRejected'])
 check('apps/web/src/components/PublicNavigation.tsx',['variant === "immersive"','<ArtWordmark','revealOnFocus','Trang chủ'])
 check('packages/ui/src/primitives.tsx',['ActionLinkDecoration','lgo-action-link-description','decorated ?'])
 check('packages/ui/src/action-link.css',['::before','clip-path:polygon','var(--lgo-font-sans)','outline-offset:4px'])
 check('packages/ui/src/route-aware-link.tsx',['revealOnFocus = false','inline: "nearest"','onFocus?.(event)'])
 check('tests/e2e/fe-homepage-header-actions-v1265.spec.ts',['toHaveCount(6)','toBeGreaterThanOrEqual(44)','keyboard.press(\'Tab\')','violations).toEqual([])'])
 check('packages/ui/src/home-editorial.tsx',['export function EditorialPreviewCard','export function MarketingFooter','lgo-editorial-preview-card','lgo-marketing-footer'])
 check('apps/web/src/components/PublicHomeLanding.tsx',['EditorialPreviewCard','discovery-world','news-event','news-update','news-community'])
 check('apps/web/src/components/PublicSiteShell.tsx',['variant === "immersive" ? <MarketingFooter','Bản public chưa mở'])
 check('tests/e2e/fe-homepage-lower-composition-v1265.spec.ts',['three distinct editorial thumbnails','compact design rhythm','lower-art failure'])
 check('tools/validate_homepage_lower_art.mjs',['negativeControlRejected','mismatched'])
 check('apps/web/src/components/PublicNavigation.tsx',['lgo-nav-sigil-art','/game-art/marketing/header-sigil.png'])
 check('apps/web/src/components/PublicHomeLanding.tsx',['motto="KIẾP NÀY, THẾ GIỚI RỘNG LỚN HƠN BẠN NGHĨ"','lgo-media-mosaic-focal'])
 check('packages/ui/src/illustrated-navigation.tsx',['leadAdornment?: React.ReactNode','lgo-media-mosaic-lead-wrap'])
 check('tools/validate_homepage_header_sigil.mjs',['negativeControlRejected','opaque'])
 check('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265','Current FE scope: select `/`'])
 manifest=ROOT/'apps/web/public/game-art/marketing/manifest.json'
 if not manifest.is_file():errors.append('missing artwork provenance')
 else:
  d=json.loads(manifest.read_text());src=ROOT/d['source']
  if hashlib.sha256(src.read_bytes()).hexdigest()!=d['sourceSha256']:errors.append('source art drift')
  for item in d['items']:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:errors.append('art drift '+item['id'])
 native=ROOT/'apps/web/public/game-art/marketing/native-art-provenance.json'
 if not native.is_file():errors.append('missing native art provenance')
 else:
  d=json.loads(native.read_text())
  if hashlib.sha256((ROOT/d['source']).read_bytes()).hexdigest()!=d['sourceSha256']:errors.append('native source drift')
  for item in d['items']:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:errors.append('native art drift '+item['id'])
 lower=ROOT/'apps/web/public/game-art/marketing/lower-art-provenance.json'
 if not lower.is_file():errors.append('missing lower art provenance')
 else:
  d=json.loads(lower.read_text())
  if hashlib.sha256((ROOT/d['source']).read_bytes()).hexdigest()!=d['sourceSha256']:errors.append('lower source art drift')
  for item in d['items']:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:errors.append('lower art drift '+item['id'])
 landing=(ROOT/'apps/web/src/components/PublicHomeLanding.tsx').read_text()
 if 'badge="MMORPG hành động cộng đồng 2D"' in landing:errors.append('redundant homepage hero badge returned')
 if 'Gặp gỡ ở Linh Thành. Chọn Lộ của bạn. Viết tiếp câu chuyện của riêng mình.' in landing:errors.append('redundant homepage hero prose returned')
 print('HOMEPAGE REALIGNMENT SOURCE '+('FAIL' if errors else 'PASS'))
 for e in errors:print('- '+e)
 return int(bool(errors))
if __name__=='__main__':raise SystemExit(main())
