#!/usr/bin/env python3
"""Source/ownership guard for tester preparation. Browser evidence is a separate gate."""
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

    require('apps/web/src/components/PublicEditorialRendererRegistry.tsx', ('"closed-tester-information-pack-guide": PublicClosedTesterGuide',))
    if route.find('if (!entry || entry.category !== "guides") notFound();') > route.find('renderGuideArticle(entry)'): ERRORS.append('guide category guard must precede registry delegation')
    view = require('apps/web/src/components/PublicClosedTesterGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="tester-guide-contents"', 'Mục lục chuẩn bị thông tin tester',
        'id: `tester-guide-step-${step.step}`', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}', 'const actionGroup = chapterChoices[step.step]', '...(actionGroup ? { actionGroup } : {})',
        '/release/tester-pack#tester-checklist', '/release/tester-pack#tester-device', '/release/tester-pack#tester-feedback', '/release/tester-pack#tester-limits',
        '/release/readiness', '/download/trust', '/status', '/support/safety', 'Đối chiếu điều kiện trước khi gửi phản hồi',
        'Hướng dẫn chuẩn bị, không phải form đăng ký', 'Không phải lời mời thử nghiệm', 'NO_ACCEPTED_BACKEND_CONTRACT',
        'Tranh minh họa', 'fetchPriority="high"'))
    if view.count('className: "lgo-tester-guide-action"') != 9: ERRORS.append('all nine contextual reading destinations must remain')
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', '<textarea', '<video', 'download=', 'setInterval(', 'Date.now(', 'role="progressbar"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested registration/intake/game surrogate: {marker}')
    tester = require('apps/web/src/components/PublicTesterPackExperience.tsx', ('ArticleFragmentRestoration', 'LocalChecklist', 'TemplateTabs'))
    for target in ('tester-checklist', 'tester-device', 'tester-feedback', 'tester-limits'):
        for marker in (f'id="{target}" tabIndex={{-1}}', f'<ArticleFragmentRestoration targetIds={{["{target}"]}} />'):
            if marker not in tester: ERRORS.append(f'missing explicit focus/restore target: {marker}')
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })', 'decodeURIComponent', 'catch'))
    require('packages/ui/src/release-layout.css', (
        '.lgo-tester-limitations[tabindex="-1"]:focus-visible', '.lgo-release-reading-panel[tabindex="-1"]:focus-visible',
        'html:has(.lgo-release-layout .lgo-release-reading-panel[tabindex="-1"]) { scroll-behavior:auto; }'))
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}'))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for rel in ('packages/ui/src/guide-article.css', 'packages/ui/src/release-layout.css'):
        for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', require(rel))) - tokens): ERRORS.append(f'{rel}: undefined token {token}')
    if 'Closed tester information pack guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete exclusive compact CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/closed-tester-information-pack-guide"', 'Cẩm nang chuẩn bị tester'))
    require('tests/e2e/fe-tester-guide-article-v1249.spec.ts', ('contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)', 'toHaveCount(9)', 'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320', 'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot', 'four tester destinations', 'innerHeight-50', 'request.abort()'))
    require('tests/e2e/fe-tester-section-destinations-v1249.spec.ts', ('tester-device', 'tester-feedback', 'tester-limits', 'cold ${id}', 'toBeFocused()', 'innerHeight-50', 'changes).toEqual([])', 'page.reload', '#missing-tester-section', '#%E0%A4%A', "getByRole('tab'", "toHaveAttribute('open'", 'screenshot'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', 'faq-search-helpfulness-guide'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE TESTER GUIDE ARTICLE v1.249 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
