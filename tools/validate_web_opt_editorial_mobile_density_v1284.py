#!/usr/bin/env python3
"""Shared-owner guard for WEB-OPT-07 editorial mobile density v1.284."""
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
 guide=need('packages/ui/src/guide-article.css','WEB-OPT-07 mobile editorial density','grid-template-columns:repeat(2,minmax(0,1fr))','overflow-x:auto','scroll-snap-type:x proximity')
 guidance=need('packages/ui/src/guidance-layout.css','WEB-OPT-07 related-reading rail','grid-auto-flow:column','grid-auto-columns:minmax(78%,1fr)','overflow-x:auto')
 if '.lgo-article-contents ol { grid-template-columns:1fr; }' in guide: ERRORS.append('mobile TOC regressed to one-column wall')
 for marker in ('line-clamp:','-webkit-line-clamp:'):
  if marker in guide and marker not in ('-webkit-line-clamp:none;',): ERRORS.append('article content must not be truncated: '+marker)
 test=need('tests/e2e/web-opt-editorial-mobile-density-v1284.spec.ts','33 editorial routes materially reduce mobile scroll cost','toBeLessThanOrEqual(4300)','toBeLessThanOrEqual(1850)','truth boundaries','native fragment focus')
 state=read('tools/validate_web_current_state.py')
 if '"validate_web_opt_editorial_mobile_density_v1284.py"' not in state: ERRORS.append('v1.284 validator not registered in current state')
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-07-EDITORIAL-MOBILE-DENSITY-READING-FLOW-REPORT-v1.284.md')
 active_prefix='Current phase: WEB-OPT-07-EDITORIAL-MOBILE-DENSITY-READING-FLOW-v1.284 WEB_CLOSED'
 if not project_state.startswith(active_prefix): ERRORS.append('WEB-PROJECT-STATE does not lead with v1.284 closure')
 if 'WEB-OPT-08-SUPPORT-ENTRY-HIERARCHY-v1.285' not in next_action: ERRORS.append('WEB-NEXT-ACTION does not advance to WEB-OPT-08 v1.285')
 if '| WEB-OPT-07-EDITORIAL-MOBILE-DENSITY-READING-FLOW-v1.284 | WEB-OPT | WEB_CLOSED |' not in ledger: ERRORS.append('WEB-TASK-LEDGER does not record WEB-OPT-07 v1.284 closure')
 for marker in ('e105aa7f874730ac6c82e8c49c37499a44dd806a','P90 `4,016px`','474744742f0fb3ff30f879ad356797be560a50c67aba0861466a49b76f6ef453'):
  if marker not in report: ERRORS.append('v1.284 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT EDITORIAL MOBILE DENSITY v1.284 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT EDITORIAL MOBILE DENSITY v1.284 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
