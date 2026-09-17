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
 require('apps/web/src/app/start/page.tsx','@lgo-web/ui/start-landing-layout.css','PublicStartLanding','variant="immersive"')
 require('apps/web/src/components/PublicStartLanding.tsx','Học cách di chuyển','Người Giữ Cổng','Bia Luyện','Slime Bóng Tối','Mở Linh Thành','lgo-start-step','lgo-start-guide-panel','lgo-start-milestone-grid','/game-art/start-target/hero-gate.png')
 forbid('apps/web/src/app/start/page.tsx','PublicPlayerHero','ClassPathGrid','WorldRouteJourney','lgo-start-design-board','lgo-start-real-screenshot-panel')
 require('packages/ui/src/start-landing-layout.css','immersive-shell.css','grid-template-columns:repeat(5','grid-template-columns:repeat(4','@media (max-width:700px)','forced-colors','prefers-reduced-motion')
 require('tests/e2e/fe-start-visual-realignment-v1270.spec.ts','five target onboarding steps','movement controls and Lộ skill','four illustrated onboarding milestones','320px layout')
 design=ROOT/'apps/web/public/design-reference/start-detailed-design-target-v1124.png'
 manifest=ROOT/'apps/web/public/game-art/start-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing start design/provenance')
 else:
  data=json.loads(manifest.read_text())
  if data.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('start target source hash drift')
  items=data.get('items',[])
  if len(items)!=5: fail('expected five source-derived start art items')
  for item in items:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('start art drift '+item['id'])
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/start','truthful')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 5: `/start`')
 require('docs/execution/WEB-PROJECT-STATE.md','WEB-FE-START-VISUAL-REALIGNMENT-v1.270 WEB_CLOSED','WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271')
 require('docs/execution/WEB-NEXT-ACTION.md','Start v1.270 checkpoint')
 require('docs/execution/WEB-TASK-LEDGER.md','| WEB-FE-START-VISUAL-REALIGNMENT-v1.270 | WEB-FE | WEB_CLOSED |')
 require('docs/execution/LGO-WEB-FE-START-VISUAL-REALIGNMENT-REPORT-v1.270.md','Focused `/start`: 14/14 PASS','Fresh production selected regression on port 3236: 100/100 PASS','bc60189e5ec61fbb43bb8e0c3aca35f83684bbfc')
 require('docs/execution/HANDOFF-LGO-WEB-FE-START-VISUAL-REALIGNMENT-v1.270.md','Next: `/download` visual realignment v1.271')
 if ERRORS:
  print('WEB FE START VISUAL REALIGNMENT v1.270 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE START VISUAL REALIGNMENT v1.270 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
