#!/usr/bin/env python3
"""Guard source/ownership/non-claims for player-trust guidance; not runtime evidence."""
from pathlib import Path
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

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"player-trust-release-guide": PublicPlayerTrustGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicPlayerTrustGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="player-trust-contents"', 'Mục lục tin cậy trước bản test',
        'player-trust-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup: group', '/release/tester-pack#tester-checklist',
        '/release/readiness', '/release', '/download/trust', '/status', '/support/safety',
        'Đọc trạng thái và chuẩn bị phản hồi', 'Đọc checklist và điều kiện thử nghiệm',
        'fetchPriority="high"', '/game-art/world/dong-mon-skyline.webp',
        'Đọc hướng dẫn không cấp suất test hoặc quyền tải', 'Tranh minh họa · Không phải bản test', 'NO_ACCEPTED_BACKEND_CONTRACT'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', '<textarea', '<video', '<iframe', 'download=', 'setInterval(', 'Date.now(', 'role="timer"', 'role="progressbar"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested intake/state/telemetry behavior: {marker}')
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    require('packages/ui/src/guide-article.css', ('.lgo-article-cover', '.lgo-guide-chapter-actions', '.lgo-article-contents', '.lgo-guide-article-section:focus-visible'))
    if 'Player trust release guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete exclusive player-trust guide CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/player-trust-release-guide"', 'Bố cục cẩm nang trước bản test'))
    for rel in ('docs/design/reference/WEB-FE-DESIGN-ATLAS-PUBLIC-CORE-v1.95.png','apps/web/public/game-art/world/dong-mon-skyline.webp'):
        if not (ROOT/rel).is_file(): ERRORS.append(f'missing accepted comparison/illustration: {rel}')
    require('apps/web/src/components/PublicTesterPackExperience.tsx', ('id="tester-checklist" tabIndex={-1}', 'LocalChecklist', '<ArticleFragmentRestoration targetIds={["tester-checklist"]} />'))
    require('packages/ui/src/index.ts', ('export { ArticleFragmentRestoration }',))
    require('packages/ui/src/release-layout.css', ('.lgo-release-reading-panel[tabindex="-1"]:focus-visible', 'html:has(.lgo-release-layout .lgo-release-reading-panel[tabindex="-1"]) { scroll-behavior:auto; }'))
    require('tests/e2e/fe-tester-checklist-destination-v1247.spec.ts', ('expectChecklistArrival', 'box.y >= header.y + header.height', 'box.y <= 400', 'toBeFocused()', 'page.keyboard.press', 'scrollY', 'about:blank', 'page.reload', '#unlisted-section', '#%E0%A4%A'))
    require('tests/e2e/fe-player-trust-guide-article-v1247.spec.ts', ('contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)', 'toHaveCount(6)', 'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320', 'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot', 'test-preparation groups', 'losing it cannot hide', 'request.abort()', 'input:checked', '/release/tester-pack#tester-checklist'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', 'release-readiness-hub-guide'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE PLAYER TRUST GUIDE ARTICLE v1.247 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
