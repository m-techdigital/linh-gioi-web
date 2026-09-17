#!/usr/bin/env python3
"""Source ownership and native-route guard. Browser evidence is verified separately."""
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

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"route-continuity-conversion-guide": PublicRouteContinuityGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicRouteContinuityGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="continuity-guide-contents"', 'Mục lục đi tiếp đúng luồng đọc',
        'continuity-guide-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup: group', 'ReadingPriorityPanel', 'items={readingRoutes}',
        'Các liên kết chỉ mở trang hướng dẫn, không cấp quyền chơi', 'không phải tiến trình tài khoản', 'NO_ACCEPTED_BACKEND_CONTRACT',
        'href: "/start"', 'href: "/journey"', 'href: "/game/loop"', 'href: "/download/trust"', 'href: "/status"', 'href: "/support/safety"'))
    for token in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<form', '<input', '<textarea', '<iframe', '<img', '<canvas', 'download=', 'setInterval(', 'Date.now(', 'role="progressbar"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if token in view: ERRORS.append(f'unrequested intake/progress/media behavior: {token}')
    panel = require('packages/ui/src/reading-priority-panel.tsx', (
        'export function ReadingPriorityPanel', 'aria-labelledby={headingId}', '<h2 id={headingId}>{title}</h2>',
        'href?: string', 'items.map', '<a href={item.href}>', '{item.label}', '{item.value}', '{note}'))
    if ': <><span>{item.label}</span><strong>{item.value}</strong></>' not in panel: ERRORS.append('unlinked priority panel default must be preserved')
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/index.ts', ('ReadingPriorityPanel', 'GuideChapterBody', 'GuideArticle'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    css = require('packages/ui/src/performance-layout.css', ('.lgo-performance-priority-console li > a', 'min-height:48px', '.lgo-performance-priority-console li > a:focus-visible', 'forced-colors:active'))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined canonical token {token}')
    if 'Route continuity conversion guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete exclusive guide CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/route-continuity-conversion-guide"', 'Bố cục cẩm nang luồng đọc'))
    require('tests/e2e/fe-route-continuity-guide-article-v1246.spec.ts', (
        'contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)',
        'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot',
        'toHaveCount(6)', 'toHaveCount(5)', 'five linked waypoints', "toHaveAttribute('href',routes[i]!)", "toHaveURL(origin+routes[i])", 'Đối chiếu tải game và trạng thái'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', 'player-trust-release-guide'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE ROUTE CONTINUITY GUIDE ARTICLE v1.246 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
