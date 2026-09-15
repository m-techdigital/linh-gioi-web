#!/usr/bin/env python3
"""Ownership and source-preservation guard; browser navigation/visual evidence is separate."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing {rel}")
        return ""
    text = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    route = require("apps/web/src/app/guides/[slug]/page.tsx", (
        '@lgo-web/ui/guide-article.css', 'export const dynamicParams = false',
        'localContentRepository.list("guides")', 'localContentRepository.bySlug(slug)',
        'if (!entry || entry.category !== "guides") notFound();',
        'if (entry.slug === "world-gameplay-loop-guide")', '<PublicWorldLoopGuide entry={entry}/>'))
    if route.find('notFound();') > route.find('<PublicWorldLoopGuide entry={entry}/>'):
        ERRORS.append("guide source/category guard must run before specialization")
    require("packages/content/src/repository.ts", ('entry.status === "published"', 'entry.category === category'))
    view = require("apps/web/src/components/PublicWorldLoopGuide.tsx", (
        'guideDetailSteps.filter(step => step.slug === entry.slug)', 'title={entry.title}', 'lead={entry.summary}', '{entry.body}',
        'GuideArticle', 'world-loop-step-${step.step}', 'marker: step.step', 'title: step.title',
        '{step.action}', '{step.expectedResult}', '{step.blockedScope}',
        'Mục lục vòng lặp thế giới', 'NO_ACCEPTED_BACKEND_CONTRACT',
        '/download/trust', '/support/safety', '/game/loop', 'không phải combat trực tiếp',
        'fetchPriority="high"', 'Tranh minh họa'))
    article = require("packages/ui/src/guide-article.tsx", (
        'readonly GuideArticleSection[]', 'id={contentsId} tabIndex={-1}', '<details open>',
        '<nav aria-label={contentsLabel}>', 'href={`#${section.id}`}', 'id={section.id} tabIndex={-1}',
        'aria-labelledby={`${section.id}-heading`}', 'href={`#${previous.id}`}', 'href={`#${next.id}`}',
        'href={`#${contentsId}`}', '{section.body}'))
    restoration = require("packages/ui/src/article-fragment-restoration.tsx", (
        'targetIds.includes(targetId)', 'decodeURIComponent(window.location.hash.slice(1))',
        'target.scrollIntoView', 'target.focus({ preventScroll: true })'))
    for marker in ('addEventListener', 'setInterval(', 'setTimeout(', 'requestAnimationFrame', 'localStorage', 'fetch(', 'preventDefault('):
        if marker in restoration: ERRORS.append(f"fragment restoration exceeds mount-only scope: {marker}")
    for name, text in (("article", article), ("view", view)):
        for marker in ('"use client"', 'fetch(', 'localStorage', 'sessionStorage', 'WebSocket', 'setInterval(', 'requestAnimationFrame', '<canvas', '<form', 'preventDefault(', 'onKeyDown=', 'dangerouslySetInnerHTML'):
            if marker in text: ERRORS.append(f"{name}: unnecessary client/game/input mechanism {marker}")
    css = require("packages/ui/src/guide-article.css", (
        '.lgo-guide-article-layout', 'position:sticky', '.lgo-guide-article-section:target', 'scroll-margin-top:8rem',
        ':focus-visible', 'forced-colors:active', 'font-size:.75rem', 'min-height:44px', '@media(max-width:900px)'))
    if 'line-clamp' in css: ERRORS.append("authored article text must not be truncated")
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined token {token}")
    package = json.loads(require("packages/ui/package.json"))
    if package['exports'].get('./guide-article.css') != './src/guide-article.css': ERRORS.append("shared article stylesheet not exported")
    require("packages/ui/src/index.ts", ('GuideArticle', './guide-article'))
    service = require("packages/ui/src/service-layout.css")
    if 'World gameplay loop guide composes compact guide-flow base' in service: ERRORS.append("obsolete exclusive guide CSS retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/guides/world-gameplay-loop-guide"', 'Bố cục cẩm nang và hành trình đọc'))
    require("tests/e2e/fe-world-loop-guide-article-v1233.spec.ts", (
        "guideDetailSteps", "step.action, step.expectedResult, step.blockedScope", "toBeFocused()", "page.goBack()", "page.goForward()", "about:blank", "A direct chapter URL must actually scroll",
        "toBe(404)", "chapter navigation remains legible", "toBeGreaterThanOrEqual(12)", "screenshot", "violations).toEqual([])",
        "published guide URLs remain available"))
    require("docs/execution/WEB-NON-CLAIMS.md", ('No production auth', 'No DB persistence', 'No combat damage', 'No live world server claim'))
    print("WEB FE WORLD LOOP GUIDE ARTICLE v1.233 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
