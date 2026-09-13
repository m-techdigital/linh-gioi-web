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


def check_sources() -> None:
    portal = require_text("apps/portal/src/app/page.tsx", [
        "VisualProofGrid",
        "VisualProofCard",
        "portalHomeVisualPanels",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "next/image",
        "Tổng quan hình ảnh hành trình",
    ])
    ops = require_text("apps/ops/src/app/page.tsx", [
        "VisualProofGrid",
        "VisualProofCard",
        "opsHomeVisualPanels",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "NO_REAL_OPS_MUTATION",
        "next/image",
        "Bản đồ vận hành trực quan",
    ])
    require_text("apps/portal/src/lib/portal-fixtures.ts", [
        "portalHomeVisualPanels",
        "/game-art/world/dong-mon-skyline.webp",
        "/game-art/classes/vo-lv1-starter-atlas.webp",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    require_text("apps/ops/src/lib/ops-fixtures.ts", [
        "opsHomeVisualPanels",
        "/game-art/world/dong-mon-skyline.webp",
        "/game-art/classes/vo-lv1-skill-atlas.webp",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    for name, text in [("portal home", portal), ("ops home", ops)]:
        for forbidden in [r"\bfetch\s*\(", r"\baxios\b", r"<form\b", r"\bformAction\s*=", r"[\"']use server[\"']"]:
            if re.search(forbidden, text):
                fail(f"{name}: forbidden operational marker {forbidden}")


def check_tests_and_docs() -> None:
    required = [
        "tests/e2e/fe-continued-surface-polish-v141.spec.ts",
        "docs/execution/specs/WEB-FE-CONTINUED-SURFACE-POLISH-v1.41.md",
        "LGO-WEB-FE-CONTINUED-SURFACE-POLISH-REPORT-v1.41.md",
        "HANDOFF-LGO-WEB-FE-CONTINUED-SURFACE-POLISH-v1.41.md",
    ]
    for rel in required:
        require_file(rel)
    e2e = require_text("tests/e2e/fe-continued-surface-polish-v141.spec.ts", [
        "portal home",
        "ops home",
        "font-size/layout/image/overflow",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "no mutation controls",
    ])
    if "portal}/`" not in e2e or "ops}/`" not in e2e:
        fail("v1.41 e2e must visit Portal and Ops home routes")
    for rel in [
        "docs/execution/specs/WEB-FE-CONTINUED-SURFACE-POLISH-v1.41.md",
        "LGO-WEB-FE-CONTINUED-SURFACE-POLISH-REPORT-v1.41.md",
        "HANDOFF-LGO-WEB-FE-CONTINUED-SURFACE-POLISH-v1.41.md",
    ]:
        require_text(rel, [
            "WEB-FE-CONTINUED-SURFACE-POLISH-v1.41",
            "WEB_CLOSED",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-CONTINUED-SURFACE-POLISH-v1.41 WEB_CLOSED",
        "WEB-FE-CONTINUED-SURFACE-POLISH-v1.41",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-CONTINUED-SURFACE-POLISH-v1.41 | WEB-FE | WEB_CLOSED |",
        "WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42",
        "browser/e2e",
    ])


def main() -> int:
    check_sources()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE CONTINUED SURFACE POLISH v1.41 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE CONTINUED SURFACE POLISH v1.41 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
