#!/usr/bin/env python3
"""Source guard for WEB-OPT-18 performance guidance tone v1.295."""
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
 page=need("apps/web/src/app/performance/page.tsx","<PublicPerformanceHero/>","<PublicPerformanceWorkshop/>","<PublicPerformanceMeasurement/>","<PublicPerformancePrinciples/>","<PublicPerformanceRoutes/>","<PublicPerformanceNotes/>")
 view=need("apps/web/src/components/PublicPerformanceExperience.tsx",
  "Đọc nhẹ và rõ trên thiết bị của bạn","Điều khung thử không đo","Không có dữ liệu production","NO_ACCEPTED_BACKEND_CONTRACT")
 if "lgo-performance-hero-note" in view:
  ERRORS.append("performance hero still repeats measurement/non-claim boundary")
 if 'Ghi chú trong source' in view:
  ERRORS.append("route cards still expose engineering-source proof blocks")
 if view.count("<details>")>1:
  ERRORS.append("performance route/proof disclosures remain too dense")
 for marker in ("PerformanceObserver","sendBeacon","fetch(","WebSocket","localStorage","sessionStorage"):
  if marker in page+view: ERRORS.append("performance route must not add monitoring or persistence: "+marker)
 css=need("packages/ui/src/performance-layout.css","WEB-OPT-18 player guidance tone",".lgo-performance-guidance-boundary")
 test=need("tests/e2e/web-opt-performance-guidance-tone-v1295.spec.ts",
  "player-readable guidance replaces engineering dashboard tone",
  "reading workshop remains local, optional and non-measuring",
  "useful routes and non-claims remain without telemetry or fake score")
 state=read("tools/web_active_suite_manifest_v1298.json")
 if '"validate_web_opt_performance_guidance_tone_v1295.py"' not in state:
  ERRORS.append("v1.295 validator not registered in current state")
 next_action=read("docs/execution/WEB-NEXT-ACTION.md")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 ledger=read("docs/execution/WEB-TASK-LEDGER.md")
 report=read("docs/execution/LGO-WEB-OPT-18-PERFORMANCE-GUIDANCE-TONE-REPORT-v1.295.md")
 active_prefix="Current phase: WEB-OPT-18-PERFORMANCE-GUIDANCE-TONE-v1.295 WEB_CLOSED"
 if active_prefix not in project_state: ERRORS.append("WEB-PROJECT-STATE lost v1.295 closure history")
 if project_state.startswith(active_prefix) and "WEB-OPT-19-ACCESSIBILITY-PLAYER-HELP-v1.296" not in next_action: ERRORS.append("active v1.295 checkpoint does not advance to WEB-OPT-19 v1.296")
 if "| WEB-OPT-18-PERFORMANCE-GUIDANCE-TONE-v1.295 | WEB-OPT | WEB_CLOSED |" not in ledger: ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-18 v1.295 closure")
 for marker in ("1524fbc299c7e43403ac1bbc380224c7299c4b6d","4,428px","3,966px","20/20"):
  if marker not in report: ERRORS.append("v1.295 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT PERFORMANCE GUIDANCE TONE v1.295 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT PERFORMANCE GUIDANCE TONE v1.295 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
