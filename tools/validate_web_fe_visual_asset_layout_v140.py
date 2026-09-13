#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    "docs/execution/specs/WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40.md",
    "LGO-WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-REPORT-v1.40.md",
    "HANDOFF-LGO-WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40.md",
    "tests/e2e/fe-visual-asset-layout-v140.spec.ts",
    "apps/ops/public/game-art/manifest.json",
    "apps/ops/public/game-art/world/dong-mon-skyline.webp",
    "apps/ops/public/game-art/classes/vo-lv1-starter-atlas.webp",
    "apps/ops/public/game-art/classes/vo-lv1-skill-atlas.webp",
]


def read(rel: str) -> str:
    return (ROOT / rel).read_text()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def main() -> None:
    missing = [rel for rel in REQUIRED if not (ROOT / rel).exists()]
    require(not missing, "Missing v1.40 required files: " + ", ".join(missing))

    ui_index = read("packages/ui/src/index.ts")
    primitives = read("packages/ui/src/primitives.tsx")
    shell = read("packages/ui/src/shell.css")
    ops_page = read("apps/ops/src/app/control-center/page.tsx")
    ops_fixtures = read("apps/ops/src/lib/ops-fixtures.ts")
    portal_page = read("apps/portal/src/app/journey/page.tsx")
    web_css = read("apps/web/src/app/globals.css")
    e2e = read("tests/e2e/fe-visual-asset-layout-v140.spec.ts")
    state = read("docs/execution/WEB-PROJECT-STATE.md")
    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    ledger = read("docs/execution/WEB-TASK-LEDGER.md")
    spec = read("docs/execution/specs/WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40.md")
    report = read("LGO-WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-REPORT-v1.40.md")
    handoff = read("HANDOFF-LGO-WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40.md")

    require("VisualProofGrid" in ui_index and "VisualProofCard" in ui_index, "UI exports must include VisualProofGrid/Card")
    require("function VisualProofGrid" in primitives and "function VisualProofCard" in primitives, "UI primitives must define VisualProofGrid/Card")
    require("lgo-visual-proof-grid" in shell and "lgo-visual-proof-card" in shell, "Shared shell CSS must style visual proof cards")
    require("opsVisualProofPanels" in ops_fixtures, "Ops fixtures must include visual proof panel data")
    require("Visual proof" in ops_page and "opsVisualProofPanels" in ops_page, "Ops control center must render visual proof panels")
    require("VisualProofGrid" in portal_page and "VisualProofCard" in portal_page, "Portal journey must consume shared visual proof UI")
    require("h1 { font-size: clamp(2.25rem" in web_css, "Public h1 typography cap must be reduced")
    require("h2 { font-size: clamp(1.6rem" in web_css, "Public h2 typography cap must be reduced")

    manifest = json.loads((ROOT / "apps/ops/public/game-art/manifest.json").read_text())
    require(manifest.get("version") == "v1.40", "Ops game-art manifest must be version v1.40")
    require(manifest.get("sourceManifest") == "apps/web/public/game-art/manifest.json", "Ops manifest must cite source manifest")
    require(len(manifest.get("assets", [])) == 3, "Ops manifest must record exactly three assets")
    for asset in manifest["assets"]:
        require(asset.get("derivativeSha256"), "Each ops asset must include derivativeSha256")
        require(asset.get("claim") in {"WORLD_CONCEPT", "DEVELOPMENT_ART_PREVIEW"}, "Each ops asset must remain non-gameplay/development claim")

    for marker in ["WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40", "WEB_CLOSED", "NO_ACCEPTED_BACKEND_CONTRACT"]:
        require(marker in spec, f"Spec missing {marker}")
        require(marker in report, f"Report missing {marker}")
        require(marker in handoff, f"Handoff missing {marker}")
    require("WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40" in ledger and "WEB_CLOSED" in ledger, "Ledger must close v1.40")
    require("WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40" in state and "WEB_CLOSED" in state, "State must retain v1.40 closed record")
    require("browser/e2e" in next_action, "Current next action must retain browser/e2e evidence requirement")
    require("font-size/layout/image/overflow" in e2e and "ops/control-center" in e2e, "E2E must cover visual metrics and Ops control center")

    print("WEB FE VISUAL ASSET LAYOUT v1.40 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    main()
