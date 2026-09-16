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
 check('apps/web/src/components/PublicHomeLanding.tsx',['<ExperienceHero','<IllustratedLink','<MediaMosaic','localContentRepository.list("news")','entry.publishedAt','entry.summary','/game','/classes','/story','Bản public chưa mở'])
 check('apps/web/src/components/PublicSiteShell.tsx',['variant !== "immersive"','lgo-public-shell-immersive'])
 check('packages/ui/src/marketing-layout.css',['.lgo-immersive-art','position:absolute','grid-template-columns:repeat(3','min-height:44px','forced-colors','prefers-reduced-motion'])
 check('tests/e2e/fe-homepage-design-realignment-v1265.spec.ts',['typography follow','three real illustrated','wordmark rendered bounds','violations).toEqual([])','width:320','real existing destinations'])
 check('packages/ui/src/art-wordmark.tsx',['export function ArtWordmark','onError','node?.complete','lgo-art-wordmark-label'])
 check('tests/e2e/fe-homepage-native-art-v1265.spec.ts',['toBeLessThanOrEqual(1.02)','toBeLessThanOrEqual(1.06)','forced colors','load failure','news titles'])
 check('tools/validate_homepage_native_art.mjs',['OPAQUE_SOURCE_PIXELS','TRANSPARENT_UI_REGIONS','negativeControlRejected'])
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
 print('HOMEPAGE REALIGNMENT SOURCE '+('FAIL' if errors else 'PASS'))
 for e in errors:print('- '+e)
 return int(bool(errors))
if __name__=='__main__':raise SystemExit(main())
