#!/usr/bin/env python3
"""Source/authority guard for WEB-OPT-10 support/safety flow v1.287."""
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
 page=need('apps/web/src/app/support/safety/page.tsx','<PublicSafetyHero/>','<PublicSafetyChecklist/>','<PublicSafetyIssuePaths/>','<PublicSafetyDataBoundary/>','<PublicSafetyCommunityNotes/>')
 parts=('<PublicSafetyHero/>','<PublicSafetyChecklist/>','<PublicSafetyIssuePaths/>','<PublicSafetyDataBoundary/>','<PublicSafetyCommunityNotes/>')
 offsets=[page.find(part) for part in parts]
 if -1 in offsets or offsets != sorted(offsets): ERRORS.append('support/safety flow must be hero -> preparation -> issue routing -> deep data reference -> community notes')
 experience=need('apps/web/src/components/PublicSupportSafetyExperience.tsx','layout="cards"','Không gửi dữ liệu nhạy cảm','Chưa có ticket thật','NO_ACCEPTED_BACKEND_CONTRACT','supportIssuePaths.map')
 for marker in ('<form','<textarea','type="file"','fetch(','XMLHttpRequest','WebSocket','localStorage','sessionStorage'):
  if marker in page+experience: ERRORS.append('support/safety must remain local guidance only: '+marker)
 css=need('packages/ui/src/reading-tools.css','WEB-OPT-10 safety checklist rail','display:flex','flex-wrap:nowrap','overflow-x:auto','scroll-snap-type:x proximity')
 test=need('tests/e2e/web-opt-support-safety-flow-v1287.spec.ts','safe-reporting sequence reaches issue routing before the deep data reference','toBeLessThanOrEqual(2100)','toBeLessThanOrEqual(3400)','swipeable one-row touch rail','toBeChecked()')
 state=read('tools/validate_web_current_state.py')
 if '"validate_web_opt_support_safety_flow_v1287.py"' not in state: ERRORS.append('v1.287 validator not registered in current state')
 prior=read('tools/validate_web_fe_support_safety_real_ui_layout_v1226.py')
 for marker in ('<PublicSafetyChecklist/>','PrivacyNotice','DataBoundaryColumns','NO_ACCEPTED_BACKEND_CONTRACT'):
  if marker not in prior: ERRORS.append('v1.226 safety guard lost protection: '+marker)
 expected='parts = ("<PublicSafetyHero/>", "<PublicSafetyChecklist/>", "<PublicSafetyIssuePaths/>", "<PublicSafetyDataBoundary/>", "<PublicSafetyCommunityNotes/>")'
 if expected not in prior: ERRORS.append('v1.226 safety guard still requires obsolete data-before-routing order')
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-10-SUPPORT-SAFETY-FLOW-REPORT-v1.287.md')
 active_prefix='Current phase: WEB-OPT-10-SUPPORT-SAFETY-FLOW-v1.287 WEB_CLOSED'
 if active_prefix not in project_state: ERRORS.append('WEB-PROJECT-STATE lost v1.287 closure history')
 if project_state.startswith(active_prefix) and 'WEB-OPT-11-COMMUNITY-VALUE-CLARITY-v1.288' not in next_action: ERRORS.append('active v1.287 checkpoint does not advance to WEB-OPT-11 v1.288')
 if '| WEB-OPT-10-SUPPORT-SAFETY-FLOW-v1.287 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-10 v1.287 closure')
 for marker in ('274bfab06307d7688ff1b3936ace654284a7c82f','Exact v1.286 baseline mobile height was `3,842px`; final is `3,133px`','static browser suite passes `6/6`'):
  if marker not in report: ERRORS.append('v1.287 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT SUPPORT SAFETY FLOW v1.287 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT SUPPORT SAFETY FLOW v1.287 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
