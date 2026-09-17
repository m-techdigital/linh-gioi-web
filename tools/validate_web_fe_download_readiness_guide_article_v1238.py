#!/usr/bin/env python3
"""Source/owner guard for the download-readiness reading guide, not release certification."""
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

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"download-readiness-guide": PublicDownloadReadinessGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicDownloadReadinessGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="download-readiness-contents"', 'Mục lục điều kiện bản tải',
        'download-readiness-step-${step.step}', 'marker: step.step', 'title: step.title',
        'GuideChapterBody', 'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', '/download', '/download/trust', '/release', '/status',
        'Bài viết giải thích điều kiện, không cấp bản tải hoặc quyền chơi', 'NO_ACCEPTED_BACKEND_CONTRACT',
        'Không có checksum được tạo', 'Tranh minh họa', 'fetchPriority="high"'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', 'download=', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested intake/download/service behavior: {marker}')
    if re.search(r'\b[0-9a-fA-F]{64}\b', view): ERRORS.append('invented artifact checksum in reading view')
    require('packages/ui/src/guide-article.tsx', (
        'export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={action.href}', '{action.label}',
        'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', 'href={`#${previous.id}`}', 'href={`#${next.id}`}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/index.ts', ('GuideChapterBody', 'GuideArticle'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    css = require('packages/ui/src/guide-article.css', ('.lgo-release-layout .lgo-guide-article-hero', '.lgo-guide-article-layout', 'position:sticky', 'scroll-margin-top:8rem', 'min-height:44px', 'background:var(--lgo-color-art-ink)', 'forced-colors:active', ':focus-visible'))
    if 'line-clamp' in css: ERRORS.append('authored text is truncated')
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined token {token}')
    if 'Download readiness guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('old exclusive download-guide CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/download-readiness-guide"', 'Bố cục cẩm nang điều kiện bản tải'))
    require('tests/e2e/fe-download-readiness-guide-article-v1238.spec.ts', (
        'contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)',
        'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot', 'a[download]', '[a-f0-9]{64}'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE DOWNLOAD READINESS GUIDE ARTICLE v1.238 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
