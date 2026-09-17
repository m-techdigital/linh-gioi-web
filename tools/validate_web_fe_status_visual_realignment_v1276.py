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
    require("apps/web/src/app/status/page.tsx", "@lgo-web/ui/status-landing-layout.css", 'variant="immersive"', "lgo-status-landing lgo-release-layout lgo-status-experience", "PublicStatusHero", "PublicStatusSurfaces", "PublicStatusTrustAndMaintenance", "PublicStatusNextSteps")
    forbid("apps/web/src/app/status/page.tsx", "lgo-statuspage-stack", "lgo-service-compact-proof-page", "lgo-status-design-board")
    require("apps/web/src/components/PublicStatusExperience.tsx", "lgo-status-hero", "lgo-status-traveler", "lgo-status-surfaces", "lgo-status-trust-grid", "/game-art/world/dong-mon-skyline.webp", "/game-art/marketing/hero-traveler.png", "statusTrustSurfaces.map", "statusExplainers.map", "NO_ACCEPTED_BACKEND_CONTRACT", "Không có dữ liệu giám sát trực tiếp", "Không phải lịch bảo trì hoặc sự cố đang diễn ra")
    forbid("apps/web/src/components/PublicStatusExperience.tsx", "<form", "input type=", "design-reference", "design-boards", "data-live=\"true\"")
    require("packages/ui/src/status-landing-layout.css", "immersive-shell.css", "release-layout.css", "visibility-layout.css", "grid-template-columns:minmax(360px,.86fr) minmax(500px,1.14fr)", "repeat(4,minmax(0,1fr))", "repeat(2,minmax(0,1fr))", "grid-auto-flow:column", "prefers-reduced-motion", "forced-colors")
    exports = json.loads(read("packages/ui/package.json")).get("exports", {})
    if exports.get("./status-landing-layout.css") != "./src/status-landing-layout.css": fail("missing status landing stylesheet export")
    require("tests/e2e/fe-status-visual-realignment-v1276.spec.ts", "status visual realignment v1.276", "three truthful visibility signals", "four source surfaces", "clean project artwork", "target-wide rhythm", "keyboard reachable")
    require("packages/content/src/fixtures.ts", "statusTrustSurfaces", 'surface: "Website công khai"', 'surface: "Gói tải game"', 'surface: "Tài khoản / quyền Portal"', 'surface: "Guardrail runtime/browser"')

    expected = {
        "apps/web/public/design-reference/status-detailed-design-target-v1130.png": "16ea36f39426b58b640e620081e2b5a753816e03986fb8d6d342ce5a9703d6cc",
        "apps/web/public/game-art/world/dong-mon-skyline.webp": "7c99154110e4f1a6fe7755be259d79f826818d8692468033c451ab79cc009f5f",
        "apps/web/public/game-art/marketing/hero-traveler.png": "44ebffae955f423d6cb9d3f6406d4b64470b76f4ea9c95d4bdcd47044db2ac62",
    }
    for rel, digest in expected.items():
        actual = sha(rel)
        if actual and actual != digest: fail(f"hash drift {rel}: {actual}")

    if ERRORS:
        print("WEB FE STATUS VISUAL REALIGNMENT v1.276 VALIDATION FAIL")
        for error in ERRORS: print("- " + error)
        return 1
    print("WEB FE STATUS VISUAL REALIGNMENT v1.276 VALIDATION PASS")
    return 0

if __name__ == "__main__": raise SystemExit(main())
