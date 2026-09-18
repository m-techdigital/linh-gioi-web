#!/usr/bin/env python3
"""Source guard for WEB-OPT-23 public performance/governance budgets v1.300."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file():ERRORS.append("missing "+rel);return ""
 return p.read_text(encoding="utf-8")

def main():
 ERRORS.clear()
 raw=read("tools/web_public_performance_budgets_v1300.json")
 try:budget=json.loads(raw) if raw else {}
 except json.JSONDecodeError as exc:ERRORS.append("invalid budget JSON: "+str(exc));budget={}
 if budget.get("authority")!="WEB-OPT-23-PUBLIC-PERFORMANCE-GOVERNANCE-BUDGETS-v1.300":
  ERRORS.append("budget authority/version missing")
 if budget.get("baseline_commit")!="fb44f69b9ee9a6a6fc3fd6e593ce59340e8c1521":
  ERRORS.append("budget baseline must bind accepted v1.299 final HEAD")
 if budget.get("route_count")!=59:ERRORS.append("budget route count must stay 59")
 for key in ("decoded_css","public_assets","heavy_image_transfer","page_height","design_reference","active_suite"):
  if key not in budget:ERRORS.append("budget missing "+key)
 active=budget.get("active_suite",{})
 if active.get("baseline_validators")!=168 or active.get("baseline_browser_specs")!=159:
  ERRORS.append("active-suite baseline must preserve pre-v1.300 authority counts")
 if active.get("max_validators",0)<169 or active.get("max_browser_specs",0)<160:
  ERRORS.append("active-suite limits must permit the v1.300 guard/spec themselves")
 for viewport in ("desktop","mobile"):
  runtime=budget.get("runtime",{}).get(viewport,{})
  for key in ("css_median_bytes","css_max_bytes","page_height_p90","page_height_max","image_bytes_p90","image_bytes_max_route","image_bytes_max_single"):
   item=runtime.get(key,{})
   if not isinstance(item,dict) or not isinstance(item.get("baseline"),int) or not isinstance(item.get("limit"),int) or item.get("limit",0)<item.get("baseline",0):
    ERRORS.append(f"invalid runtime budget {viewport}.{key}")
 spec=read("tests/e2e/web-opt-public-performance-governance-budgets-v1300.spec.ts")
 for marker in ("59 public routes stay inside accepted performance budgets","design-reference shipping stays zero","active-suite authority drift stays bounded","LGO_BUDGET_CAPTURE_ONLY"):
  if marker not in spec:ERRORS.append("budget browser spec missing "+marker)
 manifest_raw=read("tools/web_active_suite_manifest_v1298.json")
 try:manifest=json.loads(manifest_raw) if manifest_raw else {}
 except json.JSONDecodeError:manifest={}
 if "validate_web_opt_public_performance_governance_budgets_v1300.py" not in manifest.get("active",{}).get("validators",[]):
  ERRORS.append("v1.300 validator not active")
 if "web-opt-public-performance-governance-budgets-v1300.spec.ts" not in manifest.get("active",{}).get("browser_specs",[]):
  ERRORS.append("v1.300 browser budget spec not active")
 current_validators=len(manifest.get("active",{}).get("validators",[]))
 current_browser=len(manifest.get("active",{}).get("browser_specs",[]))
 if current_validators>active.get("max_validators",0):ERRORS.append(f"active validator budget exceeded: {current_validators}")
 if current_browser>active.get("max_browser_specs",0):ERRORS.append(f"active browser-spec budget exceeded: {current_browser}")
 public_root=ROOT/"apps/web/public"
 files=[p for p in public_root.rglob("*") if p.is_file()] if public_root.is_dir() else []
 images=[p for p in files if p.suffix.lower() in {".png",".jpg",".jpeg",".webp",".gif",".svg"}]
 assets=budget.get("public_assets",{})
 total_bytes=sum(p.stat().st_size for p in files)
 image_bytes=sum(p.stat().st_size for p in images)
 max_asset=max([p.stat().st_size for p in files],default=0)
 if len(files)>assets.get("max_file_count",0):ERRORS.append(f"public asset file-count budget exceeded: {len(files)}")
 if total_bytes>assets.get("max_total_bytes",0):ERRORS.append(f"public asset byte budget exceeded: {total_bytes}")
 if image_bytes>assets.get("max_image_bytes",0):ERRORS.append(f"public image byte budget exceeded: {image_bytes}")
 if max_asset>assets.get("max_single_asset",0):ERRORS.append(f"single public asset budget exceeded: {max_asset}")
 public_refs=ROOT/"apps/web/public/design-reference"
 ref_files=[p for p in public_refs.rglob("*") if p.is_file()] if public_refs.exists() else []
 if len(ref_files)>budget.get("design_reference",{}).get("max_public_files",0):ERRORS.append("design-reference shipping budget exceeded")
 project_state=read("docs/execution/WEB-PROJECT-STATE.md")
 active_prefix="Current phase: WEB-OPT-23-PUBLIC-PERFORMANCE-GOVERNANCE-BUDGETS-v1.300 WEB_CLOSED"
 if project_state.startswith(active_prefix):
  next_action=read("docs/execution/WEB-NEXT-ACTION.md")
  primary=next_action.split("\n---\n",1)[0]
  ledger=read("docs/execution/WEB-TASK-LEDGER.md")
  report=read("docs/execution/LGO-WEB-OPT-23-PUBLIC-PERFORMANCE-GOVERNANCE-BUDGETS-REPORT-v1.300.md")
  if "Status: WEB_TASK_REVIEW" not in primary:ERRORS.append("v1.300 terminal closure must be WEB_TASK_REVIEW")
  if "No automatic successor is authorized." not in primary:ERRORS.append("v1.300 terminal closure lacks no-successor authority")
  if "Next task:" in primary:ERRORS.append("v1.300 terminal closure must not invent a successor")
  if "| WEB-OPT-23-PUBLIC-PERFORMANCE-GOVERNANCE-BUDGETS-v1.300 | WEB-OPT | WEB_CLOSED |" not in ledger:ERRORS.append("ledger missing v1.300 closure")
  for marker in ("5dc5813eced6d732fac2df830586f8b4303196d9","6/6 PASS","2,052-file","169 validators / 160 browser specs"):
   if marker not in report:ERRORS.append("v1.300 report missing closure evidence: "+marker)
 if ERRORS:
  print("WEB OPT PUBLIC PERFORMANCE GOVERNANCE BUDGETS v1.300 VALIDATION FAIL")
  for e in ERRORS:print("- "+e)
  return 1
 print("WEB OPT PUBLIC PERFORMANCE GOVERNANCE BUDGETS v1.300 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
