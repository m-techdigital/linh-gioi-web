#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(msg: str) -> None: ERRORS.append(msg)
def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return ""
    return p.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel): fail(f"{rel} missing required text: {needle}")
def main() -> int:
    require_file("apps/web/src/app/release/tester-pack/page.tsx")
    require_file("apps/web/src/components/PublicClosedTesterInformationPackSections.tsx")
    require_file("docs/execution/WEB-PUBLIC-CLOSED-TESTER-INFORMATION-PACK-v1.20.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-CLOSED-TESTER-INFORMATION-PACK-CHECKLIST-v1.20.md")
    checks = {
        "packages/content/src/types.ts": ["ClosedTesterChecklistItem", "SafeFeedbackTemplate", "KnownLimitationNote", "DeviceReportTemplateField"],
        "packages/content/src/fixtures.ts": ["closedTesterChecklist", "safeFeedbackTemplates", "knownLimitationNotes", "deviceReportTemplateFields", "closed-tester-information-pack-started", "closed-tester-information-pack-guide", "No live tester intake", "No live tester intake"],
        "packages/content/src/index.ts": ["closedTesterChecklist", "safeFeedbackTemplates", "knownLimitationNotes", "deviceReportTemplateFields"],
        "packages/content/src/content.test.ts": ["keeps WEB v1.20 closed tester information pack bounded", "closedTesterChecklist", "safeFeedbackTemplates"],
        "apps/web/src/components/PublicClosedTesterInformationPackSections.tsx": ["ClosedTesterChecklistBoard", "SafeFeedbackTemplateBoard", "KnownLimitationNotesBoard", "DeviceReportTemplateBoard", "ClosedTesterInformationPackCta"],
        "apps/web/src/app/release/tester-pack/page.tsx": ["Closed tester information", "ClosedTesterChecklistBoard", "SafeFeedbackTemplateBoard", "No live intake"],
        "apps/web/src/app/globals.css": ["WEB v1.20 closed tester information pack", "lgo-closed-tester-info-cta", "lgo-device-report-item"],
        "apps/web/src/components/PublicNavigation.tsx": ["/release/tester-pack", "Tester pack"],
        "apps/web/src/app/sitemap.ts": ["/release/tester-pack", "/guides/closed-tester-information-pack-guide"],
        "apps/web/src/app/page.tsx": ["ClosedTesterInformationPackCta", "WEB v1.20 closed tester information pack"],
        "apps/web/src/app/release/readiness/page.tsx": ["ClosedTesterInformationPackCta", "ClosedTesterChecklistBoard"],
        "apps/web/src/app/download/page.tsx": ["ClosedTesterInformationPackCta", "KnownLimitationNotesBoard"],
        "apps/web/src/app/support/safety/page.tsx": ["SafeFeedbackTemplateBoard", "DeviceReportTemplateBoard"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_CLOSED_TESTER_INFORMATION_PACK_READY_v1.20"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-FAQ-SEARCH-AND-HELPFULNESS-POLISH-v1.21", "WEB-08-GAME-CONTRACT-SYNC-v1.0"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No live tester intake", "No collection of passwords, tokens, payment data or sensitive personal data"]
    }
    for rel, needles in checks.items():
        for needle in needles: require_text(rel, needle)
    forbidden = ["register now", "join open beta", "claim tester slot", "enter password", "upload token", "payment card", "tester entitlement enabled"]
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/release/tester-pack/page.tsx", "apps/web/src/components/PublicClosedTesterInformationPackSections.tsx"]:
        text = read(rel).lower()
        for marker in forbidden:
            if marker in text: fail(f"{rel} contains forbidden tester-pack marker: {marker}")
    if ERRORS:
        print("WEB PUBLIC CLOSED TESTER INFORMATION PACK VALIDATION FAIL")
        [print(f"- {e}") for e in ERRORS]
        return 1
    print("WEB PUBLIC CLOSED TESTER INFORMATION PACK VALIDATION PASS")
    return 0
if __name__ == "__main__": sys.exit(main())
