#!/usr/bin/env python3
"""Source guard for WEB-OPT-11 community value clarity v1.288."""
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
 page=need('apps/web/src/app/community/page.tsx','<PublicCommunityHero/>','<PublicCommunityPanels/>','<PublicCommunityGallery/>','<PublicCommunityConduct/>','<PublicCommunityScopeNotes/>')
 parts=('<PublicCommunityHero/>','<PublicCommunityPanels/>','<PublicCommunityGallery/>','<PublicCommunityConduct/>','<PublicCommunityScopeNotes/>')
 offsets=[page.find(part) for part in parts]
 if -1 in offsets or offsets != sorted(offsets): ERRORS.append('community flow must remain hero -> player value panels -> gallery -> conduct -> scope notes')
 experience=need('apps/web/src/components/PublicCommunityExperience.tsx','id="community-live-boundary"','Chưa có trò chuyện, diễn đàn hoặc bang hội.','Website chưa nhận phiếu hỗ trợ hoặc dữ liệu riêng tư.','/release/readiness','/community/onboarding','/release/tester-pack','/support/safety','NO_ACCEPTED_BACKEND_CONTRACT')
 if 'lgo-community-hero-boundary' in experience: ERRORS.append('hero must not repeat the live-social technical boundary')
 if experience.count('Chưa có trò chuyện, diễn đàn hoặc bang hội.') != 1: ERRORS.append('live-social unavailable phrase must have one visible source owner')
 for marker in ('<form','<input','<textarea','fetch(','XMLHttpRequest','WebSocket','localStorage','sessionStorage'):
  if marker in page+experience: ERRORS.append('community must remain static guidance/prototype only: '+marker)
 css=need('packages/ui/src/community-layout.css','WEB-OPT-11 community value rail','display:flex','overflow-x:auto','scroll-snap-type:x proximity','flex:0 0 min(86vw,22rem)')
 test=need('tests/e2e/web-opt-community-value-clarity-v1288.spec.ts','player value and next steps lead before one compact live-social boundary','toBeLessThanOrEqual(3650)','overflowX','axe.run','captures accepted desktop/mobile community composition')
 state=read('tools/web_active_suite_manifest_v1298.json')
 if '"validate_web_opt_community_value_clarity_v1288.py"' not in state: ERRORS.append('v1.288 validator not registered in current state')
 prior=read('tools/validate_web_fe_community_real_ui_layout_v1227.py')
 for marker in ('PublicCommunityExperience.tsx','community-layout.css','NO_ACCEPTED_BACKEND_CONTRACT'):
  if marker not in prior: ERRORS.append('v1.227 community guard lost protection: '+marker)
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-11-COMMUNITY-VALUE-CLARITY-REPORT-v1.288.md')
 active_prefix='Current phase: WEB-OPT-11-COMMUNITY-VALUE-CLARITY-v1.288 WEB_CLOSED'
 if active_prefix not in project_state: ERRORS.append('WEB-PROJECT-STATE lost v1.288 closure history')
 if project_state.startswith(active_prefix) and 'WEB-OPT-12-COMMUNITY-ONBOARDING-v1.289' not in next_action: ERRORS.append('active v1.288 checkpoint does not advance to WEB-OPT-12 v1.289')
 if '| WEB-OPT-11-COMMUNITY-VALUE-CLARITY-v1.288 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-11 v1.288 closure')
 for marker in ('c03ee5804f13b82ea330b06588121df895291a9a','Exact v1.287 baseline mobile height was `4,203px`; final is `3,245px`','focused static browser coverage passes `8/8`'):
  if marker not in report: ERRORS.append('v1.288 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT COMMUNITY VALUE CLARITY v1.288 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT COMMUNITY VALUE CLARITY v1.288 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
