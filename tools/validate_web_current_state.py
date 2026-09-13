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
    # Core architectural and safety validators remain authoritative.
    # v1.6-v1.21 page-composition validators are historical evidence and are
    # intentionally not rerun after the v1.22 player-facing information-architecture realignment.
    "validate_web_program_constitution.py",
    "validate_web_monorepo_foundation.py",
    "validate_web_design_system.py",
    "validate_web_live_content.py",
    "validate_web_public_rc.py",
    "validate_web_portal_shell.py",
    "validate_web_ops_shell.py",
    "validate_web_runtime_preseed.py",
    "validate_web_public_player_safety_support_faq_polish.py",
    "validate_web_public_game_experience_v122.py",
    "validate_web_public_game_visual_cta_v123.py",
    "validate_web_public_approved_art_ingest_v124.py",
    "validate_web_public_class_world_story_depth_v125.py",
    "validate_web_base_first.py",
    "validate_web_shared_base.py",
    "validate_web_public_home_discovery_v126.py",
    "validate_web_shared_page_patterns_v128.py",
    "validate_web_shared_form_controls_v129.py",
    "validate_web_shared_data_display_v130.py",
    "validate_web_portal_account_character_depth_v131.py",
    "validate_web_ops_player_operations_depth_v132.py",
    "validate_web_portal_support_recovery_depth_v133.py",
    "validate_web_ops_support_triage_depth_v134.py",
    "validate_web_ops_game_operations_depth_v135.py",
    "validate_web_portal_access_depth_v136.py",
    "validate_web_ops_review_depth_v138.py",
    "validate_web_game_contract_sync_v10.py",
    "validate_web_portal_journey_demo_v139.py",
    "validate_web_fe_visual_asset_layout_v140.py",
    "validate_web_fe_continued_surface_polish_v141.py",
    "validate_web_fe_route_depth_continuity_v142.py",
    "validate_web_fe_accessibility_interaction_audit_v143.py",
    "validate_web_fe_public_navigation_interaction_v144.py",
    "validate_web_fe_blocked_action_keyboard_v145.py",
    "validate_web_fe_ops_blocked_action_keyboard_v146.py",
    "validate_web_fe_workspace_skip_link_visual_v147.py",
    "validate_web_fe_portal_security_lcp_image_v148.py",
    "validate_web_fe_ops_visual_lcp_image_v149.py",
    "validate_web_fe_public_skip_link_visual_v150.py",
    "validate_web_fe_portal_home_lcp_image_v151.py",
    "validate_web_fe_portal_journey_lcp_image_v152.py",
    "validate_web_fe_public_cinematic_image_loading_v153.py",
    "validate_web_fe_public_class_art_loading_v154.py",
    "validate_web_fe_public_class_art_typography_v155.py",
    "validate_web_fe_portal_support_blocked_action_v156.py",
    "validate_web_fe_shared_pagination_boundary_v157.py",
    "validate_web_fe_accessibility_axe_matrix_v158.py",
    "validate_web_fe_shared_data_table_scroll_region_v159.py",
    "validate_web_fe_shared_fixture_form_controls_v160.py",
    "validate_web_fe_workspace_nav_scroll_region_v161.py",
    "validate_web_fe_portal_home_visual_lcp_images_v162.py",
    "validate_web_fe_public_brand_nav_scroll_region_v163.py",
    "validate_web_fe_public_story_chapter_typography_v164.py",
    "validate_web_fe_expanded_route_readability_v165.py",
    "validate_web_fe_shared_pagination_boundary_reason_v166.py",
    "validate_web_fe_public_download_trust_design_board_v167.py",
    "validate_web_fe_portal_access_journey_visual_v168.py",
    "validate_web_fe_ops_audit_visual_v169.py",
    "validate_web_fe_public_roadmap_design_board_v170.py",
    "validate_web_fe_public_release_readiness_design_board_v171.py",
    "validate_web_fe_public_safety_support_design_board_v172.py",
    "validate_web_fe_public_support_help_design_board_v173.py",
    "validate_web_fe_public_release_narrative_design_board_v174.py",
]
def main() -> int:
    check_forbidden_roots(); check_no_app_api_routes(); check_no_generated_artifacts(); require_non_claims()
    for rel in ["docs/execution/WEB-PROJECT-STATE.md", "docs/execution/WEB-NEXT-ACTION.md", "docs/execution/WEB-TASK-LEDGER.md"]:
        require_file(rel)
    require_any_text("docs/execution/WEB-PROJECT-STATE.md", [
        "LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.35",
        "LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_VERIFYING_v1.35",
        "LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.34",
        "LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_VERIFYING_v1.34",
        "LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.33",
        "LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_VERIFYING_v1.33",
        "LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.32",
        "LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_VERIFYING_v1.32",
        "LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.31",
        "LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_VERIFYING_v1.31",
        "LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.30",
        "LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_VERIFYING_v1.30",
        "LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.29",
        "LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_VERIFYING_v1.29",
        "LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.28",
        "LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_VERIFYING_v1.28",
        "LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_VERIFYING_v1.26",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.26",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_VERIFYING_v1.25",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_SOURCE_READY_ENV_LIMITED_v1.25",
        "LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_VERIFYING_v1.24",
        "LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_SOURCE_READY_ENV_LIMITED_v1.23",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_VERIFYING_v1.23",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_READY_v1.23",
        "LGO_WEB_PUBLIC_GAME_EXPERIENCE_BRAND_REALIGNMENT_READY_v1.22",
        "LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21",
        "LGO_WEB_PUBLIC_CLOSED_TESTER_INFORMATION_PACK_READY_v1.20",
        "LGO_WEB_PUBLIC_RELEASE_READINESS_HUB_POLISH_READY_v1.19",
        "LGO_WEB_PUBLIC_PLAYER_TRUST_RELEASE_NARRATIVE_READY_v1.18",
        "LGO_WEB_PUBLIC_ROUTE_CONTINUITY_CONVERSION_POLISH_READY_v1.17",
        "LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_v1.16",
        "LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15",
        "LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14",
        "LGO_WEB_PUBLIC_WORLD_GAMEPLAY_LOOP_DEPTH_READY_v1.13",
        "LGO_WEB_PUBLIC_CONTENT_IA_HUB_POLISH_READY_v1.12",
        "LGO_WEB_PUBLIC_COMMUNITY_ROADMAP_ONBOARDING_READY_v1.11",
        "LGO_WEB_PUBLIC_STATUS_DOWNLOAD_TRUST_POLISH_READY_v1.10",
        "LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_v1.9",
        "LGO_WEB_PUBLIC_GAME_INFO_DEPTH_READY_v1.8",
        "LGO_WEB_PUBLIC_VISUAL_RESPONSIVE_POLISH_READY_v1.7",
        "LGO_WEB_PUBLIC_UX_CONTENT_POLISH_READY_v1.6",
        "LGO_WEB_RUNTIME_BROWSER_E2E_MATRIX_PASSED_v1.5",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.75")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "browser/e2e")
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

# v1.27 historical standalone validator marker: validate_web_shared_app_shell_v127.py
# v1.28 validator: validate_web_shared_page_patterns_v128.py
# v1.29 validator: validate_web_shared_form_controls_v129.py
# v1.30 validator: validate_web_shared_data_display_v130.py
