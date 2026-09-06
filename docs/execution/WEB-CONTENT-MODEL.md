# WEB-CONTENT-MODEL

WEB-04 establishes a file-backed typed local content system without CMS/backend/DB.

Taxonomy:

- news
- events
- patch-notes
- notices
- maintenance
- guides
- download-builds

Canonical owner: `packages/content/**`.

Interfaces:

- `ContentRepository`
- `LocalContentRepository`
- `ContentEntry`
- `DownloadBuild`

Fixture requirements:

- slugs are unique and lowercase kebab-case
- dates are valid ISO strings
- fixture tags include `PROVISIONAL_WEB_FIXTURE` where appropriate
- fixtures are `NOT_CANONICAL_BACKEND_CONTRACT`
- unpublished content is not shown as live unless intended

No CMS. No DB persistence. No backend API claim.


## WEB v1.6 product-facing content groups

Typed local content now also includes:

- publicHeroStats
- worldPillars
- playerJourneySteps
- downloadReadiness
- supportTopics
- publicRoadmapItems

These groups are source-owned fixtures for public UX/content polish only. They do not create a CMS, DB persistence, backend API claim or production release process.
