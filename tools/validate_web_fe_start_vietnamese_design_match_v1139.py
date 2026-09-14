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
 targets=['apps/web/public/design-reference/start-detailed-design-target-v1124.png','docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png']
 for r in targets:
  req_file(r); w,h=png_size(r)
  if w<1600 or h<900: fail(f"{r}: expected high-fidelity start target dimensions, got {w}x{h}")
  if (ROOT/r).is_file() and (ROOT/r).stat().st_size<500_000: fail(f"{r}: expected full raster design board")
 if all((ROOT/r).is_file() for r in targets) and (ROOT/targets[0]).read_bytes()!=(ROOT/targets[1]).read_bytes(): fail('start target public/docs copies differ')
def check_source():
 req('apps/web/src/app/start/page.tsx',['lgo-startpage-stack','Bắt đầu','BẮT ĐẦU TẠI LINH THÀNH — ĐÔNG MÔN','Tuyến hướng dẫn tân thủ','Di chuyển / Nhảy / Lướt nhanh','Kỹ năng Lộ','Slime Bóng Tối','Mở Linh Thành','CinematicWorldScene','Ảnh tham chiếu trò chơi','Ảnh thật từ tutorial Đông Môn','Bảng tham chiếu tuyến bắt đầu','không mở tải game hay backend tài khoản'])
 forbid('apps/web/src/app/start/page.tsx',['Start tutorial gameplay loop board','Game reference art','Real onboarding screenshots','public build/download claim','accepted backend contract','Move / Jump / Dash','Class Skill','Shadow Slime'])
 req('apps/web/public/game-art/design-boards/start-tutorial-gameplay-loop.svg',['Vòng chơi hướng dẫn','Tham chiếu tuyến Đông Môn tĩnh trước backend','Khám phá','Chạm trán','Nhận thưởng','Hồi phục','Mục tiêu M1','Một trận tĩnh có trạng thái chiến đấu rõ, không lưu dữ liệu.'])
 forbid('apps/web/public/game-art/design-boards/start-tutorial-gameplay-loop.svg',['Core Gameplay Loop','Prepared M1','Explore','Encounter','Reward','Recover','M1 target','One deterministic offline encounter','non-production art'])
 req('apps/web/src/components/PublicDesignTargetReference.tsx',['PUBLIC_START_TARGET','Thiết kế chi tiết bắt đầu','start-detailed-design-target-v1124.png','Public Start'])
 forbid('apps/web/src/components/PublicDesignTargetReference.tsx',['Start detailed design target'])
 req('packages/content/src/fixtures.ts',['Slime Bóng Tối'])
 forbid('packages/content/src/fixtures.ts',['Shadow Slime'])
 req('apps/web/src/app/globals.css',['WEB v1.139 start Vietnamese design match','.lgo-startpage-stack .lgo-start-hero.lgo-cinematic-hero','.lgo-startpage-stack .lgo-start-hero .lgo-cinematic-scene','.lgo-startpage-stack .lgo-onboarding-steps'])
def check_docs():
 files=['tests/e2e/fe-start-vietnamese-design-match-v1139.spec.ts','docs/execution/specs/WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139.md','LGO-WEB-FE-START-VIETNAMESE-DESIGN-MATCH-REPORT-v1.139.md','HANDOFF-LGO-WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139.md']
 for f in files: req_file(f)
 req('tests/e2e/fe-start-vietnamese-design-match-v1139.spec.ts',['start Vietnamese design match','Thiết kế chi tiết bắt đầu','Minh họa Linh Thành và khe nứt Âm Giới','desktop start hero uses the shared Đông Môn cinematic scene','tutorial board starts in the opening viewport'])
 for f in files[1:]: req(f,['WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139','WEB_CLOSED','Sequential Page Completion','Just-in-time Design','Design Target First','Layout Match Before Closure','Base UI/UX Layout','Public Start','Vietnamese','game scenario','browser/e2e','built-in imagegen','No production auth','No DB persistence','No real Portal integration','No real Ops/Admin mutation','NO_ACCEPTED_BACKEND_CONTRACT'])
 req('docs/execution/WEB-PROJECT-STATE.md',['Current phase: WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139 WEB_CLOSED','Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.173'])
 req('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.173','select `/guides/faq-search-helpfulness-guide` as the next single active page'])
 req('docs/execution/WEB-TASK-LEDGER.md',['| WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139 | WEB-FE | WEB_CLOSED |'])
def main():
 check_target(); check_source(); check_docs()
 if ERRORS:
  print('WEB FE START VIETNAMESE DESIGN MATCH v1.139 VALIDATION FAIL')
  for e in ERRORS: print('-',e)
  return 1
 print('WEB FE START VIETNAMESE DESIGN MATCH v1.139 VALIDATION PASS')
 return 0
if __name__=='__main__': raise SystemExit(main())
