# WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9

Decision target: LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_v1.9

## Product focus

WEB v1.9 deepens the actual public web product: news detail pages, guide detail UX, download explanation and status transparency. Runtime/browser/e2e is guardrail only and must not become the task focus.

## Implemented product changes

- News list now points to article details with clear detail-depth indicator.
- News detail pages include article context, player impact, non-claim copy and related news.
- Guide list now links each guide fixture to `/guides/[slug]` detail pages.
- Guide detail pages show expected result and blocked scope for each public guide.
- Download page includes deeper explanation of why a real build link requires artifact, checksum, provenance and owner approval.
- Status page separates public, internal and blocked surfaces so runtime guardrails are not mistaken for release readiness.
- Sitemap includes guide detail routes.

## Scope boundaries

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
- Runtime/browser/e2e is guardrail only.

## Closure requirements

- Source validators pass.
- v1.9 validator confirms detail content, routes, sitemap and non-claims.
- Targeted content/web typecheck/build guardrails should run when runtime kit is available.
- Full browser matrix is not required for this product-focused slice unless route regressions appear.
