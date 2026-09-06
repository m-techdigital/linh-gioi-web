#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_dir(rel: str) -> None:
    if not (ROOT / rel).is_dir():
        fail(f"missing dir: {rel}")

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing readable file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_text(rel: str, needle: str) -> None:
    text = read(rel)
    if needle not in text:
        fail(f"{rel} missing required text: {needle}")

def require_any_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    if not any(n in text for n in needles):
        fail(f"{rel} missing one of: {needles}")

def check_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")

def check_no_app_api_routes() -> None:
    for path in (ROOT / "apps").glob("*/src/app/api") if (ROOT / "apps").exists() else []:
        if path.exists():
            fail(f"forbidden app/api route present: {path.relative_to(ROOT)}")

def check_no_generated_artifacts(ignore_pycache: bool = True) -> None:
    forbidden = {"node_modules", ".next", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        parts = set(path.parts)
        if ignore_pycache and "__pycache__" in parts:
            continue
        if "__pycache__" in parts:
            continue
        if forbidden.intersection(parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")

def require_non_claims() -> None:
    rel = "docs/execution/WEB-NON-CLAIMS.md"
    for phrase in [
        "No production auth", "No DB persistence", "No real account portal integration",
        "No real ops/admin mutation", "No independent backend", "No CMS",
        "No production deployment", "No payment/shop/economy"
    ]:
        require_text(rel, phrase)

def finish(name: str) -> int:
    if ERRORS:
        print(f"{name} VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1
    print(f"{name} VALIDATION PASS")
    return 0

import runpy

VALIDATORS = [
    "validate_web_program_constitution.py",
    "validate_web_monorepo_foundation.py",
    "validate_web_design_system.py",
    "validate_web_public_vertical_slice.py",
    "validate_web_live_content.py",
    "validate_web_public_rc.py",
    "validate_web_portal_shell.py",
    "validate_web_ops_shell.py",
    "validate_web_runtime_preseed.py",
    "validate_web_runtime_browser_matrix.py",
    "validate_web_public_ux_content_polish.py",
    "validate_web_public_visual_responsive_polish.py",
    "validate_web_public_game_info_depth.py",
    "validate_web_public_news_guide_detail_pages.py",
    "validate_web_public_status_download_trust_polish.py",
    "validate_web_public_community_roadmap_onboarding.py",
    "validate_web_public_content_ia_hub_polish.py",
    "validate_web_public_world_gameplay_loop_depth.py",
    "validate_web_public_player_safety_support_faq_polish.py",
    "validate_web_public_accessibility_readability_polish.py",
    "validate_web_public_performance_copy_asset_budget_polish.py",
    "validate_web_public_route_continuity_conversion_polish.py",
    "validate_web_public_player_trust_release_narrative.py",
    "validate_web_public_release_readiness_hub_polish.py",
    "validate_web_public_closed_tester_information_pack.py",
    "validate_web_public_faq_search_helpfulness_polish.py",
]

def main() -> int:
    check_forbidden_roots(); check_no_app_api_routes(); check_no_generated_artifacts(); require_non_claims()
    for rel in ["docs/execution/WEB-PROJECT-STATE.md", "docs/execution/WEB-NEXT-ACTION.md", "docs/execution/WEB-TASK-LEDGER.md"]:
        require_file(rel)
    require_any_text("docs/execution/WEB-PROJECT-STATE.md", ["LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21", "LGO_WEB_PUBLIC_CLOSED_TESTER_INFORMATION_PACK_READY_v1.20", "LGO_WEB_PUBLIC_RELEASE_READINESS_HUB_POLISH_READY_v1.19", "LGO_WEB_PUBLIC_PLAYER_TRUST_RELEASE_NARRATIVE_READY_v1.18", "LGO_WEB_PUBLIC_ROUTE_CONTINUITY_CONVERSION_POLISH_READY_v1.17", "LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_v1.16", "LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15", "LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14", "LGO_WEB_PUBLIC_WORLD_GAMEPLAY_LOOP_DEPTH_READY_v1.13", "LGO_WEB_PUBLIC_CONTENT_IA_HUB_POLISH_READY_v1.12", "LGO_WEB_PUBLIC_COMMUNITY_ROADMAP_ONBOARDING_READY_v1.11", "LGO_WEB_PUBLIC_STATUS_DOWNLOAD_TRUST_POLISH_READY_v1.10", "LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_v1.9", "LGO_WEB_PUBLIC_GAME_INFO_DEPTH_READY_v1.8", "LGO_WEB_PUBLIC_VISUAL_RESPONSIVE_POLISH_READY_v1.7", "LGO_WEB_PUBLIC_UX_CONTENT_POLISH_READY_v1.6", "LGO_WEB_RUNTIME_BROWSER_E2E_MATRIX_PASSED_v1.5"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-08-GAME-CONTRACT-SYNC-v1.0")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "accepted backend Auth/API/DB/RBAC/audit contract")
    for phrase in ["No independent backend", "No CMS", "No production deployment", "No payment/shop/economy"]:
        require_text("docs/execution/WEB-NON-CLAIMS.md", phrase)
    forbidden_pkg_markers = ["express", "nestjs", "laravel", "typeorm", "prisma", "sequelize"]
    pkg = read("package.json").lower()
    for marker in forbidden_pkg_markers:
        if marker in pkg:
            fail(f"independent backend/database package marker present: {marker}")
    if ERRORS:
        return finish("WEB CURRENT STATE")
    for validator in VALIDATORS:
        validator_path = ROOT / "tools" / validator
        namespace = runpy.run_path(str(validator_path), run_name=f"lgo_web_validator_{validator}")
        validator_main = namespace.get("main")
        if validator_main is None:
            fail(f"validator has no main: {validator}")
            continue
        result = validator_main()
        if result != 0:
            fail(f"validator failed: {validator}")
    return finish("WEB CURRENT STATE")

if __name__ == "__main__":
    sys.exit(main())
