#!/usr/bin/env python3
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

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text

def check_portal_access_visual() -> None:
    require_file("apps/portal/public/game-art/world/dong-mon-skyline.webp")
    require_text("apps/portal/src/components/AccessJourney.tsx", [
        "lgo-access-journey",
        "lgo-access-journey-visual",
        "/game-art/world/dong-mon-skyline.webp",
        "Portal access gate art",
        "loading=\"eager\"",
        "Auth/DB/API contract",
    ])
    require_text("apps/portal/src/app/globals.css", [
        "WEB v1.68 Portal access journey real game-art visual",
        ".lgo-access-journey",
        ".lgo-access-journey-visual",
        ".lgo-access-journey-visual img",
        "grid-template-columns: 1fr",
        "overflow-wrap: anywhere",
    ])
    for forbidden in ["fetch(", "axios", "app/api"]:
        if forbidden in read("apps/portal/src/components/AccessJourney.tsx"):
            fail(f"AccessJourney contains forbidden backend marker: {forbidden}")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-portal-access-journey-visual-v168.spec.ts",
        "docs/execution/specs/WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68.md",
        "LGO-WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-REPORT-v1.68.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-portal-access-journey-visual-v168.spec.ts", [
        "/login",
        "Portal access gate art",
        "/game-art/world/dong-mon-skyline.webp",
        "loading",
        "naturalWidth",
        "Portal login horizontal overflow",
        "keyboard navigation",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68.md",
        "LGO-WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-REPORT-v1.68.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68.md",
    ]:
        require_text(rel, [
            "WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68",
            "WEB_CLOSED",
            "AccessJourney",
            "Portal access gate art",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68 WEB_CLOSED",
        "WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.69",
        "browser/e2e",
    ])

def main() -> int:
    check_portal_access_visual()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PORTAL ACCESS JOURNEY VISUAL v1.68 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PORTAL ACCESS JOURNEY VISUAL v1.68 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
