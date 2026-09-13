#!/usr/bin/env python3
from pathlib import Path
import re

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

def check_portal_home() -> None:
    text = require_text("apps/portal/src/app/page.tsx", [
        "portalHomeVisualPanels.map",
        "Portal home visual panels",
        "loading=\"eager\"",
        "sizes=\"(max-width: 720px) 100vw, 50vw\"",
    ])
    match = re.search(r"portalHomeVisualPanels\.map[\s\S]*?<Image[\s\S]*?/>\s*\)\s*}\s*meta", text)
    if not match:
        fail("apps/portal/src/app/page.tsx: missing portalHomeVisualPanels Image block")
    else:
        block = match.group(0)
        if 'loading={panel.claim === "WORLD_CONCEPT" ? "eager" : "lazy"}' in block or 'loading="lazy"' in block:
            fail("apps/portal/src/app/page.tsx: Portal home visual panel contains lazy loading")
        for forbidden in ["fetch(", "axios", "<form", "use server"]:
            if forbidden in block:
                fail(f"apps/portal/src/app/page.tsx: forbidden marker in visual panel block: {forbidden}")
    fixtures = require_text("apps/portal/src/lib/portal-fixtures.ts", [
        "portalHomeVisualPanels",
        "portal-home-world",
        "portal-home-vo",
        "/game-art/classes/vo-lv1-starter-atlas.webp",
    ])
    if fixtures.count("portal-home-") < 2:
        fail("apps/portal/src/lib/portal-fixtures.ts: expected at least two Portal home visual panels")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-portal-home-visual-lcp-images-v162.spec.ts",
        "docs/execution/specs/WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62.md",
        "LGO-WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-REPORT-v1.62.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-portal-home-visual-lcp-images-v162.spec.ts", [
        "Portal home development art Võ",
        "Portal home Đông Môn world concept",
        "toHaveAttribute(\"loading\", \"eager\")",
        "pageOverflow",
        "naturalWidth",
        "font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62.md",
        "LGO-WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-REPORT-v1.62.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62.md",
    ]:
        require_text(rel, [
            "WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62",
            "WEB_CLOSED",
            "Portal home visual images",
            "loading=\"eager\"",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62 WEB_CLOSED",
        "WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_portal_home()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PORTAL HOME VISUAL LCP IMAGES v1.62 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PORTAL HOME VISUAL LCP IMAGES v1.62 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
