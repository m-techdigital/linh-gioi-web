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
 targets=['apps/web/public/design-reference/download-trust-detailed-design-target-v1126.png','docs/design/reference/WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png']
 for r in targets:
  req_file(r); w,h=png_size(r)
  if w<1600 or h<900: fail(f"{r}: expected high-fidelity Vietnamese target dimensions, got {w}x{h}")
  if (ROOT/r).is_file() and (ROOT/r).stat().st_size<500_000: fail(f"{r}: expected full raster design board")
 if all((ROOT/r).is_file() for r in targets) and (ROOT/targets[0]).read_bytes()!=(ROOT/targets[1]).read_bytes(): fail('download trust target public/docs copies differ')
def check_source():
 page=req('apps/web/src/app/download/trust/page.tsx',['lgo-downloadtrustpage-stack','Tin cậy tải game','Không tải giả','không SHA256 giả','Hướng dẫn tin cậy phát hành','DownloadTrustGateBoard','Tin cậy trước khi tải','Vì sao cần trang này','gói phát hành thật','nguồn gốc','giới hạn đã biết','kỳ vọng hỗ trợ'])
 if page.find('<DownloadTrustGateBoard />') > page.find('Tin cậy trước khi tải'):
  fail('apps/web/src/app/download/trust/page.tsx: trust gate must render before why/readiness section')
 forbid('apps/web/src/app/download/trust/page.tsx',['Download trust / checksum / provenance','No fake download','placeholder checksum','entitlement claim','static public guidance','No public game download artifact','Release trust guide','Trust-first download'])
 req('apps/web/src/components/PublicDesignTargetReference.tsx',['PUBLIC_DOWNLOAD_TRUST_TARGET','Thiết kế chi tiết tin cậy tải game','download-trust-detailed-design-target-v1126.png','Public Download Trust'])
 forbid('apps/web/src/components/PublicDesignTargetReference.tsx',['Download trust detailed design target'])
 req('apps/web/src/components/PublicTrustSections.tsx',['Cổng kiểm tin tải game','CTA tải game chỉ mở khi có bằng chứng thật','gói build, SHA256, nguồn gốc, giới hạn đã biết','Ảnh tham chiếu game','Bằng chứng phát hành','Kỳ vọng hỗ trợ','Bước tiếp theo về tin cậy tải game'])
 forbid('apps/web/src/components/PublicTrustSections.tsx',['WEB v1.10 download trust','Download CTA chỉ mở','artifact, checksum, provenance','Release evidence','Public rule:','Source of truth:','Support expectation','Download status','Checksum guide','Status surfaces'])
 req('apps/web/src/components/PublicReleaseReadinessHubSections.tsx',['Cổng owner','Không chuyển sang wording phát hành','Bằng chứng:', 'Quy tắc public:', 'Tin cậy tải game'])
 req('packages/content/src/fixtures.ts',['Có gói build thật','SHA256 hiển thị cạnh link tải','Nguồn gốc đọc được bởi người chơi','Giới hạn đã biết đặt cạnh CTA','Kỳ vọng hỗ trợ đã sẵn sàng','Phê duyệt chủ sở hữu','Gói phát hành','Owner phê duyệt','Hiện chưa có gói tải game công khai được duyệt'])
 forbid('packages/content/src/fixtures.ts',['title: "Có artifact build thật"','title: "Provenance đọc được bởi người chơi"','title: "Support expectation đã sẵn sàng"','surface: "Download artifact"','gate: "Release artifact"'])
 req('apps/web/src/app/globals.css',['WEB v1.141 download trust Vietnamese design match','WEB v1.126 download trust detailed design target density','.lgo-downloadtrustpage-stack .lgo-trust-panel','grid-template-columns: repeat(6, minmax(0, 1fr))'])
def check_docs():
 files=['tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts','docs/execution/specs/WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141.md','LGO-WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-REPORT-v1.141.md','HANDOFF-LGO-WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141.md']
 for f in files: req_file(f)
 req('tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts',['download trust Vietnamese design match','Thiết kế chi tiết tin cậy tải game','Có gói build thật','Phê duyệt chủ sở hữu','trustGateTop','firstGatesTop'])
 for f in files[1:]: req(f,['WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141','WEB_CLOSED','Sequential Page Completion','Just-in-time Design','Design Target First','Layout Match Before Closure','Base UI/UX Layout','Public Download Trust','Vietnamese','game scenario','browser/e2e','screenshot','No production auth','No DB persistence','No real Portal integration','No real Ops/Admin mutation','NO_ACCEPTED_BACKEND_CONTRACT'])
 req('docs/execution/WEB-PROJECT-STATE.md',['Current phase: WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141 WEB_CLOSED','Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.162'])
 req('docs/execution/WEB-NEXT-ACTION.md',['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.162','select `/guides/release-trust-and-checksum-guide` as the next single active page'])
 req('docs/execution/WEB-TASK-LEDGER.md',['| WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141 | WEB-FE | WEB_CLOSED |'])
def main():
 check_target(); check_source(); check_docs()
 if ERRORS:
  print('WEB FE DOWNLOAD TRUST VIETNAMESE DESIGN MATCH v1.141 VALIDATION FAIL')
  for e in ERRORS: print('-',e)
  return 1
 print('WEB FE DOWNLOAD TRUST VIETNAMESE DESIGN MATCH v1.141 VALIDATION PASS')
 return 0
if __name__=='__main__': raise SystemExit(main())
