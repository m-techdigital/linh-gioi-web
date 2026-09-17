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
 require('apps/web/src/app/download/trust/page.tsx','@lgo-web/ui/download-trust-landing-layout.css','PublicDownloadTrustLanding','variant="immersive"')
 require('apps/web/src/components/PublicDownloadTrustLanding.tsx','downloadTrustGates','Không tải giả','lgo-download-trust-gate-card','/download','/guides/release-trust-and-checksum-guide','/status')
 require('apps/web/src/components/PublicDownloadTrustLanding.tsx','/game-art/download-trust-target/hero-character.png','/game-art/download-trust-target/hero-seal.png','Cần có:','Người chơi thấy:')
 forbid('apps/web/src/app/download/trust/page.tsx','DownloadTrustGateBoard','ReleaseEvidenceChecklist','ReleaseTrustDesignBoard','lgo-downloadtrustpage-stack')
 require('packages/ui/src/download-trust-landing-layout.css','immersive-shell.css','grid-template-columns:repeat(6','@media (max-width:700px)','forced-colors','prefers-reduced-motion')
 require('tests/e2e/fe-download-trust-visual-realignment-v1272.spec.ts','six canonical trust gates','separate decorative trust art','320px remains readable')
 design=ROOT/'docs/design/reference/WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png'
 manifest=ROOT/'apps/web/public/game-art/download-trust-target/provenance.json'
 if not design.is_file() or not manifest.is_file(): fail('missing download trust design/provenance')
 else:
  data=json.loads(manifest.read_text())
  if data.get('sourceSha256')!=hashlib.sha256(design.read_bytes()).hexdigest(): fail('download trust target source hash drift')
  items=data.get('items',[])
  if len(items)!=2: fail('expected two source-derived download trust hero items')
  for item in items:
   p=ROOT/'apps/web/public'/item['path'].lstrip('/')
   if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']: fail('download trust art drift '+item['id'])
   if item.get('bakedWebUiControls') is not False: fail('download trust art must not contain baked web controls')
 require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/download/trust')
 require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Service, support and secondary route families')
 require('docs/execution/WEB-PROJECT-STATE.md','WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-v1.272 WEB_CLOSED','WEB-FE-RELEASE-VISUAL-REALIGNMENT-v1.273')
 require('docs/execution/WEB-NEXT-ACTION.md','Download Trust v1.272 checkpoint','Real Browser UI/UX Layout First')
 require('docs/execution/WEB-TASK-LEDGER.md','| WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-v1.272 | WEB-FE | WEB_CLOSED |')
 require('docs/execution/LGO-WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-REPORT-v1.272.md','Focused `/download/trust`: 14/14 PASS','Fresh production selected regression on port 3236: 128/128 PASS','e7846efa628f57bff44d15481c56182fccf0e90d')
 require('docs/execution/HANDOFF-LGO-WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-v1.272.md','Next: `/release` visual realignment v1.273')
 if ERRORS:
  print('WEB FE DOWNLOAD TRUST VISUAL REALIGNMENT v1.272 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB FE DOWNLOAD TRUST VISUAL REALIGNMENT v1.272 VALIDATION PASS'); return 0

if __name__=='__main__': raise SystemExit(main())
