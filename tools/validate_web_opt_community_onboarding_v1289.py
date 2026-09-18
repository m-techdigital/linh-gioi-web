#!/usr/bin/env python3
"""Source guard for WEB-OPT-12 community onboarding v1.289."""
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
 page=need('apps/web/src/app/community/onboarding/page.tsx','<PublicOnboardingHero/>','<PublicOnboardingReading/>','<PublicOnboardingAudiences/>','<PublicOnboardingScopeNotes/>')
 parts=('<PublicOnboardingHero/>','<PublicOnboardingReading/>','<PublicOnboardingAudiences/>','<PublicOnboardingScopeNotes/>')
 offsets=[page.find(part) for part in parts]
 if -1 in offsets or offsets != sorted(offsets): ERRORS.append('onboarding flow must remain hero -> reading journey -> audience paths -> scope notes')
 experience=need('apps/web/src/components/PublicCommunityOnboardingExperience.tsx','Bắt đầu hành trình','href:"/start"','Khám phá cách chơi','href:"/game"','Về quảng trường','href:"/community"','id="onboarding-boundary"','Chưa có danh sách chờ','NO_ACCEPTED_BACKEND_CONTRACT')
 if 'lgo-onboarding-hero-boundary' in experience: ERRORS.append('hero must not repeat registration/live-system technical boundary')
 for marker in ('<form','<input','<textarea','fetch(','XMLHttpRequest','WebSocket','localStorage','sessionStorage'):
  if marker in page+experience: ERRORS.append('onboarding must remain static reading guidance: '+marker)
 css=need('packages/ui/src/reading-journey.css','WEB-OPT-12 onboarding mobile rails','display:flex','overflow-x:auto','scroll-snap-type:x proximity','flex:0 0 min(82vw,21rem)','#onboarding-audiences .lgo-question-list')
 test=need('tests/e2e/web-opt-community-onboarding-v1289.spec.ts','newcomer journey is game-oriented before technical release surfaces','compact swipe rails','NO_ACCEPTED_BACKEND_CONTRACT','axe.run')
 legacy_test=need('tests/e2e/fe-community-onboarding-real-ui-layout-v1228.spec.ts',"const expected=['/start','/game','/community'];","toContainText('Khám phá cách chơi')","toHaveURL(origin+'/start')")
 state=read('tools/web_active_suite_manifest_v1298.json')
 if '"validate_web_opt_community_onboarding_v1289.py"' not in state: ERRORS.append('v1.289 validator not registered in current state')
 prior=read('tools/validate_web_fe_community_onboarding_real_ui_layout_v1228.py')
 for marker in ('PublicCommunityOnboardingExperience.tsx','reading-journey.css','NO_ACCEPTED_BACKEND_CONTRACT','href:"/start"','href:"/game"'):
  if marker not in prior: ERRORS.append('v1.228 onboarding guard lost protection: '+marker)
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-12-COMMUNITY-ONBOARDING-REPORT-v1.289.md')
 active_prefix='Current phase: WEB-OPT-12-COMMUNITY-ONBOARDING-v1.289 WEB_CLOSED'
 if active_prefix not in project_state: ERRORS.append('WEB-PROJECT-STATE lost v1.289 closure history')
 if project_state.startswith(active_prefix) and 'WEB-OPT-13-GAME-LOOP-DENSITY-v1.290' not in next_action: ERRORS.append('active v1.289 checkpoint does not advance to WEB-OPT-13 v1.290')
 if '| WEB-OPT-12-COMMUNITY-ONBOARDING-v1.289 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-12 v1.289 closure')
 for marker in ('c6de3524c672e3302a23e212d5ba542804907dff','mobile height was `3,289px`; final is `2,668px`','shared v1.232 `/game/loop` regression is `12/12`'):
  if marker not in report: ERRORS.append('v1.289 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT COMMUNITY ONBOARDING v1.289 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT COMMUNITY ONBOARDING v1.289 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
