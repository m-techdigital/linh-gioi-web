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
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_game_loop_density_v1290.py"' not in state:
  ERRORS.append("v1.290 validator not registered in current state")
 if ERRORS:
  print("WEB OPT GAME LOOP DENSITY v1.290 VALIDATION FAIL")
  for e in ERRORS: print("- "+e)
  return 1
 print("WEB OPT GAME LOOP DENSITY v1.290 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
