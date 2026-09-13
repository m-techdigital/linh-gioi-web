# HANDOFF — WEB-SHARED-APP-SHELL-FOUNDATION-v1.27

Status: RUNTIME_READY_VISUAL_ENV_LIMITED

Final decision: `LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27`

Baseline: `LGO-WEB-public-homepage-discovery-media-storytelling-v1.26-full-source.zip`

## Base First outcome
- `packages/ui` owns `WorkspaceAppShell`, `WorkspaceNavigation`, `WorkspaceBoundaryNotice`.
- `packages/ui/shell.css` owns common Portal/Ops shell layout and responsive styles.
- Portal and Ops root layouts provide only identity, navigation and explicit backend-boundary copy.
- Public Web remains on its brand-specific shell and is not forced into an administrative workspace layout.
- Portal/Ops now declare their direct `@lgo-web/design-tokens` dependency; lockfile is aligned.

## Verification
- v1.27 validator: PASS.
- Base First validator: PASS.
- Shared Base validator: PASS.
- Portal shell validator: PASS.
- Ops shell validator: PASS.
- WEB CURRENT STATE: PASS.
- targeted TypeScript: `packages/ui`, Portal, Ops PASS.
- targeted lint: `packages/ui`, Portal, Ops PASS.
- Portal Next.js 16.3.4 production build: PASS, 11 routes.
- Ops Next.js 16.3.4 production build: PASS, 11 routes.
- Portal runtime route smoke: PASS, 5/5 HTTP 200.
- Ops runtime route smoke: PASS, 6/6 HTTP 200.
- Browser screenshot/visual review: UNVERIFIED_ENV; existing Chromium localhost policy remains `ERR_BLOCKED_BY_ADMINISTRATOR`. No browser visual PASS is claimed.

## Next allowed step
`WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28`
