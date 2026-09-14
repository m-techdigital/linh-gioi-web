# HANDOFF — WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98

Status: WEB_CLOSED

WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98 adds Design Target First and Base UI/UX Layout runtime attachment to Portal and Ops workspaces.

What changed:

- `WorkspaceAppShell` accepts `designTarget` metadata.
- Portal layout links to the Player Portal atlas.
- Ops layout links to the Ops/Admin atlas.
- Shell CSS styles the shared design-target component in workspace apps.
- browser/e2e verifies both desktop and mobile workspace target visibility, hrefs and no horizontal overflow.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.99.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
