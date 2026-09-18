#!/usr/bin/env python3
"""Source guard for WEB-OPT-17 patch-notes product boundary v1.294."""
from pathlib import Path
from web_fixture_source import fixture_source
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
 if rel == "packages/content/src/fixtures.ts": return fixture_source(ROOT)
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
 page=need("apps/web/src/app/patch-notes/page.tsx","localContentRepository.list(\"patch-notes\")","<PublicPatchNotesHero/>","<PublicPatchNoteRecords entries={entries}/>","<PublicPatchNotesReadingRoutes/>","<PublicPatchNotesArchive entries={entries}/>")
 view=need("apps/web/src/components/PublicPatchNotesExperience.tsx","Chưa có ghi chú phát hành game","0 bản cập nhật game được xác nhận",'id="patch-notes-web-archive"',"Nhật ký kỹ thuật Web","NO_ACCEPTED_BACKEND_CONTRACT")
 if "lgo-library-boundary" in view:
  ERRORS.append("patch-notes hero still repeats release/backend boundary")
 routes=view.find('aria-labelledby="patch-notes-reading-heading"')
 archive=view.find('id="patch-notes-web-archive"')
 if routes<0 or archive<0 or routes>archive:
  ERRORS.append("player verification routes must precede the Web engineering archive")
 ia=need("packages/content/src/public-ia.ts",'route("/patch-notes", "archive", "archive", "noindex", "archive")')
 metadata=need("packages/content/src/public-metadata.ts",'"/patch-notes": { title: "Ghi chú cập nhật Linh Giới"',"không phải ghi chú phát hành game")
 fixtures=need("packages/content/src/fixtures.ts",'slug: "monorepo-foundation-env-limited"','slug: "browser-matrix-guardrail-passed"','category: "patch-notes"',"PROVISIONAL_WEB_FIXTURE")
 if fixtures.count('category: "patch-notes"') != 2:
  ERRORS.append("v1.294 expects exactly two published Web patch-note fixtures")
 for marker in ("gamePatchVersion","clientVersion","releaseVersion","<form","fetch(","WebSocket","localStorage","sessionStorage"):
  if marker in page+view: ERRORS.append("patch notes must not invent game release state: "+marker)
 test=need("tests/e2e/web-opt-patch-notes-product-boundary-v1294.spec.ts",
  "provisional web records resolve to explicit no-game-patch state",
  "web engineering records remain exact and reachable only in collapsed archive",
  "player verification routes precede engineering archive without release actions",
  'meta[name="robots"]')
 state=read("tools/web_active_suite_manifest_v1298.json")
 if '"validate_web_opt_patch_notes_product_boundary_v1294.py"' not in state:
  ERRORS.append("v1.294 validator not registered in current state")
 next_action=read("docs/execution/WEB-NEXT-ACTION.md")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 ledger=read("docs/execution/WEB-TASK-LEDGER.md")
 report=read("docs/execution/LGO-WEB-OPT-17-PATCH-NOTES-PRODUCT-BOUNDARY-REPORT-v1.294.md")
 active_prefix="Current phase: WEB-OPT-17-PATCH-NOTES-PRODUCT-BOUNDARY-v1.294 WEB_CLOSED"
 if active_prefix not in project_state: ERRORS.append("WEB-PROJECT-STATE lost v1.294 closure history")
 if project_state.startswith(active_prefix) and "WEB-OPT-18-PERFORMANCE-GUIDANCE-TONE-v1.295" not in next_action: ERRORS.append("active v1.294 checkpoint does not advance to WEB-OPT-18 v1.295")
 if "| WEB-OPT-17-PATCH-NOTES-PRODUCT-BOUNDARY-v1.294 | WEB-OPT | WEB_CLOSED |" not in ledger: ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-17 v1.294 closure")
 for marker in ("dbf9e05231b906faf74d9be356ab05bc5eacd99d","3,014px","2,321px","26/26"):
  if marker not in report: ERRORS.append("v1.294 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT PATCH NOTES PRODUCT BOUNDARY v1.294 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT PATCH NOTES PRODUCT BOUNDARY v1.294 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
