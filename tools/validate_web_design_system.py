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
        "packages/design-tokens/src/tokens.ts",
        "packages/design-tokens/src/tokens.css",
        "packages/ui/src/primitives.tsx",
        "packages/ui/src/index.ts",
        "docs/execution/WEB-DESIGN-SYSTEM-GOVERNANCE.md",
    ]:
        require_file(rel)
    for phrase in ["spiritCyan", "warmGold", "jadeTeal", "shadowPurple", "darkNavy"]:
        require_text("packages/design-tokens/src/tokens.ts", phrase)
    for phrase in ["SpiritButton", "SpiritPanel", "GameCard", "SectionHeading", "StatusBadge", "LinkButton", "Container", "Stack", "Grid", "SiteNavigation", "SiteFooter", "EmptyState", "LoadingState", "ErrorState", "LgoThemeProvider"]:
        require_text("packages/ui/src/index.ts", phrase)
    for phrase in ["Vietnamese spiritual fantasy", "spirit cyan", "warm gold", "shadow purple", "not SaaS dashboard", "readable before ornamental"]:
        require_text("docs/execution/WEB-DESIGN-SYSTEM-GOVERNANCE.md", phrase)
    return finish("WEB DESIGN SYSTEM")

if __name__ == "__main__":
    sys.exit(main())
