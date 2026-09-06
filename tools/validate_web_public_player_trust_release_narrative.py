#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")

def main() -> int:
    require_file("apps/web/src/app/release/page.tsx")
    require_file("apps/web/src/components/PublicPlayerTrustReleaseSections.tsx")
    require_file("docs/execution/WEB-PUBLIC-PLAYER-TRUST-RELEASE-NARRATIVE-v1.18.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-PLAYER-TRUST-RELEASE-NARRATIVE-CHECKLIST-v1.18.md")
    checks = {
        "packages/content/src/types.ts": [
            "PlayerTrustSignal", "ReleaseNarrativeStage", "ClosedTestReadinessCheck", "TrustJourneyCheckpoint"
        ],
        "packages/content/src/fixtures.ts": [
            "playerTrustSignals", "releaseNarrativeStages", "closedTestReadinessChecks", "trustJourneyCheckpoints",
            "player-trust-release-narrative-started", "player-trust-release-guide", "proof-before-claim", "No public build"
        ],
        "packages/content/src/index.ts": [
            "playerTrustSignals", "releaseNarrativeStages", "closedTestReadinessChecks", "trustJourneyCheckpoints"
        ],
        "packages/content/src/content.test.ts": [
            "keeps WEB v1.18 player trust/release narrative bounded", "playerTrustSignals", "trustJourneyCheckpoints"
        ],
        "apps/web/src/components/PublicPlayerTrustReleaseSections.tsx": [
            "PlayerTrustSignalBoard", "ReleaseNarrativeStageBoard", "ClosedTestReadinessBoard", "TrustJourneyCheckpointBoard", "PlayerTrustReleaseCta"
        ],
        "apps/web/src/app/release/page.tsx": [
            "Release narrative", "No public build", "no open beta", "PlayerTrustSignalBoard", "ClosedTestReadinessBoard"
        ],
        "apps/web/src/app/globals.css": [
            "WEB v1.18 player trust", "lgo-player-trust-release-cta", "lgo-trust-journey-item"
        ],
        "apps/web/src/components/PublicNavigation.tsx": ["/release", "Release"],
        "apps/web/src/app/sitemap.ts": ["/release", "/guides/player-trust-release-guide"],
        "apps/web/src/app/page.tsx": ["WEB v1.18 player trust", "/release", "PlayerTrustReleaseCta"],
        "apps/web/src/app/start/page.tsx": ["PlayerTrustReleaseCta", "TrustJourneyCheckpointBoard"],
        "apps/web/src/app/download/page.tsx": ["PlayerTrustReleaseCta", "ClosedTestReadinessBoard"],
        "apps/web/src/app/download/trust/page.tsx": ["PlayerTrustReleaseCta", "ReleaseNarrativeStageBoard"],
        "apps/web/src/app/status/page.tsx": ["PlayerTrustReleaseCta", "TrustJourneyCheckpointBoard"],
        "apps/web/src/app/support/safety/page.tsx": ["PlayerTrustReleaseCta", "ClosedTestReadinessBoard"],
        "apps/web/src/app/community/onboarding/page.tsx": ["PlayerTrustReleaseCta", "ReleaseNarrativeStageBoard"],
        "apps/web/src/app/roadmap/page.tsx": ["PlayerTrustReleaseCta", "ReleaseNarrativeStageBoard"],
        "apps/web/src/app/journey/page.tsx": ["PlayerTrustReleaseCta", "TrustJourneyCheckpointBoard"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_PLAYER_TRUST_RELEASE_NARRATIVE_READY_v1.18"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-RELEASE-READINESS-HUB-POLISH-v1.19", "WEB-08-GAME-CONTRACT-SYNC-v1.0"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No public build", "No open beta", "No closed-test entitlement automation", "No reward/economy promise"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)
    forbidden = [
        "open beta is live", "public build available", "claim closed-test slot",
        "create account now", "reserve reward", "join open beta", "entitlement enabled"
    ]
    for rel in [
        "packages/content/src/fixtures.ts",
        "apps/web/src/app/release/page.tsx",
        "apps/web/src/components/PublicPlayerTrustReleaseSections.tsx"
    ]:
        text = read(rel).lower()
        for marker in forbidden:
            if marker in text:
                fail(f"{rel} contains forbidden release/conversion marker: {marker}")
    if ERRORS:
        print("WEB PUBLIC PLAYER TRUST RELEASE NARRATIVE VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC PLAYER TRUST RELEASE NARRATIVE VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
