# WEB Shared Form Control Foundation v1.29 — Design

## Goal
Establish one shared, accessible form-control owner in `packages/ui` before Public, Portal or Ops add independent field/help/error/action patterns.

## Shared API

`packages/ui/src/forms.tsx` owns:

- `FormField`: label + required marker + help + error semantics around a control.
- `TextInput`: neutral text/password/search/email input styling.
- `SelectInput`: neutral select styling.
- `CheckboxField`: checkbox + label + optional description.
- `FormActions`: consistent action-row layout.
- `InlineFeedback`: neutral status/error/success/info feedback presentation.

`packages/ui/src/forms.css` owns all form-control styling and is exported as `@lgo-web/ui/forms.css`.

`ProvisionalFeatureShell` accepts optional children so fixture-only controls can live inside existing contract-safe page composition.

## Consumers

- Portal login/register/recovery use disabled shared controls to communicate intended UX shape without production auth semantics.
- Ops Security & Governance and Audit use disabled shared controls to communicate intended filter/governance shape without real mutation/RBAC/audit backend.
- Public Web does not gain a fake submit/search/ticket form in this task. The shared module remains available when a real client-side/public interaction is justified.

## Safety

- No `<form action>` or submit flow.
- No password validation semantics.
- No auth/account recovery backend.
- No ops mutation or canonical permission model.
- All fixture controls are disabled and adjacent to explicit non-claim feedback.

## Verification

TDD validator must fail on v1.28 baseline, then require shared module/export/styles and fixture consumers. Targeted UI/Portal/Ops lint+typecheck must pass. Portal/Ops builds are invalidated and must run once each at closure; unchanged Public evidence is reused.
