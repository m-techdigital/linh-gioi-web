#!/usr/bin/env python3
"""Ownership and non-submission guard for local tester preparation tools."""
from pathlib import Path
import json

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
    page = require("apps/web/src/app/release/tester-pack/page.tsx", ('@lgo-web/ui/release-layout.css', '@lgo-web/ui/reading-tools.css', 'lgo-tester-experience'))
    parts = ('<TesterPackHero />', '<TesterPackShortcuts />', '<TesterPackFeedback />', '<TesterPackPreparation />', '<TesterPackLimitations />')
    offsets = [page.find(part) for part in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("tester primary composition order is incomplete")
    for marker in ('<form', 'lgo-service-compact-proof-page', 'closed-tester-production-board.svg'):
        if marker in page: ERRORS.append(f"obsolete or unsafe tester composition: {marker}")
    experience = require("apps/web/src/components/PublicTesterPackExperience.tsx", (
        'ExperienceHero', 'FieldManual', 'LocalChecklist', 'TemplateTabs', 'closedTesterChecklist.map',
        'safeFeedbackTemplates.map', 'deviceReportTemplateFields.map', 'knownLimitationNotes.map',
        'NO_ACCEPTED_BACKEND_CONTRACT', 'Chưa mở intake', 'Không hứa slot', 'không có backend tiếp nhận',
        '/release/readiness', 'id="tester-feedback"', 'id="tester-checklist"', 'id="tester-device"', 'id="tester-limits"',
        'fetchPriority="high"', 'Minh họa thế giới'))
    tools = require("packages/ui/src/reading-tools.tsx", (
        '"use client"', 'CheckboxField', 'role="tablist"', 'role="tabpanel"', 'aria-selected', 'tabIndex',
        'ArrowRight', 'ArrowLeft', 'Home', 'End', 'navigator.clipboard.writeText', 'request === operation.current',
        'Chưa sao chép được', 'Đã sao chép mẫu', 'new Set()', 'role="status"'))
    for marker in ('localStorage', 'sessionStorage', 'fetch(', 'XMLHttpRequest', 'sendBeacon', '<form', 'type="email"', 'type="password"'):
        if marker in tools or marker in experience: ERRORS.append(f"forbidden persistence/intake surface: {marker}")
    require("packages/ui/src/reading-tools.css", (':focus-visible', 'min-height:44px', 'white-space:pre-wrap', 'prefers-reduced-motion'))
    require("packages/ui/src/release-layout.css", ('.lgo-field-manual', '.lgo-release-paper-panel', '.lgo-release-shortcuts', '.lgo-release-limits-grid'))
    require("packages/ui/src/release.tsx", ('export function FieldManual', 'aria-hidden="true"'))
    require("packages/ui/src/index.ts", ('from "./reading-tools"', 'FieldManual'))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./reading-tools.css") != "./src/reading-tools.css": ERRORS.append("missing reusable reading-tools CSS export")
    service = require("packages/ui/src/service-layout.css")
    if 'Tester pack composes the shared compact proof/disclosure layout' in service: ERRORS.append("removed tester layout remains in the old owner")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('tester-pack-detailed-design-target-v1129.png', 'pathname === "/release/tester-pack"'))
    if not (ROOT/'apps/web/public/design-reference/tester-pack-detailed-design-target-v1129.png').is_file(): ERRORS.append("missing registered design target")
    require("tests/e2e/fe-tester-pack-real-ui-layout-v1222.spec.ts", (
        'screenshot', 'overflow', 'checkbox', '0/4', '2/4', 'ArrowRight', 'keyboard.press("End")',
        'Permission denied', 'without touching the Mac clipboard', 'result.violations'))
    require("docs/execution/WEB-NON-CLAIMS.md", ('No production auth', 'No DB persistence', 'No independent backend'))
    print("WEB FE TESTER PACK REAL UI LAYOUT v1.222 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
