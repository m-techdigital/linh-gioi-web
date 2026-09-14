#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_game_real_ui_layout_v1213] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/game/page.tsx", [
        "lgo-player-facing-stack lgo-gamepage-stack",
        "PublicPlayerHero",
        "lgo-game-world-design-board",
        "game-world-atlas-hub.svg",
        "Board tham chiếu",
        "Thế giới công khai là tuyến đọc vùng đất",
        "WorldRouteJourney",
        "WorldAtlasStories",
        "details className=\"lgo-service-disclosure-stack lgo-gamepage-expanded-evidence\"",
        "Bằng chứng phụ và tuyến liên quan",
        "không ép toàn bộ proof board vào first-flow `/game`",
        "lgo-service-disclosure-body",
        "GamePillarGrid",
        "ShadowInvasionFeature",
    ])
    require_order("apps/web/src/app/game/page.tsx", "<PublicPlayerHero", "lgo-game-world-design-board")
    require_order("apps/web/src/app/game/page.tsx", "lgo-game-world-design-board", "<WorldRouteJourney />")
    require_order("apps/web/src/app/game/page.tsx", "<WorldRouteJourney />", "<WorldAtlasStories />")
    require_order("apps/web/src/app/game/page.tsx", "<WorldAtlasStories />", "lgo-gamepage-expanded-evidence")
    forbid_text("apps/web/src/app/game/page.tsx", [
        "World structure",
        "Zone Network",
        "Sky / Fog",
        "live open-world backend",
        "without claiming",
        "Design Target First",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "Shared game overview page layout for public world atlas surfaces",
        "v1.213 compact real browser layout for the public game overview page",
        "v1.213 final specificity pass for rendered /game fold density",
        ".lgo-gamepage-stack .lgo-game-world-design-board",
        ".lgo-gamepage-stack .lgo-gamepage-expanded-evidence",
        ".lgo-public-shell main .lgo-gamepage-stack .lgo-public-player-hero.lgo-cinematic-hero",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        ".lgo-gamepage-stack",
        ".lgo-game-world-design-board",
        ".lgo-game-world-boundary",
        "WEB v1.120/v1.135 game world detailed design target density",
        "WEB v1.83 public game world hero typography cap",
        "WEB v1.83 public game world atlas typography cap",
    ])

    require_text("tests/e2e/fe-game-real-ui-layout-v1213.spec.ts", [
        "game overview real UI layout v1.213",
        "lgo-gamepage-expanded-evidence",
        "one shared disclosure for secondary world proof",
        "details:not([open])",
        "desktop page height remains reviewable",
        "mobile page height remains reviewable",
        "/tmp/game-${isMobile ? \"mobile\" : \"desktop\"}-v1213.png",
    ])
    require_text("tests/e2e/fe-game-world-design-target-density-v1120.spec.ts", ["desktop world route starts near first target board", "mobile game hero does not force extreme blank fold"])
    require_text("tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts", ["desktop target board should follow the hero", "desktop route strip should follow the target board", "Bằng chứng phụ và tuyến liên quan"])
    require_text("tests/e2e/fe-public-game-world-design-board-v183.spec.ts", ["Game world atlas hub board"])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GAME-REAL-UI-LAYOUT-v1.213 WEB_CLOSED",
        "/game",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/game-desktop-v1213.png",
        "/tmp/game-mobile-v1213.png",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217",
        "Select `/start` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217",
        "Current FE scope: select `/start`",
        "Complete `/start` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GAME-REAL-UI-LAYOUT-v1.213 | WEB-FE | WEB_CLOSED |",
        "Public Game overview real browser UI layout and Base First target-board/atlas flow",
        "Playwright desktop/mobile 8/8 game overview layout/design-board checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GAME-REAL-UI-LAYOUT-v1.213.md",
        "docs/execution/LGO-WEB-FE-GAME-REAL-UI-LAYOUT-REPORT-v1.213.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GAME-REAL-UI-LAYOUT-v1.213.md",
    ]:
        require_text(rel, [
            "WEB-FE-GAME-REAL-UI-LAYOUT-v1.213",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "AXIRO",
        ])

    print("[validate_web_fe_game_real_ui_layout_v1213] PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
