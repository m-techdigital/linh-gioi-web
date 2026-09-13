#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
    p=ROOT/rel
    if not p.is_file():
        ERRORS.append(f"missing file: {rel}")
        return ""
    return p.read_text(encoding='utf-8')

def require(rel, needle):
    if needle not in read(rel): ERRORS.append(f"{rel} missing required text: {needle}")

def forbid(rel, needle):
    if needle in read(rel): ERRORS.append(f"{rel} contains forbidden app-local form markup: {needle}")

def main():
    forms='packages/ui/src/forms.tsx'
    index='packages/ui/src/index.ts'
    pkg='packages/ui/package.json'
    for symbol in ('FormField','TextInput','SelectInput','CheckboxField','FormActions','InlineFeedback'):
        require(forms, f'export function {symbol}')
        require(index, symbol)
    require(pkg, '"./forms.css"')
    require('packages/ui/src/forms.css', '.lgo-form-field')
    require('packages/ui/src/forms.css', '.lgo-form-control')
    require('packages/ui/src/forms.css', '.lgo-inline-feedback')
    require('packages/ui/src/primitives.tsx', 'children?: ReactNode')
    require('packages/ui/src/primitives.tsx', '{children}')

    for layout in ('apps/portal/src/app/layout.tsx','apps/ops/src/app/layout.tsx'):
        require(layout, '@lgo-web/ui/forms.css')

    portal_pages=(
        'apps/portal/src/app/login/page.tsx',
        'apps/portal/src/app/register/page.tsx',
        'apps/portal/src/app/recovery/page.tsx',
    )
    for rel in portal_pages:
        require(rel, 'FormField')
        require(rel, 'TextInput')
        require(rel, 'disabled')
        forbid(rel, '<input')
        forbid(rel, '<form')
    require('apps/portal/src/app/login/page.tsx', 'No production auth is claimed')

    ops_pages=('apps/ops/src/app/security-governance/page.tsx','apps/ops/src/app/audit/page.tsx')
    for rel in ops_pages:
        require(rel, 'NO_REAL_OPS_MUTATION')
        require(rel, 'NOT_CANONICAL_BACKEND_CONTRACT')
        forbid(rel, '<input')
        forbid(rel, '<select')
        forbid(rel, '<form')
    require('apps/ops/src/app/security-governance/page.tsx', 'VisualProofGrid')
    require('apps/ops/src/app/security-governance/page.tsx', 'Governance route continuity')
    require('apps/ops/src/app/audit/page.tsx', 'TextInput')
    require('apps/ops/src/app/audit/page.tsx', 'SelectInput')

    if ERRORS:
        print('WEB SHARED FORM CONTROLS v1.29 VALIDATION FAIL')
        for e in ERRORS: print('-',e)
        return 1
    print('WEB SHARED FORM CONTROLS v1.29 VALIDATION PASS')
    return 0

if __name__=='__main__': sys.exit(main())
