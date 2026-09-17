#!/usr/bin/env python3
"""Source and shared-owner guard for a published training-loop guide; not gameplay evidence."""
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

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"beginner-training-loop-guide": PublicTrainingLoopGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicTrainingLoopGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="training-loop-contents"', 'Mục lục luyện tập',
        'training-loop-step-${step.step}', 'marker: step.step', 'title: step.title', '{step.action}', '{step.expectedResult}', '{step.blockedScope}',
        'GuideChapterBody', 'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}', 'readingDestinations[step.step]', '/game', '/game/loop', '/download/trust',
        'Đang đọc hướng dẫn, không phải đang luyện trong game', 'NO_ACCEPTED_BACKEND_CONTRACT', 'Tranh minh họa', 'fetchPriority="high"'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'new game/client/input surrogate: {marker}')
    require('packages/ui/src/guide-article.tsx', (
        'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', 'href={`#${previous.id}`}', 'href={`#${next.id}`}',
        '<ArticleFragmentRestoration', '{section.body}'))
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', '{action.label}'))
    require('packages/ui/src/index.ts', ('GuideChapterBody',))
    require('packages/ui/src/article-fragment-restoration.tsx' , ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    css = require('packages/ui/src/guide-article.css', (
        '.lgo-release-layout .lgo-guide-article-hero', '.lgo-release-layout .lgo-article-section-copy p',
        '.lgo-guide-article-layout', 'position:sticky', 'scroll-margin-top:8rem', 'min-height:44px',
        'background:var(--lgo-color-art-ink)', 'forced-colors:active', ':focus-visible'))
    for marker in (':is(.lgo-world-loop-guide', '.lgo-training-loop-guide', 'line-clamp'):
        if marker in css: ERRORS.append(f'route-enumerated or truncating shared article CSS: {marker}')
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined token {token}')
    if 'Beginner training loop guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('old exclusive training layout retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/beginner-training-loop-guide"', 'Bố cục cẩm nang luyện tập'))
    require('tests/e2e/fe-training-loop-guide-article-v1237.spec.ts', (
        'contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)',
        'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', (
        "if (slug === 'beginner-training-loop-guide')", 'published guide URLs remain available', 'toBe(404)',
        "page.locator('.lgo-guide-detail-steps')).toBeVisible()", "page.locator('.lgo-gate-entry-guide')).toHaveCount(0)"))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No combat damage'))
    print('WEB FE TRAINING LOOP GUIDE ARTICLE v1.237 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
