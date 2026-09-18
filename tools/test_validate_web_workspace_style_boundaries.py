import unittest

from tools.web_workspace_style_boundaries import scan_text


class WorkspaceStyleBoundaryTest(unittest.TestCase):
    def messages(self, path, text):
        return [item.message for item in scan_text(path, text)]

    def test_accepts_existing_owned_shell_breakpoint(self):
        self.assertEqual([], scan_text("packages/ui/src/shell.css", "@media (max-width: 720px) { .x { display:block; } }"))

    def test_rejects_unowned_breakpoint(self):
        messages = self.messages("packages/ui/src/shell.css", "@media (max-width: 777px) { .x { display:block; } }")
        self.assertTrue(any("breakpoint" in message for message in messages))

    def test_rejects_app_local_shared_token_definition(self):
        messages = self.messages("apps/portal/src/app/globals.css", ":root { --lgo-space-hack: 9rem; }")
        self.assertTrue(any("shared token" in message for message in messages))

    def test_rejects_horizontal_overflow_hiding(self):
        messages = self.messages("apps/ops/src/app/globals.css", ".x { overflow-x: hidden; }")
        self.assertTrue(any("overflow-x:hidden" in message for message in messages))

    def test_rejects_100vw_width(self):
        messages = self.messages("packages/ui/src/forms.css", ".x { width: 100vw; }")
        self.assertTrue(any("100vw" in message for message in messages))

    def test_rejects_large_fixed_width_without_owner_marker(self):
        messages = self.messages("packages/ui/src/data.css", ".x { min-width: 620px; }")
        self.assertTrue(any("fixed pixel width" in message for message in messages))

    def test_accepts_large_fixed_width_with_owned_scroll_marker(self):
        css = "/* style-boundary-owned-scroll: table horizontal scroll contract */\n.x { min-width: 620px; }"
        self.assertEqual([], scan_text("packages/ui/src/data.css", css))

    def test_rejects_shared_selector_override_in_app_css(self):
        messages = self.messages("apps/portal/src/app/globals.css", ".lgo-workspace-shell { padding: 99px; }")
        self.assertTrue(any("shared selector" in message for message in messages))

    def test_rejects_cross_app_style_import(self):
        messages = self.messages("apps/portal/src/app/globals.css", '@import "../../../ops/src/app/globals.css";')
        self.assertTrue(any("cross-app style import" in message for message in messages))


if __name__ == "__main__":
    unittest.main()
