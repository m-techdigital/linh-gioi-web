#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import json
import sys

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

def require_text(rel: str, text: str) -> None:
    if text not in read(rel):
        fail(f"{rel} missing required text: {text}")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def check_package_scripts() -> None:
    try:
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    except Exception as exc:
        fail(f"cannot parse package.json: {exc}")
        return
    scripts = package.get("scripts", {})
    expected = {
        "test": "turbo run test --concurrency=1",
        "test:e2e": "bash tools/run_lgo_web_browser_matrix.sh",
        "test:e2e:public": "playwright test tests/e2e/public-navigation.spec.ts",
        "test:e2e:multi-app": "bash tools/run_lgo_web_browser_matrix.sh",
    }
    for name, command in expected.items():
        if scripts.get(name) != command:
            fail(f"package.json script {name!r} must be exactly {command!r}")
    if "--filter @lgo-web/web test:e2e" in str(scripts):
        fail("package.json still contains filtered test:e2e false-pass pattern")

def check_no_generated_artifacts() -> None:
    forbidden = {"node_modules", ".next", ".turbo", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        parts = set(path.parts)
        if "__pycache__" in parts:
            continue
        if forbidden.intersection(parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")

def main() -> int:
    for rel in [
        "tests/e2e/public-navigation.spec.ts",
        "tests/e2e/runtime-multi-app.spec.ts",
        "playwright.config.ts",
        "tools/run_lgo_web_browser_matrix.sh",
        "docs/execution/WEB-RUNTIME-BROWSER-E2E-MATRIX-v1.5.md",
        "docs/execution/checklists/WEB-RUNTIME-BROWSER-E2E-CHECKLIST-v1.5.md",
    ]:
        require_file(rel)
    check_package_scripts()
    for text in [
        "pnpm --filter @lgo-web/web dev --hostname 127.0.0.1 --port 3000",
        "pnpm --filter @lgo-web/portal dev --hostname 127.0.0.1 --port 3001",
        "pnpm --filter @lgo-web/ops dev --hostname 127.0.0.1 --port 3002",
        "workers: 1",
        "webServers",
    ]:
        require_text("playwright.config.ts", text)
    for text in [
        "Player Portal Shell",
        "No production auth is claimed",
        "Ops/Admin Shell",
        "No real ops/admin mutation is claimed",
        "No real mutation endpoints",
        "NOT_CANONICAL_BACKEND_CONTRACT",
    ]:
        require_text("tests/e2e/runtime-multi-app.spec.ts", text)
    for text in [
        "public web",
        "player portal",
        "ops admin",
        "real Playwright browser E2E",
        "No production auth",
        "No DB persistence",
        "No real ops/admin mutation",
        "sharded browser matrix runner",
    ]:
        require_text("docs/execution/WEB-RUNTIME-BROWSER-E2E-MATRIX-v1.5.md", text)
    for text in [
        "LGO_WEB_BROWSER_MATRIX_RESULT PASS",
        "LGO_WEB_SKIP_WEBSERVER=1",
        "public-navigation-desktop",
        "matrix-ops-mobile",
    ]:
        require_text("tools/run_lgo_web_browser_matrix.sh", text)
    check_no_generated_artifacts()
    if ERRORS:
        print("WEB RUNTIME BROWSER MATRIX VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB RUNTIME BROWSER MATRIX VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
