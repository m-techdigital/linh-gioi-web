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
 targets=['apps/web/public/design-reference/journey-detailed-design-target-v1123.png','docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png']
 for r in targets:
  req_file(r); w,h=png_size(r)
  if w<1600 or h<900: fail(f"{r}: expected high-fidelity journey target dimensions, got {w}x{h}")
  if (ROOT/r).is_file() and (ROOT/r).stat().st_size<500_000: fail(f"{r}: expected full raster design board")
 if all((ROOT/r).is_file() for r in targets) and (ROOT/targets[0]).read_bytes()!=(ROOT/targets[1]).read_bytes(): fail('journey target public/docs copies differ')
def check_source():
 req('apps/web/src/app/journey/page.tsx',['lgo-journeypage-stack','Hành trình người chơi','Hội ngộ','Phiêu lưu','Chiến lợi','Mạnh hơn','SessionLoopRail','WorldRouteJourney','Bảng tham chiếu vòng hành trình','không claim bang hội live'])
 forbid('apps/web/src/app/journey/page.tsx',['Player journey','<span>Social</span>','<span>Adventure</span>','<span>Reward</span>','<span>Upgrade</span>','Game reference art','without claiming','Journey session route flow reference art'])
 req('apps/web/src/components/PublicDesignTargetReference.tsx',['PUBLIC_JOURNEY_TARGET','Thiết kế chi tiết hành trình','journey-detailed-design-target-v1123.png','Public Journey'])
 forbid('apps/web/src/components/PublicDesignTargetReference.tsx',['Journey detailed design target'])
 req('packages/content/src/fixtures.ts',['Rời Đông Môn','Khám phá Cổ Di Tích','Trở về Linh Thành mạnh hơn','nhiệm vụ ngày'])
 forbid('packages/content/src/fixtures.ts',['Chọn Daily'])
 req('apps/web/src/app/globals.css',['WEB v1.138 journey Vietnamese design match','.lgo-journeypage-stack','.lgo-session-loop'])
def check_docs():
 files=['tests/e2e/fe-journey-vietnamese-design-match-v1138.spec.ts','docs/execution/specs/WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138.md','LGO-WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-REPORT-v1.138.md','HANDOFF-LGO-WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138.md']
 for f in files: req_file(f)
 req('tests/e2e/fe-journey-vietnamese-design-match-v1138.spec.ts',['journey Vietnamese design match','Thiết kế chi tiết hành trình','20-minute card loop starts in the opening viewport','world route follows session loop before boundary board'])
 for f in files[1:]: req(f,['WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138','WEB_CLOSED','Sequential Page Completion','Just-in-time Design','Design Target First','Layout Match Before Closure','Base UI/UX Layout','Public Journey','Vietnamese','browser/e2e','built-in imagegen','No production auth','No DB persistence','No real Portal integration','No real Ops/Admin mutation','NO_ACCEPTED_BACKEND_CONTRACT'])
 req('docs/execution/WEB-PROJECT-STATE.md',['Current phase: WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138 WEB_CLOSED','Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.139'])
 req('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.148','select `/support/safety` as the next single active page'])
 req('docs/execution/WEB-TASK-LEDGER.md',['| WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138 | WEB-FE | WEB_CLOSED |'])
def main():
 check_target(); check_source(); check_docs()
 if ERRORS:
  print('WEB FE JOURNEY VIETNAMESE DESIGN MATCH v1.138 VALIDATION FAIL')
  for e in ERRORS: print('-',e)
  return 1
 print('WEB FE JOURNEY VIETNAMESE DESIGN MATCH v1.138 VALIDATION PASS')
 return 0
if __name__=='__main__': raise SystemExit(main())
