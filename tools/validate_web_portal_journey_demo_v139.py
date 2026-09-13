#!/usr/bin/env python3
"""Portal journey demo-data source gate for v1.39."""
from __future__ import annotations

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


def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text


def check_portal_journey() -> None:
    require_text("apps/portal/src/lib/portal-fixtures.ts", [
        "portalJourneyFixture",
        "artPanels",
        "/game-art/world/dong-mon-skyline.webp",
        "/game-art/classes/vo-lv1-starter-atlas.webp",
        "/game-art/classes/vo-lv1-skill-atlas.webp",
        "PROVISIONAL_WEB_FIXTURE",
        "NOT_CANONICAL_BACKEND_CONTRACT",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "journeySteps",
        "nextActions",
        "recentActivity",
    ])
    require_text("apps/portal/src/app/layout.tsx", [
        'href: "/journey"',
        'label: "Hành trình"',
    ])
    journey = require_text("apps/portal/src/app/journey/page.tsx", [
        "WorkspacePage",
        "ProgressSteps",
        "ProgressStep",
        "ActivityTimeline",
        "ActivityTimelineItem",
        "DataList",
        "DataListItem",
        "Image",
        "portalJourneyFixture",
        "lgo-journey-art-grid",
        "PROVISIONAL_WEB_FIXTURE",
        "NOT_CANONICAL_BACKEND_CONTRACT",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "/account",
        "/characters",
        "/support",
    ])
    for forbidden in [
        r"\bfetch\s*\(",
        r"\baxios\b",
        r"<form\b",
        r"\bformAction\s*=",
        r"\baction\s*=",
        r"[\"']use server[\"']",
    ]:
        if re.search(forbidden, journey):
            fail(f"apps/portal/src/app/journey/page.tsx: forbidden operational marker {forbidden}")
    require_text("apps/portal/public/game-art/manifest.json", [
        "portal-journey-dong-mon-world-concept",
        "portal-journey-vo-starter-development-art",
        "portal-journey-vo-skill-development-art",
        "7c99154110e4f1a6fe7755be259d79f826818d8692468033c451ab79cc009f5f",
        "a931d3afefc1dc82a58a4818ae1399ebede12be1d0dd0481e5a2d439eb66d38a",
        "9bd9933c10d99658fdca275ff8b7c705b10db69b36c05558e0b9d7f31263b0c8",
    ])
    for rel in [
        "apps/portal/public/game-art/world/dong-mon-skyline.webp",
        "apps/portal/public/game-art/classes/vo-lv1-starter-atlas.webp",
        "apps/portal/public/game-art/classes/vo-lv1-skill-atlas.webp",
    ]:
        if not (ROOT / rel).is_file():
            fail(f"missing file: {rel}")


def check_docs_and_evidence() -> None:
    for rel in [
        "docs/execution/specs/WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39.md",
        "LGO-WEB-PORTAL-JOURNEY-DEMO-DATA-REPORT-v1.39.md",
        "HANDOFF-LGO-WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39.md",
    ]:
        require_text(rel, [
            "WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39",
            "PROVISIONAL_WEB_FIXTURE",
            "NOT_CANONICAL_BACKEND_CONTRACT",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "game-art",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
        ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40",
        "browser/e2e",
        "No independent backend",
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39",
        "WEB_CLOSED",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39",
        "WEB_CLOSED",
    ])


def main() -> int:
    check_portal_journey()
    check_docs_and_evidence()
    if ERRORS:
        print("WEB PORTAL JOURNEY DEMO DATA v1.39 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PORTAL JOURNEY DEMO DATA v1.39 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
