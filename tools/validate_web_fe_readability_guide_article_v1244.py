#!/usr/bin/env python3
"""Source/owner guard for readability guide navigation; not accessibility certification."""
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
        'if (entry.slug === "accessibility-readability-guide")', '<PublicReadabilityGuide entry={entry}/>'))
    if route.find('notFound();') > route.find('<PublicReadabilityGuide entry={entry}/>'): ERRORS.append('category guard must precede specialization')
    view = require('apps/web/src/components/PublicReadabilityGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="readability-guide-contents"', 'Mục lục cách đọc web',
        'readability-guide-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup:', 'boundaryChoices', '/accessibility', '/start', '/status', '/download/trust', '/support/safety', 'href: "#readability-guide-contents"',
        'Hướng dẫn cách đọc, không phải chứng nhận khả năng truy cập', 'không tạo thiết lập tài khoản',
        'NO_ACCEPTED_BACKEND_CONTRACT', 'Tranh minh họa', 'fetchPriority="high"'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', 'download=', 'setInterval(', 'Date.now(', 'role="timer"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested membership/schedule/service behavior: {marker}')
    require('packages/ui/src/guide-article.tsx', (
        'export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', '{action.label}',
        'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', 'href={`#${previous.id}`}', 'href={`#${next.id}`}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/guide-article.tsx', ('actionGroup?.links.length', 'aria-label={actionGroup.label}', 'actionGroup.links.map', 'href={link.href}', '{link.label}'))
    require('packages/ui/src/index.ts', ('GuideChapterBody', 'GuideArticle'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    css = require('packages/ui/src/guide-article.css', ('.lgo-release-layout .lgo-guide-article-hero', '.lgo-guide-article-layout', 'position:sticky', 'scroll-margin-top:8rem', 'min-height:44px', 'background:var(--lgo-color-art-ink)', 'forced-colors:active', ':focus-visible'))
    require('packages/ui/src/guide-article.css', ('.lgo-guide-chapter-actions', 'flex-wrap:wrap', '.lgo-guide-chapter-actions > .lgo-link-button.lgo-tone-neutral,', 'width:100%'))
    if 'line-clamp' in css: ERRORS.append('authored text is truncated')
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined token {token}')
    if 'Accessibility readability guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('old exclusive readability CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/accessibility-readability-guide"', 'Bố cục cẩm nang cách đọc'))
    require('tests/e2e/fe-readability-guide-article-v1244.spec.ts', (
        'contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)',
        'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot',
        'Chưa có audit pháp lý, chứng nhận WCAG', 'a[download]', 'toHaveCount(6)', 'Đọc ranh giới trước kỳ vọng', 'Bỏ qua menu tới nội dung chính', 'main-content', 'returnLink', 'new URL(routes[i]!'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)'))
    require('apps/web/src/components/PublicSiteShell.tsx', ('className="lgo-skip-link" href="#main-content"', '<main id="main-content" className="lgo-main" tabIndex={-1}'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE READABILITY GUIDE ARTICLE v1.244 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
