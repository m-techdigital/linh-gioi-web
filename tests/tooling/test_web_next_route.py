"""The next-page guard must resolve real published guides/news, not arbitrary dynamic slugs."""
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

    def news_fixture(self, status="published", category="news"):
        self.write("apps/web/src/app/news/[slug]/page.tsx", (REPO / "apps/web/src/app/news/[slug]/page.tsx").read_text())
        self.write("packages/content/src/fixtures.ts", 'export const contentEntries: ContentEntry[] = [\n  {\n    slug: "news-article",\n    category: "'+category+'",\n    status: "'+status+'"\n  }\n];\nexport const other = [{ slug: "fake-news", category: "news", status: "published" }];')

    def test_published_news_is_a_real_next_route(self):
        self.news_fixture()
        self.assertEqual(self.check("/news/news-article"), [])

    def test_news_draft_and_scheduled_are_not_public(self):
        for status in ("draft", "scheduled"):
            with self.subTest(status=status):
                self.news_fixture(status=status)
                self.assertTrue(self.check("/news/news-article"))

    def test_non_news_record_cannot_supply_a_news_route(self):
        self.news_fixture(category="guides")
        self.assertTrue(self.check("/news/news-article"))

    def test_unknown_news_and_arbitrary_dynamic_namespace_rejected(self):
        self.news_fixture()
        self.assertTrue(self.check("/news/fake-news"))
        self.assertTrue(self.check("/news/unknown"))
        self.write("apps/web/src/app/invented/[slug]/page.tsx", "export default function Page() {}")
        self.assertTrue(self.check("/invented/news-article"))

    def test_missing_news_renderer_rejected(self):
        self.news_fixture()
        (self.root / "apps/web/src/app/news/[slug]/page.tsx").unlink()
        self.assertTrue(self.check("/news/news-article"))

    def test_missing_news_category_guard_rejected(self):
        self.news_fixture()
        p = self.root / "apps/web/src/app/news/[slug]/page.tsx"
        p.write_text(p.read_text().replace('entry.category !== "news"', 'false'))
        self.assertTrue(self.check("/news/news-article"))

    def review_queue(self, queued_phase="WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265", route="/", state="WEB_VISUAL_REVIEW_REQUIRED"):
        phase="WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265"
        self.write("apps/web/src/app/page.tsx", "export default function Home() {}")
        self.write("docs/execution/WEB-PROJECT-STATE.md", f"Current phase: {phase} {state}\nCurrent route: `/`\n")
        self.write("docs/execution/WEB-TASK-LEDGER.md", f"| {phase} | WEB-FE | {state} |")
        self.write("docs/execution/WEB-NEXT-ACTION.md", f"Next task:\n{queued_phase}\nCurrent FE scope: select `{route}`")
        guard.ERRORS.clear();guard.check_active_checkpoint();return list(guard.ERRORS)

    def test_visual_review_stays_on_same_homepage_without_forced_false_closure(self):
        self.assertEqual(self.review_queue(), [])

    def test_unreviewed_homepage_cannot_advance_version(self):
        self.assertTrue(self.review_queue(queued_phase="WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.266"))

    def test_unreviewed_homepage_cannot_silently_change_route(self):
        self.write("apps/web/src/app/game/page.tsx", "export default function Game() {}")
        self.assertTrue(self.review_queue(route="/game"))

    def test_unknown_review_status_is_rejected(self):
        self.assertTrue(self.review_queue(state="ASSUMED_PASSED"))

if __name__ == "__main__": unittest.main()
