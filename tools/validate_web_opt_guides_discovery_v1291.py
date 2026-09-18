#!/usr/bin/env python3
"""Source guard for WEB-OPT-14 guides discovery v1.291."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file():
  ERRORS.append("missing "+rel)
  return ""
 return p.read_text(encoding="utf-8")

def need(rel,*markers):
 text=read(rel)
 for marker in markers:
  if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
 return text

def main():
 ERRORS.clear()
 view=need("apps/web/src/components/PublicGuidesDiscovery.tsx",
  'localContentRepository.list("guides")','initialGroupId="beginner"',
  '"Nhập môn"','"Bản tải & kiểm thử"','"Cộng đồng & hỗ trợ"','"Đọc website"')
 catalog=need("packages/ui/src/reading-catalog.tsx",
  "initialGroupId?: string","useState(initialGroupId)","entries.length","groups.map",
  'type="search"','role="status"',"không được gửi hoặc lưu")
 css=need("packages/ui/src/reading-catalog.css",
  "WEB-OPT-14 mobile intent filter rail",".lgo-guides-discovery .lgo-reading-catalog-filters",
  "overflow-x:auto","scroll-snap-type:x proximity")
 for marker in ("fetch(","XMLHttpRequest","WebSocket","localStorage","sessionStorage"):
  if marker in view+catalog: ERRORS.append("guides discovery must remain local/read-only: "+marker)
 test=need("tests/e2e/web-opt-guides-discovery-v1291.spec.ts",
  "curated beginner intent is the initial view","all published guides stay one action away",
  "mobile intent filters are one compact swipe rail","local search still reaches the full guide set",
  "curated initial discovery keeps scan height materially below the 16-card baseline","isMobile?3000:1800")
 state=read("tools/web_active_suite_manifest_v1298.json")
 if '"validate_web_opt_guides_discovery_v1291.py"' not in state:
  ERRORS.append("v1.291 validator not registered in current state")
 next_action=read("docs/execution/WEB-NEXT-ACTION.md")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 ledger=read("docs/execution/WEB-TASK-LEDGER.md")
 report=read("docs/execution/LGO-WEB-OPT-14-GUIDES-DISCOVERY-REPORT-v1.291.md")
 active_prefix="Current phase: WEB-OPT-14-GUIDES-DISCOVERY-v1.291 WEB_CLOSED"
 if active_prefix not in project_state:
  ERRORS.append("WEB-PROJECT-STATE lost v1.291 closure history")
 if project_state.startswith(active_prefix) and "WEB-OPT-15-NEWS-PLAYER-DISCOVERY-v1.292" not in next_action:
  ERRORS.append("active v1.291 checkpoint does not advance to WEB-OPT-15 v1.292")
 if "| WEB-OPT-14-GUIDES-DISCOVERY-v1.291 | WEB-OPT | WEB_CLOSED |" not in ledger:
  ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-14 v1.291 closure")
 for marker in ("5fcb4c07b6959d67eeee670c06d068b7e87cd9f2","5,028px","2,608px","28/28"):
  if marker not in report: ERRORS.append("v1.291 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT GUIDES DISCOVERY v1.291 VALIDATION FAIL")
  for e in ERRORS: print("- "+e)
  return 1
 print("WEB OPT GUIDES DISCOVERY v1.291 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
