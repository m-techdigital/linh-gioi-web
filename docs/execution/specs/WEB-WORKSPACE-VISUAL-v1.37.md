# Workspace visual closure v1.37

SELECT: current task v1.37 addresses observed v1.36 visual defects.
SPEC_LOCK: keep workspace-only styles in existing packages/ui/shell.css, scoped under WorkspaceAppShell. Add max-width/gutters, touch-sized LinkButton/SpiritButton, keyboard focus, disabled treatment and stacked mobile boundary copy. Public Web owns its brand styling and is unaffected. No new component abstraction or auth behavior.
IMPLEMENT: Playwright RED reproduced zero gutters for Portal/Ops at both viewports (4 failures). Add shared CSS, rebuild affected apps once, then reuse production outputs for GREEN and visual review. Existing v1.36 browser tests protect navigation and disabled controls.
