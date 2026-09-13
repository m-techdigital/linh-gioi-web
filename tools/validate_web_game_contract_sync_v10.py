#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def fail(message: str) -> None:
    ERRORS.append(message)


def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")


def require_text(rel: str, needle: str) -> None:
    text = read(rel)
    if needle not in text:
        fail(f"{rel} missing required text: {needle}")


def require_absent(rel: str, forbidden: str) -> None:
    text = read(rel)
    if forbidden in text:
        fail(f"{rel} contains forbidden text: {forbidden}")


def check_contract_package() -> None:
    for rel in [
        "packages/contracts/README.md",
        "packages/contracts/src/index.ts",
        "packages/api-client/src/index.ts",
        "packages/auth/src/index.ts",
    ]:
        require_text(rel, "NO_ACCEPTED_BACKEND_CONTRACT")

    require_text(
        "packages/contracts/src/index.ts",
        "EXPLICIT_GAME_BACKEND_CONTRACT_SYNC_REQUIRED",
    )
    require_text("packages/contracts/README.md", "owner-approved endpoint inventory")
    require_text("packages/contracts/README.md", "auth/session/expiry/error semantics")
    require_text("packages/contracts/README.md", "permission and audit requirements")
    require_text("packages/contracts/README.md", "WEB-08-GAME-CONTRACT-SYNC-v1.0")


def check_web08_records() -> None:
    spec = "docs/execution/specs/WEB-08-GAME-CONTRACT-SYNC-v1.0.md"
    report = "LGO-WEB-GAME-CONTRACT-SYNC-REPORT-v1.0.md"
    handoff = "HANDOFF-LGO-WEB-GAME-CONTRACT-SYNC-v1.0.md"

    for rel in [spec, report, handoff]:
        require_text(rel, "WEB-08-GAME-CONTRACT-SYNC-v1.0")
        require_text(rel, "WEB_BLOCKED_EXTERNAL_CONTRACT")
        require_text(rel, "NO_ACCEPTED_BACKEND_CONTRACT")
        require_text(rel, "A source file or fixture alone is not owner acceptance")
        require_text(rel, "efa46a898b738cb84f275463e6449a8cde48e177")
        require_text(rel, "dirty worktree")

    for rel in [spec, report]:
        require_text(rel, "Auth/API/DB/RBAC/audit")
        require_text(rel, "owner-approved endpoint inventory/schema")
        require_text(rel, "integration environment and test-account procedure")
        require_text(rel, "M6_COMBAT_PROTOCOL_GAMEDATA_CONTRACT_ACCEPTED_v0.40.0")
        require_text(rel, "not sufficient for Portal/Ops web integration")

    require_text(handoff, "STATUS: BLOCKED")
    require_text(handoff, "Contracts consumed")
    require_text(handoff, "Contract changes")
    require_text(handoff, "No production auth, DB, Portal/Ops integration or deployment is claimed")


def check_no_fake_integration() -> None:
    forbidden_markers = [
        "export interface Account",
        "export interface Character",
        "export interface Inventory",
        "fetch(",
        "axios",
        "NEXT_PUBLIC_API_URL",
    ]
    for rel in [
        "packages/contracts/src/index.ts",
        "packages/api-client/src/index.ts",
        "packages/auth/src/index.ts",
    ]:
        for marker in forbidden_markers:
            require_absent(rel, marker)


def main() -> int:
    check_contract_package()
    check_web08_records()
    check_no_fake_integration()

    if ERRORS:
        print("WEB GAME CONTRACT SYNC v1.0 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB GAME CONTRACT SYNC v1.0 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
