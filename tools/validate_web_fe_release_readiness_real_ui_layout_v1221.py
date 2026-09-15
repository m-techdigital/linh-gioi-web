#!/usr/bin/env python3
"""Source/ownership guard for the real readiness UI. Runtime evidence remains separate."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    p = ROOT / rel
    if not p.is_file():
        ERRORS.append(f"missing {rel}")
        return ""
    text = p.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text:
            ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/release/readiness/page.tsx", (
        '@lgo-web/ui/release-layout.css', 'lgo-release-layout', '<ReleaseReadinessHero />',
        '<OwnerReleaseGateBoard presentation="release" />', '<ReleaseReadinessPlayerNextSteps />'))
    order = [page.find(x) for x in ('<ReleaseReadinessHero />', '<OwnerReleaseGateBoard', '<ReleaseReadinessPlayerNextSteps />', '<details')]
    if -1 in order or order != sorted(order):
        ERRORS.append("readiness composition order must be hero -> owner gates -> player actions -> details")
    for marker in ('lgo-service-compact-proof-page', '<form', 'dangerouslySetInnerHTML', 'release-readiness-production-board.svg'):
        if marker in page: ERRORS.append(f"obsolete or unsafe primary composition: {marker}")
    experience = require("apps/web/src/components/PublicReleaseReadinessExperience.tsx", (
        'ExperienceHero', 'ownerReleaseGates.map', 'readinessState', 'NO_ACCEPTED_BACKEND_CONTRACT',
        'Chưa sẵn sàng', '/game-art/world/dong-mon-skyline.webp', 'Minh họa thế giới',
        'fetchPriority="high"', '/download/trust', '/status', '/support/safety', '/release/tester-pack'))
    for marker in ('role="progressbar"', 'aria-valuenow', 'setInterval(', '<form'):
        if marker in experience: ERRORS.append(f"unverified progress/intake: {marker}")
    require("packages/ui/src/release.tsx", ('export function ReleaseSeal', 'export function ReleaseGateCard', '<details', '<summary', 'aria-hidden="true"'))
    require("packages/ui/src/primitives.tsx", ('headingId?: string', '<h2 id={headingId}>'))
    require("packages/ui/src/index.ts", ('from "./release"', 'ReleaseGateCard'))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./release-layout.css") != "./src/release-layout.css": ERRORS.append("missing shared stylesheet export")
    css = require("packages/ui/src/release-layout.css", ('.lgo-release-layout', '.lgo-release-hero', '.lgo-release-owner-grid',
        '.lgo-release-next-routes', ':focus-visible', 'prefers-reduced-motion', 'max-width:480px', '-webkit-line-clamp:none', 'min-height:44px'))
    if '-webkit-line-clamp: 2' in css or 'font-size: .56rem' in css: ERRORS.append("do not clamp/shrink main readiness copy to satisfy density metrics")
    globals_css = require("apps/web/src/app/globals.css")
    if 'WEB v1.128 release readiness detailed design target density' in globals_css: ERRORS.append("stale readiness CSS owner retained")
    require("packages/design-tokens/src/tokens.css", ('--lgo-font-editorial', '--lgo-color-parchment', '--lgo-color-art-ink'))
    for asset in ('apps/web/public/design-reference/release-readiness-detailed-design-target-v1128.png',
                  'apps/web/public/game-art/world/dong-mon-skyline.webp'):
        if not (ROOT / asset).is_file(): ERRORS.append(f"missing visual source {asset}")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('release-readiness-detailed-design-target-v1128.png', 'pathname === "/release/readiness"'))
    require("tests/e2e/fe-release-readiness-real-ui-layout-v1221.spec.ts", ('toBeVisible', 'toBeFocused', 'owner.top', 'overflow', 'screenshot', 'result.violations', 'keyboard.press("Tab")'))
    require("docs/execution/WEB-NON-CLAIMS.md", ('No production auth', 'No DB persistence', 'No independent backend'))
    print("WEB FE RELEASE READINESS REAL UI LAYOUT v1.221 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
