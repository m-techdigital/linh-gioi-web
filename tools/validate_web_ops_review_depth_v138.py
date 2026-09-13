#!/usr/bin/env python3
from pathlib import Path
import re
import sys
ROOT = Path(__file__).resolve().parents[1]

def main():
    errors=[]
    expected={
        'apps/ops/src/app/control-center/page.tsx':['MetricGrid','opsReviewQueueFixtures','DataList','LinkButton'],
        'apps/ops/src/app/trust-safety/page.tsx':['CaseSummary','ActivityTimeline','opsSafetyReviewFixture','ProgressSteps','disabled'],
        'apps/ops/src/app/security-governance/page.tsx':['ProgressSteps','opsApprovalSteps','disabled'],
        'apps/ops/src/app/page.tsx':['LinkButton','href: "/trust-safety"','href: "/security-governance"'],
        'apps/ops/src/app/layout.tsx':['@lgo-web/ui/progress.css'],
        'apps/ops/src/lib/ops-fixtures.ts':['opsSafetyReviewFixture','opsReviewQueueFixtures','opsApprovalSteps']
    }
    for name,markers in expected.items():
        text=(ROOT/name).read_text()
        for marker in markers:
            if marker not in text:errors.append(f'{name}: missing {marker}')
    for p in (ROOT/'apps/ops/src').rglob('*.tsx'):
        if re.search(r'\bfetch\s*\(|\baxios\b|<form\b|\bformAction\s*=|\baction\s*=',p.read_text()):errors.append(f'{p}: operational action forbidden')
    print('WEB OPS REVIEW v1.38 VALIDATION '+('FAIL' if errors else 'PASS'))
    for error in errors:print('-',error)
    return bool(errors)
if __name__=='__main__':sys.exit(main())
