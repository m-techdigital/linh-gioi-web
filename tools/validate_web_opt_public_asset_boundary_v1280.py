#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def fail(message: str) -> None:
    ERRORS.append(message)

def main() -> int:
    public_refs = ROOT / "apps/web/public/design-reference"
    if public_refs.exists() and any(public_refs.iterdir()):
        fail("review-only design-reference assets remain in the public deploy root")

    manifest_path = ROOT / "docs/design/reference/PUBLIC-DESIGN-REFERENCE-MANIFEST-v1.280.json"
    if not manifest_path.is_file():
        fail("missing canonical docs design-reference manifest v1.280")
        manifest: list[dict[str, object]] = []
    else:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        if len(manifest) != 23:
            fail(f"design-reference manifest must preserve 23 records, got {len(manifest)}")

    for item in manifest:
        doc_rel = str(item.get("canonicalDocPath", ""))
        doc = ROOT / doc_rel
        if not doc.is_file():
            fail(f"missing canonical review asset: {doc_rel}")
            continue
        if item.get("sha256") != sha256(doc):
            fail(f"review asset SHA drift: {doc_rel}")

    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    if "apps/web/public/design-reference" in registry:
        fail("active design registry still points at the public deploy root")

    helper = ROOT / "apps/web/src/components/PublicDesignTargetReference.tsx"
    if not helper.is_file():
        fail("source-governance compatibility registry disappeared before WEB-OPT-21")
    else:
        consumers = []
        for path in (ROOT / "apps/web/src").rglob("*.tsx"):
            if path == helper:
                continue
            if "PublicDesignTargetReference" in path.read_text(encoding="utf-8"):
                consumers.append(path.relative_to(ROOT).as_posix())
        if consumers:
            fail(f"PublicDesignTargetReference regained runtime consumers: {consumers}")

    for path in (ROOT / "apps/web/public/game-art").rglob("*provenance*.json"):
        text = path.read_text(encoding="utf-8")
        if "apps/web/public/design-reference" in text or '"/design-reference/' in text:
            fail(f"product provenance still points at retired public review path: {path.relative_to(ROOT)}")

    home = read("apps/web/src/components/PublicHomeLanding.tsx")
    for old_name in ["hero-artwork.png", "hero-mobile.png"]:
        if old_name in home:
            fail(f"homepage still renders retired PNG hero: {old_name}")
    if 'art("hero-artwork",1672,405,"webp")' not in home:
        fail("homepage does not render optimized desktop WebP hero")
    if "hero-mobile.webp" not in home:
        fail("homepage does not render optimized mobile WebP hero")

    hero_limits = {
        "apps/web/public/game-art/marketing/hero-artwork.webp": 200_000,
        "apps/web/public/game-art/marketing/hero-mobile.webp": 80_000,
    }
    for rel, limit in hero_limits.items():
        path = ROOT / rel
        if not path.is_file():
            fail(f"missing optimized hero: {rel}")
        elif path.stat().st_size > limit:
            fail(f"optimized hero exceeds size budget {limit}: {rel}={path.stat().st_size}")

    for rel in [
        "docs/design/source/public-marketing/hero-artwork.png",
        "docs/design/source/public-marketing/hero-mobile.png",
    ]:
        if not (ROOT / rel).is_file():
            fail(f"missing preserved PNG source: {rel}")

    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    project_state = read("docs/execution/WEB-PROJECT-STATE.md")
    ledger = read("docs/execution/WEB-TASK-LEDGER.md")
    report = read("docs/execution/LGO-WEB-OPT-03-PUBLIC-ASSET-BOUNDARY-IMAGE-DELIVERY-REPORT-v1.280.md")
    active_prefix = "Current phase: WEB-OPT-03-PUBLIC-ASSET-BOUNDARY-IMAGE-DELIVERY-v1.280 WEB_CLOSED"
    if project_state.startswith(active_prefix) and "WEB-OPT-04-PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281" not in next_action:
        fail("active v1.280 checkpoint does not advance to WEB-OPT-04 v1.281")
    if "| WEB-OPT-03-PUBLIC-ASSET-BOUNDARY-IMAGE-DELIVERY-v1.280 | WEB-OPT | WEB_CLOSED |" not in ledger:
        fail("WEB-TASK-LEDGER does not record WEB-OPT-03 v1.280 closure")
    if "1c131e10ffe7f5ef060189cc02cbf57e77fcdf7a" not in report or "83.35%" not in report:
        fail("v1.280 report is missing source/footprint closure evidence")
    current_state = read("tools/validate_web_current_state.py")
    if '"validate_web_opt_public_asset_boundary_v1280.py"' not in current_state:
        fail("v1.280 validator is not registered in WEB CURRENT STATE authority")

    if ERRORS:
        print("WEB OPT PUBLIC ASSET BOUNDARY v1.280 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB OPT PUBLIC ASSET BOUNDARY v1.280 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
