#!/usr/bin/env python3
"""Validate WEB-00 Program Constitution package."""
from __future__ import annotations

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "AGENTS.md",
    "README.md",
    "VERSIONING.md",
    "LOCAL-SETUP.md",
    "docs/execution/WEB-PROJECT-STATE.md",
    "docs/execution/WEB-NEXT-ACTION.md",
    "docs/execution/WEB-TASK-LEDGER.md",
    "docs/execution/WEB-MASTER-ROADMAP.md",
    "docs/execution/WEB-ARCHITECTURE.md",
    "docs/execution/WEB-OWNERSHIP-MAP.md",
    "docs/execution/WEB-PHASE-GATES.md",
    "docs/execution/WEB-API-CONTRACT-REGISTER.md",
    "docs/execution/WEB-DESIGN-SYSTEM-GOVERNANCE.md",
    "docs/execution/WEB-PERFORMANCE-BUDGET.md",
    "docs/execution/WEB-SECURITY-BASELINE.md",
    "docs/execution/WEB-DEPLOYMENT-ROADMAP.md",
    "docs/execution/WEB-VISUAL-EVIDENCE-MATRIX.md",
    "docs/execution/WEB-CONTENT-MODEL.md",
    "docs/execution/WEB-HANDOFF-CONTRACT.md",
    "docs/execution/WEB-SANDBOX-WORKFLOW.md",
    "docs/execution/WEB-CODE-QUALITY-GATES.md",
    "docs/execution/WEB-RISK-REGISTER.md",
    "docs/execution/WEB-NON-CLAIMS.md",
    "docs/execution/prompts/WEB-01-MONOREPO-FOUNDATION.md",
    "docs/execution/prompts/WEB-02-DESIGN-SYSTEM.md",
    "docs/execution/prompts/WEB-03-PUBLIC-VERTICAL-SLICE.md",
    "docs/execution/templates/WEB-TASK-HANDOFF-TEMPLATE.md",
    "docs/execution/templates/WEB-RUNTIME-EVIDENCE-TEMPLATE.md",
    "docs/execution/templates/WEB-CONTRACT-SYNC-TEMPLATE.md",
    "tools/validate_web_program_constitution.py",
    "reports/WEB-00-PROGRAM-CONSTITUTION-REPORT-v1.0.md",
    "HANDOFF-LGO-WEB-00-PROGRAM-CONSTITUTION-v1.0.md",
    "LGO-WEB-00-CHANGED-FILES.txt",
    "LGO-WEB-00-DELETIONS.txt",
]

REQUIRED_DIRS = [
    "docs/execution/prompts",
    "docs/execution/templates",
    "apps/web",
    "apps/portal",
    "apps/ops",
    "packages/ui",
    "packages/design-tokens",
    "packages/content",
    "packages/api-client",
    "packages/contracts",
    "packages/auth",
    "packages/config",
    "packages/testing",
    "tools",
    "reports",
]


def text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def require(condition: bool, message: str, failures: list[str]) -> None:
    if not condition:
        failures.append(message)


def contains_all(path: str, needles: list[str], failures: list[str]) -> None:
    data = text(path)
    lowered = data.lower()
    for needle in needles:
        require(needle.lower() in lowered, f"{path} missing required text: {needle}", failures)


def main() -> int:
    failures: list[str] = []

    for file_path in REQUIRED_FILES:
        require((ROOT / file_path).is_file(), f"missing required file: {file_path}", failures)

    for dir_path in REQUIRED_DIRS:
        require((ROOT / dir_path).is_dir(), f"missing required directory: {dir_path}", failures)

    if failures:
        print("WEB PROGRAM CONSTITUTION VALIDATION FAIL")
        for failure in failures:
            print(f"- {failure}")
        return 1

    roadmap = text("docs/execution/WEB-MASTER-ROADMAP.md")
    for phase in range(0, 11):
        require(f"WEB-{phase:02d}" in roadmap, f"WEB-MASTER-ROADMAP missing WEB-{phase:02d}", failures)

    contains_all(
        "docs/execution/WEB-API-CONTRACT-REGISTER.md",
        ["No production web API contract accepted yet"],
        failures,
    )

    contains_all(
        "docs/execution/WEB-NON-CLAIMS.md",
        [
            "production auth",
            "DB persistence",
            "real account portal integration",
            "real ops/admin mutation",
            "independent backend",
            "CMS",
            "production deployment",
        ],
        failures,
    )

    contains_all(
        "docs/execution/WEB-OWNERSHIP-MAP.md",
        [
            "apps/web",
            "apps/portal",
            "apps/ops",
            "packages/ui",
            "packages/design-tokens",
            "packages/api-client",
            "packages/contracts",
        ],
        failures,
    )

    contains_all(
        "docs/execution/WEB-PERFORMANCE-BUDGET.md",
        [
            "LCP <= 2.5s",
            "INP <= 200ms",
            "CLS <= 0.1",
            "initial route JS budget",
            "image budget",
            "font loading rules",
            "no heavy animation by default",
            "bundle analysis gate",
        ],
        failures,
    )

    contains_all(
        "docs/execution/WEB-DESIGN-SYSTEM-GOVERNANCE.md",
        [
            "Vietnamese spiritual fantasy",
            "spirit cyan",
            "warm gold",
            "shadow purple",
            "not SaaS dashboard",
        ],
        failures,
    )

    for prompt in [
        "docs/execution/prompts/WEB-01-MONOREPO-FOUNDATION.md",
        "docs/execution/prompts/WEB-02-DESIGN-SYSTEM.md",
        "docs/execution/prompts/WEB-03-PUBLIC-VERTICAL-SLICE.md",
    ]:
        require((ROOT / prompt).is_file(), f"missing prompt: {prompt}", failures)

    if failures:
        print("WEB PROGRAM CONSTITUTION VALIDATION FAIL")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("WEB PROGRAM CONSTITUTION VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
