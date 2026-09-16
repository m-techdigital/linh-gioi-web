#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import sys
import re
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
    "validate_web_fe_public_community_onboarding_design_board_v175.py",
    "validate_web_fe_public_performance_design_board_v176.py",
    "validate_web_fe_public_closed_tester_design_board_v177.py",
    "validate_web_fe_public_accessibility_design_board_v178.py",
    "validate_web_fe_public_start_design_board_v179.py",
    "validate_web_fe_public_journey_design_board_v180.py",
    "validate_web_fe_public_status_design_board_v181.py",
    "validate_web_fe_public_game_loop_design_board_v182.py",
    "validate_web_fe_public_game_world_design_board_v183.py",
    "validate_web_fe_public_story_fracture_design_board_v184.py",
    "validate_web_fe_public_content_heading_order_v185.py",
    "validate_web_fe_public_release_heading_priority_v186.py",
    "validate_web_fe_public_support_heading_priority_v187.py",
    "validate_web_fe_public_trust_heading_priority_v188.py",
    "validate_web_fe_public_route_heading_priority_v189.py",
    "validate_web_fe_public_start_real_onboarding_gallery_v190.py",
    "validate_web_fe_public_community_real_plaza_gallery_v191.py",
    "validate_web_fe_public_visual_atmosphere_v192.py",
    "validate_web_fe_public_home_visual_target_v193.py",
    "validate_web_fe_public_professional_design_target_v194.py",
    "validate_web_fe_complete_design_atlas_v195.py",
    "validate_web_design_first_governance_v196.py",
    "validate_web_fe_public_design_target_attachment_v197.py",
    "validate_web_fe_workspace_design_target_attachment_v198.py",
    "validate_web_fe_workspace_design_target_asset_v199.py",
    "validate_web_fe_component_state_design_target_v1100.py",
    "validate_web_fe_design_target_link_a11y_v1101.py",
    "validate_web_fe_design_target_focus_motion_v1102.py",
    "validate_web_fe_design_target_link_rel_v1103.py",
    "validate_web_fe_design_target_region_scope_v1104.py",
    "validate_web_fe_design_target_region_description_v1105.py",
    "validate_web_fe_design_target_actions_group_v1106.py",
    "validate_web_fe_design_target_visible_new_tab_cue_v1107.py",
    "validate_web_fe_design_target_cue_spacing_v1108.py",
    "validate_web_fe_design_target_reduced_motion_v1109.py",
    "validate_web_fe_design_target_transition_parity_v1110.py",
    "validate_web_fe_design_target_link_scope_name_v1111.py",
    "validate_web_fe_public_download_nav_section_v1112.py",
    "validate_web_fe_public_expanded_service_route_audit_v1113.py",
    "validate_web_fe_public_expanded_core_route_audit_v1114.py",
    "validate_web_fe_portal_expanded_route_audit_v1115.py",
    "validate_web_fe_ops_expanded_route_audit_v1116.py",
    "validate_web_fe_shell_keyboard_reachability_v1117.py",
    "validate_web_fe_homepage_detailed_design_target_v1118.py",
    "validate_web_fe_homepage_target_fold_density_v1119.py",
    "validate_web_fe_game_world_design_target_density_v1120.py",
    "validate_web_fe_story_design_target_density_v1121.py",
    "validate_web_fe_classes_design_target_density_v1122.py",
    "validate_web_fe_journey_design_target_density_v1123.py",
    "validate_web_fe_start_design_target_density_v1124.py",
    "validate_web_fe_download_design_target_density_v1125.py",
    "validate_web_fe_download_trust_design_target_density_v1126.py",
    "validate_web_fe_release_design_target_density_v1127.py",
    "validate_web_fe_release_readiness_design_target_density_v1128.py",
    "validate_web_fe_tester_pack_design_target_density_v1129.py",
    "validate_web_fe_status_design_target_density_v1130.py",
    "validate_web_fe_support_design_target_density_v1131.py",
    "validate_web_fe_support_help_design_target_density_v1132.py",
    "validate_web_fe_support_safety_design_target_density_v1133.py",
    "validate_web_fe_homepage_vietnamese_first_flow_v1134.py",
    "validate_web_fe_game_world_vietnamese_first_flow_v1135.py",
    "validate_web_fe_story_vietnamese_design_match_v1136.py",
    "validate_web_fe_classes_vietnamese_design_match_v1137.py",
    "validate_web_fe_journey_vietnamese_design_match_v1138.py",
    "validate_web_fe_start_vietnamese_design_match_v1139.py",
    "validate_web_fe_download_vietnamese_design_match_v1140.py",
    "validate_web_fe_download_trust_vietnamese_design_match_v1141.py",
    "validate_web_fe_release_vietnamese_design_match_v1142.py",
    "validate_web_fe_release_readiness_real_ui_layout_v1143.py",
    "validate_web_fe_tester_pack_real_ui_layout_v1144.py",
    "validate_web_fe_status_real_ui_layout_v1145.py",
    "validate_web_fe_support_real_ui_layout_v1146.py",
    "validate_web_fe_support_help_real_ui_layout_v1147.py",
    "validate_web_fe_support_safety_real_ui_layout_v1148.py",
    "validate_web_fe_community_real_ui_layout_v1149.py",
    "validate_web_fe_community_onboarding_real_ui_layout_v1150.py",
    "validate_web_fe_performance_real_ui_layout_v1151.py",
    "validate_web_fe_accessibility_real_ui_layout_v1152.py",
    "validate_web_fe_roadmap_real_ui_layout_v1153.py",
    "validate_web_fe_game_loop_real_ui_layout_v1154.py",
    "validate_web_fe_guide_world_loop_real_ui_layout_v1155.py",
    "validate_web_fe_guides_index_real_ui_layout_v1156.py",
    "validate_web_fe_guides_beginner_real_ui_layout_v1157.py",
    "validate_web_fe_guides_gate_entry_real_ui_layout_v1158.py",
    "validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159.py",
    "validate_web_fe_guides_download_readiness_real_ui_layout_v1160.py",
    "validate_web_fe_guides_support_community_real_ui_layout_v1161.py",
    "validate_web_fe_guides_release_trust_real_ui_layout_v1162.py",
    "validate_web_fe_guides_community_roadmap_real_ui_layout_v1163.py",
    "validate_web_fe_guides_start_here_real_ui_layout_v1164.py",
    "validate_web_fe_guides_world_gameplay_loop_real_ui_layout_v1165.py",
    "validate_web_fe_guides_player_safety_support_real_ui_layout_v1166.py",
    "validate_web_fe_guides_accessibility_readability_real_ui_layout_v1167.py",
    "validate_web_fe_guides_performance_copy_budget_real_ui_layout_v1168.py",
    "validate_web_fe_guides_route_continuity_conversion_real_ui_layout_v1169.py",
    "validate_web_fe_guides_player_trust_release_real_ui_layout_v1170.py",
    "validate_web_fe_guides_release_readiness_hub_real_ui_layout_v1171.py",
    "validate_web_fe_guides_closed_tester_information_pack_real_ui_layout_v1172.py",
    "validate_web_fe_guides_faq_search_helpfulness_real_ui_layout_v1173.py",
    "validate_web_fe_events_real_ui_layout_v1174.py",
    "validate_web_fe_patch_notes_real_ui_layout_v1175.py",
    "validate_web_fe_news_real_ui_layout_v1176.py",
    "validate_web_fe_news_control_tower_real_ui_layout_v1177.py",
    "validate_web_fe_news_public_ux_real_ui_layout_v1178.py",
    "validate_web_fe_news_visual_responsive_real_ui_layout_v1179.py",
    "validate_web_fe_news_public_game_info_real_ui_layout_v1180.py",
    "validate_web_fe_news_guide_detail_real_ui_layout_v1181.py",
    "validate_web_fe_news_status_download_trust_real_ui_layout_v1182.py",
    "validate_web_fe_news_closed_tester_pack_real_ui_layout_v1183.py",
    "validate_web_fe_news_release_readiness_real_ui_layout_v1184.py",
    "validate_web_fe_news_player_trust_release_real_ui_layout_v1185.py",
    "validate_web_fe_news_route_continuity_real_ui_layout_v1186.py",
    "validate_web_fe_news_content_ia_hub_real_ui_layout_v1187.py",
    "validate_web_fe_news_community_roadmap_real_ui_layout_v1188.py",
    "validate_web_fe_news_world_gameplay_loop_real_ui_layout_v1189.py",
    "validate_web_fe_news_player_safety_support_real_ui_layout_v1190.py",
    "validate_web_fe_news_accessibility_readability_real_ui_layout_v1191.py",
    "validate_web_fe_news_performance_copy_budget_real_ui_layout_v1192.py",
    "validate_web_fe_news_route_continuity_conversion_real_ui_layout_v1193.py",
    "validate_web_fe_news_player_trust_release_real_ui_layout_v1194.py",
    "validate_web_fe_news_release_readiness_hub_real_ui_layout_v1195.py",
    "validate_web_fe_news_closed_tester_pack_real_ui_layout_v1196.py",
    "validate_web_fe_news_faq_search_helpfulness_real_ui_layout_v1197.py",
    "validate_web_fe_events_real_ui_layout_v1198.py",
    "validate_web_fe_patch_notes_real_ui_layout_v1199.py",
    "validate_web_fe_release_real_ui_layout_v1200.py",
    "validate_web_fe_release_readiness_real_ui_layout_v1201.py",
    "validate_web_fe_release_tester_pack_real_ui_layout_v1202.py",
    "validate_web_fe_status_real_ui_layout_v1203.py",
    "validate_web_fe_support_real_ui_layout_v1204.py",
    "validate_web_fe_support_help_real_ui_layout_v1205.py",
    "validate_web_fe_support_safety_real_ui_layout_v1206.py",
    "validate_web_fe_community_real_ui_layout_v1207.py",
    "validate_web_fe_community_onboarding_real_ui_layout_v1208.py",
    "validate_web_fe_performance_real_ui_layout_v1209.py",
    "validate_web_fe_accessibility_real_ui_layout_v1210.py",
    "validate_web_fe_roadmap_real_ui_layout_v1211.py",
    "validate_web_fe_game_loop_real_ui_layout_v1212.py",
    "validate_web_fe_game_real_ui_layout_v1213.py",
    "validate_web_fe_story_real_ui_layout_v1214.py",
    "validate_web_fe_classes_real_ui_layout_v1215.py",
    "validate_web_fe_journey_real_ui_layout_v1216.py",
    "validate_web_fe_start_real_ui_layout_v1217.py",
    "validate_web_fe_download_real_ui_layout_v1218.py",
    "validate_web_fe_download_trust_real_ui_layout_v1219.py",
    "validate_web_fe_release_real_ui_layout_v1220.py",
    "validate_web_fe_release_readiness_real_ui_layout_v1221.py",
    "validate_web_fe_tester_pack_real_ui_layout_v1222.py",
    "validate_web_fe_status_real_ui_layout_v1223.py",
    "validate_web_fe_support_real_ui_layout_v1224.py",
    "validate_web_fe_support_help_real_ui_layout_v1225.py",
    "validate_web_fe_support_safety_real_ui_layout_v1226.py",
    "validate_web_fe_community_real_ui_layout_v1227.py",
    "validate_web_fe_community_onboarding_real_ui_layout_v1228.py",
    "validate_web_fe_performance_real_ui_layout_v1229.py",
    "validate_web_fe_accessibility_real_ui_layout_v1230.py",
    "validate_web_fe_roadmap_real_ui_layout_v1231.py",
    "validate_web_fe_game_loop_real_ui_layout_v1232.py",
    "validate_web_fe_world_loop_guide_article_v1233.py",
    "validate_web_fe_guides_discovery_real_ui_layout_v1234.py",
    "validate_web_fe_beginner_guide_reading_v1235.py",
    "validate_web_fe_gate_entry_guide_article_v1236.py",
    "validate_web_fe_training_loop_guide_article_v1237.py",
    "validate_web_fe_download_readiness_guide_article_v1238.py",
    "validate_web_fe_support_community_guide_article_v1239.py",
    "validate_web_fe_release_trust_guide_article_v1240.py",
    "validate_web_fe_community_roadmap_guide_article_v1241.py",
    "validate_web_fe_start_here_guide_article_v1242.py",
    "validate_web_fe_player_safety_guide_article_v1243.py",
    "validate_web_fe_readability_guide_article_v1244.py",
    "validate_web_fe_performance_guide_article_v1245.py",
    "validate_web_fe_route_continuity_guide_article_v1246.py",
    "validate_web_fe_player_trust_guide_article_v1247.py",
]

