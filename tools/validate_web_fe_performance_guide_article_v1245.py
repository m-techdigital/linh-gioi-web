#!/usr/bin/env python3
"""Guard source-backed performance guidance. Browser tests, not this file, prove rendering."""
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
        'if (!entry || entry.category !== "guides") notFound();',
        'if (entry.slug === "performance-copy-budget-guide")', '<PublicPerformanceGuide entry={entry}/>'))
    if route.find('notFound();') > route.find('<PublicPerformanceGuide entry={entry}/>'): ERRORS.append('category guard must precede specialization')
    view = require('apps/web/src/components/PublicPerformanceGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="performance-guide-contents"', 'Mục lục giữ web nhẹ và rõ',
        'performance-guide-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup:', '/performance#performance-preview', '/guides', '/status', '/download/trust', '/release/readiness', '/support/safety',
        'ReadingPriorityPanel', 'items={steps.map(step => ({ label: step.step, value: step.title }))}',
        'Bài hướng dẫn cách đọc, không phải kết quả đo tốc độ', 'không phải điểm số', 'NO_ACCEPTED_BACKEND_CONTRACT'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', '<img', '<video', '<picture', 'download=', 'setInterval(', 'Date.now(', 'role="timer"', 'role="progressbar"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested media/intake/telemetry behavior: {marker}')
    require('packages/ui/src/reading-priority-panel.tsx', ('export function ReadingPriorityPanel', 'aria-labelledby={headingId}', '<h2 id={headingId}>{title}</h2>', 'items.map', '{item.label}', '{item.value}', '{note}'))
    require('apps/web/src/components/PublicPerformanceExperience.tsx', ('ReadingPriorityPanel', 'headingId="performance-priority-heading"', 'Đẹp vừa đủ.', 'Không gắn điểm số cho điều chưa đo.'))
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/index.ts', ('ReadingPriorityPanel', 'GuideChapterBody', 'GuideArticle'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for rel in ('packages/ui/src/guide-article.css', 'packages/ui/src/performance-layout.css'):
        css = require(rel)
        for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'{rel}: undefined token {token}')
    require('packages/ui/src/performance-layout.css', ('.lgo-release-layout .lgo-performance-priority-console h2', '.lgo-performance-priority-console li strong'))
    if 'Performance copy budget guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete exclusive performance-guide CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/performance-copy-budget-guide"', 'Bố cục cẩm nang đọc nhẹ'))
    require('tests/e2e/fe-performance-guide-article-v1245.spec.ts', ('contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)', 'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320', 'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot', 'shared priority panel', 'images).toEqual([])', 'request.abort()', 'steps.map(step => step.title)', 'toHaveCount(6)', 'Đối chiếu ranh giới trước hành động'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', 'route-continuity-conversion-guide'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE PERFORMANCE GUIDE ARTICLE v1.245 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
