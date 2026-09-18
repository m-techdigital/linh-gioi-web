#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        ERRORS.append(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

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
    for symbol in ("KeyValueGrid", "KeyValueItem"):
        require(data, f"export function {symbol}")
        require(index, symbol)
    require(css, ".lgo-key-value-grid")
    require(css, ".lgo-key-value-item")

    fixtures = "apps/portal/src/lib/portal-fixtures.ts"
    for marker in (
        "PROVISIONAL_WEB_FIXTURE",
        "NOT_CANONICAL_BACKEND_CONTRACT",
        "portalAccountFixture",
        "portalSessionFixtures",
        "portalCharacterFixtures",
    ):
        require(fixtures, marker)

    routes = {
        "apps/portal/src/app/page.tsx": ("DataList", "LinkButton", "lgo-portal-overview-grid", "NO_ACCEPTED_BACKEND_CONTRACT"),
        "apps/portal/src/app/account/page.tsx": ("KeyValueGrid", "DataList", "LinkButton"),
        "apps/portal/src/app/account/security/page.tsx": ("VisualProofGrid", "DataList", "InlineFeedback", "NO_ACCEPTED_BACKEND_CONTRACT"),
        "apps/portal/src/app/account/sessions/page.tsx": ("DataTable", "PaginationBar", "portalSessionFixtures"),
        "apps/portal/src/app/characters/page.tsx": ("LinkButton", "StatusBadge", "Character slot roster"),
        "apps/portal/src/app/characters/[id]/page.tsx": ("KeyValueGrid", "DataList", "portalCharacterFixtures", "LinkButton"),
    }
    for rel, markers in routes.items():
        for marker in markers:
            require(rel, marker)
        require(rel, "PROVISIONAL_WEB_FIXTURE")
        require(rel, "NOT_CANONICAL_BACKEND_CONTRACT")

    for rel in routes:
        forbid(rel, "fetch(")
        forbid(rel, "axios")
        forbid(rel, "<form")

    if ERRORS:
        print("WEB PORTAL ACCOUNT CHARACTER DEPTH v1.31 VALIDATION FAIL")
        for e in ERRORS:
            print("-", e)
        return 1
    print("WEB PORTAL ACCOUNT CHARACTER DEPTH v1.31 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
