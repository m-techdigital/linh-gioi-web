#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_game_loop_real_ui_layout_v1212] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/game/loop/page.tsx", [
        "lgo-service-compact-proof-page lgo-gamelooppage-stack",
        "lgo-game-loop-hero-card",
        "Board vòng lặp gameplay thế giới Linh Giới",
        "lgo-game-loop-gate-board",
        "GameplayLoopStageBoard",
        "details className=\"lgo-service-disclosure-stack lgo-gameloop-expanded-evidence\"",
        "Bằng chứng phụ và tuyến liên quan",
        "không ép toàn bộ proof board vào first-flow gameplay",
        "lgo-service-disclosure-body",
        "PlayerTrustReleaseCta",
        "BeginnerExpectationBoard",
        "GuideWorldNavigationBoard",
        "GameplayScopeBoundaryBoard",
        "ClosedTesterInformationPackCta",
    ])
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-game-loop-hero-card", "lgo-game-loop-design-board")
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-game-loop-design-board", "lgo-game-loop-gate-board")
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-game-loop-gate-board", "<GameplayLoopStageBoard />")
    require_order("apps/web/src/app/game/loop/page.tsx", "<GameplayLoopStageBoard />", "lgo-gameloop-expanded-evidence")
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-gameloop-expanded-evidence", "<PlayerTrustReleaseCta />")
    forbid_text("apps/web/src/app/game/loop/page.tsx", [
        "World gameplay loop board",
        "World gameplay loop reference art",
        "Game reference art",
        "without claiming",
        "live combat",
        "inventory persistence",
        "party flow",
        "account integration",
        "combat backend",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "Shared game-loop page layout for public gameplay expectation surfaces",
        ".lgo-gamelooppage-stack .lgo-gameloop-expanded-evidence",
        ".lgo-service-compact-proof-page .lgo-gameplay-loop-grid",
        ".lgo-service-compact-proof-page .lgo-gameplay-loop-card",
        "grid-template-columns: repeat(4, minmax(0, 1fr))",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
        "-webkit-line-clamp: 1",
        "font-size: .64rem",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        ".lgo-gamelooppage-stack",
        ".lgo-game-loop-design-board",
        ".lgo-game-loop-gate-board",
        ".lgo-gameplay-loop-grid",
    ])

    require_text("tests/e2e/fe-game-loop-real-ui-layout-v1212.spec.ts", [
        "game loop real UI layout v1.212",
        "lgo-gameloop-expanded-evidence",
        "one shared details disclosure for secondary proof",
        "desktop page height remains reviewable",
        "mobile page height remains reviewable",
        "/tmp/game-loop-${isMobile ? \"mobile\" : \"desktop\"}-v1212.png",
        "keyboard reaches skip navigation first",
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212 WEB_CLOSED",
        "/game/loop",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/game-loop-desktop-v1212.png",
        "/tmp/game-loop-mobile-v1212.png",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
        "Select `/release` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220",
        "Current FE scope: select `/release`",
        "Complete `/release` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212 | WEB-FE | WEB_CLOSED |",
        "Public Game Loop real browser UI layout and Base First disclosure/compact gameplay flow",
        "Playwright desktop/mobile 2/2 game-loop real UI layout checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212.md",
        "docs/execution/LGO-WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-REPORT-v1.212.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212.md",
    ]:
        require_text(rel, [
            "WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "AXIRO",
        ])

    print("[validate_web_fe_game_loop_real_ui_layout_v1212] PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
