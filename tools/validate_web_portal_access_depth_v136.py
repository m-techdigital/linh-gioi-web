#!/usr/bin/env python3
"""Source ownership/safety gates; runtime behavior is covered separately."""
from pathlib import Path
import re
import sys
ROOT = Path(__file__).resolve().parents[1]

def main():
    errors = []
    def read(name):
        p = ROOT / name
        if not p.is_file():
            errors.append(f'missing {name}')
            return ''
        return p.read_text()
    def require(name, markers):
        text = read(name)
        for marker in markers:
            if marker not in text:
                errors.append(f'{name}: missing {marker}')
        return text
    require('packages/ui/src/progress.tsx', ['export function ProgressSteps', 'export function ProgressStep', '<ol', '<li', 'aria-current', 'blocked', 'complete'])
    require('packages/ui/src/index.ts', ['ProgressSteps', 'ProgressStep'])
    require('packages/ui/src/progress.css', ['.lgo-progress-steps', '@media'])
    require('apps/portal/src/app/layout.tsx', ['@lgo-web/ui/progress.css'])
    require('apps/portal/src/lib/portal-fixtures.ts', ['portalAccessJourneys', 'PROVISIONAL_WEB_FIXTURE', 'NOT_CANONICAL_BACKEND_CONTRACT'])
    require('apps/portal/src/components/AccessJourney.tsx', ['ProgressSteps', 'ProgressStep', 'portalAccessJourneys', 'LinkButton', '/access'])
    for route in ['login', 'register', 'recovery']:
        require(f'apps/portal/src/app/{route}/page.tsx', ['AccessJourney', 'FormField', 'TextInput', 'FormActions', 'disabled', 'PROVISIONAL_WEB_FIXTURE', 'NOT_CANONICAL_BACKEND_CONTRACT'])
    require('apps/portal/src/app/register/page.tsx', ['CheckboxField'])
    require('apps/portal/src/app/login/page.tsx', ['CheckboxField'])
    require('apps/portal/src/app/recovery/page.tsx', ['CaseSummary', 'ActivityTimeline'])
    require('apps/portal/src/app/access/page.tsx', ['WorkspacePage', '/account', '/characters', 'PROVISIONAL_WEB_FIXTURE', 'NOT_CANONICAL_BACKEND_CONTRACT'])
    paths = list((ROOT/'apps/portal/src').rglob('*.tsx'))
    for p in paths:
        text = p.read_text()
        if re.search(r'\bfetch\s*\(|\baxios\b|<form\b|\bformAction\s*=|\baction\s*=|["\']use server["\']', text):
            errors.append(f'{p.relative_to(ROOT)}: operational form/network forbidden')
        if re.search(r'function ProgressStep|className=["\']lgo-progress', text):
            errors.append(f'{p.relative_to(ROOT)}: duplicate shared stepper')
    print('WEB PORTAL ACCESS DEPTH v1.36 VALIDATION ' + ('FAIL' if errors else 'PASS'))
    for error in errors: print('-', error)
    return bool(errors)
if __name__ == '__main__': sys.exit(main())
