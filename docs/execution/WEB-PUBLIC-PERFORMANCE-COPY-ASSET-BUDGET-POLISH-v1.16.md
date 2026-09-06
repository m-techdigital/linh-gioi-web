# WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16

## Goal

Build the actual public web product by improving performance-facing content discipline, not by expanding tooling.

WEB v1.16 adds a player-facing `/performance` hub that explains:

- copy weight and summary-first page structure;
- CSS-only visual asset budget while approved runtime assets are not available;
- static route composition for public pages that must not depend on fake backend data;
- perceived-load clarity for hero, guide/detail, download and status surfaces;
- mobile reading density so important blockers stay near sensitive CTAs.

## Product-first rule

Runtime/browser/e2e remains a regression guardrail only. It must not become the content center of the public website and must not be marketed as game release readiness.

## Scope

Added/updated:

- `/performance` route.
- `PublicPerformanceBudgetSections.tsx`.
- Typed content for performance/copy budget principles, static route composition rules, perceived load signals and mobile density budgets.
- Guide/news entries for performance/copy budget.
- Navigation, sitemap, homepage, Start, Download, Download Trust, Status, Roadmap, Guides, Guide Detail, Game Loop, Accessibility and Support Safety cross-links.
- CSS-only visual treatment for performance cards and static-route lists.
- Source validator for the v1.16 surface.

## Explicit non-claims

- No Core Web Vitals measured PASS.
- No Lighthouse score certification.
- No production RUM monitoring.
- No CDN deployment claim.
- No image CDN integration.
- No approved production art pipeline.
- No public game download artifact.
- No production auth, DB persistence, CMS, backend integration or portal entitlement.

## Evidence policy

This task is considered source-ready only when validators pass and targeted runtime guardrails pass where the environment permits. Full browser matrix remains optional guardrail; it is not the product focus.
