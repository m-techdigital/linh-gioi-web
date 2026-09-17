#!/usr/bin/env python3
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def fail(msg): ERRORS.append(msg)
def read(rel):
 p=ROOT/rel
 if not p.is_file(): fail('missing '+rel); return ''
 return p.read_text(encoding='utf-8')
def require(rel,markers):
 s=read(rel)
 for marker in markers:
  if marker not in s: fail(f'{rel}: missing {marker}')
 return s

def main():
 ERRORS.clear()
 registry=require('apps/web/src/components/PublicEditorialRendererRegistry.tsx',(
  'newsRendererBySlug','guideRendererBySlug','renderNewsArticle','renderGuideArticle','PublicGenericNewsArticle'
 ))
 news=read('apps/web/src/app/news/[slug]/page.tsx')
 guides=read('apps/web/src/app/guides/[slug]/page.tsx')
 for rel,text in [('news/[slug]',news),('guides/[slug]',guides)]:
  if 'if (entry.slug ===' in text: fail(rel+' retains slug-specialized if-chain')
 if news.count('renderNewsArticle(')!=1: fail('news route must delegate exactly once to renderNewsArticle')
 if guides.count('renderGuideArticle(')!=1: fail('guide route must delegate exactly once to renderGuideArticle')
 expected_news={
  'web-program-control-tower','public-ux-content-polish-started','visual-responsive-polish-started','public-game-info-depth-started',
  'news-guide-detail-pages-started','status-download-trust-polish-started','closed-tester-information-pack-started',
  'community-roadmap-onboarding-started','content-ia-hub-polish-started','world-gameplay-loop-depth-started','player-safety-support-faq-polish-started'
 }
 expected_guides={
  'gate-entry-guide','beginner-training-loop-guide','download-readiness-guide','support-and-community-guide','release-trust-and-checksum-guide',
  'community-roadmap-onboarding-guide','start-here-content-hub-guide','world-gameplay-loop-guide','player-safety-support-guide',
  'accessibility-readability-guide','performance-copy-budget-guide','route-continuity-conversion-guide','player-trust-release-guide',
  'release-readiness-hub-guide','closed-tester-information-pack-guide','faq-search-helpfulness-guide'
 }
 # Slug literals in registry are the explicit renderer ownership contract.
 reg_slugs=set(re.findall(r'^\s*"([a-z0-9-]+)"\s*:',registry,re.M))
 missing_news=expected_news-reg_slugs; missing_guides=expected_guides-reg_slugs
 if missing_news: fail('missing News registry slugs: '+','.join(sorted(missing_news)))
 if missing_guides: fail('missing Guide registry slugs: '+','.join(sorted(missing_guides)))
 if len(expected_news & reg_slugs)!=11: fail('News special renderer registry must contain 11 slugs')
 if len(expected_guides & reg_slugs)!=16: fail('Guide renderer registry must contain 16 slugs')
 require('tests/e2e/web-opt-editorial-renderers-v1283.spec.ts',(
  'all 17 News routes preserve authored semantics and archive metadata',
  'all 16 Guide routes preserve authored semantics and indexable metadata',
  'unknown editorial slugs remain 404'
 ))
 state=read('tools/validate_web_current_state.py')
 if '"validate_web_opt_editorial_renderers_v1283.py"' not in state: fail('v1.283 validator not registered in current state')
 next_action=read('docs/execution/WEB-NEXT-ACTION.md')
 project_state=read('docs/execution/WEB-PROJECT-STATE.md')
 ledger=read('docs/execution/WEB-TASK-LEDGER.md')
 report=read('docs/execution/LGO-WEB-OPT-06-EDITORIAL-RENDERER-CONSOLIDATION-REPORT-v1.283.md')
 active_prefix='Current phase: WEB-OPT-06-EDITORIAL-RENDERER-CONSOLIDATION-v1.283 WEB_CLOSED'
 if project_state.startswith(active_prefix) and 'WEB-OPT-07-EDITORIAL-MOBILE-DENSITY-READING-FLOW-v1.284' not in next_action:
  fail('active v1.283 checkpoint does not advance to WEB-OPT-07 v1.284')
 if '| WEB-OPT-06-EDITORIAL-RENDERER-CONSOLIDATION-v1.283 | WEB-OPT | WEB_CLOSED |' not in ledger:
  fail('WEB-TASK-LEDGER does not record WEB-OPT-06 v1.283 closure')
 for marker in ('b23fd22cbb6324a04769c315ca5cd16c3b3fba31','66 route×viewport signatures','Eight representative full-page screenshots'):
  if marker not in report: fail('v1.283 report missing closure evidence: '+marker)
 if ERRORS:
  print('WEB OPT EDITORIAL RENDERERS v1.283 VALIDATION FAIL')
  for e in ERRORS: print('- '+e)
  return 1
 print('WEB OPT EDITORIAL RENDERERS v1.283 VALIDATION PASS'); return 0
if __name__=='__main__': raise SystemExit(main())
