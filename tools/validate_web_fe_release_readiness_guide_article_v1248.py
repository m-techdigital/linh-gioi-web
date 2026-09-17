#!/usr/bin/env python3
"""Guard source-authored readiness guidance; runtime and visual proof are separate gates."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f'missing {rel}')
        return ''
    text = path.read_text(encoding='utf-8')
    for marker in markers:
        if marker not in text: ERRORS.append(f'{rel}: missing {marker}')
    return text

def main() -> int:
    ERRORS.clear()
    route = require('apps/web/src/app/guides/[slug]/page.tsx', (

        'export const dynamicParams = false', 'localContentRepository.list("guides")',

        'if (!entry || entry.category !== "guides") notFound();', 'renderGuideArticle(entry)', 'if (!rendered) notFound();'))

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"release-readiness-hub-guide": PublicReleaseReadinessGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicReleaseReadinessGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="readiness-guide-contents"', 'Mục lục kiểm sẵn sàng phát hành',
        'readiness-guide-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup:', '/release/readiness', '/guides/release-trust-and-checksum-guide',
        '/download/trust', '/status', '/support/safety', '/release/tester-pack#tester-checklist',
        'Đối chiếu cổng và bằng chứng bản tải', 'Đọc Tải game, Trạng thái và Hỗ trợ cùng nhau',
        'ReadingPriorityPanel', 'items={steps.map(step => ({ label: step.step, value: step.title, href: `#readiness-guide-step-${step.step}` }))}',
        'Bài hướng dẫn không phê duyệt phát hành hoặc mở quyền test', 'không phải kết quả phê duyệt', 'NO_ACCEPTED_BACKEND_CONTRACT'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<form', '<input', '<img', '<canvas', '<video', 'download=', 'setInterval(', 'Date.now(', 'role="progressbar"', 'ownerReleaseGates', 'readinessState(', 'data-state=', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'forbidden intake/media/approval surrogate: {marker}')
    require('packages/ui/src/reading-priority-panel.tsx', ('export function ReadingPriorityPanel', 'aria-labelledby={headingId}', 'href?: string', '<a href={item.href}>'))
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    require('packages/ui/src/index.ts', ('ReadingPriorityPanel', 'GuideChapterBody', 'GuideArticle'))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for rel in ('packages/ui/src/guide-article.css', 'packages/ui/src/performance-layout.css'):
        css = require(rel)
        for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'{rel}: undefined token {token}')
    if 'Release readiness hub guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete guide-only CSS remains')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/release-readiness-hub-guide"', 'Cẩm nang kiểm sẵn sàng phát hành'))
    require('tests/e2e/fe-release-readiness-guide-article-v1248.spec.ts', (
        'contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)',
        'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])',
        'screenshot', 'four source chapter shortcuts', 'steps.map(step => step.title)', 'toHaveCount(7)',
        'gate and tester links reach usable', "box.y >= header.y + header.height", 'owner-release-gates', 'input:checked', '1/4', '0/4'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', 'closed-tester-information-pack-guide'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE RELEASE READINESS GUIDE ARTICLE v1.248 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
