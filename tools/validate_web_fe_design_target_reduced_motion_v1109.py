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
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.109 reduced motion for design target links",
        "@media (prefers-reduced-motion: reduce)",
        ".lgo-design-target-reference-link",
        "transition: none;",
        "transform: none;",
    ])
    require_text("packages/ui/src/shell.css", [
        "WEB v1.109 workspace reduced motion for design target links",
        "@media (prefers-reduced-motion: reduce)",
        ".lgo-workspace-shell .lgo-design-target-reference-link",
        "transition: none;",
        "transform: none;",
    ])

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-design-target-reduced-motion-v1109.spec.ts",
        "docs/execution/specs/WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109.md",
        "LGO-WEB-FE-DESIGN-TARGET-REDUCED-MOTION-REPORT-v1.109.md",
        "HANDOFF-LGO-WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-design-target-reduced-motion-v1109.spec.ts", [
        "design target reduced motion focus",
        "reducedMotion: \"reduce\"",
        "transform",
        "transitionDuration",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109.md",
        "LGO-WEB-FE-DESIGN-TARGET-REDUCED-MOTION-REPORT-v1.109.md",
        "HANDOFF-LGO-WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109.md",
    ]:
        require_text(rel, [
            "WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "prefers-reduced-motion",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Component/state", "Public Core", "Player Portal", "Ops/Admin"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.110",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.110", "Design Target First", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_source()
    check_tests_docs()
    if ERRORS:
        print("WEB FE DESIGN TARGET REDUCED MOTION v1.109 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE DESIGN TARGET REDUCED MOTION v1.109 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
