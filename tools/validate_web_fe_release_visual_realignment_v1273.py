#!/usr/bin/env python3
from pathlib import Path
import hashlib

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
    require("apps/web/src/app/release/page.tsx", "@lgo-web/ui/release-landing-layout.css", "PublicReleaseLanding", 'variant="immersive"')
    require("apps/web/src/components/PublicReleaseLanding.tsx", "releaseNarrativeStages", "releaseReadinessHubItems", "lgo-release-stage-gateway", "lgo-release-stage-card", "lgo-release-readiness-strip", "chưa có gói tải game công khai")
    require("apps/web/src/components/PublicReleaseLanding.tsx", "/game-art/marketing/discovery-world.png", "/game-art/marketing/hero-traveler.png", "/game-art/start-target/open-gate.png")
    forbid("apps/web/src/app/release/page.tsx", "ReleaseNarrativeStageBoard", "ReleaseReadinessHubCta", "lgo-release-narrative-design-board", "lgo-release-expanded-evidence")
    require("packages/ui/src/release-landing-layout.css", "immersive-shell.css", "grid-template-columns:repeat(6", "@media(max-width:620px)", "forced-colors", "prefers-reduced-motion")
    require("tests/e2e/fe-release-visual-realignment-v1273.spec.ts", "release visual realignment v1.273", "exactly six canonical release stages", "clean project artwork", "320px")
    fixtures = require("packages/content/src/fixtures.ts", "export const releaseNarrativeStages", "M0 — Sẵn sàng nội dung", "Kiểm tra tin cậy", "Điều kiện closed test", "Contract backend", "Owner phê duyệt", "M1 — Closed test có điều kiện")
    if fixtures.count('nextSafeRoute:') < 6: fail("release stage route contract unexpectedly shallow")

    expected = {
        "apps/web/public/design-reference/release-detailed-design-target-v1127.png": "fcf63435f5a4ca75fcbed63a9ee9b69495a187ae6a5ba24960f5e687453d5562",
        "apps/web/public/game-art/marketing/discovery-world.png": "b703a74303b7b376804b1ad4804e3c54c75cfcd1639113ee28a1926fe8d41d9e",
        "apps/web/public/game-art/marketing/hero-traveler.png": "44ebffae955f423d6cb9d3f6406d4b64470b76f4ea9c95d4bdcd47044db2ac62",
        "apps/web/public/game-art/start-target/open-gate.png": "4f3080cb1831ebf3ce3ebc7a9e5412106e4892c8e0ad0b13bff347875a5b3fd7",
    }
    for rel, digest in expected.items():
        actual = sha(rel)
        if actual and actual != digest: fail(f"hash drift {rel}: {actual}")

    if ERRORS:
        print("WEB FE RELEASE VISUAL REALIGNMENT v1.273 VALIDATION FAIL")
        for error in ERRORS: print("- " + error)
        return 1
    print("WEB FE RELEASE VISUAL REALIGNMENT v1.273 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
