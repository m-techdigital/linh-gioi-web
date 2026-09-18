import unittest
from pathlib import Path

from tools.web_changed_scope_verification import build_plan, load_manifest


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "tools" / "web_verification_ownership_v1.json"


class ChangedScopeVerificationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.manifest = load_manifest(MANIFEST)

    def plan(self, paths, mode="focused"):
        return build_plan(
            self.manifest,
            paths,
            mode,
            source={"kind": "explicit-test", "ref": None},
        )

    def test_shared_ui_focused_selects_owned_checks(self):
        plan = self.plan(["packages/ui/src/data.css"])
        self.assertIn("shared-base", plan["check_ids"])
        self.assertIn("ui-typecheck", plan["check_ids"])
        self.assertIn("design-tokens-typecheck", plan["check_ids"])
        self.assertEqual(["shared-ui"], plan["owners"])

    def test_unknown_path_broadens_safely(self):
        plan = self.plan(["unowned/new-area/file.txt"])
        self.assertTrue(plan["broadened"])
        self.assertIn("current-state", plan["check_ids"])
        self.assertIn("root-typecheck", plan["check_ids"])
        self.assertEqual(["unowned/new-area/file.txt"], plan["unknown_paths"])

    def test_overlapping_paths_deduplicate_checks(self):
        plan = self.plan([
            "packages/ui/src/data.css",
            "apps/portal/src/app/globals.css",
        ], mode="integration")
        self.assertEqual(len(plan["check_ids"]), len(set(plan["check_ids"])))
        self.assertEqual(1, plan["check_ids"].count("shared-base"))
        self.assertIn("portal-typecheck", plan["check_ids"])

    def test_release_mode_adds_canonical_closure_once(self):
        plan = self.plan(["apps/ops/src/app/page.tsx"], mode="release")
        for check_id in (
            "root-lint",
            "root-typecheck",
            "root-test",
            "root-build",
            "current-state",
            "root-e2e",
        ):
            self.assertIn(check_id, plan["check_ids"])
            self.assertEqual(1, plan["check_ids"].count(check_id))

    def test_plan_preserves_source_provenance(self):
        source = {"kind": "git-diff", "ref": "origin/main", "head": "abc123"}
        plan = build_plan(
            self.manifest,
            ["apps/ops/src/app/page.tsx"],
            "changed",
            source=source,
        )
        self.assertEqual(source, plan["source"])
        self.assertEqual("changed", plan["mode"])


if __name__ == "__main__":
    unittest.main()
