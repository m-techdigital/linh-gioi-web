#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require(rel: str, needle: str) -> None:
    if needle not in read(rel):
        ERRORS.append(f"{rel} missing required text: {needle}")

def forbid(rel: str, needle: str) -> None:
    if needle in read(rel):
        ERRORS.append(f"{rel} still contains duplicated app-local pattern: {needle}")

def main() -> int:
    require("packages/ui/src/primitives.tsx", "export function ExperienceHero")
    require("packages/ui/src/primitives.tsx", "export function ProvisionalFeatureShell")
    require("packages/ui/src/index.ts", "ExperienceHero")
    require("packages/ui/src/index.ts", "ProvisionalFeatureShell")

    public_hero = "apps/web/src/components/PublicPlayerHero.tsx"
    require(public_hero, "ExperienceHero")
    forbid(public_hero, "<StatusBadge")
    forbid(public_hero, "<LinkButton")

    for rel in [
        "apps/portal/src/app/login/page.tsx",
        "apps/portal/src/app/register/page.tsx",
        "apps/portal/src/app/recovery/page.tsx",
        "apps/portal/src/app/account/page.tsx",
        "apps/portal/src/app/account/security/page.tsx",
        "apps/portal/src/app/account/sessions/page.tsx",
        "apps/portal/src/app/characters/page.tsx",
        "apps/portal/src/app/characters/[id]/page.tsx",
        "apps/portal/src/app/support/page.tsx",
        "apps/ops/src/app/control-center/page.tsx",
        "apps/ops/src/app/player-operations/page.tsx",
        "apps/ops/src/app/game-operations/page.tsx",
        "apps/ops/src/app/support/page.tsx",
        "apps/ops/src/app/trust-safety/page.tsx",
        "apps/ops/src/app/security-governance/page.tsx",
    ]:
        require(rel, "ProvisionalFeatureShell")
        forbid(rel, "<GameCard")

    if ERRORS:
        print("WEB SHARED BASE VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB SHARED BASE VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
