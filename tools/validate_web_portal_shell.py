#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_dir(rel: str) -> None:
    if not (ROOT / rel).is_dir():
        fail(f"missing dir: {rel}")

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing readable file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_text(rel: str, needle: str) -> None:
    text = read(rel)
    if needle not in text:
        fail(f"{rel} missing required text: {needle}")

def require_any_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    if not any(n in text for n in needles):
        fail(f"{rel} missing one of: {needles}")

def check_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")

def check_no_app_api_routes() -> None:
    for path in (ROOT / "apps").glob("*/src/app/api") if (ROOT / "apps").exists() else []:
        if path.exists():
            fail(f"forbidden app/api route present: {path.relative_to(ROOT)}")

def check_no_generated_artifacts(ignore_pycache: bool = True) -> None:
    forbidden = {"node_modules", ".next", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        parts = set(path.parts)
        if ignore_pycache and "__pycache__" in parts:
            continue
        if "__pycache__" in parts or forbidden.intersection(parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")

def require_non_claims() -> None:
    rel = "docs/execution/WEB-NON-CLAIMS.md"
    for phrase in [
        "No production auth", "No DB persistence", "No real account portal integration",
        "No real ops/admin mutation", "No independent backend", "No CMS",
        "No production deployment", "No payment/shop/economy"
    ]:
        require_text(rel, phrase)

def finish(name: str) -> int:
    if ERRORS:
        print(f"{name} VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1
    print(f"{name} VALIDATION PASS")
    return 0

def main() -> int:
    check_forbidden_roots(); check_no_app_api_routes(); check_no_generated_artifacts(); require_non_claims()
    for rel in [
        "apps/portal/src/app/page.tsx", "apps/portal/src/app/login/page.tsx", "apps/portal/src/app/register/page.tsx",
        "apps/portal/src/app/recovery/page.tsx", "apps/portal/src/app/account/page.tsx", "apps/portal/src/app/account/security/page.tsx",
        "apps/portal/src/app/account/sessions/page.tsx", "apps/portal/src/app/characters/page.tsx", "apps/portal/src/app/characters/[id]/page.tsx", "apps/portal/src/app/support/page.tsx",
        "packages/auth/src/index.ts", "packages/api-client/src/index.ts"
    ]:
        require_file(rel)
    for state in ["loading", "empty", "error", "unauthorized", "forbidden", "session-expired", "offline", "success-demo"]:
        require_text("packages/auth/src/index.ts", state)
    for rel in ["apps/portal/src/app/page.tsx", "apps/portal/src/app/login/page.tsx", "apps/portal/src/app/characters/[id]/page.tsx"]:
        require_text(rel, "PROVISIONAL_WEB_FIXTURE")
        require_text(rel, "NOT_CANONICAL_BACKEND_CONTRACT")
        require_text(rel, "Player Portal is blocked until accepted Auth/DB/API contract")
        require_text(rel, "No production auth is claimed")
    require_text("packages/api-client/src/index.ts", "NO_ACCEPTED_BACKEND_CONTRACT")
    require_text("packages/auth/src/index.ts", "NO_PRODUCTION_AUTH")
    return finish("WEB PORTAL SHELL")

if __name__ == "__main__":
    sys.exit(main())
