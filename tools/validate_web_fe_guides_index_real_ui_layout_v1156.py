#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_index_real_ui_layout_v1156] FAIL: {message}", file=sys.stderr)
    sys.exit(1)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists(): fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")

def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text: fail(f"{rel} missing {needle!r}")

def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text: fail(f"{rel} still contains stale text {needle!r}")

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b: fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/page.tsx", [
        "lgo-player-facing-stack lgo-service-compact-proof-page lgo-guidespage-stack",
        "lgo-detail-hero-card lgo-guides-index-hero",
        "badge=\"Thư viện hướng dẫn\"",
        "ĐỌC ĐÚNG THỨ TỰ TRƯỚC KHI KỲ VỌNG BẢN TEST",
        "Đọc guide chính",
        "Vòng lặp thế giới trước, tin cậy phát hành sau",
        "lgo-guides-index-board",
        "lgo-guides-index-card-featured",
        "lgo-guides-index-grid",
        "lgo-guides-index-archive-grid",
        "Mở hướng dẫn",
    ])
    forbid_text("apps/web/src/app/guides/page.tsx", [
        "Guides & codex",
        "Từ nhập môn tới release trust",
        "Mở guide",
        "Download trust",
        "Support safety",
        "player-facing guides",
        "hierarchy rõ",
    ])
    require_order("apps/web/src/app/guides/page.tsx", "<PublicPlayerHero", "<section className=\"lgo-panel lgo-guides-index-board\" aria-label=\"Thư viện hướng dẫn Linh Giới\">")
    require_order("apps/web/src/app/guides/page.tsx", "lgo-guides-index-card-featured", "lgo-guides-index-grid")
    require_order("apps/web/src/app/guides/page.tsx", "lgo-guides-index-grid", "<section className=\"lgo-panel lgo-guides-index-archive\"")

    require_text("packages/ui/src/service-layout.css", [
        "Shared guide index layout for public guide/library pages",
        ".lgo-guidespage-stack",
        ".lgo-guides-index-hero",
        ".lgo-guides-index-quickmap",
        ".lgo-guides-index-board",
        ".lgo-guides-index-grid",
        ".lgo-guides-index-archive-grid",
        "grid-template-columns: repeat(3, minmax(0, 1fr))",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        ".lgo-guides-index-hero",
        ".lgo-guides-index-board",
        ".lgo-guides-index-card",
        ".lgo-guides-index-grid",
    ])

    require_text("tests/e2e/fe-guides-index-real-ui-layout-v1156.spec.ts", [
        "/guides renders a compact Vietnamese guide index with reusable layout",
        "Vòng lặp thế giới trước, tin cậy phát hành sau",
        "desktop guide grid reaches first fold",
        "mobile featured guide appears in first fold",
        "horizontal overflow",
        "Đọc guide chính",
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156 WEB_CLOSED",
        "Select `/guides`",
        "/tmp/guides-index-desktop-v1156.png",
        "/tmp/guides-index-mobile-v1156.png",
        "Base First",
        "Real Browser UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.170",
        "Current FE scope: select `/guides/player-trust-release-guide`",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156 | WEB-FE | WEB_CLOSED |",
        "Playwright desktop/mobile 2/2 guides index layout checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156.md",
        "docs/execution/LGO-WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-REPORT-v1.156.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156.md",
    ]:
        require_text(rel, ["WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156", "WEB_CLOSED", "Real Browser UI/UX Layout First", "Base First", "browser/e2e", "NO_ACCEPTED_BACKEND_CONTRACT"])
    print("[validate_web_fe_guides_index_real_ui_layout_v1156] PASS")
    return 0

if __name__ == "__main__": sys.exit(main())
