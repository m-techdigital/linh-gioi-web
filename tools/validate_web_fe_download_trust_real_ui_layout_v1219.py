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
    require_order("apps/web/src/app/download/trust/page.tsx", [
        "lgo-download-trust-hero-card",
        "<DownloadTrustGateBoard />",
        "Tin cậy trước khi tải",
        "lgo-download-trust-first-gates",
        "<ReleaseEvidenceChecklist />",
        "<DownloadStatusDepth />",
        "<DownloadTrustCta />",
        "lgo-download-trust-secondary",
    ])
    require_text("apps/web/src/app/download/trust/page.tsx", [
        "Tin cậy tải game",
        "Không tải giả",
        "không SHA256 giả",
        "Bằng chứng phụ và tuyến liên quan",
        "không ép toàn bộ proof board vào luồng tin cậy tải game chính",
    ])
    css = require_text("packages/ui/src/service-layout.css", [
        "v1.219 shared download trust layout",
        ".lgo-downloadtrustpage-stack",
        ".lgo-download-trust-hero-card",
        ".lgo-download-trust-first-gates",
        ".lgo-owner-release-gate-board",
        ".lgo-trust-panel",
        ".lgo-release-evidence",
        ".lgo-download-depth",
        ".lgo-download-trust-secondary",
        "grid-template-columns: repeat(6, minmax(0, 1fr));",
        "grid-template-columns: repeat(2, minmax(0, 1fr));",
    ])
    if css.count("v1.219 shared download trust layout") != 1:
        fail("packages/ui/src/service-layout.css: expected one v1.219 download trust owner block")
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.126 download trust detailed design target density",
        "WEB v1.141 download trust Vietnamese design match",
        ".lgo-downloadtrustpage-stack .lgo-trust-panel",
    ])

def check_evidence() -> None:
    require_file("tests/e2e/fe-download-trust-real-ui-layout-v1219.spec.ts")
    require_text("tests/e2e/fe-download-trust-real-ui-layout-v1219.spec.ts", [
        "download trust real UI layout v1.219",
        "/tmp/download-trust-desktop-v1219.png",
        "/tmp/download-trust-mobile-v1219.png",
        "scrollHeight",
        "trustGateTop",
        "ownerGateColumns",
        "releaseEvidenceTop",
        "secondaryTop",
        "Bỏ qua menu",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219.md",
        "docs/execution/LGO-WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-REPORT-v1.219.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219.md",
    ]:
        require_text(rel, [
            "WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Runtime Layout Gate",
            "Base First",
            "desktop scrollHeight 2209px",
            "mobile scrollHeight 3204px",
            "packages/ui/src/service-layout.css",
            "No production auth",
            "No DB persistence",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])

def check_state() -> None:
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219 WEB_CLOSED",
        "desktop scrollHeight 2209px",
        "mobile scrollHeight 3204px",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
        "select `/release` as the next single active page",
        "Complete `/release` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219 | WEB-FE | WEB_CLOSED |",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
    ])

def main() -> int:
    check_runtime_gate()
    check_source_layout()
    check_evidence()
    check_state()
    if ERRORS:
        print("WEB FE DOWNLOAD TRUST REAL UI LAYOUT v1.219 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE DOWNLOAD TRUST REAL UI LAYOUT v1.219 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
