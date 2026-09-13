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


def main() -> int:
    policy = "docs/execution/WEB-BASE-FIRST-GOVERNANCE.md"
    require(policy, "BASE FIRST")
    require(policy, "Evidence Reuse / Build Once")
    require(policy, "Search existing owners first")
    require(policy, "Extend base/shared before page-local duplication")
    require(policy, "Full production build runs at closure")
    require(policy, "Do not rerun unchanged PASS evidence")

    require("AGENTS.md", "## Base First rule")
    require("AGENTS.md", "Build Once")
    require("docs/execution/WEB-ARCHITECTURE.md", "Base First dependency direction")
    require("docs/execution/WEB-CODE-QUALITY-GATES.md", "Targeted inner-loop gates")
    require("docs/execution/WEB-CODE-QUALITY-GATES.md", "Full closure gates")
    require("docs/execution/WEB-SANDBOX-WORKFLOW.md", "Base First preflight")
    require("docs/execution/templates/WEB-TASK-HANDOFF-TEMPLATE.md", "Base First audit")
    require("docs/execution/WEB-NEXT-ACTION.md", "Base First")

    if ERRORS:
        print("WEB BASE FIRST VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB BASE FIRST VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
