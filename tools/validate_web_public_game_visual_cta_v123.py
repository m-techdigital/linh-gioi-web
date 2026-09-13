#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")


def require_text(rel: str, *needles: str) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing required text: {needle}")


def main() -> int:
    require_text(
        "apps/web/src/app/page.tsx",
        "Khám phá Linh Giới",
        "Chọn Lộ của bạn",
        "SpiritRouteBreadcrumb",
    )
    homepage = read("apps/web/src/app/page.tsx")
    if "WorldPanoramaBand" not in homepage and "HomeDiscoveryShowcase" not in homepage:
        fail("homepage must keep a player-facing world discovery surface")
    require_text(
        "apps/web/src/components/PublicGameExperienceSections.tsx",
        "SpiritRouteBreadcrumb",
        "WorldPanoramaBand",
        "lgo-class-emblem-core",
        "lgo-world-panorama",
    )
    require_text(
        "apps/web/src/components/PublicNavigation.tsx",
        "Trạng thái chơi",
        "/download",
    )
    nav = read("apps/web/src/components/PublicNavigation.tsx")
    if ">Tải game<" in nav:
        fail("header still exposes an unconditional Tải game CTA")

    require_text(
        "apps/web/src/app/globals.css",
        "WEB v1.23 game visual asset & CTA polish",
        "prefers-reduced-motion",
        "lgo-hero-atmosphere",
        "lgo-class-emblem-core",
        "lgo-world-panorama",
    )
    require_text(
        "docs/execution/WEB-PROJECT-STATE.md",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH",
    )
    require_text(
        "HANDOFF-LGO-WEB-PUBLIC-GAME-VISUAL-ASSET-CTA-POLISH-v1.23.md",
        "WEB-PUBLIC-GAME-VISUAL-ASSET-AND-CTA-POLISH-v1.23",
    )

    if ERRORS:
        print("WEB PUBLIC GAME VISUAL CTA v1.23 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1

    print("WEB PUBLIC GAME VISUAL CTA v1.23 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
