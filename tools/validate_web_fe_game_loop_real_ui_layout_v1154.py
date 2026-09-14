#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_game_loop_real_ui_layout_v1154] FAIL: {message}", file=sys.stderr)
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
    a = text.find(first)
    b = text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} must appear before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/game/loop/page.tsx", [
        "WEB v1.154 · vòng lặp gameplay",
        "lgo-service-compact-proof-page lgo-gamelooppage-stack",
        "lgo-game-loop-hero-card",
        "Vòng lặp gameplay thế giới",
        "Chưa có combat thật · chưa có túi đồ · chưa có tổ đội · chưa có tài khoản tích hợp",
        "Board vòng lặp gameplay thế giới Linh Giới",
        "Board tham chiếu",
        "không phải combat vận hành thật",
        "mà không công bố",
        "lgo-game-loop-gate-board",
        "loopGates",
        "Vào cổng",
        "Nhận hướng dẫn",
        "Luyện tập an toàn",
        "GameplayLoopStageBoard",
        "PlayerTrustReleaseCta",
    ])
    forbid_text("apps/web/src/app/game/loop/page.tsx", [
        "<h1>World gameplay loop</h1>",
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
    require_order("apps/web/src/app/game/loop/page.tsx", "<h1>Vòng lặp gameplay thế giới</h1>", "lgo-game-loop-design-board")
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-game-loop-design-board", "lgo-game-loop-gate-board")
    require_order("apps/web/src/app/game/loop/page.tsx", "lgo-game-loop-gate-board", "<GameplayLoopStageBoard />")
    require_order("apps/web/src/app/game/loop/page.tsx", "<GameplayLoopStageBoard />", "<PlayerTrustReleaseCta />")

    require_text("packages/ui/src/service-layout.css", [
        "WEB v1.13 public world / gameplay loop depth",
        "WEB v1.82 public world gameplay-loop board",
        "Shared game-loop page layout for public gameplay expectation surfaces",
        ".lgo-game-loop-design-board",
        ".lgo-game-loop-gate-board",
        ".lgo-game-loop-gate-grid",
        ".lgo-gameplay-loop-grid",
        "grid-template-columns: repeat(4, minmax(0, 1fr))",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.13 public world / gameplay loop depth",
        "WEB v1.82 public world gameplay-loop board",
        ".lgo-game-loop-design-board",
        ".lgo-gameplay-loop-grid",
        ".lgo-game-loop-gate-board",
    ])
    require_text("tests/e2e/fe-game-loop-real-ui-layout-v1154.spec.ts", [
        "/game/loop uses Vietnamese compact shared layout",
        "Vòng lặp gameplay thế giới",
        "Board vòng lặp gameplay thế giới Linh Giới",
        "desktop hero compact",
        "mobile hero compact",
        "horizontal overflow",
    ])
    require_text("tests/e2e/fe-public-game-loop-design-board-v182.spec.ts", ["Board vòng lặp gameplay thế giới Linh Giới", "game loop horizontal overflow"])
    require_text("tests/e2e/fe-public-route-heading-priority-v189.spec.ts", ["/game/loop", "Vòng lặp gameplay thế giới"])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154 WEB_CLOSED",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/game-loop-desktop-v1154.png",
        "/tmp/game-loop-mobile-v1154.png",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217",
        "Current FE scope: select `/start`",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154 | WEB-FE | WEB_CLOSED |",
        "Playwright desktop/mobile 12/12 game-loop layout/design-board/heading checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154.md",
        "docs/execution/LGO-WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-REPORT-v1.154.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154.md",
    ]:
        require_text(rel, [
            "WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    print("[validate_web_fe_game_loop_real_ui_layout_v1154] PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
