"""The next-page guard must resolve real published guides, not arbitrary dynamic slugs."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

REPO = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("current_state", REPO / "tools/validate_web_current_state.py")
assert spec and spec.loader
guard = importlib.util.module_from_spec(spec)
spec.loader.exec_module(guard)

class NextRouteTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.original_root = guard.ROOT
        self.addCleanup(setattr, guard, "ROOT", self.original_root)
        guard.ROOT = self.root
        self.write("docs/execution/WEB-PROJECT-STATE.md", "Current phase: WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.232 WEB_CLOSED.")
        self.write("docs/execution/WEB-TASK-LEDGER.md", "| WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.232 | WEB-FE | WEB_CLOSED |")
        self.write("apps/web/src/app/guides/[slug]/page.tsx", (REPO / "apps/web/src/app/guides/[slug]/page.tsx").read_text())
        self.fixture()

    def write(self, path, text):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text)

    def fixture(self, category="guides", status="published"):
        self.write("packages/content/src/fixtures.ts", 'export const contentEntries: ContentEntry[] = [\n  {\n    slug: "world-gameplay-loop-guide",\n    category: "'+category+'",\n    status: "'+status+'"\n  }\n];\nexport const other = [{ slug: "unknown-guide", category: "guides", status: "published" }];')

    def check(self, route):
        self.write("docs/execution/WEB-NEXT-ACTION.md", "Next task:\nWEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.233\nCurrent FE scope: select `"+route+"`")
        guard.ERRORS.clear()
        guard.check_active_checkpoint()
        return list(guard.ERRORS)

    def test_literal_route(self):
        self.write("apps/web/src/app/roadmap/page.tsx", "export default function Roadmap() {}")
        self.assertEqual(self.check("/roadmap"), [])

    def test_published_guide(self):
        self.assertEqual(self.check("/guides/world-gameplay-loop-guide"), [])

    def test_unknown_slug_even_if_in_other_fixture(self):
        self.assertTrue(self.check("/guides/unknown-guide"))

    def test_draft_is_not_a_public_route(self):
        self.fixture(status="draft")
        self.assertTrue(self.check("/guides/world-gameplay-loop-guide"))

    def test_other_category_is_not_a_guide(self):
        self.fixture(category="news")
        self.assertTrue(self.check("/guides/world-gameplay-loop-guide"))

    def test_missing_dynamic_renderer(self):
        (self.root / "apps/web/src/app/guides/[slug]/page.tsx").unlink()
        self.assertTrue(self.check("/guides/world-gameplay-loop-guide"))

    def test_unsafe_route_path(self):
        self.write("apps/web/src/outside/page.tsx", "export default function Page() {}")
        self.assertTrue(self.check("/../outside"))

if __name__ == "__main__": unittest.main()
