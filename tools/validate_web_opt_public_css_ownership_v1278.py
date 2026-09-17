#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVICE_IMPORT = 'import "@lgo-web/ui/service-layout.css";'
LEGACY_ENTRIES = [
    "apps/web/src/app/accessibility/page.tsx",
    "apps/web/src/app/performance/page.tsx",
    "apps/web/src/app/roadmap/page.tsx",
    "apps/web/src/app/game/loop/page.tsx",
    "apps/web/src/app/community/page.tsx",
    "apps/web/src/app/community/onboarding/page.tsx",
    "apps/web/src/app/support/page.tsx",
    "apps/web/src/app/support/help/page.tsx",
    "apps/web/src/app/support/safety/page.tsx",
    "apps/web/src/app/guides/page.tsx",
    "apps/web/src/app/guides/beginner/page.tsx",
    "apps/web/src/app/guides/[slug]/page.tsx",
    "apps/web/src/app/news/page.tsx",
    "apps/web/src/app/news/[slug]/page.tsx",
    "apps/web/src/app/events/page.tsx",
    "apps/web/src/app/patch-notes/page.tsx",
]
MODERN_ENTRIES = [
    "apps/web/src/app/page.tsx", "apps/web/src/app/game/page.tsx",
    "apps/web/src/app/story/page.tsx", "apps/web/src/app/classes/page.tsx",
    "apps/web/src/app/journey/page.tsx", "apps/web/src/app/start/page.tsx",
    "apps/web/src/app/download/page.tsx", "apps/web/src/app/download/trust/page.tsx",
    "apps/web/src/app/release/page.tsx", "apps/web/src/app/release/readiness/page.tsx",
    "apps/web/src/app/release/tester-pack/page.tsx", "apps/web/src/app/status/page.tsx",
]
DEAD_GLOBAL_SELECTORS = [
    ".lgo-status-design-board", ".lgo-journey-design-board",
    ".lgo-start-design-board", ".lgo-closed-tester-design-board",
    ".lgo-release-narrative-design-board", ".lgo-release-readiness-design-board",
]
ERRORS: list[str] = []

def read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")

def fail(message: str) -> None:
    ERRORS.append(message)

def main() -> int:
    root_layout = read("apps/web/src/app/layout.tsx")
    if SERVICE_IMPORT in root_layout:
        fail("root layout still globally imports service-layout.css")
    for rel in LEGACY_ENTRIES:
        if SERVICE_IMPORT not in read(rel):
            fail(f"legacy route does not own service-layout.css: {rel}")
    for rel in MODERN_ENTRIES:
        if SERVICE_IMPORT in read(rel):
            fail(f"modern landing must not import legacy service-layout.css: {rel}")
    service = read("packages/ui/src/service-layout.css")
    if "/* Shared game overview page layout for public world atlas surfaces. */" in service:
        fail("service-layout.css still contains superseded modern landing sections")
    if len(service.encode("utf-8")) > 52_000:
        fail(f"service-layout.css exceeds active legacy budget: {len(service.encode('utf-8'))} bytes")
    globals_css = read("apps/web/src/app/globals.css")
    for selector in DEAD_GLOBAL_SELECTORS:
        if selector in globals_css:
            fail(f"globals.css retains superseded selector: {selector}")
    plan = read("docs/superpowers/plans/2026-09-17-web-opt-01-css-ownership-payload-reset.md")
    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    project_state = read("docs/execution/WEB-PROJECT-STATE.md")
    ledger = read("docs/execution/WEB-TASK-LEDGER.md")
    report = read("docs/execution/LGO-WEB-OPT-01-CSS-OWNERSHIP-PAYLOAD-RESET-REPORT-v1.278.md")
    if "196,418 B" not in plan or "245,523 B" not in plan:
        fail("v1.278 plan is missing accepted CSS baseline/budget")
    if not project_state.startswith("Current phase: WEB-OPT-01-PUBLIC-CSS-OWNERSHIP-PAYLOAD-RESET-v1.278 WEB_CLOSED"):
        fail("WEB-PROJECT-STATE does not close WEB-OPT-01 v1.278")
    if "WEB-OPT-02-INTERACTION-HIT-AREA-MOBILE-NAVIGATION-v1.279" not in next_action:
        fail("WEB-NEXT-ACTION does not advance to WEB-OPT-02 v1.279")
    if "| WEB-OPT-01-PUBLIC-CSS-OWNERSHIP-PAYLOAD-RESET-v1.278 | WEB-OPT | WEB_CLOSED |" not in ledger:
        fail("WEB-TASK-LEDGER does not record WEB-OPT-01 v1.278 closure")
    if "29.95%" not in report or "89c391b5a240544ab6c8bac0eb3b9bdef91c84f5" not in report:
        fail("v1.278 report is missing final payload/source evidence")
    current_state_validator = read("tools/validate_web_current_state.py")
    if '"validate_web_opt_public_css_ownership_v1278.py"' not in current_state_validator:
        fail("v1.278 validator is not registered in WEB CURRENT STATE authority")
    if ERRORS:
        print("WEB OPT PUBLIC CSS OWNERSHIP v1.278 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB OPT PUBLIC CSS OWNERSHIP v1.278 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
