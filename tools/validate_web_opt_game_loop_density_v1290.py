#!/usr/bin/env python3
"""Source guard for WEB-OPT-13 game-loop density v1.290."""
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
 page=need("apps/web/src/app/game/loop/page.tsx","<PublicWorldLoopHero/>","<PublicWorldLoopReading/>","<PublicWorldLoopQuestionsAndScope/>","<PublicWorldLoopRoutes/>","<PublicWorldLoopSourceNotes/>")
 view=need("apps/web/src/components/PublicWorldLoopExperience.tsx","Vòng lặp gameplay thế giới","NO_ACCEPTED_BACKEND_CONTRACT","không lưu tiến trình nhân vật")
 if "lgo-loop-hero-boundary" in view:
  ERRORS.append("hero still repeats gameplay/non-live technical boundary")
 css=need("packages/ui/src/reading-journey.css","WEB-OPT-13 game-loop mobile rail",".lgo-world-loop-experience","overflow-x:auto","scroll-snap-type:x proximity")
 for marker in ("<canvas","<form","fetch(","WebSocket","localStorage","sessionStorage"):
  if marker in page+view: ERRORS.append("game-loop must remain read-only: "+marker)
 test=need("tests/e2e/web-opt-game-loop-density-v1290.spec.ts","repeated technical boundaries collapse into one clear scope owner","compact swipe rail","read-only interaction and next routes remain truthful","mobile scroll cost stays materially below the 4880px baseline","toBeLessThanOrEqual(4490)")
 state=read("tools/web_active_suite_manifest_v1298.json")
 if '"validate_web_opt_game_loop_density_v1290.py"' not in state:
  ERRORS.append("v1.290 validator not registered in current state")
 next_action=read("docs/execution/WEB-NEXT-ACTION.md")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 ledger=read("docs/execution/WEB-TASK-LEDGER.md")
 report=read("docs/execution/LGO-WEB-OPT-13-GAME-LOOP-DENSITY-REPORT-v1.290.md")
 active_prefix="Current phase: WEB-OPT-13-GAME-LOOP-DENSITY-v1.290 WEB_CLOSED"
 if active_prefix not in project_state:
  ERRORS.append("WEB-PROJECT-STATE lost v1.290 closure history")
 if project_state.startswith(active_prefix) and "WEB-OPT-14-GUIDES-DISCOVERY-v1.291" not in next_action:
  ERRORS.append("active v1.290 checkpoint does not advance to WEB-OPT-14 v1.291")
 if "| WEB-OPT-13-GAME-LOOP-DENSITY-v1.290 | WEB-OPT | WEB_CLOSED |" not in ledger:
  ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-13 v1.290 closure")
 for marker in ("4830f7b7c90b9623937f9fa8805afd1180ab4b29","4,880px","4,282px","18/18"):
  if marker not in report: ERRORS.append("v1.290 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT GAME LOOP DENSITY v1.290 VALIDATION FAIL")
  for e in ERRORS: print("- "+e)
  return 1
 print("WEB OPT GAME LOOP DENSITY v1.290 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
