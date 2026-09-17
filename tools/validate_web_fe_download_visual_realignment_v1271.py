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
 require('apps/web/src/app/download/page.tsx','@lgo-web/ui/download-landing-layout.css','PublicDownloadLanding','variant="immersive"')
 require('apps/web/src/components/PublicDownloadLanding.tsx','downloadReadiness','downloadBuilds','Chưa mở cổng phát hành','lgo-download-readiness-card','lgo-download-build-card','lgo-download-info-link','/game-art/download-target/hero-gate.png')
 forbid('apps/web/src/app/download/page.tsx','PublicPlayerHero','DownloadStatusDepth','DownloadTrustGateBoard','ReleaseEvidenceChecklist','lgo-download-expanded-evidence')
 require('packages/ui/src/download-landing-layout.css','immersive-shell.css','grid-template-columns:repeat(5','grid-template-columns:repeat(2','@media (max-width:700px)','forced-colors','prefers-reduced-motion')
 require('tests/e2e/fe-download-visual-realignment-v1271.spec.ts','five canonical readiness gates','both canonical release channels','four real official information routes','320px accessibility')
 design=ROOT/'apps/web/public/design-reference/download-detailed-design-target-v1125.png'
 manifest=ROOT/'apps/web/public/game-art/download-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing download design/provenance')
 else:
  data=json.loads(manifest.read_text())
  if data.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('download target source hash drift')
  items=data.get('items',[])
  if len(items)!=1: fail('expected one source-derived download hero item')
  for item in items:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('download art drift '+item['id'])
   if item.get('bakedWebUiControls') is not False: fail('download hero must not contain baked web controls')
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/download','no fake login, playable/download state')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 6+','Service, support and secondary route families')
 require('docs/execution/WEB-PROJECT-STATE.md','WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271 WEB_CLOSED')
 require('docs/execution/WEB-NEXT-ACTION.md','Download v1.271 checkpoint')
 require('docs/execution/WEB-TASK-LEDGER.md','| WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271 | WEB-FE | WEB_CLOSED |')
 require('docs/execution/LGO-WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-REPORT-v1.271.md','Focused `/download`: 14/14 PASS','Fresh production selected regression on port 3236: 114/114 PASS','dae79b11925fb330d7e89519b3e8ed2f9b26d823')
 require('docs/execution/HANDOFF-LGO-WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271.md','Next: `/download/trust` visual realignment v1.272')
 if ERRORS:
  print('WEB FE DOWNLOAD VISUAL REALIGNMENT v1.271 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE DOWNLOAD VISUAL REALIGNMENT v1.271 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
