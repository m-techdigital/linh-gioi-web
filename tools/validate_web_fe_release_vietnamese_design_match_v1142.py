#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]
def fail(m): ERRORS.append(m)
def read(r):
 p=ROOT/r
 if not p.is_file(): fail(f"missing file: {r}"); return ""
 return p.read_text(encoding='utf-8')
def req_file(r):
 if not (ROOT/r).is_file(): fail(f"missing file: {r}")
def req(r, markers):
 s=read(r)
 for m in markers:
  if m not in s: fail(f"{r}: missing {m}")
 return s
def forbid(r, markers):
 s=read(r)
 for m in markers:
  if m in s: fail(f"{r}: forbidden stale marker {m}")
def png_size(r):
 p=ROOT/r
 if not p.is_file(): fail(f"missing file: {r}"); return (0,0)
 d=p.read_bytes()
 if not d.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{r}: expected PNG"); return (0,0)
 return struct.unpack('>II', d[16:24])
def check_target():
 targets=['apps/web/public/design-reference/release-detailed-design-target-v1127.png','docs/design/reference/WEB-FE-RELEASE-DETAILED-DESIGN-TARGET-v1.127.png']
 for r in targets:
  req_file(r); w,h=png_size(r)
  if w<1600 or h<900: fail(f"{r}: expected high-fidelity Vietnamese release target dimensions, got {w}x{h}")
  if (ROOT/r).is_file() and (ROOT/r).stat().st_size<500_000: fail(f"{r}: expected full raster design board")
 if all((ROOT/r).is_file() for r in targets) and (ROOT/targets[0]).read_bytes()!=(ROOT/targets[1]).read_bytes(): fail('release target public/docs copies differ')
def check_source():
 page=req('apps/web/src/app/release/page.tsx',['lgo-releasepage-stack','Hành trình phát hành','Từ sẵn sàng nội dung tới closed test','Không build public','Tin cậy tải game','Bề mặt trạng thái','Hỗ trợ an toàn','Bảng thiết kế cổng M0 tới M1','ReleaseNarrativeStageBoard','ReleaseReadinessHubCta'])
 if page.find('<ReleaseNarrativeStageBoard />') > page.find('<ReleaseReadinessHubCta />'):
  fail('apps/web/src/app/release/page.tsx: stage board must render before readiness CTA')
 forbid('apps/web/src/app/release/page.tsx',['Release narrative: từ content-ready','No public build · no open beta','Download trust</LinkButton>','Status surfaces</LinkButton>','Safety support</LinkButton>','Game reference art','accepted backend/build entitlement'])
 req('apps/web/src/components/PublicDesignTargetReference.tsx',['PUBLIC_RELEASE_TARGET','Thiết kế chi tiết phát hành','release-detailed-design-target-v1127.png','Public Release'])
 forbid('apps/web/src/components/PublicDesignTargetReference.tsx',['Release detailed design target'])
 req('apps/web/src/components/PublicPlayerTrustReleaseSections.tsx',['Bằng chứng trước lời hứa','Hành trình phát hành: từ sẵn sàng nội dung tới closed test','Không claim open beta','lgo-release-narrative-stage-board','Hỗ trợ an toàn'])
 forbid('apps/web/src/components/PublicPlayerTrustReleaseSections.tsx',['WEB v1.18 player trust','Staged release narrative','Player trust không phải','Release narrative</LinkButton>','Download trust</LinkButton>','Safety support</LinkButton>'])
 req('apps/web/public/game-art/design-boards/release-narrative-m0-to-m1-gate.svg',['Cổng M0 → M1','Sẵn sàng nội dung','Closed test','bằng chứng trước lời hứa','không phải claim production'])
 req('packages/content/src/fixtures.ts',['M0 — Sẵn sàng nội dung','Kiểm tra tin cậy','Điều kiện closed test','Contract backend','Owner phê duyệt','M1 — Closed test có điều kiện'])
 forbid('packages/content/src/fixtures.ts',['stage: "Content-ready public web"','stage: "Closed-test preparation"','stage: "Limited closed test"','stage: "Public download candidate"'])
 req('apps/web/src/app/globals.css',['WEB v1.142 release Vietnamese design match','WEB v1.142 release proof heading compact fold alignment','grid-template-columns: repeat(6, minmax(0, 1fr))'])
def check_docs():
 files=['tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts','docs/execution/specs/WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142.md','LGO-WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-REPORT-v1.142.md','HANDOFF-LGO-WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142.md']
 for f in files: req_file(f)
 req('tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts',['release Vietnamese design match','Thiết kế chi tiết phát hành','Bằng chứng trước lời hứa','Không claim open beta','stagesTop'])
 for f in files[1:]: req(f,['WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142','WEB_CLOSED','Sequential Page Completion','Just-in-time Design','Design Target First','Layout Match Before Closure','Base UI/UX Layout','Public Release','Vietnamese','game scenario','browser/e2e','screenshot','No production auth','No DB persistence','No real Portal integration','No real Ops/Admin mutation','NO_ACCEPTED_BACKEND_CONTRACT'])
 req('docs/execution/WEB-PROJECT-STATE.md',['Current phase: WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142 WEB_CLOSED','Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.196'])
 req('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.196','select `/news/closed-tester-information-pack-started` as the next single active page'])
 req('docs/execution/WEB-TASK-LEDGER.md',['| WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142 | WEB-FE | WEB_CLOSED |'])
def main():
 check_target(); check_source(); check_docs()
 if ERRORS:
  print('WEB FE RELEASE VIETNAMESE DESIGN MATCH v1.142 VALIDATION FAIL')
  for e in ERRORS: print('-',e)
  return 1
 print('WEB FE RELEASE VIETNAMESE DESIGN MATCH v1.142 VALIDATION PASS')
 return 0
if __name__=='__main__': raise SystemExit(main())
