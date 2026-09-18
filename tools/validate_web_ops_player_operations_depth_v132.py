#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]
def read(rel):
    p=ROOT/rel
    if not p.is_file(): ERRORS.append(f"missing file: {rel}"); return ""
    return p.read_text(encoding='utf-8')
def req(rel,needle):
    if needle not in read(rel): ERRORS.append(f"{rel} missing required text: {needle}")
def forbid(rel,needle):
    if needle in read(rel): ERRORS.append(f"{rel} contains forbidden text: {needle}")
def main():
    for sym in ('ActivityTimeline','ActivityTimelineItem'):
        req('packages/ui/src/data.tsx',f'export function {sym}')
        req('packages/ui/src/index.ts',sym)
    req('packages/ui/src/data.css','.lgo-activity-timeline')
    fixtures='apps/ops/src/lib/ops-fixtures.ts'
    for m in ('PROVISIONAL_WEB_FIXTURE','NO_REAL_OPS_MUTATION','NOT_CANONICAL_BACKEND_CONTRACT','opsPlayerFixtures','opsAuditFixtureEvents'):
        req(fixtures,m)
    listp='apps/ops/src/app/player-operations/page.tsx'
    detail='apps/ops/src/app/player-operations/[id]/page.tsx'
    audit='apps/ops/src/app/audit/page.tsx'
    for m in ('DataList','FormField','TextInput','BlockedActionButton','LinkButton','opsPlayerFixtures','NO_REAL_OPS_MUTATION','Bounded lookup'):
        req(listp,m)
    for m in ('KeyValueGrid','DataList','ActivityTimeline','opsPlayerFixtures','BlockedActionButton','NO_ACCEPTED_BACKEND_CONTRACT','NO_REAL_OPS_MUTATION','Player 360 là read model','Revoke session — blocked','Unstuck — blocked'):
        req(detail,m)
    for m in ('ActivityTimeline','opsAuditFixtureEvents','NO_REAL_OPS_MUTATION'):
        req(audit,m)
    for rel in (listp,detail,audit):
        forbid(rel,'fetch('); forbid(rel,'axios')
    if ERRORS:
        print('WEB OPS PLAYER OPERATIONS DEPTH v1.32 VALIDATION FAIL')
        for e in ERRORS: print('-',e)
        return 1
    print('WEB OPS PLAYER OPERATIONS DEPTH v1.32 VALIDATION PASS'); return 0
if __name__=='__main__': sys.exit(main())
