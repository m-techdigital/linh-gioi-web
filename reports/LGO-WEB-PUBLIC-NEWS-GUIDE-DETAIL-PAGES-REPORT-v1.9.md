# LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-REPORT-v1.9

Final decision: `LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.9`

## Scope

This slice focuses on the actual public web product: richer news detail pages, guide detail UX, route-level content depth, status transparency and download explanation. Runtime/browser/e2e remains a guardrail only.

## Product changes

- Added `PublicDetailSections` with article detail, guide detail, download explainer, status explainer and next-step CTA sections.
- Upgraded `/news` to mark articles with deeper detail sections.
- Upgraded `/news/[slug]` with player impact, non-claim copy and related news.
- Added `/guides/[slug]` detail pages for guide fixtures.
- Upgraded `/guides` so each guide links to its own detail route.
- Added deeper download explanation around build artifact, checksum, provenance and owner approval.
- Added status transparency explaining public/internal/blocked surfaces.
- Added typed content fixtures: `contentDetailSections`, `guideDetailSteps`, `downloadExplainers`, `statusExplainers`.
- Added guide fixtures for download readiness and support/community readiness.
- Updated sitemap for guide detail routes.

## Validation

Source validation PASS:

```text
python3 -m py_compile tools/*.py
python3 tools/validate_web_public_news_guide_detail_pages.py
python3 tools/validate_web_current_state.py
```

Targeted runtime guardrails with uploaded runtime kit:

```text
Node: v24.20.0
pnpm: 10.15.0
pnpm install --offline --ignore-scripts: PASS
pnpm lint: PASS
pnpm --filter @lgo-web/content test: PASS
pnpm --filter @lgo-web/content typecheck: PASS
pnpm --filter @lgo-web/ui typecheck: PASS
pnpm --filter @lgo-web/web typecheck: PASS
NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build: PASS on rerun
```

The first combined runtime command timed out during `next build` after successful compile while Next.js was running the remaining production build phases. The build was rerun as a focused command and completed successfully, including static generation for `/guides/[slug]` and `/news/[slug]`.

## Runtime/browser stance

No full v1.9 browser matrix PASS is claimed. v1.5 remains the latest full browser matrix PASS, while v1.9 uses targeted source/build guardrails because the task focus is public content/product polish.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.
- No public game download artifact.
- No production quest/wiki/combat/economy claim.
