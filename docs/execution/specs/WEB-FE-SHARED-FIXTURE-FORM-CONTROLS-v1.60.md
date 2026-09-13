# WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: shared fixture form controls in `packages/ui`. This FE-only Base First slice replaces native disabled fixture controls with keyboard-readable locked readouts or readonly inputs, so Portal auth fixture fields and Ops review fixture selects communicate blocked state without enabling real auth or ops mutation.

Acceptance:
- `packages/ui/src/forms.tsx` owns the locked fixture form-control behavior for `TextInput`, `SelectInput` and `CheckboxField`.
- Locked text inputs render focusable readonly controls with `aria-disabled` and `data-disabled`.
- Locked selects render focusable `role="combobox"` readouts with `aria-disabled`, `aria-readonly` and stable fixture value text.
- Locked checkboxes render focusable `role="checkbox"` readouts with `aria-disabled` and stable checked state.
- Browser/e2e verifies Portal `/login` and Ops `/support/case-001` on desktop/mobile for keyboard focus, no native `disabled` attribute, no fixture mutation, font-size caps and no page-level overflow.
- No forms are submitted, no backend route/fetch/server action is added, and no fixture control becomes a real mutation control.

Evidence:
- RED browser/e2e reproduced native disabled Portal auth inputs and Ops support select controls.
- GREEN browser/e2e passed after the shared form-control readout changes.
- Source validator locks shared ownership, e2e coverage, docs and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
