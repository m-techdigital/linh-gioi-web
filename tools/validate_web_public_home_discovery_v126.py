#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
def read(rel):
    p=ROOT/rel
    if not p.is_file(): errors.append(f'missing file: {rel}'); return ''
    return p.read_text(encoding='utf-8')
def req(rel,needle):
    if needle not in read(rel): errors.append(f'{rel} missing: {needle}')
def forbid(rel,needle):
    if needle in read(rel): errors.append(f'{rel} still contains duplicated homepage summary: {needle}')
def main():
    req('packages/ui/src/primitives.tsx','export function MediaFrame')
    req('packages/ui/src/index.ts','MediaFrame')
    req('packages/content/src/fixtures.ts','homeDiscoveryMoments')
    req('packages/content/src/index.ts','homeDiscoveryMoments')
    req('apps/web/src/components/HomeDiscoveryShowcase.tsx','MediaFrame')
    req('apps/web/src/components/HomeDiscoveryShowcase.tsx','homeDiscoveryMoments')
    req('apps/web/src/app/page.tsx','HomeDiscoveryShowcase')
    for old in ['ClassPathGrid','WorldPanoramaBand','NarrativeChapterGrid']:
        forbid('apps/web/src/app/page.tsx',old)
    req('apps/web/src/app/globals.css','.lgo-home-discovery')
    if errors:
        print('WEB PUBLIC HOME DISCOVERY v1.26 VALIDATION FAIL')
        for e in errors: print('-',e)
        return 1
    print('WEB PUBLIC HOME DISCOVERY v1.26 VALIDATION PASS')
    return 0
if __name__=='__main__': sys.exit(main())
