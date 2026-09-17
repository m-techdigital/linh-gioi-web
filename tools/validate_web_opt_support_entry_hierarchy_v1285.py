#!/usr/bin/env python3
"""Source/authority guard for WEB-OPT-08 support entry hierarchy v1.285."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; ERRORS=[]
def read(rel):
 p=ROOT/rel
 if not p.is_file(): ERRORS.append('missing '+rel); return ''
 return p.read_text(encoding='utf-8')
def need(rel,*markers):
 text=read(rel)
 for marker in markers:
  if marker not in text: ERRORS.append(f'{rel}: missing {marker}')
 return text
def main():
 ERRORS.clear()
 page=need('apps/web/src/app/support/page.tsx','<PublicSupportHero/>','<PublicSupportAnswers/>','<PublicSupportScope/>')
 if 'PublicSupportTopics' in page: ERRORS.append('support route still renders duplicated topic wall')
 content=need('apps/web/src/components/PublicSupportExperience.tsx','GuidanceStation','Không có hệ thống ticket thật','NO_ACCEPTED_BACKEND_CONTRACT','/support/help','/support/safety')
 for marker in ('<form','<input','<textarea','fetch(','XMLHttpRequest','localStorage','sessionStorage'):
  if marker in page+content: ERRORS.append('support must remain guidance-only: '+marker)
 test=need('tests/e2e/web-opt-support-entry-hierarchy-v1285.spec.ts','without a duplicated topic wall','toBeLessThanOrEqual(64)','toBeLessThanOrEqual(isMobile ? 2800 : 1500)','truthful boundaries and no intake')
 state=read('tools/validate_web_current_state.py')
 if '"validate_web_opt_support_entry_hierarchy_v1285.py"' not in state: ERRORS.append('v1.285 validator not registered in current state')
 if '"validate_web_fe_support_real_ui_layout_v1224.py": "validate_web_opt_support_entry_hierarchy_v1285.py"' not in state: ERRORS.append('v1.224 support validator not explicitly superseded by v1.285')
 config=read('playwright.config.ts')
 if '"**/fe-support-real-ui-layout-v1224.spec.ts"' not in config: ERRORS.append('historical v1.224 support browser layout still active')
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-08-SUPPORT-ENTRY-HIERARCHY-REPORT-v1.285.md')
 active_prefix='Current phase: WEB-OPT-08-SUPPORT-ENTRY-HIERARCHY-v1.285 WEB_CLOSED'
 if active_prefix not in project_state: ERRORS.append('WEB-PROJECT-STATE lost v1.285 closure history')
 if project_state.startswith(active_prefix) and 'WEB-OPT-09-SUPPORT-HELP-DISCOVERY-v1.286' not in next_action: ERRORS.append('active v1.285 checkpoint does not advance to WEB-OPT-09 v1.286')
 if '| WEB-OPT-08-SUPPORT-ENTRY-HIERARCHY-v1.285 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-08 v1.285 closure')
 for marker in ('dcbe319887d021b2ab864b2c2222e39ddcb96018','Mobile was `3,301px`; final is `2,548px`','Phase-A mobile regressions v1.279 + v1.278 + v1.281 `7/7`'):
  if marker not in report: ERRORS.append('v1.285 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT SUPPORT ENTRY HIERARCHY v1.285 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT SUPPORT ENTRY HIERARCHY v1.285 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
