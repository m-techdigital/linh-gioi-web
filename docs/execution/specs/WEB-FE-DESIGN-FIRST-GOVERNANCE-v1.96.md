# WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96

Status: WEB_CLOSED.

## SELECT

The user set a new development priority: design images must be the primary source of truth for FE/UI work. Any page, section or component without a design target must receive one before implementation. Reusable UI/UX layout must move into shared base packages instead of being rebuilt separately per page.

## SPEC_LOCK

Add explicit governance and validation for Design Target First:

- Design Target First becomes Priority #1 for FE/UI work.
- Every page, section and reusable component must be attached to a design target before implementation.
- Missing targets must be created first.
- Wrong or stale targets must be deleted or superseded when replaced.
- Shared Base UI/UX Layout must be implemented in `packages/design-tokens` and `packages/ui` before page-local duplicates.
- The design target registry must map current atlas images to public, portal, ops and component scopes.

## IMPLEMENT

Added `docs/execution/WEB-DESIGN-FIRST-GOVERNANCE.md`, `docs/design/DESIGN-TARGET-REGISTRY.md`, and Design Target First / Base UI/UX Layout rules in `AGENTS.md`. Added `tools/validate_web_design_first_governance_v196.py` and wired it into current-state validation.

## SOURCE_VERIFY

Validator was written first and failed before governance docs existed. It now verifies the rule text, registry rows, v1.96 docs, project state, next action and ledger.

## RUNTIME_VERIFY

This task is source governance only; no app runtime behavior changed. Browser/e2e design target availability remains covered by v1.95 atlas tests.

## VISUAL_REVIEW

The active visual reference set remains the v1.95 design atlas. Future UI work must compare implementation against the registry target or create a replacement target first.

## HANDOFF

Next task returns to FE accessibility/interaction work as v1.97, now constrained by Design Target First and Base UI/UX Layout. No UI implementation should begin without citing or creating a registry target.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
