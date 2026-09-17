#!/usr/bin/env python3
from pathlib import Path
import hashlib, json
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]
def fail(msg): ERRORS.append(msg)
def read(rel):
 p=ROOT/rel
 if not p.is_file(): fail('missing '+rel); return ''
 return p.read_text(encoding='utf-8')
def require(rel,*needles):
 s=read(rel)
 for n in needles:
  if n not in s: fail(f'{rel} missing {n}')
 return s
def forbid(rel,*needles):
 s=read(rel)
 for n in needles:
  if n in s: fail(f'{rel} contains historical marker {n}')
def main():
 require('apps/web/src/app/classes/page.tsx','@lgo-web/ui/classes-landing-layout.css','PublicClassesLanding','variant="immersive"')
 require('apps/web/src/components/PublicClassesLanding.tsx','classPaths','lgo-classes-landing-hero','Chọn cách bạn bảo vệ Linh Giới','lgo-five-path-wheel','lgo-class-choice-grid','lgo-class-selected-feature','aria-pressed','/game-art/world-target/hero-city.png')
 forbid('apps/web/src/app/classes/page.tsx','PublicPlayerHero','ClassPathGrid','ClassIdentityDeck','ClassArtSpotlight','lgo-classespage-expanded-evidence')
 require('packages/ui/src/classes-landing-layout.css','immersive-shell.css','grid-template-columns:repeat(5','.lgo-class-selected-feature','@media (max-width:700px)','grid-template-columns:1fr','forced-colors','prefers-reduced-motion')
 require('tests/e2e/fe-classes-visual-realignment-v1268.spec.ts','five canonical illustrated path choices','selected-path feature','target wide five-card rhythm','portrait-friendly scene crop','320px')
 design=ROOT/'apps/web/public/design-reference/classes-detailed-design-target-v1122.png'
 manifest=ROOT/'apps/web/public/game-art/classes-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing classes design/provenance')
 else:
  d=json.loads(manifest.read_text())
  if d.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('classes target source hash drift')
  if len(d.get('items',[]))!=6: fail('expected six source-derived classes art items')
  for item in d.get('items',[]):
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('classes art drift '+item['file'])
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/classes','Historical validator/test PASS is engineering evidence only')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 3: `/classes`','five-Lộ visual wheel/deck')
 if ERRORS:
  print('WEB FE CLASSES VISUAL REALIGNMENT v1.268 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE CLASSES VISUAL REALIGNMENT v1.268 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
