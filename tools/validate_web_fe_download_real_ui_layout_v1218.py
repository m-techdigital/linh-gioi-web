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
        require_text(rel, [
            "Runtime Layout Gate",
            "trang thật trong browser",
            "screenshot desktop/mobile",
            "không có layout thật được xem lại trong browser",
        ])

def check_source_layout() -> None:
    require_order("apps/web/src/app/download/page.tsx", [
        "lgo-download-player-hero",
        "lgo-download-readiness-target-panel",
        "lgo-download-channel-section",
        "<DownloadStatusDepth />",
        "<DownloadTrustGateBoard />",
        "<ReleaseEvidenceChecklist />",
        "lgo-download-expanded-evidence",
    ])
    require_text("apps/web/src/app/download/page.tsx", [
        "Trạng thái chơi & tải game",
        "Bản tải công khai hiện chưa mở",
        "Bằng chứng phụ và tuyến liên quan",
        "không ép toàn bộ proof board vào luồng tải game chính",
    ])
    css = require_text("packages/ui/src/service-layout.css", [
        "v1.218 shared download availability layout",
        ".lgo-downloadpage-stack",
        ".lgo-download-player-hero",
        ".lgo-download-readiness-target-panel",
        ".lgo-download-channel-section",
        ".lgo-download-depth",
        ".lgo-trust-panel",
        ".lgo-release-evidence",
        ".lgo-download-expanded-evidence",
        "grid-template-columns: repeat(2, minmax(0, 1fr));",
    ])
    if css.count("v1.218 shared download availability layout") != 1:
        fail("packages/ui/src/service-layout.css: expected one v1.218 download owner block")
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.125 download detailed design target density",
        "WEB v1.140 download Vietnamese design match",
        ".lgo-downloadpage-stack .lgo-download-player-hero",
    ])

def check_evidence() -> None:
    require_file("tests/e2e/fe-download-real-ui-layout-v1218.spec.ts")
    require_text("tests/e2e/fe-download-real-ui-layout-v1218.spec.ts", [
        "download real UI layout v1.218",
        "/tmp/download-desktop-v1218.png",
        "/tmp/download-mobile-v1218.png",
        "scrollHeight",
        "heroBottom",
        "releaseChecklistTop",
        "desktop release evidence remains in reviewable flow",
        "mobile release evidence remains in reviewable flow",
        "readinessColumns",
        "channelColumns",
        "Bỏ qua menu",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218.md",
        "docs/execution/LGO-WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-REPORT-v1.218.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218.md",
    ]:
        require_text(rel, [
            "WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Runtime Layout Gate",
            "Base First",
            "desktop scrollHeight 2074px",
            "mobile scrollHeight 2935px",
            "packages/ui/src/service-layout.css",
            "No production auth",
            "No DB persistence",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])

def check_state() -> None:
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218 WEB_CLOSED",
        "desktop scrollHeight 2074px",
        "mobile scrollHeight 2935px",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
        "select `/download/trust` as the next single active page",
        "Complete `/download/trust` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218 | WEB-FE | WEB_CLOSED |",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
    ])

def main() -> int:
    check_runtime_gate()
    check_source_layout()
    check_evidence()
    check_state()
    if ERRORS:
        print("WEB FE DOWNLOAD REAL UI LAYOUT v1.218 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE DOWNLOAD REAL UI LAYOUT v1.218 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
