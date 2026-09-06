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

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing readable file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")

def require_any_text(rel: str, needles: list[str]) -> None:
    content = read(rel)
    if not any(needle in content for needle in needles):
        fail(f"{rel} missing one of required texts: {needles}")

def check_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")

def check_no_app_api_routes() -> None:
    apps = ROOT / "apps"
    if apps.exists():
        for path in apps.glob("*/src/app/api"):
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
        "tools/runtime-kit/README-LGO-WEB-vNEXT-BROWSER-E2E-KIT.md",
        "tools/runtime-kit/Dockerfile.lgo-web-vnext-browser-e2e-kit",
        "tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh",
        "tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh",
        "tools/runtime-kit/install_uploaded_runtime_kit.sh",
        "tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh",
        "tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh",
        "tools/runtime-kit/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt",
        "docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.1.md",
        "docs/execution/WEB-LOCAL-RUNTIME-CLOSURE-CHECKLIST-v1.1.md",
        "docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.2.md",
        "docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.2.md",
        "docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.3.md",
        "docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.3.md",
        "docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.4.md",
        "docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.4.md",
    ]:
        require_file(rel)
    for phrase in [
        "FROM --platform=$TARGETPLATFORM node:24-bookworm",
        "pnpm@10.15.0",
        "playwright install chromium",
        "PLAYWRIGHT_BROWSERS_PATH",
        "self-locating wrappers",
        "workspace-node-modules",
        "cache/pnpm-store/v10",
        "cache/ms-playwright",
    ]:
        require_text("tools/runtime-kit/Dockerfile.lgo-web-vnext-browser-e2e-kit", phrase)
    for phrase in ['--platform "$PLATFORM"', "linux/amd64", "Upload these files to ChatGPT sandbox", "tar.gz.sha256", "SPLIT_SIZE", ".parts.sha256", "split -b"]:
        require_text("tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh", phrase)
    for phrase in ["bin/pnpm", "cache/pnpm-store/v10", "cache/ms-playwright", "workspace-node-modules", "workspace/pnpm-lock.yaml"]:
        require_text("tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh", phrase)
    for phrase in ["part-aa", "parts.sha256", "sha256sum -c", "cat", "tar -tzf"]:
        require_text("tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh", phrase)
    require_text("tools/runtime-kit/README-LGO-WEB-vNEXT-BROWSER-E2E-KIT.md", "Build target: Linux x64 runtime kit for ChatGPT sandbox")
    require_text("docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.1.md", "Do not package macOS")
    require_text("docs/execution/WEB-LOCAL-RUNTIME-CLOSURE-CHECKLIST-v1.1.md", "Node.js 24")
    require_text("docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.2.md", "Split Upload Contract")
    require_text("docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.2.md", ".parts.sha256")
    require_text("docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.2.md", "Confirm `.tar.gz.part-*` files exist")
    require_text("docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.4.md", "pnpm test:e2e must execute real Playwright tests")
    require_text("docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.4.md", "Run `python3 tools/validate_web_current_state.py` while source is still clean")
    require_text("docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.4.md", "Run real Playwright E2E through root `pnpm test:e2e`")
    require_any_text("package.json", ['"test:e2e": "playwright test"', '"test:e2e": "bash tools/run_lgo_web_browser_matrix.sh"'])
    require_text("package.json", '"build": "turbo run build --concurrency=1"')
    require_text("tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh", "python3 tools/validate_web_current_state.py")
    require_text("tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh", "pnpm install --offline --ignore-scripts")
    require_text("tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh", "pnpm test:e2e")
    return finish("WEB RUNTIME PRESEED")

if __name__ == "__main__":
    sys.exit(main())

# v1.3 validator anchor: self-locating pnpm wrappers and workspace-node-modules are required.