# These guards enforced a diagram image or deliberately line-clamped readiness cards.
# v1.221 replaces them with art-backed DOM UI + native evidence disclosures. Not counted as PASS.
SUPERSEDED_LAYOUT_VALIDATORS = {
    "validate_web_fe_guides_player_trust_release_real_ui_layout_v1170.py": "validate_web_fe_player_trust_guide_article_v1247.py",
    "validate_web_fe_guides_route_continuity_conversion_real_ui_layout_v1169.py": "validate_web_fe_route_continuity_guide_article_v1246.py",
    "validate_web_fe_guides_performance_copy_budget_real_ui_layout_v1168.py": "validate_web_fe_performance_guide_article_v1245.py",
    "validate_web_fe_guides_accessibility_readability_real_ui_layout_v1167.py": "validate_web_fe_readability_guide_article_v1244.py",
    "validate_web_fe_guides_player_safety_support_real_ui_layout_v1166.py": "validate_web_fe_player_safety_guide_article_v1243.py",
    "validate_web_fe_guides_start_here_real_ui_layout_v1164.py": "validate_web_fe_start_here_guide_article_v1242.py",
    "validate_web_fe_guides_community_roadmap_real_ui_layout_v1163.py": "validate_web_fe_community_roadmap_guide_article_v1241.py",
    "validate_web_fe_guides_release_trust_real_ui_layout_v1162.py": "validate_web_fe_release_trust_guide_article_v1240.py",
    "validate_web_fe_guides_support_community_real_ui_layout_v1161.py": "validate_web_fe_support_community_guide_article_v1239.py",
    "validate_web_fe_guides_download_readiness_real_ui_layout_v1160.py": "validate_web_fe_download_readiness_guide_article_v1238.py",
    "validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159.py": "validate_web_fe_training_loop_guide_article_v1237.py",
    "validate_web_fe_guides_gate_entry_real_ui_layout_v1158.py": "validate_web_fe_gate_entry_guide_article_v1236.py",
    "validate_web_fe_guides_beginner_real_ui_layout_v1157.py": "validate_web_fe_beginner_guide_reading_v1235.py",
    "validate_web_fe_guides_index_real_ui_layout_v1156.py": "validate_web_fe_guides_discovery_real_ui_layout_v1234.py",
    "validate_web_fe_guide_world_loop_real_ui_layout_v1155.py": "validate_web_fe_world_loop_guide_article_v1233.py",
    "validate_web_fe_guides_world_gameplay_loop_real_ui_layout_v1165.py": "validate_web_fe_world_loop_guide_article_v1233.py",

    "validate_web_fe_public_game_loop_design_board_v182.py": "validate_web_fe_game_loop_real_ui_layout_v1232.py",
    "validate_web_fe_game_loop_real_ui_layout_v1154.py": "validate_web_fe_game_loop_real_ui_layout_v1232.py",
    "validate_web_fe_game_loop_real_ui_layout_v1212.py": "validate_web_fe_game_loop_real_ui_layout_v1232.py",

    "validate_web_fe_public_roadmap_design_board_v170.py": "validate_web_fe_roadmap_real_ui_layout_v1231.py",
    "validate_web_fe_roadmap_real_ui_layout_v1153.py": "validate_web_fe_roadmap_real_ui_layout_v1231.py",
    "validate_web_fe_roadmap_real_ui_layout_v1211.py": "validate_web_fe_roadmap_real_ui_layout_v1231.py",

    "validate_web_fe_public_accessibility_design_board_v178.py": "validate_web_fe_accessibility_real_ui_layout_v1230.py",
    "validate_web_fe_accessibility_real_ui_layout_v1152.py": "validate_web_fe_accessibility_real_ui_layout_v1230.py",
    "validate_web_fe_accessibility_real_ui_layout_v1210.py": "validate_web_fe_accessibility_real_ui_layout_v1230.py",

    "validate_web_fe_public_performance_design_board_v176.py": "validate_web_fe_performance_real_ui_layout_v1229.py",
    "validate_web_fe_performance_real_ui_layout_v1151.py": "validate_web_fe_performance_real_ui_layout_v1229.py",
    "validate_web_fe_performance_real_ui_layout_v1209.py": "validate_web_fe_performance_real_ui_layout_v1229.py",

    "validate_web_fe_public_community_onboarding_design_board_v175.py": "validate_web_fe_community_onboarding_real_ui_layout_v1228.py",
    "validate_web_fe_community_onboarding_real_ui_layout_v1150.py": "validate_web_fe_community_onboarding_real_ui_layout_v1228.py",
    "validate_web_fe_community_onboarding_real_ui_layout_v1208.py": "validate_web_fe_community_onboarding_real_ui_layout_v1228.py",

    "validate_web_fe_community_real_ui_layout_v1149.py": "validate_web_fe_community_real_ui_layout_v1227.py",
    "validate_web_fe_community_real_ui_layout_v1207.py": "validate_web_fe_community_real_ui_layout_v1227.py",

    "validate_web_fe_public_safety_support_design_board_v172.py": "validate_web_fe_support_safety_real_ui_layout_v1226.py",
    "validate_web_fe_support_safety_design_target_density_v1133.py": "validate_web_fe_support_safety_real_ui_layout_v1226.py",
    "validate_web_fe_support_safety_real_ui_layout_v1148.py": "validate_web_fe_support_safety_real_ui_layout_v1226.py",
    "validate_web_fe_support_safety_real_ui_layout_v1206.py": "validate_web_fe_support_safety_real_ui_layout_v1226.py",

    "validate_web_fe_public_support_help_design_board_v173.py": "validate_web_fe_support_help_real_ui_layout_v1225.py",
    "validate_web_fe_support_help_design_target_density_v1132.py": "validate_web_fe_support_help_real_ui_layout_v1225.py",
    "validate_web_fe_support_help_real_ui_layout_v1147.py": "validate_web_fe_support_help_real_ui_layout_v1225.py",
    "validate_web_fe_support_help_real_ui_layout_v1205.py": "validate_web_fe_support_help_real_ui_layout_v1225.py",

    "validate_web_fe_support_design_target_density_v1131.py": "validate_web_fe_support_real_ui_layout_v1224.py",
    "validate_web_fe_support_real_ui_layout_v1146.py": "validate_web_fe_support_real_ui_layout_v1224.py",
    "validate_web_fe_support_real_ui_layout_v1204.py": "validate_web_fe_support_real_ui_layout_v1224.py",

    "validate_web_fe_public_status_design_board_v181.py": "validate_web_fe_status_real_ui_layout_v1223.py",
    "validate_web_fe_status_design_target_density_v1130.py": "validate_web_fe_status_real_ui_layout_v1223.py",
    "validate_web_fe_status_real_ui_layout_v1145.py": "validate_web_fe_status_real_ui_layout_v1223.py",
    "validate_web_fe_status_real_ui_layout_v1203.py": "validate_web_fe_status_real_ui_layout_v1223.py",

    "validate_web_fe_public_closed_tester_design_board_v177.py": "validate_web_fe_tester_pack_real_ui_layout_v1222.py",
    "validate_web_fe_tester_pack_design_target_density_v1129.py": "validate_web_fe_tester_pack_real_ui_layout_v1222.py",
    "validate_web_fe_tester_pack_real_ui_layout_v1144.py": "validate_web_fe_tester_pack_real_ui_layout_v1222.py",
    "validate_web_fe_release_tester_pack_real_ui_layout_v1202.py": "validate_web_fe_tester_pack_real_ui_layout_v1222.py",

    "validate_web_fe_public_release_readiness_design_board_v171.py": "validate_web_fe_release_readiness_real_ui_layout_v1221.py",
    "validate_web_fe_release_readiness_design_target_density_v1128.py": "validate_web_fe_release_readiness_real_ui_layout_v1221.py",
    "validate_web_fe_release_readiness_real_ui_layout_v1143.py": "validate_web_fe_release_readiness_real_ui_layout_v1221.py",
    "validate_web_fe_release_readiness_real_ui_layout_v1201.py": "validate_web_fe_release_readiness_real_ui_layout_v1221.py",
}

