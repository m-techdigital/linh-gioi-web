#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def fail(message: str) -> None:
    ERRORS.append(message)


def require_file(rel: str) -> None:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing required file: {rel}")


def require_text(rel: str, needle: str) -> None:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing required text file: {rel}")
        return
    text = path.read_text(encoding="utf-8")
    if needle not in text:
        fail(f"{rel} missing required text: {needle}")


def main() -> int:
    for rel in [
        "package.json",
        "pnpm-workspace.yaml",
        "turbo.json",
        "tsconfig.base.json",
    ]:
        require_file(rel)

    for rel in [
        "apps/web/package.json",
        "apps/portal/package.json",
        "apps/ops/package.json",
        "packages/ui/package.json",
        "packages/design-tokens/package.json",
        "packages/content/package.json",
        "packages/contracts/package.json",
        "packages/api-client/package.json",
        "packages/auth/package.json",
        "packages/config/package.json",
        "packages/testing/package.json",
    ]:
        require_file(rel)

    package_json_path = ROOT / "package.json"
    if package_json_path.is_file():
        data = json.loads(package_json_path.read_text(encoding="utf-8"))
        scripts = data.get("scripts", {})
        for script in ["lint", "typecheck", "test", "build", "validate", "check"]:
            if script not in scripts:
                fail(f"root package.json missing script: {script}")
        expected_check = "pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm validate"
        if scripts.get("check") != expected_check:
            fail("root package.json check script does not match required chain")

    workspace = (ROOT / "pnpm-workspace.yaml").read_text(encoding="utf-8") if (ROOT / "pnpm-workspace.yaml").is_file() else ""
    if "apps/*" not in workspace:
        fail("pnpm-workspace.yaml missing apps/* workspace")
    if "packages/*" not in workspace:
        fail("pnpm-workspace.yaml missing packages/* workspace")

    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")

    # Keep this validator compatible with the required verification sequence:
    #   python3 -m py_compile tools/validate_web_monorepo_foundation.py
    #   python3 tools/validate_web_monorepo_foundation.py
    # `py_compile` creates transient __pycache__ bytecode in the working tree before
    # the validator runs. Final artifact hygiene is still enforced before packaging
    # and with ZIP-entry scans in the handoff flow; this source-tree validator treats
    # verifier-created __pycache__ as transient, not source.
    forbidden_artifact_names = {"node_modules", ".next", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        if "__pycache__" in path.parts:
            continue
        if any(part in forbidden_artifact_names for part in path.parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")

    for api_dir in [ROOT / "apps" / app / "src" / "app" / "api" for app in ["web", "portal", "ops"]]:
        if api_dir.exists():
            fail(f"app/api route present in WEB-01: {api_dir.relative_to(ROOT)}")

    require_text("apps/portal/src/app/page.tsx", "PROVISIONAL_WEB_FIXTURE")
    require_text("apps/portal/src/app/page.tsx", "NOT_CANONICAL_BACKEND_CONTRACT")
    require_text("apps/ops/src/app/page.tsx", "NO_REAL_OPS_MUTATION")
    require_text("apps/ops/src/app/page.tsx", "NOT_CANONICAL_BACKEND_CONTRACT")
    require_text("packages/api-client/src/index.ts", "NO_ACCEPTED_BACKEND_CONTRACT")
    require_text("packages/contracts/README.md", "No production web API contract accepted yet")

    state_text = (ROOT / "docs/execution/WEB-PROJECT-STATE.md").read_text(encoding="utf-8") if (ROOT / "docs/execution/WEB-PROJECT-STATE.md").is_file() else ""
    next_text = (ROOT / "docs/execution/WEB-NEXT-ACTION.md").read_text(encoding="utf-8") if (ROOT / "docs/execution/WEB-NEXT-ACTION.md").is_file() else ""
    if "Current decision: WEB_01_MONOREPO_FOUNDATION_CLOSED" in state_text:
        if "WEB-02-DESIGN-SYSTEM-v1.0" not in next_text:
            fail("WEB-NEXT-ACTION must move to WEB-02 after WEB-01 closed")
    elif "LGO_WEB_PUBLIC_RC_WITH_PORTAL_OPS_SHELLS_ENV_LIMITED" in state_text:
        if "WEB-08-GAME-CONTRACT-SYNC-v1.0" not in next_text:
            fail("continuous WEB state must point to WEB-08 contract sync after WEB-07 source completion")
        if "rerun WEB-01 through WEB-07 package/runtime/browser gates" not in next_text:
            fail("continuous WEB state must preserve rerun requirement for env-limited runtime gates")
    else:
        if "WEB-02-DESIGN-SYSTEM-v1.0" in next_text and "only if WEB-01 reaches closed decision" not in next_text:
            fail("WEB-NEXT-ACTION points to WEB-02 without WEB-01 closed guard")
        if "rerun WEB-01 runtime gates" not in next_text and "resolve package/runtime environment" not in next_text:
            fail("WEB-NEXT-ACTION must require resolving or rerunning WEB-01 when not closed")

    if ERRORS:
        print("WEB MONOREPO FOUNDATION VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB MONOREPO FOUNDATION VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
