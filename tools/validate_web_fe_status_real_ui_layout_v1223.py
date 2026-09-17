#!/usr/bin/env python3
"""Public content visibility, not a live health contract or monitoring integration."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file(): ERRORS.append(f"missing {rel}"); return ""
    text = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/status/page.tsx", ('@lgo-web/ui/status-landing-layout.css', 'lgo-status-landing', 'lgo-status-experience'))
    parts = ('<PublicStatusHero />', '<PublicStatusSurfaces />', '<PublicStatusTrustAndMaintenance />', '<PublicStatusNextSteps />')
    offsets = [page.find(part) for part in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("status page must start with hero and real surface catalog")
    for marker in ('lgo-service-compact-proof-page', 'status-maintenance-signal-board.svg', '<form'):
        if marker in page: ERRORS.append(f"obsolete or unsafe page composition: {marker}")
    experience = require("apps/web/src/components/PublicStatusExperience.tsx", (
        'statusTrustSurfaces.map', 'statusExplainers.map', 'localContentRepository.list("maintenance")',
        'visibility:item.visibility', 'VisibilitySignal', 'VisibilityCatalog', 'fetchPriority="high"',
        'NO_ACCEPTED_BACKEND_CONTRACT', 'Không có dữ liệu giám sát trực tiếp',
        'Không phải lịch bảo trì hoặc sự cố đang diễn ra', 'Fixture local', 'không phải uptime',
        '/release/readiness', '/support/safety', 'headingId="status-surfaces-heading"'))
    catalog = require("packages/ui/src/visibility-catalog.tsx", ('"use client"', 'PresentationVisibility', 'items.filter', 'FilterChoices', 'controlsId', 'role="status"', '<details', '<summary', 'visibilityLabels[item.visibility]'))
    choices = require("packages/ui/src/filter-choices.tsx", ('aria-pressed', 'aria-controls', 'role="group"', 'onChange(option.value)'))
    for marker in ('fetch(', 'XMLHttpRequest', 'WebSocket', 'setInterval(', 'Date.now(', 'localStorage', 'sessionStorage', '<form', 'data-live="true"'):
        if marker in experience or marker in catalog or marker in choices: ERRORS.append(f"forbidden monitoring/mutation surrogate: {marker}")
    require("packages/ui/src/release.tsx", ('export function VisibilitySignal', 'aria-hidden="true"'))
    require("packages/ui/src/index.ts", ('VisibilityCatalog', 'VisibilitySignal'))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./visibility-layout.css") != "./src/visibility-layout.css": ERRORS.append("missing shared visibility stylesheet export")
    if exports.get("./status-landing-layout.css") != "./src/status-landing-layout.css": ERRORS.append("missing status landing stylesheet export")
    css = require("packages/ui/src/visibility-layout.css", ('var(--lgo-color-jade-teal)', ':focus-visible', 'min-height:44px', '-webkit-line-clamp:none', 'prefers-reduced-motion', '.lgo-release-layout .lgo-visibility-console-heading h2'))
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require("packages/design-tokens/src/tokens.css")))
    for rel in ('packages/ui/src/release-layout.css', 'packages/ui/src/reading-tools.css', 'packages/ui/src/visibility-layout.css', 'packages/ui/src/status-landing-layout.css'):
        refs = set(re.findall(r'var\((--lgo-[\w-]+)', require(rel)))
        for token in sorted(refs - tokens): ERRORS.append(f"{rel}: undefined canonical token {token}")
    service = require("packages/ui/src/service-layout.css")
    if 'Status page composes the shared compact proof/disclosure layout' in service: ERRORS.append("old status layout block retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('status-detailed-design-target-v1130.png', 'pathname === "/status"'))
    for rel in ('apps/web/public/design-reference/status-detailed-design-target-v1130.png', 'apps/web/public/game-art/world/dong-mon-skyline.webp'):
        if not (ROOT/rel).is_file(): ERRORS.append(f"missing visual source {rel}")
    require("tests/e2e/fe-status-real-ui-layout-v1223.spec.ts", ('screenshot', 'metrics.overflow', 'metrics.surfaces.top', 'toHaveCount(4)', 'toHaveCount(2)', 'toHaveCount(1)', 'keyboard.press("Enter")', 'result.violations', 'style.signal', 'style.jade', 'style.h2'))
    require("docs/execution/WEB-NON-CLAIMS.md", ('No production auth', 'No DB persistence', 'No independent backend'))
    print("WEB FE STATUS REAL UI LAYOUT v1.223 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
