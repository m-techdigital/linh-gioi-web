#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS=[]
def read(rel):
    p=ROOT/rel
    if not p.is_file(): ERRORS.append(f"missing file: {rel}"); return ""
    return p.read_text(encoding='utf-8')
def req(rel, needle):
    if needle not in read(rel): ERRORS.append(f"{rel} missing required text: {needle}")
def forbid(rel, needle):
    if needle in read(rel): ERRORS.append(f"{rel} contains forbidden text: {needle}")
def main():
    fixtures='apps/ops/src/lib/ops-fixtures.ts'
    for marker in ('opsSupportQueueFixtures','opsSupportCaseFixture','PROVISIONAL_WEB_FIXTURE','NO_REAL_OPS_MUTATION','NOT_CANONICAL_BACKEND_CONTRACT'):
        req(fixtures,marker)
    routes={
      'apps/ops/src/app/support/page.tsx':('DataTable','MetricGrid','LinkButton','opsSupportQueueFixtures'),
      'apps/ops/src/app/support/[id]/page.tsx':('CaseSummary','ActivityTimeline','FormField','SelectInput','opsSupportCaseFixture'),
    }
    for rel, markers in routes.items():
        for m in markers: req(rel,m)
        for m in ('PROVISIONAL_WEB_FIXTURE','NO_REAL_OPS_MUTATION','NOT_CANONICAL_BACKEND_CONTRACT'): req(rel,m)
        for bad in ('fetch(','axios','<form'): forbid(rel,bad)
    req('apps/ops/src/app/support/[id]/page.tsx','disabled')
    if ERRORS:
        print('WEB OPS SUPPORT TRIAGE DEPTH v1.34 VALIDATION FAIL')
        for e in ERRORS: print('-',e)
        return 1
    print('WEB OPS SUPPORT TRIAGE DEPTH v1.34 VALIDATION PASS')
    return 0
if __name__=='__main__': sys.exit(main())
