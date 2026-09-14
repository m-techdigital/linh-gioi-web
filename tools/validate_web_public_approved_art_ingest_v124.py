#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import hashlib
import json
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


def require_text(rel: str, *needles: str) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing required text: {needle}")


def main() -> int:
    require_text("packages/content/src/fixtures.ts", "publicGameArtAssets", "WEB_REFERENCE_APPROVED", "notFinalArt")
    require_text("packages/content/src/index.ts", "publicGameArtAssets", "PublicGameArtAsset")
    require_text("apps/web/src/components/PublicGameExperienceSections.tsx", "lgo-world-concept-art", "World concept", "ClassArtSpotlight")
    require_text("apps/web/src/app/classes/page.tsx", "ClassArtSpotlight")
    require_text("apps/web/src/app/globals.css", "WEB v1.24 approved art ingest", "lgo-world-concept-art", "lgo-class-art-spotlight")

    manifest_path = ROOT / "apps/web/public/game-art/manifest.json"
    if not manifest_path.is_file():
        fail("missing web art manifest")
    else:
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            assets = manifest.get("assets", [])
            required_ids = {
                "dong-mon-world-concept",
                "vo-lv1-starter-development-art",
                "vo-lv1-skill-development-art",
            }
            present_ids = {asset.get("id") for asset in assets}
            missing_ids = sorted(required_ids - present_ids)
            if missing_ids:
                fail(f"missing original audited web art asset ids: {', '.join(missing_ids)}")
            for asset in assets:
                rel = asset.get("webPath", "").lstrip("/")
                asset_path = ROOT / "apps/web/public" / rel
                if not rel or not asset_path.is_file():
                    fail(f"missing derivative asset: {rel}")
                    continue
                if asset.get("claim") in {"GAMEPLAY_SCREENSHOT", "PRODUCTION_FINAL"}:
                    fail(f"forbidden public claim for {rel}")
                derivative_sha = hashlib.sha256(asset_path.read_bytes()).hexdigest()
                if asset.get("derivativeSha256") != derivative_sha:
                    fail(f"derivative sha256 mismatch for {rel}")
                source_sha = asset.get("sourceSha256", "")
                if len(source_sha) != 64:
                    fail(f"invalid source sha256 for {rel}")
                if not isinstance(asset.get("width"), int) or not isinstance(asset.get("height"), int):
                    fail(f"missing derivative dimensions for {rel}")
        except Exception as exc:
            fail(f"invalid web art manifest: {exc}")

    require_text("docs/execution/WEB-PROJECT-STATE.md", "v1.24", "development art preview", "world concept")
    require_text("HANDOFF-LGO-WEB-PUBLIC-APPROVED-ART-INGEST-VISUAL-REVIEW-v1.24.md", "WEB-PUBLIC-APPROVED-ART-INGEST-AND-VISUAL-REVIEW-v1.24")

    if ERRORS:
        print("WEB PUBLIC APPROVED ART INGEST v1.24 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC APPROVED ART INGEST v1.24 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
