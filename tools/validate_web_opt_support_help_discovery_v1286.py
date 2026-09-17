#!/usr/bin/env python3
"""Source/authority guard for WEB-OPT-09 support/help discovery v1.286."""
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
 page=need('apps/web/src/app/support/help/page.tsx','<PublicHelpHero/>','<PublicHelpAnswers/>','<PublicHelpBoundary/>','<PublicHelpReadingNotes/>')
 if 'PublicHelpTopics' in page: ERRORS.append('support/help still renders duplicated six-topic wall')
 experience=need('apps/web/src/components/PublicSupportHelpExperience.tsx','QuestionDirectory','variant="map"','Không có hệ thống ticket thật','không có tìm kiếm backend','NO_ACCEPTED_BACKEND_CONTRACT')
 directory=need('packages/ui/src/question-directory.tsx','aria-pressed','window.history.pushState','hashchange','popstate','QuestionDisclosureList')
 for marker in ('fetch(','XMLHttpRequest','WebSocket','localStorage','sessionStorage','<form','<input','<textarea'):
  if marker in experience+directory: ERRORS.append('support/help must remain local reading only: '+marker)
 css=need('packages/ui/src/question-directory.css','overflow-x:auto','flex-wrap:nowrap','min-height:44px')
 test=need('tests/e2e/web-opt-support-help-discovery-v1286.spec.ts','question map leads directly to the local answer directory','toBeLessThanOrEqual(isMobile ? 4250 : 2250)','mobile topic filters stay compact','toBeFocused()')
 state=read('tools/validate_web_current_state.py')
 if '"validate_web_opt_support_help_discovery_v1286.py"' not in state: ERRORS.append('v1.286 validator not registered in current state')
 prior=read('tools/validate_web_fe_support_help_real_ui_layout_v1225.py')
 if 'parts = ("<PublicHelpHero/>", "<PublicHelpAnswers/>", "<PublicHelpBoundary/>", "<PublicHelpReadingNotes/>")' not in prior: ERRORS.append('v1.225 help guard still requires duplicated topic wall')
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-09-SUPPORT-HELP-DISCOVERY-REPORT-v1.286.md')
 active_prefix='Current phase: WEB-OPT-09-SUPPORT-HELP-DISCOVERY-v1.286 WEB_CLOSED'
 if active_prefix not in project_state: ERRORS.append('WEB-PROJECT-STATE lost v1.286 closure history')
 if project_state.startswith(active_prefix) and 'WEB-OPT-10-SUPPORT-SAFETY-FLOW-v1.287' not in next_action: ERRORS.append('active v1.286 checkpoint does not advance to WEB-OPT-10 v1.287')
 if '| WEB-OPT-09-SUPPORT-HELP-DISCOVERY-v1.286 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-09 v1.286 closure')
 for marker in ('6a69d6ab7c8e65eb5a376a5e9f4c196c37f4fb7a','Mobile was `4,881px`; final is `4,139px`','v1.286 + parent v1.285 `8/8` PASS'):
  if marker not in report: ERRORS.append('v1.286 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT SUPPORT HELP DISCOVERY v1.286 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT SUPPORT HELP DISCOVERY v1.286 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
