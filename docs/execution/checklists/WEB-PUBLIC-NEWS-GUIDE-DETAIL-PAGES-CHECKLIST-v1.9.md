# WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-CHECKLIST-v1.9

## Product checks

- [ ] News detail pages include context beyond summary.
- [ ] News detail pages include player impact and non-claim copy.
- [ ] Guide list links to guide detail pages.
- [ ] Guide detail pages include action, expected result and blocked scope.
- [ ] Download page explains release artifact/checksum/owner approval requirements.
- [ ] Status page separates public/internal/blocked status surfaces.
- [ ] Sitemap includes guide detail routes.

## Guardrail checks

- [ ] `python3 -m py_compile tools/*.py`
- [ ] `python3 tools/validate_web_public_news_guide_detail_pages.py`
- [ ] `python3 tools/validate_web_current_state.py`
- [ ] targeted package typecheck/build when runtime kit is available.

## Non-claims

- [ ] No production auth.
- [ ] No DB persistence.
- [ ] No real account portal integration.
- [ ] No real ops/admin mutation.
- [ ] No independent backend.
- [ ] No CMS.
- [ ] No production deployment.
- [ ] No payment/shop/economy.
- [ ] No live community/chat/forum/guild backend.
- [ ] No public game download artifact.
- [ ] Runtime/browser/e2e is guardrail only.
