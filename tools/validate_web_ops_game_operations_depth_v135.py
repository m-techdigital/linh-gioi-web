#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]; ERR=[]
def read(rel):
 p=ROOT/rel
 if not p.is_file(): ERR.append(f'missing file: {rel}'); return ''
 return p.read_text(encoding='utf-8')
def req(rel,n):
 if n not in read(rel): ERR.append(f'{rel} missing required text: {n}')
def forbid(rel,n):
 if n in read(rel): ERR.append(f'{rel} contains forbidden text: {n}')
def main():
 f='apps/ops/src/lib/ops-fixtures.ts'
 for m in ('opsGameOperationFixtures','opsGameOperationActivityFixtures','PROVISIONAL_WEB_FIXTURE','NO_REAL_OPS_MUTATION','NOT_CANONICAL_BACKEND_CONTRACT'): req(f,m)
 routes={
  'apps/ops/src/app/game-operations/page.tsx':('DataList','LinkButton','StatusBadge','opsGameOperationFixtures','Freshness: unavailable','NO_REAL_OPS_MUTATION'),
  'apps/ops/src/app/game-operations/[id]/page.tsx':('CaseSummary','ActivityTimeline','FormField','SelectInput','opsGameOperationActivityFixtures'),
  'apps/ops/src/app/content-liveops/page.tsx':('ProvisionalFeatureShell','CaseSummary','ActivityTimeline'),
 }
 for rel,marks in routes.items():
  for m in marks:req(rel,m)
  for m in ('PROVISIONAL_WEB_FIXTURE','NO_REAL_OPS_MUTATION','NOT_CANONICAL_BACKEND_CONTRACT'):req(rel,m)
  for bad in ('fetch(','axios','<form'):forbid(rel,bad)
 req('apps/ops/src/app/game-operations/[id]/page.tsx','disabled')
 if ERR:
  print('WEB OPS GAME OPERATIONS DEPTH v1.35 VALIDATION FAIL')
  for e in ERR:print('-',e)
  return 1
 print('WEB OPS GAME OPERATIONS DEPTH v1.35 VALIDATION PASS'); return 0
if __name__=='__main__':sys.exit(main())
