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

def check_shared_ui() -> None:
    require_text("packages/ui/src/primitives.tsx", [
        "export type DesignTargetReferenceProps",
        "export function DesignTargetReference",
        "role=\"region\"",
        "aria-label=\"Design target reference\"",
        "Design Target First",
        "lgo-design-target-reference-link",
    ])
    require_text("packages/ui/src/index.ts", [
        "DesignTargetReference",
        "DesignTargetReferenceProps",
    ])

def check_public_attachment() -> None:
    require_file("apps/web/src/components/PublicDesignTargetReference.tsx")
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "use client",
        "usePathname",
        "Public Core design target",
        "/design-reference/design-atlas-public-core-v195.png",
        "Public Service design target",
        "/design-reference/design-atlas-public-service-v195.png",
        "publicServicePrefixes",
        "Base UI/UX Layout",
    ])
    require_text("apps/web/src/components/PublicSiteShell.tsx", [
        "PublicDesignTargetReference",
        "lgo-design-target-band",
    ])
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.97 public design target attachment",
        ".lgo-design-target-reference",
        ".lgo-design-target-reference-link",
        "@media (max-width: 720px)",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-design-target-attachment-v197.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97.md",
        "LGO-WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-REPORT-v1.97.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-design-target-attachment-v197.spec.ts", [
        "public design target attachment",
        "Design target reference",
        "Public Core design target",
        "Public Service design target",
        "Base UI/UX Layout",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97.md",
        "LGO-WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-REPORT-v1.97.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "browser/e2e",
            "Public Core",
            "Public Service",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.98",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.98",
        "Design Target First",
        "Base UI/UX Layout",
        "browser/e2e",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97 | WEB-FE | WEB_CLOSED |",
    ])

def main() -> int:
    check_shared_ui()
    check_public_attachment()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC DESIGN TARGET ATTACHMENT v1.97 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC DESIGN TARGET ATTACHMENT v1.97 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
