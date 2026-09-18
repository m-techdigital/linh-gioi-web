#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
    p=ROOT/rel
    if not p.is_file(): ERRORS.append(f"missing file: {rel}"); return ""
    return p.read_text(encoding='utf-8')

def require(rel, needle):
    if needle not in read(rel): ERRORS.append(f"{rel} missing required text: {needle}")

def forbid(rel, needle):
    if needle in read(rel): ERRORS.append(f"{rel} contains forbidden app-local data markup: {needle}")

def main():
    data='packages/ui/src/data.tsx'; index='packages/ui/src/index.ts'; pkg='packages/ui/package.json'; css='packages/ui/src/data.css'
    for symbol in ('MetricGrid','MetricCard','DataToolbar','DataTable','PaginationBar'):
        require(data, f'export function {symbol}')
        require(index, symbol)
    require(pkg,'"./data.css"')
    for selector in ('.lgo-metric-grid','.lgo-data-toolbar','.lgo-data-table-wrap','.lgo-pagination-bar'):
        require(css,selector)
    for layout in ('apps/portal/src/app/layout.tsx','apps/ops/src/app/layout.tsx'):
        require(layout,'@lgo-web/ui/data.css')
    portal='apps/portal/src/app/characters/page.tsx'; ops='apps/ops/src/app/player-operations/page.tsx'
    # Shared table/metric/pagination primitives remain canonical and Ops still consumes them.
    for marker in ('MetricGrid','DataTable','PaginationBar','PROVISIONAL_WEB_FIXTURE','NOT_CANONICAL_BACKEND_CONTRACT'):
        require(ops, marker)
    forbid(ops,'<table')
    # Portal character roster may use a product-specific three-slot card composition while
    # retaining shared actions/status and the same no-backend contract boundary.
    for marker in ('LinkButton','StatusBadge','Character slot roster','PROVISIONAL_WEB_FIXTURE','NOT_CANONICAL_BACKEND_CONTRACT'):
        require(portal, marker)
    forbid(portal,'<table')
    forbid(portal,'fetch(')
    forbid(portal,'axios')
    require(ops,'NO_REAL_OPS_MUTATION')
    require(ops,'Ops/Admin is blocked until accepted RBAC/audit/security/API contract')
    if ERRORS:
        print('WEB SHARED DATA DISPLAY v1.30 VALIDATION FAIL')
        for e in ERRORS: print('-',e)
        return 1
    print('WEB SHARED DATA DISPLAY v1.30 VALIDATION PASS'); return 0
if __name__=='__main__': sys.exit(main())
