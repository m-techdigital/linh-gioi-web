#!/usr/bin/env python3
from pathlib import Path
import hashlib, json
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
    return text
def sha256(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return hashlib.sha256(path.read_bytes()).hexdigest()
def check_assets() -> None:
    try:
        manifest = json.loads(read("apps/web/public/game-art/manifest.json"))
    except json.JSONDecodeError as exc:
        fail(f"manifest json invalid: {exc}"); return
    entries = {asset.get("id"): asset for asset in manifest.get("assets", [])}
    expected = {
        "linh-thanh-community-plaza-npc-preview": "game-art/community/linh-thanh-plaza-npc-preview.png",
        "linh-thanh-community-plaza-target-selector": "game-art/community/linh-thanh-plaza-target-selector.png",
    }
    for asset_id, web_path in expected.items():
        rel = f"apps/web/public/{web_path}"
        require_file(rel)
        path = ROOT / rel
        if path.stat().st_size > 120_000: fail(f"{rel}: expected lightweight copied screenshot")
        entry = entries.get(asset_id)
        if not entry:
            fail(f"manifest missing asset id: {asset_id}")
            continue
        for marker in [web_path, "LOCAL_RUNTIME_SCREENSHOT_REFERENCE", "STATIC_COMMUNITY_SCREENSHOT_REFERENCE"]:
            if marker not in json.dumps(entry, ensure_ascii=False): fail(f"manifest {asset_id}: missing {marker}")
        digest = sha256(rel)
        if entry.get("sourceSha256") != digest or entry.get("derivativeSha256") != digest:
            fail(f"manifest {asset_id}: sha mismatch")
        if entry.get("width") != 640 or entry.get("height") != 480:
            fail(f"manifest {asset_id}: expected 640x480 dimensions")
def check_page_and_css() -> None:
    require_text("apps/web/src/app/community/page.tsx", [
        "communityPlazaScreenshots", "Linh Thanh community plaza real screenshots", "Ảnh thật từ Linh Thành community plaza",
        "/game-art/community/linh-thanh-plaza-npc-preview.png", "/game-art/community/linh-thanh-plaza-target-selector.png",
        "loading=\"lazy\"", "không claim chat, forum, guild hoặc ticket backend", "chưa mở chat, forum, guild, friend list, ticket backend hoặc moderation backend"
    ])
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.91 public community real plaza screenshot gallery", ".lgo-community-real-plaza-grid", "repeat(2, minmax(0, 1fr))", "aspect-ratio: 4 / 3", "overflow-wrap: anywhere", "grid-template-columns: 1fr"
    ])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-community-real-plaza-gallery-v191.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91.md", "LGO-WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-REPORT-v1.91.md", "HANDOFF-LGO-WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-community-real-plaza-gallery-v191.spec.ts", ["/community", "Ảnh thật từ Linh Thành community plaza", "Linh Thanh plaza NPC preview screenshot", "columnCount", "pageOverflow", "maxFont", "naturalWidth"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91.md", "LGO-WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-REPORT-v1.91.md", "HANDOFF-LGO-WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91 WEB_CLOSED", "WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.92", "browser/e2e"])
def main() -> int:
    check_assets(); check_page_and_css(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC COMMUNITY REAL PLAZA GALLERY v1.91 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC COMMUNITY REAL PLAZA GALLERY v1.91 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