def public_route_exists(route: str) -> bool:
    """Resolve literal pages and the existing file-backed published-guide renderer.

    This is intentionally not a general Next.js route parser. Unknown dynamic
    families fail closed; browser tests must still prove runtime reachability.
    """
    if not re.fullmatch(r"/(?:[a-z0-9-]+(?:/[a-z0-9-]+)*)?", route):
        return False
    app = ROOT / "apps/web/src/app"
    if (app / route.lstrip("/") / "page.tsx").is_file():
        return True
    match = re.fullmatch(r"/guides/([a-z0-9-]+)", route)
    renderer = app / "guides/[slug]/page.tsx"
    fixtures = ROOT / "packages/content/src/fixtures.ts"
    if not match or not renderer.is_file() or not fixtures.is_file():
        return False
    source = renderer.read_text(encoding="utf-8")
    required = ('generateStaticParams', 'localContentRepository.list("guides")',
                'localContentRepository.bySlug(slug)', 'entry.category !== "guides"', 'notFound()')
    if not all(marker in source for marker in required):
        return False
    entries = re.search(r"export const contentEntries\s*:\s*ContentEntry\[\]\s*=\s*\[(.*?)^\];",
                        fixtures.read_text(encoding="utf-8"), re.S | re.M)
    if not entries:
        return False
    for block in re.findall(r"^  \{\n(.*?)^  \}", entries[1], re.S | re.M):
        values = dict(re.findall(r'^\s*(slug|category|status):\s*"([^"\n]+)"\s*,?\s*$', block, re.M))
        if values == {"slug": match[1], "category": "guides", "status": "published"}:
            return True
    return False

