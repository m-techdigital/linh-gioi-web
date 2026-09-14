#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_journey_real_ui_layout_v1216] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} still contains forbidden text {needle!r}")


def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a = text.find(first)
    b = text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} must appear before {second!r}")


def main() -> int:
    require_text("apps/web/src/app/journey/page.tsx", [
        "lgo-player-facing-stack lgo-journeypage-stack",
        "PublicPlayerHero",
        "SessionLoopRail",
        "WorldRouteJourney",
        "lgo-journey-design-board",
        "Bảng tuyến hành trình một phiên chơi",
        "Ảnh tham chiếu trò chơi",
        "không phải backend tài khoản hay bang hội",
    ])
    require_order("apps/web/src/app/journey/page.tsx", "<PublicPlayerHero", "<SessionLoopRail />")
    require_order("apps/web/src/app/journey/page.tsx", "<SessionLoopRail />", "<WorldRouteJourney />")
    require_order("apps/web/src/app/journey/page.tsx", "<WorldRouteJourney />", "lgo-journey-design-board")
    forbid_text("apps/web/src/app/journey/page.tsx", [
        "Journey session route flow board",
        "Game reference art",
        "without claiming",
        "Design Target First",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "v1.216 shared journey overview layout for the public session-loop route",
        ".lgo-journeypage-stack .lgo-journey-hero",
        ".lgo-journeypage-stack .lgo-session-loop",
        ".lgo-journeypage-stack .lgo-world-route",
        ".lgo-journeypage-stack .lgo-journey-design-board",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
        "height: 150px",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.123 journey detailed design target density",
        "WEB v1.138 journey Vietnamese design match",
        ".lgo-journeypage-stack .lgo-journey-hero",
        ".lgo-journeypage-stack .lgo-session-loop",
    ])

    require_text("tests/e2e/fe-journey-real-ui-layout-v1216.spec.ts", [
        "journey real UI layout v1.216",
        "desktop page height remains reviewable",
        "mobile page height remains reviewable",
        "mobile keeps dense two-column session rhythm",
        "/tmp/journey-mobile-v1216.png",
        "/tmp/journey-desktop-v1216.png",
    ])
    require_text("tests/e2e/fe-journey-design-target-density-v1123.spec.ts", ["journey design target density", "Public Journey"])
    require_text("tests/e2e/fe-journey-vietnamese-design-match-v1138.spec.ts", ["journey Vietnamese design match", "Thiết kế chi tiết hành trình"])
    require_text("tests/e2e/fe-public-journey-design-board-v180.spec.ts", ["Bảng tuyến hành trình một phiên chơi", "journey horizontal overflow"])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216 WEB_CLOSED",
        "/journey",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/journey-desktop-v1216.png",
        "/tmp/journey-mobile-v1216.png",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
        "Select `/download/trust` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
        "Current FE scope: select `/download/trust`",
        "Complete `/download/trust` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216 | WEB-FE | WEB_CLOSED |",
        "Public Journey real browser UI layout and Base First session route flow",
        "Playwright desktop/mobile 8/8 journey layout/design-board checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216.md",
        "docs/execution/LGO-WEB-FE-JOURNEY-REAL-UI-LAYOUT-REPORT-v1.216.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216.md",
    ]:
        require_text(rel, [
            "WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "AXIRO",
        ])

    print("[validate_web_fe_journey_real_ui_layout_v1216] PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
