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
        ERRORS.append(f"{rel} still contains duplicated page pattern: {needle}")


def main() -> int:
    ui = "packages/ui/src/primitives.tsx"
    index = "packages/ui/src/index.ts"
    shell_css = "packages/ui/src/shell.css"

    for symbol in (
        "PageHeader",
        "BoundaryBanner",
        "DataList",
        "DataListItem",
        "PageStateGroup",
        "WorkspacePage",
    ):
        require(ui, f"export function {symbol}")
        require(index, symbol)

    for selector in (
        ".lgo-page-header",
        ".lgo-boundary-banner",
        ".lgo-data-list",
        ".lgo-page-state-group",
        ".lgo-workspace-page",
    ):
        require(shell_css, selector)

    # Compatibility wrappers must delegate to the new base rather than remain independent owners.
    require(ui, "WorkspaceBoundaryNotice")
    require(ui, "<BoundaryBanner")
    require(ui, "ProvisionalFeatureShell")
    require(ui, "<WorkspacePage")

    portal_home = "apps/portal/src/app/page.tsx"
    ops_home = "apps/ops/src/app/page.tsx"
    for rel in (portal_home, ops_home):
        require(rel, "WorkspacePage")
        require(rel, "DataList")
        forbid(rel, "<SpiritPanel")
        forbid(rel, "<SectionHeading")
        forbid(rel, "<Grid")

    require(portal_home, "PROVISIONAL_WEB_FIXTURE")
    require(portal_home, "NOT_CANONICAL_BACKEND_CONTRACT")
    require(portal_home, "NO_ACCEPTED_BACKEND_CONTRACT")
    require(ops_home, "NO_REAL_OPS_MUTATION")
    require(ops_home, "NOT_CANONICAL_BACKEND_CONTRACT")
    require(ops_home, "Ops/Admin is blocked until accepted RBAC/audit/security/API contract")

    # Generated/cache/toolchain content must not be required by this source-level task.
    for rel in ("apps/portal/src/app/globals.css", "apps/ops/src/app/globals.css"):
        for selector in (".lgo-page-header", ".lgo-boundary-banner", ".lgo-data-list", ".lgo-page-state-group"):
            forbid(rel, selector)

    if ERRORS:
        print("WEB SHARED PAGE PATTERNS v1.28 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1

    print("WEB SHARED PAGE PATTERNS v1.28 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
