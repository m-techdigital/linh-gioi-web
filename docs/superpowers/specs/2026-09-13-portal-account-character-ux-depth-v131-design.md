# Player Portal Account / Character UX Depth v1.31 — Design

## Goal
Turn the Player Portal from isolated fixture shells into one coherent account → security/sessions → characters → character-detail journey while preserving the explicit Auth/DB/API contract boundary.

## Base First
Reusable detail presentation belongs in `packages/ui`. v1.31 adds `KeyValueGrid` and `KeyValueItem` to the shared data-display owner so Portal and future Ops/Public detail surfaces can reuse the same semantic layout. Portal-specific fixture records remain under `apps/portal` and do not become canonical backend contracts.

## Portal journey
- `/`: dashboard-style overview with fixture health metrics and links into Account and Characters.
- `/account`: account overview with fixture identity, security, session and character summary.
- `/account/security`: security posture UX using disabled shared form controls and explicit non-claim feedback.
- `/account/sessions`: fixture session table using shared data display primitives.
- `/characters`: richer character overview with fixture rows and links into detail.
- `/characters/[id]`: detail UX using shared key/value presentation, identity/status blocks and next-action links.

## Boundaries
- No production authentication.
- No password/session/token mutation.
- No DB persistence.
- No canonical account, session or character DTO is introduced.
- No API request is issued.
- Fixture data is presentation-only and clearly labeled.

## Verification
- Dedicated v1.31 validator must enforce shared-base ownership and Portal route coverage.
- `packages/ui`, `packages/auth`, `apps/portal` lint/typecheck must pass.
- Existing monorepo/master validators must remain green.
- Portal production build runs once at closure; output is reused for route smoke.
