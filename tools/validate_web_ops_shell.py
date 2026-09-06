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
    routes = ["page", "control-center", "player-operations", "game-operations", "content-liveops", "support", "trust-safety", "security-governance", "audit"]
    for route in routes:
        rel = "apps/ops/src/app/page.tsx" if route == "page" else f"apps/ops/src/app/{route}/page.tsx"
        require_file(rel)
        require_text(rel, "NO_REAL_OPS_MUTATION")
        require_text(rel, "NOT_CANONICAL_BACKEND_CONTRACT")
        require_text(rel, "Ops/Admin is blocked until accepted RBAC/audit/security/API contract")
    for phrase in ["Control Center", "Player Operations", "Game Operations", "Content & LiveOps", "Support", "Trust & Safety", "Security & Governance", "Audit"]:
        require_text("apps/ops/src/app/page.tsx", phrase)
    for phrase in ["PermissionGatePlaceholder", "AuditTimelinePlaceholder", "DangerousActionDialogPlaceholder", "ApprovalFlowPlaceholder", "Player360Placeholder", "RuntimeStatusPlaceholder"]:
        require_text("packages/ui/src/index.ts", phrase)
    return finish("WEB OPS SHELL")

if __name__ == "__main__":
    sys.exit(main())
