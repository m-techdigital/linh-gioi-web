#!/usr/bin/env python3
"""Source guard for WEB-OPT-16 events product decision v1.293."""
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
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_events_product_decision_v1293.py"' not in state:
  ERRORS.append("v1.293 validator not registered in current state")
 if ERRORS:
  print("WEB OPT EVENTS PRODUCT DECISION v1.293 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT EVENTS PRODUCT DECISION v1.293 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
