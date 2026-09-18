#!/usr/bin/env python3
"""Guard for WEB-OPT-21 canonical active browser/validator authority v1.298."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file():
  ERRORS.append("missing "+rel); return ""
 return p.read_text(encoding="utf-8")

def load_manifest():
 rel="tools/web_active_suite_manifest_v1298.json"
 raw=read(rel)
 if not raw:return {}
 try:return json.loads(raw)
 except json.JSONDecodeError as exc:
  ERRORS.append(f"{rel}: invalid JSON: {exc}"); return {}

def unique(values,label):
 if len(values)!=len(set(values)):ERRORS.append(label+" contains duplicates")

def main():
 ERRORS.clear(); manifest=load_manifest()
 if manifest.get("authority")!="WEB-OPT-21-ACTIVE-TEST-VALIDATOR-AUTHORITY-CONSOLIDATION-v1.298":
  ERRORS.append("manifest authority/version is missing or incorrect")
 if manifest.get("historical_is_provenance_not_pass") is not True:
  ERRORS.append("manifest must state historical suites are provenance, not PASS")
 active=manifest.get("active",{}); superseded=manifest.get("superseded",{})
 validators=active.get("validators",[]); browser=active.get("browser_specs",[])
 sup_validators=superseded.get("validators",{}); sup_browser=superseded.get("browser_specs",{})
 provenance=manifest.get("provenance",{}).get("validators",[])
 retired=manifest.get("retired_browser_patterns",[])
 for values,label in ((validators,"active validators"),(browser,"active browser specs"),(provenance,"provenance validators")):
  if not isinstance(values,list) or not all(isinstance(x,str) for x in values):ERRORS.append(label+" must be a string list")
  else:unique(values,label)
 if not isinstance(sup_validators,dict):ERRORS.append("superseded validators must be a mapping"); sup_validators={}
 if not isinstance(sup_browser,dict):ERRORS.append("superseded browser specs must be a mapping"); sup_browser={}
 for name in validators:
  if not (ROOT/"tools"/name).is_file():ERRORS.append("active validator missing: "+name)
 for name in browser:
  if not (ROOT/"tests/e2e"/name).is_file():ERRORS.append("active browser spec missing: "+name)
 for old,meta in sup_validators.items():
  repl=meta.get("replacement") if isinstance(meta,dict) else None
  if not (ROOT/"tools"/old).is_file():ERRORS.append("superseded validator missing: "+old)
  if not repl or repl not in validators:ERRORS.append("superseded validator lacks active replacement: "+old)
 for old,meta in sup_browser.items():
  if not (ROOT/"tests/e2e"/old).is_file():ERRORS.append("superseded browser spec missing: "+old)
  if not isinstance(meta,dict) or not meta.get("reason"):ERRORS.append("browser supersession lacks reason: "+old)
 if set(validators)&set(sup_validators):ERRORS.append("validator cannot be active and superseded")
 if set(browser)&set(sup_browser):ERRORS.append("browser spec cannot be active and superseded")
 all_validators={p.name for p in (ROOT/"tools").glob("validate_web*.py")}
 classified=set(validators)|set(sup_validators)|set(provenance)|{"validate_web_current_state.py"}
 missing_validators=sorted(all_validators-classified)
 if missing_validators:ERRORS.append("unclassified validators: "+", ".join(missing_validators))
 all_browser={p.name for p in (ROOT/"tests/e2e").glob("*.spec.ts")}
 missing_browser=sorted(all_browser-(set(browser)|set(sup_browser)))
 if missing_browser:ERRORS.append("unclassified browser specs: "+", ".join(missing_browser))
 for entry in retired:
  if not isinstance(entry,dict) or not entry.get("pattern") or not entry.get("reason"):
   ERRORS.append("retired browser pattern must keep pattern and reason")
 playwright=read("playwright.config.ts")
 for marker in ("web_active_suite_manifest_v1298.json","activeSuite.active.browser_specs","activeSuite.superseded.browser_specs"):
  if marker not in playwright:ERRORS.append("playwright config not manifest-driven: "+marker)
 if "testIgnore: [" in playwright:ERRORS.append("playwright config still owns a hard-coded ignore list")
 current=read("tools/validate_web_current_state.py")
 for marker in ("web_active_suite_manifest_v1298.json","load_active_suite_manifest","active_validators"):
  if marker not in current:ERRORS.append("current-state not manifest-driven: "+marker)
 for legacy in ("VALIDATORS = [","SUPERSEDED_LAYOUT_VALIDATORS = {"):
  if legacy in current:ERRORS.append("current-state still embeds legacy authority: "+legacy)
 if ERRORS:
  print("WEB OPT ACTIVE SUITE AUTHORITY v1.298 VALIDATION FAIL")
  for e in ERRORS:print("- "+e)
  return 1
 print("WEB OPT ACTIVE SUITE AUTHORITY v1.298 VALIDATION PASS")
 print(f"active validators={len(validators)} browser_specs={len(browser)} superseded_validators={len(sup_validators)} superseded_browser_specs={len(sup_browser)} provenance_validators={len(provenance)} retired_patterns={len(retired)}")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
