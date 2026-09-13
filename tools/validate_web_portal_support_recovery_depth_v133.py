#!/usr/bin/env python3
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
        ERRORS.append(f"{rel} contains forbidden text: {needle}")


def main() -> int:
    data = "packages/ui/src/data.tsx"
    index = "packages/ui/src/index.ts"
    css = "packages/ui/src/data.css"
    for symbol in ("CaseSummary", "CaseSummaryItem"):
        require(data, f"export function {symbol}")
        require(index, symbol)
    require(css, ".lgo-case-summary")
    require(css, ".lgo-case-summary-item")

    fixtures = "apps/portal/src/lib/portal-fixtures.ts"
    for marker in (
        "portalSupportTopics",
        "portalSupportCaseFixtures",
        "portalRecoveryFixture",
        "PROVISIONAL_WEB_FIXTURE",
        "NOT_CANONICAL_BACKEND_CONTRACT",
    ):
        require(fixtures, marker)

    routes = {
        "apps/portal/src/app/support/page.tsx": (
            "CaseSummary",
            "ActivityTimeline",
            "portalSupportTopics",
            "portalSupportCaseFixtures",
            "InlineFeedback",
        ),
        "apps/portal/src/app/recovery/page.tsx": (
            "CaseSummary",
            "ActivityTimeline",
            "portalRecoveryFixture",
            "FormField",
            "TextInput",
            "FormActions",
        ),
    }
    for rel, markers in routes.items():
        for marker in markers:
            require(rel, marker)
        require(rel, "PROVISIONAL_WEB_FIXTURE")
        require(rel, "NOT_CANONICAL_BACKEND_CONTRACT")
        forbid(rel, "fetch(")
        forbid(rel, "axios")
        forbid(rel, "<form")

    require("apps/portal/src/app/recovery/page.tsx", "disabled")
    support_text = read("apps/portal/src/app/support/page.tsx")
    if "disabled" not in support_text and "aria-disabled" not in read("packages/ui/src/primitives.tsx"):
        ERRORS.append("apps/portal/src/app/support/page.tsx missing blocked/disabled support action evidence")

    if ERRORS:
        print("WEB PORTAL SUPPORT RECOVERY DEPTH v1.33 VALIDATION FAIL")
        for error in ERRORS:
            print("-", error)
        return 1
    print("WEB PORTAL SUPPORT RECOVERY DEPTH v1.33 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
