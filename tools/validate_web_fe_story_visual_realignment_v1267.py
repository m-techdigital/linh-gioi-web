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
 require('apps/web/src/app/story/page.tsx','@lgo-web/ui/story-landing-layout.css','PublicStoryLanding','variant="immersive"')
 require('apps/web/src/components/PublicStoryLanding.tsx','narrativeChapters','lgo-story-landing-hero','Cho đến ngày những cánh cửa bắt đầu mở','lgo-story-chapter-grid','BIẾN CỐ CỐT TRUYỆN','/journey','hero-character.png','hero-gate.png')
 forbid('apps/web/src/app/story/page.tsx','PublicPlayerHero','StoryArcTimeline','NarrativeChapterGrid','lgo-storypage-expanded-evidence','lgo-story-fracture-design-board')
 require('packages/ui/src/story-landing-layout.css','immersive-shell.css','.lgo-story-hero-character { z-index:1','.lgo-story-hero-gate { z-index:0','max-width:12ch','.lgo-story-chapters { display:block','.lgo-story-chapter-grid { display:grid; grid-template-columns:repeat(4','@media (max-width:700px)','grid-template-columns:1fr','forced-colors','prefers-reduced-motion')
 require('tests/e2e/fe-story-visual-realignment-v1267.spec.ts','source-derived artwork','target reading width','target three-line rhythm','truthful reading routes','320px')
 design=ROOT/'docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png'
 manifest=ROOT/'apps/web/public/game-art/story-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing story design/provenance')
 else:
  d=json.loads(manifest.read_text())
  if d.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('story target source hash drift')
  if len(d.get('items',[]))!=6: fail('expected six source-derived story art items')
  for item in d.get('items',[]):
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('story art drift '+item['file'])
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/story','Historical validator/test PASS is engineering evidence only')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 2: `/story`','RED → source-art → shared owner → browser review flow')
 require('docs/execution/WEB-PROJECT-STATE.md','WEB-FE-STORY-VISUAL-REALIGNMENT-v1.267 WEB_CLOSED','WEB-FE-CLASSES-VISUAL-REALIGNMENT-v1.268')
 # Historical closure guard: keep the story checkpoint itself authoritative without pinning the current queue to its once-next page.
 require('docs/execution/WEB-NEXT-ACTION.md','Story v1.267 checkpoint')
 require('docs/execution/WEB-TASK-LEDGER.md','| WEB-FE-STORY-VISUAL-REALIGNMENT-v1.267 | WEB-FE | WEB_CLOSED |')
 require('docs/execution/LGO-WEB-FE-STORY-VISUAL-REALIGNMENT-REPORT-v1.267.md','Focused `/story`: 20/20 PASS','Fresh production selected regression on port 3236: 60/60 PASS','f631e2aa129b367977ff301e725fd4cb29b2f541')
 require('docs/execution/HANDOFF-LGO-WEB-FE-STORY-VISUAL-REALIGNMENT-v1.267.md','Next: `/classes` visual realignment v1.268')
 if ERRORS:
  print('WEB FE STORY VISUAL REALIGNMENT v1.267 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE STORY VISUAL REALIGNMENT v1.267 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
