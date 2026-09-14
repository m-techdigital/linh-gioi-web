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
    manifest_text = read("apps/web/public/game-art/manifest.json")
    try:
        manifest = json.loads(manifest_text)
    except json.JSONDecodeError as exc:
        fail(f"manifest json invalid: {exc}"); return
    entries = {asset.get("id"): asset for asset in manifest.get("assets", [])}
    expected = {
        "dong-mon-onboarding-initial": "game-art/onboarding/dong-mon-01-initial.png",
        "dong-mon-onboarding-gate-focus": "game-art/onboarding/dong-mon-02-gate-focus.png",
        "dong-mon-onboarding-dialogue": "game-art/onboarding/dong-mon-03-dialogue.png",
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
        for marker in [web_path, "LOCAL_RUNTIME_SCREENSHOT_REFERENCE", "STATIC_ONBOARDING_SCREENSHOT_REFERENCE"]:
            if marker not in json.dumps(entry, ensure_ascii=False): fail(f"manifest {asset_id}: missing {marker}")
        digest = sha256(rel)
        if entry.get("sourceSha256") != digest or entry.get("derivativeSha256") != digest:
            fail(f"manifest {asset_id}: sha mismatch")
        if entry.get("width") != 1280 or entry.get("height") != 720:
            fail(f"manifest {asset_id}: expected 1280x720 dimensions")
def check_page_and_css() -> None:
    require_text("apps/web/src/app/start/page.tsx", [
        "onboardingScreenshots", "Ảnh thật tuyến hướng dẫn Đông Môn", "Ảnh thật từ tutorial Đông Môn",
        "/game-art/onboarding/dong-mon-01-initial.png", "/game-art/onboarding/dong-mon-02-gate-focus.png", "/game-art/onboarding/dong-mon-03-dialogue.png",
        "loading=\"lazy\"", "không phải cam kết bản tải công khai", "chưa có backend contract được chấp nhận"
    ])
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.90 public start real onboarding screenshot gallery", ".lgo-start-real-screenshot-grid", "repeat(3, minmax(0, 1fr))", "aspect-ratio: 16 / 9", "overflow-wrap: anywhere", "grid-template-columns: 1fr"
    ])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90.md", "LGO-WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-REPORT-v1.90.md", "HANDOFF-LGO-WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts", ["/start", "Ảnh thật từ tutorial Đông Môn", "Ảnh xuất hiện ban đầu tại Đông Môn", "columnCount", "pageOverflow", "maxFont", "naturalWidth"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90.md", "LGO-WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-REPORT-v1.90.md", "HANDOFF-LGO-WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90 WEB_CLOSED", "WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_assets(); check_page_and_css(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC START REAL ONBOARDING GALLERY v1.90 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC START REAL ONBOARDING GALLERY v1.90 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
