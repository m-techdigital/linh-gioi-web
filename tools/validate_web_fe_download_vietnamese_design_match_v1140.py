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
 targets=['apps/web/public/design-reference/download-detailed-design-target-v1125.png','docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png']
 for r in targets:
  req_file(r); w,h=png_size(r)
  if w<1600 or h<900: fail(f"{r}: expected high-fidelity download target dimensions, got {w}x{h}")
  if (ROOT/r).is_file() and (ROOT/r).stat().st_size<500_000: fail(f"{r}: expected full raster design board")
 if all((ROOT/r).is_file() for r in targets) and (ROOT/targets[0]).read_bytes()!=(ROOT/targets[1]).read_bytes(): fail('download target public/docs copies differ')
def check_source():
 req('apps/web/src/app/download/page.tsx',['lgo-downloadpage-stack','Cổng phát hành','Trạng thái chơi & tải game','Bản tải công khai hiện chưa mở','gói build được duyệt','tệp phát hành, SHA256','Chưa mở cổng public','phê duyệt chủ sở hữu','Mức độ sẵn sàng','Kênh chính thức','lgo-download-channel-section','statusLabel','DownloadStatusDepth'])
 forbid('apps/web/src/app/download/page.tsx',['Public access','No public production download','release artifact','owner approval','Readiness"','Channels"','Public launcher/build','Closed testing build'])
 req('apps/web/src/components/PublicDesignTargetReference.tsx',['PUBLIC_DOWNLOAD_TARGET','Thiết kế chi tiết tải game','download-detailed-design-target-v1125.png','Public Download'])
 forbid('apps/web/src/components/PublicDesignTargetReference.tsx',['Download detailed design target'])
 req('packages/content/src/fixtures.ts',['Gói phát hành','Phê duyệt chủ sở hữu','Giới hạn đã biết','Sẵn sàng hỗ trợ','Launcher / gói build công khai','Gói kiểm thử giới hạn','Chưa có bản tải công khai từ web repo này'])
 forbid('packages/content/src/fixtures.ts',['label: "Public release artifact"','label: "Closed testing channel"','label: "Runtime/browser web checks"','label: "Backend contract sync"','title: "Public launcher/build"','title: "Closed testing build"'])
 req('apps/web/src/app/globals.css',['WEB v1.140 download Vietnamese design match','.lgo-downloadpage-stack .lgo-download-player-hero','display: grid','.lgo-downloadpage-stack .lgo-download-channel-section'])
def check_docs():
 files=['tests/e2e/fe-download-vietnamese-design-match-v1140.spec.ts','docs/execution/specs/WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140.md','LGO-WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-REPORT-v1.140.md','HANDOFF-LGO-WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140.md']
 for f in files: req_file(f)
 req('tests/e2e/fe-download-vietnamese-design-match-v1140.spec.ts',['download Vietnamese design match','Thiết kế chi tiết tải game','release readiness panel starts in the opening viewport','channel cards follow readiness in the design-led first flow'])
 for f in files[1:]: req(f,['WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140','WEB_CLOSED','Sequential Page Completion','Just-in-time Design','Design Target First','Layout Match Before Closure','Base UI/UX Layout','Public Download','Vietnamese','game scenario','browser/e2e','built-in imagegen','No production auth','No DB persistence','No real Portal integration','No real Ops/Admin mutation','NO_ACCEPTED_BACKEND_CONTRACT'])
 req('docs/execution/WEB-PROJECT-STATE.md',['Current phase: WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140 WEB_CLOSED','Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.160'])
 req('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.160','select `/guides/download-readiness-guide` as the next single active page'])
 req('docs/execution/WEB-TASK-LEDGER.md',['| WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140 | WEB-FE | WEB_CLOSED |'])
def main():
 check_target(); check_source(); check_docs()
 if ERRORS:
  print('WEB FE DOWNLOAD VIETNAMESE DESIGN MATCH v1.140 VALIDATION FAIL')
  for e in ERRORS: print('-',e)
  return 1
 print('WEB FE DOWNLOAD VIETNAMESE DESIGN MATCH v1.140 VALIDATION PASS')
 return 0
if __name__=='__main__': raise SystemExit(main())
