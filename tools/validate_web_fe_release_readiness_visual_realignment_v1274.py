#!/usr/bin/env python3
from pathlib import Path
from web_fixture_source import fixture_source
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    if rel == "packages/content/src/fixtures.ts": return fixture_source(ROOT)
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
    require("apps/web/src/app/release/readiness/page.tsx", "@lgo-web/ui/release-readiness-landing-layout.css", 'variant="immersive"', "lgo-release-readiness-landing lgo-release-layout", "<ReleaseReadinessHero />", '<OwnerReleaseGateBoard presentation="release" />', "<ReleaseReadinessPlayerNextSteps />")
    forbid("apps/web/src/app/release/readiness/page.tsx", "ReleaseReadinessHubBoard", "lgo-release-more-evidence", "release-readiness-production-board.svg")
    require("apps/web/src/components/PublicReleaseReadinessExperience.tsx", "ownerReleaseGates.map", "readinessState", "NO_ACCEPTED_BACKEND_CONTRACT", "/game-art/marketing/discovery-world.png", "/game-art/marketing/hero-traveler.png", "/download/trust", "/status", "/support/safety", "/release/tester-pack")
    forbid("apps/web/src/components/PublicReleaseReadinessExperience.tsx", "role=\"progressbar\"", "aria-valuenow", "<form")
    require("packages/ui/src/release-readiness-landing-layout.css", "immersive-shell.css", "release-layout.css", "grid-template-columns:minmax(0,1fr)", "overflow-x:auto", "scroll-snap-type:x proximity", ".lgo-hero-lead { font-size:.875rem; }", "forced-colors")
    exports = json.loads(read("packages/ui/package.json")).get("exports", {})
    if exports.get("./release-readiness-landing-layout.css") != "./src/release-readiness-landing-layout.css": fail("missing release readiness stylesheet export")
    require("tests/e2e/fe-release-readiness-visual-realignment-v1274.spec.ts", "release readiness visual realignment v1.274", "four canonical owner gates", "clean project artwork", "heroWidth", "viewportWidth", "three truthful next routes")
    require("packages/content/src/fixtures.ts", "export const ownerReleaseGates", 'gate: "Gói phát hành"', 'gate: "Giới hạn đã biết"', 'gate: "Tiếp nhận tester"', 'gate: "Owner phê duyệt"')

    expected = {
        "docs/design/reference/WEB-FE-RELEASE-READINESS-DETAILED-DESIGN-TARGET-v1.128.png": "54f6598e85630b57310a435d06ce3af34f9f3a239553e941e34ef417abcf5854",
        "apps/web/public/game-art/marketing/discovery-world.png": "b703a74303b7b376804b1ad4804e3c54c75cfcd1639113ee28a1926fe8d41d9e",
        "apps/web/public/game-art/marketing/hero-traveler.png": "44ebffae955f423d6cb9d3f6406d4b64470b76f4ea9c95d4bdcd47044db2ac62",
    }
    for rel, digest in expected.items():
        actual = sha(rel)
        if actual and actual != digest: fail(f"hash drift {rel}: {actual}")

    if ERRORS:
        print("WEB FE RELEASE READINESS VISUAL REALIGNMENT v1.274 VALIDATION FAIL")
        for error in ERRORS: print("- " + error)
        return 1
    print("WEB FE RELEASE READINESS VISUAL REALIGNMENT v1.274 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
