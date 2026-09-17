#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")


def main() -> int:
    require_file("apps/web/src/app/support/safety/page.tsx")
    require_file("apps/web/src/components/PublicPlayerSafetySections.tsx")
    require_file("docs/execution/WEB-PUBLIC-PLAYER-SAFETY-SUPPORT-FAQ-POLISH-v1.14.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-PLAYER-SAFETY-SUPPORT-FAQ-POLISH-CHECKLIST-v1.14.md")
    for rel, needles in {
        "packages/content/src/types.ts": [
            "PlayerSafetyPrinciple", "SupportIssuePath", "ClosedTestSupportExpectation", "CommunityConductRule"
        ],
        "packages/content/src/fixtures.ts": [
            "playerSafetyPrinciples", "supportIssuePaths", "closedTestSupportExpectations", "communityConductRules",
            "player-safety-support-guide", "player-safety-support-faq-polish-started", "No secure ticket inbox"
        ],
        "packages/content/src/index.ts": [
            "playerSafetyPrinciples", "supportIssuePaths", "closedTestSupportExpectations", "communityConductRules"
        ],
        "apps/web/src/components/PublicPlayerSafetySections.tsx": [
            "PlayerSafetyPrinciplesBoard", "SupportIssuePathBoard", "ClosedTestSupportBoard", "CommunityConductBoard", "PlayerSafetySupportCta"
        ],
        "apps/web/src/components/PublicSupportSafetyExperience.tsx": [
            "Báo lỗi an toàn", "Chưa có ticket thật", "chưa tra cứu tài khoản", "chưa có bảng kiểm duyệt"
        ],
        "packages/content/src/public-ia.ts": ["/support/safety", "/guides/player-safety-support-guide"],
        "apps/web/src/app/sitemap.ts": ["publicRouteMatrix", "indexability"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No secure ticket inbox", "No production support SLA", "No moderation dashboard"]
    }.items():
        for needle in needles:
            require_text(rel, needle)
    # Guard against unsafe promises in the safety work.
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/support/safety/page.tsx", "apps/web/src/components/PublicSupportSafetyExperience.tsx", "packages/ui/src/privacy-guidance.tsx"]:
        text = read(rel).lower()
        for forbidden in ["ticket id", "guaranteed response", "sla guaranteed", "account recovery is available", "moderation dashboard is available"]:
            if forbidden in text:
                fail(f"{rel} contains unsafe support promise marker: {forbidden}")
    if ERRORS:
        print("WEB PUBLIC PLAYER SAFETY SUPPORT FAQ POLISH VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1
    print("WEB PUBLIC PLAYER SAFETY SUPPORT FAQ POLISH VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
