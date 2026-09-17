#!/usr/bin/env python3
from pathlib import Path
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require(rel: str, *needles: str) -> str:
    text = read(rel)
    for needle in needles:
        if needle not in text: fail(f"{rel} missing {needle}")
    return text
def forbid(rel: str, *needles: str) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text: fail(f"{rel} contains historical marker {needle}")
def sha(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing {rel}"); return ""
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main() -> int:
    require("apps/web/src/app/release/tester-pack/page.tsx", "@lgo-web/ui/tester-pack-landing-layout.css", 'variant="immersive"', "lgo-tester-pack-landing lgo-release-layout", "TesterPackHero", "TesterPackShortcuts", "TesterPackFeedback", "lgo-tester-pack-secondary")
    forbid("apps/web/src/app/release/tester-pack/page.tsx", "lgo-testerpackpage-stack", "lgo-service-compact-proof-page", "ClosedTesterChecklistBoard", "SafeFeedbackTemplateBoard")
    require("apps/web/src/components/PublicTesterPackExperience.tsx", "lgo-tester-pack-hero", "lgo-tester-pack-primary-grid", "/game-art/marketing/discovery-world.png", "/game-art/marketing/hero-traveler.png", "Chưa mở intake", "Không hứa slot", "NO_ACCEPTED_BACKEND_CONTRACT")
    forbid("apps/web/src/components/PublicTesterPackExperience.tsx", "<form", "input type=", "design-reference", "design-boards")
    require("packages/ui/src/tester-pack-landing-layout.css", "immersive-shell.css", "release-layout.css", "grid-template-columns:minmax(0,1fr)", "repeat(5,minmax(0,1fr))", "lgo-tester-pack-primary-grid", "font-size:.95rem", "forced-colors", "prefers-reduced-motion")
    exports = json.loads(read("packages/ui/package.json")).get("exports", {})
    if exports.get("./tester-pack-landing-layout.css") != "./src/tester-pack-landing-layout.css": fail("missing tester-pack stylesheet export")
    require("tests/e2e/fe-release-tester-pack-visual-realignment-v1275.spec.ts", "release tester pack visual realignment v1.275", "five truthful tester shortcuts", "clean cinematic project artwork", "native secondary disclosure", "NO_ACCEPTED_BACKEND_CONTRACT", "320px")
    require("packages/content/src/fixtures.ts", "closedTesterChecklist", "deviceReportTemplateFields", "knownLimitationNotes", "safeFeedbackTemplates")

    expected = {
        "apps/web/public/design-reference/tester-pack-detailed-design-target-v1129.png": "e96488858a84c4b004cb8f7799aa7d58a17b7928cfe0e692fab3c3cf6a5c0f27",
        "apps/web/public/game-art/marketing/discovery-world.png": "b703a74303b7b376804b1ad4804e3c54c75cfcd1639113ee28a1926fe8d41d9e",
        "apps/web/public/game-art/marketing/hero-traveler.png": "44ebffae955f423d6cb9d3f6406d4b64470b76f4ea9c95d4bdcd47044db2ac62",
    }
    for rel, digest in expected.items():
        actual = sha(rel)
        if actual and actual != digest: fail(f"hash drift {rel}: {actual}")

    if ERRORS:
        print("WEB FE RELEASE TESTER PACK VISUAL REALIGNMENT v1.275 VALIDATION FAIL")
        for error in ERRORS: print("- " + error)
        return 1
    print("WEB FE RELEASE TESTER PACK VISUAL REALIGNMENT v1.275 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
