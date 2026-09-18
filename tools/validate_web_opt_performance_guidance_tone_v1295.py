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
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_performance_guidance_tone_v1295.py"' not in state:
  ERRORS.append("v1.295 validator not registered in current state")
 if ERRORS:
  print("WEB OPT PERFORMANCE GUIDANCE TONE v1.295 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT PERFORMANCE GUIDANCE TONE v1.295 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
