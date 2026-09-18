#!/usr/bin/env python3
"""Source guard for WEB-OPT-20 player roadmap v1.297."""
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
 page=need("apps/web/src/app/roadmap/page.tsx",
  "<PublicRoadmapHero/>","<PublicRoadmapStages/>","<PublicRoadmapBoundaries/>","<PublicRoadmapGates/>")
 offsets=[page.find(x) for x in ("<PublicRoadmapHero/>","<PublicRoadmapStages/>","<PublicRoadmapBoundaries/>","<PublicRoadmapGates/>")]
 if -1 in offsets or offsets!=sorted(offsets): ERRORS.append("public roadmap order must be hero -> player stages -> boundary -> gates")
 if "PublicRoadmapSourceArchive" in page: ERRORS.append("public route still renders engineering source archive")
 view=need("apps/web/src/components/PublicRoadmapExperience.tsx",
  'title="Lộ trình Linh Giới Online"',"Các chặng người chơi có thể theo dõi",
  "roadmapDecisionGates.map","stagedReleaseMessages.map","PlanningGateMap",
  "Không phải lịch phát hành","NO_ACCEPTED_BACKEND_CONTRACT",
  'href="/status"','href="/download/trust"')
 for marker in ("publicRoadmapItems","MilestoneArchive",'id="roadmap-source-archive"'):
  if marker in view: ERRORS.append("engineering implementation history leaked into public roadmap: "+marker)
 fixtures=need("packages/content/src/fixtures.ts",
  "export const publicRoadmapItems",'version: "v1.6"','version: "WEB-08"','title: "Game backend contract sync"')
 for marker in ("fetch(","WebSocket","localStorage","sessionStorage",'role="progressbar"'):
  if marker in page+view: ERRORS.append("roadmap must not create live progress/release state: "+marker)
 test=need("tests/e2e/web-opt-player-roadmap-v1297.spec.ts",
  "public roadmap leads with player product stages before release conditions",
  "engineering implementation archive is not rendered in the public journey",
  "truthful stages and gates remain interactive without fake release state")
 legacy=need("tests/e2e/fe-roadmap-real-ui-layout-v1231.spec.ts",
  "engineering history remains source-owned but is not public roadmap content",
  "four release stages lead the public roadmap without fake progress",
  "publicRoadmapItems")
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_player_roadmap_v1297.py"' not in state:
  ERRORS.append("v1.297 validator not registered in current state")

 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 active_prefix="Current phase: WEB-OPT-20-PLAYER-ROADMAP-v1.297 WEB_CLOSED"
 if project_state.startswith(active_prefix):
  next_action=read("docs/execution/WEB-NEXT-ACTION.md")
  ledger=read("docs/execution/WEB-TASK-LEDGER.md")
  report=read("docs/execution/LGO-WEB-OPT-20-PLAYER-ROADMAP-REPORT-v1.297.md")
  if "WEB-OPT-21" not in next_action: ERRORS.append("closed v1.297 does not advance to WEB-OPT-21")
  if "| WEB-OPT-20-PLAYER-ROADMAP-v1.297 | WEB-OPT | WEB_CLOSED |" not in ledger:
   ERRORS.append("WEB-TASK-LEDGER does not record v1.297 closure")
  for marker in ("Lộ trình Linh Giới Online","15 engineering records remain source-owned","NO_ACCEPTED_BACKEND_CONTRACT"):
   if marker not in report: ERRORS.append("v1.297 report missing closure evidence: "+marker)

 if ERRORS:
  print("WEB OPT PLAYER ROADMAP v1.297 VALIDATION FAIL")
  for e in ERRORS: print("- "+e)
  return 1
 print("WEB OPT PLAYER ROADMAP v1.297 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
