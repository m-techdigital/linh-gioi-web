# Portal access / onboarding v1.36

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF. Source/runtime checkpoint closed; visual repair remains WEB_FIX_REQUIRED and is selected as v1.37. No claim of full visual closure.

Shared ProgressSteps/ProgressStep owns ordered, localized presentation semantics. AccessJourney composes it with shared controls; login/register/recovery connect to /access and account/character previews. Consent and remembered-device controls remain disabled. No operational form, network mutation, account creation, recovery token or session.

Evidence: dedicated validator RED before implementation then GREEN; clean-tree current-state, Base First and Shared Base validators PASS; UI/Portal lint/typecheck PASS; one Portal production build PASS; HTTP 7/7; desktop/mobile Playwright 8/8 PASS. Initial browser attempts were not executed because Chromium was absent; installed matching browser and reran successfully. Visual screenshots reviewed at 1440 and 390 px: inherited missing container/button styles and narrow banner copy need v1.37. No visual PASS claimed.

Ops v1.35 re-verification: production build PASS, HTTP 4/4. Public code unchanged; previous evidence reused. Runtime actually used Node 26.8.1, pnpm 10.15.0, Next 16.3.4; requested Node 24.20.0 not locally verified.

Baseline is imported workspace commit cc74182 (488 files), not a verified authoritative ZIP; attachment provided only pasted text. Full/delta ZIP and SHA256 under out/v1.36 are compared against this preserved workspace baseline. Packaging runs archive integrity, clean extraction, byte-for-byte replay, NUL scan and dedicated/current validators. Evidence logs and screenshots are copied alongside archives; generated artifacts excluded from source.

Next: WEB-SHARED-WORKSPACE-VISUAL-CLOSURE-v1.37. Real integration remains WEB_BLOCKED_EXTERNAL_CONTRACT until accepted backend Auth/API/DB/RBAC/audit contract; production deployment is not authorized by a commit/push request.
