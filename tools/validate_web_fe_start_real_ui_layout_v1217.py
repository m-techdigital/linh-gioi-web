#!/usr/bin/env python3
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
    return text
def forbid_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker in text: fail(f"{rel}: forbidden stale marker {marker}")
def check_runtime_gate() -> None:
    require_text("docs/execution/WEB-ACTIVE-GOAL.md", ["Runtime Layout Gate", "bằng chứng chính phải là trang thật trong browser", "Không được dùng validator/docs như tiến độ chính"])
    require_text("AGENTS.md", ["Runtime Layout Gate", "screenshot desktop/mobile mới", "phải tiếp tục sửa layout thật tại shared Base owner trước"])
def check_page_source() -> None:
    page = require_text("apps/web/src/app/start/page.tsx", ["lgo-startpage-stack", "lgo-start-hero", "lgo-start-design-board", "lgo-start-real-screenshot-panel", "<ClassPathGrid compact", "<WorldRouteJourney", "Bắt đầu", "Bảng tuyến hướng dẫn bắt đầu"])
    order = ["lgo-start-hero", "lgo-start-design-board", "lgo-start-real-screenshot-panel", "<ClassPathGrid compact", "<WorldRouteJourney"]
    positions = [page.find(marker) for marker in order]
    if any(pos < 0 for pos in positions) or positions != sorted(positions):
        fail("apps/web/src/app/start/page.tsx: start page order must stay hero -> design board -> real screenshots -> compact class grid -> route journey")
    css = require_text("packages/ui/src/service-layout.css", [
        "v1.217 shared start overview layout", ".lgo-startpage-stack", ".lgo-start-hero", ".lgo-start-design-board", ".lgo-start-real-screenshot-panel", ".lgo-class-path-grid-compact", ".lgo-world-route-section", "@media (max-width: 760px)", "repeat(2, minmax(0, 1fr))"
    ])
    if css.count("v1.217 shared start overview layout") != 1:
        fail("packages/ui/src/service-layout.css: expected one consolidated v1.217 start layout block")
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.90 public start real onboarding screenshot gallery", "WEB v1.124 start detailed design target density", "WEB v1.139 start Vietnamese design match"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.217 public design reference must not dominate real page layout", ".lgo-public-shell .lgo-design-target-reference", ".lgo-public-shell .lgo-brand-footer"])
def check_tests_docs() -> None:
    require_text("tests/e2e/fe-start-real-ui-layout-v1217.spec.ts", ["start real UI layout v1.217", "/tmp/start-desktop-v1217.png", "/tmp/start-mobile-v1217.png", "scrollHeight", "screenshotColumns", "classColumns", "mobile page height remains reviewable", "desktop page height remains reviewable"])
    for rel in [
        "docs/execution/specs/WEB-FE-START-REAL-UI-LAYOUT-v1.217.md",
        "docs/execution/LGO-WEB-FE-START-REAL-UI-LAYOUT-REPORT-v1.217.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-START-REAL-UI-LAYOUT-v1.217.md",
    ]:
        require_file(rel)
        require_text(rel, ["WEB-FE-START-REAL-UI-LAYOUT-v1.217", "WEB_CLOSED", "Real Browser UI/UX Layout First", "Base First", "/tmp/start-desktop-v1217.png", "/tmp/start-mobile-v1217.png", "No production auth", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-START-REAL-UI-LAYOUT-v1.217 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ['WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT', 'as the next single active page'])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-START-REAL-UI-LAYOUT-v1.217 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_runtime_gate(); check_page_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE START REAL UI LAYOUT v1.217 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE START REAL UI LAYOUT v1.217 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
