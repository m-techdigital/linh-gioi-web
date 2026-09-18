#!/usr/bin/env python3
"""Source guard for WEB-OPT-16 events product decision v1.293."""
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
 page=need("apps/web/src/app/events/page.tsx","localContentRepository.list(\"events\")","<PublicEventsHero/>","<PublicEventAnnouncements entries={entries}/>","<PublicEventsReadingRoutes/>")
 view=need("apps/web/src/components/PublicEventsExperience.tsx","Chưa có sự kiện live đang mở","0 sự kiện live được xác nhận",'id="events-fixture-archive"',"Kho chủ đề minh họa","NO_ACCEPTED_BACKEND_CONTRACT")
 if "lgo-library-boundary" in view:
  ERRORS.append("events hero still repeats the technical/live-event boundary")
 ia=need("packages/content/src/public-ia.ts",'route("/events", "archive", "archive", "noindex", "archive")')
 metadata=need("packages/content/src/public-metadata.ts",'"/events": { title: "Sự kiện Linh Giới"',"Kho thông báo sự kiện minh họa")
 fixtures=need("packages/content/src/fixtures.ts",'slug: "spirit-festival-event-placeholder"','category: "events"','tags: [PROVISIONAL_WEB_FIXTURE]')
 if fixtures.count('category: "events"') != 1:
  ERRORS.append("v1.293 expects the single provisional event fixture to remain source truth")
 for marker in ("liveEvent","currentEvent","eventSchedule","<form","fetch(","WebSocket","localStorage","sessionStorage"):
  if marker in page+view: ERRORS.append("events route must not invent live event state: "+marker)
 test=need("tests/e2e/web-opt-events-product-decision-v1293.spec.ts",
  "fixture-only source resolves to explicit no-live-event product state",
  "provisional event fixture remains reachable only inside collapsed archive",
  "read-only routes remain useful without registration countdown or reward state",
  'meta[name="robots"]')
 state=read("tools/web_active_suite_manifest_v1298.json")
 if '"validate_web_opt_events_product_decision_v1293.py"' not in state:
  ERRORS.append("v1.293 validator not registered in current state")
 next_action=read("docs/execution/WEB-NEXT-ACTION.md")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 ledger=read("docs/execution/WEB-TASK-LEDGER.md")
 report=read("docs/execution/LGO-WEB-OPT-16-EVENTS-PRODUCT-DECISION-REPORT-v1.293.md")
 active_prefix="Current phase: WEB-OPT-16-EVENTS-PRODUCT-DECISION-v1.293 WEB_CLOSED"
 if active_prefix not in project_state: ERRORS.append("WEB-PROJECT-STATE lost v1.293 closure history")
 if project_state.startswith(active_prefix) and "WEB-OPT-17-PATCH-NOTES-PRODUCT-BOUNDARY-v1.294" not in next_action: ERRORS.append("active v1.293 checkpoint does not advance to WEB-OPT-17 v1.294")
 if "| WEB-OPT-16-EVENTS-PRODUCT-DECISION-v1.293 | WEB-OPT | WEB_CLOSED |" not in ledger: ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-16 v1.293 closure")
 for marker in ("816421209a8bd9f5d5d92d2e10902375b763aef4","2,410px","2,200px","24/24"):
  if marker not in report: ERRORS.append("v1.293 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT EVENTS PRODUCT DECISION v1.293 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT EVENTS PRODUCT DECISION v1.293 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
