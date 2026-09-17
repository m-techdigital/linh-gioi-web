#!/usr/bin/env python3
from pathlib import Path
import hashlib, json, sys
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
 require('apps/web/src/app/game/page.tsx','@lgo-web/ui/public-entry-layout.css','PublicWorldLanding','variant="immersive"')
 require('apps/web/src/components/PublicWorldLanding.tsx','worldRouteStops','lgo-world-landing-hero','Một thế giới','lgo-world-journey','lgo-world-region-grid','/game/loop','/journey','targetCopy','hero-city.png','hero-character.png')
 forbid('apps/web/src/app/game/page.tsx','lgo-game-world-design-board','game-world-atlas-hub.svg','Bằng chứng phụ','WorldAtlasStories','WorldRouteJourney','GamePillarGrid')
 require('packages/ui/src/public-entry-layout.css','immersive-shell.css','.lgo-world-landing-hero','.lgo-world-journey { display:grid; grid-template-columns:repeat(5','.lgo-world-region-grid { display:grid; grid-template-columns:repeat(5','@media (max-width:700px)','grid-template-columns:1fr','prefers-reduced-motion','forced-colors')
 require('packages/ui/src/immersive-shell.css','.lgo-public-shell-immersive .lgo-main > .lgo-container')
 require('packages/ui/src/public-chrome.css','marketing-navigation.css','home-editorial.css','art-wordmark.css','.lgo-public-shell .lgo-site-header')
 require('tests/e2e/fe-game-world-realignment-v1266.spec.ts','proof-board engineering layout','five source world stops','distinct artwork','fake trailer','320px','forced colors','desktop target density')
 design=ROOT/'docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png'; manifest=ROOT/'apps/web/public/game-art/world-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing game world design/provenance')
 else:
  d=json.loads(manifest.read_text())
  if d.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('world target source hash drift')
  if len(d.get('items',[]))!=7: fail('expected seven source-derived world art items')
  for item in d.get('items',[]):
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('world art drift '+item['file'])
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','Entry world','/game','Historical validator/test PASS is engineering evidence only')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 1: `/game` — World landing','RED browser tests','One page closes before the next')
 if ERRORS:
  print('WEB FE GAME WORLD REALIGNMENT v1.266 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE GAME WORLD REALIGNMENT v1.266 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
