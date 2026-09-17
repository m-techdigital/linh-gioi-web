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
 if ERRORS:
  print('WEB OPT SUPPORT HELP DISCOVERY v1.286 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT SUPPORT HELP DISCOVERY v1.286 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
