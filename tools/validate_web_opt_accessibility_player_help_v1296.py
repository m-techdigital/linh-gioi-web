#!/usr/bin/env python3
"""Source guard for WEB-OPT-19 accessibility player help v1.296."""
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
 page=need("apps/web/src/app/accessibility/page.tsx","<PublicAccessibilityHero/>","<PublicAccessibilityPractice/>","<PublicAccessibilityRoutes/>","<PublicAccessibilityPrinciples/>","<PublicAccessibilityNotes/>")
 view=need("apps/web/src/components/PublicAccessibilityExperience.tsx",
  'title="Dễ đọc và dễ thao tác"',"KeyboardPractice","Điều hướng dẫn chưa thay thế",
  "Chưa có audit WCAG chính thức","Không lưu thiết lập cá nhân","NO_ACCEPTED_BACKEND_CONTRACT",
  "Tìm hiểu sâu hơn về focus và cách đọc")
 if "lgo-accessibility-hero-note" in view:
  ERRORS.append("accessibility hero still repeats certification/settings boundary")
 if 'answer:<><p>{item.playerBenefit}</p><p>{item.implementationNote}</p><small>{item.nonClaim}</small></>' in view:
  ERRORS.append("main principles still mix player benefit with implementation/compliance proof")
 if 'answer:<p>{item.playerBenefit}</p>' not in view:
  ERRORS.append("main principles do not use player-benefit-only answers")
 if 'item.implementationNote' not in view or 'item.nonClaim' not in view:
  ERRORS.append("deep technical/source notes were accidentally dropped instead of moved")
 for marker in ("fetch(","WebSocket","localStorage","sessionStorage","preventDefault","onKeyDown"):
  if marker in page+view: ERRORS.append("accessibility page must not add telemetry/settings/key-trap behavior: "+marker)
 test=need("tests/e2e/web-opt-accessibility-player-help-v1296.spec.ts",
  "main principles read as player help while technical proof moves to deep notes",
  "keyboard practice and five player routes remain real and local",
  "player help remains accessible without fake settings or certification")
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_accessibility_player_help_v1296.py"' not in state:
  ERRORS.append("v1.296 validator not registered in current state")
 if ERRORS:
  print("WEB OPT ACCESSIBILITY PLAYER HELP v1.296 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT ACCESSIBILITY PLAYER HELP v1.296 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
