#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text

def forbid_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker in text:
            fail(f"{rel}: forbidden stale marker {marker}")

def require_order(rel: str, markers: list[str]) -> None:
    text = read(rel)
    pos = -1
    for marker in markers:
        next_pos = text.find(marker, pos + 1)
        if next_pos == -1:
            fail(f"{rel}: missing ordered marker {marker}")
            return
        pos = next_pos

def check_runtime_gate() -> None:
    for rel in ["AGENTS.md", "docs/execution/WEB-ACTIVE-GOAL.md"]:
        require_text(rel, ["Runtime Layout Gate", "trang thật trong browser", "screenshot desktop/mobile", "không có layout thật được xem lại trong browser"])

def check_source_layout() -> None:
    require_order("apps/web/src/app/release/page.tsx", [
        "lgo-release-narrative-hero-card",
        "lgo-release-narrative-design-board",
        "<ReleaseNarrativeStageBoard />",
        "<ReleaseReadinessHubCta />",
        "lgo-release-expanded-evidence",
    ])
    require_text("apps/web/src/app/release/page.tsx", [
        "Hành trình phát hành",
        "Từ sẵn sàng nội dung tới closed test",
        "Bảng thiết kế cổng M0 tới M1",
        "Chi tiết bằng chứng mở rộng",
    ])
    css = require_text("packages/ui/src/service-layout.css", [
        "v1.220 shared release narrative layout",
        ".lgo-releasepage-stack",
        ".lgo-release-narrative-hero-card",
        ".lgo-release-narrative-design-board",
        ".lgo-release-readiness-cta",
        "grid-template-columns: repeat(6, minmax(0, 1fr));",
    ])
    if css.count("v1.220 shared release narrative layout") != 1:
        fail("packages/ui/src/service-layout.css: expected one v1.220 release owner block")
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.127 release detailed design target density",
        "WEB v1.142 release Vietnamese design match",
        "WEB v1.142 release proof heading compact fold alignment",
        ".lgo-releasepage-stack .lgo-release-narrative-hero-card",
    ])

def check_evidence() -> None:
    require_file("tests/e2e/fe-release-real-ui-layout-v1220.spec.ts")
    require_text("tests/e2e/fe-release-real-ui-layout-v1220.spec.ts", [
        "release real UI layout v1.220",
        "/tmp/release-desktop-v1220.png",
        "/tmp/release-mobile-v1220.png",
        "scrollHeight",
        "heroBottom",
        "boardTop",
        "stagesTop",
        "readinessTop",
        "disclosureTop",
        "Bỏ qua menu",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220.md",
        "docs/execution/LGO-WEB-FE-RELEASE-REAL-UI-LAYOUT-REPORT-v1.220.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220.md",
    ]:
        require_text(rel, [
            "WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Runtime Layout Gate",
            "Base First",
            "desktop scrollHeight 1510px",
            "mobile scrollHeight 3095px",
            "packages/ui/src/service-layout.css",
            "No production auth",
            "No DB persistence",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])

def check_state() -> None:
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220 WEB_CLOSED",
        "desktop scrollHeight 1510px",
        "mobile scrollHeight 3095px",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT',
        'as the next single active page',
        'fully before any other page',
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220 | WEB-FE | WEB_CLOSED |",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221",
    ])

def main() -> int:
    check_runtime_gate(); check_source_layout(); check_evidence(); check_state()
    if ERRORS:
        print("WEB FE RELEASE REAL UI LAYOUT v1.220 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE RELEASE REAL UI LAYOUT v1.220 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
