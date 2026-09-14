#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")

def check_source() -> None:
    require_text("apps/web/src/components/PublicNavigation.tsx", [
        "RouteAwareLink",
        "lgo-nav-play",
        'href="/download"',
        'currentWhen="section"',
        "Trạng thái chơi",
    ])
    text = read("apps/web/src/components/PublicNavigation.tsx")
    if 'href="/download" currentWhen="exact"' in text:
        fail("apps/web/src/components/PublicNavigation.tsx: download CTA still uses exact matching")
    require_text("packages/ui/src/route-aware-link.tsx", [
        "currentWhen?: \"exact\" | \"section\"",
        "startsWith(`${target}/`)",
        "aria-current={current ? \"page\"",
        "data-current={current ? \"page\"",
    ])

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-download-nav-section-v1112.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112.md",
        "LGO-WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-REPORT-v1.112.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-download-nav-section-v1112.spec.ts", [
        "public download section navigation continuity",
        "/download/trust",
        "Trạng thái chơi",
        "aria-current",
        "page",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112.md",
        "LGO-WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-REPORT-v1.112.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Service",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Service", "Component/state"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.113",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.113", "Design Target First", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_source()
    check_tests_docs()
    if ERRORS:
        print("WEB FE PUBLIC DOWNLOAD NAV SECTION v1.112 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC DOWNLOAD NAV SECTION v1.112 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