def check_active_checkpoint() -> None:
    state = read("docs/execution/WEB-PROJECT-STATE.md")
    queue = read("docs/execution/WEB-NEXT-ACTION.md")
    current = re.match(r"Current phase: ([A-Z0-9-]+)-v(\d+)\.(\d+) WEB_CLOSED", state)
    upcoming = re.search(r"(?m)^Next task:\s*\n(WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v(\d+)\.(\d+))", queue)
    route = re.search(r"Current FE scope: select `([^`]+)`", queue)
    if not current or not upcoming or not route:
        fail("active checkpoint/next page header is missing or ambiguous")
        return
    if (int(upcoming[2]), int(upcoming[3])) != (int(current[2]), int(current[3]) + 1):
        fail("next task must be the successor of the first, active checkpoint (not a historical marker)")
    phase = f"{current[1]}-v{current[2]}.{current[3]}"
    require_text("docs/execution/WEB-TASK-LEDGER.md", f"| {phase} | WEB-FE | WEB_CLOSED |")
    if not public_route_exists(route[1]): fail(f"next public page does not exist: {route[1]}")

def main() -> int:
    check_active_checkpoint()
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
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT")
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
        if validator in SUPERSEDED_LAYOUT_VALIDATORS:
            replacement = SUPERSEDED_LAYOUT_VALIDATORS[validator]
            if replacement not in VALIDATORS or not (ROOT / "tools" / replacement).is_file():
                fail(f"missing active replacement for {validator}")
            print(f"HISTORICAL_SUPERSEDED {validator} -> {replacement}; not a runtime PASS")
            continue
        validator_path = ROOT / "tools" / validator
        namespace = runpy.run_path(str(validator_path), run_name=f"lgo_web_validator_{validator}")
        validator_main = namespace.get("main")
        if validator_main is None:
            fail(f"validator has no main: {validator}")
            continue
        result = validator_main()
        if result != 0:
            fail(f"validator failed: {validator}")

    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "Real Browser UI/UX Layout First")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "Base UI/UX Layout")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "| WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220 | WEB-FE | WEB_CLOSED |")
    return finish("WEB CURRENT STATE")

if __name__ == "__main__":
    sys.exit(main())

# v1.27 historical standalone validator marker: validate_web_shared_app_shell_v127.py
# v1.28 validator: validate_web_shared_page_patterns_v128.py
# v1.29 validator: validate_web_shared_form_controls_v129.py
# v1.30 validator: validate_web_shared_data_display_v130.py
