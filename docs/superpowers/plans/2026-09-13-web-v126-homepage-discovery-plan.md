# WEB v1.26 Homepage Discovery Implementation Plan

**Goal:** Replace duplicate homepage deep-route summaries with a single reusable discovery showcase.

**Architecture:** Typed spotlight references in content, generic media frame in shared UI, app-specific homepage composition in `apps/web`.

**Global Constraints:** Base First; targeted inner-loop gates; one production build at closure; no backend/CMS/auth/DB work.

## Tasks
- [x] Add failing v1.26 source validator.
- [x] Add typed discovery references and integrity test.
- [x] Add shared `MediaFrame` to `packages/ui`.
- [x] Add `HomeDiscoveryShowcase` and remove repeated class/world/story homepage sections.
- [x] Add responsive media-frame styles.
- [x] Run affected lint/typecheck/content tests.
- [ ] Run closure validators/build/runtime smoke and package artifacts.
