#!/usr/bin/env python3
"""Source/ownership guard for FAQ guidance; runtime evidence is independently required."""
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
        'if (entry.slug === "faq-search-helpfulness-guide")', '<PublicFaqGuide entry={entry}/>'))
    if route.find('notFound();') > route.find('<PublicFaqGuide entry={entry}/>'): ERRORS.append('published/category guard must precede article')
    view = require('apps/web/src/components/PublicFaqGuide.tsx', (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'contentsId="faq-guide-contents"', 'Mục lục tìm FAQ hữu ích',
        'faq-guide-step-${step.step}', 'marker: step.step', 'title: step.title', 'GuideChapterBody',
        'instruction={step.action}', 'outcome={step.expectedResult}', 'boundary={step.blockedScope}',
        'readingDestinations[step.step]', 'actionGroup: group', 'supportChoices', 'feedbackChoices',
        '/support/help#faq-answers', '/support/help#help-boundary', '/support', '/support/safety', '/download/trust', '/status', '/release/tester-pack', '/release/tester-pack#tester-feedback',
        'Đọc tiếp theo đúng vấn đề', 'Chuẩn bị phản hồi không chứa dữ liệu riêng tư',
        'ReadingPriorityPanel', 'items={steps.map(step => ({ label: step.step, value: step.title, href: `#faq-guide-step-${step.step}` }))}',
        'Cẩm nang không phải tìm kiếm trực tuyến hoặc kênh nhận phản hồi', 'không phải kết quả tìm kiếm', 'NO_ACCEPTED_BACKEND_CONTRACT'))
    for marker in ('"use client"', 'useState(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', '<canvas', '<form', '<input', '<img', '<video', '<picture', '<QuestionDirectory', 'download=', 'setInterval(', 'Date.now(', 'role="progressbar"', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f'unrequested service/media/duplicated directory behavior: {marker}')
    require('packages/ui/src/guide-article.tsx', ('export function GuideChapterBody', '{instruction}', '{outcome}', '{boundary}', 'href={link.href}', 'id={contentsId} tabIndex={-1}', 'id={section.id} tabIndex={-1}', '<ArticleFragmentRestoration'))
    require('packages/ui/src/reading-priority-panel.tsx', ('export function ReadingPriorityPanel', 'href={item.href}'))
    require('packages/ui/src/article-fragment-restoration.tsx', ('targetIds.includes(targetId)', 'target.focus({ preventScroll: true })'))
    require('apps/web/src/components/PublicSupportHelpExperience.tsx', (
        '<aside id="help-boundary" tabIndex={-1}', '<ArticleFragmentRestoration targetIds={["help-boundary"]}/>',
        '<QuestionDirectory groups={groups} anchorId="faq-answers"/>', 'Không có hệ thống ticket thật', 'không có tìm kiếm backend'))
    require('packages/ui/src/question-directory.tsx', ('window.history.pushState(window.history.state', 'aria-pressed={selected === group.id}', 'role="status"', 'tabIndex={-1}'))
    require('packages/ui/src/release-layout.css', ('.lgo-release-layout .lgo-release-paper-panel[tabindex="-1"]:focus-visible',))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for rel in ('packages/ui/src/guide-article.css', 'packages/ui/src/performance-layout.css'):
        for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', require(rel))) - tokens): ERRORS.append(f'{rel}: undefined token {token}')
    if 'FAQ search helpfulness guide composes compact guide-flow base' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete exclusive compact FAQ guide CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/faq-search-helpfulness-guide"', 'Cẩm nang FAQ hữu ích'))
    require('tests/e2e/fe-faq-guide-article-v1250.spec.ts', ('contentEntries', 'guideDetailSteps', 'step.expectedResult', 'step.blockedScope', 'toHaveCount(4)', 'about:blank', '%E0%A4%A', 'page.goBack()', 'page.goForward()', 'toBeFocused()', 'width: 320', 'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'requests).toEqual([])', 'violations).toEqual([])', 'screenshot', 'toHaveCount(9)', 'toHaveCount(5)', 'không phải kết quả tìm kiếm', '1/6', 'faq-category-answer.png', 'help-boundary', 'tester-feedback'))
    require('tests/e2e/fe-faq-boundary-destination-v1250.spec.ts', ('#help-boundary', '#faq-answers', 'toBeFocused()', 'outlineStyle', 'b.y>=h.y+h.height', 'scrollY', 'not-a-question', '%E0%A4%A'))
    require('tests/e2e/fe-world-loop-guide-article-v1233.spec.ts', ('published guide URLs remain available', 'toBe(404)', "slug === 'faq-search-helpfulness-guide'"))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE FAQ GUIDE ARTICLE v1.250 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
