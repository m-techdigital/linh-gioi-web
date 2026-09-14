#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_roadmap_real_ui_layout_v1153] FAIL: {message}", file=sys.stderr)
    sys.exit(1)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists():
        fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")

def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing {needle!r}")

def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text:
            fail(f"{rel} still contains stale text {needle!r}")

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    left = text.find(first)
    right = text.find(second)
    if left < 0 or right < 0 or left >= right:
        fail(f"{rel} order invalid: {first!r} must appear before {second!r}")

def main() -> None:
    require_text("apps/web/src/app/roadmap/page.tsx", [
        "WEB v1.153 · roadmap public",
        "lgo-service-compact-proof-page lgo-roadmappage-stack",
        "lgo-roadmap-hero-card",
        "Roadmap phát triển web",
        "Chưa có đăng nhập thật · chưa có dữ liệu tài khoản · chưa có tích hợp máy chủ",
        "WEB-08 vẫn bị chặn",
        "không công bố xác thực vận hành",
        "lgo-roadmap-design-board",
        "Bảng luồng roadmap public Linh Giới",
        "Board tham chiếu",
        "lgo-roadmap-route-board",
        "roadmapSteps",
        "Đọc trạng thái hiện tại",
        "Tách mốc kế hoạch khỏi lời hứa",
        "Chờ hợp đồng máy chủ",
        "ReleaseReadinessHubCta",
    ])
    forbid_text("apps/web/src/app/roadmap/page.tsx", [
        "Public roadmap flow design board",
        "Game reference art",
        "Roadmap flow before release promise",
        "production auth",
        "backend integration",
        "DB persistence",
        "full MMO gameplay",
        "Auth/API",
    ])
    require_order("apps/web/src/app/roadmap/page.tsx", "<h1>Roadmap phát triển web</h1>", "<ReleaseReadinessHubCta />")
    require_order("apps/web/src/app/roadmap/page.tsx", "lgo-roadmap-design-board", "lgo-roadmap-route-board")
    require_order("apps/web/src/app/roadmap/page.tsx", "lgo-roadmap-route-board", "<ReleaseReadinessHubCta />")

    require_text("packages/ui/src/service-layout.css", [
        "Shared roadmap page layout for public planning gate surfaces",
        ".lgo-roadmappage-stack",
        ".lgo-roadmap-design-board",
        ".lgo-roadmap-route-board",
        ".lgo-roadmap-step-grid",
        "grid-template-columns: repeat(3, minmax(0, 1fr))",
        "grid-template-columns: 1fr",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.70 public roadmap real reference-art board",
        ".lgo-roadmap-design-board",
        ".lgo-roadmap-route-board",
        ".lgo-roadmap-step-grid",
    ])

    require_text("tests/e2e/fe-roadmap-real-ui-layout-v1153.spec.ts", [
        "/roadmap uses Vietnamese compact shared layout",
        "Bảng luồng roadmap public Linh Giới",
        "desktop hero compact",
        "mobile hero compact",
        "horizontal overflow",
        "English design/backend labels should not drive first-flow",
    ])
    require_text("tests/e2e/fe-public-roadmap-design-board-v170.spec.ts", [
        "Bảng luồng roadmap public Linh Giới",
        "roadmap horizontal overflow",
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153 WEB_CLOSED",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/roadmap-desktop-v1153.png",
        "/tmp/roadmap-mobile-v1153.png",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
        "Current FE scope: select `/release`",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153 | WEB-FE | WEB_CLOSED |",
        "Playwright desktop/mobile 4/4 roadmap layout/design-board checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153.md",
        "docs/execution/LGO-WEB-FE-ROADMAP-REAL-UI-LAYOUT-REPORT-v1.153.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153.md",
    ]:
        require_text(rel, [
            "WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    print("[validate_web_fe_roadmap_real_ui_layout_v1153] PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
