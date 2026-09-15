#!/usr/bin/env python3
"""Ownership/source guard for beginner reading; not proof of a released game."""
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
    route = require("apps/web/src/app/guides/beginner/page.tsx", (
        '@lgo-web/ui/release-layout.css', '@lgo-web/ui/guide-article.css', '<PublicBeginnerGuide/>'))
    for marker in ('lgo-service-compact-proof-page', '<BeginnerGuideSection', '<form', 'design-boards'):
        if marker in route: ERRORS.append(f"obsolete or unsafe page composition {marker}")
    view = require("apps/web/src/components/PublicBeginnerGuide.tsx", (
        'beginnerGuideSections.map', 'GuideArticle', 'contentsId="beginner-contents"', 'Mục lục nhập môn',
        'beginner-step-${step.step}', 'marker:step.step', 'title:step.title', '{step.action}', '{step.playerTip}', '{step.blockedScope}',
        'href={destination.href}', 'destinations[step.step]', 'title="Hướng dẫn người chơi mới"',
        'Không phải nhiệm vụ trong game', 'không tạo tài khoản', 'NO_ACCEPTED_BACKEND_CONTRACT',
        '/download', '/game', '/roadmap', '/support', 'Tranh minh họa', 'fetchPriority="high"'))
    for marker in ('"use client"', 'fetch(', 'WebSocket', 'localStorage', 'sessionStorage', '<canvas', '<form', '<input', 'preventDefault(', 'dangerouslySetInnerHTML'):
        if marker in view: ERRORS.append(f"unnecessary client/game mechanism {marker}")
    require("packages/ui/src/guide-article.tsx", (
        'id={contentsId} tabIndex={-1}', '<details open>', 'href={`#${section.id}`}', '{section.body}',
        'href={`#${previous.id}`}', 'href={`#${next.id}`}', '<ArticleFragmentRestoration'))
    require("packages/ui/src/article-fragment-restoration.tsx", (
        'targetIds.includes(targetId)', 'decodeURIComponent(window.location.hash.slice(1))', 'target.focus({ preventScroll: true })'))
    css = require("packages/ui/src/guide-article.css", (
        '.lgo-release-layout .lgo-guide-article-hero', '.lgo-guide-article-layout', 'position:sticky',
        '.lgo-guide-article-section .lgo-article-section-copy > .lgo-link-button.lgo-tone-neutral',
        '.lgo-link-button.lgo-tone-neutral { background:var(--lgo-color-art-ink)', 'box-shadow:none', ':focus-visible', 'forced-colors:active', 'min-height:44px'))
    if 'line-clamp' in css: ERRORS.append('authored article text is truncated')
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined canonical token {token}')
    if json.loads(require('packages/ui/package.json'))['exports'].get('./guide-article.css') != './src/guide-article.css': ERRORS.append('missing shared stylesheet export')
    if 'Shared compact beginner guide page layout.' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete beginner-only CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/guides/beginner"', 'Bố cục cẩm nang nhập môn'))
    for path in ('apps/web/public/design-reference/design-atlas-public-core-v195.png', 'apps/web/public/game-art/world/dong-mon-skyline.webp'):
        if not (ROOT / path).is_file(): ERRORS.append(f'missing registered visual source {path}')
    require('tests/e2e/fe-beginner-guide-reading-v1235.spec.ts', (
        'beginnerGuideSections', 'step.action', 'step.playerTip', 'step.blockedScope', 'about:blank', 'page.goBack()',
        'toBeFocused()', 'toBeGreaterThanOrEqual(44)', 'width:320', 'solid ink', 'requests).toEqual([])', '%E0%A4%A',
        'screenshot', 'violations).toEqual([])'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No combat damage'))
    print('WEB FE BEGINNER GUIDE READING v1.235 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
